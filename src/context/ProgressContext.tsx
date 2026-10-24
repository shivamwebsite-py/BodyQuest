import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ProgressState, UserLevel, OrganId, Achievement } from '../types';
import { ACHIEVEMENTS } from '../data/achievements';
import { sound } from '../utils/audio';

interface ToastNotification {
  id: string;
  type: 'achievement' | 'level' | 'xp';
  title: string;
  message: string;
  icon?: string;
}

interface ProgressContextType {
  state: ProgressState;
  exploreOrgan: (organId: OrganId) => void;
  markOrganLearned: (organId: OrganId) => void;
  completeKnowledgeCheck: (organId: OrganId) => boolean;
  exploreSystem: (systemId: string) => void;
  recordQuizResult: (correctCount: number, totalCount: number) => { xpEarned: number; newAchievements: Achievement[] };
  recordDailyChallenge: (score: number, total: number, dateKey: string) => { xpEarned: number; newAchievements: Achievement[] };
  toggleSound: () => void;
  resetProgress: () => void;
  toasts: ToastNotification[];
  dismissToast: (id: string) => void;
  levelInfo: {
    current: UserLevel;
    next: UserLevel | null;
    minXp: number;
    nextXp: number;
    progressPercent: number;
  };
}

const STORAGE_KEY = 'bodyquest_progress_v2';

const INITIAL_STATE: ProgressState = {
  version: 2,
  exploredOrgans: [],
  learnedOrgans: [],
  completedKnowledgeChecks: [],
  exploredSystems: [],
  totalXp: 0,
  level: 'Beginner',
  unlockedAchievements: [],
  quizzesCompleted: 0,
  totalQuizQuestionsAnswered: 0,
  correctQuizQuestionsAnswered: 0,
  dailyChallengesCompleted: 0,
  dailyChallengesHistory: {},
  soundEnabled: true,
};

export const LEVEL_THRESHOLDS: Record<UserLevel, { min: number; next: number | null }> = {
  'Beginner': { min: 0, next: 250 },
  'Explorer': { min: 250, next: 600 },
  'Anatomy Expert': { min: 600, next: null }
};

export function calculateLevel(xp: number): UserLevel {
  if (xp >= 600) return 'Anatomy Expert';
  if (xp >= 250) return 'Explorer';
  return 'Beginner';
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProgressState>(() => {
    if (typeof window === 'undefined') return INITIAL_STATE;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.totalXp === 'number') {
          return {
            ...INITIAL_STATE,
            ...parsed,
            level: calculateLevel(parsed.totalXp || 0)
          };
        }
      }
    } catch (e) {
      console.warn('Could not load stored progress, initializing defaults', e);
    }
    return INITIAL_STATE;
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Sync sound engine
  useEffect(() => {
    sound.setEnabled(state.soundEnabled);
  }, [state.soundEnabled]);

  // Persist state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [state]);

  const addToast = useCallback((toast: Omit<ToastNotification, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { ...toast, id }]);

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Internal helper to check and award achievements based on updated state
  const checkAchievements = useCallback((targetState: ProgressState): { updatedState: ProgressState; newlyUnlocked: Achievement[] } => {
    const newlyUnlocked: Achievement[] = [];
    const currentUnlocked = new Set(targetState.unlockedAchievements);

    const conditions: Array<{ id: string; test: boolean }> = [
      { id: 'first-discovery', test: targetState.exploredOrgans.length >= 1 },
      { id: 'body-explorer', test: targetState.exploredOrgans.length >= 7 },
      { id: 'anatomy-apprentice', test: targetState.correctQuizQuestionsAnswered >= 5 },
      { id: 'daily-learner', test: targetState.dailyChallengesCompleted >= 1 },
      { id: 'system-scholar', test: targetState.exploredSystems.length >= 5 },
      { id: 'knowledge-seeker', test: targetState.completedKnowledgeChecks.length >= 1 },
      { id: 'anatomy-expert', test: targetState.totalXp >= 600 }
    ];

    conditions.forEach(({ id, test }) => {
      if (test && !currentUnlocked.has(id)) {
        currentUnlocked.add(id);
        const ach = ACHIEVEMENTS.find((a) => a.id === id);
        if (ach) {
          newlyUnlocked.push(ach);
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach((ach) => {
        addToast({
          type: 'achievement',
          title: `Achievement Unlocked: ${ach.name}!`,
          message: ach.description,
          icon: ach.icon
        });
      });
      sound.playFanfare();
    }

    return {
      updatedState: {
        ...targetState,
        unlockedAchievements: Array.from(currentUnlocked)
      },
      newlyUnlocked
    };
  }, [addToast]);

  const exploreOrgan = useCallback((organId: OrganId) => {
    setState((prev) => {
      if (prev.exploredOrgans.includes(organId)) {
        return prev; // No duplicate reward
      }

      const newExplored = [...prev.exploredOrgans, organId];
      const xpBonus = 25;
      const newTotalXp = prev.totalXp + xpBonus;
      const oldLevel = prev.level;
      const newLevel = calculateLevel(newTotalXp);

      if (newLevel !== oldLevel) {
        addToast({
          type: 'level',
          title: `Rank Promoted: ${newLevel}!`,
          message: `Congratulations! You unlocked the ${newLevel} rank.`
        });
        sound.playFanfare();
      }

      const interimState: ProgressState = {
        ...prev,
        exploredOrgans: newExplored,
        totalXp: newTotalXp,
        level: newLevel
      };

      const { updatedState } = checkAchievements(interimState);
      return updatedState;
    });
  }, [addToast, checkAchievements]);

  const markOrganLearned = useCallback((organId: OrganId) => {
    setState((prev) => {
      if (prev.learnedOrgans.includes(organId)) return prev;

      const newLearned = [...prev.learnedOrgans, organId];
      const xpBonus = 15;
      const newTotalXp = prev.totalXp + xpBonus;
      const oldLevel = prev.level;
      const newLevel = calculateLevel(newTotalXp);

      if (newLevel !== oldLevel) {
        addToast({
          type: 'level',
          title: `Rank Promoted: ${newLevel}!`,
          message: `Congratulations! You unlocked the ${newLevel} rank.`
        });
        sound.playFanfare();
      }

      return {
        ...prev,
        learnedOrgans: newLearned,
        totalXp: newTotalXp,
        level: newLevel
      };
    });
  }, [addToast]);

  const completeKnowledgeCheck = useCallback((organId: OrganId): boolean => {
    let rewarded = false;
    setState((prev) => {
      if (prev.completedKnowledgeChecks.includes(organId)) {
        return prev;
      }
      rewarded = true;
      const newCompleted = [...prev.completedKnowledgeChecks, organId];
      const xpBonus = 15;
      const newTotalXp = prev.totalXp + xpBonus;
      const oldLevel = prev.level;
      const newLevel = calculateLevel(newTotalXp);

      if (newLevel !== oldLevel) {
        addToast({
          type: 'level',
          title: `Rank Promoted: ${newLevel}!`,
          message: `Congratulations! You unlocked the ${newLevel} rank.`
        });
        sound.playFanfare();
      }

      const interim: ProgressState = {
        ...prev,
        completedKnowledgeChecks: newCompleted,
        totalXp: newTotalXp,
        level: newLevel
      };

      const { updatedState } = checkAchievements(interim);
      return updatedState;
    });
    return rewarded;
  }, [addToast, checkAchievements]);

  const exploreSystem = useCallback((systemId: string) => {
    setState((prev) => {
      if (prev.exploredSystems.includes(systemId)) return prev;

      const newExplored = [...prev.exploredSystems, systemId];
      const xpBonus = 15;
      const newTotalXp = prev.totalXp + xpBonus;
      const oldLevel = prev.level;
      const newLevel = calculateLevel(newTotalXp);

      if (newLevel !== oldLevel) {
        addToast({
          type: 'level',
          title: `Rank Promoted: ${newLevel}!`,
          message: `Congratulations! You unlocked the ${newLevel} rank.`
        });
        sound.playFanfare();
      }

      const interim: ProgressState = {
        ...prev,
        exploredSystems: newExplored,
        totalXp: newTotalXp,
        level: newLevel
      };

      const { updatedState } = checkAchievements(interim);
      return updatedState;
    });
  }, [addToast, checkAchievements]);

  const recordQuizResult = useCallback((correctCount: number, totalCount: number) => {
    let earnedXp = correctCount * 10;
    const scorePercent = totalCount > 0 ? (correctCount / totalCount) * 100 : 0;
    let unlocked: Achievement[] = [];

    // Score bonus for high achievement (80%+)
    if (scorePercent >= 80 && totalCount >= 5) {
      earnedXp += 30;
    }

    setState((prev) => {
      const newTotalXp = prev.totalXp + earnedXp;
      const oldLevel = prev.level;
      const newLevel = calculateLevel(newTotalXp);

      if (newLevel !== oldLevel) {
        addToast({
          type: 'level',
          title: `Rank Promoted: ${newLevel}!`,
          message: `Congratulations! You unlocked the ${newLevel} rank.`
        });
        sound.playFanfare();
      }

      // Check quiz-champion achievement specifically
      const currentUnlocked = new Set(prev.unlockedAchievements);
      if (scorePercent >= 80 && !currentUnlocked.has('quiz-champion')) {
        currentUnlocked.add('quiz-champion');
        const ach = ACHIEVEMENTS.find((a) => a.id === 'quiz-champion');
        if (ach) {
          unlocked.push(ach);
          addToast({
            type: 'achievement',
            title: `Achievement Unlocked: ${ach.name}!`,
            message: ach.description,
            icon: ach.icon
          });
          sound.playFanfare();
        }
      }

      const interim: ProgressState = {
        ...prev,
        quizzesCompleted: prev.quizzesCompleted + 1,
        totalQuizQuestionsAnswered: prev.totalQuizQuestionsAnswered + totalCount,
        correctQuizQuestionsAnswered: prev.correctQuizQuestionsAnswered + correctCount,
        totalXp: newTotalXp,
        level: newLevel,
        unlockedAchievements: Array.from(currentUnlocked)
      };

      const { updatedState, newlyUnlocked } = checkAchievements(interim);
      unlocked = [...unlocked, ...newlyUnlocked];
      return updatedState;
    });

    return { xpEarned: earnedXp, newAchievements: unlocked };
  }, [addToast, checkAchievements]);

  const recordDailyChallenge = useCallback((score: number, total: number, dateKey: string) => {
    let earnedXp = 0;
    let unlocked: Achievement[] = [];

    setState((prev) => {
      // Avoid duplicate reward if already completed today
      if (prev.dailyChallengesHistory[dateKey]) {
        return prev;
      }

      earnedXp = 50 + score * 10;
      const newTotalXp = prev.totalXp + earnedXp;
      const oldLevel = prev.level;
      const newLevel = calculateLevel(newTotalXp);

      if (newLevel !== oldLevel) {
        addToast({
          type: 'level',
          title: `Rank Promoted: ${newLevel}!`,
          message: `Congratulations! You unlocked the ${newLevel} rank.`
        });
        sound.playFanfare();
      }

      const interim: ProgressState = {
        ...prev,
        dailyChallengesCompleted: prev.dailyChallengesCompleted + 1,
        dailyChallengesHistory: {
          ...prev.dailyChallengesHistory,
          [dateKey]: {
            date: dateKey,
            score,
            total,
            completedAt: new Date().toISOString()
          }
        },
        totalXp: newTotalXp,
        level: newLevel
      };

      const { updatedState, newlyUnlocked } = checkAchievements(interim);
      unlocked = newlyUnlocked;
      return updatedState;
    });

    return { xpEarned: earnedXp, newAchievements: unlocked };
  }, [addToast, checkAchievements]);

  const toggleSound = useCallback(() => {
    setState((prev) => {
      const nextVal = !prev.soundEnabled;
      sound.setEnabled(nextVal);
      if (nextVal) sound.playClick();
      return { ...prev, soundEnabled: nextVal };
    });
  }, []);

  const resetProgress = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setState(INITIAL_STATE);
    addToast({
      type: 'xp',
      title: 'Progress Reset',
      message: 'Your BodyQuest learning progress has been cleared.'
    });
    sound.playClick();
  }, [addToast]);

  // Compute level progress bar info
  const levelInfo = (() => {
    const current = state.level;
    const currentThreshold = LEVEL_THRESHOLDS[current];
    const minXp = currentThreshold.min;
    const nextXp = currentThreshold.next || 1000;
    const next: UserLevel | null =
      current === 'Beginner' ? 'Explorer' : current === 'Explorer' ? 'Anatomy Expert' : null;

    let progressPercent = 100;
    if (next) {
      const span = nextXp - minXp;
      const gained = Math.max(0, state.totalXp - minXp);
      progressPercent = Math.min(100, Math.round((gained / span) * 100));
    }

    return {
      current,
      next,
      minXp,
      nextXp,
      progressPercent
    };
  })();

  return (
    <ProgressContext.Provider
      value={{
        state,
        exploreOrgan,
        markOrganLearned,
        completeKnowledgeCheck,
        exploreSystem,
        recordQuizResult,
        recordDailyChallenge,
        toggleSound,
        resetProgress,
        toasts,
        dismissToast,
        levelInfo
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
