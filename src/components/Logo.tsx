import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'color' | 'white' | 'dark';
  showText?: boolean;
}

export default function Logo({ className = 'h-10', variant = 'color', showText = true }: LogoProps) {
  // Brand Colors from the uploaded logo image
  // Blue: #0274b7
  // Green: #81c243
  // Navy Text: #003057 or #073a63
  
  const iconColors = {
    blue: variant === 'white' ? '#ffffff' : '#0274b7',
    green: variant === 'white' ? '#ffffff' : '#81c243',
    bg: variant === 'white' ? 'transparent' : 'transparent',
  };

  const textColor = variant === 'white' ? 'text-white' : variant === 'dark' ? 'text-brand-950' : 'text-[#073a63]';
  const taglineColor = variant === 'white' ? 'text-white/80' : variant === 'dark' ? 'text-brand-950/70' : 'text-[#0274b7]';
  const lineColor = variant === 'white' ? 'bg-white/30' : variant === 'dark' ? 'bg-brand-950/20' : 'bg-[#073a63]/20';

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* High-Fidelity brand SVG icon representing the exact corporate symbol */}
      <svg
        viewBox="0 0 160 160"
        className="h-full w-auto flex-shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle (transparent default) */}
        <circle cx="80" cy="80" r="76" fill={iconColors.bg} />

        {/* Top crescent arc (Blue) */}
        <path
          d="M62 38C70 30 81 26 93 28C103 30 112 36 118 45C114 41 108 38 101 37C92 36 84 39 77 44C71 49 66 56 64 64C63 54 62 45 62 38Z"
          fill={iconColors.blue}
        />

        {/* Tiny top-left/center head circle (Blue) */}
        <circle cx="88" cy="46" r="9.5" fill={iconColors.blue} />

        {/* Large blue body shape (curving down and left) */}
        <path
          d="M93 74C82 78 74 88 71 100C67 115 72 131 84 141C70 137 59 126 55 112C50 97 54 80 64 68C65 72 67 76 70 80C75 87 84 92 93 90C97 89 101 86 104 83C102 81 99 79 97 77C96 76 95 75 93 74Z"
          fill={iconColors.blue}
          fillRule="evenodd"
          clipRule="evenodd"
        />

        {/* Large blue head circle */}
        <circle cx="82" cy="70" r="14.5" fill={iconColors.blue} />

        {/* Green body shape (Upper right / middle) */}
        <path
          d="M97 52C102 52 107 55 111 60C116 66 123 72 131 71C136 70 141 67 145 63C143 69 139 75 134 79C128 84 120 86 113 83C105 80 99 73 95 66C93 61 91 56 89 51C92 51 94 52 97 52Z"
          fill={iconColors.green}
        />

        {/* Green head circle (Upper right) */}
        <circle cx="120" cy="53" r="12.5" fill={iconColors.green} />

        {/* Green body shape (Lower right) */}
        <path
          d="M106 100C112 100 119 103 124 108C129 114 136 118 144 116C140 124 133 129 125 130C117 131 110 127 104 121C100 117 97 112 95 106C98 103 102 101 106 100Z"
          fill={iconColors.green}
        />

        {/* Green head circle (Lower right) */}
        <circle cx="118" cy="103" r="10.5" fill={iconColors.green} />
      </svg>

      {/* Corporate Brand Typography */}
      {showText && (
        <div className="flex flex-col justify-center select-none">
          <span className={`font-sans font-semibold tracking-tight text-base sm:text-lg block leading-tight ${textColor}`}>
            Plan Integral
          </span>
          {/* Tagline showing: ---- Development ---- with exact visual spacing */}
          <div className="flex items-center space-x-1.5 mt-0.5">
            <span className={`h-[1px] w-4.5 sm:w-6 ${lineColor}`}></span>
            <span className={`font-sans font-light tracking-[0.14em] text-[10px] sm:text-[11px] uppercase block leading-none ${taglineColor}`}>
              Development
            </span>
            <span className={`h-[1px] w-4.5 sm:w-6 ${lineColor}`}></span>
          </div>
        </div>
      )}
    </div>
  );
}
