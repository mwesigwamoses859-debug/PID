import { useState } from 'react';
import { ORGANIZATIONAL_STRUCTURE, SYSTEMS_POLICIES } from '../data';
import { OrgNode } from '../types';
import { ShieldCheck, ArrowDown, ChevronRight, Search, FileText, CheckCircle, ShieldAlert, Receipt, Leaf, Users } from 'lucide-react';
import { translations, Language } from '../translations';

interface StructureAndPoliciesProps {
  language: Language;
}

export default function StructureAndPolicies({ language }: StructureAndPoliciesProps) {
  const [selectedNode, setSelectedNode] = useState<OrgNode>(ORGANIZATIONAL_STRUCTURE);
  const [searchQuery, setSearchQuery] = useState('');

  const t = translations[language];

  const getPolicyIcon = (name: string) => {
    switch (name) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-red-600" />;
      case 'Receipt':
        return <Receipt className="w-5 h-5 text-indigo-600" />;
      case 'Users':
        return <Users className="w-5 h-5 text-emerald-600" />;
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-amber-600" />;
      default:
        return <FileText className="w-5 h-5 text-slate-600" />;
    }
  };

  const filteredPolicies = SYSTEMS_POLICIES.filter(policy => 
    policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    policy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    policy.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 bg-white" id="governance">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-600 font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
            03 &mdash; {language === 'en' ? 'Governance' : 'Etteeka n\'Okulambika'}
          </span>
          <h3 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {language === 'en' ? 'Structure & Supporting Policies' : 'Entegeka n\'Ebifuga Ebitongole'}
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            {language === 'en' ? 'A transparent regulatory and operational framework ensuring strict accountability to local districts, national ministries, and our international partners.' : 'Enfuga ennambulukufu n\'enkola ezigendererwamu okukuuma obwesigwa n\'obuvunaanyizibwa eri disitulikiti zaffe, minisitule, n\'abakwatani baffe ab\'ensi yonna.'}
          </p>
        </div>

        {/* Structure and Policies Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Interactive Org Structure (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-xs">
              <h4 className="font-display font-bold text-lg text-slate-900 mb-2">{language === 'en' ? 'Organizational Structure' : 'Entegeka y\'Ekitongole'}</h4>
              <p className="text-xs text-slate-500 mb-6">
                {language === 'en' ? 'Click on the operational tiers to inspect specific mandates and core functions.' : 'Nyiga ku mitendera gy\'okola okwetegereza ebiragiro n\'emirimu emikulu.'}
              </p>

              {/* Node Tree visualizer */}
              <div className="space-y-4">
                {/* Board Node */}
                <button
                  onClick={() => setSelectedNode(ORGANIZATIONAL_STRUCTURE)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedNode.title === ORGANIZATIONAL_STRUCTURE.title
                      ? 'bg-white border-[#0f594b] shadow-xs'
                      : 'bg-white border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-600 font-semibold">{language === 'en' ? 'Governance Oversight' : 'Okulambika Ekitongole'}</span>
                      <h5 className="font-bold text-sm text-slate-800 mt-0.5">{ORGANIZATIONAL_STRUCTURE.title}</h5>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${selectedNode.title === ORGANIZATIONAL_STRUCTURE.title ? 'rotate-90 text-emerald-600' : ''}`} />
                  </div>
                </button>

                <div className="flex justify-center my-1">
                  <ArrowDown className="w-4 h-4 text-slate-300" />
                </div>

                {/* Secretariat Node */}
                {ORGANIZATIONAL_STRUCTURE.children && ORGANIZATIONAL_STRUCTURE.children.map((secretariat) => (
                  <div key={secretariat.title} className="space-y-4">
                    <button
                      onClick={() => setSelectedNode(secretariat)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        selectedNode.title === secretariat.title
                          ? 'bg-white border-[#0f594b] shadow-xs'
                          : 'bg-white border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-600 font-semibold">{language === 'en' ? 'National Coordination' : 'Kwasaganya mu Ggwanga'}</span>
                          <h5 className="font-bold text-sm text-slate-800 mt-0.5">{secretariat.title}</h5>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${selectedNode.title === secretariat.title ? 'rotate-90 text-emerald-600' : ''}`} />
                      </div>
                    </button>

                    <div className="flex justify-center my-1">
                      <ArrowDown className="w-4 h-4 text-slate-300" />
                    </div>

                    {/* Districts/Hubs Group */}
                    <div className="grid grid-cols-1 gap-2.5 pl-4 border-l-2 border-slate-100">
                      {secretariat.children && secretariat.children.map((hub) => (
                        <button
                          key={hub.title}
                          onClick={() => setSelectedNode(hub)}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                            selectedNode.title === hub.title
                              ? 'bg-white border-[#0f594b] shadow-xs'
                              : 'bg-white border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-[9px] uppercase font-mono text-slate-400 font-bold">{language === 'en' ? 'Community Operations Hub' : 'Habs Z\'emirimu mu Bitundu'}</span>
                              <h6 className="font-bold text-slate-700 mt-0.5">{hub.title}</h6>
                            </div>
                            <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${selectedNode.title === hub.title ? 'rotate-90 text-[#0f594b]' : ''}`} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Node Details Box */}
            <div className="bg-[#08231d] text-white rounded-2xl p-6 shadow-md border border-[#0d4035]">
              <span className="text-[10px] font-mono tracking-widest uppercase text-gold-400 font-semibold">{language === 'en' ? 'Structure Mandate & Role' : 'Obuvunaanyizibwa bw\'Ekitongole'}</span>
              <h5 className="font-display font-bold text-lg mt-1 text-white">{selectedNode.title}</h5>
              <p className="text-xs text-slate-300 font-mono mt-0.5">{selectedNode.subtitle}</p>
              <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                {selectedNode.description}
              </p>
              <div className="mt-5 pt-4 border-t border-[#0e483b] flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span className="text-[11px] text-slate-400">{language === 'en' ? 'Strict alignment with NGO Act CAP 109 regulations.' : 'Kukolera ddala ku mateeka g\'ekitongole ekya NGO Act CAP 109.'}</span>
              </div>
            </div>
          </div>

          {/* Supporting Systems & Policies (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 shadow-xs h-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h4 className="font-display font-bold text-lg text-slate-900">{language === 'en' ? 'Supporting Systems & Policies' : 'Enkola n\'Ebifuga Ebiraga Obweru'}</h4>
                  <p className="text-xs text-slate-500">
                    {language === 'en' ? 'Comprehensive compliance documents guiding all operations, funding channels, and local safety standards.' : 'Ebiwandiiko ebijjuvu eby\'obugonvu ebirambika emirimu gyonna, enkola z\'ensimbi, n\'ebipimo by\'obukuumi.'}
                  </p>
                </div>
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder={language === 'en' ? 'Search policies...' : 'Noonya ebiwandiiko...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-48 pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0f594b]"
                  />
                  <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              {/* Policy List Container */}
              <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                {filteredPolicies.length > 0 ? (
                  filteredPolicies.map((policy) => (
                    <div
                      key={policy.code}
                      className="bg-white border border-slate-100 rounded-xl p-4 shadow-2xs hover:border-slate-200"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-emerald-50 rounded-lg flex-shrink-0 mt-0.5">
                          {getPolicyIcon(policy.iconName)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-mono bg-emerald-50 text-slate-600 px-1.5 py-0.5 rounded uppercase font-semibold border border-emerald-100/50">
                              {policy.code}
                            </span>
                            <h5 className="font-bold text-slate-800 text-xs sm:text-sm">
                              {policy.title}
                            </h5>
                          </div>
                          <p className="text-[11.5px] text-slate-500 leading-relaxed">
                            {policy.description}
                          </p>
                          <div className="pt-2 flex items-center space-x-1">
                            <span className="text-[10px] font-semibold text-slate-400 uppercase">Scope:</span>
                            <span className="text-[10px] text-emerald-600 font-semibold">{policy.scope}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl border border-slate-100">
                    <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">{language === 'en' ? 'No policies found matching your search term.' : 'Tewali biwandiiko bisangiddwa bigendagana n\'ebyo by\'onoonya.'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
