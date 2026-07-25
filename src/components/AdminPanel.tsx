/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdmin, ServiceItem, PackageItem, BlogPostItem, TestimonialItem, AdministratorUser, GalleryImage } from '../context/AdminContext';
import { Logo } from './Logo';
import { 
  X, Lock, ShieldAlert, Sliders, Type, Image, RefreshCw, 
  Plus, Trash2, CheckCircle2, LogOut, Link as LinkIcon,
  Layout, Globe, User, Settings, Sparkles, Layers, Eye, Key, ChevronRight, FileText, Check,
  Briefcase, HeartHandshake, Newspaper, MessageSquare, Search, Shield, Download, Upload,
  Code, GitBranch, ArrowUpRight, Cpu, Save, Terminal, UploadCloud, FolderPlus, FileUp,
  Palette, Smartphone, Monitor, CreditCard, History, GripVertical, ArrowUp, ArrowDown
} from 'lucide-react';

const SUGGESTED_IMAGES = [
  { url: '/images/mtn-sos-148.jpg', caption: 'Children celebrating together.', title: 'Celebration' },
  { url: '/images/alx-98.jpg', caption: 'Students gathered for a programme.', title: 'Students Together' },
  { url: '/images/gbls-20.jpg', caption: 'A community group activity.', title: 'Community Activity' },
  { url: '/images/ad4-197.jpg', caption: 'Children smiling during an activity.', title: 'Children Smiling' },
  { url: '/images/ad4-203.jpg', caption: 'Young people taking part in a programme.', title: 'Youth Programme' },
  { url: '/images/mtn-sos-149.jpg', caption: 'Sports, movement and celebration.', title: 'Sports Celebration' },
  { url: '/images/pprrp-50.jpg', caption: 'Young people spending time together.', title: 'Friendship' },
  { url: '/images/spd-69.jpg', caption: 'Children enjoying outdoor play.', title: 'Children Playing' }
];

/**
 * Helper to compress high-res images uploaded from local computer
 * converting them to optimized WebP/JPEG Data URLs.
 */
const compressImageFile = (file: File, maxWidth = 1920, maxHeight = 1080, quality = 0.85): Promise<string> => {
  return new Promise((resolve) => {
    if (file.type === 'image/svg+xml' || file.size < 80 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve((e.target?.result as string) || '');
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, quality);
        resolve(dataUrl);
      };
      img.onerror = () => resolve((e.target?.result as string) || '');
      img.src = (e.target?.result as string) || '';
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
};

interface ImageFieldWithUploadProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onNotify?: (msg: string) => void;
  badge?: string;
}

const ImageFieldWithUpload: React.FC<ImageFieldWithUploadProps> = ({ 
  label, value, onChange, placeholder, onNotify, badge 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const dataUrl = await compressImageFile(file);
      if (dataUrl) {
        onChange(dataUrl);
        if (onNotify) onNotify(`Uploaded "${file.name}" from local computer!`);
      }
    } catch {
      if (onNotify) onNotify('Failed to process image file.');
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-1.5">
          <label className="text-[11px] font-semibold text-slate-300">{label}</label>
          {badge && (
            <span className="text-[9px] font-mono text-[#7DC242] bg-[#7DC242]/10 px-1.5 py-0.5 rounded border border-[#7DC242]/20">
              {badge}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="text-[10px] text-white bg-[#007BC4] hover:bg-[#005a92] px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm border border-sky-400/30 disabled:opacity-50 shrink-0"
          title="Upload image file from local computer"
        >
          {isUploading ? (
            <RefreshCw className="w-3 h-3 animate-spin text-white" />
          ) : (
            <Upload className="w-3 h-3 text-[#7DC242]" />
          )}
          <span>{isUploading ? 'Uploading...' : 'Upload From Computer'}</span>
        </button>
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*"
          className="hidden" 
          onChange={handleFileChange}
        />
      </div>

      <div className="flex items-center gap-2">
        {value && (
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 shrink-0 relative group">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        <input 
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Paste image URL or click 'Upload From Computer'..."}
          className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#007BC4]"
        />
      </div>
    </div>
  );
};

interface PageBannerEditorProps {
  number: string;
  label: string;
  image: string;
  tagline: string;
  title: string;
  subtitle: string;
  onImageChange: (value: string) => void;
  onTaglineChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  onNotify: (message: string) => void;
}

const PageBannerEditor: React.FC<PageBannerEditorProps> = ({
  number,
  label,
  image,
  tagline,
  title,
  subtitle,
  onImageChange,
  onTaglineChange,
  onTitleChange,
  onSubtitleChange,
  onNotify,
}) => (
  <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
    <span className="text-xs font-bold text-[#7DC242] uppercase tracking-wider block border-b border-slate-800 pb-2">
      {number}. {label}
    </span>
    <ImageFieldWithUpload
      label={`${label} Background Image`}
      value={image}
      onChange={onImageChange}
      onNotify={onNotify}
      placeholder="Upload a background image or paste an image URL..."
      badge="Page Background"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Small Tagline</label>
        <input
          type="text"
          value={tagline}
          onChange={(event) => onTaglineChange(event.target.value)}
          className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Page Heading</label>
        <input
          type="text"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
        />
      </div>
    </div>
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-300">Page Introduction</label>
      <textarea
        rows={3}
        value={subtitle}
        onChange={(event) => onSubtitleChange(event.target.value)}
        className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
      />
    </div>
  </div>
);

export const AdminPanel: React.FC = () => {
  const { 
    content, updateContent, resetToDefault, 
    isAdminOpen, setIsAdminOpen, isAuthorized, login, logout,
    exportContentJson, importContentJson, generateDecapConfigYml
  } = useAdmin();

  // Auth states
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState(false);

  // Admin Dashboard Active Tab
  type AdminTab = 
    | 'dashboard' 
    | 'builder'
    | 'pages' 
    | 'services' 
    | 'packages' 
    | 'blog' 
    | 'gallery' 
    | 'testimonials' 
    | 'contact' 
    | 'seo' 
    | 'admins' 
    | 'appearance'
    | 'inbox'
    | 'donations'
    | 'publishing'
    | 'settings';

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  
  // Status notification state
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [copiedYml, setCopiedYml] = useState(false);
  const [isSimulatingDeploy, setIsSimulatingDeploy] = useState(false);

  // Gallery input states
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');

  // JSON Import File Ref/Input
  const [jsonInputText, setJsonInputText] = useState('');
  const [localDataVersion, setLocalDataVersion] = useState(0);
  const [donorName, setDonorName] = useState('');
  const [donationAmount, setDonationAmount] = useState('');

  const triggerSaveStatus = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      setLoginError(false);
      setPassword('');
      triggerSaveStatus('Logged into Decap / WordPress Admin Console!');
    } else {
      setLoginError(true);
      triggerSaveStatus('Login failed. Incorrect passcode (Use 1234).');
    }
  };

  const handleQuickDemoLogin = () => {
    setPassword('1234');
    const success = login('1234');
    if (success) {
      setLoginError(false);
      setPassword('');
      triggerSaveStatus('Logged into Decap / WordPress Admin Console!');
    }
  };

  const handleTextChange = (key: string, val: any) => {
    updateContent({ [key]: val });
  };

  const updateArrayItem = (key: 'navigationItems' | 'partners' | 'homeCards', index: number, patch: Record<string, any>) => {
    const next = [...content[key]] as any[];
    next[index] = { ...next[index], ...patch };
    updateContent({ [key]: next });
  };

  const moveArrayItem = (key: 'navigationItems' | 'partners' | 'homeCards', index: number, direction: -1 | 1) => {
    const next = [...content[key]] as any[];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    updateContent({ [key]: next });
  };

  const readInbox = () => {
    try {
      const inquiries = JSON.parse(localStorage.getItem('pid_inquiries') || '[]');
      const applications = JSON.parse(localStorage.getItem('pid_submissions') || '[]');
      const statuses = JSON.parse(localStorage.getItem('pid_inbox_statuses') || '{}');
      const hidden = JSON.parse(localStorage.getItem('pid_inbox_hidden') || '[]');
      return [...inquiries.map((item: any) => ({ ...item, type: item.type || 'Contact Inquiry' })), ...applications]
        .filter((item: any) => !hidden.includes(item.id))
        .map((item: any) => ({ ...item, status: statuses[item.id] || 'New' }))
        .sort((a: any, b: any) => String(b.date).localeCompare(String(a.date)));
    } catch {
      return [];
    }
  };

  const setInboxStatus = (id: string, status: string) => {
    const statuses = JSON.parse(localStorage.getItem('pid_inbox_statuses') || '{}');
    statuses[id] = status;
    localStorage.setItem('pid_inbox_statuses', JSON.stringify(statuses));
    setLocalDataVersion((value) => value + 1);
  };

  const hideInboxItem = (id: string) => {
    const hidden = JSON.parse(localStorage.getItem('pid_inbox_hidden') || '[]');
    localStorage.setItem('pid_inbox_hidden', JSON.stringify([...new Set([...hidden, id])]));
    setLocalDataVersion((value) => value + 1);
  };

  const readDonations = () => {
    try { return JSON.parse(localStorage.getItem('pid_donations') || '[]'); } catch { return []; }
  };

  const addDonationRecord = () => {
    if (!donorName.trim() || !Number(donationAmount)) return;
    const records = readDonations();
    records.unshift({ id: `don-${Date.now()}`, donor: donorName.trim(), amount: Number(donationAmount), date: new Date().toLocaleDateString(), status: 'Recorded' });
    localStorage.setItem('pid_donations', JSON.stringify(records));
    setDonorName('');
    setDonationAmount('');
    setLocalDataVersion((value) => value + 1);
    triggerSaveStatus('Donation record added.');
  };

  const readRevisions = () => {
    try { return JSON.parse(localStorage.getItem('pid_content_revisions') || '[]'); } catch { return []; }
  };

  const createRevision = (status = 'Published') => {
    const revisions = readRevisions();
    revisions.unshift({ id: `rev-${Date.now()}`, date: new Date().toLocaleString(), status, snapshot: content });
    localStorage.setItem('pid_content_revisions', JSON.stringify(revisions.slice(0, 15)));
    setLocalDataVersion((value) => value + 1);
    triggerSaveStatus(`${status} revision created.`);
  };

  const handleSeoChange = (key: string, val: string) => {
    updateContent({
      seoSettings: {
        ...content.seoSettings,
        [key]: val
      }
    });
  };

  const handleCopyConfigYml = () => {
    const yml = generateDecapConfigYml();
    navigator.clipboard.writeText(yml);
    setCopiedYml(true);
    triggerSaveStatus('Copied Decap admin/config.yml to clipboard!');
    setTimeout(() => setCopiedYml(false), 3000);
  };

  const handleSimulateGitDeploy = () => {
    setIsSimulatingDeploy(true);
    setTimeout(() => {
      setIsSimulatingDeploy(false);
      triggerSaveStatus('Committed siteContent.json changes to Git repository! Static site redeploy initiated.');
    }, 1800);
  };

  const handleImportJson = () => {
    if (!jsonInputText.trim()) return;
    const ok = importContentJson(jsonInputText);
    if (ok) {
      triggerSaveStatus('JSON configuration imported & saved successfully!');
      setJsonInputText('');
    } else {
      triggerSaveStatus('Error: Invalid JSON schema structure.');
    }
  };

  // Service item management
  const handleAddService = () => {
    const newService: ServiceItem = {
      id: 's_' + Date.now(),
      title: 'New Community Program',
      category: 'Community',
      description: 'Enter description for this service or program.',
      icon: 'Heart'
    };
    updateContent({ services: [...content.services, newService] });
    triggerSaveStatus('New service added!');
  };

  const handleRemoveService = (id: string) => {
    updateContent({ services: content.services.filter(s => s.id !== id) });
    triggerSaveStatus('Service removed.');
  };

  const handleUpdateService = (id: string, field: keyof ServiceItem, val: string) => {
    const updated = content.services.map(s => s.id === id ? { ...s, [field]: val } : s);
    updateContent({ services: updated });
  };

  // Package management
  const handleAddPackage = () => {
    const newPkg: PackageItem = {
      id: 'pkg_' + Date.now(),
      title: 'New Volunteer Program',
      type: 'Volunteer Program',
      duration: '2 Weeks',
      location: 'Kampala, Uganda',
      cost: '$400',
      description: 'Program description goes here.',
      image: 'https://images.unsplash.com/photo-1543326301-33f5d50fd90f?auto=format&fit=crop&q=80&w=1600'
    };
    updateContent({ packages: [...content.packages, newPkg] });
    triggerSaveStatus('New package added!');
  };

  const handleRemovePackage = (id: string) => {
    updateContent({ packages: content.packages.filter(p => p.id !== id) });
    triggerSaveStatus('Package removed.');
  };

  const handleUpdatePackage = (id: string, field: keyof PackageItem, val: string) => {
    const updated = content.packages.map(p => p.id === id ? { ...p, [field]: val } : p);
    updateContent({ packages: updated });
  };

  // Blog post management
  const handleAddBlogPost = () => {
    const newPost: BlogPostItem = {
      id: 'post_' + Date.now(),
      title: 'New Community Update Title',
      author: 'Secretariat Media',
      date: new Date().toISOString().split('T')[0],
      category: 'General Update',
      summary: 'Summary of news update.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1600',
      readTime: '3 min read'
    };
    updateContent({ blogPosts: [...content.blogPosts, newPost] });
    triggerSaveStatus('New blog post added!');
  };

  const handleRemoveBlogPost = (id: string) => {
    updateContent({ blogPosts: content.blogPosts.filter(b => b.id !== id) });
    triggerSaveStatus('Blog post removed.');
  };

  const handleUpdateBlogPost = (id: string, field: keyof BlogPostItem, val: string) => {
    const updated = content.blogPosts.map(b => b.id === id ? { ...b, [field]: val } : b);
    updateContent({ blogPosts: updated });
  };

  // Testimonial management
  const handleAddTestimonial = () => {
    const newT: TestimonialItem = {
      id: 't_' + Date.now(),
      name: 'Community Beneficiary',
      role: 'Participant',
      comment: 'Share inspirational testimonial comment here.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
    };
    updateContent({ testimonials: [...content.testimonials, newT] });
    triggerSaveStatus('New testimonial added!');
  };

  const handleRemoveTestimonial = (id: string) => {
    updateContent({ testimonials: content.testimonials.filter(t => t.id !== id) });
    triggerSaveStatus('Testimonial removed.');
  };

  const handleUpdateTestimonial = (id: string, field: keyof TestimonialItem, val: string) => {
    const updated = content.testimonials.map(t => t.id === id ? { ...t, [field]: val } : t);
    updateContent({ testimonials: updated });
  };

  // Gallery
  const handleAddPhoto = (url: string, caption: string) => {
    if (!url) {
      triggerSaveStatus('Please enter a valid image URL.');
      return;
    }
    const newImage = {
      id: Date.now().toString(),
      url,
      caption: caption || 'Community outreach photo.'
    };
    updateContent({
      galleryImages: [...content.galleryImages, newImage]
    });
    setNewPhotoUrl('');
    setNewPhotoCaption('');
    triggerSaveStatus('Photo added to media library!');
  };

  const handleRemovePhoto = (id: string) => {
    const updated = content.galleryImages.filter(img => img.id !== id);
    updateContent({ galleryImages: updated });
    triggerSaveStatus('Photo removed from media library.');
  };

  const handleUpdatePhoto = (id: string, patch: Partial<GalleryImage>) => {
    updateContent({
      galleryImages: content.galleryImages.map((image) => image.id === id ? { ...image, ...patch } : image)
    });
  };

  // Local computer image batch drop & upload handlers
  const [isDraggingLocal, setIsDraggingLocal] = useState(false);

  const processLocalFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    triggerSaveStatus(`Uploading ${files.length} image(s) from your local computer...`);

    const newImages: GalleryImage[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        try {
          const compressedDataUrl = await compressImageFile(file);
          if (compressedDataUrl) {
            const cleanName = file.name.replace(/\.[^/.]+$/, "") || 'Local uploaded photo';
            newImages.push({
              id: 'local_' + Date.now() + '_' + i,
              url: compressedDataUrl,
              caption: cleanName
            });
          }
        } catch (err) {
          console.error('Local file error:', err);
        }
      }
    }

    if (newImages.length > 0) {
      updateContent({
        galleryImages: [...content.galleryImages, ...newImages]
      });
      triggerSaveStatus(`Added ${newImages.length} image(s) from local computer to Media Library!`);
    }
  };

  const handleBatchLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processLocalFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleDropLocalFiles = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingLocal(false);
    if (e.dataTransfer.files) {
      processLocalFiles(e.dataTransfer.files);
    }
  };

  if (!isAdminOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-md font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        className="relative w-full max-w-6xl h-[100dvh] sm:h-auto bg-[#16202c] border border-[#2d3a4e] rounded-none sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:max-h-[94vh] text-slate-100"
      >
        
        {/* DECAP CMS BRANDED TOP NAVIGATION BAR */}
        <div className="flex justify-between items-center bg-[#003366] text-white px-3 sm:px-4 py-3 border-b border-[#002244] shrink-0 shadow-md">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-white p-1 flex items-center justify-center shadow-md shrink-0">
              <img src="/branding/pid-mark.webp" alt="" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white tracking-wide flex items-center gap-1.5 min-w-0">
                  <span className="truncate">PID Website Console</span>
                  <span className="hidden sm:inline text-sky-300 font-mono text-[10px]">v3.1</span>
                </span>
                <span className="hidden md:flex px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-[#7DC242]/20 text-[#7DC242] font-bold border border-[#7DC242]/40 items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7DC242] animate-pulse" />
                  Live Git Repository Mode
                </span>
              </div>
              <p className="text-[10px] text-sky-200/80 flex items-center gap-1">
                <span>Collections</span>
                <ChevronRight className="w-3 h-3 text-sky-400" />
                <span className="text-white font-bold uppercase">{activeTab}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isAuthorized && (
              <>
                <button
                  type="button"
                  onClick={() => triggerSaveStatus("✓ All changes saved and published live to website!")}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#7DC242] hover:bg-[#6eb335] text-slate-950 font-black rounded-lg text-xs transition-all cursor-pointer shadow-md border border-emerald-300/40"
                  title="Save & Publish Edits Immediately"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                  <span className="hidden sm:inline">Publish Edits</span>
                </button>

                <button
                  onClick={exportContentJson}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002244] hover:bg-[#001830] text-sky-100 rounded-lg text-xs font-bold transition-all cursor-pointer border border-sky-800/60"
                  title="Export siteContent.json"
                >
                  <Download className="w-3.5 h-3.5 text-[#007BC4]" />
                  <span>Export JSON</span>
                </button>

                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#007BC4] hover:bg-[#005f9e] text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm border border-sky-300/30"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Live Site</span>
                </button>
              </>
            )}

            <button 
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-sky-200 hover:text-white hover:bg-[#002244] rounded-lg transition-all cursor-pointer"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NOTIFICATION SAVE STATUS TOAST */}
        <AnimatePresence>
          {saveStatus && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#00c7b7] text-slate-950 text-xs font-black px-4 py-2 flex items-center justify-between border-b border-teal-400 shrink-0 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>{saveStatus}</span>
              </div>
              <span className="hidden sm:inline text-[10px] text-slate-900 font-mono uppercase font-bold">State Committed to Memory</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN BODY AREA */}
        <div className="flex-1 overflow-y-auto bg-[#16202c] text-slate-200">
          
          <AnimatePresence mode="wait">
            {!isAuthorized ? (
              // DECAP / WORDPRESS AUTHENTICATION LOGIN SCREEN
              <motion.div 
                key="wp-login"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="min-h-[520px] flex items-center justify-center p-6 bg-[#121924]"
              >
                <div className="w-full max-w-md bg-[#1b2533] border border-[#2d3a4e] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
                  
                  {/* Decap Logo Header */}
                  <div className="text-center space-y-3">
                    <div className="inline-flex rounded-2xl bg-white p-2 mx-auto shadow-xl ring-1 ring-slate-200">
                      <Logo size={76} showText={false} lightMode={true} className="shadow-none ring-0 p-0" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        Decap CMS Admin Console
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Sign in to edit text, background images, packages & blog posts
                      </p>
                    </div>
                  </div>

                  {/* Passcode Reminder Box */}
                  <div className="p-3 bg-[#132337] border border-[#00c7b7]/30 rounded-xl flex items-start gap-2.5 text-xs text-slate-200">
                    <Key className="w-4 h-4 text-[#00c7b7] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Default Access Passcode</span>
                      <p className="text-[11px] text-slate-300">Enter passcode <code className="bg-[#1f2f45] px-1.5 py-0.5 rounded font-mono font-bold text-[#00c7b7]">1234</code> to log in or click quick fill.</p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Username or Email</span>
                      </label>
                      <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full text-xs bg-[#0f172a] border border-[#334155] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00c7b7] font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Access Passcode PIN</span>
                      </label>
                      <input 
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full text-xs bg-[#0f172a] border border-[#334155] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00c7b7] font-mono"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200">
                        <input 
                          type="checkbox" 
                          checked={rememberMe} 
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded bg-slate-800 border-slate-700 text-[#00c7b7]"
                        />
                        <span>Remember session</span>
                      </label>

                      <button
                        type="button"
                        onClick={handleQuickDemoLogin}
                        className="text-[11px] text-[#00c7b7] hover:underline font-bold cursor-pointer"
                      >
                        Auto-Fill (1234) & Login
                      </button>
                    </div>

                    {loginError && (
                      <div className="flex items-center gap-2 p-3 bg-red-950/60 text-red-200 text-xs font-medium rounded-xl border border-red-800/80">
                        <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                        <span>Incorrect passcode. Use default PIN <strong>1234</strong>.</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#00c7b7] hover:bg-[#00b2a3] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
                    >
                      <Key className="w-4 h-4" />
                      <span>Log In to Decap CMS Console</span>
                    </button>
                  </form>

                  <div className="pt-2 border-t border-[#2a3649] text-center">
                    <button
                      type="button"
                      onClick={() => setIsAdminOpen(false)}
                      className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      ← Back to PID Uganda Website
                    </button>
                  </div>

                </div>
              </motion.div>
            ) : (
              // DECAP CMS FULL DASHBOARD & CONTENT MANAGEMENT SYSTEM
              <div className="flex flex-col lg:flex-row min-h-0 lg:min-h-[620px]">
                
                {/* LEFT SIDEBAR NAVIGATION */}
                <div className="w-full lg:w-64 bg-[#001c38] border-r border-[#003366] p-2 sm:p-4 space-y-2 lg:space-y-6 shrink-0 sticky top-0 z-20">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between px-3 pb-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#7DC242]">
                        COLLECTIONS
                      </p>
                      <span className="text-[9px] bg-[#007BC4]/20 text-sky-200 px-1.5 py-0.5 rounded font-mono border border-sky-400/30">
                        Decap Git
                      </span>
                    </div>
                    <nav className="flex lg:block gap-2 lg:space-y-1 pt-1 overflow-x-auto pb-2 lg:pb-0 [scrollbar-width:thin]">
                      {[
                        { id: 'dashboard', label: 'Dashboard Overview', icon: Globe },
                        { id: 'builder', label: 'Visual Page Builder', icon: Layers },
                        { id: 'pages', label: 'Website Page Copy', icon: FileText },
                        { id: 'services', label: 'Services & Programs', icon: Briefcase },
                        { id: 'packages', label: 'Travel & Volunteer Packages', icon: HeartHandshake },
                        { id: 'blog', label: 'Blog Posts & Updates', icon: Newspaper },
                        { id: 'gallery', label: 'Media Library & Headers', icon: Image },
                        { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
                        { id: 'contact', label: 'Contact Information', icon: LinkIcon },
                        { id: 'seo', label: 'SEO Settings', icon: Search },
                        { id: 'admins', label: 'Administrators', icon: Shield },
                        { id: 'appearance', label: 'Template & Appearance', icon: Palette },
                        { id: 'inbox', label: 'Forms & Messages Inbox', icon: MessageSquare },
                        { id: 'donations', label: 'Donation Manager', icon: CreditCard },
                        { id: 'publishing', label: 'Publishing & Revisions', icon: History },
                        { id: 'settings', label: 'Decap / Git Settings', icon: Settings },
                      ].map((tab) => {
                        const Icon = tab.icon;
                        const active = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`shrink-0 lg:w-full flex items-center gap-2 lg:gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left whitespace-nowrap ${
                              active
                                ? 'bg-[#003366] text-white font-black border border-[#007BC4]/60 shadow-lg shadow-sky-950/40'
                                : 'text-slate-300 hover:bg-[#002852] hover:text-white'
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${active ? 'text-[#7DC242]' : 'text-[#007BC4]'}`} />
                            <span className="truncate">{tab.label}</span>
                          </button>
                        );
                      })}
                    </nav>
                  </div>

                  {/* Admin User Profile & Logout */}
                  <div className="hidden lg:block pt-4 border-t border-[#002e5c] space-y-3">
                    <div className="flex items-center gap-2.5 px-2">
                      <div className="w-8 h-8 rounded-full bg-[#7DC242] text-slate-950 flex items-center justify-center font-black text-xs shadow">
                        A
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-xs font-bold text-white block truncate">Secretariat Admin</span>
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Authenticated
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={resetToDefault}
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#002852] hover:bg-[#003873] text-sky-100 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border border-[#00478a]"
                      >
                        <RefreshCw className="w-3 h-3 text-[#7DC242]" />
                        <span>Reset JSON Defaults</span>
                      </button>

                      <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-200 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border border-red-800/50"
                      >
                        <LogOut className="w-3 h-3 text-red-300" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* MAIN CONTENT WORKSPACE */}
                <div className="flex-1 min-w-0 p-3 sm:p-5 md:p-8 space-y-6 overflow-y-auto">
                  
                  {/* PERSISTENT DEDICATED SAVE & PUBLISH CONTROL SECTION TOOLBAR */}
                  <div className="bg-[#002244] border border-[#003873] rounded-2xl p-3 sm:p-5 shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#003366] border border-[#007BC4]/40 flex items-center justify-center text-[#7DC242] shrink-0 shadow-inner">
                        <Save className="w-5 h-5 text-[#7DC242]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-white">Save & Publish Console Edits</h4>
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-[#7DC242]/20 text-[#7DC242] border border-[#7DC242]/40">
                            Decap CMS Active
                          </span>
                        </div>
                        <p className="text-xs text-sky-200/80 mt-0.5">
                          Persist all text, uploaded images, and configuration changes live to website memory.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 w-full sm:w-auto sm:justify-end">
                      <button
                        type="button"
                        onClick={() => triggerSaveStatus("✓ All console changes saved & published live to website!")}
                        className="px-5 py-2.5 bg-[#003366] hover:bg-[#00264d] text-white font-black text-xs rounded-xl transition-all cursor-pointer shadow-lg border border-[#007BC4]/50 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#7DC242]" />
                        <span>Save & Publish Edits</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => triggerSaveStatus("✓ Draft saved in local session memory.")}
                        className="px-3.5 py-2.5 bg-[#001830] hover:bg-[#002244] text-sky-100 text-xs font-bold rounded-xl transition-all cursor-pointer border border-[#003873] flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5 text-sky-300" />
                        <span>Save Draft</span>
                      </button>

                      <button
                        type="button"
                        onClick={exportContentJson}
                        className="px-3.5 py-2.5 bg-[#007BC4] hover:bg-[#00629c] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5 border border-sky-300/30"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export JSON</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* TAB 1: DASHBOARD OVERVIEW */}
                  {activeTab === 'dashboard' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Globe className="w-5 h-5 text-[#007BC4]" />
                            <span>CMS Overview & Content Structure</span>
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">
                            Structured Decap CMS managing text copy, background images, services, and blog articles.
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleSimulateGitDeploy}
                            disabled={isSimulatingDeploy}
                            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md"
                          >
                            <GitBranch className="w-4 h-4" />
                            <span>{isSimulatingDeploy ? 'Deploying...' : 'Commit & Redeploy'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Stat Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                          <span className="text-xs text-slate-400 font-medium block">Editable Pages</span>
                          <span className="text-2xl font-black text-white mt-1 block">7 Sections</span>
                          <span className="text-[10px] text-[#7DC242] mt-1 block">Hero, About, Pillars...</span>
                        </div>

                        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                          <span className="text-xs text-slate-400 font-medium block">Services & Programs</span>
                          <span className="text-2xl font-black text-white mt-1 block">{content.services.length} Programs</span>
                          <span className="text-[10px] text-[#007BC4] mt-1 block">Real-time sync</span>
                        </div>

                        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                          <span className="text-xs text-slate-400 font-medium block">Volunteer Packages</span>
                          <span className="text-2xl font-black text-white mt-1 block">{content.packages.length} Packages</span>
                          <span className="text-[10px] text-amber-400 mt-1 block">Active pricing</span>
                        </div>

                        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                          <span className="text-xs text-slate-400 font-medium block">Blog Posts</span>
                          <span className="text-2xl font-black text-white mt-1 block">{content.blogPosts.length} Articles</span>
                          <span className="text-[10px] text-sky-400 mt-1 block">News & updates</span>
                        </div>
                      </div>

                      {/* Decap Configuration Quick Status */}
                      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Code className="w-5 h-5 text-[#007BC4]" />
                            <h4 className="text-sm font-bold text-white">Decap CMS Integration Status</h4>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-800/60">
                            admin/config.yml Ready
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          Your website content is structured inside <code className="bg-slate-800 text-sky-300 px-1.5 py-0.5 rounded font-mono">/src/config/siteContent.json</code>. You can edit content directly in this console or use Decap CMS connected to GitHub for automated static redeploys.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <button
                            onClick={handleCopyConfigYml}
                            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-700 flex items-center gap-1.5"
                          >
                            <Terminal className="w-4 h-4 text-[#007BC4]" />
                            <span>{copiedYml ? 'Copied config.yml!' : 'Copy Decap config.yml'}</span>
                          </button>

                          <button
                            onClick={exportContentJson}
                            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-700 flex items-center gap-1.5"
                          >
                            <Download className="w-4 h-4 text-[#7DC242]" />
                            <span>Download siteContent.json</span>
                          </button>
                        </div>
                      </div>

                      {/* General Identity Form */}
                      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <div>
                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                              <Image className="w-4 h-4 text-[#7DC242]" />
                              <span>Official Website Logo & Branding</span>
                            </h4>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              Upload your custom logo image file (PNG, SVG, JPG) directly from your computer or paste an image URL. It updates the header and footer logo across the entire website instantly.
                            </p>
                          </div>
                        </div>

                        <ImageFieldWithUpload 
                          label="Custom Website Logo File / URL"
                          value={content.siteLogoUrl || ''}
                          onChange={(val) => handleTextChange('siteLogoUrl', val)}
                          placeholder="Click 'Upload From Computer' or paste image URL..."
                          onNotify={triggerSaveStatus}
                          badge="PNG / SVG / JPG"
                        />

                        {content.siteLogoUrl && (
                          <div className="flex items-center gap-3 pt-2">
                            <span className="text-xs text-slate-400 font-medium">Active Logo Preview:</span>
                            <div className="p-2 bg-white rounded-xl border border-slate-700 inline-block shadow-sm">
                              <img src={content.siteLogoUrl} alt="Logo preview" className="h-10 w-auto object-contain" />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleTextChange('siteLogoUrl', '')}
                              className="text-xs text-rose-400 hover:text-rose-300 font-bold underline cursor-pointer"
                            >
                              Reset to Default Vector SVG Logo
                            </button>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-300">Website Title</label>
                            <input 
                              type="text"
                              value={content.siteTitle}
                              onChange={(e) => handleTextChange('siteTitle', e.target.value)}
                              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-[#007BC4]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-300">Tagline Phrase</label>
                            <input 
                              type="text"
                              value={content.siteTagline}
                              onChange={(e) => handleTextChange('siteTagline', e.target.value)}
                              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-[#007BC4]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-300">Top Header Announcement Banner Text</label>
                          <input 
                            type="text"
                            value={content.announcementText}
                            onChange={(e) => handleTextChange('announcementText', e.target.value)}
                            className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-[#007BC4]"
                          />
                        </div>
                      </div>

                      <PageBannerEditor
                        number="3"
                        label="Strategic Programmes Page"
                        image={content.pillarsHeaderBgImage}
                        tagline={content.pillarsTagline}
                        title={content.pillarsTitle}
                        subtitle={content.pillarsSubtitle}
                        onImageChange={(value) => handleTextChange('pillarsHeaderBgImage', value)}
                        onTaglineChange={(value) => handleTextChange('pillarsTagline', value)}
                        onTitleChange={(value) => handleTextChange('pillarsTitle', value)}
                        onSubtitleChange={(value) => handleTextChange('pillarsSubtitle', value)}
                        onNotify={triggerSaveStatus}
                      />

                      <PageBannerEditor
                        number="4"
                        label="Impact Page"
                        image={content.impactHeaderBgImage || ''}
                        tagline={content.impactTagline || ''}
                        title={content.impactTitle || ''}
                        subtitle={content.impactSubtitle || ''}
                        onImageChange={(value) => handleTextChange('impactHeaderBgImage', value)}
                        onTaglineChange={(value) => handleTextChange('impactTagline', value)}
                        onTitleChange={(value) => handleTextChange('impactTitle', value)}
                        onSubtitleChange={(value) => handleTextChange('impactSubtitle', value)}
                        onNotify={triggerSaveStatus}
                      />

                      <PageBannerEditor
                        number="5"
                        label="Partners Page"
                        image={content.partnersHeaderBgImage || ''}
                        tagline={content.partnersTagline || ''}
                        title={content.partnersTitle || ''}
                        subtitle={content.partnersSubtitle || ''}
                        onImageChange={(value) => handleTextChange('partnersHeaderBgImage', value)}
                        onTaglineChange={(value) => handleTextChange('partnersTagline', value)}
                        onTitleChange={(value) => handleTextChange('partnersTitle', value)}
                        onSubtitleChange={(value) => handleTextChange('partnersSubtitle', value)}
                        onNotify={triggerSaveStatus}
                      />

                      <PageBannerEditor
                        number="6"
                        label="Opportunities Page"
                        image={content.opportunitiesHeaderBgImage || ''}
                        tagline={content.opportunitiesTagline || ''}
                        title={content.opportunitiesTitle || ''}
                        subtitle={content.opportunitiesSubtitle || ''}
                        onImageChange={(value) => handleTextChange('opportunitiesHeaderBgImage', value)}
                        onTaglineChange={(value) => handleTextChange('opportunitiesTagline', value)}
                        onTitleChange={(value) => handleTextChange('opportunitiesTitle', value)}
                        onSubtitleChange={(value) => handleTextChange('opportunitiesSubtitle', value)}
                        onNotify={triggerSaveStatus}
                      />
                    </motion.div>
                  )}

                  {/* VISUAL PAGE BUILDER */}
                  {activeTab === 'builder' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Layers className="w-5 h-5 text-[#7DC242]" />
                          <span>Visual Page Builder</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">Reorder, rename, show or hide website areas and edit reusable content cards.</p>
                      </div>

                      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-3">
                        <h4 className="text-xs font-bold text-[#7DC242] uppercase tracking-wider">Navigation & Page Visibility</h4>
                        {content.navigationItems.map((item, index) => (
                          <div key={item.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3">
                            <GripVertical className="w-4 h-4 text-slate-500" />
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <input value={item.label} onChange={(e) => updateArrayItem('navigationItems', index, { label: e.target.value })} className="flex-1 text-xs bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
                              <label className="flex items-center gap-2 text-[11px] text-slate-300">
                                <input type="checkbox" checked={item.visible} onChange={(e) => updateArrayItem('navigationItems', index, { visible: e.target.checked })} className="accent-[#7DC242]" />
                                Visible
                              </label>
                            </div>
                            <div className="flex gap-1">
                              <button onClick={() => moveArrayItem('navigationItems', index, -1)} disabled={index === 0} className="p-2 rounded-lg bg-slate-800 disabled:opacity-30"><ArrowUp className="w-3 h-3" /></button>
                              <button onClick={() => moveArrayItem('navigationItems', index, 1)} disabled={index === content.navigationItems.length - 1} className="p-2 rounded-lg bg-slate-800 disabled:opacity-30"><ArrowDown className="w-3 h-3" /></button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
                        <h4 className="text-xs font-bold text-[#7DC242] uppercase tracking-wider">Homepage Feature Cards</h4>
                        {content.homeCards.map((card, index) => (
                          <div key={card.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <strong className="text-xs text-white">Card {index + 1}</strong>
                              <label className="flex items-center gap-2 text-[11px] text-slate-300"><input type="checkbox" checked={card.visible} onChange={(e) => updateArrayItem('homeCards', index, { visible: e.target.checked })} className="accent-[#7DC242]" /> Visible</label>
                            </div>
                            <ImageFieldWithUpload label="Card photograph" value={card.image} onChange={(value) => updateArrayItem('homeCards', index, { image: value })} onNotify={triggerSaveStatus} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input value={card.title} onChange={(e) => updateArrayItem('homeCards', index, { title: e.target.value })} placeholder="Card title" className="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                              <input value={card.action} onChange={(e) => updateArrayItem('homeCards', index, { action: e.target.value })} placeholder="Button label" className="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                            </div>
                            <textarea value={card.description} onChange={(e) => updateArrayItem('homeCards', index, { description: e.target.value })} rows={2} className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                          </div>
                        ))}
                      </div>

                      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold text-[#7DC242] uppercase tracking-wider">Partner Manager</h4>
                          <button onClick={() => updateContent({ partners: [...content.partners, { id: `partner-${Date.now()}`, name: 'New Partner', shortName: 'Partner', logo: '', website: '', visible: true }] })} className="px-3 py-2 bg-[#007BC4] rounded-lg text-xs font-bold text-white flex items-center gap-1"><Plus className="w-3 h-3" /> Add Partner</button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {content.partners.map((partner, index) => (
                            <div key={partner.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                              <ImageFieldWithUpload label="Partner logo" value={partner.logo} onChange={(value) => updateArrayItem('partners', index, { logo: value })} onNotify={triggerSaveStatus} />
                              <input value={partner.name} onChange={(e) => updateArrayItem('partners', index, { name: e.target.value })} placeholder="Partner name" className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                              <div className="grid grid-cols-2 gap-2">
                                <input value={partner.shortName} onChange={(e) => updateArrayItem('partners', index, { shortName: e.target.value })} placeholder="Short name" className="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                                <input value={partner.website} onChange={(e) => updateArrayItem('partners', index, { website: e.target.value })} placeholder="Website URL" className="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                              </div>
                              <div className="flex justify-between">
                                <label className="flex items-center gap-2 text-[11px] text-slate-300"><input type="checkbox" checked={partner.visible} onChange={(e) => updateArrayItem('partners', index, { visible: e.target.checked })} className="accent-[#7DC242]" /> Visible</label>
                                <button onClick={() => updateContent({ partners: content.partners.filter((_, itemIndex) => itemIndex !== index) })} className="text-rose-400 text-xs flex items-center gap-1"><Trash2 className="w-3 h-3" /> Remove</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-3">
                          <h4 className="text-xs font-bold text-[#7DC242] uppercase tracking-wider">Footer Editor</h4>
                          <ImageFieldWithUpload label="Footer background" value={content.footerSettings.backgroundImage} onChange={(value) => updateContent({ footerSettings: { ...content.footerSettings, backgroundImage: value } })} onNotify={triggerSaveStatus} />
                          {(['description', 'exploreTitle', 'newsletterTitle', 'newsletterText', 'copyrightText'] as const).map((field) => (
                            <textarea key={field} rows={field === 'description' ? 2 : 1} value={content.footerSettings[field]} onChange={(e) => updateContent({ footerSettings: { ...content.footerSettings, [field]: e.target.value } })} placeholder={field} className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                          ))}
                        </div>

                        <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-3">
                          <h4 className="text-xs font-bold text-[#7DC242] uppercase tracking-wider">Global Website Settings</h4>
                          <select value={content.siteFeatures.language} onChange={(e) => updateContent({ siteFeatures: { ...content.siteFeatures, language: e.target.value } })} className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white">
                            <option>English</option><option>Luganda</option><option>Swahili</option>
                          </select>
                          {[
                            ['maintenanceMode', 'Maintenance mode'],
                            ['cookieNotice', 'Cookie notice'],
                            ['searchEnabled', 'Website search'],
                          ].map(([field, label]) => (
                            <label key={field} className="flex justify-between items-center bg-slate-900 rounded-xl p-3 text-xs text-white">
                              {label}
                              <input type="checkbox" checked={(content.siteFeatures as any)[field]} onChange={(e) => updateContent({ siteFeatures: { ...content.siteFeatures, [field]: e.target.checked } })} className="accent-[#7DC242]" />
                            </label>
                          ))}
                          {(['analyticsId', 'facebookUrl', 'instagramUrl', 'youtubeUrl'] as const).map((field) => (
                            <input key={field} value={content.siteFeatures[field]} onChange={(e) => updateContent({ siteFeatures: { ...content.siteFeatures, [field]: e.target.value } })} placeholder={field} className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* WEBSITE PAGES COPY */}
                  {activeTab === 'pages' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <FileText className="w-5 h-5 text-[#007BC4]" />
                          <span>Website Pages Text Content</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Edit text for Hero, About Us, Strategic Pillars, and Contact sections in real-time.
                        </p>
                      </div>

                      {/* HERO SECTION */}
                      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
                        <span className="text-xs font-bold text-[#7DC242] uppercase tracking-wider block border-b border-slate-800 pb-2">
                          1. Homepage Hero Banner
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">Hero Title (Part 1)</label>
                            <input 
                              type="text"
                              value={content.heroTitle1}
                              onChange={(e) => handleTextChange('heroTitle1', e.target.value)}
                              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-[#007BC4]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">Hero Highlight Phrase (In Brackets)</label>
                            <input 
                              type="text"
                              value={content.heroTitle2}
                              onChange={(e) => handleTextChange('heroTitle2', e.target.value)}
                              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-[#007BC4]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300">Hero Subtitle Paragraph</label>
                          <textarea 
                            rows={3}
                            value={content.heroDescription}
                            onChange={(e) => handleTextChange('heroDescription', e.target.value)}
                            className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                          />
                        </div>

                        <ImageFieldWithUpload 
                          label="Hero Section Background Image"
                          value={content.heroImage || ''}
                          onChange={(val) => handleTextChange('heroImage', val)}
                          onNotify={triggerSaveStatus}
                          placeholder="Upload background image from computer or paste URL..."
                          badge="Background Image"
                        />
                      </div>

                      {/* ABOUT SECTION */}
                      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
                        <span className="text-xs font-bold text-[#7DC242] uppercase tracking-wider block border-b border-slate-800 pb-2">
                          2. About Us Section
                        </span>

                        <ImageFieldWithUpload 
                          label="About Us Header / Hero Background Image"
                          value={content.aboutHeaderBgImage || ''}
                          onChange={(val) => handleTextChange('aboutHeaderBgImage', val)}
                          onNotify={triggerSaveStatus}
                          placeholder="Upload background image from computer or paste URL..."
                          badge="Header Background"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">Tagline</label>
                            <input 
                              type="text"
                              value={content.aboutTagline}
                              onChange={(e) => handleTextChange('aboutTagline', e.target.value)}
                              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">Heading Title</label>
                            <input 
                              type="text"
                              value={content.aboutTitle}
                              onChange={(e) => handleTextChange('aboutTitle', e.target.value)}
                              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-[#007BC4]"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">About Paragraph 1</label>
                            <textarea 
                              rows={3}
                              value={content.aboutParagraph1}
                              onChange={(e) => handleTextChange('aboutParagraph1', e.target.value)}
                              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">About Paragraph 2</label>
                            <textarea 
                              rows={3}
                              value={content.aboutParagraph2}
                              onChange={(e) => handleTextChange('aboutParagraph2', e.target.value)}
                              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">Mission Statement</label>
                            <textarea 
                              rows={2}
                              value={content.aboutMissionText}
                              onChange={(e) => handleTextChange('aboutMissionText', e.target.value)}
                              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">Vision Statement</label>
                            <textarea 
                              rows={2}
                              value={content.aboutVisionText}
                              onChange={(e) => handleTextChange('aboutVisionText', e.target.value)}
                              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: SERVICES & PROGRAMS */}
                  {activeTab === 'services' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-[#007BC4]" />
                            <span>Services & Key Intervention Programs</span>
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">
                            Edit every programme, governance, policy and impact entry shown in the complete website reference.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleAddService}
                          className="px-3.5 py-2 bg-[#007BC4] hover:bg-[#005a92] text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add New Service</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {content.services.map((srv, idx) => (
                          <div key={srv.id} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3 relative">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-[#7DC242] uppercase tracking-wider font-mono">
                                Service #{idx + 1} ({srv.category})
                              </span>

                              <button
                                type="button"
                                onClick={() => handleRemoveService(srv.id)}
                                className="text-red-400 hover:text-red-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-slate-300">Service Title</label>
                                <input 
                                  type="text"
                                  value={srv.title}
                                  onChange={(e) => handleUpdateService(srv.id, 'title', e.target.value)}
                                  className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-[#007BC4]"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-slate-300">Category Tag</label>
                                <input 
                                  type="text"
                                  value={srv.category}
                                  onChange={(e) => handleUpdateService(srv.id, 'category', e.target.value)}
                                  className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-slate-300">Description</label>
                              <textarea 
                                rows={2}
                                value={srv.description}
                                onChange={(e) => handleUpdateService(srv.id, 'description', e.target.value)}
                                className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: PRODUCTS / TRAVEL & VOLUNTEER PACKAGES */}
                  {activeTab === 'packages' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <HeartHandshake className="w-5 h-5 text-[#007BC4]" />
                            <span>Travel & Volunteer Programs / Packages</span>
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">
                            Manage volunteer packages, durations, costs, and images.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleAddPackage}
                          className="px-3.5 py-2 bg-[#007BC4] hover:bg-[#005a92] text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add New Package</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {content.packages.map((pkg, idx) => (
                          <div key={pkg.id} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                              <span className="text-xs font-bold text-[#7DC242] uppercase tracking-wider font-mono">
                                Package #{idx + 1}: {pkg.title}
                              </span>

                              <button
                                type="button"
                                onClick={() => handleRemovePackage(pkg.id)}
                                className="text-red-400 hover:text-red-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-slate-300">Package Title</label>
                                <input 
                                  type="text"
                                  value={pkg.title}
                                  onChange={(e) => handleUpdatePackage(pkg.id, 'title', e.target.value)}
                                  className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-[#007BC4]"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-slate-300">Duration</label>
                                <input 
                                  type="text"
                                  value={pkg.duration}
                                  onChange={(e) => handleUpdatePackage(pkg.id, 'duration', e.target.value)}
                                  className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-slate-300">Cost / Fee</label>
                                <input 
                                  type="text"
                                  value={pkg.cost}
                                  onChange={(e) => handleUpdatePackage(pkg.id, 'cost', e.target.value)}
                                  className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold text-[#7DC242] focus:outline-none focus:border-[#007BC4]"
                                />
                              </div>
                                               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="md:col-span-2">
                                <ImageFieldWithUpload 
                                  label="Package Cover Image"
                                  value={pkg.image}
                                  onChange={(val) => handleUpdatePackage(pkg.id, 'image', val)}
                                  onNotify={triggerSaveStatus}
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-slate-300">Location</label>
                                <input 
                                  type="text"
                                  value={pkg.location}
                                  onChange={(e) => handleUpdatePackage(pkg.id, 'location', e.target.value)}
                                  className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                                />
                              </div>
                            </div>            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-slate-300">Program Overview</label>
                              <textarea 
                                rows={2}
                                value={pkg.description}
                                onChange={(e) => handleUpdatePackage(pkg.id, 'description', e.target.value)}
                                className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 5: BLOG POSTS & NEWS */}
                  {activeTab === 'blog' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Newspaper className="w-5 h-5 text-[#007BC4]" />
                            <span>Blog Posts & News Updates</span>
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">
                            Publish news articles, press releases, and community updates.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleAddBlogPost}
                          className="px-3.5 py-2 bg-[#007BC4] hover:bg-[#005a92] text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Publish New Article</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {content.blogPosts.map((post, idx) => (
                          <div key={post.id} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                              <span className="text-xs font-bold text-[#7DC242] uppercase tracking-wider font-mono">
                                Article #{idx + 1}: {post.title}
                              </span>

                              <button
                                type="button"
                                onClick={() => handleRemoveBlogPost(post.id)}
                                className="text-red-400 hover:text-red-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-slate-300">Article Title</label>
                                <input 
                                  type="text"
                                  value={post.title}
                                  onChange={(e) => handleUpdateBlogPost(post.id, 'title', e.target.value)}
                                  className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-[#007BC4]"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-slate-300">Category</label>
                                <input 
                                  type="text"
                                  value={post.category}
                                  onChange={(e) => handleUpdateBlogPost(post.id, 'category', e.target.value)}
                                  className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                                />
                              </div>
                                               <div className="space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-[11px] font-semibold text-slate-300">Author</label>
                                  <input 
                                    type="text"
                                    value={post.author}
                                    onChange={(e) => handleUpdateBlogPost(post.id, 'author', e.target.value)}
                                    className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[11px] font-semibold text-slate-300">Publish Date</label>
                                  <input 
                                    type="date"
                                    value={post.date}
                                    onChange={(e) => handleUpdateBlogPost(post.id, 'date', e.target.value)}
                                    className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                                  />
                                </div>
                              </div>

                              <ImageFieldWithUpload 
                                label="Featured Article Image"
                                value={post.image}
                                onChange={(val) => handleUpdateBlogPost(post.id, 'image', val)}
                                onNotify={triggerSaveStatus}
                              />
                            </div>            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-slate-300">Article Summary</label>
                              <textarea 
                                rows={2}
                                value={post.summary}
                                onChange={(e) => handleUpdateBlogPost(post.id, 'summary', e.target.value)}
                                className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 6: MEDIA GALLERY & SECTION BACKGROUNDS */}
                  {activeTab === 'gallery' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Image className="w-5 h-5 text-[#007BC4]" />
                          <span>Media Library & Background Banners</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Upload images from your local computer, manage section background banners, and curate photo galleries.
                        </p>
                      </div>

                      {/* LOCAL COMPUTER DROPZONE & BATCH UPLOADER */}
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setIsDraggingLocal(true); }}
                        onDragLeave={(e) => { e.preventDefault(); setIsDraggingLocal(false); }}
                        onDrop={handleDropLocalFiles}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center space-y-3 transition-all ${
                          isDraggingLocal 
                            ? 'border-[#7DC242] bg-[#7DC242]/10 scale-[1.01]' 
                            : 'border-[#007BC4]/50 hover:border-[#007BC4] bg-slate-950/80'
                        }`}
                      >
                        <div className="w-12 h-12 bg-[#007BC4]/20 text-[#007BC4] rounded-2xl flex items-center justify-center mx-auto border border-[#007BC4]/30 shadow-inner">
                          <UploadCloud className="w-6 h-6 text-[#7DC242]" />
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-bold text-white flex items-center justify-center gap-2">
                            <span>Upload Images From Your Local Computer</span>
                            <span className="text-[10px] bg-[#7DC242]/20 text-[#7DC242] px-2 py-0.5 rounded-full border border-[#7DC242]/30 font-mono">
                              Local Computer Drag & Drop
                            </span>
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto">
                            Drag & drop image files (.png, .jpg, .webp, .svg) directly from your computer into the editor or click the button below to browse local files.
                          </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 pt-2">
                          <label className="px-4 py-2.5 bg-[#007BC4] hover:bg-[#005a92] text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg hover:shadow-cyan-500/20 border border-sky-400/30">
                            <Upload className="w-4 h-4 text-[#7DC242]" />
                            <span>Select Local Files From Computer</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              multiple 
                              className="hidden" 
                              onChange={handleBatchLocalFileUpload} 
                            />
                          </label>
                        </div>
                      </div>

                      {/* HERO BG */}
                      <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-[#7DC242] uppercase tracking-wider">Hero Section Background Banner</span>
                          <span className="text-[10px] text-slate-400 font-mono">Homepage Main Banner</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-slate-700 bg-slate-800">
                            <img src={content.heroImage} alt="Hero BG" className="w-full h-full object-cover" />
                          </div>

                          <div className="md:col-span-2">
                            <ImageFieldWithUpload 
                              label="Hero Banner Background" 
                              value={content.heroImage} 
                              onChange={(val) => handleTextChange('heroImage', val)} 
                              onNotify={triggerSaveStatus} 
                              badge="Active"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Stock photo presets */}
                      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-4 space-y-3">
                        <span className="text-xs font-bold text-slate-300 block">Preset Sample Banners (Click to Set as Hero):</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                          {SUGGESTED_IMAGES.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                updateContent({ heroImage: img.url });
                                triggerSaveStatus(`Hero image set to ${img.title}!`);
                              }}
                              className="group relative rounded-lg overflow-hidden border border-slate-700 hover:border-[#007BC4] aspect-video transition-all cursor-pointer"
                            >
                              <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1">
                                <span className="text-[9px] font-bold text-white text-center">{img.title}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Add Gallery Photo Form */}
                      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
                        <span className="text-xs font-bold text-[#7DC242] uppercase tracking-wider block border-b border-slate-800 pb-2">
                          Single Photo Add / Web Link
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ImageFieldWithUpload 
                            label="Photo Image"
                            value={newPhotoUrl}
                            onChange={(val) => setNewPhotoUrl(val)}
                            onNotify={triggerSaveStatus}
                            placeholder="Upload local image or paste URL..."
                          />

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">Caption / Title</label>
                            <input 
                              type="text"
                              placeholder="e.g. Youth sports finals in Kitintale."
                              value={newPhotoCaption}
                              onChange={(e) => setNewPhotoCaption(e.target.value)}
                              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddPhoto(newPhotoUrl, newPhotoCaption)}
                          className="px-4 py-2 bg-[#007BC4] hover:bg-[#005a92] text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Photo to Media Library</span>
                        </button>
                      </div>

                      {/* Active Gallery Photos */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-300 block">
                            Active Media Library Photos ({content.galleryImages.length})
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Click 'Set as Hero' to apply any photo to your main banner
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {content.galleryImages.map((img) => (
                            <div key={img.id} className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 space-y-2 flex flex-col justify-between">
                              <div className="aspect-video rounded-lg overflow-hidden bg-slate-800 relative group">
                                <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                                {img.url.startsWith('data:') && (
                                  <span className="absolute top-1.5 left-1.5 bg-[#7DC242] text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded shadow font-mono">
                                    Local Upload
                                  </span>
                                )}
                              </div>
                              <input
                                value={img.caption}
                                onChange={(event) => handleUpdatePhoto(img.id, { caption: event.target.value })}
                                aria-label={`Caption for ${img.caption}`}
                                className="w-full text-[11px] text-slate-200 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5"
                              />

                              <div className="grid grid-cols-[1fr_auto] gap-1 pt-1 border-t border-slate-800">
                                <select
                                  value=""
                                  onChange={(event) => {
                                    const field = event.target.value;
                                    if (!field) return;
                                    if (field === 'footerBackground') {
                                      updateContent({ footerSettings: { ...content.footerSettings, backgroundImage: img.url } });
                                    } else if (field.startsWith('homeCard:')) {
                                      const cardIndex = Number(field.split(':')[1]);
                                      updateArrayItem('homeCards', cardIndex, { image: img.url });
                                    } else {
                                      handleTextChange(field, img.url);
                                    }
                                    triggerSaveStatus('Section background updated from the media library!');
                                  }}
                                  className="min-w-0 py-1 px-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] font-bold border border-slate-700 cursor-pointer"
                                  aria-label={`Use ${img.caption} as a section background`}
                                >
                                  <option value="">Use as background…</option>
                                  <option value="heroImage">Homepage hero</option>
                                  <option value="aboutHeaderBgImage">About page</option>
                                  <option value="pillarsHeaderBgImage">Programmes page</option>
                                  <option value="impactHeaderBgImage">Impact page</option>
                                  <option value="partnersHeaderBgImage">Partners page</option>
                                  <option value="opportunitiesHeaderBgImage">Opportunities page</option>
                                  <option value="contactHeaderBgImage">Contact page</option>
                                  <option value="footerBackground">Website footer</option>
                                  {content.homeCards.map((card, cardIndex) => <option key={card.id} value={`homeCard:${cardIndex}`}>Homepage card: {card.title}</option>)}
                                </select>
                                <button
                                  type="button"
                                  onClick={() => handleRemovePhoto(img.id)}
                                  className="py-1 px-2 bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-white rounded text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center"
                                  aria-label={`Delete ${img.caption}`}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 7: TESTIMONIALS */}
                  {activeTab === 'testimonials' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-[#007BC4]" />
                            <span>Testimonials & Success Quotes</span>
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">
                            Manage quotes from partners, youth, and volunteers.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleAddTestimonial}
                          className="px-3.5 py-2 bg-[#007BC4] hover:bg-[#005a92] text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Testimonial</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {content.testimonials.map((t, idx) => (
                          <div key={t.id} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                              <span className="text-xs font-bold text-[#7DC242] uppercase tracking-wider font-mono">
                                Testimonial #{idx + 1}: {t.name}
                              </span>

                              <button
                                type="button"
                                onClick={() => handleRemoveTestimonial(t.id)}
                                className="text-red-400 hover:text-red-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-slate-300">Person Name</label>
                                <input 
                                  type="text"
                                  value={t.name}
                                  onChange={(e) => handleUpdateTestimonial(t.id, 'name', e.target.value)}
                                  className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-[#007BC4]"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-slate-300">Role / Title</label>
                                <input 
                                  type="text"
                                  value={t.role}
                                  onChange={(e) => handleUpdateTestimonial(t.id, 'role', e.target.value)}
                                  className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                                />
                              </div>
                            </div>

                            <ImageFieldWithUpload 
                              label="Avatar Image"
                              value={t.avatar}
                              onChange={(val) => handleUpdateTestimonial(t.id, 'avatar', val)}
                              onNotify={triggerSaveStatus}
                            />

                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-slate-300">Quote Comment</label>
                              <textarea 
                                rows={2}
                                value={t.comment}
                                onChange={(e) => handleUpdateTestimonial(t.id, 'comment', e.target.value)}
                                className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 8: CONTACT INFORMATION */}
                  {activeTab === 'contact' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <LinkIcon className="w-5 h-5 text-[#007BC4]" />
                          <span>Secretariat Contact & Location Info</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Update address, office telephone numbers, email, and working hours.
                        </p>
                      </div>

                      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
                        <ImageFieldWithUpload
                          label="Contact Page Background Image"
                          value={content.contactHeaderBgImage}
                          onChange={(value) => handleTextChange('contactHeaderBgImage', value)}
                          onNotify={triggerSaveStatus}
                          placeholder="Upload a contact-page background or paste an image URL..."
                          badge="Page Background"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-300">Contact Page Tagline</label>
                            <input
                              type="text"
                              value={content.contactTagline}
                              onChange={(event) => handleTextChange('contactTagline', event.target.value)}
                              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-300">Contact Page Heading</label>
                            <input
                              type="text"
                              value={content.contactTitle}
                              onChange={(event) => handleTextChange('contactTitle', event.target.value)}
                              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-300">Secretariat Office Address</label>
                          <input 
                            type="text"
                            value={content.contactAddress}
                            onChange={(e) => handleTextChange('contactAddress', e.target.value)}
                            className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-300">Official Contact Email</label>
                            <input 
                              type="text"
                              value={content.contactEmail}
                              onChange={(e) => handleTextChange('contactEmail', e.target.value)}
                              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-300">Inquiry Hotline Phone</label>
                            <input 
                              type="text"
                              value={content.contactPhone}
                              onChange={(e) => handleTextChange('contactPhone', e.target.value)}
                              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-300">Working Office Hours</label>
                          <input 
                            type="text"
                            value={content.contactHours}
                            onChange={(e) => handleTextChange('contactHours', e.target.value)}
                            className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#007BC4]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 9: SEO SETTINGS */}
                  {activeTab === 'seo' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Search className="w-5 h-5 text-[#00c7b7]" />
                          <span>SEO Meta Titles, Descriptions & OpenGraph Social Cards</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Configure search engine metadata, page titles, OpenGraph image cards, and keywords for search ranking.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* SEO INPUTS FORM */}
                        <div className="bg-[#1b2533] border border-[#2d3a4e] rounded-2xl p-5 space-y-4">
                          <h4 className="text-xs font-black text-[#00c7b7] uppercase tracking-wider border-b border-[#2d3a4e] pb-2.5 flex items-center justify-between">
                            <span>Metadata Configuration</span>
                            <span className="text-[10px] bg-[#00c7b7]/10 text-[#00c7b7] px-2 py-0.5 rounded font-mono border border-[#00c7b7]/30">
                              HTML Head Tags
                            </span>
                          </h4>

                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <label className="font-bold text-slate-300">Page Meta Title</label>
                              <span className={`text-[10px] font-mono ${
                                (content.seoSettings?.metaTitle?.length || 0) > 60 ? 'text-amber-400' : 'text-slate-400'
                              }`}>
                                {content.seoSettings?.metaTitle?.length || 0} / 60 chars
                              </span>
                            </div>
                            <input 
                              type="text"
                              value={content.seoSettings?.metaTitle || ''}
                              onChange={(e) => handleSeoChange('metaTitle', e.target.value)}
                              placeholder="e.g. Partners in Community Development Uganda (PID) - Empowering Youth & Women"
                              className="w-full text-xs bg-[#0f172a] border border-[#334155] rounded-xl px-3.5 py-2.5 text-white font-semibold focus:outline-none focus:border-[#00c7b7]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <label className="font-bold text-slate-300">Page Meta Description</label>
                              <span className={`text-[10px] font-mono ${
                                (content.seoSettings?.metaDescription?.length || 0) > 160 ? 'text-amber-400' : 'text-slate-400'
                              }`}>
                                {content.seoSettings?.metaDescription?.length || 0} / 160 chars
                              </span>
                            </div>
                            <textarea 
                              rows={3}
                              value={content.seoSettings?.metaDescription || ''}
                              onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
                              placeholder="e.g. PID Uganda is an indigenous non-profit empowering rural youth and women through vocational skills, sports, environmental stewardship, and community health."
                              className="w-full text-xs bg-[#0f172a] border border-[#334155] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00c7b7] leading-relaxed"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-300">SEO Keywords (Comma Separated)</label>
                            <input 
                              type="text"
                              value={content.seoSettings?.keywords || ''}
                              onChange={(e) => handleSeoChange('keywords', e.target.value)}
                              placeholder="e.g. PID Uganda, NGO Kampala, Youth Empowerment, Community Development, Volunteer Uganda"
                              className="w-full text-xs bg-[#0f172a] border border-[#334155] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00c7b7]"
                            />
                          </div>

                          <ImageFieldWithUpload 
                            label="OpenGraph Social Share Image (OG:Image)"
                            value={content.seoSettings?.ogImage || ''}
                            onChange={(val) => handleSeoChange('ogImage', val)}
                            onNotify={triggerSaveStatus}
                            placeholder="Upload local image or paste URL..."
                            badge="1200x630 recommended"
                          />
                        </div>

                        {/* LIVE PREVIEW CARDS */}
                        <div className="space-y-5">
                          {/* GOOGLE SEARCH RESULT SNIPPET PREVIEW */}
                          <div className="bg-[#1b2533] border border-[#2d3a4e] rounded-2xl p-5 space-y-3">
                            <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center justify-between border-b border-[#2d3a4e] pb-2">
                              <span>Google Search Snippet Preview</span>
                              <span className="text-[10px] text-slate-400 font-mono">Live Simulation</span>
                            </h4>

                            <div className="bg-white rounded-xl p-4 shadow-md space-y-1 font-sans text-left">
                              <div className="flex items-center gap-1.5 text-xs text-slate-700">
                                <span className="w-4 h-4 rounded-full bg-[#7DC242] flex items-center justify-center text-[10px] font-bold text-slate-900">
                                  P
                                </span>
                                <span className="text-xs text-[#202124] font-medium">https://piduganda.org</span>
                                <span className="text-[10px] text-slate-400">› index.html</span>
                              </div>
                              <h3 className="text-base text-[#1a0dab] hover:underline cursor-pointer font-normal truncate">
                                {content.seoSettings?.metaTitle || `${content.siteTitle} - ${content.siteTagline}`}
                              </h3>
                              <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                                {content.seoSettings?.metaDescription || content.heroDescription}
                              </p>
                            </div>
                          </div>

                          {/* SOCIAL MEDIA OPENGRAPH CARD PREVIEW */}
                          <div className="bg-[#1b2533] border border-[#2d3a4e] rounded-2xl p-5 space-y-3">
                            <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center justify-between border-b border-[#2d3a4e] pb-2">
                              <span>Social Media OpenGraph Card</span>
                              <span className="text-[10px] text-slate-400 font-mono">Twitter / Facebook / WhatsApp</span>
                            </h4>

                            <div className="bg-[#0f172a] border border-[#334155] rounded-xl overflow-hidden shadow-md">
                              <div className="aspect-[1.91/1] w-full bg-slate-800 relative overflow-hidden">
                                {content.seoSettings?.ogImage || content.heroImage ? (
                                  <img 
                                    src={content.seoSettings?.ogImage || content.heroImage} 
                                    alt="OG Preview" 
                                    className="w-full h-full object-cover" 
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-mono">
                                    No Image Provided
                                  </div>
                                )}
                              </div>
                              <div className="p-3.5 space-y-1 bg-[#1e293b]">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                                  piduganda.org
                                </span>
                                <h4 className="text-xs font-bold text-white line-clamp-1">
                                  {content.seoSettings?.metaTitle || `${content.siteTitle} - ${content.siteTagline}`}
                                </h4>
                                <p className="text-[11px] text-slate-300 line-clamp-2">
                                  {content.seoSettings?.metaDescription || content.heroDescription}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 10: ADMINISTRATORS */}
                  {activeTab === 'admins' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Shield className="w-5 h-5 text-[#007BC4]" />
                          <span>Administrators & Permissions</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Manage user accounts with authorization to edit CMS content.
                        </p>
                      </div>

                      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="space-y-3">
                          {content.administrators.map((adm) => (
                            <div key={adm.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#007BC4] text-white flex items-center justify-center font-bold text-sm">
                                  {adm.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-white block">{adm.name} ({adm.username})</span>
                                  <span className="text-[10px] text-slate-400 block">{adm.email} • {adm.role}</span>
                                </div>
                              </div>

                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
                                {adm.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* FORMS & MESSAGES INBOX */}
                  {activeTab === 'inbox' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-white flex items-center gap-2"><MessageSquare className="w-5 h-5 text-[#7DC242]" /> Forms & Messages Inbox</h3>
                          <p className="text-xs text-slate-400 mt-1">Contact enquiries, volunteer forms, internship applications and fundraiser registrations.</p>
                        </div>
                        <button onClick={() => setLocalDataVersion((value) => value + 1)} className="px-3 py-2 bg-slate-800 rounded-xl text-xs font-bold flex items-center gap-2"><RefreshCw className="w-3 h-3" /> Refresh</button>
                      </div>
                      {readInbox().length === 0 ? (
                        <div className="p-10 text-center bg-slate-950/50 border border-slate-800 rounded-2xl text-sm text-slate-400">No messages have been received on this device yet.</div>
                      ) : readInbox().map((item: any) => (
                        <div key={item.id} className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7DC242]">{item.type}</span>
                              <h4 className="text-sm font-bold text-white mt-1">{item.name}</h4>
                              <p className="text-xs text-sky-300">{item.email}</p>
                            </div>
                            <div className="flex gap-2">
                              <select value={item.status} onChange={(e) => setInboxStatus(item.id, e.target.value)} className="text-xs bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-white">
                                <option>New</option><option>Replied</option><option>Archived</option>
                              </select>
                              <button onClick={() => hideInboxItem(item.id)} className="p-2 text-rose-400 bg-rose-950/30 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 rounded-xl p-3">{item.message || item.subject || item.details}</p>
                          <span className="text-[10px] text-slate-500">{item.date}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* DONATION MANAGER */}
                  {activeTab === 'donations' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#7DC242]" /> Donation Manager</h3>
                        <p className="text-xs text-slate-400 mt-1">Configure campaign information and maintain a local donation register.</p>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-3">
                          <h4 className="text-xs font-bold text-[#7DC242] uppercase tracking-wider">Campaign Settings</h4>
                          <input value={content.donationSettings.campaignTitle} onChange={(e) => updateContent({ donationSettings: { ...content.donationSettings, campaignTitle: e.target.value } })} placeholder="Campaign title" className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                          <div className="grid grid-cols-2 gap-3">
                            <input value={content.donationSettings.currency} onChange={(e) => updateContent({ donationSettings: { ...content.donationSettings, currency: e.target.value } })} placeholder="Currency" className="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                            <input type="number" value={content.donationSettings.goal} onChange={(e) => updateContent({ donationSettings: { ...content.donationSettings, goal: Number(e.target.value) } })} placeholder="Campaign goal" className="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                          </div>
                          <input value={content.donationSettings.suggestedAmounts.join(', ')} onChange={(e) => updateContent({ donationSettings: { ...content.donationSettings, suggestedAmounts: e.target.value.split(',').map((value) => Number(value.trim())).filter(Boolean) } })} placeholder="Suggested amounts" className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                          <input value={content.donationSettings.mobileMoney} onChange={(e) => updateContent({ donationSettings: { ...content.donationSettings, mobileMoney: e.target.value } })} placeholder="Mobile Money number" className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                          <textarea value={content.donationSettings.bankDetails} onChange={(e) => updateContent({ donationSettings: { ...content.donationSettings, bankDetails: e.target.value } })} rows={3} placeholder="Bank instructions" className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                        </div>
                        <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-3">
                          <h4 className="text-xs font-bold text-[#7DC242] uppercase tracking-wider">Record a Donation</h4>
                          <input value={donorName} onChange={(e) => setDonorName(e.target.value)} placeholder="Donor name" className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                          <input type="number" value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} placeholder={`Amount (${content.donationSettings.currency})`} className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                          <button onClick={addDonationRecord} className="w-full px-4 py-2.5 bg-[#007BC4] rounded-xl text-xs font-bold text-white">Add Donation Record</button>
                        </div>
                      </div>
                      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl overflow-hidden">
                        {readDonations().length === 0 ? <p className="p-6 text-xs text-slate-400">No donation records yet.</p> : readDonations().map((record: any) => (
                          <div key={record.id} className="grid grid-cols-3 gap-3 p-4 border-b border-slate-800 text-xs">
                            <span className="text-white font-bold">{record.donor}</span>
                            <span className="text-[#7DC242] font-mono">{content.donationSettings.currency} {Number(record.amount).toLocaleString()}</span>
                            <span className="text-slate-400 text-right">{record.date}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-amber-300 bg-amber-950/30 border border-amber-800/40 rounded-xl p-3">Actual card or Mobile Money payments require a verified payment provider. This panel currently manages campaign copy and locally recorded donations.</p>
                    </motion.div>
                  )}

                  {/* PUBLISHING & REVISION HISTORY */}
                  {activeTab === 'publishing' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2"><History className="w-5 h-5 text-[#7DC242]" /> Publishing & Revision History</h3>
                        <p className="text-xs text-slate-400 mt-1">Create drafts, capture publish checkpoints and restore earlier template versions.</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button onClick={() => createRevision('Draft')} className="p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Save Draft Revision</button>
                        <button onClick={() => createRevision('Published')} className="p-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2"><UploadCloud className="w-4 h-4" /> Publish Checkpoint</button>
                        <button onClick={exportContentJson} className="p-4 bg-[#007BC4] hover:bg-[#00629c] rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2"><Download className="w-4 h-4" /> Export Backup</button>
                      </div>
                      <div className="space-y-3">
                        {readRevisions().length === 0 ? <div className="p-8 text-center bg-slate-950/50 border border-slate-800 rounded-2xl text-xs text-slate-400">No revisions saved yet.</div> : readRevisions().map((revision: any) => (
                          <div key={revision.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/50 border border-slate-800 rounded-2xl p-4">
                            <div><strong className="text-sm text-white">{revision.status}</strong><span className="block text-[11px] text-slate-400 mt-1">{revision.date}</span></div>
                            <button onClick={() => { updateContent(revision.snapshot); triggerSaveStatus('Revision restored.'); }} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-white">Restore This Version</button>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-sky-200 bg-sky-950/40 border border-sky-800/50 rounded-xl p-3">These revisions are stored on this device. Automatic public deployment and multi-user history become available after connecting an online CMS.</p>
                    </motion.div>
                  )}

                  {/* TEMPLATE & APPEARANCE */}
                  {activeTab === 'appearance' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Palette className="w-5 h-5 text-[#7DC242]" />
                          <span>Template & Appearance Studio</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Change the website interface, colour system, type scale, glass effect and corner style without coding.
                        </p>
                      </div>

                      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-5">
                        <div>
                          <h4 className="text-xs font-bold text-[#7DC242] uppercase tracking-wider">Interface Template</h4>
                          <p className="text-[11px] text-slate-400 mt-1">Changes appear instantly on the public website.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {[
                            { id: 'macos', title: 'macOS Glass', desc: 'Translucent navigation, soft depth and polished glass surfaces.', icon: Monitor },
                            { id: 'android16', title: 'Android 16', desc: 'Material-style colour, large touch controls and expressive shapes.', icon: Smartphone },
                            { id: 'classic', title: 'Classic NGO', desc: 'A simpler professional layout with restrained effects.', icon: Layout },
                          ].map((style) => {
                            const Icon = style.icon;
                            const selected = content.uiStyle === style.id;
                            return (
                              <button
                                key={style.id}
                                type="button"
                                onClick={() => handleTextChange('uiStyle', style.id)}
                                className={`p-4 rounded-2xl border text-left transition-all ${
                                  selected
                                    ? 'bg-[#003366] border-[#7DC242] shadow-lg'
                                    : 'bg-slate-900 border-slate-700 hover:border-[#007BC4]'
                                }`}
                              >
                                <Icon className={`w-5 h-5 ${selected ? 'text-[#7DC242]' : 'text-sky-300'}`} />
                                <span className="block text-sm font-bold text-white mt-3">{style.title}</span>
                                <span className="block text-[11px] text-slate-400 mt-1 leading-relaxed">{style.desc}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
                          <h4 className="text-xs font-bold text-[#7DC242] uppercase tracking-wider">Brand Colour Preset</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { id: 'olive', label: 'PID Blue & Green', colors: ['#003366', '#007BC4', '#7DC242'] },
                              { id: 'blue', label: 'Ocean Blue', colors: ['#0F172A', '#1D4ED8', '#0EA5E9'] },
                              { id: 'earth', label: 'Warm Earth', colors: ['#78350F', '#D97706', '#FDE68A'] },
                              { id: 'noir', label: 'Night Mode', colors: ['#020617', '#38BDF8', '#4ADE80'] },
                            ].map((theme) => (
                              <button
                                key={theme.id}
                                type="button"
                                onClick={() => handleTextChange('theme', theme.id)}
                                className={`p-3 rounded-xl border text-left ${content.theme === theme.id ? 'border-[#7DC242] bg-slate-800' : 'border-slate-700 bg-slate-900'}`}
                              >
                                <span className="flex gap-1.5 mb-2">
                                  {theme.colors.map((color) => <span key={color} className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: color }} />)}
                                </span>
                                <span className="text-[11px] font-bold text-white">{theme.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-5">
                          <h4 className="text-xs font-bold text-[#7DC242] uppercase tracking-wider">Shape & Accessibility</h4>
                          <label className="block space-y-2">
                            <span className="flex justify-between text-xs text-slate-300">
                              <span>Corner roundness</span>
                              <strong>{content.cornerRadius}px</strong>
                            </span>
                            <input type="range" min="8" max="36" value={content.cornerRadius} onChange={(e) => handleTextChange('cornerRadius', Number(e.target.value))} className="w-full accent-[#7DC242]" />
                          </label>
                          <label className="block space-y-2">
                            <span className="flex justify-between text-xs text-slate-300">
                              <span>Glass blur strength</span>
                              <strong>{content.glassIntensity}px</strong>
                            </span>
                            <input type="range" min="0" max="36" value={content.glassIntensity} onChange={(e) => handleTextChange('glassIntensity', Number(e.target.value))} className="w-full accent-[#007BC4]" />
                          </label>
                          <label className="block space-y-2">
                            <span className="flex justify-between text-xs text-slate-300">
                              <span>Website text size</span>
                              <strong>{content.fontSizePercent}%</strong>
                            </span>
                            <input type="range" min="85" max="120" value={content.fontSizePercent} onChange={(e) => handleTextChange('fontSizePercent', Number(e.target.value))} className="w-full accent-[#7DC242]" />
                          </label>
                          <label className="flex items-center justify-between rounded-xl bg-slate-900 border border-slate-700 p-3">
                            <span>
                              <span className="block text-xs font-bold text-white">Reduce animation</span>
                              <span className="block text-[10px] text-slate-400 mt-0.5">Improves comfort and accessibility.</span>
                            </span>
                            <input type="checkbox" checked={content.reduceMotion} onChange={(e) => handleTextChange('reduceMotion', e.target.checked)} className="w-4 h-4 accent-[#7DC242]" />
                          </label>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-sky-800/60 bg-sky-950/40 p-5">
                        <h4 className="text-sm font-bold text-white">What “100% template editing” includes</h4>
                        <p className="text-xs text-slate-300 leading-relaxed mt-2">
                          Page text, banners, photos, programmes, packages, articles, testimonials, contact details, SEO, branding and appearance are editable here. For edits to publish automatically for every visitor and every device, connect this console to an online CMS and secure media storage.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* DECAP / GIT SETTINGS & IMPORT/EXPORT */}
                  {activeTab === 'settings' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Settings className="w-5 h-5 text-[#007BC4]" />
                          <span>Decap CMS & JSON Configuration Backup</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Import or export the raw siteContent.json structure or copy Decap admin/config.yml for deployment.
                        </p>
                      </div>

                      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
                        <h4 className="text-xs font-bold text-[#7DC242] uppercase tracking-wider border-b border-slate-800 pb-2">
                          Import JSON Configuration File
                        </h4>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-300">Paste JSON Content Structure:</label>
                          <textarea 
                            rows={4}
                            placeholder='{"siteSettings": {...}, "services": [...]}'
                            value={jsonInputText}
                            onChange={(e) => setJsonInputText(e.target.value)}
                            className="w-full text-xs font-mono bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#007BC4]"
                          />

                          <button
                            type="button"
                            onClick={handleImportJson}
                            className="px-4 py-2 bg-[#007BC4] hover:bg-[#005a92] text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Import & Apply JSON</span>
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-3">
                        <h4 className="text-xs font-bold text-[#7DC242] uppercase tracking-wider border-b border-slate-800 pb-2">
                          Generated Decap CMS Configuration (admin/config.yml)
                        </h4>

                        <pre className="p-4 bg-slate-950 rounded-xl text-xs font-mono text-emerald-400 border border-slate-800 overflow-x-auto">
                          {generateDecapConfigYml()}
                        </pre>

                        <button
                          type="button"
                          onClick={handleCopyConfigYml}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer border border-slate-700 flex items-center gap-2"
                        >
                          <Terminal className="w-4 h-4 text-[#007BC4]" />
                          <span>{copiedYml ? 'Copied config.yml!' : 'Copy admin/config.yml'}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                </div>
              </div>
            )}
          </AnimatePresence>

        </div>

        {/* BOTTOM FOOTER STATUS */}
        <div className="px-4 py-2 bg-[#111827] border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Decap CMS / WordPress-Style Engine</span>
            <span>•</span>
            <span>JSON Template Mode</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Access Passcode: <strong>1234</strong></span>
            <button 
              onClick={() => setIsAdminOpen(false)}
              className="text-[#007BC4] hover:underline font-bold"
            >
              Close Console
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
