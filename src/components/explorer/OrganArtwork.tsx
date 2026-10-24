import React from 'react';
import { OrganId } from '../../types';

interface OrganArtworkProps {
  organId: OrganId;
  className?: string;
  isPulsing?: boolean;
}

/**
 * Duotone organs, friendly not clinical (Mood Board 04):
 * - Big, simple organ shapes with a single highlight.
 * - Two inks plus one tint. Flat shapes, no clinical outlines.
 * - Cutaways that feel like a sticker, never gory.
 */
export const OrganArtwork: React.FC<OrganArtworkProps> = ({
  organId,
  className = 'w-24 h-24',
  isPulsing = false
}) => {
  switch (organId) {
    case 'heart':
      return (
        <div className={`relative flex items-center justify-center ${className} ${isPulsing ? 'animate-heart-pulse' : ''}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
            {/* Peach / Orange sticker backdrop */}
            <rect width="100" height="100" rx="24" fill="#FFD9B5" />
            {/* Deep Indigo Heart silhouette */}
            <path
              d="M50 28 C40 18 25 24 23 42 C21 58 36 70 50 82 C64 70 79 58 77 42 C75 24 60 18 50 28 Z"
              fill="#2B2A6E"
            />
            {/* Single clean tint highlight */}
            <path
              d="M32 35 C38 31 44 33 46 38 C42 36 36 38 34 44 C33 40 31 37 32 35 Z"
              fill="#FFF0E0"
            />
          </svg>
        </div>
      );

    case 'brain':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
            {/* Lilac sticker backdrop */}
            <rect width="100" height="100" rx="24" fill="#E8D6FF" />
            {/* Deep Indigo Brain silhouette */}
            <path
              d="M50 22 C34 22 22 34 22 52 C22 66 30 76 45 78 C48 78 50 76 50 72 C50 76 52 78 55 78 C70 76 78 66 78 52 C78 34 66 22 50 22 Z"
              fill="#2B2A6E"
            />
            {/* Friendly duotone gyri cutaway shape in blush tint */}
            <path
              d="M32 38 C36 46 30 54 36 62 C40 66 42 72 45 74"
              fill="none"
              stroke="#F9A9CF"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M68 38 C64 46 70 54 64 62 C60 66 58 72 55 74"
              fill="none"
              stroke="#F9A9CF"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Top highlight */}
            <ellipse cx="40" cy="28" rx="8" ry="3" fill="#FFFFFF" opacity="0.8" />
          </svg>
        </div>
      );

    case 'lungs':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
            {/* Sky / Lilac sticker backdrop */}
            <rect width="100" height="100" rx="24" fill="#CDEBFA" />
            {/* Central airway stem */}
            <rect x="47" y="16" width="6" height="24" rx="3" fill="#2B2A6E" />
            {/* Left Lung in Deep Indigo */}
            <path
              d="M44 38 C44 38 24 38 24 58 C24 74 34 82 44 80 Z"
              fill="#2B2A6E"
            />
            {/* Right Lung in Blush Pink sticker cutaway */}
            <path
              d="M56 38 C56 38 76 38 76 58 C76 74 66 82 56 80 Z"
              fill="#F9A9CF"
            />
            {/* Single clean white highlight stripe */}
            <path
              d="M30 46 C30 46 28 54 30 64"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );

    case 'liver':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
            {/* Marrow Peach backdrop */}
            <rect width="100" height="100" rx="24" fill="#FFD9B5" />
            {/* Deep Indigo Liver silhouette */}
            <path
              d="M24 38 C36 26 70 28 80 40 C84 48 80 62 70 70 C56 78 36 76 26 70 C20 62 18 48 24 38 Z"
              fill="#2B2A6E"
            />
            {/* Single bold Glow Orange highlight slice */}
            <path
              d="M34 38 C44 32 66 34 72 42"
              fill="none"
              stroke="#FF9A4D"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Gallbladder dot tint */}
            <circle cx="58" cy="62" r="5" fill="#DFF59B" />
          </svg>
        </div>
      );

    case 'stomach':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
            {/* Pulse Lime backdrop */}
            <rect width="100" height="100" rx="24" fill="#DFF59B" />
            {/* Esophagus entry tube */}
            <rect x="38" y="16" width="7" height="18" rx="3.5" fill="#2B2A6E" />
            {/* Stomach J-shape curve */}
            <path
              d="M40 30 C30 32 24 44 24 58 C24 72 36 82 52 82 C68 82 76 72 74 60 C72 48 64 46 56 50 C50 54 48 60 48 64"
              fill="#2B2A6E"
            />
            {/* Single curved blush highlight */}
            <path
              d="M32 46 C30 54 32 66 40 72"
              fill="none"
              stroke="#FFF"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.9"
            />
          </svg>
        </div>
      );

    case 'kidneys':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
            {/* Sky backdrop */}
            <rect width="100" height="100" rx="24" fill="#CDEBFA" />
            {/* Left Kidney in Deep Indigo */}
            <path
              d="M38 34 C26 34 22 44 22 54 C22 64 26 74 38 74 C44 74 42 64 38 54 C34 44 44 34 38 34 Z"
              fill="#2B2A6E"
            />
            {/* Right Kidney in Glow Orange sticker */}
            <path
              d="M62 38 C74 38 78 48 78 58 C78 68 74 78 62 78 C56 78 58 68 62 58 C66 48 56 38 62 38 Z"
              fill="#FF9A4D"
            />
            {/* Highlights */}
            <ellipse cx="28" cy="44" rx="2.5" ry="5" fill="#FFFFFF" opacity="0.8" />
            <ellipse cx="72" cy="48" rx="2.5" ry="5" fill="#FFF0E0" opacity="0.9" />
          </svg>
        </div>
      );

    case 'intestines':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
            {/* Lilac backdrop */}
            <rect width="100" height="100" rx="24" fill="#E8D6FF" />
            {/* Colon loop in Deep Indigo */}
            <path
              d="M28 72 L28 38 C28 30 36 28 50 28 C64 28 72 30 72 38 L72 72"
              fill="none"
              stroke="#2B2A6E"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Small intestine labyrinth in Blush Pink */}
            <path
              d="M38 48 C44 44 48 54 54 50 C60 46 64 54 60 62 C56 68 44 66 42 72"
              fill="none"
              stroke="#F9A9CF"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* White top highlight */}
            <line x1="42" y1="28" x2="58" y2="28" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      );

    default:
      return null;
  }
};
