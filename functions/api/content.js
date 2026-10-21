import { defaults, json, liveResult } from '../../lib/cms.js';
export async function onRequestGet({ env }) {
  if (!env.SITE_DB) return json({ revision: 0, content: defaults, ready: false });
  try {
    const row = await env.SITE_DB.prepare('SELECT revision, content, updated_at FROM cms_live WHERE id = 1').first();
    return json(row ? { ...liveResult(row), ready: true } : { revision: 0, content: defaults, ready: true });
  } catch (error) {
    if (String(error).includes('no such table')) return json({ revision: 0, content: defaults, ready: true });
    return json({ error: 'Live content could not be loaded. Please try again.' }, 503);
  }
}
