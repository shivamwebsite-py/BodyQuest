export type OrganId = 'brain' | 'heart' | 'lungs' | 'liver' | 'stomach' | 'kidneys' | 'intestines';

export interface KnowledgeCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Organ {
  id: OrganId;
  name: string;
  scientificName: string;
  systemId: string;
  systemName: string;
  location: string;
  primaryFunctions: string[];
  whyItMatters: string;
  facts: string[];
  markerCoords: {
    x: number; // Percentage or SVG coordinate
    y: number;
    connectorX?: number;
    connectorY?: number;
  };
  color: string;
  accentGlow: string;
  knowledgeCheck: KnowledgeCheck;
}

export interface BodySystem {
  id: string;
  name: string;
  iconName: string;
  color: string;
  mainFunction: string;
  importantOrgans: string[];
  conciseExplanation: string;
  facts: string[];
  relatedChallenge: string;
  harmony: string;
}

export type QuizDifficulty = 'all' | 'beginner' | 'explorer' | 'expert';
export type QuizCategory = 'all' | 'Organ Functions' | 'Basic Anatomy' | 'Body Systems' | 'Human Biology' | 'Scientific Facts';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'Organ Functions' | 'Basic Anatomy' | 'Body Systems' | 'Human Biology' | 'Scientific Facts';
  difficulty: 'beginner' | 'explorer' | 'expert';
  organOrSystemRef?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: string;
  icon: string;
}

export type UserLevel = 'Beginner' | 'Explorer' | 'Anatomy Expert';

export interface DailyChallengeRecord {
  date: string;
  score: number;
  total: number;
  completedAt: string;
}

export interface ProgressState {
  version: number;
  exploredOrgans: string[];
  learnedOrgans: string[];
  completedKnowledgeChecks: string[];
  exploredSystems: string[];
  totalXp: number;
  level: UserLevel;
  unlockedAchievements: string[];
  quizzesCompleted: number;
  totalQuizQuestionsAnswered: number;
  correctQuizQuestionsAnswered: number;
  dailyChallengesCompleted: number;
  dailyChallengesHistory: Record<string, DailyChallengeRecord>;
  soundEnabled: boolean;
}
