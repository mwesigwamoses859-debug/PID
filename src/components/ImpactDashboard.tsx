/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { MixedColorText } from './MixedColorText';
import { useAdmin } from '../context/AdminContext';
import { GraduationCap, Users, School, FileSpreadsheet, Map, Award, CheckCircle, BookOpen, Briefcase } from 'lucide-react';

interface ImpactStat {
  id: string;
  label: string;
  value: string;
  subValue: string;
  icon: any;
  color: string;
  bg: string;
  description: string;
}

export default function ImpactDashboard() {
  const { content } = useAdmin();
  const [coachesInput, setCoachesInput] = useState<number>(5);

  const stats: ImpactStat[] = [
    {
      id: 'youth',
      label: 'Youth Engaged',
      value: '1,000,000+',
      subValue: 'Cumulative Footprint',
      icon: Users,
      color: 'text-natural-olive',
      bg: 'bg-natural-olive/20',
      description: 'Active, peaceful participation across slums, rural zones, and refugee centers.',
    },
    {
      id: 'scholarships',
      label: 'Scholarships Awarded',
      value: '300+',
      subValue: 'Vulnerable Children',
      icon: GraduationCap,
      color: 'text-natural-tan',
      bg: 'bg-natural-tan/20',
      description: 'Enabling orphans and children from disadvantaged families to stay in school and excel.',
    },
    {
      id: 'coaches',
      label: 'Teachers Trained',
      value: '200+',
      subValue: 'Certified Educators',
      icon: Award,
      color: 'text-natural-olive',
      bg: 'bg-natural-olive/20',
      description: 'Fostering inclusive pedagogy, digital skills, and learner-centered strategies.',
    },
    {
      id: 'schools',
      label: 'Schools Supported',
      value: '40+',
      subValue: 'Educational Partners',
      icon: School,
      color: 'text-natural-dark',
      bg: 'bg-natural-beige/30',
      description: 'Equipped with scholastic kits, books, e-learning setups, and eco-clubs.',
    },
    {
      id: 'literacy',
      label: 'Adult Literacy Enrollees',
      value: '4,500+',
      subValue: 'Community Hubs',
      icon: BookOpen,
      color: 'text-natural-tan',
      bg: 'bg-natural-tan/20',
      description: 'Adults equipped with vital reading, writing, and arithmetic skills for daily empowerment.',
    },
    {
      id: 'vocational',
      label: 'Vocational Graduates',
      value: '1,200+',
      subValue: 'Certified Grads',
      icon: Briefcase,
      color: 'text-natural-dark',
      bg: 'bg-natural-beige/30',
      description: 'Acquiring hands-on trades in carpentry, tailoring, ICT, and agribusiness.',
    },
    {
      id: 'districts',
      label: 'Active Districts',
      value: '5+',
      subValue: 'National Footprint',
      icon: Map,
      color: 'text-natural-olive',
      bg: 'bg-natural-olive/20',
      description: 'Sustained, direct community projects across Kampala, Butebo, Mbale, and host margins.',
    },
    {
      id: 'policy',
      label: 'Policy Briefs Submitted',
      value: '2',
      subValue: 'National Advocacy',
      icon: FileSpreadsheet,
      color: 'text-natural-tan',
      bg: 'bg-natural-tan/20',
      description: 'Engaging government ministries to support robust education reforms and eco-justice.',
    },
  ];

  // Dynamic social multiplier calculator
  // 1 coach trained = supports ~150 youth, aids 2 schools, drives 1 environmental club
  const multiplierYouth = coachesInput * 150;
  const multiplierSchools = Math.ceil(coachesInput / 5);
  const multiplierTrees = coachesInput * 40;

  return (
    <section id="impact" className="bg-white font-sans scroll-mt-12 border-b border-natural-border">
      {/* Top Banner with Background Photo & Full Color Words */}
      <div className="relative bg-[#003366] text-white py-20 px-4 overflow-hidden border-b border-sky-900 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src={content.impactHeaderBgImage || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1600"}
            alt="Expected Impact - PID Uganda"
            className="w-full h-full object-cover opacity-60 brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/90 via-[#003366]/75 to-[#007BC4]/80" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#7DC242]">
            {content.impactTagline || "Expected Impact"}
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            <MixedColorText text={content.impactTitle || "Our Measurable {Social Ledger}"} isDarkBg={true} />
          </h1>
          <p className="text-slate-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {content.impactSubtitle || "Plan Integral Development (PID) is committed to absolute transparency and data-driven impact, tracking direct indicators of long-term community transformation."}
          </p>
          <div className="w-20 h-1.5 bg-[#7DC242] mx-auto rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-natural-beige/30 border border-natural-border rounded-3xl p-6 flex flex-col justify-between hover:bg-white hover:shadow-sm transition-all group"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-natural-dark/70 bg-natural-olive/15 px-2.5 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>

                  <h4 className="text-3xl font-bold font-serif italic text-natural-dark mt-6 tracking-tight">
                    {stat.value}
                  </h4>
                  <p className="text-xs font-bold text-natural-dark mt-1 leading-tight">
                    {stat.label}
                  </p>
                  <p className="text-[10px] text-natural-tan font-bold mt-1 uppercase tracking-wider">
                    {stat.subValue}
                  </p>
                </div>

                <p className="text-[11px] text-natural-text opacity-95 mt-5 pt-4 border-t border-natural-border leading-relaxed font-semibold">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Estimator / Multiplier (Craft element) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="bg-natural-dark text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-natural-olive/20"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-natural-tan/10 rounded-full blur-2xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Controls */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-natural-tan">
                Social Multiplier Model
              </span>
              <h3 className="text-2xl font-bold font-serif italic leading-tight text-white">
                Calculate the Ripple Effect of Training Coaches
              </h3>
              <p className="text-natural-beige/80 text-xs leading-relaxed font-medium">
                PID uses trained sports coaches as trusted mentors. Use the slider to estimate how scaling the coaching cohort directly magnifies grassroots community support across schools.
              </p>

              {/* Slider Input */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-natural-beige">Coaches to Train</span>
                  <span className="font-mono text-lg font-bold text-natural-tan">{coachesInput} Coaches</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={coachesInput}
                  onChange={(e) => setCoachesInput(parseInt(e.target.value))}
                  className="w-full h-2 bg-natural-olive/30 rounded-lg appearance-none cursor-pointer accent-natural-tan"
                />
                <div className="flex justify-between text-[10px] text-natural-beige/40 font-bold uppercase">
                  <span>1 Coach</span>
                  <span>25 Coaches</span>
                  <span>50 Coaches</span>
                </div>
              </div>
            </div>

            {/* Simulated Output Dashboard */}
            <div className="lg:col-span-7 bg-natural-olive/10 border border-natural-border/20 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="space-y-1">
                <p className="text-[10px] text-natural-tan font-bold uppercase tracking-wider">Mentored Youth</p>
                <div className="text-2xl font-extrabold font-mono text-white">
                  ~{multiplierYouth.toLocaleString()}
                </div>
                <p className="text-xs text-natural-beige/75 font-semibold">Children receiving life-skills coaching</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-natural-tan font-bold uppercase tracking-wider">Schools Engaged</p>
                <div className="text-2xl font-extrabold font-mono text-natural-beige">
                  {multiplierSchools} Schools
                </div>
                <p className="text-xs text-natural-beige/75 font-semibold">Equipped with curriculum kits</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-natural-tan font-bold uppercase tracking-wider">Trees Planted</p>
                <div className="text-2xl font-extrabold font-mono text-natural-beige">
                  {multiplierTrees.toLocaleString()}
                </div>
                <p className="text-xs text-natural-beige/75 font-semibold">Reforested in school campuses</p>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
