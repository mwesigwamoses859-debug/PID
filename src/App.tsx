import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Home from './components/Home';
import WhoWeAre from './components/WhoWeAre';
import Programmes from './components/Programmes';
import StructureAndPolicies from './components/StructureAndPolicies';
import Partners from './components/Partners';
import Opportunities from './components/Opportunities';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DonationModal from './components/DonationModal';
import { Programme } from './types';
import { Language } from './translations';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'programmes' | 'governance' | 'get-involved' | 'contact'>('home');
  const [selectedProgramme, setSelectedProgramme] = useState<Programme | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  const handleNavigate = (page: 'home' | 'about' | 'programmes' | 'governance' | 'get-involved' | 'contact') => {
    setCurrentPage(page);
    setSelectedProgramme(null); // Reset deep programmatic details state on page switch
    // Instantly scroll to top for standard page transition feedback
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-500 selection:text-white overflow-hidden">
      {/* Sticky Header Navigation */}
      <Header 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        language={language}
        onLanguageChange={setLanguage}
        onOpenDonation={() => setIsDonationOpen(true)}
      />

      {/* Main Multi-Page Views */}
      <main className="flex-1 bg-white relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {/* Render Home Page view */}
            {currentPage === 'home' && (
              <Home onNavigate={handleNavigate} language={language} onOpenDonation={() => setIsDonationOpen(true)} />
            )}

            {/* Render Who We Are page view */}
            {currentPage === 'about' && (
              <>
                <WhoWeAre language={language} />
                <Partners />
              </>
            )}

            {/* Render Core Programmes view */}
            {currentPage === 'programmes' && (
              <Programmes 
                selectedProgramme={selectedProgramme} 
                onSelectProgramme={setSelectedProgramme} 
                language={language}
              />
            )}

            {/* Render Policy & Structure view */}
            {currentPage === 'governance' && (
              <StructureAndPolicies language={language} />
            )}

            {/* Render Available Placements / Careers / Volunteer opportunities view */}
            {currentPage === 'get-involved' && (
              <Opportunities language={language} onOpenDonation={() => setIsDonationOpen(true)} />
            )}

            {/* Render Direct Secretariat Coordinates & Maps view */}
            {currentPage === 'contact' && (
              <Contact language={language} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer currentPage={currentPage} onNavigate={handleNavigate} language={language} onOpenDonation={() => setIsDonationOpen(true)} />

      {/* Global Donation Modal Portal */}
      <DonationModal 
        isOpen={isDonationOpen} 
        onClose={() => setIsDonationOpen(false)} 
        language={language} 
      />
    </div>
  );
}
