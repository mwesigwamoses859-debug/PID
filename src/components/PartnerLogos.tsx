/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// 1. KCCA Logo Component (Accurate to attached image)
export const LogoKCCA: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 500 480" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Yellow Sun */}
    <circle cx="250" cy="150" r="85" fill="#FFCC00" />
    
    {/* Clock Tower */}
    <g fill="#1F2937">
      {/* Roof spire */}
      <polygon points="250,55 235,95 265,95" fill="#1F2937" />
      {/* Upper box with Clock */}
      <rect x="220" y="95" width="60" height="60" fill="#FFFFFF" stroke="#1F2937" strokeWidth="5" />
      {/* Clock Face */}
      <circle cx="250" cy="125" r="20" fill="#FFFFFF" stroke="#1F2937" strokeWidth="3" />
      <line x1="250" y1="125" x2="250" y2="112" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      <line x1="250" y1="125" x2="259" y2="118" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      {/* Tower Shaft */}
      <rect x="226" y="155" width="48" height="65" fill="#FFFFFF" stroke="#1F2937" strokeWidth="4" />
      <rect x="233" y="170" width="10" height="50" fill="#1F2937" />
      <rect x="257" y="170" width="10" height="50" fill="#1F2937" />
    </g>

    {/* Green Hill Arc */}
    <path d="M 120,225 Q 250,190 380,225" fill="none" stroke="#008037" strokeWidth="16" strokeLinecap="round" />

    {/* Red KCCA Text */}
    <text
      x="250"
      y="330"
      textAnchor="middle"
      fill="#E31B23"
      fontSize="115"
      fontWeight="900"
      fontFamily="Impact, Arial Black, system-ui, sans-serif"
    >
      KCCA
    </text>

    {/* Green Subtitle */}
    <text
      x="250"
      y="375"
      textAnchor="middle"
      fill="#008037"
      fontSize="23"
      fontWeight="900"
      fontFamily="Arial, system-ui, sans-serif"
      letterSpacing="0.5"
    >
      KAMPALA CAPITAL CITY AUTHORITY
    </text>

    {/* Cursive Tagline */}
    <text
      x="250"
      y="420"
      textAnchor="middle"
      fill="#000000"
      fontSize="36"
      fontStyle="italic"
      fontFamily="'Brush Script MT', 'Dancing Script', 'Georgia', cursive, serif"
      fontWeight="bold"
    >
      For a better City
    </text>
  </svg>
);

// 2. MGLSD Logo Component (Accurate to attached image)
export const LogoMGLSD: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 600 420" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Uganda Flag Ribbon Across Center */}
    <g transform="translate(0, 150)">
      <rect x="0" y="0" width="600" height="10" fill="#000000" />
      <rect x="0" y="10" width="600" height="10" fill="#FACC15" />
      <rect x="0" y="20" width="600" height="10" fill="#DC2626" />
      <rect x="0" y="30" width="600" height="10" fill="#000000" />
      <rect x="0" y="40" width="600" height="10" fill="#FACC15" />
      <rect x="0" y="50" width="600" height="10" fill="#DC2626" />
    </g>

    {/* Silver Circular Seal Frame */}
    <circle cx="300" cy="180" r="130" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="8" />
    <circle cx="300" cy="180" r="122" fill="none" stroke="#CBD5E1" strokeWidth="2" />

    {/* Detailed Uganda Coat of Arms inside */}
    <g transform="translate(300, 165) scale(1.05)">
      {/* Crossed Spears */}
      <line x1="-50" y1="-60" x2="50" y2="55" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
      <line x1="50" y1="-60" x2="-50" y2="55" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
      <polygon points="-50,-60 -54,-72 -46,-72" fill="#94A3B8" />
      <polygon points="50,-60 46,-72 54,-72" fill="#94A3B8" />

      {/* Shield */}
      <path d="M -28,-35 L 28,-35 L 24,25 C 0,42 0,42 -24,25 Z" fill="#1E293B" stroke="#000000" strokeWidth="2.5" />
      {/* Water Waves on Shield */}
      <path d="M -26,-22 Q -13,-28 0,-22 Q 13,-16 26,-22" fill="none" stroke="#38BDF8" strokeWidth="3.5" />
      <path d="M -26,-15 Q -13,-21 0,-15 Q 13,-9 26,-15" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      {/* Sun on Shield */}
      <circle cx="0" cy="0" r="10" fill="#FACC15" />
      {/* Drum on Shield */}
      <ellipse cx="0" cy="18" rx="8" ry="5" fill="#D97706" stroke="#000000" strokeWidth="1.5" />

      {/* Left Supporter: Uganda Kob */}
      <g transform="translate(-48, -5)">
        <path d="M 0,-20 C -10,-25 -15,-10 -5,15 C 5,30 10,40 10,50 L 22,50 L 15,15 Z" fill="#C2410C" />
        <path d="M -8,-25 Q -18,-35 -12,-40 Q -8,-32 0,-22" fill="none" stroke="#78350F" strokeWidth="2.5" />
      </g>

      {/* Right Supporter: Crested Crane */}
      <g transform="translate(48, -5)">
        <path d="M 0,-20 C 10,-25 15,-10 5,15 C -5,30 -10,40 -10,50 L -22,50 L -15,15 Z" fill="#334155" />
        <circle cx="2" cy="-24" r="3" fill="#DC2626" />
      </g>

      {/* Green Mound Base */}
      <ellipse cx="0" cy="50" rx="65" ry="12" fill="#15803D" />

      {/* Motto Banner */}
      <path d="M -60,54 Q 0,68 60,54 L 56,66 Q 0,78 -56,66 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
      <text x="0" y="64" textAnchor="middle" fill="#15803D" fontSize="7.5" fontWeight="900" fontFamily="sans-serif">FOR GOD AND MY COUNTRY</text>
    </g>

    {/* Bottom Text */}
    <text
      x="300"
      y="350"
      textAnchor="middle"
      fill="#000000"
      fontSize="21"
      fontWeight="900"
      fontFamily="Times New Roman, Georgia, serif"
      letterSpacing="0.5"
    >
      MINISTRY OF GENDER LABOUR &amp; SOCIAL
    </text>
    <text
      x="300"
      y="380"
      textAnchor="middle"
      fill="#000000"
      fontSize="21"
      fontWeight="900"
      fontFamily="Times New Roman, Georgia, serif"
      letterSpacing="0.5"
    >
      DEVELOPMENT
    </text>
  </svg>
);

// 3. NGO Bureau Logo Component (Accurate to attached image)
export const LogoNGOBureau: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 500 500" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <path id="ngoRingPath" d="M 65,250 A 185,185 0 1,1 435,250" />
    </defs>

    {/* Outer Black Circular Ring */}
    <circle cx="250" cy="250" r="225" fill="none" stroke="#000000" strokeWidth="48" />

    {/* White Arc Text along Outer Black Ring */}
    <text fill="#FFFFFF" fontSize="23" fontWeight="900" fontFamily="Arial, system-ui, sans-serif" letterSpacing="1.5">
      <textPath href="#ngoRingPath" startOffset="50%" textAnchor="middle">
        National Bureau for NGOs
      </textPath>
    </text>

    {/* Sweeping Crescent Arcs in Yellow & Red */}
    <path d="M 120,330 A 170,170 0 0,1 410,190" fill="none" stroke="#FACC15" strokeWidth="26" strokeLinecap="round" />
    <path d="M 160,345 A 130,130 0 0,1 390,240" fill="none" stroke="#E31B23" strokeWidth="26" strokeLinecap="round" />

    {/* Coat of Arms Center */}
    <g transform="translate(250, 245) scale(1.15)">
      {/* Shield */}
      <path d="M -22,-28 L 22,-28 L 18,20 C 0,32 0,32 -18,20 Z" fill="#1E293B" stroke="#000000" strokeWidth="2" />
      <circle cx="0" cy="-5" r="7" fill="#FACC15" />
      <ellipse cx="0" cy="10" rx="6" ry="4" fill="#D97706" />

      {/* Supporters */}
      <path d="M -38,0 C -34,-25 -22,-30 -18,-22 C -22,0 -26,22 -38,25 Z" fill="#B45309" />
      <path d="M 38,0 C 34,-25 22,-30 18,-22 C 22,0 26,22 38,25 Z" fill="#334155" />

      {/* Spears */}
      <line x1="-35" y1="-42" x2="35" y2="38" stroke="#475569" strokeWidth="3" />
      <line x1="35" y1="-42" x2="-35" y2="38" stroke="#475569" strokeWidth="3" />

      {/* Green Hill */}
      <ellipse cx="0" cy="32" rx="48" ry="8" fill="#15803D" />

      {/* Banner */}
      <path d="M -42,36 Q 0,46 42,36" fill="#FFFFFF" stroke="#000000" strokeWidth="1.2" />
      <text x="0" y="42" textAnchor="middle" fill="#15803D" fontSize="6.5" fontWeight="bold">FOR GOD AND MY COUNTRY</text>
    </g>
  </svg>
);

// 4. US4DN Logo Component (Accurate to attached image)
export const LogoUS4DN: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 620 320" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Stylized Pebble Shield Icon */}
    <g transform="translate(15, 20) scale(1.05)">
      {/* Yellow Top Lobe */}
      <path d="M 100,15 C 160,15 210,55 195,100 C 160,90 115,75 100,15 Z" fill="#FACC15" />
      {/* Black Left Lobe */}
      <path d="M 100,15 C 90,85 20,145 30,210 C -5,155 30,65 100,15 Z" fill="#111827" />
      {/* Red Right Lobe */}
      <path d="M 195,100 C 205,160 155,225 110,235 C 90,180 145,125 195,100 Z" fill="#DC2626" />

      {/* White Circle with Soccer Ball inside */}
      <circle cx="110" cy="120" r="30" fill="#FFFFFF" stroke="#111827" strokeWidth="2.5" />
      {/* Soccer Ball Pattern */}
      <g transform="translate(110, 120)">
        <circle cx="0" cy="0" r="18" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
        <polygon points="0,-8 7,-3 4,5 -4,5 -7,-3" fill="#111827" />
        <line x1="0" y1="-8" x2="0" y2="-18" stroke="#111827" strokeWidth="1.5" />
        <line x1="7" y1="-3" x2="16" y2="-7" stroke="#111827" strokeWidth="1.5" />
        <line x1="4" y1="5" x2="11" y2="14" stroke="#111827" strokeWidth="1.5" />
        <line x1="-4" y1="5" x2="-11" y2="14" stroke="#111827" strokeWidth="1.5" />
        <line x1="-7" y1="-3" x2="-16" y2="-7" stroke="#111827" strokeWidth="1.5" />
      </g>
    </g>

    {/* Right Column: Text */}
    <g transform="translate(240, 0)">
      {/* Large US4DN */}
      <text
        x="0"
        y="150"
        fill="#111827"
        fontSize="120"
        fontWeight="900"
        fontFamily="Arial Black, Impact, system-ui, sans-serif"
        letterSpacing="-3"
      >
        US4DN
      </text>

      {/* Subtitle Line 1 */}
      <text
        x="5"
        y="210"
        fill="#111827"
        fontSize="34"
        fontWeight="800"
        fontFamily="Arial, system-ui, sans-serif"
      >
        Uganda Sports for
      </text>

      {/* Subtitle Line 2 */}
      <text
        x="5"
        y="255"
        fill="#111827"
        fontSize="34"
        fontWeight="800"
        fontFamily="Arial, system-ui, sans-serif"
      >
        Development Network
      </text>
    </g>
  </svg>
);

// 5. UKA Logo Component (Accurate to attached image)
export const LogoUKA: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 580 340" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Left Icon Section */}
    <g transform="translate(130, 110)">
      {/* Yellow Ball */}
      <circle cx="0" cy="0" r="58" fill="#FACC15" stroke="#111827" strokeWidth="4" />
      {/* Black Pentagons/Panels on Korfball */}
      <polygon points="0,-25 18,-12 11,10 -11,10 -18,-12" fill="#111827" />
      <polygon points="-38,-35 -22,-20 -35,-5 -50,-15" fill="#111827" />
      <polygon points="38,-35 22,-20 35,-5 50,-15" fill="#111827" />
      <polygon points="-38,35 -22,20 -35,5 -50,15" fill="#111827" />
      <polygon points="38,35 22,-20 35,5 50,15" fill="#111827" />

      {/* Net & Flag Banner Arc under Ball */}
      <path d="M -75,20 C -20,10 50,20 70,60 C -10,100 -70,80 -80,20 Z" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />
      <path d="M -65,35 Q 0,30 60,65" fill="none" stroke="#FACC15" strokeWidth="6" />
      <path d="M -55,52 Q 0,48 50,75" fill="none" stroke="#DC2626" strokeWidth="6" />
      <path d="M -80,20 C -75,60 -65,110 -60,150" stroke="#111827" strokeWidth="5" fill="none" strokeLinecap="round" />
    </g>

    {/* Right Column Text */}
    <g transform="translate(265, 0)">
      <text
        x="0"
        y="120"
        fill="#111827"
        fontSize="46"
        fontWeight="900"
        fontFamily="Arial Black, Impact, system-ui, sans-serif"
        letterSpacing="0"
      >
        UGANDA
      </text>
      <text
        x="0"
        y="175"
        fill="#111827"
        fontSize="46"
        fontWeight="900"
        fontFamily="Arial Black, Impact, system-ui, sans-serif"
        letterSpacing="0"
      >
        KORFBALL
      </text>
      <text
        x="0"
        y="230"
        fill="#111827"
        fontSize="46"
        fontWeight="900"
        fontFamily="Arial Black, Impact, system-ui, sans-serif"
        letterSpacing="0"
      >
        ASSOCIATION
      </text>
    </g>
  </svg>
);

// 6. Ministry of Education and Sports Logo Component
export const LogoMoES: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 550 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="275" cy="180" r="130" fill="#FFFFFF" stroke="#003366" strokeWidth="12" />
    <circle cx="275" cy="180" r="115" fill="none" stroke="#EAB308" strokeWidth="4" />
    
    <g transform="translate(275, 175) scale(0.9)">
      {/* Open Book */}
      <path d="M -40,10 Q 0,0 40,10 L 40,40 Q 0,30 -40,40 Z" fill="#FFFFFF" stroke="#003366" strokeWidth="3" />
      <path d="M -40,10 Q 0,-5 0,32" fill="none" stroke="#003366" strokeWidth="3" />
      <path d="M 0,-5 Q 0,-5 40,10" fill="none" stroke="#003366" strokeWidth="3" />
      {/* Flaming Torch */}
      <path d="M -10,-10 L 10,-10 L 5,-40 L -5,-40 Z" fill="#D97706" />
      <path d="M 0,-40 C -15,-60 15,-80 0,-95 C 20,-75 0,-55 0,-40 Z" fill="#DC2626" />
    </g>

    <text
      x="275"
      y="340"
      textAnchor="middle"
      fill="#003366"
      fontSize="22"
      fontWeight="900"
      fontFamily="serif, system-ui, sans-serif"
    >
      MINISTRY OF EDUCATION AND SPORTS
    </text>
    <text
      x="275"
      y="370"
      textAnchor="middle"
      fill="#7DC242"
      fontSize="16"
      fontWeight="800"
      fontFamily="system-ui, sans-serif"
      letterSpacing="2"
    >
      REPUBLIC OF UGANDA
    </text>
  </svg>
);

// 7. Butebo District Local Government Logo Component
export const LogoButebo: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 500 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="250" cy="170" r="120" fill="#ECFDF5" stroke="#059669" strokeWidth="10" />
    <circle cx="250" cy="170" r="105" fill="none" stroke="#D97706" strokeWidth="4" />
    
    <g transform="translate(250, 165) scale(0.9)">
      {/* Green Sheaves & Tree */}
      <path d="M 0,20 C -20,0 -30,-40 0,-60 C 30,-40 20,0 0,20 Z" fill="#10B981" />
      <rect x="-6" y="20" width="12" height="30" fill="#78350F" />
      <path d="M -40,40 Q 0,10 40,40" fill="none" stroke="#EAB308" strokeWidth="6" />
    </g>

    <text
      x="250"
      y="325"
      textAnchor="middle"
      fill="#065F46"
      fontSize="22"
      fontWeight="900"
      fontFamily="serif, system-ui, sans-serif"
    >
      BUTEBO DISTRICT LOCAL GOVT
    </text>
    <text
      x="250"
      y="355"
      textAnchor="middle"
      fill="#D97706"
      fontSize="15"
      fontWeight="800"
      fontFamily="system-ui, sans-serif"
      letterSpacing="1"
    >
      AGRICULTURE &amp; YOUTH OUTREACH
    </text>
  </svg>
);
