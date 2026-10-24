import React from 'react';
import { Heart, Shield, BookOpen } from 'lucide-react';
import { sound } from '../../utils/audio';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-24 border-t border-[#E8DEC4] bg-white text-[#5A5672] text-xs py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF9A4D] via-[#F9A9CF] to-[#DFF59B] flex items-center justify-center text-[#1D1A33]">
                <span className="text-[10px] font-black">✻</span>
              </div>
              <span className="text-xl font-normal font-serif-editorial text-[#1D1A33]">
                Body<span className="italic">Quest</span>
              </span>
            </div>
            <p className="text-sm font-normal font-serif-editorial text-[#1D1A33] italic">
              Curious, warm &amp; a little bit nerdy.
            </p>
            <p className="text-xs text-[#5A5672] leading-relaxed max-w-sm">
              A fun, educational home for understanding your own body. Soft pastels, editorial serif type, and friendly duotone art keep science feeling like play.
            </p>
          </div>

          {/* Expedition Stations */}
          <div className="space-y-2">
            <h4 className="eyebrow-tag text-[#1D1A33]">
              Stations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigate('explore');
                  }}
                  className="hover:text-[#1D1A33] transition-colors cursor-pointer"
                >
                  2D Body Explorer
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigate('library');
                  }}
                  className="hover:text-[#1D1A33] transition-colors cursor-pointer"
                >
                  Organ Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigate('systems');
                  }}
                  className="hover:text-[#1D1A33] transition-colors cursor-pointer"
                >
                  10 Body Systems
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigate('quiz');
                  }}
                  className="hover:text-[#1D1A33] transition-colors cursor-pointer"
                >
                  Quiz Arena
                </button>
              </li>
            </ul>
          </div>

          {/* Sources */}
          <div className="space-y-2">
            <h4 className="eyebrow-tag text-[#1D1A33] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#FF9A4D]" /> Science Sources
            </h4>
            <ul className="space-y-1.5 text-xs text-[#5A5672]">
              <li>• U.S. National Library of Medicine (MedlinePlus)</li>
              <li>• National Institutes of Health (NIH / NIGMS)</li>
              <li>• National Human Genome Research Institute</li>
              <li>• American Heart Association</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Strip */}
        <div className="pt-6 border-t border-[#F0E6D0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#5A5672]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#FF9A4D] shrink-0" />
            <span>
              Disclaimer: BodyQuest is created purely for educational curiosity and does not provide medical diagnosis or treatment advice.
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0 text-[#1D1A33]">
            <span>Crafted for human curiosity</span>
            <Heart className="w-3.5 h-3.5 text-[#FF9A4D] inline fill-current ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
