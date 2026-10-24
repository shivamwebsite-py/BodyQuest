import React from 'react';
import { ACHIEVEMENTS } from '../../data/achievements';
import { useProgress } from '../../context/ProgressContext';
import {
  Trophy,
  Compass,
  Award,
  Globe,
  CalendarCheck,
  BookOpen,
  CheckCircle,
  Crown,
  Lock,
  Sparkles
} from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const { state } = useProgress();

  const getAchievementIcon = (name: string, unlocked: boolean) => {
    const cls = `w-6 h-6 ${unlocked ? 'text-[#1D1A33]' : 'text-slate-400'}`;
    switch (name) {
      case 'Compass': return <Compass className={cls} />;
      case 'Award': return <Award className={cls} />;
      case 'Globe': return <Globe className={cls} />;
      case 'Trophy': return <Trophy className={cls} />;
      case 'CalendarCheck': return <CalendarCheck className={cls} />;
      case 'BookOpen': return <BookOpen className={cls} />;
      case 'CheckCircle': return <CheckCircle className={cls} />;
      case 'Crown': return <Crown className={cls} />;
      default: return <Sparkles className={cls} />;
    }
  };

  const unlockedCount = state.unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS.length;
  const completionPercent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="eyebrow-tag text-[#5A5672] block mb-2">
          HONORS &amp; MILESTONES
        </span>
        <h1 className="text-4xl sm:text-5xl font-normal font-serif-editorial text-[#1D1A33] tracking-tight leading-tight">
          Learning <em className="italic">achievements</em>.
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#5A5672] leading-relaxed">
          Milestones earned as you uncover organs, master quizzes, and explore human biology.
        </p>

        {/* Global Progress Bar */}
        <div className="mt-6 max-w-md mx-auto bg-white border border-[#E8DEC4] rounded-[24px] p-5 shadow-soft">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-[#5A5672]">Unlocked Milestones</span>
            <span className="text-[#1D1A33]">{unlockedCount} of {totalCount} ({completionPercent}%)</span>
          </div>
          <div className="w-full h-2.5 bg-[#FBF3E0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#DFF59B] transition-all duration-500 rounded-full"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = state.unlockedAchievements.includes(ach.id);

          return (
            <div
              key={ach.id}
              className={`relative rounded-[28px] p-6 border transition-all duration-300 flex items-start gap-5 shadow-soft ${
                isUnlocked
                  ? 'bg-white border-[#E8DEC4]'
                  : 'bg-white/60 border-[#E8DEC4]/60 opacity-60'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  isUnlocked
                    ? 'bg-[#DFF59B] text-[#1D1A33]'
                    : 'bg-[#FBF3E0] text-slate-400'
                }`}
              >
                {getAchievementIcon(ach.icon, isUnlocked)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className={`text-xl font-normal font-serif-editorial ${isUnlocked ? 'text-[#1D1A33]' : 'text-slate-500'}`}>
                    {ach.name}
                  </h3>
                  {isUnlocked ? (
                    <span className="text-[11px] font-bold text-[#2E5A14] bg-[#DFF59B] px-2.5 py-0.5 rounded-full">
                      ✓ Unlocked
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-400 bg-[#FBF3E0] border border-[#E8DEC4] px-2.5 py-0.5 rounded-full">
                      <Lock className="w-3 h-3 inline mr-1" /> Locked
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#5A5672] leading-relaxed mb-3">
                  {ach.description}
                </p>

                <div className="text-[11px] text-[#1D1A33] font-medium bg-[#FBF3E0] px-3 py-1 rounded-full border border-[#E8DEC4] inline-block">
                  <span className="text-[#5A5672] mr-1">Condition:</span>
                  {ach.condition}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
