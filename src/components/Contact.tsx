/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { MixedColorText } from './MixedColorText';
import { useAdmin } from '../context/AdminContext';
import { MapPin, Phone, Mail, Award, CheckCircle2, Send, Clock } from 'lucide-react';

export default function Contact() {
  const { content } = useAdmin();
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    // Save inquiry to localStorage for sandbox completeness
    const savedInquiries = localStorage.getItem('pid_inquiries') || '[]';
    try {
      const parsed = JSON.parse(savedInquiries);
      const updated = [
        { id: 'inq-' + Date.now(), ...form, date: new Date().toLocaleString() },
        ...parsed,
      ];
      localStorage.setItem('pid_inquiries', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setSuccess(true);
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`PID Inquiry: ${form.subject || 'General Contact'}`);
    const body = encodeURIComponent(
      `Hello PID Uganda Team,\n\nMy name is ${form.name}.\n\nMessage:\n${form.message}\n\nEmail: ${form.email}\n\nBest regards,\n${form.name}`
    );
    return `mailto:info@piduganda.org?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="bg-white font-sans scroll-mt-12 border-b border-slate-200">
      {/* Top Banner with Background Photo & Full Color Words */}
      <div className="relative bg-[#003366] text-white py-20 px-4 overflow-hidden border-b border-sky-900 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src={content.contactHeaderBgImage || "https://images.unsplash.com/photo-1543326301-33f5d50fd90f?auto=format&fit=crop&q=80&w=1600"}
            alt="Contact Secretariat - PID Uganda"
            className="w-full h-full object-cover opacity-60 brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/90 via-[#003366]/75 to-[#007BC4]/80" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#7DC242]">
            {content.contactTagline || "Get in Touch"}
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            <MixedColorText text={content.contactTitle || "Connect with Our {Secretariat}"} isDarkBg={true} />
          </h1>
          <p className="text-slate-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions? Message us or visit our headquarters. We look forward to connecting with you.
          </p>
          <div className="w-20 h-1.5 bg-[#7DC242] mx-auto rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Contact Layout Splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Office Details & Custom Map Graphic (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-serif text-[#003366] italic">
                Secretariat Coordinates
              </h3>

              <div className="space-y-5">
                {/* Physical Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                    <MapPin className="w-5 h-5 text-[#007BC4]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#003366]">Office Location</h4>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                      {content.contactAddress || "Plot 1420 Ntensibe Road, Kitintale, Kampala, Uganda"}
                    </p>
                  </div>
                </div>

                {/* Mailing Box */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                    <Mail className="w-5 h-5 text-[#007BC4]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#003366]">Digital & Postal Mailbox</h4>
                    <p className="text-xs text-slate-700 mt-1 font-medium">
                      P.O. Box 132061 Kampala, Uganda
                    </p>
                    <a href={`mailto:${content.contactEmail || "info@piduganda.org"}`} className="text-xs text-[#007BC4] hover:underline mt-1 inline-block font-bold">
                      {content.contactEmail || "info@piduganda.org"}
                    </a>
                  </div>
                </div>

                {/* Phone Hotline */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                    <Phone className="w-5 h-5 text-[#007BC4]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#003366]">Inquiry Hotline</h4>
                    <a href={`tel:${content.contactPhone || "+256 776 526 344"}`} className="text-xs text-slate-700 hover:text-[#007BC4] mt-1 inline-block font-bold">
                      {content.contactPhone || "+256 776 526 344"}
                    </a>
                  </div>
                </div>

                {/* Licensing License */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                    <Award className="w-5 h-5 text-[#007BC4]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#003366]">Regulatory Accreditation</h4>
                    <p className="text-[10px] text-[#003366] mt-1 uppercase tracking-widest font-bold">
                      NGO Registration No: INDR177427311NB
                    </p>
                    <p className="text-[10px] text-slate-600 mt-0.5 leading-relaxed font-medium">
                      Fully registered under the NGO Act, CAP 109 of the Republic of Uganda.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom SVG Location Map Indicator */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-[10px] font-bold text-[#003366] uppercase tracking-widest flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#007BC4]" />
                  <span>Office Map Coordinates</span>
                </span>
                <span className="text-[9px] bg-[#003366] text-white px-2 py-0.5 rounded font-bold">
                  KLA • EAT
                </span>
              </div>

              {/* Styled Vector Map */}
              <div className="h-32 bg-slate-100 rounded-xl border border-slate-200 relative flex items-center justify-center overflow-hidden">
                {/* Simulated Roads Grid */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/3 left-0 w-full h-1 bg-slate-400 transform rotate-3" />
                  <div className="absolute bottom-1/4 left-0 w-full h-1.5 bg-slate-400 transform -rotate-12" />
                  <div className="absolute left-1/3 top-0 w-2 h-full bg-slate-400 transform rotate-45" />
                  <div className="absolute right-1/4 top-0 w-1.5 h-full bg-slate-400 transform -rotate-12" />
                </div>

                {/* Lake Victoria/Port Bell shoreline curve simulation */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-sky-200/50 rounded-full blur-xl border border-sky-300" />

                {/* Neighborhood Markers */}
                <div className="absolute top-3 left-4 text-[9px] text-slate-500 uppercase font-bold tracking-widest font-mono">
                  To Mutungo
                </div>
                <div className="absolute bottom-3 left-6 text-[9px] text-slate-500 uppercase font-bold tracking-widest font-mono">
                  To Port Bell Rd
                </div>
                <div className="absolute top-12 right-6 text-[9px] text-slate-500 uppercase font-bold tracking-widest font-mono">
                  Kitintale Market
                </div>

                {/* Main Road Route Labels */}
                <div className="absolute top-[40%] left-10 text-[8px] text-slate-700 font-bold bg-white/80 border border-slate-200 px-1.5 py-0.5 rounded-sm uppercase tracking-widest">
                  Ntensibe Rd
                </div>

                {/* Target Pin Marker */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <MapPin className="w-8 h-8 text-[#007BC4] fill-sky-200" />
                  <div className="absolute -bottom-1 w-2 h-2 rounded-full bg-[#007BC4] animate-ping" />
                </motion.div>

                {/* Pin Tooltip */}
                <div className="absolute bottom-2.5 right-2 bg-[#003366] text-white text-[10px] p-1.5 rounded-lg shadow-md">
                  <p className="font-bold">PID SECRETARIAT</p>
                  <p className="text-[8px] text-slate-200">Plot 1420 Ntensibe Rd</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (col-span-7) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-6 sm:p-10 rounded-3xl shadow-sm flex flex-col justify-between">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#003366] uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Agnes Namatovu"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full text-xs bg-white border border-slate-300 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#007BC4] focus:ring-1 focus:ring-[#007BC4] text-slate-900 font-medium placeholder-slate-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#003366] uppercase tracking-wider">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="agnes@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full text-xs bg-white border border-slate-300 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#007BC4] focus:ring-1 focus:ring-[#007BC4] text-slate-900 font-medium placeholder-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#003366] uppercase tracking-wider">Subject / Inquiry Context</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Sports Sponsorship, School Outreach, Reforestation Volunteering"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full text-xs bg-white border border-slate-300 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#007BC4] focus:ring-1 focus:ring-[#007BC4] text-slate-900 font-medium placeholder-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#003366] uppercase tracking-wider">Message</label>
                  <textarea
                    required
                    rows={4.5}
                    placeholder="Provide detailed context on how we can collaborate, participate, or support your initiative..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full text-xs bg-white border border-slate-300 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#007BC4] focus:ring-1 focus:ring-[#007BC4] text-slate-900 font-medium resize-none placeholder-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center py-4 bg-[#007BC4] hover:bg-[#003366] text-white font-bold uppercase tracking-widest rounded-xl text-xs transition-all shadow-md cursor-pointer gap-2"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Send Inquiry Draft</span>
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <CheckCircle2 className="w-16 h-16 text-[#7DC242] mx-auto" />
                <div className="space-y-3">
                  <h4 className="text-2xl font-bold font-serif italic text-[#003366]">Inquiry Draft Processed!</h4>
                  <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed font-medium">
                    Thank you for contacting us. We have cached your message details locally. To complete the official submission and alert our Kampala secretariat immediately, please trigger the official pre-filled email client:
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <a
                    href={getMailtoLink()}
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#7DC242] hover:bg-[#007BC4] text-white font-bold rounded-xl text-xs uppercase tracking-wider gap-2 shadow-sm transition-colors"
                  >
                    <Mail className="w-4.5 h-4.5" />
                    <span>Open Email Draft</span>
                  </a>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setForm({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-slate-100 text-[#003366] font-bold rounded-xl text-xs uppercase tracking-wider border border-slate-300 transition-colors"
                  >
                    <span>Write Another Message</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
