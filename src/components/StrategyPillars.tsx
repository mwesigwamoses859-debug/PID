import { RichText } from './RichText';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MixedColorText } from './MixedColorText';
import { useAdmin } from '../context/AdminContext';
import ProgrammeReference from './ProgrammeReference';
import {
  GraduationCap,
  Heart,
  Sprout,
  TrendingUp,
  CheckCircle,
  Award,
  BookOpen,
  Briefcase,
  Users,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Globe,
  Compass,
  FileText,
  Activity,
  MapPin,
  FileCheck,
  Layers,
  Sparkles
} from 'lucide-react';

interface SubModule {
  title: string;
  description?: string;
  bullets?: string[];
}

interface Program {
  id: 'education' | 'health' | 'livelihood' | 'climate';
  title: string;
  tagline: string;
  icon: any;
  themeColor: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  intro: string;
  modules: SubModule[];
}

export default function StrategyPillars() {
  const { content } = useAdmin();
  const [activeProgram, setActiveProgram] = useState<'education' | 'health' | 'livelihood' | 'climate'>('education');
  const [showGovSec, setShowGovSec] = useState<boolean>(false);
  const [govTab, setGovTab] = useState<'objectives' | 'structure' | 'policies'>('objectives');

  const programs: Program[] = [
    {
      id: 'education',
      title: 'Education',
      tagline: 'Access, Quality, & Digital Inclusion',
      icon: GraduationCap,
      themeColor: 'bg-natural-olive',
      textColor: 'text-natural-olive',
      bgColor: 'bg-natural-olive/10',
      borderColor: 'border-natural-olive/20',
      intro: 'PID breaks educational barriers for vulnerable children across Uganda. Moving from Kampala’s informal settlements to a national mandate, we deliver high standards, digital literacy, and equitable access.',
      modules: [
        {
          title: 'Access & Equity',
          description: 'Keeping vulnerable children in school with direct, uninterrupted support.',
          bullets: [
            'Scholarships: Providing financial backing for disadvantaged students to prevent interruptions.',
            'Scholastic Kits: Distributing essential books, uniforms, and learning supplies.',
            'Mentorship: Guiding children to build self-confidence, life skills, and resilience.'
          ]
        },
        {
          title: 'Quality & Digital Inclusion',
          description: 'Equipping teachers and remote schools with modern pedagogical and digital tools.',
          bullets: [
            'Teacher Training: Fostering inclusive, learner-centered classroom teaching strategies.',
            'ICT Access: Outfitting rural schools with computers, internet, and study resources.',
            'E-Learning: Driving interactive digital platforms to connect students to broader horizons.'
          ]
        },
        {
          title: 'Adult Literacy & Advocacy',
          description: 'Establishing community learning hubs and lobbying for systematic resource equity.',
          bullets: [
            'Literacy Programs: Equipping adults with essential reading, writing, and numeracy skills.',
            'Vocational Hubs: Practical trades training to build resilient family livelihoods.',
            'Policy Engagement: Collaborating with ministries to influence national education reforms.'
          ]
        }
      ]
    },
    {
      id: 'health',
      title: 'Health',
      tagline: 'Outreach, Hygiene, & Mental Wellness',
      icon: Heart,
      themeColor: 'bg-[#C15C3D]',
      textColor: 'text-[#C15C3D]',
      bgColor: 'bg-[#C15C3D]/10',
      borderColor: 'border-[#C15C3D]/20',
      intro: 'We deliver primary healthcare services directly to underserved communities while strengthening local clinics to build long-term wellness.',
      modules: [
        {
          title: 'Grassroots Medical Outreach',
          description: 'Bringing essential care directly to families and building capacity.',
          bullets: [
            'Mobile Clinics: Delivering maternal welfare, immunization, and malaria prevention.',
            'Capacity Building: Training community health workers (CHWs) and equipping local centers.',
            'Health Partners: Coordinating with district health boards to expand service reach.'
          ]
        },
        {
          title: 'Nutrition & Family Hygiene',
          description: 'Promoting healthy diets and sanitation models to prevent endemic illnesses.',
          bullets: [
            'Balanced Diets: Educating households on local nutrition and food planning.',
            'Water & Sanitation: Sourcing safe water solutions and establishing hygiene practices.',
            'Household Resilience: Safeguarding children and vulnerable elderly populations.'
          ]
        },
        {
          title: 'Mental Health Advocacy',
          description: 'Reducing community stigma and integrating psychological support systems.',
          bullets: [
            'Sensitization: Running community dialogues to demystify mental wellness.',
            'Support Networks: Offering accessible counseling and local peer-support channels.',
            'Integrated Care: Working with clinics to recognize and treat psychological needs.'
          ]
        }
      ]
    },
    {
      id: 'livelihood',
      title: 'Livelihood',
      tagline: 'Sustainable Agriculture, Skills, & Wealth Creation',
      icon: TrendingUp,
      themeColor: 'bg-natural-tan',
      textColor: 'text-natural-tan',
      bgColor: 'bg-natural-tan/10',
      borderColor: 'border-natural-tan/20',
      intro: 'Empowering families and youth to move from subsistence to active economic independence through modern farming, practical skills, and entrepreneurship support.',
      modules: [
        {
          title: 'Sustainable Agriculture',
          description: 'Empowering smallholder farmers with modern practices to ensure food security.',
          bullets: [
            'Modern Farming: Promoting climate-smart techniques, irrigation, and high-yield seeds.',
            'Value Addition: Training in processing and packaging to fetch higher market values.',
            'Market Linkages: Connecting growers directly with reliable regional trade cooperatives.'
          ]
        },
        {
          title: 'Vocation & Employment',
          description: 'Bridging the gap between professional training and stable, market-driven work.',
          bullets: [
            'Practical Skills: Workshops in carpentry, tailoring, computer science, and agribusiness.',
            'Job Placement: Collaborating with regional employers to hire certified young graduates.',
            'Apprenticeships: Providing hands-on industry experience and career coaching pathways.'
          ]
        },
        {
          title: 'Financial & Business Growth',
          description: 'Equipping households and micro-enterprises with crucial wealth-creation tools.',
          bullets: [
            'Financial Literacy: Training families in budgeting, tracking expenses, and saving.',
            'Microfinance: Facilitating small startup loans and friendly credit services.',
            'Savings Groups: Running community savings cooperatives to pool investment capital.'
          ]
        }
      ]
    },
    {
      id: 'climate',
      title: 'Climate Action & Protection',
      tagline: 'Eco-Justice, Reforestation, & Clean Energy',
      icon: Sprout,
      themeColor: 'bg-[#2E5A44]',
      textColor: 'text-[#2E5A44]',
      bgColor: 'bg-[#2E5A44]/10',
      borderColor: 'border-[#2E5A44]/20',
      intro: 'Combining ecological conservation with community stewardship to combat climate change, restore depleted lands, and generate green livelihoods.',
      modules: [
        {
          title: 'Landscape Reforestation',
          description: 'Restoring degraded ecosystems through community-led tree planting and ownership.',
          bullets: [
            'Tree Planting: Mobilizing schools and youth to plant indigenous and fruit-bearing trees.',
            'Forest Management: Equipping stakeholders to sustainably harvest and guard woodland areas.',
            'Soil & Water: Preventing rapid soil erosion and shielding fragile local aquifers.'
          ]
        },
        {
          title: 'Sustainable Land Use',
          description: 'Training farmers in soil conservation, water harvesting, and organic agriculture.',
          bullets: [
            'Conservation: Applying contour farming and mulching to shield vital soil nutrients.',
            'Water Harvesting: Installing smart rainwater reservoirs and micro-irrigation systems.',
            'Organic Methods: Scaling organic compost and eco-safe biological pest control.'
          ]
        },
        {
          title: 'Eco-Justice & Advocacy',
          description: 'Lobbying for strong climate adaptation rules and driving green energy transitions.',
          bullets: [
            'Policy Lobbying: Advocating alongside civil society for protective ecological laws.',
            'Clean Technology: Promoting household solar, biogas, and clean cooking stoves.',
            'Adaptation: Sensitizing communities on mitigation plans for climate shifts.'
          ]
        }
      ]
    }
  ];

  const objectives = [
    { num: '01', text: 'Expand access to inclusive, equitable, and quality education.' },
    { num: '02', text: 'Improve community health outcomes through awareness, prevention, and service delivery.' },
    { num: '03', text: 'Enhance household income and resilience through livelihood and entrepreneurship programs.' },
    { num: '04', text: 'Strengthen climate resilience and environmental protection at community and national levels.' },
    { num: '05', text: 'Build strong partnerships with government, NGOs, and donors for sustainable impact.' }
  ];

  const orgStructure = [
    { title: 'Board of Directors', desc: 'Provides governance, oversight, and strategic direction.' },
    { title: 'Executive Director', desc: 'Leads strategy, donor engagement, and partnerships.' },
    { title: 'Program Managers', desc: 'Oversee Education, Health, Livelihood, and Climate Action sectors.' },
    { title: 'Finance & Admin Team', desc: 'Ensures accountability, compliance, and resource management.' },
    { title: 'M&E Unit', desc: 'Tracks impact, learning, and reporting.' },
    { title: 'Field Officers & Volunteers', desc: 'Implement activities at the community level.' }
  ];

  const policies = [
    'Constitution and bylaws',
    'Strategic plan (3–5 years)',
    'Annual work plan and budget',
    'Monitoring & Evaluation framework',
    'Safeguarding & child protection',
    'Gender and inclusion policy',
    'Anti-corruption & accountability',
    'Environmental sustainability'
  ];

  const currentProgramObj = programs.find(p => p.id === activeProgram)!;
  const SelectedIcon = currentProgramObj.icon;

  return (
    <section id="strategy" className="bg-white font-sans scroll-mt-12 border-b border-natural-border">
      {/* Top Banner with Background Photo & Full Color Words */}
      <div className="relative bg-[#003366] text-white py-20 px-4 overflow-hidden border-b border-sky-900 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src={content.pillarsHeaderBgImage || "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1600"}
            alt="Our Intervention Programs - PID Uganda"
            className="w-full h-full object-cover opacity-60 brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/90 via-[#003366]/75 to-[#007BC4]/80" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#7DC242]">
            {content.pillarsTagline || "PID Intervention Programs"}
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            <MixedColorText text={content.pillarsTitle || "Four Pillars of {Social Transformation}"} isDarkBg={true} />
          </h1>
          <RichText className="text-slate-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" text={content.pillarsSubtitle || "Plan Integral Development operates an integrated program model across Uganda, bridging the gap between immediate grassroots needs and long-term structural policy changes."} />
          <div className="w-20 h-1.5 bg-[#7DC242] mx-auto rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Programs Nav Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-14"
        >
          {programs.map((prog) => {
            const ProgIcon = prog.icon;
            const isSelected = activeProgram === prog.id;
            return (
              <button
                key={prog.id}
                onClick={() => {
                  setActiveProgram(prog.id);
                }}
                className={`flex items-center gap-3.5 p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? `${prog.bgColor} ${prog.borderColor} scale-[1.02] shadow-md`
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected ? prog.themeColor : 'bg-slate-100'
                }`}>
                  <ProgIcon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-slate-700'}`} />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900 leading-tight">
                    {prog.title}
                  </h4>
                  <span className="text-xs text-slate-500 font-semibold uppercase">
                    Explore Pillar
                  </span>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Main Display Pane */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-3xl border border-natural-border p-6 sm:p-10 max-w-5xl mx-auto mb-16 shadow-sm"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProgram}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Header inside pane */}
              <div className="border-b border-slate-200 pb-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${currentProgramObj.bgColor} ${currentProgramObj.textColor}`}>
                    Program Profile
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#007BC4] flex items-center gap-1 font-bold">
                    <SelectedIcon className="w-3.5 h-3.5" />
                    <span>PID Sector Focus</span>
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold italic text-[#003366]">
                  {currentProgramObj.title} Program: <span className="text-[#007BC4] font-sans not-italic text-lg sm:text-xl block sm:inline font-bold uppercase tracking-wide">({currentProgramObj.tagline})</span>
                </h3>
                <p className="text-sm text-slate-800 font-medium leading-relaxed max-w-4xl">
                  {currentProgramObj.intro}
                </p>
              </div>

              {/* Modules Sub-Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#007BC4] mb-6">
                  Key Intervention Modules
                </h4>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {currentProgramObj.modules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 hover:bg-white hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full ${currentProgramObj.bgColor} flex items-center justify-center shrink-0 mt-0.5`}>
                          <CheckCircle className={`w-3.5 h-3.5 ${currentProgramObj.textColor}`} />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-[#003366] font-serif italic">
                            {mod.title}
                          </h5>
                          {mod.description && (
                            <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                              {mod.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {mod.bullets && (
                        <div className="pl-9 space-y-2 border-l border-slate-200 ml-3 pt-1">
                          {mod.bullets.map((b, bIdx) => {
                            const [label, desc] = b.split(': ');
                            return (
                              <div key={bIdx} className="text-xs leading-relaxed text-slate-700 font-medium">
                                <span className="font-bold text-[#003366] block sm:inline">{label}:</span>{' '}
                                <span>{desc}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <ProgrammeReference />

        {/* Collapsible Governance, Strategy & Policies section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto text-center"
        >
          <button
            onClick={() => setShowGovSec(!showGovSec)}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-natural-dark hover:bg-natural-olive text-white text-xs font-bold uppercase tracking-widest rounded-2xl transition-all cursor-pointer shadow"
          >
            <span>{showGovSec ? 'Hide Operations & Governance' : 'Explore Governance, Objectives & Policies'}</span>
            {showGovSec ? <ChevronUp className="w-4 h-4 text-natural-tan" /> : <ChevronDown className="w-4 h-4 text-natural-tan" />}
          </button>

          <AnimatePresence>
            {showGovSec && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-8 text-left"
              >
                <div className="bg-natural-beige/30 border border-natural-border rounded-3xl p-6 sm:p-10 space-y-8">
                  
                  {/* Tabs Selection inside Governance */}
                  <div className="flex flex-wrap justify-center gap-2 border-b border-natural-border pb-6">
                    {[
                      { id: 'objectives', label: 'Strategic Objectives', icon: Compass },
                      { id: 'structure', label: 'Organizational Structure', icon: Layers },
                      { id: 'policies', label: 'Supporting Systems & Policies', icon: FileCheck },
                    ].map((tab) => {
                      const TabIcon = tab.icon;
                      const isTabSel = govTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setGovTab(tab.id as any)}
                          className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                            isTabSel
                              ? 'bg-natural-olive text-white shadow-sm'
                              : 'bg-white border border-natural-border text-natural-text hover:bg-natural-beige/50'
                          }`}
                        >
                          <TabIcon className="w-3.5 h-3.5" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Gov Content display */}
                  <AnimatePresence mode="wait">
                    {govTab === 'objectives' && (
                      <motion.div
                        key="objectives"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <h4 className="text-lg font-serif font-bold italic text-natural-dark flex items-center gap-2">
                            <Compass className="w-5 h-5 text-natural-tan" />
                            <span>Core Strategic Objectives</span>
                          </h4>
                          <p className="text-xs text-natural-text opacity-85 leading-relaxed">
                            These strategic objectives define our priorities and align our operations toward making a highly measurable national impact.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {objectives.map((obj) => (
                            <div key={obj.num} className="bg-white p-4 rounded-xl border border-natural-border flex gap-4 items-start">
                              <span className="text-sm font-extrabold font-mono text-natural-tan bg-natural-beige px-2.5 py-1 rounded-lg">
                                {obj.num}
                              </span>
                              <p className="text-xs font-bold text-natural-dark leading-relaxed">
                                {obj.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {govTab === 'structure' && (
                      <motion.div
                        key="structure"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <h4 className="text-lg font-serif font-bold italic text-natural-dark flex items-center gap-2">
                            <Layers className="w-5 h-5 text-natural-tan" />
                            <span>PID Governance Structure</span>
                          </h4>
                          <p className="text-xs text-natural-text opacity-85 leading-relaxed">
                            A highly accountable system that ensures strategic direction, legal compliance, and robust field execution.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {orgStructure.map((struct, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-natural-border space-y-2">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-natural-dark border-b border-natural-border pb-1">
                                {struct.title}
                              </h5>
                              <p className="text-[11px] text-natural-text/80 font-medium leading-relaxed">
                                {struct.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {govTab === 'policies' && (
                      <motion.div
                        key="policies"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <h4 className="text-lg font-serif font-bold italic text-natural-dark flex items-center gap-2">
                            <FileCheck className="w-5 h-5 text-natural-tan" />
                            <span>Supporting Systems & Policies</span>
                          </h4>
                          <p className="text-xs text-natural-text opacity-85 leading-relaxed">
                            We are regulated by strong operating guides and protective protocols to ensure transparency, anti-corruption, and absolute safeguarding of the vulnerable.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {policies.map((p, idx) => (
                            <div key={idx} className="bg-white p-3.5 rounded-xl border border-natural-border text-center space-y-2 flex flex-col items-center justify-center">
                              <FileText className="w-4 h-4 text-natural-tan" />
                              <span className="text-[10px] font-bold uppercase text-natural-dark tracking-wide leading-tight">
                                {p}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}

