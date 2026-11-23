import React, { useState, useMemo } from 'react';
import { usePercept } from '../context/PerceptContext';
import { UserProfile } from '../types/game';
import { Button } from '../components/ui/Button';
import { Mascot } from '../components/mascot/Mascot';
import { OnboardingFlow } from '../components/onboarding/OnboardingFlow';
import { sound } from '../utils/audio';
import { useNavigate } from 'react-router-dom';
import {
  IconCadence,
  IconXP,
  IconCoordinateDatum,
  IconSurveyMarker,
  IconOpenBook,
  IconSpatialReasoning,
  IconViewfinder,
  IconMockExam,
  IconDesignerDossier,
  IconSpecimenSheets,
} from '../components/ui/icons';

interface ProfilePageProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

interface MilestoneItem {
  id: string;
  title: string;
  description: string;
  category: string;
  isUnlocked: boolean;
  progressText: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ profile, onUpdateProfile }) => {
  const { state } = usePercept();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'metrics' | 'collections' | 'milestones'>('metrics');
  const navigate = useNavigate();

  const aptitudeAccuracy =
    state.aptitude.questionsAttempted > 0
      ? Math.round((state.aptitude.correctAnswers / state.aptitude.questionsAttempted) * 100)
      : 0;

  // Real Milestones calculated from actual telemetry
  const milestones: MilestoneItem[] = useMemo(() => {
    const expeditionsCount = Object.keys(profile.history || {}).length;
    const questionsAttempted = state.aptitude.questionsAttempted;
    const journalCount = state.journal.entries.length;
    const archiveCount = state.archive.savedArticles.length + state.archive.bookmarkedDesigners.length;
    const mockExamsCount = state.aptitude.mockExamHistory.length;

    return [
      {
        id: 'm1',
        title: 'First Field Expedition',
        description: 'Complete your first daily visual expedition challenge set.',
        category: 'PLAY',
        isUnlocked: expeditionsCount >= 1,
        progressText: `${expeditionsCount} / 1 Completed`,
      },
      {
        id: 'm2',
        title: 'Cadence Keeper',
        description: 'Maintain a consecutive 3-day observational habit.',
        category: 'PLAY',
        isUnlocked: profile.highestStreak >= 3,
        progressText: `${profile.highestStreak} / 3 Day Streak`,
      },
      {
        id: 'm3',
        title: 'Aptitude Dedux',
        description: 'Solve 5 formal design aptitude questions.',
        category: 'THINK',
        isUnlocked: questionsAttempted >= 5,
        progressText: `${questionsAttempted} / 5 Questions`,
      },
      {
        id: 'm4',
        title: 'Field Naturalist',
        description: 'Record an intentional urban observation in your Visual Journal.',
        category: 'EXPLORE',
        isUnlocked: journalCount >= 1,
        progressText: `${journalCount} / 1 Logged`,
      },
      {
        id: 'm5',
        title: 'Archival Curator',
        description: 'Save 3 design discoveries or master monographs into your collection.',
        category: 'LEARN',
        isUnlocked: archiveCount >= 3,
        progressText: `${archiveCount} / 3 Collected`,
      },
      {
        id: 'm6',
        title: 'Exam Veteran',
        description: 'Complete a full timed CEED / UCEED mock simulation.',
        category: 'THINK',
        isUnlocked: mockExamsCount >= 1,
        progressText: `${mockExamsCount} / 1 Completed`,
      },
    ];
  }, [profile, state]);

  // Compute 7-day rolling cadence
  const weeklyCadence = useMemo(() => {
    const days: { label: string; dateStr: string; hasActivity: boolean }[] = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 2);

      const hasExpedition = profile.history && !!profile.history[dateStr];
      const isToday = i === 0;

      days.push({
        label: dayLabel,
        dateStr,
        hasActivity: hasExpedition || (isToday && profile.currentStreak > 0),
      });
    }

    return days;
  }, [profile]);

  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-12 animate-fadeIn">
      {/* Profile Header Masthead */}
      <section className="border-b border-[#292929] pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6 min-w-0">
            {/* Mascot */}
            <div className="w-20 h-20 bg-[#141414] border border-[#292929] flex items-center justify-center shrink-0">
              <Mascot variant="front" size="md" />
            </div>

            {/* Designer Details */}
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-0.5 bg-white text-black font-bold uppercase tracking-widest text-[10px] shrink-0">
                  {profile.experienceLevel.toUpperCase()} LEVEL
                </span>
                <span className="px-2.5 py-0.5 border border-[#292929] text-[#D99535] uppercase text-[10px] shrink-0 font-bold">
                  {profile.adaptiveRating} ELO RATING
                </span>
                <span className="px-2 py-0.5 border border-[#292929] text-neutral-400 font-mono text-[10px] shrink-0">
                  MEMBER SINCE {state.profile.registeredDate}
                </span>
              </div>

              <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#EDEDED] tracking-tight">
                {profile.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#888888] font-sans">
                Disciplines: <strong className="text-neutral-300">{profile.disciplines.join(' · ')}</strong>
              </p>
            </div>
          </div>

          {/* Edit Profile Action */}
          <div className="shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                sound.click();
                setIsEditing(true);
              }}
              icon={<IconDesignerDossier className="w-3.5 h-3.5" />}
              className="min-h-[44px]"
            >
              Edit Profile Calibration
            </Button>
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
          <span className="text-[10px] font-mono text-neutral-500">
            RECORD: {profile.highestStreak} DAYS
          </span>
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
          <span className="text-[10px] font-mono text-neutral-500">
            ACCUMULATED REWARD
          </span>
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
          <span className="text-[10px] font-mono text-neutral-500">
            DYNAMIC OPTICAL RATING
          </span>
        </div>

        {/* 4. Optical Goals */}
        <div className="p-4 sm:p-6 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-neutral-500 font-mono text-[10px] tracking-widest uppercase">
            <span>OPTICAL GOALS</span>
            <IconSurveyMarker className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          </div>
          <div className="flex items-baseline gap-2 font-display font-bold text-2xl sm:text-4xl text-[#EDEDED]">
            <span>{profile.goals.length}</span>
            <span className="text-xs sm:text-sm font-mono font-normal text-neutral-500">TARGETS</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-500">
            ACTIVE COMPETENCIES
          </span>
        </div>
      </section>

      {/* Rolling Weekly Cadence Card */}
      <section className="border border-[#292929] bg-[#111111] p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#292929]">
          <div className="flex items-center gap-2 font-mono text-xs">
            <IconCadence className="w-4 h-4 text-[#D99535]" />
            <span className="text-white font-bold uppercase tracking-wider">
              7-DAY OBSERVATION RHYTHM & STREAK INTEGRITY
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-500">
            DETERMINISTIC HISTORICAL AUDIT
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-4 pt-2">
          {weeklyCadence.map((day, idx) => (
            <div
              key={idx}
              className={`p-3 sm:p-4 border text-center space-y-2 transition-colors ${
                day.hasActivity
                  ? 'border-[#D99535]/50 bg-[#1A160E]'
                  : 'border-[#292929] bg-[#141414]'
              }`}
            >
              <span className="font-mono text-[10px] text-neutral-500 block uppercase">
                {day.label}
              </span>
              <div
                className={`w-6 h-6 mx-auto flex items-center justify-center font-mono text-xs font-bold ${
                  day.hasActivity ? 'text-[#D99535]' : 'text-neutral-600'
                }`}
              >
                {day.hasActivity ? '✓' : '—'}
              </div>
              <span className="font-mono text-[8px] text-neutral-500 block truncate">
                {day.dateStr.slice(5)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Profile Section Tabs */}
      <div className="flex border-b border-[#292929] font-mono text-xs">
        <button
          onClick={() => {
            sound.click();
            setActiveTab('metrics');
          }}
          className={`px-6 py-3 border-b-2 uppercase tracking-wider transition-colors cursor-pointer min-h-[48px] ${
            activeTab === 'metrics'
              ? 'border-white text-white font-bold bg-[#141414]'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Pillars & Telemetry
        </button>

        <button
          onClick={() => {
            sound.click();
            setActiveTab('milestones');
          }}
          className={`px-6 py-3 border-b-2 uppercase tracking-wider transition-colors cursor-pointer min-h-[48px] ${
            activeTab === 'milestones'
              ? 'border-white text-white font-bold bg-[#141414]'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Milestones & Competencies ({milestones.filter((m) => m.isUnlocked).length}/{milestones.length})
        </button>

        <button
          onClick={() => {
            sound.click();
            setActiveTab('collections');
          }}
          className={`px-6 py-3 border-b-2 uppercase tracking-wider transition-colors cursor-pointer min-h-[48px] ${
            activeTab === 'collections'
              ? 'border-white text-white font-bold bg-[#141414]'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Curated Archive ({state.archive.bookmarkedDesigners.length + state.archive.savedArticles.length})
        </button>
      </div>

      {activeTab === 'metrics' && (
        <div className="space-y-12">
          {/* Four-Pillar Analytical Separation Ribbon */}
          <section className="space-y-6">
            <div className="flex items-end justify-between border-b border-[#292929] pb-4">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block mb-1 whitespace-nowrap">
                  SECTION 02 · DISCRETE SUBSYSTEM TELEMETRY
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#EDEDED] tracking-tight">
                  Four-Pillar Performance Record
                </h2>
              </div>
              <span className="font-mono text-xs text-neutral-500 whitespace-nowrap">
                ANALYTICALLY ISOLATED DATA
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#292929] divide-y sm:divide-y-0 sm:divide-x divide-[#292929] bg-[#141414]">
              {/* Pillar 01: Learn */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#D99535] font-bold">01 · LEARN</span>
                  <IconOpenBook className="w-4 h-4 text-neutral-400" />
                </div>
                <div>
                  <span className="font-display font-bold text-2xl text-white block">
                    {state.archive.savedArticles.length + state.archive.bookmarkedDesigners.length} Items
                  </span>
                  <span className="text-xs text-neutral-400 font-sans">
                    {state.archive.savedArticles.length} saved articles · {state.archive.bookmarkedDesigners.length} bookmarked masters
                  </span>
                </div>
                <div className="text-[10px] font-mono text-neutral-500">
                  EXPLORED: {state.archive.exploredMovements.length} MOVEMENTS
                </div>
              </div>

              {/* Pillar 02: Play */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-white font-bold">02 · PLAY</span>
                  <IconCadence className="w-4 h-4 text-neutral-400" />
                </div>
                <div>
                  <span className="font-display font-bold text-2xl text-white block">
                    {profile.currentStreak} Day Streak
                  </span>
                  <span className="text-xs text-neutral-400 font-sans">
                    {profile.totalXp} XP accumulated · Rating: {profile.adaptiveRating}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-neutral-500">
                  EXPEDITIONS LOGGED: {Object.keys(profile.history || {}).length}
                </div>
              </div>

              {/* Pillar 03: Think */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-neutral-200 font-bold">03 · THINK</span>
                  <IconSpatialReasoning className="w-4 h-4 text-neutral-400" />
                </div>
                <div>
                  <span className="font-display font-bold text-2xl text-white block">
                    {aptitudeAccuracy}% Accuracy
                  </span>
                  <span className="text-xs text-neutral-400 font-sans">
                    {state.aptitude.correctAnswers} of {state.aptitude.questionsAttempted} questions solved
                  </span>
                </div>
                <div className="text-[10px] font-mono text-neutral-500">
                  MOCK EXAMS: {state.aptitude.mockExamHistory.length}
                </div>
              </div>

              {/* Pillar 04: Explore */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-neutral-300 font-bold">04 · EXPLORE</span>
                  <IconViewfinder className="w-4 h-4 text-neutral-400" />
                </div>
                <div>
                  <span className="font-display font-bold text-2xl text-white block">
                    {state.journal.entries.length} Entries
                  </span>
                  <span className="text-xs text-neutral-400 font-sans">
                    {state.journal.completedMissions.length} missions completed
                  </span>
                </div>
                <div className="text-[10px] font-mono text-neutral-500">
                  OBSERVATION LAB ACTIVE
                </div>
              </div>
            </div>
          </section>

          {/* Skill-Specific Optical Accuracy */}
          <section className="space-y-6">
            <div className="flex items-end justify-between border-b border-[#292929] pb-4">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block mb-1 whitespace-nowrap">
                  SECTION 03 · OPTICAL DISCRIMINATION
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#EDEDED] tracking-tight">
                  Skill-Specific Optical Accuracy
                </h2>
              </div>
              <span className="font-mono text-xs text-neutral-500 whitespace-nowrap">
                ADAPTIVE PERFORMANCE MATRIX
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#292929] divide-y sm:divide-y-0 sm:divide-x divide-[#292929] bg-[#141414]">
              {Object.entries(profile.skillAccuracy || {}).map(([skill, stat]) => {
                const accuracy = Math.round((stat.correct / Math.max(1, stat.total)) * 100);
                return (
                  <div key={skill} className="p-6 space-y-4 min-w-0">
                    <div className="flex items-center justify-between font-mono text-xs whitespace-nowrap">
                      <span className="uppercase text-neutral-200 font-bold">{skill}</span>
                      <span className="text-emerald-400 font-bold">{accuracy}%</span>
                    </div>

                    <div className="w-full bg-[#0A0A0A] h-1 border border-[#292929]">
                      <div
                        className="bg-white h-full transition-all duration-300"
                        style={{ width: `${accuracy}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[10px] font-mono text-neutral-500 whitespace-nowrap">
                      <span>{stat.correct} SOLVED ACCURATELY</span>
                      <span>{stat.total} RUNS RECORDED</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Authentic Mock Examination & Aptitude History */}
          <section className="border border-[#292929] bg-[#111111] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#292929]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <IconMockExam className="w-4 h-4 text-[#D99535]" />
                  <h2 className="font-display font-bold text-xl text-[#EDEDED] tracking-tight">
                    Authentic Assessment Records
                  </h2>
                </div>
                <p className="text-xs text-neutral-500 font-mono">
                  [VERIFIED EXAMINATION TELEMETRY · CEED / UCEED / NID]
                </p>
              </div>

              <span className="font-mono text-xs text-neutral-400 whitespace-nowrap">
                TOTAL EXAMS: {state.aptitude.mockExamHistory.length}
              </span>
            </div>

            {state.aptitude.mockExamHistory.length === 0 ? (
              <div className="py-8 text-center space-y-3">
                <p className="text-xs text-neutral-400 font-sans max-w-md mx-auto leading-relaxed">
                  No mock examination records logged yet. Complete a timed CEED or UCEED simulation in the Aptitude Lab to build your verified score trajectory.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    sound.click();
                    navigate('/think');
                  }}
                >
                  Go to Aptitude Lab →
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#292929] text-neutral-500 text-[10px] uppercase tracking-wider whitespace-nowrap">
                      <th className="pb-3 font-normal">DATE</th>
                      <th className="pb-3 font-normal">EXAM TITLE</th>
                      <th className="pb-3 font-normal text-right">SCORE</th>
                      <th className="pb-3 font-normal text-right">ACCURACY</th>
                      <th className="pb-3 font-normal text-right">TIME</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1C1C]">
                    {state.aptitude.mockExamHistory.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#141414] transition-colors whitespace-nowrap">
                        <td className="py-3 text-neutral-500">{item.date}</td>
                        <td className="py-3 text-white font-bold">{item.examName}</td>
                        <td className="py-3 text-right text-neutral-300">
                          {item.score} / {item.total}
                        </td>
                        <td className="py-3 text-right text-emerald-400">{item.accuracy}%</td>
                        <td className="py-3 text-right text-neutral-400">{Math.round(item.timeSeconds / 60)}m</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      )}

      {activeTab === 'milestones' && (
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-[#292929] pb-4">
            <div>
              <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block mb-1">
                COMPETENCY MASTERY · AUTHENTIC THRESHOLDS
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#EDEDED] tracking-tight">
                Verified Design Milestones
              </h2>
            </div>
            <span className="font-mono text-xs text-neutral-400">
              ZERO FABRICATED BADGES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((m) => (
              <div
                key={m.id}
                className={`p-6 border flex flex-col justify-between space-y-4 transition-all ${
                  m.isUnlocked
                    ? 'border-[#D99535]/60 bg-[#161208]'
                    : 'border-[#292929] bg-[#141414] opacity-65'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#D99535] font-bold">[{m.category}]</span>
                    <span
                      className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider font-bold ${
                        m.isUnlocked
                          ? 'bg-[#D99535] text-black border-[#D99535]'
                          : 'border-[#292929] text-neutral-500'
                      }`}
                    >
                      {m.isUnlocked ? 'UNLOCKED ✓' : 'LOCKED'}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white">
                    {m.title}
                  </h3>

                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#292929] flex items-center justify-between font-mono text-[10px] text-neutral-500">
                  <span>PROGRESS</span>
                  <span className="text-white font-bold">{m.progressText}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'collections' && (
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-[#292929] pb-4">
            <div>
              <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block mb-1">
                PERSONAL MONOGRAPHS & DISCOVERIES
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#EDEDED] tracking-tight">
                Curated Design Collection
              </h2>
            </div>
            <span className="font-mono text-xs text-neutral-400">
              SAVED SPECIMENS & MASTERS
            </span>
          </div>

          {state.archive.bookmarkedDesigners.length === 0 && state.archive.savedArticles.length === 0 ? (
            <div className="border border-[#292929] bg-[#111111] p-12 text-center space-y-4">
              <IconSpecimenSheets className="w-8 h-8 text-neutral-500 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-display font-bold text-xl text-white">Your Archival Collection is Empty</h3>
                <p className="text-xs text-neutral-400 font-sans max-w-md mx-auto">
                  Bookmark designers in the Design Archive or save daily discoveries to curate your personal reference library.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/learn')}
              >
                Browse Design Archive →
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Bookmarked Designers */}
              {state.archive.bookmarkedDesigners.length > 0 && (
                <div className="space-y-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#D99535] font-bold block">
                    BOOKMARKED MASTERS ({state.archive.bookmarkedDesigners.length})
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {state.archive.bookmarkedDesigners.map((designer) => (
                      <div key={designer.id} className="p-5 bg-[#141414] border border-[#292929] space-y-2">
                        <span className="font-mono text-[10px] text-neutral-500 uppercase">
                          {designer.movement} · {designer.era}
                        </span>
                        <h4 className="font-display font-bold text-xl text-white">
                          {designer.name}
                        </h4>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {designer.disciplines.map((d, i) => (
                            <span key={i} className="px-2 py-0.5 bg-[#1F1F1F] font-mono text-[10px] text-neutral-400">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Articles / Specimen IDs */}
              {state.archive.savedArticles.length > 0 && (
                <div className="space-y-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#D99535] font-bold block">
                    SAVED SPECIMENS & DISCOVERIES ({state.archive.savedArticles.length})
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {state.archive.savedArticles.map((id) => (
                      <div key={id} className="p-4 bg-[#141414] border border-[#292929] space-y-1">
                        <span className="font-mono text-[9px] text-[#D99535] uppercase font-bold">
                          SPECIMEN REF
                        </span>
                        <h4 className="font-mono font-bold text-sm text-white uppercase">{id}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Re-edit Onboarding Modal */}
      {isEditing && (
        <OnboardingFlow
          initialProfile={profile}
          isEditing
          onCancel={() => setIsEditing(false)}
          onComplete={(updated) => {
            onUpdateProfile(updated);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};
