import { guard, json } from '../../../lib/cms.js';
import { administratorDirectory } from '../../../lib/adminDirectory.js';
export async function onRequestGet({ request, env }) {
  const denied = await guard(request, env);
  if (denied) return denied;
  return json({ administrators: administratorDirectory });
}
