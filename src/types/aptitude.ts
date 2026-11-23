export type AptitudeCategory =
  | 'visual'
  | 'spatial'
  | 'logical'
  | 'analytical'
  | 'creative'
  | 'mock';

export type AptitudeDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type AptitudePracticeMode = 'topic' | 'quick' | 'daily' | 'timed' | 'mock';

export interface AptitudeDiagram {
  type: 'svg-cube-net' | 'svg-series' | 'svg-rotation' | 'svg-orthographic' | 'svg-dice' | 'svg-chart' | 'svg-pattern' | 'svg-custom';
  data: any;
  caption?: string;
  attribution?: string;
}

export interface AptitudeOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  diagramSnippet?: string;
}

export interface AptitudeExplanation {
  summary: string;
  stepByStep: string[];
  keyFormula?: string;
  deductionRule?: string;
}

export interface AptitudeQuestion {
  id: string;
  category: AptitudeCategory;
  topic: string;
  subtopic?: string;
  difficulty: AptitudeDifficulty;
  question: string;
  questionText?: string;
  diagram?: AptitudeDiagram;
  options: AptitudeOption[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
  explanation: AptitudeExplanation;
  suggestedTimeSeconds: number;
  hint?: string;
  examTag?: 'CEED' | 'UCEED' | 'NID DAT';
}

export interface AptitudeCategoryMeta {
  id: AptitudeCategory;
  title: string;
  shortDesc: string;
  topics: string[];
  totalQuestions: number;
  index: string;
}

export interface MockExamDefinition {
  id: string;
  title: string;
  examType: 'CEED' | 'UCEED' | 'NID DAT';
  subtitle: string;
  durationMinutes: number;
  questionCount: number;
  description: string;
  questionIds: string[];
}

export interface AptitudeUserProgress {
  questionsAttempted: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalTimeSpentSeconds: number;
  streakDays: number;
  lastActiveDate: string | null;
  currentDifficulty: AptitudeDifficulty;
  categoryStats: Record<AptitudeCategory, {
    attempted: number;
    correct: number;
    timeSpentSeconds: number;
  }>;
  completedQuestionIds: string[];
  mockExamHistory: {
    examId: string;
    examName: string;
    score: number;
    total: number;
    accuracy: number;
    timeSeconds: number;
    date: string;
  }[];
}
