import { useState } from 'react';
import { ORG_INFO, CORE_VALUES } from '../data';
import { Target, Eye, Compass, Shield } from 'lucide-react';
import * as Icons from 'lucide-react';
import { translations, Language } from '../translations';

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
}

const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'sport', label: 'Sport' },
  { id: 'education', label: 'Education' },
  { id: 'health', label: 'Health' },
  { id: 'livelihood', label: 'Skills & Livelihoods' },
  { id: 'climate', label: 'Environment' },
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'team', label: 'Our Team' }
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    category: 'Sport & Integration',
    title: 'Youth Soccer Clinic',
    location: 'Kitintale, Kampala',
    description: 'Vibrant youth sports leagues promoting integration, discipline, and gender-inclusive play in Kampala slums.',
    imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'g2',
    category: 'Education & Grants',
    title: 'Scholastic Kit Distribution',
    location: 'Butebo District',
    description: 'Equipping partner school pupils with textbooks, backpacks, and writing materials to secure school retention.',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'g3',
    category: 'Health & Wellbeing',
    title: 'Clean Water Project',
    location: 'Kitintale Slum Node',
    description: 'Providing biosand water filters and hygiene kits to local households to secure safe drinking water.',
    imageUrl: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'g4',
    category: 'Skills & Livelihoods',
    title: 'Vocational Sewing Classes',
    location: 'Mbale Hub',
    description: 'Empowering young single mothers with tailoring, embroidery, and craft skills to establish self-reliance.',
    imageUrl: 'https://images.unsplash.com/photo-1544928147-79a2bec1638f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'g5',
    category: 'Environment',
    title: 'Reforestation Tree Planting',
    location: 'Elgon Slopes, Mbale',
    description: 'Combining athletic tournaments with community tree planting saplings to stabilize mountain slopes.',
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'g6',
    category: 'Agriculture',
    title: 'Composting Demonstration Field',
    location: 'Butebo District',
    description: 'Teaching organic agricultural techniques and sustainable soil composting to smallholder farming cooperatives.',
    imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'g7',
    category: 'Our Team',
    title: 'PID Secretariat Staff',
    location: 'Kampala Headquarters',
    description: 'The dedicated staff and community coordinators of Plan Integral Development standing together in Kampala.',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'g8',
    category: 'Sport & Integration',
    title: 'Co-ed Korfball Drills',
    location: 'Kitintale, Kampala',
    description: 'Promoting gender equality and mutual respect through mixed-gender co-ed Korfball training programs.',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'g9',
    category: 'Education & Grants',
    title: 'Scholarship Recipients Meeting',
    location: 'Kampala Slums',
    description: 'PID scholars gather for counseling, mentoring, and academic track discussions with PID coordinators.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80'
  }
];

interface WhoWeAreProps {
  language: Language;
}

export default function WhoWeAre({ language }: WhoWeAreProps) {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'strategy'>('mission');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const t = translations[language];

  const galleryCategories = [
    { id: 'all', label: t.photoAll },
    { id: 'sport', label: t.photoSport },
    { id: 'education', label: t.photoEducation },
    { id: 'health', label: t.photoHealth },
    { id: 'livelihood', label: t.photoLivelihood },
    { id: 'climate', label: t.photoClimate },
    { id: 'agriculture', label: t.photoAgriculture },
    { id: 'team', label: t.photoTeam }
  ];

  const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent className="w-5 h-5 text-emerald-500" /> : <Shield className="w-5 h-5 text-emerald-500" />;
  };

  const filteredGalleryItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => {
        const catLower = item.category.toLowerCase();
        if (selectedCategory === 'sport') return catLower.includes('sport');
        if (selectedCategory === 'education') return catLower.includes('education');
        if (selectedCategory === 'health') return catLower.includes('health');
        if (selectedCategory === 'livelihood') return catLower.includes('skills') || catLower.includes('livelihood');
        if (selectedCategory === 'climate') return catLower.includes('environment') || catLower.includes('climate');
        if (selectedCategory === 'agriculture') return catLower.includes('agriculture');
        if (selectedCategory === 'team') return catLower.includes('team');
        return false;
      });

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-y border-slate-100" id="who-we-are">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Branding Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          <div className="lg:col-span-4">
            <span className="text-gold-600 font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
              01 &mdash; {language === 'en' ? 'Who we are' : 'Kiki kye tuli'}
            </span>
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              {language === 'en' ? 'A Decade of Sport, Growth, and Empowerment' : 'Emyaka Ekkumi mu Mizannyo, n\'Okukuza Ebitundu'}
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-4 uppercase tracking-widest">
              Registered NGO under CAP 109
            </p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {ORG_INFO.aboutBrief}
            </p>
          </div>
        </div>

        {/* Mission, Vision, Strategy Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Side Tabs Selector */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white border border-slate-200/60 rounded-2xl p-6 shadow-xs">
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">Focus Pillars</h4>
              
              <button
                onClick={() => setActiveTab('mission')}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-left transition-all text-sm font-semibold cursor-pointer ${
                  activeTab === 'mission'
                    ? 'bg-[#0f594b] text-white shadow-md'
                    : 'bg-transparent text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Target className="w-4 h-4 flex-shrink-0" />
                <span>{t.aboutTabMission}</span>
              </button>

              <button
                onClick={() => setActiveTab('vision')}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-left transition-all text-sm font-semibold cursor-pointer ${
                  activeTab === 'vision'
                    ? 'bg-[#0f594b] text-white shadow-md'
                    : 'bg-transparent text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Eye className="w-4 h-4 flex-shrink-0" />
                <span>{t.aboutTabVision}</span>
              </button>

              <button
                onClick={() => setActiveTab('strategy')}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-left transition-all text-sm font-semibold cursor-pointer ${
                  activeTab === 'strategy'
                    ? 'bg-[#0f594b] text-white shadow-md'
                    : 'bg-transparent text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Compass className="w-4 h-4 flex-shrink-0" />
                <span>{t.aboutTabStrategy}</span>
              </button>
            </div>

            <div className="border-t border-slate-100 pt-6 mt-6 hidden lg:block">
              <p className="text-[11px] text-slate-400 font-mono">
                "By combining sport with social connection, we inspire communities nationwide."
              </p>
            </div>
          </div>

          {/* Dynamic Details Box */}
          <div className="lg:col-span-8 bg-white border border-slate-200/60 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xs">
            <div>
              {activeTab === 'mission' && (
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Target className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="font-display font-bold text-xl sm:text-2xl text-slate-900">Our Strategic Purpose</h4>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
                    {ORG_INFO.mission}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100 mt-6">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <h5 className="font-semibold text-xs text-emerald-600 uppercase tracking-wider">Target Groups</h5>
                      <p className="text-xs text-slate-500 mt-1">Children, vulnerable women, disadvantaged youth, and rural elderly.</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <h5 className="font-semibold text-xs text-emerald-600 uppercase tracking-wider">Scope Mandate</h5>
                      <p className="text-xs text-slate-500 mt-1">Refugee settlements, Kampala settlements, and rural district hubs.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-teal-600" />
                  </div>
                  <h4 className="font-display font-bold text-xl sm:text-2xl text-slate-900">Our Long-term Vision</h4>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
                    {ORG_INFO.vision}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-50 mt-6">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
                      <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wide">Knowledge</h5>
                      <p className="text-[10.5px] text-slate-500 mt-0.5">Equal learning & scholarships</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
                      <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wide">Health</h5>
                      <p className="text-[10.5px] text-slate-500 mt-0.5">Safe sports & physical safety</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
                      <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wide">Economics</h5>
                      <p className="text-[10.5px] text-slate-500 mt-0.5">Skills and entrepreneurship</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'strategy' && (
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Compass className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h4 className="font-display font-bold text-xl sm:text-2xl text-slate-900 font-display">Sports as a Catalyst</h4>
                  <p className="text-slate-600 text-sm leading-relaxed pt-2">
                    {ORG_INFO.strategy}
                  </p>
                  <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      <p className="text-xs text-slate-600"><span className="font-semibold text-slate-800">Neutral Entry Point:</span> Fostering instant trust and mutual understanding across diverse communities through safe, low-barrier sport activities.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      <p className="text-xs text-slate-600"><span className="font-semibold text-slate-800">Structured Transition:</span> Guiding sports participants into practical academic grants, vocational programs, and community support hubs.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      <p className="text-xs text-slate-600"><span className="font-semibold text-slate-800">Long-Term Resilience:</span> Sustaining impact by aligning activities with environmental care and climate-smart urban food security.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">Our Core Values</h3>
            <p className="text-sm text-slate-500 mt-2">
              Every staff member and volunteer is guided by these non-negotiable principles to drive breakthroughs and build trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {CORE_VALUES.map((value) => (
              <div
                key={value.name}
                className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs hover:border-[#0f594b]/30 transition-all hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    {getIcon(value.iconName)}
                  </div>
                  <h4 className="font-display font-bold text-base text-slate-900 group-hover:text-[#0f594b] transition-colors">
                    {value.name}
                  </h4>
                  <p className="text-[10px] font-semibold text-gold-600 uppercase tracking-widest mt-1">
                    {value.tagline}
                  </p>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PID Uganda On The Ground - Photographic Gallery */}
        <div className="pt-24 border-t border-slate-100" id="photo-gallery">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-gold-600 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
              PID Uganda Media Center
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-4xl text-slate-900 tracking-tight mt-4">
              {t.galleryTitle}
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              {t.gallerySubtitle}
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl mx-auto">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-[10.5px] font-mono uppercase tracking-wider transition-all border cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0f594b] border-[#0f594b] text-white shadow-xs font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGalleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item)}
                className="group bg-white border border-slate-200/50 rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                {/* Visual Cover */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  {/* Subtle hover icon overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white">
                      <Icons.Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                  {/* Location badge on visual top-left */}
                  <span className="absolute top-4 left-4 inline-flex items-center space-x-1 px-2.5 py-1 bg-[#08231d]/85 text-white text-[9px] font-mono rounded-md">
                    <Icons.MapPin className="w-3 h-3 text-gold-500" />
                    <span>{item.location}</span>
                  </span>
                </div>

                {/* Caption / Description Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-[#0f594b] uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#0f594b] transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{t.galleryVerified}</span>
                    <span className="text-emerald-600 font-bold inline-flex items-center space-x-0.5 animate-pulse">
                      <span>{t.galleryViewFull}</span>
                      <span>&nearr;</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Full-screen Modal Image Viewer */}
        {lightboxImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxImage(null)}
          >
            {/* Modal Box */}
            <div 
              className="relative max-w-4xl w-full bg-[#08231d] border border-[#0d4035] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Column: Big Image Display */}
              <div className="relative flex-1 bg-stone-950 flex items-center justify-center aspect-video md:aspect-auto md:h-[500px]">
                <img
                  src={lightboxImage.imageUrl}
                  alt={lightboxImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 inline-flex items-center space-x-1 px-3 py-1.5 bg-[#08231d]/90 text-white text-[10px] font-mono rounded-lg">
                  <Icons.MapPin className="w-3.5 h-3.5 text-gold-500" />
                  <span>{lightboxImage.location}</span>
                </span>
              </div>

              {/* Right Column: Narrative Panel */}
              <div className="w-full md:w-80 p-6 md:p-8 flex flex-col justify-between space-y-6 md:border-l border-[#0e483b]">
                {/* Meta details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono bg-[#0d4035] text-gold-400 border border-[#08231d]/50 px-2 py-0.5 rounded uppercase font-semibold">
                      {lightboxImage.category}
                    </span>
                    <button 
                      onClick={() => setLightboxImage(null)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
                    >
                      <Icons.X className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-xl tracking-tight text-white leading-tight">
                      {lightboxImage.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                      {lightboxImage.description}
                    </p>
                  </div>
                </div>

                {/* Context badge */}
                <div className="border-t border-[#0e483b] pt-4 text-[10.5px] text-emerald-100/70 space-y-2">
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Project Location:' : 'Ggwe n\'Ebitundu:'}</span>
                    <span className="font-semibold text-white">{lightboxImage.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Project Source:' : 'Nsibuko y\'Ebifananyi:'}</span>
                    <span className="font-semibold text-gold-400">PID Uganda Field Operations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
