/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Award, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { Logo } from './Logo';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

export default function Footer({ setActiveSection }: FooterProps) {
  const { setIsAdminOpen, content } = useAdmin();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const footerBackground =
    content.footerSettings?.backgroundImage ||
    '/images/mtn-sos-151.jpg';

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2500);
  };

  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#003366] text-white pt-16 pb-12 border-t border-[#004b93] font-sans overflow-hidden">
      
      {/* BACKGROUND IMAGE LAYER WITH HIGH-CONTRAST DARK NAVY OVERLAY */}
      <div className="absolute inset-0 z-0">
        <img 
          src={footerBackground}
          alt="Plan Integral Development Uganda" 
          className="w-full h-full object-cover object-[center_38%] opacity-55 filter brightness-75 contrast-110"
        />
        {/* Navy overlay preserves the photograph while keeping all footer copy readable. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/78 via-[#002852]/86 to-[#001326]/96" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BRAND & CTA HEADER BAR */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-white/15 pb-10 mb-12">
          <div className="space-y-2">
            <div className="cursor-pointer inline-block" onClick={() => handleScrollTo('home')}>
              <Logo size={44} lightMode={false} />
            </div>
            <p className="text-xs text-slate-200 max-w-lg leading-relaxed font-medium">
              {content.footerSettings?.description}
            </p>
          </div>

          {/* Support Our Mission CTA Card */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shadow-lg">
            <div className="text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7DC242] block">
                Make An Impact Today
              </span>
              <h4 className="text-sm font-bold text-white font-serif italic">
                Support Our Mission
              </h4>
            </div>
            <button
              onClick={() => handleScrollTo('opportunities')}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#7DC242] hover:bg-[#6eb335] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-emerald-300/40 shrink-0"
            >
              <span>Donate & Partner</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>

        {/* MAIN NAVIGATION & CONTENT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/15 pb-12 mb-10">
          
          {/* Column 1: Organization Credentials & Contact (col-span-4) */}
          <div className="lg:col-span-4 space-y-4 bg-[#001d38]/55 backdrop-blur-[2px] rounded-2xl p-5 border border-white/10">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#7DC242] border-b border-white/10 pb-2">
              Plan Integral Development
            </h4>
            
            <div className="text-xs text-slate-200 space-y-2 bg-[#002244]/60 backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-sm">
              <p className="font-extrabold text-[#7DC242] text-[11px] tracking-wider uppercase flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#7DC242]" />
                NGO Registration Details
              </p>
              <p className="font-semibold text-white">License: INDR177427311NB</p>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Registered under CAP 109 Act of Uganda. Non-Political & Non-Religious Non-Governmental Organization.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-200 font-medium pt-1">
              <MapPin className="w-4 h-4 text-[#7DC242] shrink-0" />
              <span>Headquarters: Kitintale, Nakawa Division, Kampala, Uganda</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (col-span-4) */}
          <div className="lg:col-span-4 space-y-4 bg-[#001d38]/55 backdrop-blur-[2px] rounded-2xl p-5 border border-white/10">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#7DC242] border-b border-white/10 pb-2">
              {content.footerSettings?.exploreTitle || 'Explore Website'}
            </h4>
            
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              {(content.navigationItems || []).filter((link) => link.visible).map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className="text-left py-1.5 px-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5 font-semibold"
                >
                  <span className="text-[#7DC242]">•</span>
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Newsletter & Console (col-span-4) */}
          <div className="lg:col-span-4 space-y-4 bg-[#001d38]/55 backdrop-blur-[2px] rounded-2xl p-5 border border-white/10">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#7DC242] border-b border-white/10 pb-2">
              {content.footerSettings?.newsletterTitle || 'Stay Connected & Portal'}
            </h4>
            
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {content.footerSettings?.newsletterText}
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-xs bg-[#002244] border border-white/20 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-[#7DC242] font-medium"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#7DC242] hover:bg-[#6eb335] text-slate-950 font-black rounded-xl text-xs flex items-center justify-center cursor-pointer shadow-md border border-emerald-300/40"
                >
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-xs font-bold text-slate-950 bg-[#7DC242] p-3 rounded-xl shadow-md"
              >
                <CheckCircle2 className="w-4 h-4 text-slate-950 shrink-0" />
                <span>Thank you for subscribing!</span>
              </motion.div>
            )}
          </div>

        </div>

        {/* BOTTOM FOOTER COPYRIGHT & ACCESS */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-300 gap-4 font-semibold">
          <p>© {currentYear} {content.footerSettings?.copyrightText}</p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleScrollTo('opportunities')}
              className="hover:text-white text-[#7DC242] transition-colors font-bold"
            >
              Support Our Mission
            </button>
            <span className="text-slate-500">•</span>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-white text-slate-300 transition-colors"
            >
              Console
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
