import { motion } from 'motion/react';
import { PROGRAMMES } from '../data';
import { Programme } from '../types';
import * as Icons from 'lucide-react';
import { translations, Language } from '../translations';

interface ProgrammesProps {
  onSelectProgramme: (prog: Programme | null) => void;
  selectedProgramme: Programme | null;
  language: Language;
}

export default function Programmes({ onSelectProgramme, selectedProgramme, language }: ProgrammesProps) {
  const t = translations[language];
  
  const getIcon = (name: string, className = "w-5 h-5") => {
    const IconComponent = (Icons as any)[name];
    if (IconComponent) return <IconComponent className={className} />;
    return <Icons.Shield className={className} />;
  };

  // If a programme is selected, render the beautiful, immersive details "page"
  if (selectedProgramme) {
    const prog = selectedProgramme;
    return (
      <section className="py-12 lg:py-20 bg-slate-50 min-h-screen" id="programme-detail-view">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Breadcrumb & Back Action */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => {
              onSelectProgramme(null);
              // Scroll back to the programmes section
              setTimeout(() => {
                const element = document.getElementById('programmes');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#0f594b] hover:text-[#08231d] bg-white border border-slate-200 shadow-2xs px-4 py-2.5 rounded-xl cursor-pointer transition-all mb-8 hover:shadow-sm"
          >
            <Icons.ArrowLeft className="w-4 h-4 text-gold-500" />
            <span>{t.progClose}</span>
          </motion.button>

          {/* Title Header Hero Panel */}
          <div className="relative rounded-3xl overflow-hidden bg-[#08231d] text-white p-6 md:p-12 lg:p-16 shadow-xl mb-12 border border-[#0d4035]">
            {/* Background image overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={prog.bgImage}
                alt={prog.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08231d] via-[#08231d]/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-4xl space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-2 bg-white/10 text-gold-400 border border-white/20 px-3 py-1 rounded-full text-[10.5px] font-mono uppercase tracking-wider"
              >
                {getIcon(prog.iconName, "w-3.5 h-3.5 text-gold-400")}
                <span>{language === 'en' ? 'PID Core Programme' : 'Enteekateeka ya PID Enkulu'}</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-white"
              >
                {prog.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-emerald-100/80 font-medium tracking-tight"
              >
                {prog.tagline}
              </motion.p>
            </div>
          </div>

          {/* Main Grid Layout for Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Content Side: Overview, Objectives, Activities, Outcomes (8 Columns) */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Detailed Overview Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-2xs space-y-4"
              >
                <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-50 pb-3 flex items-center space-x-2">
                  <Icons.Info className="w-5 h-5 text-emerald-600" />
                  <span>{language === 'en' ? 'Programme Overview' : 'Ebikwata ku Nteekateeka'}</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {prog.longDescription}
                </p>
              </motion.div>

              {/* Objectives & Expected Outcomes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Objectives Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs space-y-4"
                >
                  <h4 className="font-display font-bold text-md text-slate-900 border-b border-slate-50 pb-3 flex items-center space-x-2">
                    <Icons.Target className="w-4.5 h-4.5 text-[#0f594b]" />
                    <span>{language === 'en' ? 'Key Objectives' : 'Ebigendererwa Ebikulu'}</span>
                  </h4>
                  <ul className="space-y-3">
                    {prog.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-600">
                        <Icons.CheckCircle className="w-4 h-4 text-[#0f594b] mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Outcomes Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs space-y-4"
                >
                  <h4 className="font-display font-bold text-md text-slate-900 border-b border-slate-50 pb-3 flex items-center space-x-2">
                    <Icons.LineChart className="w-4.5 h-4.5 text-gold-600" />
                    <span>{language === 'en' ? 'Expected Impact & Outcomes' : 'Ebiruubirirwa n\'Ebinaddamu'}</span>
                  </h4>
                  <ul className="space-y-3">
                    {prog.outcomes.map((out, i) => (
                      <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-600">
                        <Icons.CheckCircle className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{out}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

              </div>

              {/* Actionable Core Activities Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-2xs space-y-6"
              >
                <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-50 pb-3 flex items-center space-x-2">
                  <Icons.Compass className="w-5 h-5 text-emerald-600" />
                  <span>{t.progObjectives}</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {prog.activities.map((act, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-100 p-5 rounded-xl space-y-3 hover:border-emerald-500/20 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-white text-[#0f594b] font-mono font-bold text-xs flex items-center justify-center border border-slate-100">
                        0{i + 1}
                      </div>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {act}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Right Side Sidebar: Media Showcase & Status details (4 Columns) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* High-quality detail image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-2xs"
              >
                <img
                  src={prog.detailImage}
                  alt="Programme Showcase in Uganda"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center space-x-2 text-[10.5px] font-mono text-slate-400">
                  <Icons.Camera className="w-3.5 h-3.5 text-gold-500" />
                  <span>{language === 'en' ? 'Authentic East African community engagement' : 'Okweyunga ku bantu abatuufu mu buvanjuba bwa Afrika'}</span>
                </div>
              </motion.div>

              {/* Extra Gallery Images (if available) */}
              {prog.galleryImages && prog.galleryImages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-2xs space-y-4"
                >
                  <h4 className="font-display font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                    <Icons.Image className="w-4 h-4 text-gold-500" />
                    <span>{language === 'en' ? 'Programme Photos' : 'Ebifananyi bye Nteekateeka'}</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {prog.galleryImages.map((imgUrl, i) => (
                      <div key={i} className="group/item relative rounded-xl overflow-hidden aspect-square bg-slate-100 border border-slate-150 shadow-3xs hover:border-[#0f594b]/20 transition-all">
                        <img
                          src={imgUrl}
                          alt={`Showcase ${i + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Elegant Partnership Invitation Card (replaces the technical status layout) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#08231d] text-white rounded-2xl p-6 shadow-md border border-[#0d4035] space-y-6"
              >
                <div>
                  <span className="text-[9.5px] font-mono tracking-widest uppercase text-gold-400 font-semibold">{language === 'en' ? 'COOPERATION OPPORTUNITY' : 'ENTEGEKA Y\'OBULI WAMU'}</span>
                  <h4 className="font-display font-bold text-base mt-1">{language === 'en' ? 'Partner on This Track' : 'Yegatte ku Kirooto Kino'}</h4>
                  <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                    {language === 'en' 
                      ? 'We actively coordinate with institutional donors, district leaders, and schools to sustain and expand this work across Uganda.'
                      : 'Tukolagana butereevu n\'abawagizi, abakulembeze ba disitulikiti, n\'amasomero okusobola okayimirizaawo n\'okugaziya omulimu guno.'}
                  </p>
                </div>

                <div className="border-t border-[#0e483b] pt-4 space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{language === 'en' ? 'Operational Hubs:' : 'Habs Zaffe:'}</span>
                    <span className="font-mono font-medium text-gold-400">Kampala, Butebo, Mbale</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{language === 'en' ? 'Key Participants:' : 'Abayingira mu Nteekateeka:'}</span>
                    <span className="font-mono font-medium text-gold-400">{language === 'en' ? 'Youth & Vulnerable Women' : 'Abavubuka n\'Abakyala'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{language === 'en' ? 'Alignment Status:' : 'Embeera y\'Enkolagana:'}</span>
                    <span className="font-mono font-medium text-gold-400">{language === 'en' ? 'Active & Open' : 'Kiggule Bulijjo'}</span>
                  </div>
                </div>

                <div className="border-t border-[#0e483b] pt-4">
                  <button
                    onClick={() => {
                      onSelectProgramme(null);
                      // Navigate to contact or opportunities
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        // fallback scroll to top
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                      }
                    }}
                    className="block w-full py-2.5 text-center bg-gold-500 hover:bg-gold-400 text-slate-900 transition-colors font-bold text-xs rounded-lg uppercase tracking-wider cursor-pointer"
                  >
                    {language === 'en' ? 'Inquire About Partnerships' : 'Kwatagana Naffe Wano'}
                  </button>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </section>
    );
  }

  // Render the core programmes home list section
  return (
    <section className="py-24 bg-white" id="programmes">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-600 font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
            02 &mdash; {t.navProgrammes}
          </span>
          <h3 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {t.progTitle}
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            {t.progSubtitle}
          </p>
        </div>

        {/* 6 Grid Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMMES.map((prog, idx) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col justify-end"
            >
              {/* Photographic Background Picture */}
              <div className="absolute inset-0 z-0">
                <img
                  src={prog.bgImage}
                  alt={prog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* High Contrast Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
              </div>

              {/* Floating icon top right */}
              <div className="absolute top-5 right-5 z-10 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                {getIcon(prog.iconName, "w-5 h-5 text-gold-400")}
              </div>

              {/* Text Area & Call to Action (Z-index 10) */}
              <div className="relative z-10 p-6 md:p-8 space-y-3.5 text-white">
                <div>
                  <span className="text-[9.5px] uppercase font-mono tracking-widest text-gold-400 font-bold">PID UGANDA</span>
                  <h4 className="font-display font-bold text-lg sm:text-xl tracking-tight leading-snug mt-0.5 group-hover:text-gold-400 transition-colors">
                    {prog.title}
                  </h4>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {prog.shortDescription}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      onSelectProgramme(prog);
                      // Scroll smoothly to detail top
                      setTimeout(() => {
                        const element = document.getElementById('programme-detail-view');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="font-semibold text-gold-400 group-hover:text-gold-300 transition-colors inline-flex items-center space-x-1.5 cursor-pointer text-left"
                  >
                    <span>{language === 'en' ? 'Read Program Details' : 'Laba Ebisingawo'}</span>
                    <Icons.ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <span className="text-[10px] text-slate-400 font-mono">ACTIVE</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
