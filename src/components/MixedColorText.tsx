/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface MixedColorTextProps {
  text: string;
  isDarkBg?: boolean;
}

export const MixedColorText: React.FC<MixedColorTextProps> = ({ text, isDarkBg = false }) => {
  if (!text) return null;

  // Split by brace syntax first: e.g. "Hello {world}" -> ["Hello ", "{world}"]
  const parts = text.split(/(\{.*?\})/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('{') && part.endsWith('}')) {
          const innerText = part.slice(1, -1);
          // Multi-color dynamic premium theme-responsive gradient highlight for words inside {}
          return (
            <span
              key={index}
              className={`inline-block font-extrabold bg-gradient-to-r ${
                isDarkBg
                  ? 'from-sky-300 via-emerald-300 to-amber-300'
                  : 'from-[#007BC4] via-[#059669] to-[#7DC242]'
              } bg-clip-text text-transparent relative drop-shadow-sm`}
            >
              {innerText}
            </span>
          );
        }

        // Split by white-spaces and preserve them to parse words
        const words = part.split(/(\s+)/);
        return (
          <React.Fragment key={index}>
            {words.map((word, wordIndex) => {
              const cleanWord = word.trim().toLowerCase().replace(/[^a-z]/g, '');
              
              // 1. Warm Golden Amber / Green for Youth / Children / Vulnerable / Women
              if (
                cleanWord === 'youth' || 
                cleanWord === 'children' || 
                cleanWord === 'vulnerable' || 
                cleanWord === 'women' ||
                cleanWord === 'empowerment' || 
                cleanWord === 'empower' || 
                cleanWord === 'empowering' || 
                cleanWord === 'education'
              ) {
                return (
                  <span
                    key={wordIndex}
                    className={`inline-block font-extrabold ${
                      isDarkBg ? 'text-[#7DC242]' : 'text-[#15803D]'
                    } transition-colors duration-300`}
                  >
                    {word}
                  </span>
                );
              }
              
              // 2. Vibrant NGO Blue for Transforming / Sustainable / Communities / Sport / Uniting
              if (
                cleanWord === 'transforming' || 
                cleanWord === 'transform' || 
                cleanWord === 'transformation' || 
                cleanWord === 'sustainable' ||
                cleanWord === 'communities' || 
                cleanWord === 'community' || 
                cleanWord === 'families' ||
                cleanWord === 'sport' || 
                cleanWord === 'sports' || 
                cleanWord === 'play' || 
                cleanWord === 'recreation' ||
                cleanWord === 'uniting' || 
                cleanWord === 'unite' || 
                cleanWord === 'integral' || 
                cleanWord === 'strategic'
              ) {
                return (
                  <span
                    key={wordIndex}
                    className={`inline-block font-extrabold ${
                      isDarkBg ? 'text-sky-300' : 'text-[#007BC4]'
                    } transition-colors duration-300`}
                  >
                    {word}
                  </span>
                );
              }

              return word;
            })}
          </React.Fragment>
        );
      })}
    </>
  );
};

