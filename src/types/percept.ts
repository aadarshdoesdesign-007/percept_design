import { DesignerDiscipline, ExperienceLevel, LearningGoal } from './game';
import { AptitudeCategory, AptitudeDifficulty } from './aptitude';

export interface PerceptProfileState {
  id: string;
  name: string;
  disciplines: DesignerDiscipline[];
  experienceLevel: ExperienceLevel;
  goals: LearningGoal[];
  hasCompletedOnboarding: boolean;
  registeredDate: string;
}

export interface DailyHistoryRecord {
  date: string;
  completed: boolean;
  score: number;
  earnedXp: number;
  challengeIds: string[];
}

export interface PerceptExpeditionState {
  totalXp: number;
  currentStreak: number;
  highestStreak: number;
  lastCompletedDate: string | null;
  adaptiveRating: number; // e.g. 1200 base rating
  skillAccuracy: Record<string, { correct: number; total: number }>;
  history: Record<string, DailyHistoryRecord>;
}

export interface MockExamRecord {
  examId: string;
  examName: string;
  score: number;
  total: number;
  accuracy: number;
  timeSeconds: number;
  date: string;
}

export interface PerceptAptitudeState {
  questionsAttempted: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalTimeSpentSeconds: number;
  streakDays: number;
  lastActiveDate: string | null;
  currentDifficulty: AptitudeDifficulty;
  completedQuestionIds: string[];
  categoryStats: Record<AptitudeCategory, {
    attempted: number;
    correct: number;
    timeSpentSeconds: number;
  }>;
  mockExamHistory: MockExamRecord[];
}

export interface BookmarkedDesigner {
  id: string;
  name: string;
  movement: string;
  era: string;
  disciplines: string[];
  bookmarkedAt: string;
}

export interface SavedArticle {
  id: string;
  title: string;
  category: string;
  readTimeMinutes: number;
  savedAt: string;
}

export interface PerceptArchiveState {
  bookmarkedDesigners: BookmarkedDesigner[];
  savedArticles: string[];
  exploredMovements: string[];
  designerOfTheDayHistory: {
    date: string;
    designerId: string;
    viewedAt: string;
  }[];
}

export interface ObservationMission {
  id: string;
  title: string;
  category: string;
  completedAt: string;
  notes?: string;
  imageRef?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  observationText: string;
  category: string;
  createdAt: string;
  tags: string[];
  imageRef?: string;
}

export interface PerceptJournalState {
  entries: JournalEntry[];
  completedMissions: ObservationMission[];
  totalObservationsCount: number;
}

export interface PerceptPreferencesState {
  soundMuted: boolean;
  theme: 'dark';
  highContrastBorders: boolean;
  compactMode: boolean;
}

export interface PerceptUnifiedState {
  version: 5;
  profile: PerceptProfileState;
  expedition: PerceptExpeditionState;
  aptitude: PerceptAptitudeState;
  archive: PerceptArchiveState;
  journal: PerceptJournalState;
  preferences: PerceptPreferencesState;
}

export const DEFAULT_UNIFIED_STATE: PerceptUnifiedState = {
  version: 5,
  profile: {
    id: 'designer-01',
    name: 'Visual Explorer',
    disciplines: ['uiux', 'graphic'],
    experienceLevel: 'intermediate',
    goals: ['typography', 'composition', 'observation', 'spatial'],
    hasCompletedOnboarding: false,
    registeredDate: new Date().toISOString().slice(0, 10),
  },
  expedition: {
    totalXp: 350,
    currentStreak: 5,
    highestStreak: 7,
    lastCompletedDate: null,
    adaptiveRating: 1200,
    skillAccuracy: {
      typography: { correct: 8, total: 9 },
      composition: { correct: 7, total: 8 },
      spatial: { correct: 5, total: 6 },
      history: { correct: 4, total: 5 },
      architecture: { correct: 3, total: 4 },
      product: { correct: 4, total: 4 },
    },
    history: {},
  },
  aptitude: {
    questionsAttempted: 14,
    correctAnswers: 11,
    incorrectAnswers: 3,
    totalTimeSpentSeconds: 680,
    streakDays: 4,
    lastActiveDate: new Date().toISOString().slice(0, 10),
    currentDifficulty: 'intermediate',
    completedQuestionIds: ['vis-01', 'vis-02', 'vis-03', 'spa-01', 'spa-02', 'log-01'],
    categoryStats: {
      visual: { attempted: 3, correct: 3, timeSpentSeconds: 120 },
      spatial: { attempted: 4, correct: 3, timeSpentSeconds: 210 },
      logical: { attempted: 3, correct: 2, timeSpentSeconds: 140 },
      analytical: { attempted: 2, correct: 2, timeSpentSeconds: 110 },
      creative: { attempted: 2, correct: 1, timeSpentSeconds: 100 },
      mock: { attempted: 0, correct: 0, timeSpentSeconds: 0 },
    },
    mockExamHistory: [],
  },
  archive: {
    bookmarkedDesigners: [],
    savedArticles: [],
    exploredMovements: ['Swiss Style', 'Bauhaus'],
    designerOfTheDayHistory: [],
  },
  journal: {
    entries: [],
    completedMissions: [],
    totalObservationsCount: 0,
  },
  preferences: {
    soundMuted: false,
    theme: 'dark',
    highContrastBorders: true,
    compactMode: false,
  },
};
