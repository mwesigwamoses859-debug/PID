/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import siteContentDefault from '../config/siteContent.json';

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

const DEFAULT_FULL_SCHEMA = siteContentDefault as unknown as FullSiteSchema;

const DEFAULT_CONTENT: WebContent = {
  fontSizePercent: DEFAULT_FULL_SCHEMA.siteSettings.fontSizePercent || 100,
  theme: DEFAULT_FULL_SCHEMA.siteSettings.theme || 'olive',
  uiStyle: DEFAULT_FULL_SCHEMA.siteSettings.uiStyle || 'macos',
  glassIntensity: DEFAULT_FULL_SCHEMA.siteSettings.glassIntensity ?? 20,
  cornerRadius: DEFAULT_FULL_SCHEMA.siteSettings.cornerRadius ?? 22,
  reduceMotion: DEFAULT_FULL_SCHEMA.siteSettings.reduceMotion ?? false,
  siteTitle: DEFAULT_FULL_SCHEMA.siteSettings.siteTitle,
  siteTagline: DEFAULT_FULL_SCHEMA.siteSettings.siteTagline,
  siteLogoUrl: DEFAULT_FULL_SCHEMA.siteSettings.siteLogoUrl || '/branding/pid-logo.webp',
  announcementText: DEFAULT_FULL_SCHEMA.siteSettings.announcementText,

  heroTitle1: DEFAULT_FULL_SCHEMA.pageHero.heroTitle1,
  heroTitle2: DEFAULT_FULL_SCHEMA.pageHero.heroTitle2,
  heroDescription: DEFAULT_FULL_SCHEMA.pageHero.heroDescription,
  heroImage: DEFAULT_FULL_SCHEMA.pageHero.heroImage,
  heroCtaPrimary: DEFAULT_FULL_SCHEMA.pageHero.heroCtaPrimary,
  heroCtaSecondary: DEFAULT_FULL_SCHEMA.pageHero.heroCtaSecondary,

  aboutHeaderBgImage: DEFAULT_FULL_SCHEMA.pageAbout.aboutHeaderBgImage,
  aboutTagline: DEFAULT_FULL_SCHEMA.pageAbout.aboutTagline,
  aboutTitle: DEFAULT_FULL_SCHEMA.pageAbout.aboutTitle,
  aboutParagraph1: DEFAULT_FULL_SCHEMA.pageAbout.aboutParagraph1,
  aboutParagraph2: DEFAULT_FULL_SCHEMA.pageAbout.aboutParagraph2,
  aboutMissionText: DEFAULT_FULL_SCHEMA.pageAbout.aboutMissionText,
  aboutVisionText: DEFAULT_FULL_SCHEMA.pageAbout.aboutVisionText,

  pillarsHeaderBgImage: DEFAULT_FULL_SCHEMA.pagePillars.pillarsHeaderBgImage,
  pillarsTagline: DEFAULT_FULL_SCHEMA.pagePillars.pillarsTagline,
  pillarsTitle: DEFAULT_FULL_SCHEMA.pagePillars.pillarsTitle,
  pillarsSubtitle: DEFAULT_FULL_SCHEMA.pagePillars.pillarsSubtitle,

  impactHeaderBgImage: DEFAULT_FULL_SCHEMA.pageImpact.impactHeaderBgImage,
  impactTagline: DEFAULT_FULL_SCHEMA.pageImpact.impactTagline,
  impactTitle: DEFAULT_FULL_SCHEMA.pageImpact.impactTitle,
  impactSubtitle: DEFAULT_FULL_SCHEMA.pageImpact.impactSubtitle,

  partnersHeaderBgImage: DEFAULT_FULL_SCHEMA.pagePartners.partnersHeaderBgImage,
  partnersTagline: DEFAULT_FULL_SCHEMA.pagePartners.partnersTagline,
  partnersTitle: DEFAULT_FULL_SCHEMA.pagePartners.partnersTitle,
  partnersSubtitle: DEFAULT_FULL_SCHEMA.pagePartners.partnersSubtitle,

  opportunitiesHeaderBgImage: DEFAULT_FULL_SCHEMA.pageOpportunities.opportunitiesHeaderBgImage,
  opportunitiesTagline: DEFAULT_FULL_SCHEMA.pageOpportunities.opportunitiesTagline,
  opportunitiesTitle: DEFAULT_FULL_SCHEMA.pageOpportunities.opportunitiesTitle,
  opportunitiesSubtitle: DEFAULT_FULL_SCHEMA.pageOpportunities.opportunitiesSubtitle,

  contactHeaderBgImage: DEFAULT_FULL_SCHEMA.contactInfo.contactHeaderBgImage,
  contactTagline: DEFAULT_FULL_SCHEMA.contactInfo.contactTagline,
  contactTitle: DEFAULT_FULL_SCHEMA.contactInfo.contactTitle,
  contactAddress: DEFAULT_FULL_SCHEMA.contactInfo.contactAddress,
  contactEmail: DEFAULT_FULL_SCHEMA.contactInfo.contactEmail,
  contactPhone: DEFAULT_FULL_SCHEMA.contactInfo.contactPhone,
  contactHours: DEFAULT_FULL_SCHEMA.contactInfo.contactHours,

  galleryImages: DEFAULT_FULL_SCHEMA.galleryImages,
  services: DEFAULT_FULL_SCHEMA.services,
  packages: DEFAULT_FULL_SCHEMA.packages,
  blogPosts: DEFAULT_FULL_SCHEMA.blogPosts,
  testimonials: DEFAULT_FULL_SCHEMA.testimonials,
  administrators: DEFAULT_FULL_SCHEMA.administrators,
  seoSettings: DEFAULT_FULL_SCHEMA.seoSettings,
  decapBranch: DEFAULT_FULL_SCHEMA.siteSettings.decapBranch,
  decapRepo: DEFAULT_FULL_SCHEMA.siteSettings.decapRepo,
  navigationItems: [
    { id: 'home', label: 'Home', visible: true },
    { id: 'about', label: 'About Us', visible: true },
    { id: 'strategy', label: 'Our Programs', visible: true },
    { id: 'impact', label: 'Expected Impact', visible: true },
    { id: 'partners', label: 'Our Partners', visible: true },
    { id: 'opportunities', label: 'Opportunities', visible: true },
    { id: 'gallery', label: 'Gallery', visible: true },
    { id: 'contact', label: 'Contact Us', visible: true },
  ],
  partners: [
    { id: 'uka', name: 'Uganda Korfball Association', shortName: 'UKA', logo: '/logos/uganda-korfball-association.jpg', website: '', visible: true },
    { id: 'us4dn', name: 'Uganda Sports for Development Network', shortName: 'US4DN', logo: '/logos/us4dn.png', website: '', visible: true },
    { id: 'ngo-bureau', name: 'National Bureau for NGOs', shortName: 'NGO Bureau', logo: '/logos/national-bureau-for-ngos.jpg', website: '', visible: true },
    { id: 'mglsd', name: 'Ministry of Gender, Labour and Social Development', shortName: 'MGLSD', logo: '', website: '', visible: true },
    { id: 'kcca', name: 'Kampala Capital City Authority', shortName: 'KCCA', logo: '/logos/kcca.png', website: '', visible: true },
  ],
  homeCards: [
    { id: 'home-about', title: 'Who We Are', description: 'Discover our decade-long mission, our commitment to children and women empowerment, and our foundational values.', action: 'View Narrative', image: '/images/ad4-197.jpg', target: 'about', visible: true },
    { id: 'home-programs', title: 'Our Intervention Programs', description: 'Explore our practical solution models, ranging from sports education to smart climate farming and community clinics.', action: 'View Programs', image: '/images/mtn-sos-149.jpg', target: 'strategy', visible: true },
    { id: 'home-involved', title: 'Get Involved', description: 'Join our team as an active volunteer, apply for an educational internship, or support our community programs.', action: 'View Opportunities', image: '/images/spd-69.jpg', target: 'opportunities', visible: true },
  ],
  footerSettings: {
    description: 'Empowering communities across Uganda through sports development, educational scholarships, environmental sustainability, and youth leadership.',
    exploreTitle: 'Explore Website',
    newsletterTitle: 'Stay Connected & Portal',
    newsletterText: 'Subscribe to receive official programme updates and impact digests.',
    copyrightText: 'Plan Integral Development (PID) Uganda. All rights reserved.',
    backgroundImage: '/images/mtn-sos-151.jpg',
  },
  donationSettings: {
    currency: 'UGX',
    campaignTitle: 'Support Our Mission',
    goal: 50000000,
    suggestedAmounts: [25000, 50000, 100000, 250000],
    mobileMoney: '+256 776 526 344',
    bankDetails: 'Contact the PID Secretariat for official bank transfer instructions.',
  },
  siteFeatures: {
    language: 'English',
    maintenanceMode: false,
    cookieNotice: true,
    searchEnabled: true,
    analyticsId: '',
    facebookUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
  },
};

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
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<WebContent>(DEFAULT_CONTENT);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pid_website_content');
      if (saved) {
        const parsed = JSON.parse(saved);
        const savedServices = Array.isArray(parsed.services) ? parsed.services : [];
        const mergedServices = [
          ...DEFAULT_CONTENT.services.map((defaultService) =>
            savedServices.find((service: ServiceItem) => service.id === defaultService.id) || defaultService
          ),
          ...savedServices.filter(
            (service: ServiceItem) =>
              !DEFAULT_CONTENT.services.some((defaultService) => defaultService.id === service.id)
          ),
        ];
        setContent({
          ...DEFAULT_CONTENT,
          ...parsed,
          siteLogoUrl: parsed.siteLogoUrl || DEFAULT_CONTENT.siteLogoUrl,
          galleryImages: parsed.galleryImages || DEFAULT_CONTENT.galleryImages,
          services: mergedServices,
          packages: parsed.packages || DEFAULT_CONTENT.packages,
          blogPosts: parsed.blogPosts || DEFAULT_CONTENT.blogPosts,
          testimonials: parsed.testimonials || DEFAULT_CONTENT.testimonials,
          administrators: parsed.administrators || DEFAULT_CONTENT.administrators,
          seoSettings: parsed.seoSettings || DEFAULT_CONTENT.seoSettings,
        });
      }
      
      sessionStorage.removeItem('pid_admin_authorized');
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    }
  }, []);

  // Update HTML font-size whenever percent changes
  useEffect(() => {
    if (content.fontSizePercent) {
      document.documentElement.style.fontSize = `${content.fontSizePercent}%`;
    }
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
    setContent((prev) => {
      const updated = { ...prev, ...newContent };
      localStorage.setItem('pid_website_content', JSON.stringify(updated));
      return updated;
    });
  };

  const resetToDefault = () => {
    if (window.confirm('Are you sure you want to restore original default JSON template values? All edits will be reset.')) {
      setContent(DEFAULT_CONTENT);
      localStorage.removeItem('pid_website_content');
    }
  };

  const login = async (password: string): Promise<boolean> => {
    setIsAuthorized(false);
    try {
      const response = await fetch('/api/admin/session', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        cache: 'no-store',
      });
      if (!response.ok) return false;
      const result = await response.json();
      const authorized = result.authenticated === true;
      setIsAuthorized(authorized);
      return authorized;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem('pid_admin_authorized');
    void fetch('/api/admin/session', { method: 'DELETE', credentials: 'same-origin' }).catch(() => {});
  };

  // Recheck the server session while the editor is open; never trust browser storage.
  useEffect(() => {
    if (!isAuthorized) return;
    const checkSession = async () => {
      try {
        const response = await fetch('/api/admin/session', { cache: 'no-store', credentials: 'same-origin' });
        if (!response.ok || (await response.json()).authenticated !== true) setIsAuthorized(false);
      } catch { setIsAuthorized(false); }
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
      const parsed = JSON.parse(jsonString);
      if (parsed.siteSettings) {
        const importedContent: WebContent = {
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
          administrators: parsed.administrators || content.administrators,
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

        setContent(importedContent);
        localStorage.setItem('pid_website_content', JSON.stringify(importedContent));
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
        generateDecapConfigYml
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

