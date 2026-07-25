/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Handshake, Building2 } from 'lucide-react';
import { MixedColorText } from './MixedColorText';
import { useAdmin } from '../context/AdminContext';
import { LogoMGLSD } from './PartnerLogos';

interface PartnerItem {
  id: string;
  name: string;
  shortName: string;
  imageUrl?: string;
  LogoComponent?: React.FC<{ className?: string }>;
}

export default function Partners() {
  const { content } = useAdmin();

  const partners: PartnerItem[] = (content.partners || [])
    .filter((partner) => partner.visible)
    .map((partner) => ({
      id: partner.id,
      name: partner.name,
      shortName: partner.shortName,
      imageUrl: partner.logo || undefined,
      LogoComponent: partner.id === 'mglsd' && !partner.logo ? LogoMGLSD : undefined,
    }));

  return (
    <section id="partners" className="bg-white font-sans scroll-mt-12 border-b border-slate-200">
      
      {/* Top Banner Header Section */}
      <div className="relative bg-[#003366] text-white py-20 px-4 overflow-hidden border-b border-sky-900 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src={content.partnersHeaderBgImage || "https://images.unsplash.com/photo-1543326301-33f5d50fd90f?auto=format&fit=crop&q=80&w=1600"}
            alt="Official Partners - PID Uganda"
            className="w-full h-full object-cover opacity-25 filter brightness-75 contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/95 via-[#002852]/90 to-[#001c38]/98" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7DC242]/20 border border-[#7DC242]/40 text-[#7DC242] text-xs font-black uppercase tracking-widest">
            <Handshake className="w-4 h-4 text-[#7DC242]" />
            Official Alliances & Partners
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            <MixedColorText text={content.partnersTitle || "Institutional Collaboration for {National Reach}"} isDarkBg={true} />
          </h1>
          <p className="text-slate-200 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            {content.partnersSubtitle || "PID operates under formal Memoranda of Understanding with government agencies, ministries, and sports development networks."}
          </p>
        </div>
      </div>

      {/* Main Partners Section Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        
        {/* SECTION TITLE */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#003366] tracking-tight">
            Official Partners
          </h2>
          <div className="w-16 h-1 bg-[#7DC242] mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Empowering youth through strategic bilateral frameworks and accredited national sports development networks.
          </p>
        </div>

        {/* ALL 5 OFFICIAL PARTNERS GRID Showcase */}
        <div className="relative space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#007BC4]" />
              <h3 className="text-lg font-black text-[#003366] tracking-tight">Partner Network Directory</h3>
            </div>
            <span className="text-xs font-bold text-[#7DC242] uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              5 Key Institutions
            </span>
          </div>

          {/* Grid Cards showing all 5 Attached Partners */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {partners.map((partner, idx) => {
              const LogoComp = partner.LogoComponent;
              return (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="bg-white border-2 border-slate-200/90 hover:border-[#007BC4] rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1.5 min-h-[220px]"
                >
                  <div className="w-full h-32 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                    {LogoComp ? (
                      <LogoComp className="max-h-full max-w-full object-contain" />
                    ) : partner.imageUrl ? (
                      <img 
                        src={partner.imageUrl} 
                        alt={partner.name}
                        className="w-full h-full object-contain filter group-hover:brightness-105 transition-all"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <Building2 className="w-10 h-10 text-slate-400" />
                    )}
                  </div>

                  <div className="mt-4 space-y-1">
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#003366] group-hover:text-[#007BC4] transition-colors leading-snug line-clamp-2">
                      {partner.name}
                    </h4>
                    <span className="text-[11px] font-bold text-[#7DC242] block uppercase tracking-wider">
                      {partner.shortName}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* OFFICIAL REGULATORY STATEMENT BANNER */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center max-w-4xl mx-auto shadow-sm space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-[#7DC242]">
            <Building2 className="w-4 h-4 text-[#7DC242]" />
            <span>Statutory Compliance & MoU Framework</span>
          </div>
          <p className="text-sm sm:text-base text-slate-700 font-bold leading-relaxed">
            All partner relationships are governed by active Bilateral Memoranda of Understanding and statutory regulatory registrations under the NGO Act CAP 109 of Uganda.
          </p>
        </div>

      </div>
    </section>
  );
}
