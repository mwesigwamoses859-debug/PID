import { DEFAULT_DESIGN, FONT_OPTIONS, BACKGROUNDS } from '../src/config/design.ts';
import { DEFAULT_CONTENT } from '../src/config/defaultContent.ts';
import { publicContent } from '../src/lib/publishing.ts';
import { onRequest as session } from '../functions/api/admin/session.js';

export const defaults = publicContent(DEFAULT_CONTENT);
export const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
export async function guard(request, env) {
  if (request.method !== 'GET' && request.headers.get('Origin') !== new URL(request.url).origin) return json({ error: 'Request origin was not accepted.' }, 403);
  const auth = await session({ request: new Request(request.url, { headers: request.headers }), env });
  if (auth.status !== 200) return json({ error: 'Your admin session expired. Sign in again; your draft is saved.' }, 401);
  if (!env.SITE_DB) return json({ error: 'Publishing storage is not connected yet.' }, 503);
  return null;
}

export async function initialize(db) {
  await db.batch([
    db.prepare('CREATE TABLE IF NOT EXISTS cms_live (id INTEGER PRIMARY KEY CHECK (id = 1), revision INTEGER NOT NULL, content TEXT NOT NULL, updated_at TEXT NOT NULL)'),
    db.prepare('CREATE TABLE IF NOT EXISTS cms_revisions (revision INTEGER PRIMARY KEY, operation_id TEXT UNIQUE NOT NULL, content TEXT NOT NULL, label TEXT NOT NULL, actor TEXT NOT NULL, created_at TEXT NOT NULL, restored_from INTEGER)'),
    db.prepare('CREATE TABLE IF NOT EXISTS cms_media (id TEXT PRIMARY KEY, mime TEXT NOT NULL, data TEXT NOT NULL, created_at TEXT NOT NULL)')
  ]);
  const baseline = JSON.stringify(defaults);
  await db.batch([
    db.prepare('INSERT OR IGNORE INTO cms_live (id, revision, content, updated_at) VALUES (1, 0, ?, ?)').bind(baseline, new Date().toISOString()),
    db.prepare("INSERT OR IGNORE INTO cms_revisions (revision, operation_id, content, label, actor, created_at) VALUES (0, 'baseline', ?, 'Original website', 'PID', ?)").bind(baseline, new Date().toISOString())
  ]);
}

export const liveResult = row => ({ revision: row.revision, content: JSON.parse(row.content), updatedAt: row.updated_at });

// Shape validation also excludes account records, infrastructure settings and arbitrary keys.
export function validateContent(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Website content must be an object.');
  if (input.designSettings !== undefined && (!input.designSettings || typeof input.designSettings !== 'object' || Array.isArray(input.designSettings))) throw new Error('Invalid design settings.');
  input = { ...input, designSettings: { ...DEFAULT_DESIGN, ...(input.designSettings || {}) } };
  const optional = { aboutMissionDesc: '', aboutVisionDesc: '' };
  const templates = { ...defaults, ...optional };
  const clean = (value, template, path) => {
    if (typeof template === 'string') {
      if (typeof value !== 'string' || value.length > 40000) throw new Error(`${path}: use text under 40,000 characters.`);
      if (/(image|logo|avatar|^url$)/i.test(path.split('.').pop()) && value && !value.startsWith('/images/') && !value.startsWith('/logos/') && !value.startsWith('/branding/') && !/^\/api\/media\/[a-f0-9-]{36}$/.test(value) && !/^https:\/\/[^\s]+$/i.test(value)) throw new Error(`${path}: choose an uploaded image or an HTTPS image address.`);
      if (/(website|facebookUrl|instagramUrl|youtubeUrl)$/.test(path) && value && !/^https:\/\/[^\s]+$/i.test(value)) throw new Error(`${path}: use an HTTPS website address.`);
      return value;
    }
    if (typeof template === 'boolean') { if (typeof value !== 'boolean') throw new Error(`${path}: invalid switch value.`); return value; }
    if (typeof template === 'number') { if (typeof value !== 'number' || !Number.isFinite(value) || Math.abs(value) > 1e12) throw new Error(`${path}: invalid number.`); return value; }
    if (Array.isArray(template)) {
      if (!Array.isArray(value) || value.length > 300) throw new Error(`${path}: use no more than 300 items.`);
      return value.map((item, index) => clean(item, template[0], `${path}.${index}`));
    }
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${path}: invalid content fields.`);
    const result = {};
    for (const [key, child] of Object.entries(template)) {
      if (value[key] === undefined) throw new Error(`${path}.${key}: missing field.`);
      result[key] = clean(value[key], child, `${path}.${key}`);
    }
    return result;
  };
  const result = {};
  for (const [key, template] of Object.entries(templates)) {
    if (input[key] === undefined && Object.hasOwn(optional, key)) continue;
    if (input[key] === undefined) throw new Error(`${key}: missing field.`);
    result[key] = clean(input[key], template, key);
  }
  const design = result.designSettings;
  for (const key of ['bodyFont', 'headingFont']) if (!FONT_OPTIONS.some(font => font.id === design[key])) throw new Error('Choose a font from the font library.');
  if (!BACKGROUNDS.some(item => item.id === design.backgroundTemplate) || !['narrow', 'standard', 'wide'].includes(design.contentWidth) || !['compact', 'comfortable', 'spacious'].includes(design.sectionSpacing) || !['original', 'soft', 'square', 'pill'].includes(design.buttonStyle)) throw new Error('Choose a valid background and layout option.');
  if (!/^#[a-f0-9]{6}$/i.test(design.backgroundColor)) throw new Error('Choose a valid background colour.');
  if (design.headingScale < 0.8 || design.headingScale > 1.3 || design.lineHeight < 1.3 || design.lineHeight > 2.2 || design.letterSpacing < 0 || design.letterSpacing > 2 || design.backgroundStrength < 0 || design.backgroundStrength > 60) throw new Error('Typography or background values are outside the allowed range.');
  if (!['olive', 'noir', 'blue', 'earth'].includes(result.theme) || !['classic', 'macos', 'android16'].includes(result.uiStyle)) throw new Error('Choose a valid appearance preset.');
  if (result.fontSizePercent < 80 || result.fontSizePercent > 150 || result.cornerRadius < 0 || result.cornerRadius > 60 || result.glassIntensity < 0 || result.glassIntensity > 60) throw new Error('Appearance values are outside the allowed range.');
  if (!result.siteTitle.trim() || !result.heroTitle1.trim()) throw new Error('Website title and homepage heading cannot be empty.');
  const sections = ['home', 'about', 'strategy', 'impact', 'partners', 'opportunities', 'gallery', 'contact'];
  if (result.navigationItems.some(item => !sections.includes(item.id)) || result.homeCards.some(item => !sections.includes(item.target))) throw new Error('Choose valid website navigation destinations.');
  if (new TextEncoder().encode(JSON.stringify(result)).length > 1400000) throw new Error('Content is too large. Upload images through the image controls.');
  return result;
}
