/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useAdmin } from '../context/AdminContext';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  lightMode?: boolean;
  customLogoUrl?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 40, 
  showText = true,
  lightMode = false,
  customLogoUrl
}) => {
  let logoUrl = customLogoUrl;
  try {
    const admin = useAdmin();
    if (!logoUrl && admin?.content?.siteLogoUrl) {
      logoUrl = admin.content.siteLogoUrl;
    }
  } catch {
    // optional fallback if rendered outside AdminProvider
  }

  logoUrl = logoUrl || '/branding/pid-logo.webp';

  const [imgError, setImgError] = useState(false);
  const useCompactOfficialBrand =
    showText && logoUrl.includes('/branding/pid-logo.webp');

  useEffect(() => {
    setImgError(false);
  }, [logoUrl]);

  if (logoUrl && !imgError) {
    return (
      <div
        className={`inline-flex shrink-0 items-center rounded-xl bg-white px-1.5 py-1 shadow-sm ring-1 ring-slate-200/70 ${className}`}
        aria-label="Plan Integral Development"
      >
        <img 
          src={useCompactOfficialBrand ? '/branding/pid-mark.webp' : logoUrl} 
          alt="Plan Integral Development logo" 
          style={{
            height: `${size}px`,
            width: 'auto',
            maxWidth: useCompactOfficialBrand ? `${size}px` : `${Math.round(size * 1.45)}px`,
          }}
          className="object-contain shrink-0"
          onError={() => setImgError(true)}
        />
        {useCompactOfficialBrand && (
          <div className="flex shrink-0 flex-col text-left pr-1.5">
            <span
              className="text-[clamp(0.95rem,2.5vw,1.2rem)] font-extrabold tracking-tight leading-none text-[#003b71] whitespace-nowrap"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              Plan Integral
            </span>
            <div className="flex items-center gap-1 mt-1">
              <div className="h-px w-2.5 bg-[#003b71]/40" />
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.16em] leading-none text-[#003b71]">
                Development
              </span>
              <div className="h-px w-2.5 bg-[#003b71]/40" />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* High-fidelity SVG recreation of the attached Plan Integral Development logo */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 200" 
        className="shrink-0"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* --- BLUE FIGURES & ARC (Left Side) --- */}
        {/* Top blue orbital arc */}
        <path 
          d="M 70,22 C 92,8 126,10 142,22 C 124,25 96,25 78,38 C 74,33 71,27 70,22 Z" 
          fill="#0072CE" 
        />
        
        {/* Upper small blue head */}
        <circle cx="88" cy="41" r="11" fill="#0072CE" />
        
        {/* Main lower blue head */}
        <circle cx="82" cy="68" r="17" fill="#0072CE" />
        
        {/* Main blue figure swoop body */}
        <path 
          d="M 68,48 C 50,68 45,95 50,120 C 58,148 82,168 112,168 C 98,158 86,140 88,118 C 90,95 80,80 62,68 C 65,61 66,54 68,48 Z" 
          fill="#0072CE" 
        />

        {/* --- GREEN FIGURES (Right Side) --- */}
        {/* Upper green figure head */}
        <circle cx="124" cy="43" r="16" fill="#82C341" />

        {/* Upper green figure body & raised arm swoop */}
        <path 
          d="M 132,58 C 152,72 158,98 152,120 C 146,140 128,156 106,162 C 118,152 126,136 122,116 C 118,94 128,80 148,68 C 142,63 137,60 132,58 Z" 
          fill="#82C341" 
        />

        {/* Lower green figure head */}
        <circle cx="122" cy="88" r="11" fill="#82C341" />

        {/* Lower green figure upward body swoop */}
        <path 
          d="M 112,102 C 132,110 144,126 140,146 C 135,160 120,166 106,164 C 122,158 130,146 126,130 C 122,116 116,108 112,102 Z" 
          fill="#82C341" 
        />
      </svg>

      {showText && (
        <div className="flex flex-col text-left">
          <span className={`text-xl font-extrabold tracking-tight leading-none ${
            lightMode ? "text-[#002B66]" : "text-white"
          }`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Plan Integral
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <div className={`h-[1px] w-3 ${lightMode ? "bg-[#002B66]/40" : "bg-white/40"}`} />
            <span className={`text-[9px] font-bold uppercase tracking-[0.22em] leading-none ${
              lightMode ? "text-[#002B66]" : "text-white/90"
            }`}>
              Development
            </span>
            <div className={`h-[1px] w-3 ${lightMode ? "bg-[#002B66]/40" : "bg-white/40"}`} />
          </div>
        </div>
      )}
    </div>
  );
};
