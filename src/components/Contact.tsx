import { useState, ChangeEvent, FormEvent } from 'react';
import { ORG_INFO } from '../data';
import { ContactFormInput } from '../types';
import { 
  MapPin, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Send, 
  CheckCircle, 
  Building, 
  BookmarkCheck 
} from 'lucide-react';
import { translations, Language } from '../translations';

interface ContactProps {
  language: Language;
}

export default function Contact({ language }: ContactProps) {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id as keyof ContactFormInput]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormInput> = {};
    if (!formData.name.trim()) newErrors.name = language === 'en' ? 'Please provide your name' : 'Saba utuweereze erinya lyo';
    if (!formData.email.trim()) {
      newErrors.email = language === 'en' ? 'Email address is required' : 'Email address eyetaagibwa';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'en' ? 'Please provide a valid email format' : 'Saba utuweereze email entuufu';
    }
    if (!formData.subject.trim()) newErrors.subject = language === 'en' ? 'Please specify a subject' : 'Wandika omutwe gw\'ebbaluwa';
    if (!formData.message.trim()) newErrors.message = language === 'en' ? 'Please write a message' : 'Wandika obubaka bwo';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API pipeline delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setIsSent(false);
  };

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100" id="contact">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-600 font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
            06 &mdash; {language === 'en' ? 'Direct Connections' : 'Tukwatagane Butereevu'}
          </span>
          <h3 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {language === 'en' ? 'Get in Touch With PID' : 'Tuula Twogere na PID'}
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            {language === 'en' ? 'Have questions about our sports clinics, school support channels, or district hubs? Reach out to our secretariat directly.' : 'Olina ebibuuzo ku mizannyo gyaffe, obuyambi bw\'amasomero oba hubs za disitulikiti? Tukwatireko butereevu.'}
          </p>
        </div>

        {/* Contact Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Contact details card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-[#08231d] text-white rounded-2xl p-6 md:p-8 shadow-lg flex-1 flex flex-col justify-between border border-[#0d4035]">
              <div className="space-y-6">
                <div>
                  <span className="text-[10.5px] font-mono tracking-widest text-gold-400 uppercase font-semibold">Secretariat HQ</span>
                  <h4 className="font-display font-bold text-xl mt-1 text-white">Plan Integral Development</h4>
                  <p className="text-xs text-slate-300 mt-1">{language === 'en' ? 'Harnessing the power of sport across Uganda.' : 'Okukozesa amaanyi g\'emizannyo mu Uganda yonna.'}</p>
                </div>

                {/* Info Blocks */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 text-xs">
                    <MapPin className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-slate-200">{language === 'en' ? 'Office Location' : 'Ofisi yaffe'}</h5>
                      <p className="text-slate-300 mt-0.5">{ORG_INFO.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-xs">
                    <Building className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-slate-200">{language === 'en' ? 'Postal Address' : 'Postal Address'}</h5>
                      <p className="text-slate-300 mt-0.5">{ORG_INFO.poBox}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-xs">
                    <Mail className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-slate-200">{language === 'en' ? 'E-mail Correspondence' : 'E-mail Ensi ya wonna'}</h5>
                      <a href={`mailto:${ORG_INFO.email}`} className="text-gold-400 hover:underline mt-0.5 block font-mono font-bold">
                        {ORG_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-xs">
                    <Phone className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-slate-200">{language === 'en' ? 'Telephone Lines' : 'Essimu Z\'okusimu'}</h5>
                      <a href={`tel:${ORG_INFO.phone}`} className="text-gold-400 hover:underline mt-0.5 block font-mono font-bold">
                        {ORG_INFO.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* NGO credentials footer info */}
              <div className="border-t border-[#0e483b] pt-6 mt-8 space-y-2">
                <div className="flex items-center space-x-2 text-[10.5px] text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-gold-500" />
                  <span>NGO Reg No: {ORG_INFO.registrationNo}</span>
                </div>
                <p className="text-[9.5px] text-slate-400 leading-snug">
                  {language === 'en' 
                    ? `Registered under the NGO Act, ${ORG_INFO.actNo} with a national mandate in Uganda.`
                    : `Etandikiddwa wansi w'etteeka lya NGO Act, ${ORG_INFO.actNo} okukola mu Uganda yonna.`}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive contact form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-xs">
            {!isSent ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h4 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                  <BookmarkCheck className="w-5 h-5 text-[#0f594b]" />
                  <span>{language === 'en' ? 'Send an Official Inquiry' : 'Weereza Okusaba Kw\'Ofisi'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-semibold text-slate-700">{language === 'en' ? 'Your Full Name *' : 'Erinnya lyo lyona *'}</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${errors.name ? 'border-red-400' : 'border-slate-200'}`}
                      placeholder="Jane Doe"
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-700">{language === 'en' ? 'Email Address *' : 'Email Address *'}</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${errors.email ? 'border-red-400' : 'border-slate-200'}`}
                      placeholder="jane@example.com"
                    />
                    {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="subject" className="text-xs font-semibold text-slate-700">{language === 'en' ? 'Subject Area *' : 'Omutwe gw\'ebbaluwa *'}</label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${errors.subject ? 'border-red-400' : 'border-slate-200'}`}
                    placeholder={language === 'en' ? 'E.g., Sports equipment donation / School partnership inquiry' : 'Okugeza: Okuyamba n\'ebikozesebwa mu mizannyo'}
                  />
                  {errors.subject && <p className="text-[10px] text-red-500 font-semibold">{errors.subject}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="text-xs font-semibold text-slate-700">{language === 'en' ? 'Message Text *' : 'Ebigambo by\'Obubaka *'}</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${errors.message ? 'border-red-400' : 'border-slate-200'}`}
                    placeholder={language === 'en' ? 'Write detailed questions or partnership proposals here...' : 'Wandika ebibuuzo byo oba eby\'okukolagana wano...'}
                  />
                  {errors.message && <p className="text-[10px] text-red-500 font-semibold">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 text-xs font-bold text-white bg-[#0f594b] hover:bg-[#08231d] disabled:bg-stone-300 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer uppercase tracking-wider"
                  >
                    {isSubmitting ? (
                      <span>{language === 'en' ? 'Sending inquiry...' : 'Okusaba Kuweerezebwa...'}</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-gold-500" />
                        <span>{language === 'en' ? 'Send Official Message' : 'Weereza Obubaka bw\'Ofisi'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8 animate-scaleUp">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-lg text-slate-800">{language === 'en' ? 'Inquiry Sent Successfully!' : 'Obubaka Kuweerezeddwa Bulungi!'}</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    {language === 'en' 
                      ? 'Thank you. Your message has been logged in our secretariat intake database. Our communications officer will respond via email as soon as possible.'
                      : 'Webale nnyo. Obubaka bwo butuusiddwa mu database yaffe ey\'okunyunga. Twajja kukuddamu butereevu.'}
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0f594b] hover:bg-[#08231d] rounded-lg transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Send another inquiry' : 'Weereza obubaka obulala'}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Interactive Google Map Section */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full uppercase font-semibold border border-emerald-100/50">
                  {language === 'en' ? 'Interactive Map' : 'Mappu Ey\'omutimbagano'}
                </span>
                <h4 className="font-display font-bold text-lg text-slate-900">
                  {language === 'en' ? 'Visit Our Secretariat' : 'Kyalira Ofisi Yaffe Enkulu'}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'en' 
                    ? 'Plot 1420 Ntensibe Road, Kitintale, Kampala, Uganda' 
                    : 'Plot 1420 Ntensibe Road, Kitintale, Kampala, Uganda'}
                </p>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Plot+1420+Ntensibe+Road,+Kitintale,+Kampala,+Uganda"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0f594b] hover:text-[#08231d] bg-emerald-50 hover:bg-emerald-100/70 px-4 py-2.5 rounded-xl cursor-pointer transition-all self-start sm:self-center"
              >
                <span>{language === 'en' ? 'Open in Google Maps' : 'Ggula mu Google Maps'}</span>
                <span>&nearr;</span>
              </a>
            </div>

            {/* Google Map IFrame Container */}
            <div className="relative w-full h-[350px] sm:h-[420px] rounded-xl overflow-hidden border border-slate-200/60 shadow-inner bg-slate-100">
              <iframe
                title="PID Secretariat Office Map"
                src="https://maps.google.com/maps?q=Plot%201420%20Ntensibe%20Road,%20Kitintale,%20Kampala,%20Uganda&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale-[15%] contrast-[105%] hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            <div className="flex items-center space-x-2.5 text-[11px] text-slate-400 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
              <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                {language === 'en' 
                  ? 'Easily accessible via Port Bell Road or Old Port Bell Road. Visitors are welcome during official business hours (Mon-Fri, 9:00 AM - 5:00 PM).' 
                  : 'Oyinza okutuukayo okuyitira ku Port Bell Road oba Old Port Bell Road. Ofisi eggulwa lwa Mmande ku ssaawa ssatu ez\'oku makya okutuuka Lwakutaano ssaawa emu ey\'olweggulo.'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
