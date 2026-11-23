import { CHALLENGES_BANK } from '../data/challengesBank';
import { GameChallenge, UserProfile, GameMode } from '../types/game';

// Simple deterministic hash based on date and profile
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Linear Congruential Generator for reproducible pseudo-random sequences
function createPRNG(seed: number) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/**
 * ADAPTIVE DAILY EXPEDITION SELECTION ENGINE
 * Selects exactly 3 personalized visual challenges based on user profile,
 * learning goals, adaptive rating, and calendar date.
 */
export function selectDailyExpedition(
  profile: UserProfile,
  dateStr: string
): GameChallenge[] {
  const seedString = `${dateStr}-${profile.disciplines.join(',')}-${profile.experienceLevel}-${profile.goals.join(',')}`;
  const seed = hashString(seedString);
  const rand = createPRNG(seed);

  // 1. Filter bank by relevancy
  const scored = CHALLENGES_BANK.map((challenge) => {
    let score = 0;

    // Discipline match
    const hasDisciplineMatch = challenge.disciplineTags.some((d) =>
      profile.disciplines.includes(d)
    );
    if (hasDisciplineMatch) score += 40;

    // Learning goal match
    const hasGoalMatch = challenge.skillTags.some((g) =>
      profile.goals.includes(g)
    );
    if (hasGoalMatch) score += 35;

    // Difficulty matching adaptive rating
    if (profile.adaptiveRating >= 1350) {
      if (challenge.difficulty === 'advanced') score += 25;
      else if (challenge.difficulty === 'intermediate') score += 15;
    } else if (profile.adaptiveRating >= 1150) {
      if (challenge.difficulty === 'intermediate') score += 25;
      else score += 15;
    } else {
      if (challenge.difficulty === 'beginner') score += 25;
      else if (challenge.difficulty === 'intermediate') score += 15;
    }

    // Add deterministic pseudo-random jitter
    score += rand() * 15;

    return { challenge, score };
  });

  // Sort descending by relevance score
  scored.sort((a, b) => b.score - a.score);

  // 2. Select 3 challenges ensuring diverse Game Modes
  const selected: GameChallenge[] = [];
  const usedModes = new Set<GameMode>();

  for (const item of scored) {
    if (selected.length >= 3) break;

    // Prefer distinct game modes for all 3 slots
    if (!usedModes.has(item.challenge.gameMode)) {
      selected.push(item.challenge);
      usedModes.add(item.challenge.gameMode);
    }
  }

  // Fallback if not enough distinct modes available
  if (selected.length < 3) {
    for (const item of scored) {
      if (selected.length >= 3) break;
      if (!selected.some((c) => c.id === item.challenge.id)) {
        selected.push(item.challenge);
      }
    }
  }

  return selected;
}

/**
 * Adaptive Difficulty Progression Calculator
 */
export function calculateAdaptiveUpdate(
  currentRating: number,
  isCorrect: boolean,
  challengeDifficulty: 'beginner' | 'intermediate' | 'advanced'
): number {
  const kFactor = 32;
  const expectedDifficulty =
    challengeDifficulty === 'advanced' ? 1400 : challengeDifficulty === 'intermediate' ? 1200 : 1000;
  
  const expectedScore = 1 / (1 + Math.pow(10, (expectedDifficulty - currentRating) / 400));
  const actualScore = isCorrect ? 1 : 0;
  
  const newRating = Math.round(currentRating + kFactor * (actualScore - expectedScore));
  return Math.max(800, Math.min(2000, newRating));
}
