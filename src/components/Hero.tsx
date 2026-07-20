import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { translations, Language } from '../translations';

interface HeroProps {
  onNavigate?: (page: 'home' | 'about' | 'programmes' | 'governance' | 'get-involved' | 'contact') => void;
  language: Language;
  onOpenDonation?: () => void;
}

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=80', // Sports/Youth Soccer (Original)
  'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1920&q=80', // Environment/Reforestation (African Nature)
  'https://images.unsplash.com/photo-1544928147-79a2bec1638f?auto=format&fit=crop&w=1920&q=80', // Skills/Sewing
  'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1920&q=80', // Smart Agriculture/Composting
];

export default function Hero({ onNavigate, language, onOpenDonation }: HeroProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // Transition every 6 seconds
    return () => clearInterval(interval);
  }, []);

  const t = translations[language];

  return (
    <section className="relative min-h-[90vh] bg-[#08231d] text-white flex flex-col justify-between pt-32 pb-12 overflow-hidden">
      
      {/* Background Photographic Layer with the Forest Green gradient matching the mockup */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img 
            key={currentImgIndex}
            src={HERO_IMAGES[currentImgIndex]} 
            alt="Plan Integral Development Uganda dynamic background slide" 
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.42, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        {/* Modern multi-layer gradient mask for ultimate text legibility and cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08231d] via-[#08231d]/92 to-[#08231d]/35 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08231d] via-[#08231d]/40 to-transparent" />
        <div className="absolute inset-0 bg-[#08231d]/15 backdrop-blur-[0.5px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          
          {/* Eyebrow */}
          <div className="flex items-center space-x-2 text-gold-500 font-mono text-xs uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
            <span>Plan Integral Development &middot; Uganda</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08]">
            {t.heroTitlePre}<br />
            <span className="italic font-normal text-gold-400">{t.heroTitlePost}</span>
          </h1>

          {/* Intro Text */}
          <p className="text-base sm:text-lg text-emerald-100/85 leading-relaxed max-w-xl">
            {t.heroSubtitle}
          </p>

          {/* Elegant Pillar Pills of work (replaces the LCD tech-gadget marquee) */}
          <div className="flex flex-wrap gap-2 pt-2 max-w-xl" aria-label="PID Core Pillars">
            {['Sport', 'Education', 'Health', 'Livelihoods', 'Climate', 'Agriculture'].map((pillar) => (
              <span
                key={pillar}
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#0c332b]/80 backdrop-blur-md border border-[#c5a059]/30 text-gold-100 text-xs font-medium font-mono uppercase tracking-wider"
              >
                <span className="w-1 h-1 rounded-full bg-[#c5a059] mr-2" />
                {pillar === 'Sport' && (language === 'en' ? 'Sport & Play' : 'Ebyemizannyo')}
                {pillar === 'Education' && (language === 'en' ? 'Education' : 'Ebyenjigiriza')}
                {pillar === 'Health' && (language === 'en' ? 'Health & Wellbeing' : 'Ebyobulamu')}
                {pillar === 'Livelihoods' && (language === 'en' ? 'Livelihoods' : 'Okweyimirizaawo')}
                {pillar === 'Climate' && (language === 'en' ? 'Climate Action' : 'Okukuuma Obutonde')}
                {pillar === 'Agriculture' && (language === 'en' ? 'Agriculture' : 'Obulimi Obulungi')}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={() => onNavigate && onNavigate('programmes')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#08231d] bg-gold-500 hover:bg-gold-400 active:scale-[0.98] transition-all rounded-lg text-center cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>{t.btnExplore}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate && onNavigate('about')}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:text-gold-500 transition-colors text-center cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>{t.btnWhoWeAre}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {onOpenDonation && (
              <button
                onClick={onOpenDonation}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] transition-all rounded-lg text-center cursor-pointer flex items-center justify-center space-x-2 border border-emerald-500/30 shadow-md"
              >
                <span>{language === 'en' ? 'Support Our Mission' : 'Yamba ku Nteekateeka'}</span>
                <span className="text-gold-400">❤</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Location Badge at the very bottom of the hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full border-t border-[#0c332b]/40 pt-6 mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono text-emerald-300/70 gap-2">
        <div>{t.basedIn}</div>
        <div className="uppercase tracking-widest text-gold-500/70">{t.workingAcross}</div>
      </div>

    </section>
  );
}
