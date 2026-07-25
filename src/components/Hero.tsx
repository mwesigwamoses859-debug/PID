/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, Flame, Trophy, Play, CheckCircle2, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { MixedColorText } from './MixedColorText';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

export default function Hero({ setActiveSection }: HeroProps) {
  const { content } = useAdmin();
  const [kampalaTime, setKampalaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Kampala',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setKampalaTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLearnMore = () => {
    setActiveSection('about');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSupportClick = () => {
    setActiveSection('opportunities');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-24 lg:pb-36 font-sans border-b border-neutral-800 bg-neutral-950 text-white">
      {/* Immersive background image matching the community sport / soccer photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.heroImage}
          alt="Uganda children community soccer"
          className="w-full h-full object-cover opacity-70 brightness-90"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/95 via-[#003366]/80 to-black/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#7DC242] text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-md"
            >
              <Trophy className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>Sport • Empowerment • Impact</span>
            </motion.div>

            {/* Core Slogan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3 sm:space-y-4"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.15] tracking-tight">
                <MixedColorText text={content.heroTitle1} isDarkBg={true} /> <br className="hidden sm:inline" />
                <span className="text-white block mt-2 font-black uppercase tracking-tight">
                  <MixedColorText text={content.heroTitle2} isDarkBg={true} />
                </span>
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-slate-100 max-w-2xl leading-relaxed font-sans font-medium">
                {content.heroDescription}
              </p>
            </motion.div>

            {/* Key Quick Bullet points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-base sm:text-lg text-slate-100 font-semibold max-w-xl"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#7DC242] shrink-0" />
                <span>Empowering Youth & Women</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#7DC242] shrink-0" />
                <span>Active in 5+ Districts</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#7DC242] shrink-0" />
                <span>Reforestation & Climate Protection</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#7DC242] shrink-0" />
                <span>1,000,000+ Lives Impacted</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-3"
            >
              <button
                onClick={handleSupportClick}
                className="inline-flex items-center justify-center px-9 py-4.5 rounded-full text-base font-bold uppercase tracking-wider text-white bg-[#007BC4] hover:bg-[#005a92] transition-all cursor-pointer gap-2.5 shadow-xl hover:scale-[1.02]"
              >
                <span>Support Our Programs</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={handleLearnMore}
                className="inline-flex items-center justify-center px-9 py-4.5 rounded-full text-base font-bold uppercase tracking-wider text-white bg-transparent hover:bg-white/10 border-2 border-white/80 transition-all cursor-pointer gap-2.5"
              >
                <Play className="w-5 h-5 text-white" />
                <span>Learn Who We Are</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Bento Graphic Layout */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Visual Frame Wrapper */}
            <div className="relative grid grid-cols-12 gap-4">
              {/* Main Soccer Photo Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="col-span-12 rounded-bl-[80px] rounded-tr-[40px] rounded-br-[20px] rounded-tl-[20px] overflow-hidden shadow-2xl border-4 border-white/20 relative aspect-[4/3] group"
              >
                <img
                  src={content.heroImage}
                  alt="Uganda children playing soccer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-white/90">Since 2010</p>
                    <h3 className="text-lg font-bold leading-tight mt-1 text-white">
                      A Community-Driven Catalyst for Transformation
                    </h3>
                  </div>
                </div>
              </motion.div>

              {/* Smaller floating Kampala clock and info card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="col-span-7 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5 text-black animate-bounce" />
                </div>
                <div>
                  <div className="text-[10px] text-white/75 font-bold uppercase tracking-widest leading-none">Kampala, Uganda</div>
                  <div className="text-sm font-bold text-white mt-1">Live Org Secretariat</div>
                  <div className="text-xs text-white/90 font-mono mt-0.5">{kampalaTime || '09:00:00'} EAT</div>
                </div>
              </motion.div>

              {/* Smaller floating metric card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="col-span-5 bg-white p-4 rounded-2xl border border-white text-black flex flex-col justify-between shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-black/70">Impact</span>
                  <Heart className="w-4 h-4 text-black fill-black" />
                </div>
                <div className="mt-3">
                  <p className="text-xl font-sans text-black font-extrabold leading-none">1M+</p>
                  <p className="text-[9px] text-black/85 font-bold uppercase tracking-wider mt-1">Youth Engaged</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
