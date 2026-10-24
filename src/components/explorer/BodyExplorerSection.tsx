import React, { useState } from 'react';
import { ORGANS } from '../../data/organs';
import { OrganId } from '../../types';
import { BodyIllustration } from './BodyIllustration';
import { OrganDetailPanel } from './OrganDetailPanel';
import { useProgress } from '../../context/ProgressContext';
import { Trophy, CheckCircle, Sparkles } from 'lucide-react';

interface BodyExplorerSectionProps {
  onExploreSystem?: (systemId: string) => void;
  initialOrganId?: OrganId;
}

export const BodyExplorerSection: React.FC<BodyExplorerSectionProps> = ({
  onExploreSystem,
  initialOrganId = 'brain'
}) => {
  const [selectedOrganId, setSelectedOrganId] = useState<OrganId>(initialOrganId);
  const [activeSystemFilter, setActiveSystemFilter] = useState<string>('all');
  const { state } = useProgress();

  const selectedOrgan = ORGANS.find((o) => o.id === selectedOrganId) || ORGANS[0];
  const allExplored = state.exploredOrgans.length >= 7;

  const systemsList = [
    { id: 'all', label: 'All Organs' },
    { id: 'nervous', label: 'Nervous' },
    { id: 'cardiovascular', label: 'Cardiovascular' },
    { id: 'respiratory', label: 'Respiratory' },
    { id: 'digestive', label: 'Digestive' },
    { id: 'urinary', label: 'Urinary' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="eyebrow-tag text-[#5A5672] block mb-2">
          KNOW YOUR BODY · 2D EXPLORER
        </span>
        <h1 className="text-4xl sm:text-5xl font-normal font-serif-editorial text-[#1D1A33] tracking-tight leading-tight">
          Explore the <em className="italic">human body</em>.
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#5A5672] leading-relaxed">
          Tap any organ on the silhouette to inspect its shape, vital roles, and surprising science.
        </p>

        {/* Clean Filter Pills */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {systemsList.map((sys) => (
            <button
              key={sys.id}
              onClick={() => setActiveSystemFilter(sys.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeSystemFilter === sys.id
                  ? 'bg-[#1D1A33] text-white shadow-sm'
                  : 'bg-white text-[#1D1A33] hover:bg-[#F3EAD3] border border-[#E8DEC4]'
              }`}
            >
              {sys.label}
            </button>
          ))}
        </div>
      </div>

      {/* Explorer Completion Banner */}
      {allExplored && (
        <div className="bg-[#DFF59B] border border-[#CDEB80] rounded-[24px] p-5 flex items-center justify-between gap-4 shadow-soft">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#2E5A14] shrink-0 shadow-sm">
              <Trophy className="w-5 h-5 text-[#2E5A14]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1D1A33] flex items-center gap-1.5">
                Body Explorer Complete!
                <CheckCircle className="w-4 h-4 text-[#2E5A14] inline" />
              </h3>
              <p className="text-xs sm:text-sm text-[#2E5A14]">
                You have inspected all 7 vital organs. Continue testing your knowledge in the Quiz Arena!
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 bg-white text-[#1D1A33] font-bold text-xs rounded-full shadow-sm">
            7 / 7 EXPLORED
          </span>
        </div>
      )}

      {/* Main Grid: Body Illustration beside Organ Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Illustration Card */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full bg-[#FAF0D9] border border-[#E8DEC4] rounded-[28px] p-6 sm:p-8 shadow-soft relative">
            <BodyIllustration
              organs={ORGANS}
              selectedOrganId={selectedOrganId}
              onSelectOrgan={setSelectedOrganId}
              exploredOrganIds={state.exploredOrgans}
              activeSystemFilter={activeSystemFilter === 'all' ? undefined : activeSystemFilter}
            />
          </div>
        </div>

        {/* Right: Detailed Organ Panel */}
        <div className="lg:col-span-7">
          <OrganDetailPanel
            organ={selectedOrgan}
            organs={ORGANS}
            onSelectOrgan={setSelectedOrganId}
            onExploreSystem={onExploreSystem}
          />
        </div>
      </div>
    </div>
  );
};
