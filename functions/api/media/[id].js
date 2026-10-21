export async function onRequestGet({ params, env }) {
  if (!/^[a-f0-9-]{36}$/.test(String(params.id)) || !env.SITE_DB) return new Response('Image not found', { status: 404 });
  try {
    const row = await env.SITE_DB.prepare('SELECT mime, data FROM cms_media WHERE id = ?').bind(params.id).first();
    if (!row) return new Response('Image not found', { status: 404 });
    const data = Uint8Array.from(atob(row.data), char => char.charCodeAt(0));
    return new Response(data, { headers: { 'Content-Type': row.mime, 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'none'" } });
  } catch { return new Response('Image unavailable', { status: 503 }); }
}
