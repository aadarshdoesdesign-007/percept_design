export * from './game';
export * from './aptitude';
export * from './media';
export * from './percept';

export interface WeeklyHistoryItem {
  day: string;
  date: string;
  completed: boolean;
  score?: number;
}

export interface UserStats {
  currentStreak: number;
  highestStreak: number;
  totalCalibrations: number;
  lastCompletedDate: string | null;
  overallAccuracy: number;
  weeklyHistory: WeeklyHistoryItem[];
}

export interface ChallengePreview {
  id: string;
  index: string;
  title: string;
  discipline: string;
  track: string;
  description: string;
  estimatedMinutes: number;
  toleranceMetric: string;
  benchmarkOrigin: string;
  status: 'ready' | 'locked' | 'completed';
  keyConcepts: string[];
  specs: {
    targetSystem: string;
    samplePrompt: string;
    evaluationMethod: string;
    targetAccuracy: string;
  };
}

export type MascotVariant = 'head' | 'front' | 'side' | 'companion';
export type MascotSize = 'avatar' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface MascotProps {
  variant?: MascotVariant;
  size?: MascotSize;
  className?: string;
  animate?: boolean;
  alt?: string;
  showBorder?: boolean;
  onClick?: () => void;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  interactive?: boolean;
}

