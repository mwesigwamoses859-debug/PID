import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Menu, X, ShieldCheck, Languages } from 'lucide-react';
import { ORG_INFO } from '../data';
import Logo from './Logo';
import { translations, Language } from '../translations';

interface HeaderProps {
  currentPage: 'home' | 'about' | 'programmes' | 'governance' | 'get-involved' | 'contact';
  onNavigate: (page: 'home' | 'about' | 'programmes' | 'governance' | 'get-involved' | 'contact') => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenDonation?: () => void;
}

export default function Header({ currentPage, onNavigate, language, onLanguageChange, onOpenDonation }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[language];

  const menuItems = [
    { name: t.navHome, page: 'home' as const },
    { name: t.navAbout, page: 'about' as const },
    { name: t.navProgrammes, page: 'programmes' as const },
    { name: t.navGovernance, page: 'governance' as const },
    { name: t.navGetInvolved, page: 'get-involved' as const },
    { name: t.navContact, page: 'contact' as const },
  ];

  return (
    <header className="w-full relative z-50" id="header">
      {/* Upper Meta Bar (Hidden on Mobile) */}
      <div className="bg-brand-950 text-white text-[11px] font-mono py-1.5 px-4 md:px-8 flex justify-between items-center border-b border-brand-900">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
            <span>{t.regNo}: {ORG_INFO.registrationNo}</span>
          </div>
          <div className="hidden lg:flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-500" />
            <span>Kitintale, Kampala</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <a href={`mailto:${ORG_INFO.email}`} className="flex items-center space-x-1.5 hover:text-brand-500 transition-colors">
            <Mail className="w-3.5 h-3.5 text-brand-500" />
            <span>{ORG_INFO.email}</span>
          </a>
          <a href={`tel:${ORG_INFO.phone}`} className="flex items-center space-x-1.5 hover:text-brand-500 transition-colors">
            <Phone className="w-3.5 h-3.5 text-brand-500" />
            <span>{ORG_INFO.phone}</span>
          </a>

          {/* Elegant Language Selector inside Meta Bar */}
          <div className="flex items-center space-x-2 border-l border-brand-900/60 pl-4 h-4">
            <Languages className="w-3.5 h-3.5 text-gold-500" />
            <div className="flex space-x-1">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-gold-500 text-brand-950'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('lg')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  language === 'lg'
                    ? 'bg-gold-500 text-brand-950'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                LG
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' 
          : 'bg-white py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo Brand */}
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center group text-left cursor-pointer"
          >
            <Logo className="h-10 sm:h-11" variant="color" showText={true} />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.name}
                  onClick={() => onNavigate(item.page)}
                  className={`text-[12.5px] font-medium transition-all relative py-1 cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-600 after:transition-all after:duration-300 ${
                    isActive 
                      ? 'text-brand-600 font-bold after:w-full' 
                      : 'text-slate-600 hover:text-brand-600 after:w-0 hover:after:w-full'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
            <button
              onClick={() => onNavigate('get-involved')}
              className="px-4 py-2 text-[12.5px] font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-all rounded-lg shadow-sm hover:shadow-md cursor-pointer"
            >
              {t.btnGetInvolved}
            </button>
            {onOpenDonation && (
              <button
                onClick={onOpenDonation}
                className="px-4 py-2 text-[12.5px] font-bold text-[#0f594b] bg-amber-50 hover:bg-amber-100/70 border border-[#c5a059]/40 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <span className="text-red-500 text-[11px] fill-current">❤</span>
                <span>{language === 'en' ? 'Support Us' : 'Tuwagire'}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Quick Mobile Lang Switcher outside drawer */}
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'lg' : 'en')}
              className="px-2 py-1 rounded border border-slate-200 text-[10px] font-mono font-extrabold text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5 cursor-pointer"
            >
              <Languages className="w-3 h-3 text-[#0f594b]" />
              <span>{language === 'en' ? 'LG' : 'EN'}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors"
              id="mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg py-5 px-6 animate-fadeIn z-40">
          <div className="flex flex-col space-y-3.5">
            {menuItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate(item.page);
                  }}
                  className={`text-sm text-left py-1.5 border-b border-slate-50 transition-colors w-full ${
                    isActive 
                      ? 'text-brand-600 font-bold' 
                      : 'text-slate-700 hover:text-brand-600'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
            <button
              onClick={() => {
                setIsOpen(false);
                onNavigate('get-involved');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm transition-colors mt-2 block"
            >
              {t.btnGetInvolved}
            </button>
            {onOpenDonation && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenDonation();
                }}
                className="w-full py-2.5 text-center text-sm font-bold text-slate-900 bg-amber-50 hover:bg-amber-100 border border-gold-500/30 rounded-lg shadow-sm transition-all block flex items-center justify-center space-x-1.5"
              >
                <span className="text-red-500 text-xs fill-current">❤</span>
                <span>{language === 'en' ? 'Support Our Mission' : 'Waayo Obuyambi'}</span>
              </button>
            )}

            {/* Language Switcher Section inside mobile Drawer */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
              <span className="text-xs text-slate-500 font-mono">Language / Olulimi:</span>
              <div className="flex space-x-1 bg-slate-50 border border-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold font-mono transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-brand-600'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => onLanguageChange('lg')}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold font-mono transition-all cursor-pointer ${
                    language === 'lg'
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-brand-600'
                  }`}
                >
                  Oluganda
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
