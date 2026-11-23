import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  PerceptUnifiedState,
  PerceptProfileState,
  PerceptExpeditionState,
  PerceptAptitudeState,
  PerceptArchiveState,
  PerceptJournalState,
  PerceptPreferencesState,
} from '../types/percept';
import { UserProfile } from '../types/game';
import { AptitudeCategory } from '../types/aptitude';
import {
  loadUnifiedState,
  saveUnifiedState,
  updateProfile as updateProfileStorage,
  updateExpedition as updateExpeditionStorage,
  updateAptitude as updateAptitudeStorage,
  updateArchive as updateArchiveStorage,
  updateJournal as updateJournalStorage,
  updatePreferences as updatePreferencesStorage,
  recordAptitudeAnswer as recordAptitudeAnswerStorage,
  recordMockExamResult as recordMockExamResultStorage,
} from '../services/storage';

interface PerceptContextType {
  state: PerceptUnifiedState;
  updateProfile: (updates: Partial<PerceptProfileState>) => void;
  updateExpedition: (updates: Partial<PerceptExpeditionState>) => void;
  updateAptitude: (updates: Partial<PerceptAptitudeState>) => void;
  updateArchive: (updates: Partial<PerceptArchiveState>) => void;
  updateJournal: (updates: Partial<PerceptJournalState>) => void;
  updatePreferences: (updates: Partial<PerceptPreferencesState>) => void;
  recordAptitudeAnswer: (
    questionId: string,
    category: AptitudeCategory,
    isCorrect: boolean,
    timeSpentSeconds: number
  ) => void;
  recordMockResult: (
    examId: string,
    examName: string,
    score: number,
    total: number,
    timeSeconds: number
  ) => void;
  // Legacy bridge
  legacyProfile: UserProfile;
  updateLegacyProfile: (updated: UserProfile) => void;
}

const PerceptContext = createContext<PerceptContextType | null>(null);

export const PerceptProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PerceptUnifiedState>(() => loadUnifiedState());

  // Listen for storage events across tabs or windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'percept_unified_state_v5' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setState(parsed);
        } catch (err) {
          console.error('[PerceptContext] Failed to parse updated state from storage event:', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateProfile = (updates: Partial<PerceptProfileState>) => {
    const next = updateProfileStorage(updates);
    setState(next);
  };

  const updateExpedition = (updates: Partial<PerceptExpeditionState>) => {
    const next = updateExpeditionStorage(updates);
    setState(next);
  };

  const updateAptitude = (updates: Partial<PerceptAptitudeState>) => {
    const next = updateAptitudeStorage(updates);
    setState(next);
  };

  const updateArchive = (updates: Partial<PerceptArchiveState>) => {
    const next = updateArchiveStorage(updates);
    setState(next);
  };

  const updateJournal = (updates: Partial<PerceptJournalState>) => {
    const next = updateJournalStorage(updates);
    setState(next);
  };

  const updatePreferences = (updates: Partial<PerceptPreferencesState>) => {
    const next = updatePreferencesStorage(updates);
    setState(next);
  };

  const recordAptitudeAnswer = (
    questionId: string,
    category: AptitudeCategory,
    isCorrect: boolean,
    timeSpentSeconds: number
  ) => {
    recordAptitudeAnswerStorage(questionId, category, isCorrect, timeSpentSeconds);
    setState(loadUnifiedState());
  };

  const recordMockResult = (
    examId: string,
    examName: string,
    score: number,
    total: number,
    timeSeconds: number
  ) => {
    recordMockExamResultStorage(examId, examName, score, total, timeSeconds);
    setState(loadUnifiedState());
  };

  // Convert unified state to legacy UserProfile shape for components that require it
  const legacyProfile: UserProfile = useMemo(() => {
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
  }, [state]);

  const updateLegacyProfile = (updated: UserProfile) => {
    const next: PerceptUnifiedState = {
      ...state,
      profile: {
        ...state.profile,
        id: updated.id,
        name: updated.name,
        disciplines: updated.disciplines,
        experienceLevel: updated.experienceLevel,
        goals: updated.goals,
        hasCompletedOnboarding: updated.hasCompletedOnboarding,
      },
      expedition: {
        ...state.expedition,
        totalXp: updated.totalXp,
        currentStreak: updated.currentStreak,
        highestStreak: updated.highestStreak,
        lastCompletedDate: updated.lastCompletedDate,
        adaptiveRating: updated.adaptiveRating,
        skillAccuracy: updated.skillAccuracy,
        history: updated.history,
      },
    };
    saveUnifiedState(next);
    setState(next);
  };

  const value = {
    state,
    updateProfile,
    updateExpedition,
    updateAptitude,
    updateArchive,
    updateJournal,
    updatePreferences,
    recordAptitudeAnswer,
    recordMockResult,
    legacyProfile,
    updateLegacyProfile,
  };

  return <PerceptContext.Provider value={value}>{children}</PerceptContext.Provider>;
};

export function usePercept(): PerceptContextType {
  const context = useContext(PerceptContext);
  if (!context) {
    throw new Error('usePercept must be used within a PerceptProvider');
  }
  return context;
}
