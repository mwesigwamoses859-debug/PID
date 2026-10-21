import { RichText } from './RichText';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MixedColorText } from './MixedColorText';
import { useAdmin } from '../context/AdminContext';
import {
  GraduationCap,
  HeartHandshake,
  Briefcase,
  CheckCircle2,
  Mail,
  ArrowRight,
  DollarSign,
  Info,
  Trash2,
  Bell
} from 'lucide-react';

export default function Opportunities() {
  const { content } = useAdmin();
  const [activeTab, setActiveTab] = useState<'internship' | 'volunteer' | 'fundraiser' | 'careers'>('internship');
  
  // Storage states
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [careerEmail, setCareerEmail] = useState('');
  const [careerSubscribed, setCareerSubscribed] = useState(false);

  // Form states - Internship
  const [internForm, setInternForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    academic: '',
    department: 'marketing-comms',
    statement: '',
  });
  const [internSuccess, setInternSuccess] = useState(false);

  // Form states - Volunteer
  const [volunteerForm, setVolunteerForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    type: 'student',
    interests: [] as string[],
    message: '',
  });
  const [volunteerSuccess, setVolunteerSuccess] = useState(false);

  // Form states - Fundraiser
  const [fundraiserForm, setFundraiserForm] = useState({
    name: '',
    email: '',
    groupType: 'individual',
    targetAmount: 500,
    pitch: '',
  });
  const [fundraiserSuccess, setFundraiserSuccess] = useState(false);

  // Load submissions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pid_submissions');
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save submissions to localStorage
  const saveSubmission = (newSub: any) => {
    const updated = [newSub, ...submissions];
    setSubmissions(updated);
    localStorage.setItem('pid_submissions', JSON.stringify(updated));
  };

  const deleteSubmission = (id: string) => {
    const updated = submissions.filter(sub => sub.id !== id);
    setSubmissions(updated);
    localStorage.setItem('pid_submissions', JSON.stringify(updated));
  };

  // Submit Handlers
  const handleInternSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!internForm.fullName || !internForm.email || !internForm.statement) return;

    const sub = {
      id: 'intern-' + Date.now(),
      type: 'Internship Application',
      name: internForm.fullName,
      email: internForm.email,
      phone: internForm.phone,
      details: `Academic: ${internForm.academic} | Department: ${internForm.department}`,
      message: internForm.statement,
      date: new Date().toLocaleDateString(),
    };

    saveSubmission(sub);
    setInternSuccess(true);
  };

  const handleVolunteerSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.fullName || !volunteerForm.email || !volunteerForm.message) return;

    const sub = {
      id: 'vol-' + Date.now(),
      type: 'Volunteer Application',
      name: volunteerForm.fullName,
      email: volunteerForm.email,
      phone: volunteerForm.phone,
      details: `Type: ${volunteerForm.type} | Interests: ${volunteerForm.interests.join(', ')}`,
      message: volunteerForm.message,
      date: new Date().toLocaleDateString(),
    };

    saveSubmission(sub);
    setVolunteerSuccess(true);
  };

  const handleFundraiserSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fundraiserForm.name || !fundraiserForm.email || !fundraiserForm.pitch) return;

    const sub = {
      id: 'fund-' + Date.now(),
      type: 'Fundraiser Registration',
      name: fundraiserForm.name,
      email: fundraiserForm.email,
      details: `Group: ${fundraiserForm.groupType} | Goal: $${fundraiserForm.targetAmount}`,
      message: fundraiserForm.pitch,
      date: new Date().toLocaleDateString(),
    };

    saveSubmission(sub);
    setFundraiserSuccess(true);
  };

  const handleCareerAlert = (e: FormEvent) => {
    e.preventDefault();
    if (!careerEmail) return;
    setCareerSubscribed(true);
    setTimeout(() => {
      setCareerEmail('');
    }, 2000);
  };

  const toggleInterest = (interest: string) => {
    const current = [...volunteerForm.interests];
    if (current.includes(interest)) {
      setVolunteerForm({ ...volunteerForm, interests: current.filter(i => i !== interest) });
    } else {
      setVolunteerForm({ ...volunteerForm, interests: [...current, interest] });
    }
  };

  // Helper to generate pre-filled mailto URLs
  const getInternMailto = () => {
    const subject = encodeURIComponent(`PID Internship Application - ${internForm.fullName}`);
    const body = encodeURIComponent(
      `Dear PID Recruitment Team,\n\nI am writing to express my interest in an Internship position.\n\n` +
      `Full Name: ${internForm.fullName}\n` +
      `Email: ${internForm.email}\n` +
      `Phone: ${internForm.phone}\n` +
      `Academic Background: ${internForm.academic}\n` +
      `Preferred Department: ${internForm.department}\n\n` +
      `Personal Statement:\n${internForm.statement}\n\n` +
      `Thank you for your time and consideration.\n\nSincerely,\n${internForm.fullName}`
    );
    return `mailto:info@piduganda.org?subject=${subject}&body=${body}`;
  };

  const getVolunteerMailto = () => {
    const subject = encodeURIComponent(`PID Volunteer Application - ${volunteerForm.fullName}`);
    const body = encodeURIComponent(
      `Dear PID Coordinator,\n\nI am writing to express my interest in volunteering with PID Uganda.\n\n` +
      `Full Name: ${volunteerForm.fullName}\n` +
      `Email: ${volunteerForm.email}\n` +
      `Phone: ${volunteerForm.phone}\n` +
      `Volunteer Cohort: ${volunteerForm.type}\n` +
      `Areas of Interest: ${volunteerForm.interests.join(', ')}\n\n` +
      `Involvement Statement / Qualifications:\n${volunteerForm.message}\n\n` +
      `Thank you for this opportunity to serve.\n\nSincerely,\n${volunteerForm.fullName}`
    );
    return `mailto:info@piduganda.org?subject=${subject}&body=${body}`;
  };

  const getFundraiserMailto = () => {
    const subject = encodeURIComponent(`PID Fundraiser Registration - ${fundraiserForm.name}`);
    const body = encodeURIComponent(
      `Dear PID Development Team,\n\nI would like to register as a fundraising advocate for Plan Integral Development Uganda.\n\n` +
      `Name / Group: ${fundraiserForm.name}\n` +
      `Email: ${fundraiserForm.email}\n` +
      `Category: ${fundraiserForm.groupType}\n` +
      `Sponsorship Target: $${fundraiserForm.targetAmount}\n\n` +
      `My Fundraising Pitch / Strategy:\n${fundraiserForm.pitch}\n\n` +
      `I am excited to join the movement!\n\nBest regards,\n${fundraiserForm.name}`
    );
    return `mailto:info@piduganda.org?subject=${subject}&body=${body}`;
  };

  return (
    <section id="opportunities" className="bg-white font-sans scroll-mt-12 border-b border-natural-border">
      {/* Top Banner with Background Photo & Black and White Words */}
      <div className="relative bg-[#003366] text-white py-20 px-4 overflow-hidden border-b border-sky-900 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src={content.opportunitiesHeaderBgImage || "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&q=80&w=1600"}
            alt="Get Involved - PID Uganda"
            className="w-full h-full object-cover opacity-60 brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/90 via-[#003366]/75 to-[#007BC4]/80" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#7DC242]">
            {content.opportunitiesTagline || "Join Our Movement"}
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            <MixedColorText text={content.opportunitiesTitle || "{Apply}, {Partner}, or {Raise Support}"} isDarkBg={true} />
          </h1>
          <RichText className="text-slate-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" text={content.opportunitiesSubtitle || "Discover structured pathways to volunteer, apply for mentored internships, support sports sponsorships, or join our professional staff."} />
          <div className="w-20 h-1.5 bg-[#7DC242] mx-auto rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="mb-14 rounded-3xl overflow-hidden bg-[#001d38] text-white border border-[#007BC4]/30 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-7 sm:p-10">
              <span className="text-xs font-black uppercase tracking-[0.22em] text-[#7DC242]">Community giving</span>
              <h3 className="text-3xl font-black mt-3">{content.donationSettings.campaignTitle}</h3>
              <p className="text-sm text-slate-300 mt-3 max-w-xl">Choose a suggested contribution or contact the Secretariat for a verified Mobile Money or bank transfer receipt.</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {content.donationSettings.suggestedAmounts.map((amount) => (
                  <span key={amount} className="rounded-full bg-white/10 border border-white/15 px-4 py-2 text-xs font-black">
                    {content.donationSettings.currency} {amount.toLocaleString()}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 bg-white/8 p-7 sm:p-10 border-t lg:border-t-0 lg:border-l border-white/10 space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#7DC242] font-black">Mobile Money contact</span>
                <p className="text-lg font-black mt-1">{content.donationSettings.mobileMoney}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#7DC242] font-black">Bank transfer</span>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{content.donationSettings.bankDetails}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'internship', label: 'Internships', icon: GraduationCap },
            { id: 'volunteer', label: 'Volunteer', icon: HeartHandshake },
            { id: 'fundraiser', label: 'Become a Fundraiser', icon: DollarSign },
            { id: 'careers', label: 'Careers', icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#007BC4] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 font-bold'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Pane Wrapper */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 max-w-4xl mx-auto min-h-[450px] shadow-sm">
          <AnimatePresence mode="wait">
            
            {/* Internship Tab */}
            {activeTab === 'internship' && (
              <motion.div
                key="internship"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                {/* Text column */}
                <div className="md:col-span-5 space-y-5 text-natural-text">
                  <div className="w-12 h-12 rounded-xl bg-natural-olive/20 text-natural-dark flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-natural-dark leading-snug italic">
                    HQ Placements in Kampala
                  </h3>
                  <p className="text-xs leading-relaxed opacity-95">
                    Work alongside professional staff at our Kampala headquarters to support children, women, and youth in living safe, healthy, and fulfilling lives.
                  </p>
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-natural-dark">Available Departments:</h4>
                    <ul className="text-xs space-y-1.5 font-semibold text-natural-text opacity-95">
                      <li className="flex items-center gap-2">• Finance & Fundraising</li>
                      <li className="flex items-center gap-2">• Marketing & Communications</li>
                      <li className="flex items-center gap-2">• Public Policy & Social Research</li>
                      <li className="flex items-center gap-2">• Social Media & Administration</li>
                    </ul>
                  </div>
                </div>

                {/* Form column */}
                <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-natural-border shadow-sm">
                  {!internSuccess ? (
                    <form onSubmit={handleInternSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-natural-dark uppercase">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Moses Mukasa"
                            value={internForm.fullName}
                            onChange={(e) => setInternForm({ ...internForm, fullName: e.target.value })}
                            className="w-full text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-natural-dark uppercase">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="moses@example.com"
                            value={internForm.email}
                            onChange={(e) => setInternForm({ ...internForm, email: e.target.value })}
                            className="w-full text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-natural-dark uppercase">Academic Background</label>
                          <input
                            type="text"
                            placeholder="Kyambogo Univ, BA Social Work"
                            value={internForm.academic}
                            onChange={(e) => setInternForm({ ...internForm, academic: e.target.value })}
                            className="w-full text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-natural-dark uppercase">Preferred Field</label>
                          <select
                            value={internForm.department}
                            onChange={(e) => setInternForm({ ...internForm, department: e.target.value })}
                            className="w-full text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive"
                          >
                            <option value="marketing-comms">Marketing & Comms</option>
                            <option value="finance-fundraising">Finance & Fundraising</option>
                            <option value="research-policy">Public Policy & Research</option>
                            <option value="administration">Social Media & Admin</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-natural-dark uppercase">Statement of Motivation</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Why do you want to intern at PID Uganda? Mention your career goals and what you hope to achieve."
                          value={internForm.statement}
                          onChange={(e) => setInternForm({ ...internForm, statement: e.target.value })}
                          className="w-full text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center py-3 bg-natural-olive hover:bg-natural-dark text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer gap-2"
                      >
                        <span>Submit Application Draft</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-5"
                    >
                      <CheckCircle2 className="w-12 h-12 text-natural-olive mx-auto" />
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-natural-dark font-serif italic">Draft Saved Locally!</h4>
                        <p className="text-xs text-natural-text opacity-90 max-w-sm mx-auto">
                          We’ve saved your application details to the browser console. For official filing, click below to open your native mail client and send this directly to info@piduganda.org:
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                          href={getInternMailto()}
                          className="inline-flex items-center justify-center px-5 py-3 bg-natural-tan hover:bg-natural-olive text-white font-bold rounded-xl text-xs uppercase tracking-wider gap-1.5"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Send Email Directly</span>
                        </a>
                        <button
                          onClick={() => {
                            setInternSuccess(false);
                            setInternForm({ fullName: '', email: '', phone: '', academic: '', department: 'marketing-comms', statement: '' });
                          }}
                          className="inline-flex items-center justify-center px-4 py-2.5 bg-natural-bg hover:bg-natural-border text-natural-dark font-bold rounded-xl text-xs uppercase tracking-wide"
                        >
                          <span>Apply for another field</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Volunteer Tab */}
            {activeTab === 'volunteer' && (
              <motion.div
                key="volunteer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                {/* Text column */}
                <div className="md:col-span-5 space-y-5 text-natural-text">
                  <div className="w-12 h-12 rounded-xl bg-natural-olive/20 text-natural-dark flex items-center justify-center">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-natural-dark leading-snug italic">
                    Volunteer in Our Teams
                  </h3>
                  <p className="text-xs leading-relaxed opacity-95">
                    We welcome passionate individuals to join our field teams. We offer two clear volunteering pathways:
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-3 bg-white border border-natural-border rounded-xl space-y-1">
                      <h4 className="text-xs font-bold text-natural-dark flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-natural-tan" />
                        <span>1. Student Volunteer</span>
                      </h4>
                      <p className="text-[10px] text-natural-text/70">Coordinate youth sports leagues, community gardens, or local clinics.</p>
                    </div>
                    <div className="p-3 bg-white border border-natural-border rounded-xl space-y-1">
                      <h4 className="text-xs font-bold text-natural-dark flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-natural-olive" />
                        <span>2. Professional Volunteer</span>
                      </h4>
                      <p className="text-[10px] text-natural-text/70">Deliver teacher training, medical outreach support, or agronomy workshops.</p>
                    </div>
                  </div>
                </div>

                {/* Form column */}
                <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-natural-border shadow-sm">
                  {!volunteerSuccess ? (
                    <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-natural-dark uppercase">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Sarah Namubiru"
                            value={volunteerForm.fullName}
                            onChange={(e) => setVolunteerForm({ ...volunteerForm, fullName: e.target.value })}
                            className="w-full text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-natural-dark uppercase">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="sarah@example.com"
                            value={volunteerForm.email}
                            onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                            className="w-full text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-natural-dark uppercase">Phone Number</label>
                          <input
                            type="tel"
                            placeholder="0771234567"
                            value={volunteerForm.phone}
                            onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                            className="w-full text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-natural-dark uppercase">Volunteer Cohort</label>
                          <select
                            value={volunteerForm.type}
                            onChange={(e) => setVolunteerForm({ ...volunteerForm, type: e.target.value })}
                            className="w-full text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive"
                          >
                            <option value="student">Student Volunteer</option>
                            <option value="professional">Professional Volunteer</option>
                          </select>
                        </div>
                      </div>

                      {/* Multiselect interests */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-natural-dark uppercase block">Areas of Interest</label>
                        <div className="flex flex-wrap gap-2">
                          {['Sports Instruction', 'Reforestation', 'Financial Literacy', 'Admin Support'].map((interest) => {
                            const selected = volunteerForm.interests.includes(interest);
                            return (
                              <button
                                type="button"
                                key={interest}
                                onClick={() => toggleInterest(interest)}
                                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border uppercase tracking-wider transition-all ${
                                  selected
                                    ? 'bg-natural-olive text-white border-natural-olive'
                                    : 'bg-natural-bg text-natural-text border-natural-border hover:bg-natural-beige'
                                }`}
                              >
                                {interest}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-natural-dark uppercase">Involvement Message</label>
                        <textarea
                          required
                          rows={2.5}
                          placeholder="Mention your availability and why you want to support PID's community programs."
                          value={volunteerForm.message}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                          className="w-full text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center py-3 bg-natural-olive hover:bg-natural-dark text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer gap-2"
                      >
                        <span>Register Volunteer Interest</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-5"
                    >
                      <CheckCircle2 className="w-12 h-12 text-natural-olive mx-auto" />
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-natural-dark font-serif italic">Volunteer Interest Logged!</h4>
                        <p className="text-xs text-natural-text opacity-90 max-w-sm mx-auto">
                          Draft registered locally. To submit official credentials and availability, please send a pre-filled message directly to our coordination office:
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                          href={getVolunteerMailto()}
                          className="inline-flex items-center justify-center px-5 py-3 bg-natural-tan hover:bg-natural-olive text-white font-bold rounded-xl text-xs uppercase tracking-wider gap-1.5"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Submit Volunteer Email</span>
                        </a>
                        <button
                          onClick={() => {
                            setVolunteerSuccess(false);
                            setVolunteerForm({ fullName: '', email: '', phone: '', type: 'student', interests: [], message: '' });
                          }}
                          className="inline-flex items-center justify-center px-4 py-2.5 bg-natural-bg hover:bg-natural-border text-natural-dark font-bold rounded-xl text-xs uppercase tracking-wide"
                        >
                          <span>Reset Form</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Fundraiser Tab */}
            {activeTab === 'fundraiser' && (
              <motion.div
                key="fundraiser"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                {/* Text column */}
                <div className="md:col-span-5 space-y-5 text-natural-text">
                  <div className="w-12 h-12 rounded-xl bg-natural-olive/20 text-natural-dark flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-natural-dark leading-snug italic">
                    Advocate & Fundraise
                  </h3>
                  <p className="text-xs leading-relaxed opacity-95">
                    Help us expand sports-driven programs to vulnerable youth. Whether you are an individual or part of a student or corporate team, your support provides access to clean water, education, and sports.
                  </p>
                </div>

                {/* Form column */}
                <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-natural-border shadow-sm">
                  {!fundraiserSuccess ? (
                    <form onSubmit={handleFundraiserSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-natural-dark uppercase">Your Name / Group</label>
                          <input
                            type="text"
                            required
                            placeholder="Jane Doe or Sports Club"
                            value={fundraiserForm.name}
                            onChange={(e) => setFundraiserForm({ ...fundraiserForm, name: e.target.value })}
                            className="w-full text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-natural-dark uppercase">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="jane@example.com"
                            value={fundraiserForm.email}
                            onChange={(e) => setFundraiserForm({ ...fundraiserForm, email: e.target.value })}
                            className="w-full text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-natural-dark uppercase">Organization Type</label>
                          <select
                            value={fundraiserForm.groupType}
                            onChange={(e) => setFundraiserForm({ ...fundraiserForm, groupType: e.target.value })}
                            className="w-full text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive"
                          >
                            <option value="individual">Individual</option>
                            <option value="student">Student Group</option>
                            <option value="community">Community Association</option>
                            <option value="organization">Corporate / NGO</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-natural-dark uppercase">Sponsorship Target ($)</label>
                          <input
                            type="number"
                            min="50"
                            max="10000"
                            required
                            value={fundraiserForm.targetAmount}
                            onChange={(e) => setFundraiserForm({ ...fundraiserForm, targetAmount: parseInt(e.target.value) || 500 })}
                            className="w-full text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-natural-dark uppercase">Fundraising Pitch / Idea</label>
                        <textarea
                          required
                          rows={2.5}
                          placeholder="How do you plan to raise funds? E.g. hosting a friendly football match, social media campaign, community bake sale."
                          value={fundraiserForm.pitch}
                          onChange={(e) => setFundraiserForm({ ...fundraiserForm, pitch: e.target.value })}
                          className="w-full text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center py-3 bg-natural-olive hover:bg-natural-dark text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer gap-2"
                      >
                        <span>Register as Fundraiser</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-5"
                    >
                      <CheckCircle2 className="w-12 h-12 text-natural-olive mx-auto" />
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-natural-dark font-serif italic">Fundraiser Registered!</h4>
                        <p className="text-xs text-natural-text opacity-90 max-w-sm mx-auto">
                          You’ve successfully set up a local fundraising campaign. To receive a digital Fundraising Kit, logo materials, and official payment channels, notify our development team:
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                          href={getFundraiserMailto()}
                          className="inline-flex items-center justify-center px-5 py-3 bg-natural-tan hover:bg-natural-olive text-white font-bold rounded-xl text-xs uppercase tracking-wider gap-1.5"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Request Sponsorship Kit</span>
                        </a>
                        <button
                          onClick={() => {
                            setFundraiserSuccess(false);
                            setFundraiserForm({ name: '', email: '', groupType: 'individual', targetAmount: 500, pitch: '' });
                          }}
                          className="inline-flex items-center justify-center px-4 py-2.5 bg-natural-bg hover:bg-natural-border text-natural-dark font-bold rounded-xl text-xs uppercase tracking-wide"
                        >
                          <span>Create Another Drive</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Careers Tab */}
            {activeTab === 'careers' && (
              <motion.div
                key="careers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-center max-w-lg mx-auto py-8"
              >
                <div className="w-12 h-12 rounded-xl bg-natural-olive/20 text-natural-dark flex items-center justify-center mx-auto">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-serif text-natural-dark italic">No Current Openings</h3>
                  <p className="text-sm text-natural-text opacity-90 leading-relaxed">
                    There are currently no open staff positions at our Kampala Secretariat. However, we are constantly expanding our field programs in Eastern Uganda and refugee communities.
                  </p>
                  <p className="text-xs text-natural-tan font-bold uppercase tracking-wide">
                    Please check this page regularly for professional recruitment postings.
                  </p>
                </div>

                {/* Job alert signup (Interactive) */}
                <div className="bg-white p-5 rounded-2xl border border-natural-border shadow-sm space-y-3.5">
                  <div className="flex items-center gap-2 text-natural-dark text-xs font-bold uppercase justify-center">
                    <Bell className="w-4 h-4 text-natural-tan" />
                    <span>Get Notified on Openings</span>
                  </div>
                  {!careerSubscribed ? (
                    <form onSubmit={handleCareerAlert} className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="yourname@gmail.com"
                        value={careerEmail}
                        onChange={(e) => setCareerEmail(e.target.value)}
                        className="flex-1 text-xs bg-natural-bg border border-natural-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-natural-olive focus:ring-1 focus:ring-natural-olive"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-natural-olive hover:bg-natural-dark text-white font-bold rounded-xl text-xs uppercase tracking-wide cursor-pointer"
                      >
                        Subscribe
                      </button>
                    </form>
                  ) : (
                    <motion.p
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-xs font-bold text-natural-olive flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Subscribed! We will alert you.</span>
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Local Sandbox Submissions console (Primacy on local data) */}
        {submissions.length > 0 && (
          <div className="mt-16 bg-slate-50 text-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-6">
              <div>
                <h4 className="text-base font-bold font-serif italic text-[#003366] flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#007BC4]" />
                  <span>My Saved Application Drafts</span>
                </h4>
                <p className="text-[10px] text-slate-600 font-medium">These files are saved securely in your browser cache (localStorage).</p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Clear all local application logs?')) {
                    setSubmissions([]);
                    localStorage.removeItem('pid_submissions');
                  }
                }}
                className="text-[10px] uppercase bg-slate-200 hover:bg-red-100 hover:text-red-700 text-slate-700 px-3 py-1.5 rounded-lg font-bold border border-slate-300 transition-colors"
              >
                Clear Cache
              </button>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {submissions.map((sub) => (
                <div key={sub.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-[#007BC4] text-white px-2.5 py-0.5 rounded">
                        {sub.type}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">{sub.date}</span>
                    </div>
                    <p className="text-xs font-bold text-[#003366]">{sub.name} &lt;{sub.email}&gt;</p>
                    <p className="text-[10px] text-slate-700 italic">"{sub.details}"</p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => {
                        const mUrl = sub.type.includes('Intern')
                          ? `mailto:info@piduganda.org?subject=${encodeURIComponent(`PID Internship - ${sub.name}`)}&body=${encodeURIComponent(sub.message)}`
                          : sub.type.includes('Volunteer')
                          ? `mailto:info@piduganda.org?subject=${encodeURIComponent(`PID Volunteer - ${sub.name}`)}&body=${encodeURIComponent(sub.message)}`
                          : `mailto:info@piduganda.org?subject=${encodeURIComponent(`PID Fundraiser - ${sub.name}`)}&body=${encodeURIComponent(sub.message)}`;
                        window.location.href = mUrl;
                      }}
                      className="text-[10px] uppercase tracking-wider bg-[#7DC242] hover:bg-[#007BC4] text-white font-bold px-3 py-2 rounded-lg transition-colors"
                    >
                      Email PID
                    </button>
                    <button
                      onClick={() => deleteSubmission(sub.id)}
                      className="p-1.5 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 rounded-lg transition-colors border border-slate-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

