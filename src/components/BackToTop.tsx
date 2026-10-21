import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
export function BackToTop() {
  const { content, isAdminOpen } = useAdmin();
  const [visible, setVisible] = useState(false);
  const enabled = content.designSettings?.backToTop;
  useEffect(() => {
    if (!enabled) return;
    const update = () => setVisible(window.scrollY > 500);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [enabled]);
  if (!enabled || !visible || isAdminOpen) return null;
  return <button aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: content.reduceMotion ? 'instant' : content.designSettings.smoothScroll ? 'smooth' : 'instant' })} className="fixed bottom-5 end-5 z-40 p-3 rounded-full bg-[#003366] text-white shadow-xl border border-white/40"><ArrowUp size={20} /></button>;
}
