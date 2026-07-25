/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useAdmin } from '../context/AdminContext';
import { Image, MapPin, Camera } from 'lucide-react';
import { MixedColorText } from './MixedColorText';

export const CommunityGallery: React.FC = () => {
  const { content } = useAdmin();

  if (!content.galleryImages || content.galleryImages.length === 0) return null;

  return (
    <section id="gallery" className="bg-white font-sans scroll-mt-12 border-b border-natural-border">
      {/* Top Banner with Background Photo & Black and White Words */}
      <div className="relative bg-[#003366] text-white py-20 px-4 overflow-hidden border-b border-sky-900 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src={(content as any).galleryHeaderBgImage || content.galleryImages?.[0]?.url || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1600"}
            alt="Community Showcase - PID Uganda"
            className="w-full h-full object-cover opacity-60 brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/90 via-[#003366]/75 to-[#007BC4]/80" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#7DC242] flex items-center justify-center gap-2">
            <Camera className="w-5 h-5 text-[#7DC242]" />
            <span>Community Showcase</span>
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            Witness Our <MixedColorText text="{Groundwork in Action}" isDarkBg={true} />
          </h1>
          <p className="text-slate-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore active moments of sports empowerment, community agricultural training, and inclusive educational initiatives captured live on the ground.
          </p>
          <div className="w-20 h-1.5 bg-[#7DC242] mx-auto rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Dynamic Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.galleryImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white border border-natural-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] bg-natural-muted overflow-hidden">
                <img 
                  src={img.url} 
                  alt={img.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                />
                
                {/* Floating Location Badge */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-wider text-white flex items-center gap-1 z-10">
                  <MapPin className="w-3 h-3 text-natural-tan" />
                  <span>Uganda Field Project</span>
                </div>
              </div>

              {/* Caption details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                  {img.caption}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-[#007BC4] font-bold uppercase tracking-widest">
                  <span>Photo Source</span>
                  <span className="text-[#15803D] font-bold">Verified Program</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
