/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Target, Eye, ShieldCheck, Rocket, Handshake, Sparkles, Scale, Compass } from 'lucide-react';
import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { MixedColorText } from './MixedColorText';

export default function AboutUs() {
  const { content } = useAdmin();
  const [activeTab, setActiveTab] = useState<'mission' | 'vision'>('mission');

  const values = [
    {
      title: 'Accountability',
      icon: Scale,
      color: 'from-orange-500 to-amber-500',
      description: 'Using resources efficiently and delivering transparent, measurable results to our partners and communities.',
    },
    {
      title: 'Ambition',
      icon: Rocket,
      color: 'from-sky-500 to-blue-500',
      description: 'Setting bold goals to spark lasting breakthroughs and uplift underserved cohorts across Uganda.',
    },
    {
      title: 'Collaboration',
      icon: Handshake,
      color: 'from-emerald-500 to-teal-500',
      description: 'Respecting diversity and building strong partnerships that amplify our collective community impact.',
    },
    {
      title: 'Creativity',
      icon: Sparkles,
      color: 'from-purple-500 to-indigo-500',
      description: 'Embracing fresh ideas and innovative approaches to solve complex social and climate challenges.',
    },
    {
      title: 'Integrity',
      icon: ShieldCheck,
      color: 'from-rose-500 to-red-500',
      description: 'Upholding honesty, transparency, and ethical standards in all field programs and operations.',
    },
  ];

  const timelineSteps = [
    {
      year: '2010',
      title: 'CBO Genesis',
      location: 'Kampala Slums',
      description: 'Founded as a grassroots Community-Based Organization driving sports empowerment.',
    },
    {
      year: '2012',
      title: 'Regional Expansion',
      location: 'Butebo & Mbale',
      description: 'Expanded eastern outreach to support rural youth and promote community health.',
    },
    {
      year: '2015',
      title: 'Official Registration',
      location: 'National Mandate',
      description: 'Registered under the NGO Act CAP 109, unlocking district and refugee partnerships.',
    },
    {
      year: '2026',
      title: 'Active Presence',
      location: '5 Districts & Refugees',
      description: 'Operating from Kampala HQ, supporting slums, rural areas, and active refugee settlements.',
    },
  ];

  return (
    <section id="about" className="bg-white font-sans scroll-mt-12 border-b border-natural-border">
      {/* Top Banner with Background Photo & Full Color Words */}
      <div className="relative bg-[#003366] text-white py-20 px-4 overflow-hidden border-b border-sky-900 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src={content.aboutHeaderBgImage || "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1600"}
            alt="Who We Are - PID Uganda"
            className="w-full h-full object-cover opacity-60 brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/90 via-[#003366]/75 to-[#007BC4]/80" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#7DC242]">
            {content.aboutTagline || "Who We Are"}
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            <MixedColorText text={content.aboutTitle || "Independent, Accountable, & Dedicated to {Transforming Lives}"} isDarkBg={true} />
          </h1>
          <div className="w-20 h-1.5 bg-[#7DC242] mx-auto rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Narrative & Mission/Vision Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Narrative Description (58% / col-span-7) */}
          <div className="lg:col-span-7 space-y-6 text-slate-800 leading-relaxed text-lg sm:text-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#003366] leading-snug">
              A Decade of Sport-Driven Empowerment
            </h3>
            <p className="text-slate-700 text-lg sm:text-xl leading-relaxed">
              <MixedColorText text={content.aboutParagraph1} isDarkBg={false} />
            </p>
            <p className="text-slate-700 text-lg sm:text-xl leading-relaxed">
              <MixedColorText text={content.aboutParagraph2} isDarkBg={false} />
            </p>
            <p className="border-l-4 border-[#7DC242] pl-5 italic text-slate-700 font-medium text-lg sm:text-xl bg-slate-50 py-3 rounded-r-xl">
              We operate with absolute independence, free from political or religious affiliation, ensuring services are delivered transparently to those who need them most.
            </p>
          </div>

          {/* Right Mission / Vision Cards (col-span-5) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              {/* Tabs selector */}
              <div className="flex bg-slate-200/80 p-1.5 rounded-2xl">
                <button
                  onClick={() => setActiveTab('mission')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'mission'
                      ? 'bg-[#007BC4] text-white shadow-sm'
                      : 'text-slate-700 hover:text-[#003366]'
                  }`}
                >
                  <Target className="w-4 h-4 text-[#7DC242]" />
                  <span>Our Mission</span>
                </button>
                <button
                  onClick={() => setActiveTab('vision')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'vision'
                      ? 'bg-[#007BC4] text-white shadow-sm'
                      : 'text-slate-700 hover:text-[#003366]'
                  }`}
                >
                  <Eye className="w-4 h-4 text-[#7DC242]" />
                  <span>Our Vision</span>
                </button>
              </div>

              {/* Dynamic Content Frame */}
              <div className="min-h-[160px] flex flex-col justify-center">
                {activeTab === 'mission' ? (
                  <motion.div
                    key="mission"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-[#003366]">
                      <Compass className="w-5 h-5 text-[#007BC4]" />
                    </div>
                    <p className="text-[#003366] font-bold font-serif text-lg leading-snug italic">
                      <MixedColorText text={content.aboutMissionText} isDarkBg={false} />
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {content.aboutMissionDesc}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="vision"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-[#003366]">
                      <Eye className="w-5 h-5 text-[#007BC4]" />
                    </div>
                    <p className="text-[#003366] font-bold font-serif text-lg leading-snug italic">
                      <MixedColorText text={content.aboutVisionText} isDarkBg={false} />
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {content.aboutVisionDesc}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl font-bold font-serif text-[#003366] italic">
              Our Core Values
            </h3>
            <p className="text-xs text-slate-700 mt-2 font-medium">
              Every staff member and volunteer is united by values that drive breakthroughs for vulnerable people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all group flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#007BC4] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-[#7DC242]" />
                  </div>
                  <h4 className="text-base font-bold text-[#003366] mt-4 font-serif italic">
                    {val.title}
                  </h4>
                  <p className="text-xs text-slate-700 mt-2.5 leading-relaxed font-medium">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Historic timeline expansion (Primacy on local growth) */}
        <div className="mt-24 pt-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-2xl font-bold font-serif text-[#003366] italic">
              Our Organic Growth
            </h3>
            <p className="text-xs text-slate-700 mt-2 font-medium">
              From Kampala’s informal settlements to regional districts, tracking our path of service since 2010.
            </p>
          </div>

          <div className="relative">
            {/* Connecting horizontal line for desktops */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 hidden lg:block" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {timelineSteps.map((step, idx) => (
                <div key={step.year} className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 transition-colors relative shadow-xs">
                  {/* Year Tag */}
                  <span className="inline-block text-[10px] uppercase font-bold tracking-widest bg-[#007BC4] text-white px-3 py-1 rounded-full mb-4">
                    {step.year}
                  </span>
                  
                  {/* Visual Node */}
                  <div className="absolute top-1/2 right-0 w-3 h-3 rounded-full bg-[#7DC242] border-2 border-white translate-x-1.5 -translate-y-1/2 hidden lg:block" />

                  <h4 className="text-base font-bold text-[#003366] font-serif italic">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-[#007BC4] uppercase tracking-wide font-bold mt-0.5">
                    {step.location}
                  </p>
                  <p className="text-xs text-slate-700 mt-3 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
