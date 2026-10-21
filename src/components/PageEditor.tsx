import { useState } from 'react';
import { FilePenLine, Search, RotateCcw } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { EDITOR_FIELDS } from '../config/editorFields';
import { RichTextEditor } from './RichTextEditor';

export function PageEditor() {
  const { content, updateContent, resetContentField, isPublishing } = useAdmin();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState('All pages');
  const [selected, setSelected] = useState<string>('heroDescription');
  const fields = EDITOR_FIELDS.filter(field => (page === 'All pages' || field.page === page) && `${field.label} ${field.page}`.toLowerCase().includes(query.toLowerCase()));
  const field = fields.find(item => item.key === selected) || fields[0];
  return <section className="space-y-6 text-white">
    <div><h3 className="text-xl font-black flex items-center gap-2"><FilePenLine className="text-[#7DC242]" /> Page Editor</h3><p className="text-xs text-slate-400 mt-2">Write and format your website copy. Changes save to your draft; use Review & Publish when you are ready.</p></div>
    <div className="grid sm:grid-cols-2 gap-3"><label className="text-xs text-slate-300 space-y-2"><span className="flex items-center gap-1.5"><Search size={14} /> Find text to edit</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search headings, introductions, mission…" className="block w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-3 text-sm text-white" /></label><label className="text-xs text-slate-300 space-y-2">Filter by page<select value={page} onChange={event => setPage(event.target.value)} className="block w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-3 text-sm text-white">{['All pages', ...new Set(EDITOR_FIELDS.map(field => field.page))].map(name => <option key={name}>{name}</option>)}</select></label></div>
    {field ? <div className="grid xl:grid-cols-[220px_minmax(0,1fr)] gap-5 items-start">
      <nav aria-label="Editable page fields" className="rounded-2xl bg-slate-900 border border-slate-700 p-2 max-h-96 overflow-y-auto space-y-1">{fields.map(item => <button key={item.key} type="button" aria-current={item.key === field.key ? 'true' : undefined} onClick={() => setSelected(item.key)} className={`w-full text-left p-3 rounded-xl text-xs ${item.key === field.key ? 'bg-sky-900 text-white' : 'text-slate-300 hover:bg-slate-800'}`}><span className="block text-[10px] uppercase tracking-wide opacity-60 mb-1">{item.page}</span><span className="font-bold">{item.label}</span></button>)}</nav>
      <div className="min-w-0 space-y-4"><div className="flex items-start justify-between gap-3 flex-wrap"><div><h4 className="font-bold">{field.label}</h4><p className="text-xs text-slate-400 mt-1">{field.help}</p></div><button type="button" disabled={isPublishing} onClick={() => { if (window.confirm(`Replace only “${field.label}” with the current live text? You can undo this change.`)) resetContentField(field.key); }} className="flex items-center gap-1.5 text-xs text-sky-300 py-1"><RotateCcw size={13} /> Use live text</button></div>
      {field.rich ? <RichTextEditor key={field.key} label={field.label} value={String(content[field.key] || '')} onChange={value => updateContent({ [field.key]: value })} disabled={isPublishing} /> : <label className="block text-xs text-slate-300 space-y-2">{field.label}<input value={String(content[field.key] || '')} onChange={event => updateContent({ [field.key]: event.target.value })} disabled={isPublishing} className="block w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white text-sm" /><span className="block text-slate-400">Headings and button labels use the fonts and sizes in Design Studio.</span></label>}
      <p className="text-xs text-slate-400">Use the Undo and Redo buttons above to step through this session’s edits. Preview Draft shows your changes in the full website.</p></div>
    </div> : <p className="rounded-2xl border border-slate-700 p-6 text-sm text-slate-300">No matching fields. Try a different search or page filter.</p>}
  </section>;
}
