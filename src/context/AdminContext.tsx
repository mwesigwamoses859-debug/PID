/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { DEFAULT_CONTENT } from '../config/defaultContent';
import { FONT_OPTIONS, BACKGROUNDS, normalizeDesign, fontCss, designLanguage, type DesignSettings } from '../config/design';
import { publicContent, changedSections, uploadEmbeddedImages } from '../lib/publishing';
import { detailedChanges, emptyEditHistory, recordEdit, stepHistory, type ContentChange } from '../lib/editorTools';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon?: string;
}

export interface PackageItem {
  id: string;
  title: string;
  type: string;
  duration: string;
  location: string;
  cost: string;
  description: string;
  image: string;
}

export interface BlogPostItem {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  summary: string;
  image: string;
  readTime: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatar: string;
}

export interface AdministratorUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  visible: boolean;
}

export interface PartnerContentItem {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  website: string;
  visible: boolean;
}

export interface HomeCardItem {
  id: string;
  title: string;
  description: string;
  action: string;
  image: string;
  target: string;
  visible: boolean;
}

export interface FullSiteSchema {
  siteSettings: {
    siteTitle: string;
    siteTagline: string;
    siteLogoUrl?: string;
    announcementText: string;
    theme: 'olive' | 'noir' | 'blue' | 'earth';
    fontSizePercent: number;
    uiStyle?: 'classic' | 'macos' | 'android16';
    glassIntensity?: number;
    cornerRadius?: number;
    reduceMotion?: boolean;
    decapBranch: string;
    decapRepo: string;
  };
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
  };
  pageHero: {
    heroTitle1: string;
    heroTitle2: string;
    heroDescription: string;
    heroImage: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
  };
  pageAbout: {
    aboutHeaderBgImage: string;
    aboutTagline: string;
    aboutTitle: string;
    aboutParagraph1: string;
    aboutParagraph2: string;
    aboutMissionText: string;
    aboutVisionText: string;
  };
  pagePillars: {
    pillarsHeaderBgImage: string;
    pillarsTagline: string;
    pillarsTitle: string;
    pillarsSubtitle: string;
  };
  pageImpact: {
    impactHeaderBgImage: string;
    impactTagline: string;
    impactTitle: string;
    impactSubtitle: string;
  };
  pagePartners: {
    partnersHeaderBgImage: string;
    partnersTagline: string;
    partnersTitle: string;
    partnersSubtitle: string;
  };
  pageOpportunities: {
    opportunitiesHeaderBgImage: string;
    opportunitiesTagline: string;
    opportunitiesTitle: string;
    opportunitiesSubtitle: string;
  };
  services: ServiceItem[];
  packages: PackageItem[];
  blogPosts: BlogPostItem[];
  testimonials: TestimonialItem[];
  contactInfo: {
    contactHeaderBgImage: string;
    contactTagline: string;
    contactTitle: string;
    contactAddress: string;
    contactEmail: string;
    contactPhone: string;
    contactHours: string;
  };
  administrators: AdministratorUser[];
  galleryImages: GalleryImage[];
}

export interface WebContent {
  designSettings: DesignSettings;
  fontSizePercent: number;
  theme: 'olive' | 'noir' | 'blue' | 'earth';
  uiStyle: 'classic' | 'macos' | 'android16';
  glassIntensity: number;
  cornerRadius: number;
  reduceMotion: boolean;
  siteTitle: string;
  siteTagline: string;
  siteLogoUrl?: string;
  announcementText: string;

  // Hero
  heroTitle1: string;
  heroTitle2: string;
  heroDescription: string;
  heroImage: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;

  // About
  aboutHeaderBgImage: string;
  aboutTagline: string;
  aboutTitle: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutMissionText: string;
  aboutMissionDesc?: string;
  aboutVisionText: string;
  aboutVisionDesc?: string;

  // Strategy Pillars
  pillarsHeaderBgImage: string;
  pillarsTagline: string;
  pillarsTitle: string;
  pillarsSubtitle: string;

  // Impact
  impactHeaderBgImage?: string;
  impactTagline?: string;
  impactTitle?: string;
  impactSubtitle?: string;

  // Partners
  partnersHeaderBgImage?: string;
  partnersTagline?: string;
  partnersTitle?: string;
  partnersSubtitle?: string;

  // Opportunities
  opportunitiesHeaderBgImage?: string;
  opportunitiesTagline?: string;
  opportunitiesTitle?: string;
  opportunitiesSubtitle?: string;

  // Contact
  contactHeaderBgImage: string;
  contactTagline: string;
  contactTitle: string;
  contactAddress: string;
  contactEmail: string;
  contactPhone: string;
  contactHours: string;

  // Gallery
  galleryImages: GalleryImage[];

  // Decap / Full Schema extras
  services: ServiceItem[];
  packages: PackageItem[];
  blogPosts: BlogPostItem[];
  testimonials: TestimonialItem[];
  administrators: AdministratorUser[];
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
  };
  decapBranch: string;
  decapRepo: string;
  navigationItems: NavigationItem[];
  partners: PartnerContentItem[];
  homeCards: HomeCardItem[];
  footerSettings: {
    description: string;
    exploreTitle: string;
    newsletterTitle: string;
    newsletterText: string;
    copyrightText: string;
    backgroundImage: string;
  };
  donationSettings: {
    currency: string;
    campaignTitle: string;
    goal: number;
    suggestedAmounts: number[];
    mobileMoney: string;
    bankDetails: string;
  };
  siteFeatures: {
    language: string;
    maintenanceMode: boolean;
    cookieNotice: boolean;
    searchEnabled: boolean;
    analyticsId: string;
    facebookUrl: string;
    instagramUrl: string;
    youtubeUrl: string;
  };
}

const THEME_VARIABLES = {
  olive: {
    '--color-natural-bg': '#FFFFFF',
    '--color-natural-text': '#1F2937',
    '--color-natural-dark': '#003366',
    '--color-natural-olive': '#007BC4',
    '--color-natural-tan': '#7DC242',
    '--color-natural-beige': '#F8FAFC',
    '--color-natural-border': '#E2E8F0',
    '--color-natural-muted': '#64748B',
    '--color-brand-orange': '#EA580C',
    '--color-brand-blue': '#007BC4',
    '--color-brand-green': '#7DC242',
    '--color-dark-slate': '#1F2937',
  },
  noir: {
    '--color-natural-bg': '#0F172A',
    '--color-natural-text': '#F8FAFC',
    '--color-natural-dark': '#020617',
    '--color-natural-olive': '#38BDF8',
    '--color-natural-tan': '#4ADE80',
    '--color-natural-beige': '#1E293B',
    '--color-natural-border': '#334155',
    '--color-natural-muted': '#94A3B8',
    '--color-brand-orange': '#FB923C',
    '--color-brand-blue': '#38BDF8',
    '--color-brand-green': '#4ADE80',
    '--color-dark-slate': '#0F172A',
  },
  blue: {
    '--color-natural-bg': '#FFFFFF',
    '--color-natural-text': '#0F172A',
    '--color-natural-dark': '#0F172A',
    '--color-natural-olive': '#1D4ED8',
    '--color-natural-tan': '#0EA5E9',
    '--color-natural-beige': '#F0F9FF',
    '--color-natural-border': '#BAE6FD',
    '--color-natural-muted': '#64748B',
    '--color-brand-orange': '#F97316',
    '--color-brand-blue': '#1D4ED8',
    '--color-brand-green': '#0EA5E9',
    '--color-dark-slate': '#0F172A',
  },
  earth: {
    '--color-natural-bg': '#FFFBEB',
    '--color-natural-text': '#451A03',
    '--color-natural-dark': '#78350F',
    '--color-natural-olive': '#D97706',
    '--color-natural-tan': '#B45309',
    '--color-natural-beige': '#FEF3C7',
    '--color-natural-border': '#FDE68A',
    '--color-natural-muted': '#92400E',
    '--color-brand-orange': '#D97706',
    '--color-brand-blue': '#B45309',
    '--color-brand-green': '#D97706',
    '--color-dark-slate': '#451A03',
  }
};

interface AdminContextProps {
  content: WebContent;
  updateContent: (newContent: Partial<WebContent>) => void;
  resetToDefault: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthorized: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  exportContentJson: () => void;
  importContentJson: (jsonString: string) => boolean;
  generateDecapConfigYml: () => string;
  liveRevision: number;
  draftRevision: number;
  publishingReady: boolean;
  isPublishing: boolean;
  publishingMessage: string;
  unpublishedSections: string[];
  history: { revision: number; label: string; actor: string; createdAt: string; restoredFrom: number | null }[];
  publishContent: (actor: string, label: string, restoreRevision?: number) => Promise<boolean>;
  refreshPublishing: () => Promise<void>;
  loadRevisionDraft: (revision: number) => Promise<void>;
  discardDraft: () => void;
  canUndo: boolean;
  canRedo: boolean;
  undoEdit: () => void;
  redoEdit: () => void;
  contentChanges: ContentChange[];
  resetContentField: (key: keyof WebContent) => void;

}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContentState] = useState<WebContent>(DEFAULT_CONTENT);
  const contentRef = useRef<WebContent>(DEFAULT_CONTENT);
  const setContent = (next: WebContent) => { contentRef.current = next; setContentState(next); };
  const edits = useRef(emptyEditHistory<WebContent>());
  const [editAvailability, setEditAvailability] = useState({ undo: false, redo: false });
  const syncEditAvailability = () => setEditAvailability({ undo: edits.current.past.length > 0, redo: edits.current.future.length > 0 });
  const clearEdits = () => { edits.current = emptyEditHistory<WebContent>(); syncEditAvailability(); };
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [liveContent, setLiveContent] = useState<WebContent>(DEFAULT_CONTENT);
  const [liveRevision, setLiveRevision] = useState(0);
  const [draftRevision, setDraftRevision] = useState(0);
  const [publishingReady, setPublishingReady] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishingMessage, setPublishingMessage] = useState('');
  const [history, setHistory] = useState<AdminContextProps['history']>([]);
  const liveRef = useRef<WebContent>(DEFAULT_CONTENT);
  const authorizedRef = useRef(false);
  const operationRef = useRef({ signature: '', id: '' });
  const publishingRef = useRef(false);
  const directoryRef = useRef<AdministratorUser[]>([]);
  const unpublishedSections = isAuthorized ? changedSections(content, liveContent) : [];
  const contentChanges = isAuthorized ? detailedChanges(publicContent(liveContent), publicContent(content)) : [];

  const applyLive = (data: any) => {
    const next = { ...DEFAULT_CONTENT, ...data.content, administrators: authorizedRef.current ? directoryRef.current : [], designSettings: normalizeDesign(data.content?.designSettings) } as WebContent;
    liveRef.current = next;
    setLiveContent(next);
    setLiveRevision(data.revision);
    setPublishingReady(data.ready !== false);
    if (Array.isArray(data.history)) setHistory(data.history);
    if (!authorizedRef.current) setContent(next);
    return next;
  };

  const refreshPublishing = async () => {
    try {
      const response = await fetch('/api/admin/content', { cache: 'no-store', credentials: 'same-origin' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not load publishing status.');
      applyLive(data);
    } catch (error) { setPublishingMessage(error instanceof Error ? error.message : 'Could not load publishing status.'); }
  };

  useEffect(() => {
    let active = true;
    const loadPublic = async () => {
      if (authorizedRef.current) return;
      try {
        const response = await fetch('/api/content', { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        if (active && !authorizedRef.current && data.content) applyLive(data);
      } catch { /* Keep the bundled website available when the connection is interrupted. */ }
    };
    void loadPublic();
    const onFocus = () => { void loadPublic(); };
    window.addEventListener('focus', onFocus);
    return () => { active = false; window.removeEventListener('focus', onFocus); };
  }, []);

  // Drafts never replace published content for signed-out visitors.
  useEffect(() => {
    if (!isAuthorized) return;
    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem('pid_draft_v2', JSON.stringify({ content, baseRevision: draftRevision }));
      } catch { setPublishingMessage('Draft storage is full. Export a backup or publish before leaving this page.'); }
    }, 400);
    return () => window.clearTimeout(timer);
  }, [content, draftRevision, isAuthorized]);

  useEffect(() => {
    if (!isAuthorized || unpublishedSections.length === 0) return;
    const beforeLeave = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener('beforeunload', beforeLeave);
    return () => window.removeEventListener('beforeunload', beforeLeave);
  }, [isAuthorized, unpublishedSections.length]);

  // Public typography stays independent of the editor's controls.
  useEffect(() => {
    document.documentElement.style.fontSize = '100%';
    document.documentElement.style.setProperty('--site-type-scale', String((content.fontSizePercent || 100) / 100));
  }, [content.fontSizePercent]);

  // Update HTML CSS custom variables whenever theme changes
  useEffect(() => {
    const activeTheme = content.theme || 'olive';
    const variables = THEME_VARIABLES[activeTheme];
    if (variables) {
      Object.entries(variables).forEach(([key, val]) => {
        document.documentElement.style.setProperty(key, val as string);
      });
    }
  }, [content.theme]);

  // Apply the selected no-code interface template across the public website.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.uiStyle = content.uiStyle || 'macos';
    root.dataset.reduceMotion = content.reduceMotion ? 'true' : 'false';
    root.style.setProperty('--ui-radius', `${content.cornerRadius ?? 22}px`);
    root.style.setProperty('--ui-blur', `${content.glassIntensity ?? 20}px`);
  }, [content.uiStyle, content.cornerRadius, content.glassIntensity, content.reduceMotion]);

  useEffect(() => {
    const root = document.documentElement;
    const settings = normalizeDesign(content.designSettings);
    const language = designLanguage(content.siteFeatures.language);
    root.lang = language.code;
    root.dir = language.code === 'ar' ? 'rtl' : 'ltr';
    root.dataset.backgroundTemplate = settings.backgroundTemplate;
    root.dataset.backgroundCustom = String(settings.backgroundTemplate !== 'clean' || settings.backgroundColor.toUpperCase() !== '#FFFFFF');
    root.dataset.buttonStyle = settings.buttonStyle;
    root.dataset.stickyHeader = String(settings.stickyHeader);
    root.dataset.smoothScroll = String(settings.smoothScroll && !content.reduceMotion);
    root.style.setProperty('--site-body-font', fontCss(settings.bodyFont));
    root.style.setProperty('--site-heading-font', fontCss(settings.headingFont));
    root.style.setProperty('--site-heading-scale', String(settings.headingScale));
    root.style.setProperty('--site-line-height', String(settings.lineHeight));
    root.style.setProperty('--site-letter-spacing', `${settings.letterSpacing}px`);
    root.style.setProperty('--site-content-width', ({ narrow: '64rem', standard: '80rem', wide: '96rem' })[settings.contentWidth] || '80rem');
    root.style.setProperty('--site-section-scale', String(({ compact: 0.75, comfortable: 1, spacious: 1.3 })[settings.sectionSpacing] || 1));
    root.style.setProperty('--site-section-space', ({ compact: '3rem', comfortable: '4rem', spacious: '6rem' })[settings.sectionSpacing] || '4rem');
    root.style.setProperty('--site-background-color', /^#[a-f0-9]{6}$/i.test(settings.backgroundColor) ? settings.backgroundColor : '#FFFFFF');
    const pattern = BACKGROUNDS.find(item => item.id === settings.backgroundTemplate);
    const photo = settings.backgroundTemplate === 'photo' && /^(https:\/\/|\/(images|logos|branding|api\/media)\/)/.test(settings.backgroundImage) ? `linear-gradient(rgb(255 255 255 / ${1 - settings.backgroundStrength / 100}),rgb(255 255 255 / ${1 - settings.backgroundStrength / 100})),url(${JSON.stringify(settings.backgroundImage)})` : '';
    root.style.setProperty('--site-background-image', photo || pattern?.css || 'none');
    const families = [...new Set([settings.bodyFont, settings.headingFont])].map(id => FONT_OPTIONS.find(font => font.id === id)?.family).filter(Boolean);
    let link = document.getElementById('pid-design-fonts') as HTMLLinkElement | null;
    if (!families.length) { link?.remove(); return; }
    if (!link) { link = document.createElement('link'); link.id = 'pid-design-fonts'; link.rel = 'stylesheet'; document.head.appendChild(link); }
    link.href = 'https://fonts.googleapis.com/css2?' + families.map(family => `family=${encodeURIComponent(family!).replace(/%20/g, '+')}:wght@400;700`).join('&') + '&display=swap';
  }, [content.designSettings, content.siteFeatures.language, content.reduceMotion]);

  // Dynamically update document title and head meta tags (SEO / OpenGraph)
  useEffect(() => {
    const pageTitle = content.seoSettings?.metaTitle || `${content.siteTitle} - ${content.siteTagline}`;
    document.title = pageTitle;

    const setMetaTag = (attrName: 'name' | 'property', attrVal: string, contentVal: string) => {
      if (!contentVal) return;
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    setMetaTag('name', 'description', content.seoSettings?.metaDescription || '');
    setMetaTag('name', 'keywords', content.seoSettings?.keywords || '');
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', content.seoSettings?.metaDescription || '');
    setMetaTag('property', 'og:image', content.seoSettings?.ogImage || '');
  }, [content.seoSettings, content.siteTitle, content.siteTagline]);

  const updateContent = (newContent: Partial<WebContent>) => {
    if (!isAuthorized || publishingRef.current) return;
    const previous = contentRef.current;
    const next = { ...previous, ...newContent, administrators: directoryRef.current };
    const keys = Object.keys(newContent);
    if (keys.every(key => JSON.stringify(previous[key]) === JSON.stringify(next[key]))) return;
    edits.current = recordEdit(edits.current, previous, keys.length === 1 ? keys[0] : '');
    setContent(next); syncEditAvailability();
  };

  const navigateEdits = (direction: 'undo' | 'redo') => {
    if (!isAuthorized || publishingRef.current) return;
    const result = stepHistory(edits.current, contentRef.current, direction);
    edits.current = result.state;
    setContent({ ...result.value, administrators: directoryRef.current }); syncEditAvailability();
  };
  const undoEdit = () => navigateEdits('undo');
  const redoEdit = () => navigateEdits('redo');
  const resetContentField = (key: keyof WebContent) => {
    edits.current.group = '';
    updateContent({ [key]: liveRef.current[key] });
  };

  const resetToDefault = () => {
    if (isAuthorized && !isPublishing && window.confirm('Replace your draft with the original website content? The live site stays unchanged until you publish.')) updateContent(DEFAULT_CONTENT);
  };

  const login = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/session', {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }), cache: 'no-store',
      });
      if (!response.ok || (await response.json()).authenticated !== true) return false;
      authorizedRef.current = true;
      const savedDraft = localStorage.getItem('pid_draft_v2');
      const legacyDraft = localStorage.getItem('pid_website_content');
      try {
        const directoryResponse = await fetch('/api/admin/directory', { cache: 'no-store', credentials: 'same-origin' });
        const directory = await directoryResponse.json();
        directoryRef.current = directoryResponse.ok && Array.isArray(directory.administrators) ? directory.administrators : [];
      } catch { directoryRef.current = []; }
      let next = liveRef.current;
      let revision = liveRevision;
      try {
        const status = await fetch('/api/admin/content', { cache: 'no-store', credentials: 'same-origin' });
        const data = await status.json();
        if (status.ok) { next = applyLive(data); revision = data.revision; }
        else setPublishingMessage(data.error || 'Publishing is not available yet.');
      } catch { setPublishingMessage('Could not check publishing status. Your local draft is still available.'); }
      try {
        const saved = savedDraft;
        const legacy = legacyDraft;
        if (saved) {
          const draft = JSON.parse(saved);
          setContent({ ...next, ...draft.content, administrators: directoryRef.current, designSettings: normalizeDesign(draft.content?.designSettings) });
          setDraftRevision(Number.isSafeInteger(draft.baseRevision) ? draft.baseRevision : 0);
        } else if (legacy) {
          const legacyContent = JSON.parse(legacy);
          setContent({ ...next, ...legacyContent, administrators: directoryRef.current, designSettings: normalizeDesign(legacyContent.designSettings) });
          setDraftRevision(0);
        } else { setContent(next); setDraftRevision(revision); }
      } catch { setContent(next); setDraftRevision(revision); }
      clearEdits(); setIsAuthorized(true);
      return true;
    } catch { authorizedRef.current = false; return false; }
  };

  const logout = () => {
    try { localStorage.setItem('pid_draft_v2', JSON.stringify({ content, baseRevision: draftRevision })); } catch {}
    authorizedRef.current = false;
    setIsAuthorized(false);
    setContent({ ...liveRef.current, administrators: [] });
    clearEdits();
    void fetch('/api/admin/session', { method: 'DELETE', credentials: 'same-origin' }).catch(() => {});
  };

  const discardDraft = () => {
    if (!isAuthorized || publishingRef.current) return;
    clearEdits();
    setContent({ ...liveRef.current, administrators: directoryRef.current }); setDraftRevision(liveRevision); setPublishingMessage('Latest live version loaded into your draft.');
    try { localStorage.removeItem('pid_website_content'); localStorage.setItem('pid_draft_v2', JSON.stringify({ content: liveRef.current, baseRevision: liveRevision })); } catch {}
  };

  const loadRevisionDraft = async (revision: number) => {
    if (!isAuthorized || publishingRef.current) return;
    try {
    const response = await fetch(`/api/admin/content?revision=${revision}`, { cache: 'no-store', credentials: 'same-origin' });
    const data = await response.json();
    if (!response.ok) { setPublishingMessage(data.error || 'Could not load this version.'); return; }
    clearEdits();
    setContent({ ...DEFAULT_CONTENT, ...data.content, administrators: directoryRef.current, designSettings: normalizeDesign(data.content?.designSettings) }); setDraftRevision(liveRevision);
    setPublishingMessage(`Version ${revision} loaded for preview. Publish to make it live.`);
    } catch { setPublishingMessage('Could not load that version. Please check your connection.'); }
  };

  const publishContent = async (actor: string, label: string, restoreRevision?: number) => {
    if (!isAuthorized || publishingRef.current) return false;
    publishingRef.current = true;
    setIsPublishing(true); setPublishingMessage('Saving your website update…');
    try {
      const next = restoreRevision === undefined ? await uploadEmbeddedImages(publicContent(content)) : undefined;
      const payload = { expectedRevision: draftRevision, content: next, actor, label, ...(restoreRevision === undefined ? {} : { restoreRevision }) };
      const signature = JSON.stringify(payload);
      if (operationRef.current.signature !== signature) operationRef.current = { signature, id: crypto.randomUUID() };
      const response = await fetch('/api/admin/content', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, operationId: operationRef.current.id }) });
      const data = await response.json();
      if (!response.ok) { if (response.status === 409) await refreshPublishing(); throw new Error(data.error || 'Publishing failed. Your draft is saved.'); }
      const latestResponse = await fetch('/api/admin/content', { cache: 'no-store', credentials: 'same-origin' });
      if (!latestResponse.ok) throw new Error('The update was saved. Refresh publishing status to confirm the live version.');
      const latest = await latestResponse.json();
      const published = applyLive(latest);
      setContent(published); setDraftRevision(latest.revision);
      clearEdits();
      try { localStorage.setItem('pid_draft_v2', JSON.stringify({ content: published, baseRevision: latest.revision })); localStorage.removeItem('pid_website_content'); } catch {}
      operationRef.current = { signature: '', id: '' };
      setPublishingMessage(`Published successfully. Live website version ${data.revision} is available to everyone.`);
      return true;
    } catch (error) { setPublishingMessage(error instanceof Error ? error.message : 'Could not publish. Your draft is saved.'); return false; }
    finally { publishingRef.current = false; setIsPublishing(false); }
  };

  // Recheck the server session while the editor is open; never trust browser storage.
  useEffect(() => {
    if (!isAuthorized) return;
    const checkSession = async () => {
      try {
        const response = await fetch('/api/admin/session', { cache: 'no-store', credentials: 'same-origin' });
        if (!response.ok || (await response.json()).authenticated !== true) { authorizedRef.current = false; setIsAuthorized(false); setContent({ ...liveRef.current, administrators: [] }); }
      } catch { /* A temporary connection failure must not erase an editing session. */ }
    };
    const timer = window.setInterval(checkSession, 60000);
    return () => window.clearInterval(timer);
  }, [isAuthorized]);

  // Export current content as siteContent.json
  const exportContentJson = () => {
    const fullJsonExport = {
      siteSettings: {
        siteTitle: content.siteTitle,
        siteTagline: content.siteTagline,
        siteLogoUrl: content.siteLogoUrl,
        announcementText: content.announcementText,
        theme: content.theme,
        designSettings: content.designSettings,
        fontSizePercent: content.fontSizePercent,
        uiStyle: content.uiStyle,
        glassIntensity: content.glassIntensity,
        cornerRadius: content.cornerRadius,
        reduceMotion: content.reduceMotion,
        decapBranch: content.decapBranch || 'main',
        decapRepo: content.decapRepo || 'pid-uganda/website-cms'
      },
      seoSettings: content.seoSettings,
      pageHero: {
        heroTitle1: content.heroTitle1,
        heroTitle2: content.heroTitle2,
        heroDescription: content.heroDescription,
        heroImage: content.heroImage,
        heroCtaPrimary: content.heroCtaPrimary,
        heroCtaSecondary: content.heroCtaSecondary,
      },
      pageAbout: {
        aboutHeaderBgImage: content.aboutHeaderBgImage,
        aboutTagline: content.aboutTagline,
        aboutTitle: content.aboutTitle,
        aboutParagraph1: content.aboutParagraph1,
        aboutParagraph2: content.aboutParagraph2,
        aboutMissionText: content.aboutMissionText,
        aboutVisionText: content.aboutVisionText,
      },
      pagePillars: {
        pillarsHeaderBgImage: content.pillarsHeaderBgImage,
        pillarsTagline: content.pillarsTagline,
        pillarsTitle: content.pillarsTitle,
        pillarsSubtitle: content.pillarsSubtitle,
      },
      services: content.services,
      packages: content.packages,
      blogPosts: content.blogPosts,
      testimonials: content.testimonials,
      contactInfo: {
        contactHeaderBgImage: content.contactHeaderBgImage,
        contactTagline: content.contactTagline,
        contactTitle: content.contactTitle,
        contactAddress: content.contactAddress,
        contactEmail: content.contactEmail,
        contactPhone: content.contactPhone,
        contactHours: content.contactHours,
      },
      administrators: content.administrators,
      galleryImages: content.galleryImages,
      navigationItems: content.navigationItems,
      partners: content.partners,
      homeCards: content.homeCards,
      footerSettings: content.footerSettings,
      donationSettings: content.donationSettings,
      siteFeatures: content.siteFeatures,
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullJsonExport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "siteContent.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON content string
  const importContentJson = (jsonString: string): boolean => {
    try {
      if (!isAuthorized) return false;
      const parsed = JSON.parse(jsonString);
      if (parsed.siteSettings) {
        const importedContent: WebContent = {
          designSettings: normalizeDesign(parsed.siteSettings.designSettings),
          fontSizePercent: parsed.siteSettings.fontSizePercent || 100,
          theme: parsed.siteSettings.theme || 'olive',
          uiStyle: parsed.siteSettings.uiStyle || content.uiStyle || 'macos',
          glassIntensity: parsed.siteSettings.glassIntensity ?? content.glassIntensity ?? 20,
          cornerRadius: parsed.siteSettings.cornerRadius ?? content.cornerRadius ?? 22,
          reduceMotion: parsed.siteSettings.reduceMotion ?? content.reduceMotion ?? false,
          siteTitle: parsed.siteSettings.siteTitle || content.siteTitle,
          siteTagline: parsed.siteSettings.siteTagline || content.siteTagline,
          siteLogoUrl: parsed.siteSettings.siteLogoUrl || content.siteLogoUrl || '/branding/pid-logo.webp',
          announcementText: parsed.siteSettings.announcementText || content.announcementText,

          heroTitle1: parsed.pageHero?.heroTitle1 || content.heroTitle1,
          heroTitle2: parsed.pageHero?.heroTitle2 || content.heroTitle2,
          heroDescription: parsed.pageHero?.heroDescription || content.heroDescription,
          heroImage: parsed.pageHero?.heroImage || content.heroImage,
          heroCtaPrimary: parsed.pageHero?.heroCtaPrimary || content.heroCtaPrimary,
          heroCtaSecondary: parsed.pageHero?.heroCtaSecondary || content.heroCtaSecondary,

          aboutHeaderBgImage: parsed.pageAbout?.aboutHeaderBgImage || content.aboutHeaderBgImage,
          aboutTagline: parsed.pageAbout?.aboutTagline || content.aboutTagline,
          aboutTitle: parsed.pageAbout?.aboutTitle || content.aboutTitle,
          aboutParagraph1: parsed.pageAbout?.aboutParagraph1 || content.aboutParagraph1,
          aboutParagraph2: parsed.pageAbout?.aboutParagraph2 || content.aboutParagraph2,
          aboutMissionText: parsed.pageAbout?.aboutMissionText || content.aboutMissionText,
          aboutVisionText: parsed.pageAbout?.aboutVisionText || content.aboutVisionText,

          pillarsHeaderBgImage: parsed.pagePillars?.pillarsHeaderBgImage || content.pillarsHeaderBgImage,
          pillarsTagline: parsed.pagePillars?.pillarsTagline || content.pillarsTagline,
          pillarsTitle: parsed.pagePillars?.pillarsTitle || content.pillarsTitle,
          pillarsSubtitle: parsed.pagePillars?.pillarsSubtitle || content.pillarsSubtitle,

          contactHeaderBgImage: parsed.contactInfo?.contactHeaderBgImage || content.contactHeaderBgImage,
          contactTagline: parsed.contactInfo?.contactTagline || content.contactTagline,
          contactTitle: parsed.contactInfo?.contactTitle || content.contactTitle,
          contactAddress: parsed.contactInfo?.contactAddress || content.contactAddress,
          contactEmail: parsed.contactInfo?.contactEmail || content.contactEmail,
          contactPhone: parsed.contactInfo?.contactPhone || content.contactPhone,
          contactHours: parsed.contactInfo?.contactHours || content.contactHours,

          galleryImages: parsed.galleryImages || content.galleryImages,
          services: parsed.services || content.services,
          packages: parsed.packages || content.packages,
          blogPosts: parsed.blogPosts || content.blogPosts,
          testimonials: parsed.testimonials || content.testimonials,
          administrators: directoryRef.current,
          seoSettings: parsed.seoSettings || content.seoSettings,
          decapBranch: parsed.siteSettings?.decapBranch || 'main',
          decapRepo: parsed.siteSettings?.decapRepo || 'pid-uganda/website-cms',
          navigationItems: parsed.navigationItems || content.navigationItems,
          partners: parsed.partners || content.partners,
          homeCards: parsed.homeCards || content.homeCards,
          footerSettings: parsed.footerSettings || content.footerSettings,
          donationSettings: parsed.donationSettings || content.donationSettings,
          siteFeatures: parsed.siteFeatures || content.siteFeatures,
        };

        updateContent(importedContent);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Invalid JSON string provided:', e);
      return false;
    }
  };

  // Generate Decap CMS admin/config.yml representation
  const generateDecapConfigYml = (): string => {
    return `backend:
  name: github
  repo: ${content.decapRepo || 'pid-uganda/website-cms'}
  branch: ${content.decapBranch || 'main'}

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "site_content"
    label: "Website Content JSON"
    files:
      - file: "src/config/siteContent.json"
        label: "Site Content & Page Copy"
        name: "site_content"
        fields:
          - { label: "Site Title", name: "siteTitle", widget: "string" }
          - { label: "Hero Title", name: "heroTitle1", widget: "string" }
          - { label: "Hero Subtitle", name: "heroDescription", widget: "text" }
          - { label: "Hero Image", name: "heroImage", widget: "image" }
          - { label: "About Mission", name: "aboutMissionText", widget: "text" }
          - { label: "Services", name: "services", widget: "list" }
          - { label: "Volunteer Packages", name: "packages", widget: "list" }
          - { label: "Blog Posts", name: "blogPosts", widget: "list" }
          - { label: "Testimonials", name: "testimonials", widget: "list" }
          - { label: "Contact Address", name: "contactAddress", widget: "string" }
`;
  };

  return (
    <AdminContext.Provider
      value={{
        content,
        updateContent,
        resetToDefault,
        isAdminOpen,
        setIsAdminOpen,
        isAuthorized,
        login,
        logout,
        exportContentJson,
        importContentJson,
        generateDecapConfigYml,
        liveRevision, draftRevision, publishingReady, isPublishing, publishingMessage, unpublishedSections,
        history, publishContent, refreshPublishing, loadRevisionDraft, discardDraft,
        canUndo: editAvailability.undo, canRedo: editAvailability.redo, undoEdit, redoEdit, contentChanges, resetContentField
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

