/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Users, Compass, HelpCircle, ArrowRight, HeartHandshake } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import StrategyPillars from './components/StrategyPillars';
import ImpactDashboard from './components/ImpactDashboard';
import Partners from './components/Partners';
import Opportunities from './components/Opportunities';
import { CommunityGallery } from './components/CommunityGallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { AdminPanel } from './components/AdminPanel';
import { BackToTop } from './components/BackToTop';

function AppContent() {
  const { content, setIsAdminOpen, isAdminOpen, isAuthorized, unpublishedSections } = useAdmin();
  const validSections = ['home', 'about', 'strategy', 'impact', 'partners', 'gallery', 'opportunities', 'contact', 'admin'];

  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (validSections.includes(hash)) return hash;
    }
    return 'home';
  });

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (typeof window !== 'undefined') {
      const targetHash = section === 'home' ? '' : `#${section}`;
      if (window.location.hash !== targetHash) {
        window.history.replaceState(null, '', targetHash || window.location.pathname);
      }
    }
  };

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (validSections.includes(hash)) {
        setActiveSection(hash);
      } else if (!hash) {
        setActiveSection('home');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const [cookieNoticeVisible, setCookieNoticeVisible] = useState(
    () => localStorage.getItem('pid_cookie_notice') !== 'accepted'
  );
  const galleryImage = (id: string, fallback: string) =>
    content.galleryImages?.find((item) => item.id === id)?.url || fallback;

  const storyIcons: Record<string, typeof Compass> = {
    about: Compass,
    strategy: BookOpen,
    opportunities: Users,
  };
  const homeStories = (content.homeCards || [])
    .filter((story) => story.visible)
    .map((story) => ({
      ...story,
      icon: storyIcons[story.target] || Compass,
    }));

  const communityMoments = [
    { image: galleryImage('g13', '/images/ad4-203.jpg'), label: 'Youth participation', className: 'md:col-span-2' },
    { image: galleryImage('g16', '/images/pprrp-50.jpg'), label: 'Friendship and belonging', className: '' },
    { image: galleryImage('g4', '/images/gbls-20.jpg'), label: 'Community teamwork', className: '' },
    { image: galleryImage('g8', '/images/ysu-9660.jpg'), label: 'Play and wellbeing', className: 'md:col-span-2' },
  ];

  const renderActivePage = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-16">
            {/* Earthy Hero intro */}
            <Hero setActiveSection={handleSectionChange} />

            {/* Quick Navigation Cards - keeping homepage super clean */}
            <section className="py-16 bg-slate-50 border-y border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                  <span className="px-3.5 py-1 rounded-full bg-[#7DC242]/15 text-[#003366] font-extrabold text-[11px] uppercase tracking-wider inline-block border border-[#7DC242]/30">
                    Fast Track Access
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#003366] tracking-tight">
                    Explore Our Core Frameworks
                  </h3>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto font-medium leading-relaxed">
                    PID works at the intersection of athletics, environmental restoration, and youth livelihood. Click below to view each dedicated program view.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {homeStories.map((story) => {
                    const Icon = story.icon;
                    return (
                      <button
                        key={story.id}
                        onClick={() => { handleSectionChange(story.target); window.scrollTo({ top: 0, behavior: 'instant' }); }}
                        className="relative min-h-[390px] overflow-hidden rounded-3xl text-left cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-1 border border-white/60"
                      >
                        <img
                          src={story.image}
                          alt={story.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001d38] via-[#003366]/55 to-transparent" />
                        <div className="relative z-10 h-full p-7 flex flex-col justify-end text-white">
                          <div className="w-12 h-12 rounded-xl bg-[#7DC242] text-[#003366] flex items-center justify-center shadow-lg mb-5">
                            <Icon className="w-6 h-6" />
                          </div>
                          <h4 className="text-2xl font-black">{story.title}</h4>
                          <p className="text-sm text-slate-100 leading-relaxed mt-2">{story.description}</p>
                          <div className="flex items-center gap-2 mt-6 text-xs font-black text-[#B7EB82] uppercase tracking-wider group-hover:gap-3 transition-all">
                            <span>{story.action}</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-10">
                  <div className="max-w-2xl">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-[#007BC4]">Life inside our programmes</span>
                    <h2 className="text-3xl sm:text-5xl font-black text-[#003366] mt-3">Our work in pictures</h2>
                  </div>
                  <p className="max-w-md text-sm text-slate-600 leading-relaxed">
                    Real moments of learning, teamwork, sport and friendship from the communities PID serves.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[260px] gap-4">
                  {communityMoments.map((moment) => (
                    <div key={moment.label} className={`relative overflow-hidden rounded-3xl group ${moment.className}`}>
                      <img
                        src={moment.image}
                        alt={moment.label}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                      <span className="absolute left-5 bottom-5 text-sm font-black text-white">{moment.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => { handleSectionChange('gallery'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#003366] hover:bg-[#007BC4] text-white px-6 py-3 text-xs font-black uppercase tracking-wider transition-colors"
                  >
                    Explore the full gallery
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* Credibility logos */}
            <Partners />
          </div>
        );
      case 'about':
        return <AboutUs />;
      case 'strategy':
        return <StrategyPillars />;
      case 'impact':
        return <ImpactDashboard />;
      case 'partners':
        return <Partners />;
      case 'opportunities':
        return <Opportunities />;
      case 'gallery':
        return <CommunityGallery />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero setActiveSection={handleSectionChange} />;
    }
  };

  if (content.siteFeatures?.maintenanceMode) {
    return (
      <div className="min-h-screen bg-[#001d38] text-white flex items-center justify-center px-5">
        <div className="max-w-xl text-center space-y-5">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#7DC242]">PID Uganda</span>
          <h1 className="text-4xl sm:text-6xl font-black">Website maintenance in progress</h1>
          <p className="text-slate-300">We are updating our community website. Please return shortly.</p>
          <button onClick={() => setIsAdminOpen(true)} className="px-5 py-3 rounded-full bg-[#7DC242] text-[#003366] text-xs font-black uppercase tracking-wider">Open Console</button>
        </div>
        <AdminPanel />
      </div>
    );
  }

  return (
    <div className="website-shell min-h-screen bg-natural-bg text-natural-text font-sans antialiased selection:bg-natural-tan/20 selection:text-natural-dark flex flex-col">
      {isAuthorized && !isAdminOpen && <div className="fixed bottom-5 left-4 right-4 z-[80] mx-auto max-w-3xl rounded-2xl bg-[#003366] text-white border border-sky-500 p-4 shadow-2xl flex items-center justify-between gap-4"><p className="text-sm"><strong>Administrator preview</strong><span className="block text-xs text-sky-200 mt-1">{unpublishedSections.length ? 'Unpublished changes are visible only to you.' : 'Your draft matches the live website.'}</span></p><button onClick={() => setIsAdminOpen(true)} className="rounded-xl px-4 py-2 bg-[#7DC242] text-[#003366] font-bold text-xs">Return to Editor</button></div>}
      {/* Navigation Header */}
      <Navbar activeSection={activeSection} setActiveSection={handleSectionChange} />

      {/* Main Routed Sections with smooth entry transition */}
      <main id="public-content" className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Corporate directory Footer */}
      <Footer setActiveSection={handleSectionChange} />

      <BackToTop />
      {/* Live Admin CMS Controller Modal Overlay */}
      <AdminPanel />

      {content.siteFeatures?.cookieNotice && cookieNoticeVisible && (
        <div className="fixed left-4 right-4 bottom-4 z-40 max-w-3xl mx-auto rounded-2xl bg-[#001d38]/95 backdrop-blur-xl border border-white/15 shadow-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white">
          <p className="text-xs leading-relaxed">This website uses essential browser storage for preferences, the no-code template editor and accessibility settings.</p>
          <button
            onClick={() => { localStorage.setItem('pid_cookie_notice', 'accepted'); setCookieNoticeVisible(false); }}
            className="px-4 py-2 rounded-full bg-[#7DC242] text-[#003366] text-xs font-black shrink-0"
          >
            Accept
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}

