import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { onRequest as session } from '../functions/api/admin/session.js';
import { onRequest as admin } from '../functions/api/admin/content.js';
import { onRequestGet as publicRead } from '../functions/api/content.js';
import { onRequestPost as upload } from '../functions/api/admin/media.js';
import { onRequestGet as image } from '../functions/api/media/[id].js';
import { defaults, validateContent, initialize } from '../lib/cms.js';

class Database {
  constructor() { this.sqlite = new DatabaseSync(':memory:'); }
  prepare(sql) {
    const db = this.sqlite;
    const make = (args = []) => ({
      bind: (...values) => make(values),
      first: async () => db.prepare(sql).get(...args) || null,
      all: async () => ({ results: db.prepare(sql).all(...args) }),
      run: async () => ({ meta: { changes: Number(db.prepare(sql).run(...args).changes) } }),
      _run: () => ({ meta: { changes: Number(db.prepare(sql).run(...args).changes) } })
    });
    return make();
  }
  async batch(statements) {
    this.sqlite.exec('BEGIN');
    try { const result = statements.map(statement => statement._run()); this.sqlite.exec('COMMIT'); return result; }
    catch (error) { this.sqlite.exec('ROLLBACK'); throw error; }
  }
}
const origin = 'https://www.piduganda.org';
const password = 'test-only-' + crypto.randomUUID();
const request = (path, method = 'GET', body, cookie, source = origin) => new Request(origin + path, { method, headers: { Origin: source, 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
async function setup() {
  const env = { ADMIN_PASSWORD: password, SITE_DB: new Database() };
  const response = await session({ request: request('/api/admin/session', 'POST', { password }), env });
  const cookie = response.headers.get('Set-Cookie').split(';')[0];
  return { env, cookie };
}
const payload = (expectedRevision, patch = {}) => ({ expectedRevision, operationId: crypto.randomUUID(), content: { ...defaults, ...patch }, actor: 'Test editor', label: 'Test change' });
const post = (env, cookie, body, source) => admin({ request: request('/api/admin/content', 'POST', body, cookie, source), env });
const read = async env => (await publicRead({ env })).json();

test('default content validates and private account fields are excluded', () => {
  assert.deepEqual(validateContent(defaults), defaults);
  const cleaned = validateContent({ ...defaults, administrators: [{ password: 'do-not-publish' }], ADMIN_PASSWORD: 'private' });
  assert.equal(cleaned.administrators, undefined);
  assert.equal(cleaned.ADMIN_PASSWORD, undefined);
});
test('signed-out publishing and history access are denied', async () => {
  const { env } = await setup();
  assert.equal((await post(env, null, payload(0))).status, 401);
  assert.equal((await admin({ request: request('/api/admin/content'), env })).status, 401);
});
test('cross-origin publishing is rejected even with a valid session', async () => {
  const { env, cookie } = await setup();
  assert.equal((await post(env, cookie, payload(0), 'https://other.example')).status, 403);
});
test('publishing requires connected shared storage', async () => {
  const { env, cookie } = await setup(); delete env.SITE_DB;
  assert.equal((await post(env, cookie, payload(0))).status, 503);
});
test('anonymous reads fall back to original content before the first publish', async () => {
  const { env } = await setup();
  const data = await read(env); assert.equal(data.revision, 0); assert.deepEqual(data.content, defaults);
});
test('a published edit is returned to independent signed-out visitors', async () => {
  const { env, cookie } = await setup();
  const response = await post(env, cookie, payload(0, { heroTitle1: 'Community update' }));
  assert.equal(response.status, 200);
  assert.equal((await read(env)).content.heroTitle1, 'Community update');
  assert.equal((await read(env)).revision, 1);
  assert.equal((await publicRead({ env })).headers.get('Cache-Control'), 'no-store');
});
test('a stale admin draft cannot overwrite another publish', async () => {
  const { env, cookie } = await setup();
  await post(env, cookie, payload(0, { heroTitle1: 'First editor' }));
  assert.equal((await post(env, cookie, payload(0, { heroTitle1: 'Stale editor' }))).status, 409);
  assert.equal((await read(env)).content.heroTitle1, 'First editor');
});
test('retrying the same publish operation never creates duplicate versions', async () => {
  const { env, cookie } = await setup(); const body = payload(0);
  await post(env, cookie, body);
  const retry = await post(env, cookie, body);
  assert.equal(retry.status, 200); assert.equal((await retry.json()).duplicate, true);
  assert.equal((await read(env)).revision, 1);
});
test('two concurrent drafts based on the same version produce one successful publish', async () => {
  const { env, cookie } = await setup(); await initialize(env.SITE_DB);
  const result = await Promise.all([post(env, cookie, payload(0, { heroTitle1: 'A' })), post(env, cookie, payload(0, { heroTitle1: 'B' }))]);
  assert.deepEqual(result.map(r => r.status).sort(), [200, 409]);
  assert.equal((await read(env)).revision, 1);
});
test('restore creates a new live version and preserves the replaced version', async () => {
  const { env, cookie } = await setup();
  await post(env, cookie, payload(0, { heroTitle1: 'First update' }));
  const restored = await post(env, cookie, { expectedRevision: 1, operationId: crypto.randomUUID(), restoreRevision: 0, actor: 'Test editor' });
  assert.equal(restored.status, 200); assert.equal((await read(env)).revision, 2);
  assert.equal((await read(env)).content.heroTitle1, defaults.heroTitle1);
  const history = await (await admin({ request: request('/api/admin/content', 'GET', null, cookie), env })).json();
  assert.deepEqual(history.history.map(item => item.revision), [2, 1, 0]);
  assert.equal(history.history[0].restoredFrom, 0);
});
test('loading a historical draft does not change the public version', async () => {
  const { env, cookie } = await setup(); await post(env, cookie, payload(0, { heroTitle1: 'Latest' }));
  const snapshot = await admin({ request: request('/api/admin/content?revision=0', 'GET', null, cookie), env });
  assert.equal(snapshot.status, 200); assert.equal((await snapshot.json()).content.heroTitle1, defaults.heroTitle1);
  assert.equal((await read(env)).content.heroTitle1, 'Latest');
});
test('invalid content and unsafe links fail without modifying live content', async () => {
  const { env, cookie } = await setup();
  for (const patch of [{ heroTitle1: '' }, { theme: 'bad-theme' }, { heroImage: 'javascript:alert(1)' }, { fontSizePercent: 400 }, { siteFeatures: { ...defaults.siteFeatures, facebookUrl: 'javascript:alert(1)' } }]) {
    assert.equal((await post(env, cookie, payload(0, patch))).status, 400);
  }
  assert.equal((await read(env)).revision, 0);
});
test('image uploads require authentication and reject executable formats', async () => {
  const { env, cookie } = await setup();
  const req = auth => new Request(origin + '/api/admin/media', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'image/svg+xml', ...(auth ? { Cookie: cookie } : {}) }, body: '<svg/>' });
  assert.equal((await upload({ request: req(false), env })).status, 401);
  assert.equal((await upload({ request: req(true), env })).status, 415);
});
test('uploaded image persists and is readable by signed-out visitors', async () => {
  const { env, cookie } = await setup();
  const bytes = Uint8Array.from(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jL1sAAAAASUVORK5CYII=', 'base64'));
  const req = () => new Request(origin + '/api/admin/media', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'image/png', Cookie: cookie }, body: bytes });
  const response = await upload({ request: req(), env }); assert.equal(response.status, 200);
  const url = (await response.json()).url;
  const fetched = await image({ params: { id: url.split('/').pop() }, env });
  assert.equal(fetched.headers.get('Content-Type'), 'image/png'); assert.deepEqual(new Uint8Array(await fetched.arrayBuffer()), bytes);
  assert.equal((await (await upload({ request: req(), env })).json()).url, url);
});

test('older content without design settings gets safe defaults', () => {
  const legacy = structuredClone(defaults); delete legacy.designSettings;
  assert.deepEqual(validateContent(legacy).designSettings, defaults.designSettings);
});
test('every design preset passes publishing validation', async () => {
  const { DESIGN_PRESETS } = await import('../src/config/design.ts');
  for (const preset of DESIGN_PRESETS) {
    const result = validateContent({ ...defaults, ...preset.patch, designSettings: preset.design });
    assert.equal(result.designSettings.bodyFont, preset.design.bodyFont);
  }
});
test('typography, background and layout survive publishing and restore', async () => {
  const { env, cookie } = await setup();
  const design = { ...defaults.designSettings, bodyFont: 'poppins', headingFont: 'georgia', headingScale: 1.15, lineHeight: 1.8, backgroundTemplate: 'dots', contentWidth: 'wide', buttonStyle: 'pill', backToTop: true };
  assert.equal((await post(env, cookie, payload(0, { designSettings: design }))).status, 200);
  assert.deepEqual((await read(env)).content.designSettings, design);
  const response = await post(env, cookie, { expectedRevision: 1, operationId: crypto.randomUUID(), restoreRevision: 0 });
  assert.equal(response.status, 200);
  assert.deepEqual((await read(env)).content.designSettings, defaults.designSettings);
});
test('invalid font, background, injected colour and unsafe layout values cannot publish', () => {
  for (const patch of [{ bodyFont: 'untrusted-font' }, { headingFont: 'url(evil)' }, { backgroundTemplate: 'raw-css' }, { backgroundColor: 'red; background:url(evil)' }, { backgroundImage: 'javascript:alert(1)' }, { lineHeight: 20 }, { headingScale: 0 }, { sectionSpacing: 'bad' }, { buttonStyle: 'script' }, { contentWidth: '99999px' }, { letterSpacing: -1 }, { stickyHeader: 'false' }]) {
    assert.throws(() => validateContent({ ...defaults, designSettings: { ...defaults.designSettings, ...patch } }));
  }
});
test('legacy revisions restore after an appearance update', async () => {
  const { env, cookie } = await setup();
  await initialize(env.SITE_DB);
  const legacy = structuredClone(defaults); delete legacy.designSettings;
  await env.SITE_DB.prepare('UPDATE cms_revisions SET content = ? WHERE revision = 0').bind(JSON.stringify(legacy)).run();
  await post(env, cookie, payload(0, { designSettings: { ...defaults.designSettings, headingFont: 'merriweather' } }));
  const response = await post(env, cookie, { expectedRevision: 1, operationId: crypto.randomUUID(), restoreRevision: 0 });
  assert.equal(response.status, 200);
  assert.deepEqual((await read(env)).content.designSettings, defaults.designSettings);
});
