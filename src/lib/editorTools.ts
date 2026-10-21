export function safeEditorLink(input: string): string {
  const value = input.trim();
  if (!value || /[\u0000-\u001f\u007f\\]/.test(value)) return '';
  if (/^https:\/\//i.test(value)) { try { const url = new URL(value); return url.hostname && !url.username && !url.password ? url.href : ''; } catch { return ''; } }
  if (/^mailto:[^\s@?]+@[^\s@?]+\.[^\s@?]+$/i.test(value) || /^tel:\+?[\d -]{6,22}$/i.test(value)) return value;
  if (/^\/(?!\/)[^\s]*$/.test(value) || /^#[a-z][a-z0-9-]*$/i.test(value)) return value;
  return '';
}
export type FormatAction = 'bold' | 'italic' | 'bullets' | 'numbered' | 'quote' | 'heading' | 'link';
export function formatSelection(text: string, start: number, end: number, action: FormatAction, href = '') {
  start = Math.max(0, Math.min(start, text.length)); end = Math.max(start, Math.min(end, text.length));
  let before = text.slice(0, start), selected = text.slice(start, end), after = text.slice(end);
  if (action === 'bold' || action === 'italic') {
    const mark = action === 'bold' ? '**' : '*';
    if (before.endsWith(mark) && after.startsWith(mark)) return { text: before.slice(0, -mark.length) + selected + after.slice(mark.length), start: start - mark.length, end: end - mark.length };
    selected ||= 'your text';
    return { text: before + mark + selected + mark + after, start: start + mark.length, end: start + mark.length + selected.length };
  }
  if (action === 'link') {
    const url = safeEditorLink(href); if (!url) throw new Error('Use an HTTPS link, an email address starting with mailto:, a phone link starting with tel:, or a page section such as #contact.');
    selected ||= 'Read more';
    const label = selected.replace(/[\[\]]/g, '');
    const escaped = url.replace(/\(/g, '%28').replace(/\)/g, '%29');
    return { text: before + `[${label}](${escaped})` + after, start: start + 1, end: start + 1 + label.length };
  }
  const lineStart = text.lastIndexOf('\n', start - 1) + 1;
  const lineEnd = text.indexOf('\n', end);
  const finish = lineEnd === -1 ? text.length : lineEnd;
  const lines = (text.slice(lineStart, finish) || 'List item').split('\n');
  const pattern = action === 'bullets' ? /^- / : action === 'numbered' ? /^\d+\. / : action === 'quote' ? /^> / : /^## /;
  const remove = lines.every(line => pattern.test(line));
  const replaced = lines.map((line, index) => remove ? line.replace(pattern, '') : (action === 'bullets' ? '- ' : action === 'numbered' ? `${index + 1}. ` : action === 'quote' ? '> ' : '## ') + line).join('\n');
  const prefix = text.slice(0, lineStart);
  const suffix = text.slice(finish);
  return { text: prefix + replaced + suffix, start: lineStart, end: lineStart + replaced.length };
}

export interface EditHistory<T> { past: T[]; future: T[]; group: string; at: number; }
export const emptyEditHistory = <T>(): EditHistory<T> => ({ past: [], future: [], group: '', at: 0 });
export function recordEdit<T>(state: EditHistory<T>, previous: T, group: string, now = Date.now()): EditHistory<T> {
  const coalesce = group !== '' && state.group === group && now - state.at < 900 && state.past.length > 0 && state.future.length === 0;
  return { past: coalesce ? state.past : [...state.past, previous].slice(-25), future: [], group, at: now };
}
export function stepHistory<T>(state: EditHistory<T>, current: T, direction: 'undo' | 'redo'): { state: EditHistory<T>; value: T } {
  const source = direction === 'undo' ? state.past : state.future;
  if (!source.length) return { state, value: current };
  return direction === 'undo' ? { value: source[source.length - 1], state: { past: source.slice(0, -1), future: [...state.future, current].slice(-25), group: '', at: 0 } } : { value: source[source.length - 1], state: { past: [...state.past, current].slice(-25), future: source.slice(0, -1), group: '', at: 0 } };
}
export interface ContentChange { path: string; label: string; before: string; after: string; }
const title = (value: string) => value.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^\w/, value => value.toUpperCase());
export function detailedChanges(live: unknown, draft: unknown, path = ''): ContentChange[] {
  if (JSON.stringify(live) === JSON.stringify(draft)) return [];
  if (live && draft && typeof live === 'object' && typeof draft === 'object' && Array.isArray(live) === Array.isArray(draft)) {
    const keys = new Set([...Object.keys(live), ...Object.keys(draft)]);
    return [...keys].flatMap(key => detailedChanges(live[key], draft[key], path ? path + '.' + key : key));
  }
  const display = (value: unknown) => value === undefined ? '(not set)' : typeof value === 'string' ? value : JSON.stringify(value);
  return [{ path, label: path.split('.').map(part => /^\d+$/.test(part) ? `Item ${Number(part) + 1}` : title(part)).join(' › '), before: display(live), after: display(draft) }];
}
export const wordCount = (value: string) => (value.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*#>{}\[\]]/g, '').match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || []).length;
