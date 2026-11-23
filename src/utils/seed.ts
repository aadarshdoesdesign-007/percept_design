import { UserStats } from '../types';

const STATS_KEY = 'percept_user_stats_v2';

export const getTodayDateString = (): string => {
  return new Date().toISOString().slice(0, 10);
};

export const getInitialStats = (): UserStats => {
  return {
    currentStreak: 5,
    highestStreak: 7,
    totalCalibrations: 18,
    lastCompletedDate: null,
    overallAccuracy: 94,
    weeklyHistory: [
      { day: 'M', date: '2026-11-08', completed: true, score: 96 },
      { day: 'T', date: '2026-11-09', completed: true, score: 92 },
      { day: 'W', date: '2026-11-10', completed: true, score: 98 },
      { day: 'T', date: '2026-11-11', completed: true, score: 90 },
      { day: 'F', date: '2026-11-12', completed: false },
      { day: 'S', date: '2026-11-13', completed: false },
      { day: 'S', date: '2026-11-14', completed: false },
    ],
  };
};

export const loadUserStats = (): UserStats => {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) {
      const initial = getInitialStats();
      localStorage.setItem(STATS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse user stats from localStorage:', err);
    return getInitialStats();
  }
};

export const saveUserStats = (stats: UserStats): void => {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Failed to save user stats to localStorage:', err);
  }
};

export const recordCompletedDrill = (dateStr: string): UserStats => {
  const stats = loadUserStats();
  if (stats.lastCompletedDate === dateStr) {
    return stats;
  }
  const updated: UserStats = {
    ...stats,
    currentStreak: stats.currentStreak + 1,
    highestStreak: Math.max(stats.highestStreak, stats.currentStreak + 1),
    totalCalibrations: stats.totalCalibrations + 1,
    lastCompletedDate: dateStr,
    weeklyHistory: stats.weeklyHistory.map((item) =>
      item.date === dateStr ? { ...item, completed: true, score: 95 } : item
    ),
  };
  saveUserStats(updated);
  return updated;
};
