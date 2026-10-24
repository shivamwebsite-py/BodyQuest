import React, { useState } from 'react';
import { BODY_SYSTEMS } from '../../data/systems';
import { BodySystem, OrganId } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { sound } from '../../utils/audio';
import {
  Zap,
  Heart,
  Wind,
  Utensils,
  Droplets,
  Bone,
  Activity,
  Sparkles,
  Shield,
  Sun,
  X,
  ChevronRight,
  ExternalLink,
  Target
} from 'lucide-react';

interface BodySystemsSectionProps {
  onSelectOrganToExplore: (organId: OrganId) => void;
  onStartCategoryQuiz?: (category: string) => void;
  initialSystemId?: string;
}

export const BodySystemsSection: React.FC<BodySystemsSectionProps> = ({
  onSelectOrganToExplore,
  onStartCategoryQuiz,
  initialSystemId
}) => {
  const [selectedSystem, setSelectedSystem] = useState<BodySystem | null>(() => {
    if (initialSystemId) {
      return BODY_SYSTEMS.find((s) => s.id === initialSystemId) || null;
    }
    return null;
  });

  const { state, exploreSystem } = useProgress();

  const getSystemIcon = (name: string, className = 'w-6 h-6') => {
    switch (name) {
      case 'Zap': return <Zap className={className} />;
      case 'Heart': return <Heart className={className} />;
      case 'Wind': return <Wind className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      case 'Droplets': return <Droplets className={className} />;
      case 'Bone': return <Bone className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Sun': return <Sun className={className} />;
      default: return <Activity className={className} />;
    }
  };

  // Pastel theme mapping for systems
  const getSystemPalette = (idx: number) => {
    const palettes = [
      { cardBg: 'bg-[#E8D6FF]', iconBg: 'bg-[#2B2A6E]', iconColor: 'text-[#E8D6FF]' }, // Lilac
      { cardBg: 'bg-[#FFD9B5]', iconBg: 'bg-[#FF9A4D]', iconColor: 'text-white' }, // Peach
      { cardBg: 'bg-[#CDEBFA]', iconBg: 'bg-[#2B2A6E]', iconColor: 'text-[#CDEBFA]' }, // Sky
      { cardBg: 'bg-[#DFF59B]', iconBg: 'bg-[#2E5A14]', iconColor: 'text-[#DFF59B]' }, // Lime
      { cardBg: 'bg-white', iconBg: 'bg-[#2B2A6E]', iconColor: 'text-white' }, // White/Bone
    ];
    return palettes[idx % palettes.length];
  };

  const handleOpenSystem = (sys: BodySystem) => {
    sound.playClick();
    exploreSystem(sys.id);
    setSelectedSystem(sys);
  };

  const mapOrganNameToId = (name: string): OrganId | null => {
    const clean = name.toLowerCase();
    if (clean.includes('brain')) return 'brain';
    if (clean.includes('heart')) return 'heart';
    if (clean.includes('lung')) return 'lungs';
    if (clean.includes('liver')) return 'liver';
    if (clean.includes('stomach')) return 'stomach';
    if (clean.includes('kidney')) return 'kidneys';
    if (clean.includes('intestine')) return 'intestines';
    return null;
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="eyebrow-tag text-[#5A5672] block mb-2">
          BIOLOGICAL HARMONY
        </span>
        <h1 className="text-4xl sm:text-5xl font-normal font-serif-editorial text-[#1D1A33] tracking-tight leading-tight">
          Major body <em className="italic">systems</em>.
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#5A5672] leading-relaxed">
          No organ works alone. Discover how these 10 synchronized networks collaborate in rhythm.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#1D1A33] bg-white px-4 py-1.5 rounded-full border border-[#E8DEC4] shadow-sm">
          <span>{state.exploredSystems.length} of 10 Systems Explored</span>
          {state.exploredSystems.length >= 5 && (
            <span className="text-[#2E5A14]">★ Scholar</span>
          )}
        </div>
      </div>

      {/* Grid of 10 Systems */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BODY_SYSTEMS.map((system, idx) => {
          const isExplored = state.exploredSystems.includes(system.id);
          const palette = getSystemPalette(idx);

          return (
            <div
              key={system.id}
              onClick={() => handleOpenSystem(system)}
              className={`${palette.cardBg} border border-[#E8DEC4] rounded-[28px] p-7 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer group`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl ${palette.iconBg} ${palette.iconColor} flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    {getSystemIcon(system.iconName)}
                  </div>

                  {isExplored ? (
                    <span className="text-[11px] font-bold text-[#2E5A14] bg-white/80 px-2.5 py-0.5 rounded-full shadow-sm">
                      ✓ Explored
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-[#5A5672] bg-white/60 px-2.5 py-0.5 rounded-full">
                      Explore
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-normal font-serif-editorial text-[#1D1A33] mb-2 leading-snug">
                  {system.name}
                </h2>

                <p className="text-xs sm:text-sm text-[#1D1A33]/80 leading-relaxed line-clamp-3 mb-4">
                  {system.mainFunction}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {system.importantOrgans.slice(0, 3).map((org, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/70 text-[#1D1A33] font-medium"
                    >
                      {org}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#1D1A33]/10 flex items-center justify-between text-xs font-bold text-[#1D1A33]">
                <span>View system blueprint</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Clean Editorial Modal */}
      {selectedSystem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D1A33]/40 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-[#E8DEC4] rounded-[32px] p-6 sm:p-10 shadow-soft-lg my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedSystem(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#FBF3E0] hover:bg-[#F3EAD3] text-[#1D1A33] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6 pr-10">
              <div className="w-14 h-14 rounded-2xl bg-[#E8D6FF] text-[#2B2A6E] flex items-center justify-center shrink-0">
                {getSystemIcon(selectedSystem.iconName, 'w-7 h-7')}
              </div>
              <div>
                <span className="eyebrow-tag text-[#5A5672]">
                  BODY SYSTEM BLUEPRINT
                </span>
                <h2 className="text-3xl font-normal font-serif-editorial text-[#1D1A33]">
                  {selectedSystem.name}
                </h2>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="eyebrow-tag text-[#5A5672] mb-2">
                  System Architecture
                </h3>
                <p className="text-sm sm:text-base text-[#1D1A33] leading-relaxed mb-3">
                  {selectedSystem.conciseExplanation}
                </p>
                <div className="p-4 rounded-2xl bg-[#FBF3E0] border border-[#E8DEC4] text-xs sm:text-sm text-[#1D1A33]">
                  <strong className="block mb-0.5">Core Mission:</strong>
                  {selectedSystem.mainFunction}
                </div>
              </div>

              <div>
                <h3 className="eyebrow-tag text-[#5A5672] mb-2.5">
                  Key Organs &amp; Structures
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSystem.importantOrgans.map((organName, idx) => {
                    const organId = mapOrganNameToId(organName);
                    return organId ? (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedSystem(null);
                          onSelectOrganToExplore(organId);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#DFF59B] text-[#1D1A33] text-xs font-bold transition-all hover:bg-[#D4ED8A] cursor-pointer"
                      >
                        <span>{organName}</span>
                        <ExternalLink className="w-3 h-3 text-[#2E5A14]" />
                      </button>
                    ) : (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-full bg-[#FBF3E0] border border-[#E8DEC4] text-[#1D1A33] text-xs font-medium"
                      >
                        {organName}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="eyebrow-tag text-[#5A5672] mb-2.5">
                  Verified Discoveries
                </h3>
                <div className="space-y-2.5">
                  {selectedSystem.facts.map((fact, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#FBF3E0] border border-[#E8DEC4] text-xs sm:text-sm text-[#1D1A33] flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#FFD9B5] text-[#1D1A33] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#E8D6FF] border border-[#2B2A6E]/20">
                <span className="eyebrow-tag text-[#2B2A6E] block mb-1">
                  How It Works in Concert
                </span>
                <p className="text-xs sm:text-sm text-[#1D1A33] leading-relaxed">
                  {selectedSystem.harmony}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FBF3E0] border border-[#E8DEC4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-[#1D1A33]">Recommended Challenge</h4>
                  <p className="text-xs text-[#5A5672]">{selectedSystem.relatedChallenge}</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedSystem(null);
                    onStartCategoryQuiz?.('Body Systems');
                  }}
                  className="px-5 py-2.5 text-xs font-bold rounded-full bg-[#DFF59B] hover:bg-[#D4ED8A] text-[#1D1A33] whitespace-nowrap transition-all shadow-sm cursor-pointer"
                >
                  Test in Quiz Arena
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
