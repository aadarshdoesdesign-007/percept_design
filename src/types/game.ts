export type DesignerDiscipline =
  | 'graphic'
  | 'uiux'
  | 'industrial'
  | 'architecture'
  | 'fashion'
  | 'motion'
  | 'illustration'
  | 'multidisciplinary'
  | 'student';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type LearningGoal =
  | 'typography'
  | 'composition'
  | 'hierarchy'
  | 'colour'
  | 'history'
  | 'architecture'
  | 'product'
  | 'spatial'
  | 'observation'
  | 'problem-solving'
  | 'aptitude';

export type GameMode =
  | 'detective'
  | 'geoguessr'
  | 'object'
  | 'flaw'
  | 'spatial'
  | 'instinct';

export interface VisualSpecimenData {
  type: 'vector' | 'canvas' | 'comparison' | 'geoguessr' | 'specimen' | 'spatial';
  id: string;
  title?: string;
  subtitle?: string;
  caption?: string;
  imageUrl?: string;
  clues?: string[]; // For Visual GeoGuessr progressive clues
  data?: any;
}

export interface ChallengeOption {
  id: string;
  label: string;
  description?: string;
  subtext?: string;
  badge?: string;
}

export interface ChallengeExplanation {
  summary: string;
  designTheory: string;
  culturalContext?: string;
  keyTakeaway: string;
}

export interface GameChallenge {
  id: string;
  gameMode: GameMode;
  gameModeTitle: string;
  disciplineTags: DesignerDiscipline[];
  skillTags: LearningGoal[];
  difficulty: ExperienceLevel;
  title: string;
  question: string;
  visualSpecimen: VisualSpecimenData;
  options: ChallengeOption[];
  correctAnswer: string;
  explanation: ChallengeExplanation;
  xpReward: number;
}

export interface UserProfile {
  id: string;
  name: string;
  disciplines: DesignerDiscipline[];
  experienceLevel: ExperienceLevel;
  goals: LearningGoal[];
  hasCompletedOnboarding: boolean;
  totalXp: number;
  currentStreak: number;
  highestStreak: number;
  lastCompletedDate: string | null;
  adaptiveRating: number; // e.g. 1200 base rating
  skillAccuracy: Record<string, { correct: number; total: number }>;
  history: Record<string, {
    date: string;
    completed: boolean;
    score: number;
    earnedXp: number;
    challengeIds: string[];
  }>;
}

export interface DailyExpeditionState {
  date: string;
  challenges: GameChallenge[];
  currentChallengeIndex: number;
  answers: Record<string, {
    selectedAnswer: string;
    isCorrect: boolean;
    earnedXp: number;
    timeSpentSeconds: number;
  }>;
  isComplete: boolean;
}
