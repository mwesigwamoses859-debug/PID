/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, HeartHandshake, Phone, Mail, Award, ChevronDown, Compass, Award as AwardIcon, ShieldCheck, Sliders } from 'lucide-react';
import { Logo } from './Logo';
import { useAdmin } from '../context/AdminContext';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const { setIsAdminOpen, content } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const aboutSubItems = [
    { id: 'about', label: 'Who We Are', desc: 'Our decade-long mandate & values.', icon: Compass },
    { id: 'impact', label: 'Expected Impact', desc: 'Durable metrics & transparency.', icon: ShieldCheck },
    { id: 'partners', label: 'Our Partners', desc: 'Valued institutional coalitions.', icon: AwardIcon },
  ];

  const editableNav = content.navigationItems || [];
  const navLabel = (id: string, fallback: string) =>
    editableNav.find((item) => item.id === id)?.label || fallback;
  const isNavVisible = (id: string) =>
    editableNav.find((item) => item.id === id)?.visible !== false;
  const mainNavItems = [
    { id: 'home', label: navLabel('home', 'Home') },
    { id: 'strategy', label: navLabel('strategy', 'Our Programs') },
    { id: 'opportunities', label: navLabel('opportunities', 'Opportunities') },
    { id: 'gallery', label: navLabel('gallery', 'Gallery') },
    { id: 'contact', label: navLabel('contact', 'Contact Us') },
  ].filter((item) => isNavVisible(item.id));

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    setActiveSection(id);
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };

  // Check if any of the about sub-items is currently active
  const isAboutActive = aboutSubItems.some(sub => sub.id === activeSection);

  return (
    <>
      {/* Top micro-bar for essential contacts */}
      <div className="bg-natural-dark text-natural-bg/90 py-1.5 px-4 text-xs font-sans border-b border-natural-olive/30 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="mailto:info@piduganda.org" className="flex items-center gap-1.5 hover:text-natural-tan transition-colors">
              <Mail className="w-3.5 h-3.5 text-natural-tan" />
              <span>info@piduganda.org</span>
            </a>
            <a href="tel:0776526344" className="flex items-center gap-1.5 hover:text-natural-tan transition-colors">
              <Phone className="w-3.5 h-3.5 text-natural-tan" />
              <span>+256 776 526 344</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[10px] bg-natural-olive/40 text-natural-bg/95 px-2 py-0.5 rounded border border-natural-olive/20">
              NGO Reg: INDR177427311NB
            </span>
          </div>
        </div>
      </div>

      <nav
        id="navbar"
        className={`sticky top-0 z-50 transition-all duration-300 font-sans ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-natural-border'
            : 'bg-white py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => scrollToSection('home')}
              className="flex items-center cursor-pointer group"
            >
              <Logo size={54} lightMode={true} />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {/* Home */}
              {isNavVisible('home') && <button
                onClick={() => scrollToSection('home')}
                className={`px-4 py-2.5 rounded-lg text-base font-bold transition-all cursor-pointer ${
                  activeSection === 'home'
                    ? 'text-[#007BC4] bg-sky-50 border-b-2 border-[#007BC4]'
                    : 'text-slate-800 hover:text-[#007BC4] hover:bg-slate-50'
                }`}
              >
                {navLabel('home', 'Home')}
              </button>}

              {/* About Us Droplist Container */}
              {isNavVisible('about') && <div 
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className={`px-4 py-2.5 rounded-lg text-base font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isAboutActive
                      ? 'text-[#007BC4] bg-sky-50 border-b-2 border-[#007BC4]'
                      : 'text-slate-800 hover:text-[#007BC4] hover:bg-slate-50'
                  }`}
                >
                  <span>{navLabel('about', 'About Us')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#007BC4]' : 'text-slate-400'}`} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-1 w-64 bg-white border border-natural-border rounded-2xl shadow-xl p-3 z-50 space-y-1"
                    >
                      {aboutSubItems.map((sub) => {
                        const IconComponent = sub.icon;
                        const isSubActive = activeSection === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => scrollToSection(sub.id)}
                            className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                              isSubActive
                                ? 'bg-natural-beige/40 text-natural-dark'
                                : 'hover:bg-natural-beige/25 text-natural-text/90 hover:text-natural-dark'
                            }`}
                          >
                            <div className="w-7 h-7 rounded-lg bg-natural-beige/50 text-natural-olive flex items-center justify-center shrink-0 mt-0.5">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5">
                              <div className="text-[11px] font-bold uppercase tracking-wider leading-none">
                                {sub.label}
                              </div>
                              <div className="text-[9px] text-natural-text/70 font-medium">
                                {sub.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>}

              {/* Other main pages */}
              {mainNavItems.filter((item) => item.id !== 'home').map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-2.5 rounded-lg text-base font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'text-[#007BC4] bg-sky-50 border-b-2 border-[#007BC4]'
                        : 'text-slate-800 hover:text-[#007BC4] hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => scrollToSection('opportunities')}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-bold uppercase tracking-wider text-white bg-[#007BC4] hover:bg-[#005a92] shadow-md hover:shadow-lg transition-all cursor-pointer gap-2"
              >
                <HeartHandshake className="w-5 h-5 text-[#7DC242]" />
                <span>Support Our Mission</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <span className="sm:hidden text-[9px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium">
                PID UGANDA
              </span>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-natural-text hover:text-natural-dark hover:bg-natural-beige/40 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-b border-natural-border overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
                {/* Home */}
                {isNavVisible('home') && <button
                  onClick={() => scrollToSection('home')}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                    activeSection === 'home'
                      ? 'text-[#003366] bg-sky-50 font-extrabold border-l-4 border-[#007BC4]'
                      : 'text-slate-700 hover:text-[#003366] hover:bg-slate-50'
                  }`}
                >
                  {navLabel('home', 'Home')}
                </button>}

                {/* About Sub-items nested flatly */}
                {isNavVisible('about') && <div className="py-1 border-y border-slate-200 my-1 bg-slate-50 rounded-xl px-2">
                  <div className="text-[10px] font-extrabold text-[#007BC4] uppercase tracking-widest px-4 py-1.5">
                    About PID Uganda
                  </div>
                  {aboutSubItems.map((sub) => {
                    const isActive = activeSection === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => scrollToSection(sub.id)}
                        className={`block w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                          isActive
                            ? 'text-[#003366] bg-white shadow-xs font-extrabold border-l-2 border-[#007BC4]'
                            : 'text-slate-700 hover:text-[#003366] hover:bg-slate-100'
                        }`}
                      >
                        — {sub.label}
                      </button>
                    );
                  })}
                </div>}

                {/* Rest of the items */}
                {mainNavItems.filter((item) => item.id !== 'home').map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                        isActive
                          ? 'text-[#003366] bg-sky-50 font-extrabold border-l-4 border-[#007BC4]'
                          : 'text-slate-700 hover:text-[#003366] hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}

                <div className="pt-4 border-t border-natural-border px-4 flex flex-col space-y-3">
                  <div className="text-xs text-natural-text space-y-1 font-semibold">
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-natural-tan" /> info@piduganda.org
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-natural-tan" /> +256 776 526 344
                    </p>
                    <p className="text-[10px] text-natural-text/60 mt-1">
                      NGO Reg No: INDR177427311NB
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => scrollToSection('opportunities')}
                      className="w-full inline-flex items-center justify-center px-5 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-white bg-[#007BC4] gap-2 cursor-pointer shadow-sm"
                    >
                      <HeartHandshake className="w-4 h-4 text-[#7DC242]" />
                      <span>Support Our Mission</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
