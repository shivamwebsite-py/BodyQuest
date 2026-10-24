import React, { useState, useMemo } from 'react';
import { QUIZ_QUESTIONS } from '../../data/quizzes';
import { QuizQuestion } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { sound } from '../../utils/audio';
import {
  Calendar,
  Sparkles,
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowRight,
  RotateCcw,
  Clock,
  ShieldCheck,
  Brain
} from 'lucide-react';

interface DailyChallengeSectionProps {
  onReturnToHome: () => void;
}

export const DailyChallengeSection: React.FC<DailyChallengeSectionProps> = ({
  onReturnToHome
}) => {
  const { state, recordDailyChallenge } = useProgress();

  const today = new Date();
  const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const dailyQuestions: QuizQuestion[] = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < dateKey.length; i++) {
      hash = (hash << 5) - hash + dateKey.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);

    const pool = [...QUIZ_QUESTIONS];
    const selected: QuizQuestion[] = [];
    const usedIndices = new Set<number>();

    for (let step = 0; step < 5; step++) {
      const idx = (absHash * (step + 1) * 31) % pool.length;
      let targetIdx = idx;
      while (usedIndices.has(targetIdx)) {
        targetIdx = (targetIdx + 1) % pool.length;
      }
      usedIndices.add(targetIdx);
      selected.push(pool[targetIdx]);
    }

    return selected;
  }, [dateKey]);

  const alreadyCompletedRecord = state.dailyChallengesHistory[dateKey];

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Array<{ qId: string; selectedIdx: number; isCorrect: boolean }>>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [awardedXp, setAwardedXp] = useState<number>(0);

  const currentQ = dailyQuestions[currentIdx];

  const handleStart = () => {
    sound.playClick();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setAnswers([]);
    setIsFinished(false);
    setIsPlaying(true);
  };

  const handleSelect = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }

    setAnswers((prev) => [
      ...prev,
      { qId: currentQ.id, selectedIdx: idx, isCorrect }
    ]);
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIdx + 1 < dailyQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      const score = answers.filter((a) => a.isCorrect).length;
      const res = recordDailyChallenge(score, dailyQuestions.length, dateKey);
      setAwardedXp(res.xpEarned);
      setIsFinished(true);
      setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto px-4 sm:px-6">
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="eyebrow-tag text-[#5A5672] block mb-2">
          DAILY BIOLOGY RHYTHM
        </span>
        <h1 className="text-4xl sm:text-5xl font-normal font-serif-editorial text-[#1D1A33] tracking-tight leading-tight">
          Daily anatomy <em className="italic">mission</em>.
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#5A5672] leading-relaxed">
          5 questions curated for your local date. Complete today's mission to claim your daily +50 XP bounty.
        </p>
        <p className="mt-2 text-xs font-bold text-[#FF9A4D]">
          {formattedDate}
        </p>
      </div>

      {/* Already Completed Status Banner */}
      {alreadyCompletedRecord && !isPlaying && !isFinished && (
        <div className="bg-[#DFF59B] border border-[#CDEB80] rounded-[32px] p-8 text-center space-y-4 shadow-soft">
          <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center mx-auto text-[#2E5A14] shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-normal font-serif-editorial text-[#1D1A33]">
              Today's Mission Completed!
            </h2>
            <p className="text-sm text-[#2E5A14] mt-1 font-semibold">
              You scored {alreadyCompletedRecord.score} / {alreadyCompletedRecord.total} on today's assignment.
            </p>
            <p className="text-xs text-[#5A5672] mt-2">
              Next challenge unlocks tomorrow. Feel free to replay for practice!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white hover:bg-[#FBF3E0] text-[#1D1A33] font-bold text-xs shadow-sm cursor-pointer transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 inline mr-1.5" /> Practice Replay
            </button>
            <button
              onClick={onReturnToHome}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#1D1A33] text-white font-bold text-xs shadow-sm cursor-pointer transition-all"
            >
              Return Home
            </button>
          </div>
        </div>
      )}

      {/* Start Daily Challenge Card */}
      {!isPlaying && !isFinished && !alreadyCompletedRecord && (
        <div className="bg-white border border-[#E8DEC4] rounded-[32px] p-8 sm:p-12 text-center space-y-6 shadow-soft">
          <div className="w-16 h-16 rounded-3xl bg-[#FFD9B5] flex items-center justify-center mx-auto text-[#2B2A6E]">
            <Sparkles className="w-8 h-8 text-[#FF9A4D]" />
          </div>

          <div>
            <h2 className="text-3xl font-normal font-serif-editorial text-[#1D1A33]">
              Ready for today's expedition?
            </h2>
            <p className="text-sm text-[#5A5672] mt-2 max-w-md mx-auto leading-relaxed">
              5 questions covering vital organs, system harmony, and human physiology. Earn +10 XP per question plus a +50 XP completion bounty!
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 py-3 border-y border-[#F0E6D0] text-xs font-bold text-[#5A5672]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#FF9A4D]" /> ~3 Minutes
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-[#2E5A14]" /> Up to 100 XP
            </span>
          </div>

          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#DFF59B] hover:bg-[#D4ED8A] text-[#1D1A33] font-bold text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            Start Today's Challenge
          </button>
        </div>
      )}

      {/* ACTIVE DAILY GAMEPLAY */}
      {isPlaying && currentQ && (
        <div className="bg-white border border-[#E8DEC4] rounded-[32px] p-6 sm:p-10 shadow-soft space-y-6">
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#F0E6D0]">
            <span className="eyebrow-tag text-[#5A5672]">
              DAILY MISSION · QUESTION {currentIdx + 1} OF 5
            </span>
            <span className="text-xs font-semibold text-[#5A5672]">
              {currentQ.category}
            </span>
          </div>

          <div className="w-full h-2 bg-[#FBF3E0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#DFF59B] transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / 5) * 100}%` }}
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-normal font-serif-editorial text-[#1D1A33] leading-snug">
            {currentQ.question}
          </h2>

          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isCorrect = idx === currentQ.correctIndex;
              const isChosen = selectedOption === idx;

              let btnClasses =
                'bg-[#FBF3E0] hover:bg-[#F3EAD3] text-[#1D1A33] border-[#E8DEC4]';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnClasses = 'bg-[#DFF59B] border-[#2E5A14] text-[#1D1A33] font-bold shadow-sm';
                } else if (isChosen && !isCorrect) {
                  btnClasses = 'bg-[#F9A9CF] border-[#2B2A6E] text-[#1D1A33]';
                } else {
                  btnClasses = 'bg-[#FBF3E0] text-slate-400 border-[#E8DEC4] opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-4 rounded-2xl border text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer ${btnClasses}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white/80 text-[#1D1A33] text-xs font-bold flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-[#2E5A14] shrink-0 ml-2" />
                  )}
                  {isAnswerSubmitted && isChosen && !isCorrect && (
                    <XCircle className="w-5 h-5 text-[#2B2A6E] shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {isAnswerSubmitted && (
            <div className="p-4 rounded-2xl bg-[#E8D6FF] border border-[#2B2A6E]/20 space-y-1">
              <span className="eyebrow-tag text-[#2B2A6E] flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" />
                {selectedOption === currentQ.correctIndex ? 'Correct!' : 'Scientific Fact:'}
              </span>
              <p className="text-xs sm:text-sm text-[#1D1A33] leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {isAnswerSubmitted && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="px-7 py-3 rounded-full bg-[#DFF59B] hover:bg-[#D4ED8A] text-[#1D1A33] font-bold text-sm flex items-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <span>{currentIdx + 1 < 5 ? 'Next Question' : 'Complete Challenge'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* FINISHED DAILY SCREEN */}
      {isFinished && (
        <div className="bg-white border border-[#E8DEC4] rounded-[36px] p-6 sm:p-12 shadow-soft text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-[#DFF59B] flex items-center justify-center mx-auto text-[#2E5A14] shadow-sm">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <span className="eyebrow-tag text-[#5A5672]">
              DAILY MISSION COMPLETE
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal font-serif-editorial text-[#1D1A33] mt-1">
              Challenge Finished!
            </h2>
            <p className="text-sm text-[#5A5672] mt-2">
              You scored <strong className="text-[#1D1A33]">{answers.filter((a) => a.isCorrect).length} out of 5</strong> on today's challenge.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF3E0] border border-[#E8DEC4] max-w-xs mx-auto">
            <span className="eyebrow-tag text-[#5A5672] block mb-1">Rewards Awarded</span>
            <span className="text-3xl font-bold font-serif-editorial text-[#FF9A4D]">
              +{awardedXp} XP
            </span>
            <span className="text-[11px] text-[#5A5672] block mt-1">
              Includes Daily Completion Bounty
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#F0E6D0]">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#FBF3E0] hover:bg-[#F3EAD3] text-[#1D1A33] font-bold text-sm border border-[#E8DEC4] cursor-pointer transition-all"
            >
              Review Practice
            </button>
            <button
              onClick={onReturnToHome}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#DFF59B] hover:bg-[#D4ED8A] text-[#1D1A33] font-bold text-sm shadow-sm cursor-pointer transition-all"
            >
              Return Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
