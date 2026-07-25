import { useMemo, useState } from 'react';
import { BookOpenCheck, ChevronDown, Search } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const categoryOrder = [
  'Education',
  'Health',
  'Livelihood',
  'Climate Action & Protection',
  'Governance & Systems',
  'Monitoring & Expected Impact',
  'Sports',
  'Environment',
];

export default function ProgrammeReference() {
  const { content } = useAdmin();
  const [query, setQuery] = useState('');

  const groupedServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = (content.services || []).filter((item) =>
      !normalizedQuery ||
      `${item.category} ${item.title} ${item.description}`.toLowerCase().includes(normalizedQuery)
    );

    return categoryOrder
      .map((category) => ({
        category,
        items: filtered.filter((item) => item.category === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [content.services, query]);

  return (
    <section className="max-w-6xl mx-auto mb-16" aria-labelledby="programme-reference-title">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b border-slate-200 pb-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#007BC4]">
              <BookOpenCheck className="w-4 h-4" />
              Complete organisational programme reference
            </span>
            <h3 id="programme-reference-title" className="mt-2 text-2xl sm:text-4xl font-black text-[#003366]">
              PID Programme, Governance & Impact Information
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
              This directory contains the complete education, health, livelihood, climate action,
              governance, donor engagement and expected-impact information supplied by PID.
              Every entry can be updated from the Services & Programs area of the website console.
            </p>
          </div>

          <label className="relative block w-full lg:w-80">
            <span className="sr-only">Search PID programme information</span>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search programme information..."
              className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#007BC4]"
            />
          </label>
        </div>

        <div className="mt-6 space-y-4">
          {groupedServices.map((group, groupIndex) => (
            <details
              key={group.category}
              open={groupIndex === 0}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[#003366] hover:bg-sky-50">
                <div>
                  <h4 className="text-base sm:text-lg font-black">{group.category}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {group.items.length} {group.items.length === 1 ? 'information area' : 'information areas'}
                  </p>
                </div>
                <ChevronDown className="w-5 h-5 shrink-0 text-[#007BC4] transition-transform group-open:rotate-180" />
              </summary>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border-t border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                {group.items.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h5 className="text-base font-black text-[#003366]">{item.title}</h5>
                    <div className="mt-3 space-y-2">
                      {item.description.split('\n').filter(Boolean).map((paragraph, index) => {
                        const separator = paragraph.indexOf(':');
                        const hasLabel = separator > 0 && separator < 45;
                        return (
                          <p key={index} className="text-sm leading-relaxed text-slate-700">
                            {hasLabel ? (
                              <>
                                <strong className="text-slate-900">{paragraph.slice(0, separator + 1)}</strong>
                                {paragraph.slice(separator + 1)}
                              </>
                            ) : paragraph}
                          </p>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>
            </details>
          ))}

          {groupedServices.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
              No programme information matches “{query}”.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
