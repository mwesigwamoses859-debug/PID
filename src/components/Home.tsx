import { motion } from 'motion/react';
import Hero from './Hero';
import Partners from './Partners';
import { Language, translations } from '../translations';
import { ArrowRight, ShieldCheck, Heart, Award, Users, Landmark, Dribbble, HeartHandshake, Sparkles } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: 'home' | 'about' | 'programmes' | 'governance' | 'get-involved' | 'contact') => void;
  language: Language;
  onOpenDonation?: () => void;
}

export default function Home({ onNavigate, language, onOpenDonation }: HomeProps) {
  const t = translations[language];

  // Showcase items representing the user's uploaded images
  const showcaseItems = [
    {
      id: 'showcase-sport',
      title: language === 'en' ? 'Sport & Teamwork' : 'Ebyemizannyo n\'Okukolera Wamu',
      tagline: language === 'en' ? 'Confidence, teamwork, and leadership through safe play' : 'Obwesigwa n\'obukulembeze mu kusaala obulungi',
      description: language === 'en' 
        ? 'Using soccer clinics, co-ed Korfball, and safe play spaces as neutral entry points to foster child safeguarding, youth mentoring, and school retention in Kampala settlements.'
        : 'Okweyambisa ebyemizannyo n\'okusaala okugatta abaana n\'okutumbula eby\'enjigiriza n\'obukuumi mu Kitintale slums.',
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80', // Beautiful high-fidelity image matching the boys playing soccer on the dirt field
      icon: <Dribbble className="w-5 h-5 text-gold-500" />,
      tag: language === 'en' ? 'Safe Play' : 'Ebyemizannyo'
    },
    {
      id: 'showcase-community',
      title: language === 'en' ? 'Local Listening & Trust' : 'Okuwuliriza n\'Obwesigwa obw\'Obuntu',
      tagline: language === 'en' ? 'Listening first, building on local community strengths' : 'Okuwuliriza ebitundu, n\'okuzimba ku maanyi gaffe',
      description: language === 'en'
        ? 'We listen first. Every PID initiative begins with the lived experiences, priorities, and existing assets of the community to ensure sustainable, long-term development.'
        : 'Tusookera ku kuwuliriza bitundu. Buli mulimu ogw\'ekitongole kya PID gutandikira ku bintu n\'ebirowoozo ebisangiddwa mu bitundu.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80', // Heartwarming image matching the boys standing shoulder-to-shoulder with arms around each other
      icon: <Heart className="w-5 h-5 text-gold-500" />,
      tag: language === 'en' ? 'Community Trust' : 'Obwesigwa'
    },
    {
      id: 'showcase-partnership',
      title: language === 'en' ? 'Partnership & Shared Futures' : 'Eby\'Awamu n\'Emikwano Enkulu',
      tagline: language === 'en' ? 'Cooperation with local councils and national bodies' : 'Okukolagana n\'ebitongole by\'amateeka n\'amalala',
      description: language === 'en'
        ? 'Cooperating closely with Kampala City Council Authority (KCCA), district local governments, and national ministries to deliver compliant, transparent, and verified community progress.'
        : 'Okukolagana n\'ebitongole by\'amateeka ebya KCCA n\'ebitundu okuleeta nteekateeka ez\'amaanyi mu Uganda.',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80', // Vibrant community team holding hands/togetherness matching the youth standing proudly on the field
      icon: <HeartHandshake className="w-5 h-5 text-gold-500" />,
      tag: language === 'en' ? 'Shared Progress' : 'Emirimu Gy\'awamu'
    }
  ];

  return (
    <div className="space-y-0" id="home-page-container">
      {/* Immersive Dark Hero Panel */}
      <Hero onNavigate={onNavigate} language={language} onOpenDonation={onOpenDonation} />

      {/* Simplified Introduction Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100" id="who-we-are-intro">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-gold-600 font-mono text-xs uppercase tracking-widest font-semibold mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
            <span>01 &mdash; {language === 'en' ? 'OUR PURPOSE' : 'EKIGENDERERWA KYAFFE'}</span>
          </div>
 
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
            <div className="lg:col-span-6">
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-brand-950 tracking-tight leading-[1.1]">
                {language === 'en' ? (
                  <>
                    Progress lasts when every part of life moves forward <span className="italic font-normal text-brand-500">together.</span>
                  </>
                ) : (
                  <>
                    Okukulaakulana kubeera kwa maanyi nga buli kintu kyeyongera <span className="italic font-normal text-brand-500">wamu.</span>
                  </>
                )}
              </h2>
            </div>
            <div className="lg:col-span-6 space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                {language === 'en' 
                  ? 'Plan Integral Development is a Uganda-based organisation advancing practical, locally led development. We listen, build on local strengths, and bring related community priorities together.'
                  : 'Plan Integral Development kitongole ekisangibwa mu Uganda ekitumbula nteekateeka ez\'obugonvu n\'okukulaakulana okuva mu bitundu. Tuwuliriza ebyetaago by\'abantu eby\'enkomeredde.'}
              </p>
              <p>
                {language === 'en'
                  ? 'Our purpose is to help people access knowledge, improve wellbeing, expand opportunities, and build resilience so they can shape their own future.'
                  : 'Ekigendererwa kyaffe kuli kuyamba bantu kufuna ngero, obulamu obulungi, emirimu, n\'okukuuma ebitundu byabwe babeere n\'ebiseera eby\'omu maaso ebirungi.'}
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-500">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0f594b]" />
                  <span>{language === 'en' ? 'Registered Ugandan NGO' : 'Kibiina Kyetongodde mu Uganda'}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Landmark className="w-4 h-4 text-[#0f594b]" />
                  <span>{language === 'en' ? 'MoU Aligned with Authorities' : 'Ekyetongodde ekivunaanyizibwa'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photographic Theme Showcase Grid */}
      <section className="py-20 bg-white border-b border-slate-100" id="visual-showcase-grid">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-gold-600 uppercase">
              {language === 'en' ? 'OUR FIELD FOCUS' : 'Ggwe n\'Ebitundu Byaffe'}
            </span>
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              {language === 'en' ? 'Bringing our core values to life' : 'Okukuza embeera zaffe mu nkola'}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {language === 'en'
                ? 'We believe that sustainable community change is achieved through practical action, genuine friendships, and structured local partnerships.'
                : 'Tukkiriza nti nkyukakyuka mu bitundu ereetebwa mirimu gya ddala, omukwano ogw\'ekitiibwa, n\'okukolagana okw\'obwesigwa.'}
            </p>
          </div>

          {/* Three Column Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {showcaseItems.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50 border border-slate-200/50 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-[#0f594b]/20 transition-all flex flex-col h-full group"
              >
                {/* Image Container */}
                <div className="relative aspect-3/4 overflow-hidden bg-slate-100 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  
                  {/* Floating Tag */}
                  <span className="absolute top-4 left-4 inline-flex items-center bg-[#08231d]/85 text-white font-mono text-[9px] font-semibold px-2.5 py-1 rounded uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>

                {/* Content Panel */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-lg bg-brand-50 border border-brand-100">
                        {item.icon}
                      </div>
                      <h4 className="font-display font-bold text-slate-900 text-base sm:text-lg tracking-tight group-hover:text-[#0f594b] transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gold-600 font-semibold uppercase tracking-wider font-mono">
                      {item.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/50 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="uppercase tracking-widest text-[9px] font-semibold">{language === 'en' ? 'PID Groundwork' : 'Emirimu gya PID'}</span>
                    <span className="text-[#0f594b] font-medium inline-flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>{language === 'en' ? 'Kampala, Uganda' : 'Kampala, Uganda'}</span>
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#08231d] hover:bg-[#0c382f] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>{language === 'en' ? 'Learn more about us' : 'Manya ebisingawo ku ffe'}</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </button>
          </div>

        </div>
      </section>

      {/* Trust & Partnerships Logo Grid */}
      <Partners />

      {/* Call to Action Banner matching the brochure feel */}
      <section className="py-20 bg-[#08231d] text-white relative overflow-hidden" id="call-to-action">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80" 
            alt="Community connection background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center lg:text-left">
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest border border-emerald-950/20 px-3 py-1 rounded-full bg-white/5 backdrop-blur-xs text-gold-400">
              {language === 'en' ? 'Community' : 'Ebitundu'}
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest border border-emerald-950/20 px-3 py-1 rounded-full bg-white/5 backdrop-blur-xs text-gold-400">
              {language === 'en' ? 'Partnership' : 'Emikwano'}
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest border border-[#0f594b]/20 px-3 py-1 rounded-full bg-white/5 backdrop-blur-xs text-gold-400">
              {language === 'en' ? 'Possibility' : 'Ebisubirwa'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest font-bold text-emerald-400 block">&bull; {language === 'en' ? 'Change takes all of us' : 'Nkyukakyuka yetaga ffenna'}</span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight leading-[1.1] text-white">
                {language === 'en' ? (
                  <>
                    Let's build something<br />
                    <span className="italic font-normal text-gold-400">meaningful together.</span>
                  </>
                ) : (
                  <>
                    Tuzimbe ekintu eky\'amaanyi<br />
                    <span className="italic font-normal text-gold-400">wamu n\'obumu.</span>
                  </>
                )}
              </h2>
              <p className="text-emerald-100/70 text-sm sm:text-base leading-relaxed max-w-2xl mt-4">
                {language === 'en' 
                  ? 'Whether you are part of a community group, donor organisation, institution or business—or you want to volunteer—we would like to hear from you.'
                  : 'Oba oli kitongole, omuntu yenna, omusasi oba omwagazi wa bwannakyewa—tuyagaliza nnyo okukuwuliza.'}
              </p>
            </div>
            
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <button
                onClick={() => onNavigate('get-involved')}
                className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center space-x-2"
              >
                <span>{language === 'en' ? 'Ways to get involved' : 'Yingira mu Nteekateeka'}</span>
                <span>&nearr;</span>
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
