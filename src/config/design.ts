export const FONT_OPTIONS = [
  { id: 'inter', label: 'Inter · Modern', css: '"Inter", system-ui, sans-serif' },
  { id: 'system', label: 'System · Fast loading', css: 'system-ui, -apple-system, "Segoe UI", sans-serif' },
  { id: 'arial', label: 'Arial · Familiar', css: 'Arial, Helvetica, sans-serif' },
  { id: 'georgia', label: 'Georgia · Classic serif', css: 'Georgia, "Times New Roman", serif' },
  { id: 'poppins', label: 'Poppins · Geometric', css: '"Poppins", Arial, sans-serif', family: 'Poppins' },
  { id: 'lato', label: 'Lato · Friendly', css: '"Lato", Arial, sans-serif', family: 'Lato' },
  { id: 'merriweather', label: 'Merriweather · Editorial', css: '"Merriweather", Georgia, serif', family: 'Merriweather' },
  { id: 'noto', label: 'Noto Sans · Multilingual', css: '"Noto Sans", Arial, sans-serif', family: 'Noto Sans' },
  { id: 'noto-arabic', label: 'Noto Sans Arabic · العربية', css: '"Noto Sans Arabic", Arial, sans-serif', family: 'Noto Sans Arabic' },
];
export const LANGUAGES = [
  { name: 'English', code: 'en', sample: 'Empowering communities together' },
  { name: 'Luganda', code: 'lg', sample: 'Tukolera wamu okutumbula embeera z’abantu' },
  { name: 'Swahili', code: 'sw', sample: 'Tunaimarisha jamii pamoja' },
  { name: 'French', code: 'fr', sample: 'Ensemble pour des communautés plus fortes' },
  { name: 'German', code: 'de', sample: 'Gemeinsam stärken wir Gemeinschaften' },
  { name: 'Arabic', code: 'ar', sample: 'معًا نبني مجتمعات أقوى' },
];
export interface DesignSettings {
  bodyFont: string;
  headingFont: string;
  headingScale: number;
  lineHeight: number;
  letterSpacing: number;
  backgroundTemplate: string;
  backgroundColor: string;
  backgroundImage: string;
  backgroundStrength: number;
  contentWidth: string;
  sectionSpacing: string;
  buttonStyle: string;
  stickyHeader: boolean;
  backToTop: boolean;
  smoothScroll: boolean;
}
export const DEFAULT_DESIGN: DesignSettings = {
  bodyFont: 'inter', headingFont: 'inter', headingScale: 1, lineHeight: 1.65, letterSpacing: 0,
  backgroundTemplate: 'clean', backgroundColor: '#FFFFFF', backgroundImage: '', backgroundStrength: 25,
  contentWidth: 'standard', sectionSpacing: 'comfortable', buttonStyle: 'original',
  stickyHeader: true, backToTop: false, smoothScroll: false,
};
export const BACKGROUNDS = [
  { id: 'clean', label: 'Clean canvas', preview: '#ffffff', css: 'none' },
  { id: 'breeze', label: 'Blue breeze', preview: 'linear-gradient(135deg,#e0f2fe,#f0fdf4)', css: 'radial-gradient(ellipse at 10% 0%, #bae6fd88, transparent 55%), radial-gradient(ellipse at 100% 50%, #dcfce788, transparent 60%)' },
  { id: 'nature', label: 'Nature glow', preview: 'linear-gradient(135deg,#ecfccb,#dcfce7)', css: 'radial-gradient(ellipse at 0% 15%, #bef26466, transparent 50%), radial-gradient(ellipse at 100% 80%, #86efac55, transparent 55%)' },
  { id: 'paper', label: 'Warm paper', preview: 'linear-gradient(135deg,#fffbeb,#fef3c7)', css: 'linear-gradient(135deg,#fef3c766,#fffbeb99)' },
  { id: 'dots', label: 'Subtle dots', preview: 'radial-gradient(#94a3b8 1px, #f8fafc 1px)', css: 'radial-gradient(#64748b55 1px, transparent 1px)' },
  { id: 'grid', label: 'Fine grid', preview: 'repeating-linear-gradient(0deg,#e2e8f0 0 1px,#fff 1px 16px)', css: 'linear-gradient(#64748b22 1px,transparent 1px),linear-gradient(90deg,#64748b22 1px,transparent 1px)' },
  { id: 'photo', label: 'Your photo', preview: 'linear-gradient(135deg,#334155,#94a3b8)', css: 'none' },
];
export const DESIGN_PRESETS = [
  { id: 'community', title: 'Community Classic', description: 'Clear type, PID colours and a familiar layout.', colors: ['#003366', '#007BC4', '#7DC242'], patch: { theme: 'olive', uiStyle: 'classic', cornerRadius: 16, fontSizePercent: 100 }, design: { ...DEFAULT_DESIGN, bodyFont: 'inter', headingFont: 'inter' } },
  { id: 'modern', title: 'Modern Foundation', description: 'Soft glass, rounded buttons and a blue backdrop.', colors: ['#0F172A', '#0EA5E9', '#E0F2FE'], patch: { theme: 'blue', uiStyle: 'macos', cornerRadius: 24, fontSizePercent: 100 }, design: { ...DEFAULT_DESIGN, bodyFont: 'lato', headingFont: 'poppins', backgroundTemplate: 'breeze', buttonStyle: 'pill' } },
  { id: 'editorial', title: 'Stories & Impact', description: 'Serif headings and generous reading space.', colors: ['#78350F', '#D97706', '#FFFBEB'], patch: { theme: 'earth', uiStyle: 'classic', cornerRadius: 12, fontSizePercent: 105 }, design: { ...DEFAULT_DESIGN, bodyFont: 'lato', headingFont: 'merriweather', backgroundTemplate: 'paper', lineHeight: 1.8, contentWidth: 'narrow', buttonStyle: 'soft' } },
  { id: 'sport', title: 'Sport & Youth', description: 'Bold headings, bright colour and expressive shapes.', colors: ['#003366', '#7DC242', '#F97316'], patch: { theme: 'olive', uiStyle: 'android16', cornerRadius: 28, fontSizePercent: 100 }, design: { ...DEFAULT_DESIGN, headingFont: 'poppins', headingScale: 1.08, backgroundTemplate: 'dots', buttonStyle: 'pill', backToTop: true } },
  { id: 'nature', title: 'Nature & Community', description: 'Warm colours and soft environmental textures.', colors: ['#78350F', '#A3E635', '#ECFCCB'], patch: { theme: 'earth', uiStyle: 'macos', cornerRadius: 22, fontSizePercent: 100 }, design: { ...DEFAULT_DESIGN, bodyFont: 'noto', headingFont: 'poppins', backgroundTemplate: 'nature', sectionSpacing: 'spacious', buttonStyle: 'soft' } },
  { id: 'readable', title: 'Simple & Readable', description: 'Larger text, clean surfaces and reduced motion.', colors: ['#0F172A', '#1D4ED8', '#FFFFFF'], patch: { theme: 'blue', uiStyle: 'classic', cornerRadius: 8, fontSizePercent: 110, reduceMotion: true }, design: { ...DEFAULT_DESIGN, bodyFont: 'system', headingFont: 'system', lineHeight: 1.85, buttonStyle: 'square', backToTop: true } },
];
export const fontCss = (id: string) => FONT_OPTIONS.find(font => font.id === id)?.css || FONT_OPTIONS[0].css;
export const normalizeDesign = (value?: Partial<DesignSettings>): DesignSettings => ({ ...DEFAULT_DESIGN, ...value });
export const designLanguage = (language: string) => LANGUAGES.find(item => item.name === language) || LANGUAGES[0];
