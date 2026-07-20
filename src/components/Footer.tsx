import { Mail, Phone, MapPin, ArrowUpRight, Download, Heart } from 'lucide-react';
import Logo from './Logo';
import { translations, Language } from '../translations';

interface FooterProps {
  currentPage: 'home' | 'about' | 'programmes' | 'governance' | 'get-involved' | 'contact';
  onNavigate: (page: 'home' | 'about' | 'programmes' | 'governance' | 'get-involved' | 'contact') => void;
  language: Language;
  onOpenDonation?: () => void;
}

export default function Footer({ currentPage, onNavigate, language, onOpenDonation }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = translations[language];

  return (
    <footer className="bg-brand-950 text-white border-t border-brand-900 relative overflow-hidden">
      {/* Subtle organic decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[radial-gradient(#F2C94C_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>

      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        
        {/* Brand Column (4 Cols) */}
        <div className="md:col-span-4 space-y-4">
          <button 
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="flex items-center group text-left cursor-pointer"
          >
            <Logo variant="white" className="h-10 sm:h-11" showText={true} />
          </button>
          <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
            {language === 'en'
              ? 'Working alongside communities for a thriving, resilient Uganda. We partner with people to advance learning, wellbeing, livelihoods and environmental resilience.'
              : 'Tukolera wamu n\'abantu okusobola okutumbula Uganda erimu amaanyi era n\'enkulaakulana. Tukolera wamu n\'abantu ku by\'enjigiriza, embeera, emirimu n\'obutonde.'}
          </p>
        </div>

        {/* Explore Links Column (3 Cols) */}
        <div className="md:col-span-2.5 space-y-4 md:pl-4">
          <h4 className="text-[11px] font-mono font-bold text-gold-500 uppercase tracking-widest">
            {language === 'en' ? 'Explore' : 'Sunsula'}
          </h4>
          <div className="text-xs text-slate-300 flex flex-col space-y-2.5 items-start">
            <button 
              onClick={() => onNavigate('about')} 
              className="hover:text-gold-500 transition-colors text-left cursor-pointer"
            >
              {t.navAbout}
            </button>
            <button 
              onClick={() => onNavigate('programmes')} 
              className="hover:text-gold-500 transition-colors text-left cursor-pointer"
            >
              {t.navProgrammes}
            </button>
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-gold-500 transition-colors text-left cursor-pointer"
            >
              {language === 'en' ? 'Projects & impact' : 'Emirimu gyaffe'}
            </button>
            <button 
              onClick={() => onNavigate('governance')} 
              className="hover:text-gold-500 transition-colors text-left cursor-pointer"
            >
              {t.navGovernance}
            </button>
            <button 
              onClick={() => onNavigate('about')} 
              className="hover:text-gold-500 transition-colors text-left cursor-pointer"
            >
              {language === 'en' ? 'Photo gallery' : 'Ebifananyi'}
            </button>
            {onOpenDonation && (
              <button 
                onClick={onOpenDonation} 
                className="text-gold-400 hover:text-gold-300 font-semibold transition-colors text-left cursor-pointer flex items-center space-x-1"
              >
                <span>❤</span>
                <span>{language === 'en' ? 'Support Our Mission' : 'Yamba ku Nteekateeka'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Visit Us Column (3 Cols) */}
        <div className="md:col-span-2.5 space-y-4">
          <h4 className="text-[11px] font-mono font-bold text-gold-500 uppercase tracking-widest">Visit us</h4>
          <address className="text-xs text-slate-300 not-italic space-y-1.5 leading-relaxed">
            Plot 1420 Ntensibe Road<br />
            Kitintale, Kampala, Uganda
          </address>
          <a 
            href="https://maps.google.com/?q=Ntensibe+Road+Kitintale+Kampala+Uganda" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center space-x-1 text-xs text-gold-500 hover:text-gold-400 font-medium transition-colors cursor-pointer"
          >
            <span>Get directions</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Contact Column (3 Cols) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-[11px] font-mono font-bold text-gold-500 uppercase tracking-widest">Contact Joshua</h4>
          <div className="text-xs text-slate-300 flex flex-col space-y-2.5 items-start">
            <a 
              href="https://wa.me/256776526344" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-gold-500 transition-colors font-semibold"
            >
              WhatsApp: +256 776 526344
            </a>
            <a 
              href="mailto:info@piduganda.org" 
              className="hover:text-gold-500 transition-colors underline"
            >
              info@piduganda.org
            </a>
            <button 
              onClick={() => onNavigate('contact')} 
              className="inline-flex items-center space-x-1.5 text-xs text-slate-300 hover:text-gold-500 transition-colors text-left"
            >
              <Download className="w-3.5 h-3.5 text-gold-500" />
              <span>Download organisation profile</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-brand-900 bg-brand-950 py-6 px-4 md:px-8 text-center text-slate-400 text-[11px] font-mono relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div>
            &copy; {currentYear} Plan Integral Development. All rights reserved.
          </div>
          <div className="text-slate-400">
            Community-led. People-centred. Future-focused.
          </div>
          <div className="flex items-center space-x-1 text-[11px]">
            <span>Representative photography from Pexels</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>

    </footer>
  );
}
