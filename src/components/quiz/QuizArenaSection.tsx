import React, { useState, useMemo } from 'react';
import { QUIZ_QUESTIONS } from '../../data/quizzes';
import { QuizQuestion, QuizCategory, QuizDifficulty } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { sound } from '../../utils/audio';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Award,
  Trophy,
  Compass,
  ArrowRight,
  Flame,
  Brain,
  Sliders
} from 'lucide-react';

interface QuizArenaSectionProps {
  onReturnToExplorer: () => void;
  presetCategory?: QuizCategory;
}

export const QuizArenaSection: React.FC<QuizArenaSectionProps> = ({
  onReturnToExplorer,
  presetCategory = 'all'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>(presetCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty>('all');
  const [questionCount, setQuestionCount] = useState<number>(10);

  const [inQuiz, setInQuiz] = useState<boolean>(false);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Array<{ questionId: string; selectedIdx: number; isCorrect: boolean }>>([]);
  const [streak, setStreak] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [quizResultSummary, setQuizResultSummary] = useState<{ xpEarned: number } | null>(null);

  const { recordQuizResult } = useProgress();

  const categories: Array<{ id: QuizCategory; label: string }> = [
    { id: 'all', label: 'All Categories' },
    { id: 'Organ Functions', label: 'Organ Functions' },
    { id: 'Basic Anatomy', label: 'Basic Anatomy' },
    { id: 'Body Systems', label: 'Body Systems' },
    { id: 'Human Biology', label: 'Human Biology' },
    { id: 'Scientific Facts', label: 'Scientific Facts' },
  ];

  const difficulties: Array<{ id: QuizDifficulty; label: string }> = [
    { id: 'all', label: 'Mixed Difficulty' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'explorer', label: 'Explorer' },
    { id: 'expert', label: 'Expert' },
  ];

  const filteredPool = useMemo(() => {
    return QUIZ_QUESTIONS.filter((q) => {
      const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
      return matchCat && matchDiff;
    });
  }, [selectedCategory, selectedDifficulty]);

  const handleStartQuiz = () => {
    sound.playClick();
    const shuffled = [...filteredPool].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    if (chosen.length === 0) return;

    setActiveQuestions(chosen);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setStreak(0);
    setQuizFinished(false);
    setQuizResultSummary(null);
    setInQuiz(true);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedAnswer(idx);
    setIsAnswerSubmitted(true);

    const currQ = activeQuestions[currentIdx];
    const isCorrect = idx === currQ.correctIndex;

    if (isCorrect) {
      sound.playCorrect();
      setStreak((s) => s + 1);
    } else {
      sound.playIncorrect();
      setStreak(0);
    }

    setUserAnswers((prev) => [
      ...prev,
      { questionId: currQ.id, selectedIdx: idx, isCorrect }
    ]);
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIdx + 1 < activeQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      const totalCorrect = userAnswers.filter((a) => a.isCorrect).length;
      const res = recordQuizResult(totalCorrect, activeQuestions.length);
      setQuizResultSummary({ xpEarned: res.xpEarned });
      setQuizFinished(true);
      setInQuiz(false);
    }
  };

  const handleRestartQuiz = () => {
    handleStartQuiz();
  };

  const currentQ = activeQuestions[currentIdx];

  return (
    <div className="space-y-8 max-w-3xl mx-auto px-4 sm:px-6">
      {/* Editorial Header */}
      {!inQuiz && !quizFinished && (
        <div className="text-center max-w-xl mx-auto">
          <span className="eyebrow-tag text-[#5A5672] block mb-2">
            KNOWLEDGE ARENA
          </span>
          <h1 className="text-4xl sm:text-5xl font-normal font-serif-editorial text-[#1D1A33] tracking-tight leading-tight">
            Anatomy <em className="italic">quiz arena</em>.
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#5A5672] leading-relaxed">
            Test your understanding across verified biology questions, earn experience points, and climb the ranks.
          </p>
        </div>
      )}

      {/* QUIZ SETUP PANEL */}
      {!inQuiz && !quizFinished && (
        <div className="bg-white border border-[#E8DEC4] rounded-[32px] p-6 sm:p-10 shadow-soft space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#F0E6D0] text-sm font-bold text-[#1D1A33]">
            <Sliders className="w-4 h-4 text-[#FF9A4D]" />
            <span>Customize Your Quiz Session</span>
          </div>

          {/* Category Selection */}
          <div>
            <label className="eyebrow-tag text-[#5A5672] block mb-2.5">
              Subject Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#1D1A33] text-white border-[#1D1A33] shadow-sm'
                      : 'bg-[#FBF3E0] text-[#1D1A33] border-[#E8DEC4] hover:bg-[#F3EAD3]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Tier */}
          <div>
            <label className="eyebrow-tag text-[#5A5672] block mb-2.5">
              Difficulty Tier
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {difficulties.map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedDifficulty(diff.id);
                  }}
                  className={`p-3 rounded-2xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                    selectedDifficulty === diff.id
                      ? 'bg-[#E8D6FF] text-[#2B2A6E] font-bold border-[#2B2A6E]/30 shadow-sm'
                      : 'bg-[#FBF3E0] text-[#1D1A33] border-[#E8DEC4] hover:bg-[#F3EAD3]'
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div>
            <label className="eyebrow-tag text-[#5A5672] block mb-2.5">
              Question Count: <span className="text-[#1D1A33] font-bold">{questionCount} Questions</span>
            </label>
            <div className="flex items-center gap-3">
              {[5, 10, 15, 20].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    sound.playClick();
                    setQuestionCount(num);
                  }}
                  className={`flex-1 py-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                    questionCount === num
                      ? 'bg-[#DFF59B] text-[#1D1A33] border-[#2E5A14]/30 shadow-sm'
                      : 'bg-[#FBF3E0] text-[#5A5672] border-[#E8DEC4] hover:bg-[#F3EAD3]'
                  }`}
                >
                  {num} Qs
                </button>
              ))}
            </div>
          </div>

          {/* Launch Button */}
          <div className="pt-4 border-t border-[#F0E6D0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#5A5672]">
              In pool: <strong className="text-[#1D1A33]">{filteredPool.length} verified questions</strong>
            </span>

            <button
              onClick={handleStartQuiz}
              disabled={filteredPool.length === 0}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#DFF59B] hover:bg-[#D4ED8A] text-[#1D1A33] font-bold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              Begin Quiz Now
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE QUESTION SCREEN */}
      {inQuiz && currentQ && (
        <div className="bg-white border border-[#E8DEC4] rounded-[32px] p-6 sm:p-10 shadow-soft space-y-6">
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#F0E6D0]">
            <span className="eyebrow-tag text-[#5A5672]">
              QUESTION {currentIdx + 1} OF {activeQuestions.length} · {currentQ.category}
            </span>

            {streak > 1 && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF9A4D] bg-[#FFD9B5] px-3 py-1 rounded-full">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>{streak} Streak!</span>
              </div>
            )}
          </div>

          <div className="w-full h-2 bg-[#FBF3E0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#DFF59B] transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / activeQuestions.length) * 100}%` }}
            />
          </div>

          <div className="py-2">
            <h2 className="text-2xl sm:text-3xl font-normal font-serif-editorial text-[#1D1A33] leading-snug">
              {currentQ.question}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isCorrect = idx === currentQ.correctIndex;
              const isChosen = selectedAnswer === idx;

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
                  onClick={() => handleSelectOption(idx)}
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
                {selectedAnswer === currentQ.correctIndex ? 'Correct!' : 'Scientific Fact:'}
              </span>
              <p className="text-xs sm:text-sm text-[#1D1A33] leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {isAnswerSubmitted && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-7 py-3 rounded-full bg-[#DFF59B] hover:bg-[#D4ED8A] text-[#1D1A33] font-bold text-sm flex items-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <span>{currentIdx + 1 < activeQuestions.length ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* QUIZ RESULTS SCREEN */}
      {quizFinished && (
        <div className="bg-white border border-[#E8DEC4] rounded-[36px] p-6 sm:p-12 shadow-soft text-center space-y-8">
          <div className="w-20 h-20 rounded-3xl bg-[#DFF59B] flex items-center justify-center mx-auto text-[#2E5A14] shadow-sm">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <span className="eyebrow-tag text-[#5A5672]">
              QUIZ COMPLETED
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal font-serif-editorial text-[#1D1A33] mt-1">
              Performance Report
            </h2>
            <p className="text-[#5A5672] text-sm mt-2 max-w-md mx-auto leading-relaxed">
              {(() => {
                const correct = userAnswers.filter((a) => a.isCorrect).length;
                const pct = (correct / activeQuestions.length) * 100;
                if (pct >= 80) return 'Outstanding mastery! You possess a deep understanding of human anatomy.';
                if (pct >= 60) return 'Solid foundation! A few concepts were tricky, but you are progressing fast.';
                return 'Nice practice! Review the detailed facts and try again to master these concepts.';
              })()}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
            <div className="p-4 rounded-2xl bg-[#FBF3E0] border border-[#E8DEC4]">
              <span className="eyebrow-tag text-[#5A5672] block mb-1">Score</span>
              <span className="text-2xl font-bold font-serif-editorial text-[#1D1A33]">
                {userAnswers.filter((a) => a.isCorrect).length} / {activeQuestions.length}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FBF3E0] border border-[#E8DEC4]">
              <span className="eyebrow-tag text-[#5A5672] block mb-1">Accuracy</span>
              <span className="text-2xl font-bold font-serif-editorial text-[#2E5A14]">
                {Math.round((userAnswers.filter((a) => a.isCorrect).length / activeQuestions.length) * 100)}%
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FBF3E0] border border-[#E8DEC4]">
              <span className="eyebrow-tag text-[#5A5672] block mb-1">XP Earned</span>
              <span className="text-2xl font-bold font-serif-editorial text-[#FF9A4D]">
                +{quizResultSummary?.xpEarned || 0} XP
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FBF3E0] border border-[#E8DEC4]">
              <span className="eyebrow-tag text-[#5A5672] block mb-1">Streak</span>
              <span className="text-2xl font-bold font-serif-editorial text-[#2B2A6E]">
                {streak}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#F0E6D0]">
            <button
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#DFF59B] hover:bg-[#D4ED8A] text-[#1D1A33] font-bold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Retry Same Settings
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setQuizFinished(false);
                setInQuiz(false);
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#FBF3E0] hover:bg-[#F3EAD3] text-[#1D1A33] font-bold text-sm flex items-center justify-center gap-2 border border-[#E8DEC4] cursor-pointer transition-all"
            >
              <Sliders className="w-4 h-4" />
              Choose Another Quiz
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onReturnToExplorer();
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-white hover:bg-[#FBF3E0] text-[#1D1A33] font-bold text-sm flex items-center justify-center gap-2 border border-[#E8DEC4] cursor-pointer transition-all"
            >
              <Compass className="w-4 h-4" />
              Return to Explorer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
