import { useId, useRef, useState } from 'react';
import { Bold, Italic, List, ListOrdered, Quote, Heading2, Link, Eye, Pencil, X } from 'lucide-react';
import { formatSelection, safeEditorLink, wordCount, type FormatAction } from '../lib/editorTools';
import { RichText } from './RichText';

export function RichTextEditor({ value, onChange, label, disabled = false }: { value: string; onChange: (value: string) => void; label: string; disabled?: boolean }) {
  const id = useId();
  const input = useRef<HTMLTextAreaElement>(null);
  const selection = useRef({ start: 0, end: 0 });
  const [preview, setPreview] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [href, setHref] = useState('');
  const [error, setError] = useState('');
  const count = wordCount(value);
  const remember = () => { if (input.current) selection.current = { start: input.current.selectionStart, end: input.current.selectionEnd }; };
  const apply = (action: FormatAction, url = '') => {
    if (disabled) return;
    try {
      const result = formatSelection(value, selection.current.start, selection.current.end, action, url);
      onChange(result.text); setPreview(false); setLinkOpen(false); setError('');
      requestAnimationFrame(() => { input.current?.focus(); input.current?.setSelectionRange(result.start, result.end); remember(); });
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Please check your link.'); }
  };
  const tools = [
    { action: 'bold', label: 'Bold', icon: Bold }, { action: 'italic', label: 'Italic', icon: Italic },
    { action: 'bullets', label: 'Bulleted list', icon: List }, { action: 'numbered', label: 'Numbered list', icon: ListOrdered },
    { action: 'quote', label: 'Quote', icon: Quote }, { action: 'heading', label: 'Subheading', icon: Heading2 },
  ] as const;
  return <div className="rounded-2xl border border-slate-600 bg-slate-950 overflow-hidden">
    <div className="flex items-center justify-between gap-2 border-b border-slate-700 p-2 flex-wrap">
      <div className="flex gap-1 flex-wrap" role="toolbar" aria-label={`${label} formatting`}>
        {tools.map(tool => <button key={tool.action} type="button" title={tool.label} aria-label={tool.label} disabled={disabled || preview} onMouseDown={event => event.preventDefault()} onClick={() => apply(tool.action)} className="p-2 rounded-lg text-slate-200 hover:bg-slate-700 disabled:opacity-35"><tool.icon size={17} /></button>)}
        <button type="button" title="Insert link" aria-label="Insert link" disabled={disabled || preview} onMouseDown={event => event.preventDefault()} onClick={() => { remember(); setLinkOpen(true); setHref(''); setError(''); }} className="p-2 rounded-lg text-slate-200 hover:bg-slate-700 disabled:opacity-35"><Link size={17} /></button>
      </div>
      <div className="flex gap-1 text-xs"><button type="button" aria-pressed={!preview} onClick={() => setPreview(false)} className={`px-3 py-2 rounded-lg flex items-center gap-1.5 ${!preview ? 'bg-sky-800 text-white' : 'text-slate-300'}`}><Pencil size={13} /> Write</button><button type="button" aria-pressed={preview} onClick={() => { setPreview(true); setLinkOpen(false); }} className={`px-3 py-2 rounded-lg flex items-center gap-1.5 ${preview ? 'bg-sky-800 text-white' : 'text-slate-300'}`}><Eye size={13} /> Preview text</button></div>
    </div>
    {linkOpen && <div className="p-4 bg-slate-900 border-b border-slate-700 space-y-3">
      <div className="flex justify-between items-center"><label htmlFor={`${id}-link`} className="text-xs font-bold text-white">Link destination</label><button type="button" aria-label="Cancel link" onClick={() => setLinkOpen(false)} className="p-1 text-slate-300"><X size={16} /></button></div>
      <input id={`${id}-link`} autoFocus type="text" value={href} onChange={event => { setHref(event.target.value); setError(''); }} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); apply('link', href); } if (event.key === 'Escape') setLinkOpen(false); }} placeholder="https://example.org or #contact" className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-white" />
      <p className="text-xs text-slate-400">Use HTTPS, a page section, mailto:email@example.org or tel:+256…</p>
      {error && <p role="alert" className="text-xs text-rose-300">{error}</p>}
      <button type="button" disabled={disabled || !safeEditorLink(href)} onClick={() => apply('link', href)} className="px-4 py-2 rounded-lg bg-[#7DC242] text-[#003366] text-xs font-bold disabled:opacity-40">Add link</button>
    </div>}
    {preview ? <div className="min-h-64 bg-white p-5 text-slate-800 text-sm leading-relaxed" aria-label={`${label} preview`}><RichText text={value} />{!value && <p className="text-slate-400">Your formatted text will appear here.</p>}</div> : <textarea id={id} ref={input} aria-label={label} value={value} disabled={disabled} onChange={event => onChange(event.target.value)} onSelect={remember} onKeyUp={remember} onClick={remember} rows={10} className="block w-full min-h-64 resize-y bg-transparent p-4 text-sm leading-relaxed text-white outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 disabled:opacity-50" />}
    <div className="p-3 border-t border-slate-700 flex justify-between gap-3 flex-wrap text-[11px] text-slate-400"><span>Select text, then choose formatting. Use Preview text to check it.</span><span aria-live="polite">{count} words · {value.length} characters · {count ? Math.max(1, Math.ceil(count / 200)) : 0} min read</span></div>
  </div>;
}
