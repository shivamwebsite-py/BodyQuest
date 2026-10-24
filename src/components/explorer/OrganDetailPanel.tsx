import React, { useState, useEffect } from 'react';
import { Organ, OrganId } from '../../types';
import { OrganArtwork } from './OrganArtwork';
import { useProgress } from '../../context/ProgressContext';
import { sound } from '../../utils/audio';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Sparkles,
  Award,
  BookOpen,
  Lightbulb,
  HelpCircle
} from 'lucide-react';

interface OrganDetailPanelProps {
  organ: Organ;
  organs: Organ[];
  onSelectOrgan: (id: OrganId) => void;
  onExploreSystem?: (systemId: string) => void;
}

export const OrganDetailPanel: React.FC<OrganDetailPanelProps> = ({
  organ,
  organs,
  onSelectOrgan,
  onExploreSystem
}) => {
  const {
    state,
    markOrganLearned,
    completeKnowledgeCheck,
    exploreOrgan
  } = useProgress();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'facts' | 'quiz'>('overview');

  useEffect(() => {
    exploreOrgan(organ.id);
    setSelectedOption(null);
    setHasAnswered(state.completedKnowledgeChecks.includes(organ.id));
    setActiveTab('overview');
  }, [organ.id, exploreOrgan, state.completedKnowledgeChecks]);

  const currentIndex = organs.findIndex((o) => o.id === organ.id);
  const isExplored = state.exploredOrgans.includes(organ.id);
  const isLearned = state.learnedOrgans.includes(organ.id);
  const isQuizCompleted = state.completedKnowledgeChecks.includes(organ.id);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + organs.length) % organs.length;
    sound.playClick();
    onSelectOrgan(organs[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % organs.length;
    sound.playClick();
    onSelectOrgan(organs[nextIdx].id);
  };

  const handleKnowledgeCheckSubmit = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    if (idx === organ.knowledgeCheck.correctIndex) {
      sound.playCorrect();
      completeKnowledgeCheck(organ.id);
    } else {
      sound.playIncorrect();
    }
  };

  const handleMarkLearned = () => {
    if (!isLearned) {
      sound.playFanfare();
      markOrganLearned(organ.id);
    }
  };

  return (
    <div className="bg-white border border-[#E8DEC4] rounded-[28px] p-6 lg:p-8 shadow-soft flex flex-col justify-between">
      <div>
        {/* Eyebrow and Stepper */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F0E6D0] mb-6">
          <div className="flex items-center gap-2">
            <span className="eyebrow-tag text-[#5A5672]">
              ORGAN FACTS · {currentIndex + 1} OF {organs.length}
            </span>
            {isExplored && (
              <span className="text-[11px] font-bold text-[#2E5A14] bg-[#DFF59B] px-2.5 py-0.5 rounded-full">
                ✓ Explored
              </span>
            )}
            {isLearned && (
              <span className="text-[11px] font-bold text-[#1D1A33] bg-[#FFD9B5] px-2.5 py-0.5 rounded-full">
                ★ Mastered
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              aria-label="Previous Organ"
              className="p-1.5 rounded-full bg-[#FBF3E0] hover:bg-[#F3EAD3] text-[#1D1A33] transition-colors border border-[#E8DEC4] cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Organ"
              className="p-1.5 rounded-full bg-[#FBF3E0] hover:bg-[#F3EAD3] text-[#1D1A33] transition-colors border border-[#E8DEC4] cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Organ Hero Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
          <div className="shrink-0">
            <OrganArtwork organId={organ.id} className="w-24 h-24 sm:w-28 sm:h-28" isPulsing={organ.id === 'heart'} />
          </div>

          <div className="flex-1">
            <div className="flex items-baseline gap-2 flex-wrap mb-1">
              <h2 className="text-3xl sm:text-4xl font-normal font-serif-editorial text-[#1D1A33]">
                {organ.name}
              </h2>
              <span className="text-sm italic font-serif-editorial text-[#5A5672]">
                ({organ.scientificName})
              </span>
            </div>

            <button
              onClick={() => onExploreSystem?.(organ.systemId)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full text-[#2B2A6E] bg-[#E8D6FF] hover:opacity-90 transition-opacity mb-2.5 cursor-pointer"
            >
              {organ.systemName}
            </button>

            <div className="flex items-start gap-1.5 text-xs text-[#5A5672] leading-relaxed">
              <MapPin className="w-3.5 h-3.5 text-[#FF9A4D] shrink-0 mt-0.5" />
              <span>{organ.location}</span>
            </div>
          </div>
        </div>

        {/* Clean Editorial Pill Tabs */}
        <div className="grid grid-cols-3 gap-1.5 bg-[#FBF3E0] p-1.5 rounded-2xl mb-6 border border-[#E8DEC4]">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('overview');
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white text-[#1D1A33] shadow-sm'
                : 'text-[#5A5672] hover:text-[#1D1A33]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Roles
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('facts');
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'facts'
                ? 'bg-white text-[#1D1A33] shadow-sm'
                : 'text-[#5A5672] hover:text-[#1D1A33]'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-[#FF9A4D]" /> Science Facts
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('quiz');
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-white text-[#1D1A33] shadow-sm'
                : 'text-[#5A5672] hover:text-[#1D1A33]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#2B2A6E]" /> Quick Check
            {isQuizCompleted && <span className="text-[#2E5A14] font-bold">✓</span>}
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="min-h-[220px]">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h3 className="eyebrow-tag text-[#5A5672] mb-3">
                  Key Functions
                </h3>
                <ul className="space-y-2.5">
                  {organ.primaryFunctions.map((fn, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#1D1A33] leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-[#FF9A4D] mt-2 shrink-0" />
                      <span>{fn}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FBF3E0] border border-[#E8DEC4] rounded-2xl p-4">
                <span className="eyebrow-tag text-[#2B2A6E] block mb-1">
                  Why It Matters
                </span>
                <p className="text-xs sm:text-sm text-[#1D1A33] leading-relaxed">
                  {organ.whyItMatters}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'facts' && (
            <div className="space-y-3">
              <h3 className="eyebrow-tag text-[#5A5672] mb-2">
                Verified Scientific Facts
              </h3>
              {organ.facts.map((fact, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#FBF3E0] border border-[#E8DEC4] flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-[#FFD9B5] text-[#1D1A33] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-[#1D1A33] leading-relaxed">
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="eyebrow-tag text-[#5A5672]">
                  Knowledge Check (+15 XP)
                </span>
                {isQuizCompleted && (
                  <span className="text-xs text-[#2E5A14] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Answered Correctly!
                  </span>
                )}
              </div>

              <p className="text-base font-normal font-serif-editorial text-[#1D1A33]">
                {organ.knowledgeCheck.question}
              </p>

              <div className="space-y-2">
                {organ.knowledgeCheck.options.map((opt, idx) => {
                  const isCorrect = idx === organ.knowledgeCheck.correctIndex;
                  const isChosen = selectedOption === idx;

                  let btnStyle = 'bg-[#FBF3E0] hover:bg-[#F3EAD3] text-[#1D1A33] border-[#E8DEC4]';

                  if (hasAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-[#DFF59B] border-[#2E5A14] text-[#1D1A33] font-bold';
                    } else if (isChosen && !isCorrect) {
                      btnStyle = 'bg-[#F9A9CF] border-[#2B2A6E] text-[#1D1A33]';
                    } else {
                      btnStyle = 'bg-[#FBF3E0] text-slate-400 border-[#E8DEC4] opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasAnswered}
                      onClick={() => handleKnowledgeCheckSubmit(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && isCorrect && <span className="font-bold text-[#2E5A14]">✓</span>}
                    </button>
                  );
                })}
              </div>

              {hasAnswered && (
                <div className="p-4 rounded-2xl bg-[#E8D6FF] border border-[#2B2A6E]/20 text-xs sm:text-sm text-[#1D1A33] leading-relaxed">
                  <span className="font-bold block mb-1">
                    {selectedOption === organ.knowledgeCheck.correctIndex ? '✓ Correct!' : 'Scientific Fact:'}
                  </span>
                  {organ.knowledgeCheck.explanation}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 mt-6 border-t border-[#F0E6D0] flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={handleMarkLearned}
          disabled={isLearned}
          className={`w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isLearned
              ? 'bg-[#E8DEC4] text-[#5A5672] cursor-default'
              : 'bg-[#DFF59B] hover:bg-[#D4ED8A] text-[#1D1A33] shadow-sm active:scale-95'
          }`}
        >
          {isLearned ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-[#2E5A14]" />
              Organ Mastered (+15 XP Claimed)
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#2E5A14]" />
              Mark as Mastered (+15 XP)
            </>
          )}
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handlePrev}
            className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-full bg-[#FBF3E0] hover:bg-[#F3EAD3] text-[#1D1A33] border border-[#E8DEC4] transition-colors cursor-pointer"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-full bg-[#FBF3E0] hover:bg-[#F3EAD3] text-[#1D1A33] border border-[#E8DEC4] transition-colors cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
