import {
  PerceptUnifiedState,
  DEFAULT_UNIFIED_STATE,
  PerceptProfileState,
  PerceptExpeditionState,
  PerceptAptitudeState,
} from '../types/percept';

export const UNIFIED_STORAGE_KEY = 'percept_unified_state_v5';
export const LEGACY_PROFILE_KEY = 'percept_designer_profile_v4';
export const LEGACY_APTITUDE_KEY = 'percept_aptitude_progress_v1';
export const LEGACY_SOUND_KEY = 'percept_sound_muted';

/**
 * Validates whether an object conforms to PerceptUnifiedState v5
 */
export function isValidUnifiedState(data: any): data is PerceptUnifiedState {
  if (!data || typeof data !== 'object') return false;
  if (data.version !== 5) return false;
  if (!data.profile || typeof data.profile !== 'object') return false;
  if (!data.expedition || typeof data.expedition !== 'object') return false;
  if (!data.aptitude || typeof data.aptitude !== 'object') return false;
  if (!data.archive || typeof data.archive !== 'object') return false;
  if (!data.journal || typeof data.journal !== 'object') return false;
  if (!data.preferences || typeof data.preferences !== 'object') return false;
  return true;
}

/**
 * Safely parses JSON from localStorage without throwing
 */
function safeGetJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[PERCEPT Migration] Failed to parse key "${key}":`, err);
    return null;
  }
}

/**
 * Migration engine: converts legacy v4 profile, v1 aptitude, and sound settings into unified v5 state.
 * Idempotent, non-destructive, with fallback to default state.
 */
export function migrateToV5(): PerceptUnifiedState {
  try {
    // 1. If unified state already exists and passes validation, return it
    const existingUnified = safeGetJSON<PerceptUnifiedState>(UNIFIED_STORAGE_KEY);
    if (existingUnified && isValidUnifiedState(existingUnified)) {
      return existingUnified;
    }

    // 2. Read legacy stores safely
    const legacyProfile = safeGetJSON<any>(LEGACY_PROFILE_KEY);
    const legacyAptitude = safeGetJSON<any>(LEGACY_APTITUDE_KEY);
    const legacySoundRaw = localStorage.getItem(LEGACY_SOUND_KEY);
    const legacySoundMuted = legacySoundRaw === 'true';

    // 3. Construct Profile bucket
    const profile: PerceptProfileState = {
      id: legacyProfile?.id || DEFAULT_UNIFIED_STATE.profile.id,
      name: legacyProfile?.name || DEFAULT_UNIFIED_STATE.profile.name,
      disciplines: Array.isArray(legacyProfile?.disciplines) && legacyProfile.disciplines.length > 0
        ? legacyProfile.disciplines
        : DEFAULT_UNIFIED_STATE.profile.disciplines,
      experienceLevel: legacyProfile?.experienceLevel || DEFAULT_UNIFIED_STATE.profile.experienceLevel,
      goals: Array.isArray(legacyProfile?.goals) && legacyProfile.goals.length > 0
        ? legacyProfile.goals
        : DEFAULT_UNIFIED_STATE.profile.goals,
      hasCompletedOnboarding: typeof legacyProfile?.hasCompletedOnboarding === 'boolean'
        ? legacyProfile.hasCompletedOnboarding
        : DEFAULT_UNIFIED_STATE.profile.hasCompletedOnboarding,
      registeredDate: legacyProfile?.registeredDate || new Date().toISOString().slice(0, 10),
    };

    // 4. Construct Expedition bucket (preserving XP, streaks, rating, skill accuracy, history)
    const expedition: PerceptExpeditionState = {
      totalXp: typeof legacyProfile?.totalXp === 'number'
        ? legacyProfile.totalXp
        : DEFAULT_UNIFIED_STATE.expedition.totalXp,
      currentStreak: typeof legacyProfile?.currentStreak === 'number'
        ? legacyProfile.currentStreak
        : DEFAULT_UNIFIED_STATE.expedition.currentStreak,
      highestStreak: typeof legacyProfile?.highestStreak === 'number'
        ? legacyProfile.highestStreak
        : DEFAULT_UNIFIED_STATE.expedition.highestStreak,
      lastCompletedDate: legacyProfile?.lastCompletedDate || null,
      adaptiveRating: typeof legacyProfile?.adaptiveRating === 'number'
        ? legacyProfile.adaptiveRating
        : DEFAULT_UNIFIED_STATE.expedition.adaptiveRating,
      skillAccuracy: legacyProfile?.skillAccuracy && typeof legacyProfile.skillAccuracy === 'object'
        ? legacyProfile.skillAccuracy
        : DEFAULT_UNIFIED_STATE.expedition.skillAccuracy,
      history: legacyProfile?.history && typeof legacyProfile.history === 'object'
        ? legacyProfile.history
        : {},
    };

    // 5. Construct Aptitude bucket (preserving attempts, accuracy, question ids, mock exam history)
    const aptitude: PerceptAptitudeState = {
      questionsAttempted: typeof legacyAptitude?.questionsAttempted === 'number'
        ? legacyAptitude.questionsAttempted
        : DEFAULT_UNIFIED_STATE.aptitude.questionsAttempted,
      correctAnswers: typeof legacyAptitude?.correctAnswers === 'number'
        ? legacyAptitude.correctAnswers
        : DEFAULT_UNIFIED_STATE.aptitude.correctAnswers,
      incorrectAnswers: typeof legacyAptitude?.incorrectAnswers === 'number'
        ? legacyAptitude.incorrectAnswers
        : DEFAULT_UNIFIED_STATE.aptitude.incorrectAnswers,
      totalTimeSpentSeconds: typeof legacyAptitude?.totalTimeSpentSeconds === 'number'
        ? legacyAptitude.totalTimeSpentSeconds
        : DEFAULT_UNIFIED_STATE.aptitude.totalTimeSpentSeconds,
      streakDays: typeof legacyAptitude?.streakDays === 'number'
        ? legacyAptitude.streakDays
        : DEFAULT_UNIFIED_STATE.aptitude.streakDays,
      lastActiveDate: legacyAptitude?.lastActiveDate || DEFAULT_UNIFIED_STATE.aptitude.lastActiveDate,
      currentDifficulty: legacyAptitude?.currentDifficulty || DEFAULT_UNIFIED_STATE.aptitude.currentDifficulty,
      completedQuestionIds: Array.isArray(legacyAptitude?.completedQuestionIds)
        ? legacyAptitude.completedQuestionIds
        : DEFAULT_UNIFIED_STATE.aptitude.completedQuestionIds,
      categoryStats: {
        ...DEFAULT_UNIFIED_STATE.aptitude.categoryStats,
        ...(legacyAptitude?.categoryStats || {}),
      },
      mockExamHistory: Array.isArray(legacyAptitude?.mockExamHistory)
        ? legacyAptitude.mockExamHistory
        : [],
    };

    // 6. Construct Archive bucket
    const archive = DEFAULT_UNIFIED_STATE.archive;

    // 7. Construct Journal bucket
    const journal = DEFAULT_UNIFIED_STATE.journal;

    // 8. Construct Preferences bucket
    const preferences = {
      ...DEFAULT_UNIFIED_STATE.preferences,
      soundMuted: legacySoundRaw !== null ? legacySoundMuted : DEFAULT_UNIFIED_STATE.preferences.soundMuted,
    };

    // 9. Assemble unified state
    const unifiedState: PerceptUnifiedState = {
      version: 5,
      profile,
      expedition,
      aptitude,
      archive,
      journal,
      preferences,
    };

    // 10. Persist unified state to storage (leaving legacy keys intact for safety)
    localStorage.setItem(UNIFIED_STORAGE_KEY, JSON.stringify(unifiedState));
    console.info('[PERCEPT Migration] Successfully elevated to PerceptUnifiedState v5.');

    return unifiedState;
  } catch (err) {
    console.error('[PERCEPT Migration] Unexpected error during migration:', err);
    return DEFAULT_UNIFIED_STATE;
  }
}
