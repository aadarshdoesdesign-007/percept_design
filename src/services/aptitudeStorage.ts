import { DEFAULT_UNIFIED_STATE } from '../types/percept';
import { AptitudeUserProgress } from '../types/aptitude';

export const DEFAULT_APTITUDE_PROGRESS: AptitudeUserProgress = DEFAULT_UNIFIED_STATE.aptitude;

/**
 * Aptitude Storage Service (Delegates directly to Unified Storage Architecture v5)
 */
export {
  loadAptitudeProgress,
  recordAptitudeAnswer,
  recordMockExamResult,
} from './storage';
