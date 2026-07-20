import { useState, useEffect } from 'react';
import { PARTNERS, PARTNERS_BRIEF } from '../data';
import { Handshake, Building2, Landmark, ShieldCheck, Award, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

const KCCALogo = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Yellow sun */}
    <circle cx="60" cy="40" r="18" fill="#facc15" />
    {/* Green hill base */}
    <path d="M20 62 C40 54, 80 54, 100 62" stroke="#15803d" strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Clock Tower body */}
    <rect x="53" y="32" width="14" height="26" fill="#1e293b" />
    <rect x="51" y="44" width="18" height="3" fill="#334155" />
    <rect x="51" y="50" width="18" height="3" fill="#334155" />
    {/* Clock face */}
    <circle cx="60" cy="24" r="6" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
    <line x1="60" y1="24" x2="60" y2="20" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="60" y1="24" x2="63" y2="24" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
    {/* Tower roof */}
    <path d="M53 18 L60 10 L67 18 Z" fill="#1e293b" />
    {/* KCCA text */}
    <text x="60" y="86" fill="#dc2626" fontSize="24" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="0.5">KCCA</text>
    {/* Subtitles */}
    <text x="60" y="98" fill="#166534" fontSize="5.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.2">KAMPALA CAPITAL CITY AUTHORITY</text>
    <text x="60" y="108" fill="#475569" fontSize="6.5" fontFamily="Georgia, serif" fontStyle="italic" textAnchor="middle">For a better City</text>
  </svg>
);

const MGLSDLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer grey circle */}
    <circle cx="50" cy="46" r="35" stroke="#cbd5e1" strokeWidth="2" fill="#ffffff" />
    {/* Uganda Flag stripes on left and right */}
    <rect x="2" y="42" width="13" height="8" fill="#000000" />
    <rect x="2" y="44" width="13" height="4" fill="#facc15" />
    <rect x="2" y="45" width="13" height="2" fill="#ef4444" />
    <rect x="85" y="42" width="13" height="8" fill="#000000" />
    <rect x="85" y="44" width="13" height="4" fill="#facc15" />
    <rect x="85" y="45" width="13" height="2" fill="#ef4444" />
    
    {/* Coat of Arms inside */}
    {/* Spears */}
    <line x1="43" y1="24" x2="57" y2="48" stroke="#475569" strokeWidth="1.5" />
    <line x1="57" y1="24" x2="43" y2="48" stroke="#475569" strokeWidth="1.5" />
    {/* Shield */}
    <path d="M45 28 Q50 26, 55 28 C55 38, 50 44, 50 44 C50 44, 45 38, 45 28 Z" fill="#020617" stroke="#eab308" strokeWidth="1" />
    {/* Waves */}
    <path d="M46 29 L54 29 M46 31 L54 31" stroke="#3b82f6" strokeWidth="1" />
    {/* Sun */}
    <circle cx="50" cy="34" r="2.5" fill="#facc15" />
    {/* Drum */}
    <ellipse cx="50" cy="40" rx="2.5" ry="1.5" fill="#b45309" stroke="#eab308" strokeWidth="0.5" />
    
    {/* Left Antelope (Uganda Kob) */}
    <path d="M38 41 C37 34, 43 32, 43 39" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M41 34 Q39 30, 40 26" stroke="#1e293b" strokeWidth="1" fill="none" />
    
    {/* Right Crested Crane */}
    <path d="M62 41 C63 34, 57 32, 57 39" stroke="#475569" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <circle cx="60" cy="32" r="1.5" fill="#facc15" />
    
    {/* Green Mound */}
    <path d="M36 43 Q50 46, 64 43 C58 48, 42 48, 36 43 Z" fill="#22c55e" />
    {/* Banner */}
    <path d="M38 48 Q50 51, 62 48" stroke="#cbd5e1" strokeWidth="2" fill="none" />
    
    {/* Underneath labels */}
    <text x="50" y="87" fill="#0f172a" fontSize="3.8" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="0.1">MINISTRY OF GENDER LABOUR</text>
    <text x="50" y="93" fill="#0f172a" fontSize="3.8" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="0.1">&amp; SOCIAL DEVELOPMENT</text>
  </svg>
);

const NGOBureauLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer circle with Uganda flag theme crescent */}
    <circle cx="50" cy="44" r="38" stroke="#1e293b" strokeWidth="2.5" fill="#ffffff" />
    
    {/* Red and Yellow crescents representing flag */}
    <path d="M16 44 A34 34 0 0 1 84 44" stroke="#facc15" strokeWidth="3" fill="none" />
    <path d="M14 44 A36 36 0 0 1 86 44" stroke="#ef4444" strokeWidth="2" fill="none" />
    
    {/* Central Coat of Arms */}
    <line x1="44" y1="28" x2="56" y2="48" stroke="#475569" strokeWidth="1" />
    <line x1="56" y1="28" x2="44" y2="48" stroke="#475569" strokeWidth="1" />
    <path d="M46 32 Q50 30, 54 32 C54 40, 50 45, 50 45 C50 45, 46 40, 46 32 Z" fill="#020617" stroke="#eab308" strokeWidth="0.8" />
    <path d="M40 43 C39 37, 44 35, 44 41" stroke="#b45309" strokeWidth="1" fill="none" />
    <path d="M60 43 C61 37, 56 35, 56 41" stroke="#475569" strokeWidth="1" fill="none" />
    <path d="M38 44 Q50 47, 62 44" fill="#22c55e" opacity="0.5" />
    
    {/* NGO Bureau text */}
    <text x="50" y="85" fill="#1e293b" fontSize="5.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="0.2">National Bureau</text>
    <text x="50" y="91" fill="#1e293b" fontSize="5.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="0.2">for NGOs</text>
    <rect x="34" y="94" width="32" height="4.5" rx="1.5" fill="#000000" />
    <text x="50" y="98" fill="#facc15" fontSize="3.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="bold" textAnchor="middle">UGANDA</text>
  </svg>
);

const ButeboLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <circle cx="50" cy="50" r="38" fill="#ffffff" stroke="#16a34a" strokeWidth="1" strokeDasharray="3 3" />
    {/* Tree symbol for district */}
    <path d="M50 22 L50 64" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
    {/* Left branch */}
    <path d="M50 44 Q36 38, 34 28 Q44 28, 50 40" fill="#16a34a" />
    {/* Right branch */}
    <path d="M50 48 Q64 42, 66 32 Q56 32, 50 44" fill="#16a34a" />
    <text x="50" y="78" fill="#1e293b" fontSize="8" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="0.5">BUTEBO</text>
    <text x="50" y="88" fill="#475569" fontSize="6.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.2">DISTRICT GOVT</text>
  </svg>
);

const USDPLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Organic triangular shape (Yellow, Red, Black petals) */}
    {/* Yellow petal */}
    <path d="M50 14 C66 14, 76 24, 71 42 C61 40, 51 30, 50 14 Z" fill="#eab308" />
    {/* Red petal */}
    <path d="M71 44 C66 62, 51 70, 39 53 C46 46, 56 43, 71 44 Z" fill="#dc2626" />
    {/* Black petal */}
    <path d="M37 51 C26 41, 31 23, 49 25 C45 36, 41 46, 37 51 Z" fill="#1e293b" />
    
    {/* Central soccer ball inside white negative space */}
    <circle cx="50" cy="39" r="8" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
    {/* Ball panels */}
    <path d="M50 35 L53 38 L47 38 Z" fill="#1e293b" />
    <line x1="50" y1="35" x2="50" y2="31" stroke="#1e293b" strokeWidth="0.8" />
    <line x1="53" y1="38" x2="57" y2="40" stroke="#1e293b" strokeWidth="0.8" />
    <line x1="47" y1="38" x2="43" y2="40" stroke="#1e293b" strokeWidth="0.8" />
    
    {/* Large text */}
    <text x="50" y="80" fill="#0f172a" fontSize="15" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="0.5">US4DN</text>
    <text x="50" y="91" fill="#475569" fontSize="4.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.1">SPORTS FOR DEVELOPMENT</text>
  </svg>
);

const UKALogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ball on top-left */}
    <circle cx="36" cy="34" r="14" fill="#facc15" stroke="#1e293b" strokeWidth="1.5" />
    {/* Ball panels */}
    <path d="M36 20 C40 24, 40 28, 36 32 C32 28, 32 24, 36 20 Z" fill="#1e293b" />
    <path d="M24 30 C26 34, 30 34, 32 30 C30 26, 26 26, 24 30 Z" fill="#1e293b" />
    <path d="M48 30 C46 34, 42 34, 40 30 C42 26, 46 26, 48 30 Z" fill="#1e293b" />
    <path d="M36 42 C32 46, 28 46, 28 42 C28 38, 32 38, 36 42 Z" fill="#1e293b" />
    
    {/* Colored flag-theme swooshes */}
    <path d="M30 46 Q48 42, 58 34" stroke="#eab308" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M28 50 Q50 46, 60 38" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M26 54 Q52 50, 62 42" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    
    {/* Stand/Net */}
    <path d="M24 44 L24 70 Q24 74, 26 74" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M24 50 L42 48" stroke="#1e293b" strokeWidth="1.5" />
    
    {/* Bold text */}
    <text x="50" y="65" fill="#0f172a" fontSize="7.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" textAnchor="left">UGANDA</text>
    <text x="50" y="73" fill="#0f172a" fontSize="7.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" textAnchor="left">KORFBALL</text>
    <text x="50" y="81" fill="#0f172a" fontSize="7" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" textAnchor="left">ASSOCIATION</text>
  </svg>
);

function PartnerLogo({ name, category }: { src?: string; name: string; category: string }) {
  // Map specific partner to our stunning unblocked vector SVG emblems
  const nameLower = name.toLowerCase();
  
  let emblem = null;
  if (nameLower.includes('kcca') || nameLower.includes('kampala city')) {
    emblem = <KCCALogo />;
  } else if (nameLower.includes('gender') || nameLower.includes('ministry of gender') || nameLower.includes('labour')) {
    emblem = <MGLSDLogo />;
  } else if (nameLower.includes('ngo bureau')) {
    emblem = <NGOBureauLogo />;
  } else if (nameLower.includes('butebo')) {
    emblem = <ButeboLogo />;
  } else if (nameLower.includes('sports for development') || nameLower.includes('partnership')) {
    emblem = <USDPLogo />;
  } else if (nameLower.includes('korfball')) {
    emblem = <UKALogo />;
  }

  return (
    <div className="w-16 h-16 bg-white border border-slate-150 rounded-xl shadow-3xs flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden p-1.5">
      {emblem ? (
        emblem
      ) : (
        <div className="w-full h-full flex items-center justify-center font-mono font-bold text-xs text-gold-500 bg-slate-50 rounded-lg">
          {name.substring(0, 3).toUpperCase()}
        </div>
      )}
    </div>
  );
}

export default function Partners() {
  const [partners, setPartners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/partners.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch partners');
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setPartners(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching partners, using fallback:', err);
        if (isMounted) {
          setPartners(PARTNERS);
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const getCategoryIcon = (category: string) => {
    if (category.includes('Government') || category.includes('Ministry') || category.includes('District')) {
      return <Landmark className="w-4 h-4 text-amber-600" />;
    } else if (category.includes('Regulatory')) {
      return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
    } else if (category.includes('Athletic') || category.includes('Sports') || category.includes('Development')) {
      return <Award className="w-4 h-4 text-indigo-600" />;
    }
    return <Building2 className="w-4 h-4 text-slate-600" />;
  };

  // If loading, render high-fidelity skeleton shimmers matching the authentic cards
  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-y border-slate-100" id="partners-loading">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            <div className="lg:col-span-4 space-y-4">
              <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse" />
              <div className="h-8 bg-slate-200 rounded w-2/3 animate-pulse" />
              <div className="h-6 bg-slate-200 rounded w-1/2 animate-pulse" />
            </div>
            <div className="lg:col-span-8 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border border-slate-200/60 rounded-2xl p-6 space-y-6 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 bg-slate-100 rounded-xl" />
                  <div className="h-5 bg-slate-100 rounded w-24" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-full" />
                  <div className="h-3 bg-slate-100 rounded w-5/6" />
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <div className="h-3 bg-slate-100 rounded w-24" />
                  <div className="h-3 bg-slate-100 rounded w-12" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-y border-slate-100" id="partners">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Title Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          <div className="lg:col-span-4">
            <span className="text-gold-600 font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
              04 &mdash; Cooperations
            </span>
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Our Trusted Partners
            </h3>
            <div className="mt-4 flex items-center space-x-2 bg-[#08231d]/5 text-[#0f594b] px-3 py-1.5 text-xs font-semibold rounded-lg w-max border border-[#0f594b]/10">
              <Handshake className="w-4 h-4 text-[#0f594b]" />
              <span>Formal Memoranda of Understanding</span>
            </div>
          </div>
          <div className="lg:col-span-8">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {PARTNERS_BRIEF}
            </p>
          </div>
        </div>

        {/* Partners Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={cardVariants}
              className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-[#0f594b]/20 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <PartnerLogo src={partner.logoUrl} name={partner.name} category={partner.category} />
                  
                  <span className="inline-flex items-center space-x-1.5 text-[9.5px] font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-semibold uppercase">
                    {getCategoryIcon(partner.category)}
                    <span>{partner.category}</span>
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base tracking-tight leading-snug group-hover:text-[#0f594b] transition-colors flex items-center gap-1">
                    <span>{partner.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#0f594b] transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h4>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">STATUS: MoU Aligned &amp; Active</span>
                <div className="flex items-center space-x-1">
                  <span className="text-[9.5px] font-mono text-emerald-600 font-bold uppercase">Active</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
