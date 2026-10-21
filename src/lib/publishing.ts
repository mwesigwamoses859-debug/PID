import type { WebContent } from '../context/AdminContext';

const privateKeys = new Set(['administrators', 'decapRepo', 'decapBranch']);
export const publicContent = (content: WebContent): Partial<WebContent> =>
  Object.fromEntries(Object.entries(content).filter(([key]) => !privateKeys.has(key)));

const sectionFor = (key: string) => {
  if (key.startsWith('hero')) return 'Homepage';
  if (key.startsWith('about')) return 'About us';
  if (key.startsWith('pillars')) return 'Programmes';
  if (key.startsWith('impact')) return 'Impact';
  if (key.startsWith('opportunities')) return 'Opportunities';
  if (key.startsWith('contact')) return 'Contact';
  if (key.startsWith('partners') || key === 'partners') return 'Partners';
  return ({ designSettings: 'Design & typography', services: 'Programmes', packages: 'Packages', blogPosts: 'News articles', testimonials: 'Testimonials', galleryImages: 'Gallery', seoSettings: 'Search descriptions', navigationItems: 'Navigation', homeCards: 'Homepage cards', footerSettings: 'Footer', donationSettings: 'Donation information', siteFeatures: 'Website settings' } as Record<string, string>)[key] || 'Branding & appearance';
};
export const changedSections = (draft: WebContent, live: WebContent) => [...new Set(Object.keys(publicContent(draft)).filter(key => JSON.stringify(draft[key as keyof WebContent]) !== JSON.stringify(live[key as keyof WebContent])).map(sectionFor))];

export async function uploadImageData(dataUrl: string): Promise<string> {
  if (!dataUrl.startsWith('data:image/')) return dataUrl;
  const blob = await (await fetch(dataUrl)).blob();
  if (blob.size > 900000) throw new Error('This image is too large. Choose a smaller JPG, PNG or WebP image (under 900 KB).');
  const response = await fetch('/api/admin/media', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': blob.type }, body: blob });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Image upload failed. Please sign in again.');
  return result.url;
}

export async function uploadEmbeddedImages(value: any): Promise<any> {
  if (typeof value === 'string' && value.startsWith('data:image/')) return uploadImageData(value);
  if (Array.isArray(value)) { const next = []; for (const item of value) next.push(await uploadEmbeddedImages(item)); return next; }
  if (value && typeof value === 'object') { const next: Record<string, any> = {}; for (const [key, item] of Object.entries(value)) next[key] = await uploadEmbeddedImages(item); return next; }
  return value;
}
