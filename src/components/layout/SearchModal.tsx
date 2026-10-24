import React, { useState, useMemo } from 'react';
import { ORGANS } from '../../data/organs';
import { BODY_SYSTEMS } from '../../data/systems';
import { OrganId } from '../../types';
import { sound } from '../../utils/audio';
import {
  Search,
  X,
  Shuffle,
  Layers,
  Activity,
  ArrowRight
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOrgan: (id: OrganId) => void;
  onSelectSystem: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectOrgan,
  onSelectSystem
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { organs: [], systems: [] };

    const matchingOrgans = ORGANS.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.scientificName.toLowerCase().includes(q) ||
        o.primaryFunctions.some((f) => f.toLowerCase().includes(q)) ||
        o.location.toLowerCase().includes(q)
    );

    const matchingSystems = BODY_SYSTEMS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.mainFunction.toLowerCase().includes(q) ||
        s.importantOrgans.some((o) => o.toLowerCase().includes(q))
    );

    return { organs: matchingOrgans, systems: matchingSystems };
  }, [query]);

  if (!isOpen) return null;

  const handleRandomDiscovery = () => {
    sound.playFanfare();
    const isOrgan = Math.random() > 0.3;
    if (isOrgan) {
      const randomOrgan = ORGANS[Math.floor(Math.random() * ORGANS.length)];
      onSelectOrgan(randomOrgan.id);
    } else {
      const randomSystem = BODY_SYSTEMS[Math.floor(Math.random() * BODY_SYSTEMS.length)];
      onSelectSystem(randomSystem.id);
    }
    onClose();
  };

  const handleOrganClick = (id: OrganId) => {
    sound.playClick();
    onSelectOrgan(id);
    onClose();
  };

  const handleSystemClick = (id: string) => {
    sound.playClick();
    onSelectSystem(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-[#1D1A33]/40 backdrop-blur-sm">
      <div className="bg-white border border-[#E8DEC4] rounded-[32px] max-w-xl w-full p-6 sm:p-8 shadow-soft-lg space-y-5">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#F0E6D0]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#5A5672] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search organs, systems, or functions..."
              className="w-full pl-10 pr-10 py-3 rounded-full bg-[#FBF3E0] border border-[#E8DEC4] text-sm text-[#1D1A33] placeholder-[#8F8B9F] focus:outline-none focus:border-[#1D1A33] transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A5672] hover:text-[#1D1A33]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#FBF3E0] hover:bg-[#F3EAD3] text-[#1D1A33] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Discover Something Random Button */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#E8D6FF] border border-[#2B2A6E]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2B2A6E] shadow-sm">
              <Shuffle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1D1A33] block">Curious mind?</span>
              <span className="text-[11px] text-[#5A5672]">Jump to a surprise organ or body system</span>
            </div>
          </div>

          <button
            onClick={handleRandomDiscovery}
            className="px-4 py-2 rounded-full bg-[#DFF59B] hover:bg-[#D4ED8A] text-[#1D1A33] font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            Discover Random
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-1">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-[#5A5672] text-xs">
              Try searching "heart", "oxygen", "brain", or "digestive" to quickly inspect anatomical parts.
            </div>
          ) : searchResults.organs.length === 0 && searchResults.systems.length === 0 ? (
            <div className="py-8 text-center text-[#5A5672] text-xs">
              No matching organs or body systems found for "{query}".
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.organs.length > 0 && (
                <div>
                  <span className="eyebrow-tag text-[#5A5672] mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#FF9A4D]" /> Organs ({searchResults.organs.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.organs.map((organ) => (
                      <button
                        key={organ.id}
                        onClick={() => handleOrganClick(organ.id)}
                        className="w-full p-3.5 rounded-2xl bg-[#FBF3E0] hover:bg-[#F3EAD3] border border-[#E8DEC4] text-left flex items-center justify-between transition-colors group cursor-pointer"
                      >
                        <div>
                          <span className="text-sm font-bold text-[#1D1A33]">
                            {organ.name}
                          </span>
                          <span className="text-xs italic font-serif-editorial text-[#5A5672] ml-2">
                            ({organ.scientificName})
                          </span>
                          <p className="text-xs text-[#5A5672] line-clamp-1 mt-0.5">
                            {organ.location}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#1D1A33] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.systems.length > 0 && (
                <div>
                  <span className="eyebrow-tag text-[#5A5672] mb-2 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#2B2A6E]" /> Body Systems ({searchResults.systems.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.systems.map((system) => (
                      <button
                        key={system.id}
                        onClick={() => handleSystemClick(system.id)}
                        className="w-full p-3.5 rounded-2xl bg-[#FBF3E0] hover:bg-[#F3EAD3] border border-[#E8DEC4] text-left flex items-center justify-between transition-colors group cursor-pointer"
                      >
                        <div>
                          <span className="text-sm font-bold text-[#1D1A33]">
                            {system.name}
                          </span>
                          <p className="text-xs text-[#5A5672] line-clamp-1 mt-0.5">
                            {system.mainFunction}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#1D1A33] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
