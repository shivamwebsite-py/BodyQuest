import React, { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { sound } from '../../utils/audio';
import {
  Trophy,
  Activity,
  Layers,
  CalendarCheck,
  Brain,
  Award,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  Compass,
  Crown
} from 'lucide-react';

interface ProgressDashboardSectionProps {
  onNavigateToExplorer: () => void;
  onNavigateToQuizzes: () => void;
}

export const ProgressDashboardSection: React.FC<ProgressDashboardSectionProps> = ({
  onNavigateToExplorer,
  onNavigateToQuizzes
}) => {
  const { state, resetProgress, levelInfo } = useProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const accuracyPercent =
    state.totalQuizQuestionsAnswered > 0
      ? Math.round((state.correctQuizQuestionsAnswered / state.totalQuizQuestionsAnswered) * 100)
      : 0;

  const handleConfirmReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="eyebrow-tag text-[#5A5672] block mb-2">
          BIOLOGICAL LOGBOOK
        </span>
        <h1 className="text-4xl sm:text-5xl font-normal font-serif-editorial text-[#1D1A33] tracking-tight leading-tight">
          Learning <em className="italic">dashboard</em>.
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#5A5672] leading-relaxed">
          Your anatomical expedition metrics, rank progression, and quiz accuracy saved in this browser.
        </p>
      </div>

      {/* Hero Rank Card */}
      <div className="bg-white border border-[#E8DEC4] rounded-[32px] p-6 sm:p-10 shadow-soft">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#DFF59B] text-[#1D1A33] flex items-center justify-center shrink-0 shadow-sm">
              {levelInfo.current === 'Anatomy Expert' ? (
                <Crown className="w-9 h-9 text-[#2E5A14]" />
              ) : levelInfo.current === 'Explorer' ? (
                <Compass className="w-9 h-9 text-[#1D1A33]" />
              ) : (
                <Sparkles className="w-9 h-9 text-[#1D1A33]" />
              )}
            </div>

            <div>
              <span className="eyebrow-tag text-[#5A5672]">
                CURRENT EXPLORER RANK
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal font-serif-editorial text-[#1D1A33]">
                {levelInfo.current}
              </h2>
              <p className="text-xs sm:text-sm text-[#5A5672] mt-0.5">
                Total Accumulation: <strong className="text-[#FF9A4D] font-bold">{state.totalXp} XP</strong>
              </p>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="w-full md:w-80 bg-[#FBF3E0] border border-[#E8DEC4] rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-[#5A5672]">
                {levelInfo.next ? `Next: ${levelInfo.next}` : 'Max Rank Unlocked'}
              </span>
              <span className="text-[#1D1A33]">
                {levelInfo.next ? `${state.totalXp} / ${levelInfo.nextXp} XP` : '600+ XP'}
              </span>
            </div>
            <div className="w-full h-2.5 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-[#DFF59B] transition-all duration-500 rounded-full"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-[#5A5672] block mt-2">
              {levelInfo.next
                ? `${levelInfo.nextXp - state.totalXp} XP remaining until ${levelInfo.next}`
                : 'Top ranking master unlocked!'}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Key Performance Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white border border-[#E8DEC4] rounded-[24px] p-6 shadow-soft">
          <div className="eyebrow-tag text-[#5A5672] mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#FF9A4D]" /> Organs Explored
          </div>
          <div className="text-3xl font-normal font-serif-editorial text-[#1D1A33]">
            {state.exploredOrgans.length} <span className="text-base text-[#5A5672] font-sans">/ 7</span>
          </div>
          <div className="w-full h-1.5 bg-[#FBF3E0] rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-[#FF9A4D]"
              style={{ width: `${(state.exploredOrgans.length / 7) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-[#E8DEC4] rounded-[24px] p-6 shadow-soft">
          <div className="eyebrow-tag text-[#5A5672] mb-2 flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-[#2B2A6E]" /> Body Systems
          </div>
          <div className="text-3xl font-normal font-serif-editorial text-[#1D1A33]">
            {state.exploredSystems.length} <span className="text-base text-[#5A5672] font-sans">/ 10</span>
          </div>
          <div className="w-full h-1.5 bg-[#FBF3E0] rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-[#E8D6FF]"
              style={{ width: `${(state.exploredSystems.length / 10) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-[#E8DEC4] rounded-[24px] p-6 shadow-soft">
          <div className="eyebrow-tag text-[#5A5672] mb-2 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#2E5A14]" /> Quiz Accuracy
          </div>
          <div className="text-3xl font-normal font-serif-editorial text-[#2E5A14]">
            {accuracyPercent}%
          </div>
          <span className="text-xs text-[#5A5672] block mt-1">
            {state.correctQuizQuestionsAnswered} / {state.totalQuizQuestionsAnswered} correct
          </span>
        </div>

        <div className="bg-white border border-[#E8DEC4] rounded-[24px] p-6 shadow-soft">
          <div className="eyebrow-tag text-[#5A5672] mb-2 flex items-center gap-1.5">
            <CalendarCheck className="w-3.5 h-3.5 text-[#FF9A4D]" /> Daily Missions
          </div>
          <div className="text-3xl font-normal font-serif-editorial text-[#1D1A33]">
            {state.dailyChallengesCompleted}
          </div>
          <span className="text-xs text-[#5A5672] block mt-1">
            Missions Completed
          </span>
        </div>
      </div>

      {/* Action shortcuts & Privacy Notice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E8DEC4] rounded-[28px] p-6 sm:p-8 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xl font-normal font-serif-editorial text-[#1D1A33] mb-1">
              Continue Your Exploration
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5672] leading-relaxed">
              Discover remaining organs on the 2D anatomical canvas or sharpen your mastery with an arena quiz.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToExplorer}
              className="px-5 py-2.5 rounded-full bg-[#DFF59B] hover:bg-[#D4ED8A] text-[#1D1A33] font-bold text-xs shadow-sm cursor-pointer transition-all"
            >
              Go to Body Explorer
            </button>
            <button
              onClick={onNavigateToQuizzes}
              className="px-5 py-2.5 rounded-full bg-[#FBF3E0] hover:bg-[#F3EAD3] text-[#1D1A33] font-bold text-xs border border-[#E8DEC4] cursor-pointer transition-all"
            >
              Take a Quiz
            </button>
          </div>
        </div>

        <div className="bg-white border border-[#E8DEC4] rounded-[28px] p-6 sm:p-8 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xl font-normal font-serif-editorial text-[#1D1A33] mb-1">
              Data Privacy &amp; Storage
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5672] leading-relaxed">
              Your learning progress is saved entirely on this device's localStorage. No cookies or tracking services are used.
            </p>
          </div>

          <div>
            <button
              onClick={() => {
                sound.playClick();
                setShowResetConfirm(true);
              }}
              className="inline-flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-bold hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset My Learning Progress
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D1A33]/40 backdrop-blur-sm">
          <div className="bg-white border border-[#E8DEC4] rounded-[28px] p-6 max-w-md w-full shadow-soft-lg space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFD9B5] flex items-center justify-center text-[#FF9A4D]">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-normal font-serif-editorial text-[#1D1A33]">Reset Learning Progress?</h3>
              <p className="text-xs sm:text-sm text-[#5A5672] mt-1.5 leading-relaxed">
                This will clear all accumulated XP, explored organs, quiz statistics, and unlocked achievements on this browser.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-full text-xs font-bold bg-[#FBF3E0] text-[#1D1A33] border border-[#E8DEC4] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-full text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white cursor-pointer transition-colors"
              >
                Yes, Clear Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
