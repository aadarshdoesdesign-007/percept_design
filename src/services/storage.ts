import {
  PerceptUnifiedState,
  DEFAULT_UNIFIED_STATE,
  PerceptProfileState,
  PerceptExpeditionState,
  PerceptAptitudeState,
  PerceptArchiveState,
  PerceptJournalState,
  PerceptPreferencesState,
} from '../types/percept';
import { UserProfile } from '../types/game';
import { AptitudeCategory, AptitudeDifficulty, AptitudeUserProgress } from '../types/aptitude';
import { migrateToV5, UNIFIED_STORAGE_KEY } from './storageMigration';

/**
 * Loads the validated unified state from storage, executing migration from legacy stores if needed.
 */
export function loadUnifiedState(): PerceptUnifiedState {
  return migrateToV5();
}

/**
 * Writes the complete unified state to storage.
 */
export function saveUnifiedState(state: PerceptUnifiedState): void {
  try {
    localStorage.setItem(UNIFIED_STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('[PERCEPT Storage] Failed to persist unified state:', err);
  }
}

/**
 * Granular Profile updater
 */
export function updateProfile(updates: Partial<PerceptProfileState>): PerceptUnifiedState {
  const current = loadUnifiedState();
  const next: PerceptUnifiedState = {
    ...current,
    profile: { ...current.profile, ...updates },
  };
  saveUnifiedState(next);
  return next;
}

/**
 * Granular Expedition updater
 */
export function updateExpedition(updates: Partial<PerceptExpeditionState>): PerceptUnifiedState {
  const current = loadUnifiedState();
  const next: PerceptUnifiedState = {
    ...current,
    expedition: { ...current.expedition, ...updates },
  };
  saveUnifiedState(next);
  return next;
}

/**
 * Granular Aptitude updater
 */
export function updateAptitude(updates: Partial<PerceptAptitudeState>): PerceptUnifiedState {
  const current = loadUnifiedState();
  const next: PerceptUnifiedState = {
    ...current,
    aptitude: { ...current.aptitude, ...updates },
  };
  saveUnifiedState(next);
  return next;
}

/**
 * Granular Archive updater
 */
export function updateArchive(updates: Partial<PerceptArchiveState>): PerceptUnifiedState {
  const current = loadUnifiedState();
  const next: PerceptUnifiedState = {
    ...current,
    archive: { ...current.archive, ...updates },
  };
  saveUnifiedState(next);
  return next;
}

/**
 * Granular Journal updater
 */
export function updateJournal(updates: Partial<PerceptJournalState>): PerceptUnifiedState {
  const current = loadUnifiedState();
  const next: PerceptUnifiedState = {
    ...current,
    journal: { ...current.journal, ...updates },
  };
  saveUnifiedState(next);
  return next;
}

/**
 * Granular Preferences updater
 */
export function updatePreferences(updates: Partial<PerceptPreferencesState>): PerceptUnifiedState {
  const current = loadUnifiedState();
  const next: PerceptUnifiedState = {
    ...current,
    preferences: { ...current.preferences, ...updates },
  };
  saveUnifiedState(next);
  return next;
}

/**
 * Records an aptitude answer in the unified store with dynamic difficulty calibration
 */
export function recordAptitudeAnswer(
  questionId: string,
  category: AptitudeCategory,
  isCorrect: boolean,
  timeSpentSeconds: number
): PerceptAptitudeState {
  const current = loadUnifiedState();
  const todayStr = new Date().toISOString().slice(0, 10);
  const apt = current.aptitude;

  let streak = apt.streakDays;
  if (apt.lastActiveDate !== todayStr) {
    streak = apt.streakDays + 1;
  }

  const prevCategory = apt.categoryStats[category] || { attempted: 0, correct: 0, timeSpentSeconds: 0 };
  const updatedCategory = {
    attempted: prevCategory.attempted + 1,
    correct: prevCategory.correct + (isCorrect ? 1 : 0),
    timeSpentSeconds: prevCategory.timeSpentSeconds + timeSpentSeconds,
  };

  const completedIds = apt.completedQuestionIds.includes(questionId)
    ? apt.completedQuestionIds
    : [...apt.completedQuestionIds, questionId];

  const totalAttempted = apt.questionsAttempted + 1;
  const totalCorrect = apt.correctAnswers + (isCorrect ? 1 : 0);
  const accuracy = (totalCorrect / totalAttempted) * 100;

  let difficulty: AptitudeDifficulty = apt.currentDifficulty;
  if (totalAttempted >= 10) {
    if (accuracy >= 85) difficulty = 'advanced';
    else if (accuracy >= 65) difficulty = 'intermediate';
    else difficulty = 'beginner';
  }

  const updatedAptitude: PerceptAptitudeState = {
    ...apt,
    questionsAttempted: totalAttempted,
    correctAnswers: totalCorrect,
    incorrectAnswers: apt.incorrectAnswers + (isCorrect ? 0 : 1),
    totalTimeSpentSeconds: apt.totalTimeSpentSeconds + timeSpentSeconds,
    streakDays: streak,
    lastActiveDate: todayStr,
    currentDifficulty: difficulty,
    completedQuestionIds: completedIds,
    categoryStats: {
      ...apt.categoryStats,
      [category]: updatedCategory,
    },
  };

  updateAptitude(updatedAptitude);
  return updatedAptitude;
}

/**
 * Records a mock exam result in the unified store
 */
export function recordMockExamResult(
  examId: string,
  examName: string,
  score: number,
  total: number,
  timeSeconds: number
): PerceptAptitudeState {
  const current = loadUnifiedState();
  const accuracy = Math.round((score / Math.max(1, total)) * 100);
  const record = {
    examId,
    examName,
    score,
    total,
    accuracy,
    timeSeconds,
    date: new Date().toISOString().slice(0, 10),
  };

  const updatedAptitude: PerceptAptitudeState = {
    ...current.aptitude,
    mockExamHistory: [record, ...current.aptitude.mockExamHistory],
  };

  updateAptitude(updatedAptitude);
  return updatedAptitude;
}

// ============================================================================
// BACKWARD-COMPATIBILITY BRIDGE FOR LEGACY USER PROFILE APIS
// ============================================================================

export const DEFAULT_PROFILE: UserProfile = {
  id: DEFAULT_UNIFIED_STATE.profile.id,
  name: DEFAULT_UNIFIED_STATE.profile.name,
  disciplines: DEFAULT_UNIFIED_STATE.profile.disciplines,
  experienceLevel: DEFAULT_UNIFIED_STATE.profile.experienceLevel,
  goals: DEFAULT_UNIFIED_STATE.profile.goals,
  hasCompletedOnboarding: DEFAULT_UNIFIED_STATE.profile.hasCompletedOnboarding,
  totalXp: DEFAULT_UNIFIED_STATE.expedition.totalXp,
  currentStreak: DEFAULT_UNIFIED_STATE.expedition.currentStreak,
  highestStreak: DEFAULT_UNIFIED_STATE.expedition.highestStreak,
  lastCompletedDate: DEFAULT_UNIFIED_STATE.expedition.lastCompletedDate,
  adaptiveRating: DEFAULT_UNIFIED_STATE.expedition.adaptiveRating,
  skillAccuracy: DEFAULT_UNIFIED_STATE.expedition.skillAccuracy,
  history: DEFAULT_UNIFIED_STATE.expedition.history,
};

/**
 * Bridges legacy UserProfile view onto the unified state
 */
export function loadUserProfile(): UserProfile {
  const state = loadUnifiedState();
  return {
    id: state.profile.id,
    name: state.profile.name,
    disciplines: state.profile.disciplines,
    experienceLevel: state.profile.experienceLevel,
    goals: state.profile.goals,
    hasCompletedOnboarding: state.profile.hasCompletedOnboarding,
    totalXp: state.expedition.totalXp,
    currentStreak: state.expedition.currentStreak,
    highestStreak: state.expedition.highestStreak,
    lastCompletedDate: state.expedition.lastCompletedDate,
    adaptiveRating: state.expedition.adaptiveRating,
    skillAccuracy: state.expedition.skillAccuracy,
    history: state.expedition.history,
  };
}

/**
 * Bridges legacy saveUserProfile by delegating to profile & expedition buckets
 */
export function saveUserProfile(profile: UserProfile): void {
  const current = loadUnifiedState();
  const next: PerceptUnifiedState = {
    ...current,
    profile: {
      ...current.profile,
      id: profile.id,
      name: profile.name,
      disciplines: profile.disciplines,
      experienceLevel: profile.experienceLevel,
      goals: profile.goals,
      hasCompletedOnboarding: profile.hasCompletedOnboarding,
    },
    expedition: {
      ...current.expedition,
      totalXp: profile.totalXp,
      currentStreak: profile.currentStreak,
      highestStreak: profile.highestStreak,
      lastCompletedDate: profile.lastCompletedDate,
      adaptiveRating: profile.adaptiveRating,
      skillAccuracy: profile.skillAccuracy,
      history: profile.history,
    },
  };
  saveUnifiedState(next);
}

export function updateUserProfile(updates: Partial<UserProfile>): UserProfile {
  const current = loadUserProfile();
  const updated = { ...current, ...updates };
  saveUserProfile(updated);
  return updated;
}

export function resetOnboarding(): UserProfile {
  const current = loadUnifiedState();
  const resetProfile = {
    ...current.profile,
    hasCompletedOnboarding: false,
  };
  updateProfile(resetProfile);
  return loadUserProfile();
}

/**
 * Bridges AptitudeUserProgress onto the unified store
 */
export function loadAptitudeProgress(): AptitudeUserProgress {
  const state = loadUnifiedState();
  return state.aptitude;
}
