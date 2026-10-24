import React from 'react';
import { getDailyScienceFact } from '../../data/facts';
import { ORGANS } from '../../data/organs';
import { OrganId } from '../../types';
import { OrganArtwork } from '../explorer/OrganArtwork';
import { useProgress } from '../../context/ProgressContext';
import { sound } from '../../utils/audio';
import {
  ArrowRight,
  Heart,
  Droplet,
  Moon,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (section: string) => void;
  onSelectOrganToExplore: (organId: OrganId) => void;
  onSelectSystemToExplore: (systemId: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onNavigate,
  onSelectOrganToExplore,
  onSelectSystemToExplore
}) => {
  const { state, levelInfo } = useProgress();
  const dailyFact = getDailyScienceFact();

  const isReturningUser = state.totalXp > 0 || state.exploredOrgans.length > 0;

  // Tilted cards with soft shadows (Mood Board 03)
  const stationCards = [
    {
      id: 'explore',
      title: 'Heartbeat Lab',
      subtitle: 'Feel your pulse, then watch how organs interact.',
      bgColor: 'bg-[#E8D6FF]', // Nerve Lilac
      iconBg: 'bg-[#FF9A4D]', // Glow Orange
      icon: <Heart className="w-5 h-5 text-white fill-current" />,
      tilt: '-rotate-1 hover:rotate-0',
      section: 'explore'
    },
    {
      id: 'systems',
      title: 'Gut Check',
      subtitle: 'A guided tour of your second brain & bodily harmony.',
      bgColor: 'bg-[#FFD9B5]', // Marrow Peach
      iconBg: 'bg-[#CDEBFA]', // Lymph Sky
      icon: <Droplet className="w-5 h-5 text-[#2B2A6E] fill-current" />,
      tilt: 'rotate-1 hover:rotate-0',
      section: 'systems'
    },
    {
      id: 'quiz',
      title: 'Brain Gym',
      subtitle: '30+ curious questions to challenge your anatomy smarts.',
      bgColor: 'bg-[#DFF59B]', // Pulse Lime
      iconBg: 'bg-[#2B2A6E]', // Deep Indigo
      icon: <Zap className="w-5 h-5 text-[#DFF59B] fill-current" />,
      tilt: '-rotate-1 hover:rotate-0',
      section: 'quiz'
    },
    {
      id: 'daily',
      title: 'Daily Rhythm',
      subtitle: 'Five fresh bite-sized questions calibrated for today.',
      bgColor: 'bg-[#CDEBFA]', // Lymph Sky
      iconBg: 'bg-[#F9A9CF]', // Blush Pink
      icon: <Moon className="w-5 h-5 text-[#2B2A6E] fill-current" />,
      tilt: 'rotate-1 hover:rotate-0',
      section: 'daily'
    }
  ];

  return (
    <div className="space-y-16 max-w-6xl mx-auto px-4 sm:px-6">
      {/* ================= HERO (MOOD BOARD EXACT DESIGN) ================= */}
      <section className="bg-white border border-[#E8DEC4] rounded-[36px] p-8 sm:p-14 lg:p-20 text-center shadow-soft relative overflow-hidden">
        {/* Soft Pink-Orange Glowing Orb in background */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 rounded-full bg-gradient-to-tr from-[#FF9A4D] via-[#F9A9CF] to-[#E8D6FF] blur-sm opacity-90 shadow-md" />

        <div className="max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl font-normal font-serif-editorial text-[#1D1A33] tracking-tight leading-[1.12]">
            Your body has <em className="italic">a lot</em> to say.
          </h1>

          <p className="text-base sm:text-lg text-[#5A5672] font-normal leading-relaxed pt-1">
            Ready to stop guessing what's going on in there?
          </p>

          {/* Primary Pulse Button */}
          <div className="pt-4 pb-2">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('explore');
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#DFF59B] hover:bg-[#D4ED8A] text-[#1D1A33] font-bold text-sm tracking-wide shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>Start exploring</span>
              <span className="text-base">✻</span>
            </button>
          </div>

          <p className="eyebrow-tag text-[#5A5672] tracking-widest pt-1">
            FREE TO EXPLORE · NO SIGN-UP NEEDED
          </p>
        </div>
      </section>

      {/* ================= PROGRESS STRIP (FOR RETURNING LEARNERS) ================= */}
      {isReturningUser && (
        <section className="bg-white border border-[#E8DEC4] rounded-[24px] p-5 sm:p-6 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#DFF59B] flex items-center justify-center text-[#1D1A33] font-bold shrink-0">
              ★
            </div>
            <div>
              <span className="eyebrow-tag text-[#5A5672]">YOUR JOURNEY SO FAR</span>
              <h3 className="text-lg font-bold font-serif-editorial text-[#1D1A33]">
                {levelInfo.current} · <span className="font-sans font-bold text-[#FF9A4D]">{state.totalXp} XP</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#5A5672]">
            <span><strong>{state.exploredOrgans.length}/7</strong> Organs</span>
            <span>•</span>
            <span><strong>{state.exploredSystems.length}/10</strong> Systems</span>
            <span>•</span>
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('progress');
              }}
              className="font-bold text-[#1D1A33] hover:underline cursor-pointer"
            >
              View dashboard →
            </button>
          </div>
        </section>
      )}

      {/* ================= 4 TILTED CARDS, SOFT SHADOWS (MOOD BOARD 03) ================= */}
      <section className="space-y-4">
        <div className="text-left">
          <span className="eyebrow-tag text-[#5A5672] block">DISCOVERY STATIONS</span>
          <h2 className="text-2xl sm:text-3xl font-normal font-serif-editorial text-[#1D1A33]">
            Curious, warm &amp; a <em className="italic">little bit nerdy</em>.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {stationCards.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                sound.playClick();
                onNavigate(card.section);
              }}
              className={`${card.bgColor} rounded-[28px] p-7 transition-all duration-300 ${card.tilt} shadow-soft hover:shadow-soft-lg flex flex-col justify-between min-h-[220px] cursor-pointer`}
            >
              <div>
                <h3 className="text-2xl font-normal font-serif-editorial text-[#1D1A33] mb-2 leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#1D1A33]/80 leading-relaxed">
                  {card.subtitle}
                </p>
              </div>

              <div className="flex justify-end pt-6">
                <div className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center shadow-sm`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= EDITORIAL FACT BANNER (MOOD BOARD 02) ================= */}
      <section className="bg-white border border-[#E8DEC4] rounded-[32px] p-8 sm:p-10 shadow-soft">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="eyebrow-tag text-[#5A5672]">
              ORGAN FACTS · {dailyFact.organOrSystem.toUpperCase()}
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal font-serif-editorial text-[#1D1A33] leading-tight">
              "{dailyFact.fact}"
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5672] leading-relaxed pt-1">
              {dailyFact.detail}
            </p>
            <span className="text-[11px] text-[#5A5672] block pt-1">
              Verified Source: {dailyFact.source}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('explore');
            }}
            className="px-6 py-3 rounded-full bg-[#FBF3E0] hover:bg-[#F3EAD3] text-[#1D1A33] font-bold text-xs border border-[#E8DEC4] transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            Explore related organ →
          </button>
        </div>
      </section>

      {/* ================= FEATURED DUOTONE ORGANS (MOOD BOARD 04) ================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="eyebrow-tag text-[#5A5672] block">ANATOMICAL CAST</span>
            <h2 className="text-2xl sm:text-3xl font-normal font-serif-editorial text-[#1D1A33]">
              Meet the parts that <em className="italic">never clock out</em>.
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('library');
            }}
            className="text-xs font-bold text-[#1D1A33] hover:underline flex items-center gap-1 cursor-pointer"
          >
            All organs →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          {ORGANS.slice(0, 3).map((organ) => (
            <div
              key={organ.id}
              onClick={() => {
                sound.playClick();
                onSelectOrganToExplore(organ.id);
              }}
              className="bg-white border border-[#E8DEC4] rounded-[28px] p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="eyebrow-tag text-[#5A5672]">
                    {organ.systemName}
                  </span>
                  {state.exploredOrgans.includes(organ.id) && (
                    <span className="text-xs text-[#2E5A14] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Explored
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="shrink-0">
                    <OrganArtwork organId={organ.id} className="w-16 h-16" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-normal font-serif-editorial text-[#1D1A33]">
                      {organ.name}
                    </h3>
                    <p className="text-xs italic font-serif-editorial text-[#5A5672]">
                      {organ.scientificName}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#5A5672] line-clamp-2 leading-relaxed">
                  {organ.whyItMatters}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F0E6D0] flex items-center justify-between text-xs font-bold text-[#1D1A33]">
                <span>Inspect organ</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
