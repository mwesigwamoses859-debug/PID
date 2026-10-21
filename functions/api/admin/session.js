// ADMIN_PASSWORD is a private Cloudflare Pages secret, never a VITE_* variable.
const encoder = new TextEncoder();
const cookieName = '__Host-pid_admin';
const ttl = 1800;
const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
const json = (body, status = 200, extra = {}) => new Response(JSON.stringify(body), { status, headers: { ...headers, ...extra } });
const hex = (buffer) => Array.from(new Uint8Array(buffer), b => b.toString(16).padStart(2, '0')).join('');
const digest = async (value) => new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value)));
const equal = (a, b) => { let difference = a.length ^ b.length; for (let i = 0; i < a.length; i++) difference |= a[i] ^ (b[i] ?? 0); return difference === 0; };
const sign = async (payload, password) => {
  const key = await crypto.subtle.importKey('raw', await digest('pid-session-key-v1:' + password), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, encoder.encode('pid-admin-v1:' + payload)));
};
const cookie = (value, age) => `${cookieName}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${age}`;

export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  if (request.method !== 'GET' && request.headers.get('Origin') !== url.origin) return json({ authenticated: false }, 403);
  if (request.method === 'DELETE') return json({ authenticated: false }, 200, { 'Set-Cookie': cookie('', 0) });
  if (!['GET', 'POST'].includes(request.method)) return json({ authenticated: false }, 405, { Allow: 'GET, POST, DELETE' });
  const password = env.ADMIN_PASSWORD;
  if (typeof password !== 'string' || password.length < 16) return json({ authenticated: false }, 503);

  if (request.method === 'POST') {
    if (!(request.headers.get('Content-Type') || '').startsWith('application/json')) return json({ authenticated: false }, 415);
    if (Number(request.headers.get('Content-Length') || 0) > 2048) return json({ authenticated: false }, 413);
    let body;
    try { const text = await request.text(); if (text.length > 2048) return json({ authenticated: false }, 413); body = JSON.parse(text); } catch { return json({ authenticated: false }, 400); }
    if (!body || typeof body.password !== 'string' || body.password.length > 1024) return json({ authenticated: false }, 400);
    if (!equal(await digest(body.password), await digest(password))) return json({ authenticated: false }, 401);
    const payload = `${Math.floor(Date.now() / 1000) + ttl}.${crypto.randomUUID()}`;
    const token = `${payload}.${await sign(payload, password)}`;
    return json({ authenticated: true }, 200, { 'Set-Cookie': cookie(token, ttl) });
  }

  const token = (request.headers.get('Cookie') || '').split(';').map(s => s.trim()).find(s => s.startsWith(cookieName + '='))?.slice(cookieName.length + 1) || '';
  const parts = token.split('.');
  if (parts.length !== 3 || !/^\d{10}$/.test(parts[0]) || !/^[a-f0-9-]{36}$/.test(parts[1]) || !/^[a-f0-9]{64}$/.test(parts[2])) return json({ authenticated: false }, 401);
  const expires = Number(parts[0]);
  const now = Math.floor(Date.now() / 1000);
  if (expires <= now || expires > now + ttl) return json({ authenticated: false }, 401);
  const expected = await sign(`${parts[0]}.${parts[1]}`, password);
  if (!equal(encoder.encode(parts[2]), encoder.encode(expected))) return json({ authenticated: false }, 401);
  return json({ authenticated: true });
}
