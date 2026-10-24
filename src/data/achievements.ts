import { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-discovery',
    name: 'First Discovery',
    description: 'Began the anatomical expedition by exploring your first organ.',
    condition: 'Explore 1 organ in the Body Explorer',
    icon: 'Compass'
  },
  {
    id: 'anatomy-apprentice',
    name: 'Anatomy Apprentice',
    description: 'Demonstrated initial biology mastery by answering 5 quiz questions correctly.',
    condition: 'Answer 5 quiz questions correctly',
    icon: 'Award'
  },
  {
    id: 'body-explorer',
    name: 'Body Explorer',
    description: 'Traversed all seven vital organs inside the human body explorer.',
    condition: 'Explore all 7 organs in the Body Explorer',
    icon: 'Globe'
  },
  {
    id: 'quiz-champion',
    name: 'Quiz Champion',
    description: 'Conquered a biology quiz with superior mastery, scoring 80% or higher.',
    condition: 'Score 80% or higher on any quiz',
    icon: 'Trophy'
  },
  {
    id: 'daily-learner',
    name: 'Daily Learner',
    description: 'Completed a full 5-question Daily Challenge.',
    condition: 'Complete a Daily Challenge',
    icon: 'CalendarCheck'
  },
  {
    id: 'system-scholar',
    name: 'System Scholar',
    description: 'Studied the interconnected harmony of at least 5 major body systems.',
    condition: 'Explore at least 5 body systems',
    icon: 'BookOpen'
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Successfully answered a targeted organ knowledge-check question.',
    condition: 'Complete an organ knowledge check',
    icon: 'CheckCircle'
  },
  {
    id: 'anatomy-expert',
    name: 'Anatomy Expert',
    description: 'Accumulated 600+ XP and earned the highest ranking: Anatomy Expert.',
    condition: 'Reach the Anatomy Expert rank (600+ XP)',
    icon: 'Crown'
  }
];
