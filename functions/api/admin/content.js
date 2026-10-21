import { guard, initialize, json, liveResult, validateContent } from '../../../lib/cms.js';
export async function onRequest({ request, env }) {
  const denied = await guard(request, env); if (denied) return denied;
  if (!['GET', 'POST'].includes(request.method)) return json({ error: 'Method not allowed.' }, 405);
  const db = env.SITE_DB;
  try {
    await initialize(db);
    if (request.method === 'GET') {
      const revision = new URL(request.url).searchParams.get('revision');
      if (revision !== null) {
        if (!/^\d+$/.test(revision)) return json({ error: 'Invalid revision.' }, 400);
        const row = await db.prepare('SELECT revision, content, created_at AS updated_at FROM cms_revisions WHERE revision = ?').bind(Number(revision)).first();
        return row ? json(liveResult(row)) : json({ error: 'Revision not found.' }, 404);
      }
      const row = await db.prepare('SELECT revision, content, updated_at FROM cms_live WHERE id = 1').first();
      const history = await db.prepare('SELECT revision, label, actor, created_at AS createdAt, restored_from AS restoredFrom FROM cms_revisions ORDER BY revision DESC LIMIT 30').all();
      return json({ ...liveResult(row), history: history.results, ready: true });
    }
    if (!(request.headers.get('Content-Type') || '').startsWith('application/json')) return json({ error: 'Send JSON content.' }, 415);
    const text = await request.text();
    if (new TextEncoder().encode(text).length > 1500000) return json({ error: 'Content is too large. Upload images through the image controls.' }, 413);
    let body; try { body = JSON.parse(text); } catch { return json({ error: 'Invalid content format.' }, 400); }
    if (!body || !Number.isSafeInteger(body.expectedRevision) || body.expectedRevision < 0 || !/^[a-f0-9-]{36}$/.test(body.operationId || '')) return json({ error: 'Missing revision or publish request identifier. Refresh and try again.' }, 400);
    const prior = await db.prepare('SELECT revision FROM cms_revisions WHERE operation_id = ?').bind(body.operationId).first();
    if (prior) return json({ revision: prior.revision, published: true, duplicate: true });
    let content;
    let restoredFrom = null;
    if (body.restoreRevision !== undefined) {
      if (!Number.isSafeInteger(body.restoreRevision) || body.restoreRevision < 0) return json({ error: 'Invalid restore revision.' }, 400);
      const row = await db.prepare('SELECT content FROM cms_revisions WHERE revision = ?').bind(body.restoreRevision).first();
      if (!row) return json({ error: 'Revision not found.' }, 404);
      content = validateContent(JSON.parse(row.content)); restoredFrom = body.restoreRevision;
    } else {
      try { content = validateContent(body.content); } catch (error) { return json({ error: error.message }, 400); }
    }
    const actor = typeof body.actor === 'string' ? body.actor.trim().slice(0, 80) || 'Administrator' : 'Administrator';
    const label = (restoredFrom !== null ? `Restored version ${restoredFrom}` : typeof body.label === 'string' ? body.label.trim().slice(0, 160) : '') || 'Website update';
    const now = new Date().toISOString();
    const data = JSON.stringify(content);
    const result = await db.batch([
      db.prepare('INSERT INTO cms_revisions (revision, operation_id, content, label, actor, created_at, restored_from) SELECT revision + 1, ?, ?, ?, ?, ?, ? FROM cms_live WHERE id = 1 AND revision = ?').bind(body.operationId, data, label, actor, now, restoredFrom, body.expectedRevision),
      db.prepare('UPDATE cms_live SET revision = revision + 1, content = ?, updated_at = ? WHERE id = 1 AND revision = ? AND EXISTS (SELECT 1 FROM cms_revisions WHERE operation_id = ?)').bind(data, now, body.expectedRevision, body.operationId)
    ]);
    if (result[1].meta.changes !== 1) return json({ error: 'Another admin published newer changes. Your draft is safe. Load the latest live version before publishing again.', conflict: true }, 409);
    return json({ published: true, revision: body.expectedRevision + 1, updatedAt: now, content });
  } catch {
    // A retry may race the original request; operation identifiers make it safe.
    return json({ error: 'Publishing could not complete. Your draft is saved. Please retry or refresh the publishing status.' }, 503);
  }
}
