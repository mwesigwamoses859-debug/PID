import { useState, ChangeEvent, FormEvent } from 'react';
import { 
  CAREERS_TEXT, 
  INTERNSHIPS_TEXT, 
  VOLUNTEER_TEXT, 
  FUNDRAISER_TEXT, 
  ORG_INFO 
} from '../data';
import { FundraiserFormInput } from '../types';
import { 
  Briefcase, 
  GraduationCap, 
  HeartHandshake, 
  Flame, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  Phone, 
  Sparkles, 
  Calendar 
} from 'lucide-react';
import { translations, Language } from '../translations';

interface OpportunitiesProps {
  language: Language;
  onOpenDonation?: () => void;
}

export default function Opportunities({ language, onOpenDonation }: OpportunitiesProps) {
  const [activeTab, setActiveTab] = useState<'careers' | 'internships' | 'volunteer' | 'fundraiser'>('internships');
  
  const t = translations[language];
  
  // Fundraiser form states
  const [formData, setFormData] = useState<FundraiserFormInput>({
    fullName: '',
    email: '',
    phone: '',
    groupType: 'individual',
    motivation: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<FundraiserFormInput>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FundraiserFormInput]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<FundraiserFormInput> = {};
    if (!formData.fullName.trim()) errors.fullName = language === 'en' ? 'Full Name is required' : 'Erinnya lyona lyetaagibwa';
    if (!formData.email.trim()) {
      errors.email = language === 'en' ? 'Email address is required' : 'Email Address eyetaagibwa';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = language === 'en' ? 'Invalid email address format' : 'Email endala tennatuuka';
    }
    if (!formData.phone.trim()) errors.phone = language === 'en' ? 'Phone number is required' : 'Enamba y\'essimu eyetaagibwa';
    if (!formData.motivation.trim()) errors.motivation = language === 'en' ? 'Please tell us why you want to join' : 'Gamba kiki ekikuleese';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      groupType: 'individual',
      motivation: ''
    });
    setFormErrors({});
    setIsSubmitted(false);
  };

  return (
    <section className="py-24 bg-white" id="opportunities">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Grid */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-600 font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
            05 &mdash; {language === 'en' ? 'Join Us' : 'Weegatte naffe'}
          </span>
          <h3 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {language === 'en' ? 'Explore Opportunities with PID' : 'Laba Emirimu n\'Ebikubirizibwa mu PID'}
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            {language === 'en' ? 'Whether you want to launch your professional career, secure a mentorship-rich internship, volunteer, or fundraise, there is a path for you to make a lasting difference.' : 'Oba oyagala kutandika mirimu gy\'ekikugu, kufuna kugezesebwa, kwewaayo, oba kusonda nsimbi, weeri ey\'okukola enjawulo ey\'olubeerera.'}
          </p>
        </div>

        {/* Tab Buttons Container */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 bg-slate-50 p-2 rounded-2xl max-w-2xl mx-auto border border-slate-100">
          <button
            onClick={() => setActiveTab('internships')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'internships'
                ? 'bg-white text-[#0f594b] shadow-sm border border-slate-200/50'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{language === 'en' ? 'Internships' : 'Kugezesebwa (Internship)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('volunteer')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'volunteer'
                ? 'bg-white text-[#0f594b] shadow-sm border border-slate-200/50'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>{language === 'en' ? 'Volunteer' : 'Kwewaayo (Volunteer)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('fundraiser')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'fundraiser'
                ? 'bg-white text-[#0f594b] shadow-sm border border-slate-200/50'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>{language === 'en' ? 'Fundraising' : 'Kusonda Nsimbi'}</span>
          </button>

          <button
            onClick={() => setActiveTab('careers')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'careers'
                ? 'bg-white text-[#0f594b] shadow-sm border border-slate-200/50'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>{language === 'en' ? 'Careers' : 'Emirimu'}</span>
          </button>
        </div>

        {/* Dynamic Tab Body */}
        <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 md:p-10 shadow-xs max-w-4xl mx-auto">
          
          {/* INTERNSHIPS TAB */}
          {activeTab === 'internships' && (
            <div className="space-y-6 animate-fadeIn animate-duration-200">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-50 rounded-2xl">
                  <GraduationCap className="w-6 h-6 text-[#0f594b]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl text-slate-900">{language === 'en' ? 'Mentor-guided Placements' : 'Okutendekebwa n\'Abakugu'}</h4>
                  <p className="text-xs text-[#0f594b] font-semibold font-mono">Located at Secretariat HQ • Kampala, Uganda</p>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {INTERNSHIPS_TEXT}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200/50">
                <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-2xs">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-semibold">{language === 'en' ? 'Available Tracks' : 'Emitendera Egiriwo'}</h5>
                  <ul className="text-xs text-slate-600 mt-2.5 space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Finance &amp; Treasury Controls</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Fundraising &amp; Philanthropy</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Communications &amp; Social Media</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Public Policy, Advocacy &amp; Research</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#08231d] text-white p-5 rounded-xl flex flex-col justify-between border border-[#0d4035]">
                  <div>
                    <h5 className="font-display font-bold text-sm text-gold-400">{language === 'en' ? 'Ready to Apply?' : 'Oyagala Okusaba?'}</h5>
                    <p className="text-xs text-slate-300 mt-2">
                      {language === 'en' ? 'Send your motivation letter, CV, and academic records directly to our administrative team.' : 'Weereza ebbaluwa yo ey\'okusaba, CV, n\'ebiwandiiko byo eby\'obuyigirize butereevu eri ekitongole.'}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center space-x-2 text-xs">
                    <Mail className="w-4 h-4 text-gold-500" />
                    <a href={`mailto:${ORG_INFO.email}`} className="font-mono font-bold hover:text-gold-400 transition-colors">
                      {ORG_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VOLUNTEER TAB */}
          {activeTab === 'volunteer' && (
            <div className="space-y-6 animate-fadeIn animate-duration-200">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-50 rounded-2xl">
                  <HeartHandshake className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl text-slate-900">{language === 'en' ? 'Volunteer at All Levels' : 'Kwewaayo ku Mitendera Gyonna'}</h4>
                  <p className="text-xs text-emerald-600 font-semibold font-mono">{language === 'en' ? 'Open Year-Round • Multi-District Operations' : 'Kiggule Bulijjo • Disitulikiti Zonna'}</p>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {VOLUNTEER_TEXT}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200/50">
                <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-2xs">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-[10px] font-mono font-bold text-[#0f594b] bg-emerald-50 px-2 py-0.5 rounded">Track 01</span>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-800">{language === 'en' ? 'Student Volunteer' : 'Muyizi Kwewaayo'}</h5>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'en' 
                      ? 'Designed for students looking to lead community sports clinics, support youth tournaments, assist in school drives, or coordinate local tree-planting events.'
                      : 'Kitegekeddwa abayizi abajja okukulembera eby\'emizannyo, okuyamba ku mirimu gy\'amasomero oba okutandika okusimba emiti mu bitundu.'}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-2xs">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Track 02</span>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-800">{language === 'en' ? 'Professional Volunteer' : 'Mukugu Kwewaayo'}</h5>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'en'
                      ? 'Tailored for trained professionals (coaches, legal experts, policy analysts, agronomists) who want to offer specialized support and build sustainable systems.'
                      : 'Ekyenjawulo eri abakugu abatendeke (abatendesi, bannamateeka, n\'abalala) abaagala okuwa obuyambi obwenjawulo mu bitundu.'}
                  </p>
                </div>
              </div>

              <div className="bg-slate-100 p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between">
                <p className="text-xs text-slate-600">
                  {language === 'en' 
                    ? 'Please contact us at our secretariat lines or info email to express volunteer interests.' 
                    : 'Saba otukwatireko ku ssimu zaffe oba email okutuusa okwagala kwo okw\'okwewaayo.'}
                </p>
                <a href="#contact" className="text-xs font-bold text-[#0f594b] hover:text-brand-950 flex items-center space-x-1">
                  <span>{language === 'en' ? 'Get details' : 'Komawo ufune ebisingawo'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                </a>
              </div>
            </div>
          )}

          {/* FUNDRAISING TAB (Featuring interactive wizard form) */}
          {activeTab === 'fundraiser' && (
            <div className="space-y-6 animate-fadeIn animate-duration-200">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-rose-50 rounded-2xl">
                  <Flame className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl text-slate-900">{language === 'en' ? 'Become a PID Fundraiser' : 'Fuuka Akwasaganya Ensimbi mu PID'}</h4>
                  <p className="text-xs text-rose-600 font-semibold font-mono">{language === 'en' ? 'Join the Heartbeat of Our Missions' : 'Weegatte ku Mutima gw\'Obuyambi bwaffe'}</p>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {FUNDRAISER_TEXT}
              </p>

              {onOpenDonation && (
                <div className="bg-[#08231d] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#0d4035] shadow-sm">
                  <div className="space-y-1 text-center sm:text-left">
                    <h5 className="font-display font-bold text-sm text-gold-400">
                      {language === 'en' ? 'Want to Support Us Immediately?' : 'Oyagala okuwaayo obuyambi butereevu?'}
                    </h5>
                    <p className="text-xs text-slate-300 max-w-md">
                      {language === 'en' 
                        ? 'Skip the campaigns and make a secure, direct tax-deductible contribution to our local secretariat today.' 
                        : 'Wona eby’okusonda, waayo obuyambi bwo butereevu eri ofisi enkulu mu mbeera ey’obukuumi leero.'}
                    </p>
                  </div>
                  <button
                    onClick={onOpenDonation}
                    className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex-shrink-0"
                  >
                    {language === 'en' ? 'Donate Directly Now' : 'Waayo Butereevu'}
                  </button>
                </div>
              )}

              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="bg-white border border-slate-200/50 rounded-2xl p-6 md:p-8 space-y-4">
                  <h5 className="font-display font-bold text-sm text-slate-800 border-b border-slate-100 pb-3 flex items-center justify-between">
                    <span>{language === 'en' ? 'Express Interest in Fundraising' : 'Wandika Okusaba Kwo Okw\'okusonda Nsimbi'}</span>
                    <Sparkles className="w-4 h-4 text-gold-500 animate-pulse" />
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="fullName" className="text-xs font-semibold text-slate-700">{language === 'en' ? 'Full Name *' : 'Erinnya lyo lyona *'}</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${formErrors.fullName ? 'border-red-400' : 'border-slate-200'}`}
                        placeholder="John Doe"
                      />
                      {formErrors.fullName && <p className="text-[10px] text-red-500 font-semibold">{formErrors.fullName}</p>}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email" className="text-xs font-semibold text-slate-700">{language === 'en' ? 'Email Address *' : 'Email Address *'}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${formErrors.email ? 'border-red-400' : 'border-slate-200'}`}
                        placeholder="john@example.org"
                      />
                      {formErrors.email && <p className="text-[10px] text-red-500 font-semibold">{formErrors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-xs font-semibold text-slate-700">{language === 'en' ? 'Phone Number *' : 'Enamba y\'essimu *'}</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${formErrors.phone ? 'border-red-400' : 'border-slate-200'}`}
                        placeholder="0776526344"
                      />
                      {formErrors.phone && <p className="text-[10px] text-red-500 font-semibold">{formErrors.phone}</p>}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="groupType" className="text-xs font-semibold text-slate-700">{language === 'en' ? 'Group Category' : 'Ettuluba ly\'Abasaba'}</label>
                      <select
                        id="groupType"
                        name="groupType"
                        value={formData.groupType}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0f594b]"
                      >
                        <option value="individual">{language === 'en' ? 'Individual' : 'Ssekinnoomu'}</option>
                        <option value="student_group">{language === 'en' ? 'Student Group / Club' : 'Kibiina ky\'Abayizi'}</option>
                        <option value="community">{language === 'en' ? 'Community / Local NGO' : 'Kibiina ky\'Ekitundu'}</option>
                        <option value="corporate">{language === 'en' ? 'Corporate Organization' : 'Ekitongole ky\'Ebyobusuubuzi'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="motivation" className="text-xs font-semibold text-slate-700">{language === 'en' ? 'Motivation & Experience *' : 'Kiki ekikuleese n\'Obumanyirivu *'}</label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      rows={3}
                      value={formData.motivation}
                      onChange={handleInputChange}
                      className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${formErrors.motivation ? 'border-red-400' : 'border-slate-200'}`}
                      placeholder={language === 'en' ? 'Briefly share your experience, ideas, or motivation to fundraise with us.' : 'Wandika kafunze ku bumanyirivu bwo n\'ebisinga ebyekisondda.'}
                    />
                    {formErrors.motivation && <p className="text-[10px] text-red-500 font-semibold">{formErrors.motivation}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 text-xs font-bold text-white bg-[#0f594b] hover:bg-emerald-800 disabled:bg-slate-400 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider"
                  >
                    {isSubmitting ? (
                      <span>{language === 'en' ? 'Processing...' : 'Okulowooza...'}</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-gold-500" />
                        <span>{language === 'en' ? 'Submit Expressions' : 'Weereza Okusaba Kwange'}</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="bg-white border border-slate-200/50 rounded-2xl p-8 text-center space-y-4 animate-scaleUp">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-display font-bold text-base text-slate-800">{language === 'en' ? 'Expression of Interest Submitted!' : 'Okusaba Kuweerezeddwa!'}</h5>
                    <p className="text-xs text-slate-500">
                      {language === 'en' ? 'Thank you for standing with PID Uganda. Your expression of interest has been received. Our fundraising coordinator will be in touch with resources.' : 'Weebale okuyimirira ne PID Uganda. Okusaba kwo kufuniddwa. Coordinator waffe ow\'okusonda nsimbi ajja kukunyunga.'}
                    </p>
                  </div>
                  <div className="pt-4 flex flex-wrap justify-center gap-4 text-xs font-mono text-slate-500 border-t border-slate-50">
                    <div className="flex items-center space-x-1.5">
                      <Mail className="w-4 h-4 text-[#0f594b]" />
                      <span>{ORG_INFO.email}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Phone className="w-4 h-4 text-[#0f594b]" />
                      <span>{ORG_INFO.phone}</span>
                    </div>
                  </div>
                  <button
                    onClick={resetForm}
                    className="mt-2 text-xs font-semibold text-[#0f594b] hover:text-emerald-800 underline cursor-pointer"
                  >
                    {language === 'en' ? 'Submit another expression' : 'Yongeza okusaba okulala'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* CAREERS TAB */}
          {activeTab === 'careers' && (
            <div className="space-y-6 animate-fadeIn animate-duration-200">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-indigo-50 rounded-2xl">
                  <Briefcase className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl text-slate-900">{language === 'en' ? 'Career Opportunities' : 'Emirimu Egiriwo'}</h4>
                  <p className="text-xs text-indigo-600 font-semibold font-mono">Secretariat &amp; District Roles</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/50 rounded-2xl p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-display font-bold text-sm text-slate-800">{language === 'en' ? 'No Open Vacancies' : 'Tewali mirimu miranga'}</h5>
                  <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
                    {CAREERS_TEXT}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-50 text-xs text-slate-400">
                  {language === 'en' ? 'To check for future roles, save this page or send queries to' : 'Okumanya ebisingawo mu biseera ebijja, weereza ebibuuzo ku'} <a href={`mailto:${ORG_INFO.email}`} className="text-[#0f594b] font-medium hover:underline">{ORG_INFO.email}</a>.
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
