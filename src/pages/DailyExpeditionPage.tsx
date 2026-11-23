import React, { useState, useMemo } from 'react';
import { UserProfile, GameChallenge } from '../types/game';
import { selectDailyExpedition, calculateAdaptiveUpdate } from '../services/engine';
import { GameOrchestrator } from '../components/game/GameOrchestrator';
import { DailyCompletionCard } from '../components/profile/DailyCompletionCard';
import { OnboardingFlow } from '../components/onboarding/OnboardingFlow';
import { Button } from '../components/ui/Button';
import { Mascot } from '../components/mascot/Mascot';
import { sound } from '../utils/audio';
import { getDailyDiscovery } from '../data/discoveriesBank';
import { DailyDiscoveryCard } from '../components/dashboard/DailyDiscoveryCard';
import { ContinueLearningSection } from '../components/dashboard/ContinueLearningSection';
import { SkillTelemetrySection } from '../components/dashboard/SkillTelemetrySection';
import { usePercept } from '../context/PerceptContext';
import { useNavigate } from 'react-router-dom';
import {
  IconCadence,
  IconXP,
  IconCoordinateDatum,
  IconPrecisionCheck,
  IconArrowRight,
  IconArrowUpRight,
  IconTechnicalClock,
  IconDesignerDossier,
} from '../components/ui/icons';

interface DailyExpeditionPageProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onNavigateToProfile: () => void;
}

export const DailyExpeditionPage: React.FC<DailyExpeditionPageProps> = ({
  profile,
  onUpdateProfile,
  onNavigateToProfile,
}) => {
  const { state } = usePercept();
  const navigate = useNavigate();
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const dailyDiscovery = useMemo(() => getDailyDiscovery(todayStr), [todayStr]);

  // Generate deterministic 3 challenges based on user profile and date
  const challenges: GameChallenge[] = useMemo(() => {
    return selectDailyExpedition(profile, todayStr);
  }, [profile, todayStr]);

  const [activeChallengeIndex, setActiveChallengeIndex] = useState<number | null>(null);
  const [completedChallengeIds, setCompletedChallengeIds] = useState<string[]>([]);
  const [sessionEarnedXp, setSessionEarnedXp] = useState<number>(0);
  const [sessionCorrectCount, setSessionCorrectCount] = useState<number>(0);
  const [showEditOnboarding, setShowEditOnboarding] = useState(false);

  // If onboarding not completed, trigger onboarding immediately
  if (!profile.hasCompletedOnboarding) {
    return (
      <OnboardingFlow
        initialProfile={profile}
        onComplete={(updated) => onUpdateProfile(updated)}
      />
    );
  }

  // Handle single answer completion
  const handleAnswerComplete = (isCorrect: boolean, earnedXp: number) => {
    if (activeChallengeIndex === null) return;
    const currentChallenge = challenges[activeChallengeIndex];

    setSessionEarnedXp((prev) => prev + earnedXp);
    if (isCorrect) setSessionCorrectCount((prev) => prev + 1);
    setCompletedChallengeIds((prev) =>
      prev.includes(currentChallenge.id) ? prev : [...prev, currentChallenge.id]
    );

    const newRating = calculateAdaptiveUpdate(
      profile.adaptiveRating,
      isCorrect,
      currentChallenge.difficulty
    );

    const updatedProfile: UserProfile = {
      ...profile,
      totalXp: profile.totalXp + earnedXp,
      adaptiveRating: newRating,
    };
    onUpdateProfile(updatedProfile);
  };

  // Move to next challenge or complete expedition
  const handleNextChallenge = () => {
    if (activeChallengeIndex === null) return;

    if (activeChallengeIndex < challenges.length - 1) {
      setActiveChallengeIndex(activeChallengeIndex + 1);
    } else {
      const isAlreadyCompletedToday = profile.lastCompletedDate === todayStr;

      const updatedProfile: UserProfile = {
        ...profile,
        currentStreak: isAlreadyCompletedToday ? profile.currentStreak : profile.currentStreak + 1,
        highestStreak: isAlreadyCompletedToday
          ? profile.highestStreak
          : Math.max(profile.highestStreak, profile.currentStreak + 1),
        lastCompletedDate: todayStr,
      };
      onUpdateProfile(updatedProfile);
      setActiveChallengeIndex(-1);
    }
  };

  // If currently inside an active challenge:
  if (activeChallengeIndex !== null && activeChallengeIndex >= 0) {
    const currentChallenge = challenges[activeChallengeIndex];
    return (
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-8 animate-fadeIn">
        <div className="mb-6 flex items-center justify-between border-b border-[#292929] pb-4">
          <button
            onClick={() => {
              sound.click();
              setActiveChallengeIndex(null);
            }}
            className="text-xs font-mono text-neutral-400 hover:text-white uppercase flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            ← Return to Daily Overview
          </button>

          <div className="flex items-center gap-3 font-mono text-xs text-neutral-500 whitespace-nowrap">
            <span>SEED: {todayStr}</span>
            <span>·</span>
            <span className="text-white">ACTIVE LAB</span>
          </div>
        </div>

        <GameOrchestrator
          challenge={currentChallenge}
          challengeIndex={activeChallengeIndex}
          totalChallenges={challenges.length}
          onAnswerComplete={handleAnswerComplete}
          onNext={handleNextChallenge}
        />
      </div>
    );
  }

  // If completed daily expedition:
  if (activeChallengeIndex === -1) {
    const accuracy = Math.round((sessionCorrectCount / Math.max(1, challenges.length)) * 100);
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-10">
        <DailyCompletionCard
          profile={profile}
          totalEarnedXp={sessionEarnedXp}
          accuracyPercent={accuracy || 92}
          onRestart={() => {
            sound.click();
            setActiveChallengeIndex(0);
            setCompletedChallengeIds([]);
            setSessionEarnedXp(0);
            setSessionCorrectCount(0);
          }}
          onOpenProfile={onNavigateToProfile}
        />
      </div>
    );
  }

  const completionPercent = Math.round((completedChallengeIds.length / challenges.length) * 100);

  // Main Daily Expedition Dashboard (Wide 1500px Desktop Architecture)
  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-12 animate-fadeIn">
      
      {/* Editorial Hero Masthead */}
      <section className="border-b border-[#292929] pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 flex-1 min-w-0">
            
            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs">
              <span className="px-2.5 py-1 bg-white text-black font-bold uppercase tracking-widest text-[10px] shrink-0">
                PILLAR 02 · PLAY
              </span>
              <span className="text-neutral-500">/</span>
              <span className="text-[#D99535] font-semibold tracking-wider">
                DAILY EXPEDITION · {todayStr}
              </span>
              <span className="text-neutral-500">/</span>
              <span className="text-neutral-400">
                {profile.experienceLevel.toUpperCase()} · {profile.disciplines.join(' · ')}
              </span>
            </div>

            {/* Primary Heading */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#EDEDED] tracking-tight leading-[1.05]">
              Visual Intelligence Expedition
            </h1>

            {/* Editorial Manifesto Pull Quote */}
            <div className="pt-2 border-l-2 border-[#D99535] pl-4 sm:pl-6 max-w-4xl space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#D99535] font-bold block">
                MANIFESTO AXIOM // OPTICAL FIELD RESEARCH
              </span>
              <blockquote className="font-display text-base sm:text-lg lg:text-[21px] text-neutral-400 leading-[1.6] tracking-tight">
                "If you want to be a better designer, don't study design books.{' '}
                <strong className="text-white font-bold">Study sculpture.</strong>{' '}
                <strong className="text-white font-bold">Study paintings.</strong>{' '}
                <strong className="text-white font-bold">
                  Study cars, watches, philosophers, movies, fiction, music, people.
                </strong>{' '}
                <span className="text-[#D99535] font-extrabold tracking-normal">
                  Study the world."
                </span>
              </blockquote>
            </div>

          </div>

          {/* Action & Status Box */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 border-t lg:border-t-0 lg:border-l border-[#292929] pt-6 lg:pt-0 lg:pl-8 shrink-0">
            <div className="space-y-1 text-left lg:text-right font-mono text-xs">
              <span className="text-neutral-500 uppercase tracking-widest block text-[10px]">
                EXPEDITION STATUS
              </span>
              <span className="text-white font-bold text-sm">
                {completedChallengeIds.length} OF {challenges.length} INVESTIGATIONS SOLVED
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  sound.click();
                  setShowEditOnboarding(true);
                }}
                icon={<IconDesignerDossier className="w-3.5 h-3.5" />}
              >
                Re-Calibrate
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  sound.click();
                  setActiveChallengeIndex(0);
                }}
                icon={<IconArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {completedChallengeIds.length > 0 ? 'Resume Expedition' : 'Begin Expedition'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Balanced 4-Column Statistics Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 border-y border-[#292929] divide-y sm:divide-y-0 sm:divide-x divide-[#292929] bg-[#0E0E0E]">
        
        {/* 1. Active Streak */}
        <div className="p-4 sm:p-6 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-neutral-500 font-mono text-[10px] tracking-widest uppercase">
            <span>ACTIVE STREAK</span>
            <IconCadence className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          </div>
          <div className="flex items-baseline gap-2 font-display font-bold text-2xl sm:text-4xl text-[#EDEDED]">
            <span>{profile.currentStreak}</span>
            <span className="text-xs sm:text-sm font-mono font-normal text-neutral-500">DAYS</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">UNBROKEN CADENCE</span>
        </div>

        {/* 2. Total XP */}
        <div className="p-4 sm:p-6 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-neutral-500 font-mono text-[10px] tracking-widest uppercase">
            <span>TOTAL XP</span>
            <IconXP className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          </div>
          <div className="flex items-baseline gap-2 font-display font-bold text-2xl sm:text-4xl text-[#EDEDED]">
            <span>{profile.totalXp}</span>
            <span className="text-xs sm:text-sm font-mono font-normal text-neutral-500">XP</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">OPTICAL CAPITAL</span>
        </div>

        {/* 3. Adaptive Elo */}
        <div className="p-4 sm:p-6 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-neutral-500 font-mono text-[10px] tracking-widest uppercase">
            <span>ADAPTIVE ELO</span>
            <IconCoordinateDatum className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          </div>
          <div className="flex items-baseline gap-2 font-display font-bold text-2xl sm:text-4xl text-[#EDEDED]">
            <span>{profile.adaptiveRating}</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">DYNAMIC EYE RATING</span>
        </div>

        {/* 4. Completion Progress */}
        <div className="p-4 sm:p-6 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-neutral-500 font-mono text-[10px] tracking-widest uppercase">
            <span>EXPEDITION</span>
            <span className="text-white font-mono text-xs">{completionPercent}%</span>
          </div>
          <div className="flex items-baseline gap-2 font-display font-bold text-2xl sm:text-4xl text-[#EDEDED]">
            <span>{completedChallengeIds.length}</span>
            <span className="text-xs sm:text-sm font-mono font-normal text-neutral-500">/ 3 SOLVED</span>
          </div>
          <div className="w-full bg-[#1C1C1C] h-1 border border-[#292929]">
            <div
              className="bg-white h-full transition-all duration-300"
              style={{ width: `${Math.max(4, completionPercent)}%` }}
            />
          </div>
        </div>

      </section>

      {/* Main Exhibition Queue (3 Columns, generous horizontal width) */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-[#292929] pb-4">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block mb-1 whitespace-nowrap">
              SECTION 01 · CURATED INVESTIGATIONS
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#EDEDED] tracking-tight">
              Today's Specimen Queue
            </h2>
          </div>

          <span className="hidden sm:inline-block font-mono text-xs text-neutral-500 whitespace-nowrap">
            DETERMINISTIC DROP #{todayStr.replace(/-/g, '')}
          </span>
        </div>

        {/* 3 Challenges: Wide Editorial Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#292929] divide-y lg:divide-y-0 lg:divide-x divide-[#292929] bg-[#141414]">
          {challenges.map((ch, idx) => {
            const isCompleted = completedChallengeIds.includes(ch.id);
            return (
              <div
                key={ch.id}
                className="p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:bg-[#181818] transition-colors group relative min-w-0"
              >
                {/* Header info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs whitespace-nowrap">
                    <span className="text-[#D99535] font-bold">
                      0{idx + 1} // 03
                    </span>
                    <span className="px-2 py-0.5 border border-[#292929] text-[9px] uppercase tracking-wider text-neutral-400">
                      {ch.gameModeTitle}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#EDEDED] tracking-tight leading-snug group-hover:text-white transition-colors">
                    {ch.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#888888] font-sans leading-relaxed line-clamp-3">
                    {ch.question}
                  </p>
                </div>

                {/* Footer metadata & launch button */}
                <div className="space-y-4 pt-5 border-t border-[#1F1F1F]">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[9px] whitespace-nowrap">
                    {ch.skillTags.slice(0, 2).map((st) => (
                      <span key={st} className="px-2 py-0.5 border border-[#292929] text-neutral-400 uppercase">
                        {st}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 border border-[#292929] bg-[#141414] text-[#D99535] uppercase font-bold">
                      +{ch.xpReward} XP
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 whitespace-nowrap">
                      <IconTechnicalClock className="w-3.5 h-3.5 shrink-0" />
                      EST. 60 SEC
                    </span>

                    <button
                      onClick={() => {
                        sound.click();
                        setActiveChallengeIndex(idx);
                      }}
                      className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                        isCompleted
                          ? 'border border-[#292929] text-neutral-300 hover:text-white hover:border-neutral-500'
                          : 'bg-white text-black font-semibold hover:bg-neutral-200 border border-white'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <IconPrecisionCheck className="w-3.5 h-3.5 text-[#D99535] shrink-0" />
                          <span>REVIEWED</span>
                        </>
                      ) : (
                        <>
                          <span>INVESTIGATE</span>
                          <IconArrowRight className="w-3.5 h-3.5 shrink-0" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* C. Today's Design Discovery (Interactive Object / Movement Specimen) */}
      <DailyDiscoveryCard
        discovery={dailyDiscovery}
        onExploreMore={() => navigate('/learn')}
      />

      {/* D. Continue Learning (Active Tracks across Learn, Think, and Explore) */}
      <ContinueLearningSection state={state} />

      {/* E & F. Skill Development Telemetry & Lateral Horizons */}
      <SkillTelemetrySection
        expedition={state.expedition}
        onExploreDiscipline={() => navigate('/learn')}
      />

      {/* Editorial Companion & Philosophy Callout */}
      <section className="border border-[#292929] bg-[#111111] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6 min-w-0">
          <Mascot variant="front" size="md" animate alt="PERCEPT Mascot" className="shrink-0" />
          <div className="space-y-1.5 min-w-0">
            <span className="font-mono text-[10px] text-[#D99535] uppercase tracking-widest font-bold block whitespace-nowrap">
              THE OPTICAL TRAINING METHODOLOGY
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#EDEDED] tracking-tight">
              Intuition is accelerated pattern-matching.
            </h3>
            <p className="text-xs sm:text-sm text-[#888888] font-sans max-w-3xl leading-relaxed">
              Every day PERCEPT extracts three visual anomalies from typography, spatial topology, and global design history to cultivate your subconscious sensitivity to proportion, balance, and intentional defect.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onNavigateToProfile}
          icon={<IconArrowUpRight className="w-3.5 h-3.5" />}
          iconPosition="right"
          className="whitespace-nowrap shrink-0"
        >
          View Full Curriculum
        </Button>
      </section>

      {/* Re-edit Onboarding Modal */}
      {showEditOnboarding && (
        <OnboardingFlow
          initialProfile={profile}
          isEditing
          onCancel={() => setShowEditOnboarding(false)}
          onComplete={(updated) => {
            onUpdateProfile(updated);
            setShowEditOnboarding(false);
          }}
        />
      )}

    </div>
  );
};
