import { guard, initialize, json } from '../../../lib/cms.js';
export async function onRequestPost({ request, env }) {
  const denied = await guard(request, env); if (denied) return denied;
  const mime = request.headers.get('Content-Type')?.split(';')[0];
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(mime)) return json({ error: 'Choose a JPG, PNG, WebP or GIF image.' }, 415);
  if (Number(request.headers.get('Content-Length') || 0) > 900000) return json({ error: 'Image must be under 900 KB.' }, 413);
  const data = new Uint8Array(await request.arrayBuffer());
  if (data.byteLength > 900000 || data.byteLength < 12) return json({ error: 'Choose an image under 900 KB.' }, 413);
  const match = mime === 'image/png' ? data[0] === 137 && data[1] === 80 && data[2] === 78 && data[3] === 71 : mime === 'image/jpeg' ? data[0] === 255 && data[1] === 216 && data[2] === 255 : mime === 'image/webp' ? String.fromCharCode(...data.slice(0, 4)) === 'RIFF' && String.fromCharCode(...data.slice(8, 12)) === 'WEBP' : String.fromCharCode(...data.slice(0, 3)) === 'GIF';
  if (!match) return json({ error: 'Image file format does not match its type.' }, 400);
  let binary = ''; for (let i = 0; i < data.length; i += 8192) binary += String.fromCharCode(...data.slice(i, i + 8192));
  try {
    await initialize(env.SITE_DB);
    const hash = new Uint8Array(await crypto.subtle.digest('SHA-256', data));
    const hex = Array.from(hash.slice(0, 16), byte => byte.toString(16).padStart(2, '0')).join('');
    const id = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    await env.SITE_DB.prepare('INSERT OR IGNORE INTO cms_media (id, mime, data, created_at) VALUES (?, ?, ?, ?)').bind(id, mime, btoa(binary), new Date().toISOString()).run();
    return json({ url: `/api/media/${id}` });
  } catch { return json({ error: 'Could not save the image. Please try again.' }, 503); }
}
