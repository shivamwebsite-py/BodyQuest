import React, { useState, useMemo } from 'react';
import { ORGANS } from '../../data/organs';
import { OrganId } from '../../types';
import { OrganArtwork } from '../explorer/OrganArtwork';
import { useProgress } from '../../context/ProgressContext';
import { sound } from '../../utils/audio';
import {
  Search,
  X,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface OrganLibrarySectionProps {
  onSelectOrganToExplore: (organId: OrganId) => void;
}

export const OrganLibrarySection: React.FC<OrganLibrarySectionProps> = ({
  onSelectOrganToExplore
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { state } = useProgress();

  const categories = [
    { id: 'all', label: 'All Organs' },
    { id: 'nervous', label: 'Nervous' },
    { id: 'cardiovascular', label: 'Cardiovascular' },
    { id: 'respiratory', label: 'Respiratory' },
    { id: 'digestive', label: 'Digestive' },
    { id: 'urinary', label: 'Urinary' },
  ];

  const filteredOrgans = useMemo(() => {
    return ORGANS.filter((organ) => {
      const matchesCategory =
        selectedCategory === 'all' || organ.systemId === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        organ.name.toLowerCase().includes(q) ||
        organ.scientificName.toLowerCase().includes(q) ||
        organ.systemName.toLowerCase().includes(q) ||
        organ.primaryFunctions.some((f) => f.toLowerCase().includes(q)) ||
        organ.location.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const handleCardClick = (id: OrganId) => {
    sound.playClick();
    onSelectOrganToExplore(id);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="eyebrow-tag text-[#5A5672] block mb-2">
          ANATOMICAL CATALOG
        </span>
        <h1 className="text-4xl sm:text-5xl font-normal font-serif-editorial text-[#1D1A33] tracking-tight leading-tight">
          The organ <em className="italic">library</em>.
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#5A5672] leading-relaxed">
          Filter by biological network or search by organ name and vital roles.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white border border-[#E8DEC4] p-4 rounded-[24px] shadow-soft">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#5A5672] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search organ name, scientific term, or role..."
            className="w-full pl-10 pr-10 py-2.5 rounded-full bg-[#FBF3E0] border border-[#E8DEC4] text-sm text-[#1D1A33] placeholder-[#8F8B9F] focus:outline-none focus:border-[#1D1A33] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A5672] hover:text-[#1D1A33]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1D1A33] text-white font-bold shadow-sm'
                  : 'bg-[#FBF3E0] text-[#1D1A33] hover:bg-[#F3EAD3] border border-[#E8DEC4]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Organ Cards */}
      {filteredOrgans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrgans.map((organ) => {
            const isExplored = state.exploredOrgans.includes(organ.id);
            const isLearned = state.learnedOrgans.includes(organ.id);

            return (
              <div
                key={organ.id}
                onClick={() => handleCardClick(organ.id)}
                className="group bg-white border border-[#E8DEC4] hover:border-[#1D1A33] rounded-[28px] p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="eyebrow-tag text-[#5A5672]">
                      {organ.systemName}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {isExplored ? (
                        <span className="text-[11px] font-bold text-[#2E5A14] bg-[#DFF59B] px-2.5 py-0.5 rounded-full">
                          ✓ Explored
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-[#5A5672] bg-[#FBF3E0] border border-[#E8DEC4] px-2 py-0.5 rounded-full">
                          Undiscovered
                        </span>
                      )}
                      {isLearned && (
                        <span className="text-[11px] font-bold text-[#1D1A33] bg-[#FFD9B5] px-2 py-0.5 rounded-full">
                          ★ Mastered
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="shrink-0 group-hover:scale-105 transition-transform">
                      <OrganArtwork organId={organ.id} className="w-16 h-16" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-normal font-serif-editorial text-[#1D1A33] group-hover:text-[#2B2A6E] transition-colors">
                        {organ.name}
                      </h2>
                      <p className="text-xs italic font-serif-editorial text-[#5A5672]">
                        {organ.scientificName}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#5A5672] line-clamp-2 leading-relaxed mb-4">
                    {organ.whyItMatters}
                  </p>

                  <div className="p-3 rounded-2xl bg-[#FBF3E0] border border-[#E8DEC4] text-xs text-[#1D1A33] mb-4">
                    <span className="font-bold text-[#1D1A33] block mb-0.5">Primary Role:</span>
                    <span className="line-clamp-1 text-[#5A5672]">{organ.primaryFunctions[0]}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F0E6D0] flex items-center justify-between text-xs font-bold text-[#1D1A33]">
                  <span>Explore organ details</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-[#E8DEC4] rounded-[28px] p-8 max-w-md mx-auto shadow-soft">
          <div className="w-12 h-12 rounded-full bg-[#FBF3E0] flex items-center justify-center mx-auto mb-3 text-[#5A5672]">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-serif-editorial text-[#1D1A33] mb-1">No matching organs</h3>
          <p className="text-xs text-[#5A5672] mb-4">
            We couldn't find any organs matching "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-5 py-2 text-xs font-bold rounded-full bg-[#DFF59B] text-[#1D1A33] hover:bg-[#D4ED8A] transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
