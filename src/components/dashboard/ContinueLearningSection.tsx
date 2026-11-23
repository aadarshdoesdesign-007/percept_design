import React from 'react';
import { PerceptUnifiedState } from '../../types/percept';
import { useNavigate } from 'react-router-dom';
import { sound } from '../../utils/audio';
import {
  IconOpenBook,
  IconSpatialReasoning,
  IconViewfinder,
  IconArrowRight,
} from '../ui/icons';

interface ContinueLearningSectionProps {
  state: PerceptUnifiedState;
}

export const ContinueLearningSection: React.FC<ContinueLearningSectionProps> = ({ state }) => {
  const navigate = useNavigate();

  // Find recent activity hooks
  const completedMissionsCount = state.journal.completedMissions.length;
  const journalEntriesCount = state.journal.entries.length;
  const attemptedAptitudeCount = state.aptitude.questionsAttempted;
  const accuracyAptitude = attemptedAptitudeCount > 0
    ? Math.round((state.aptitude.correctAnswers / attemptedAptitudeCount) * 100)
    : 0;

  const handleNavigate = (path: string) => {
    sound.click();
    navigate(path);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between border-b border-[#292929] pb-4">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block mb-1">
            CONTINUOUS PRACTICE · ACTIVE TRACKS
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#EDEDED] tracking-tight">
            Continue Learning
          </h2>
        </div>
        <span className="hidden sm:inline-block font-mono text-xs text-neutral-500">
          LEARNER STATE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#292929] divide-y md:divide-y-0 md:divide-x divide-[#292929] bg-[#141414]">
        
        {/* Track 1: Design Archive */}
        <div
          onClick={() => handleNavigate('/learn')}
          className="p-6 flex flex-col justify-between space-y-6 hover:bg-[#181818] transition-colors cursor-pointer group"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#D99535] font-bold">PILLAR 01</span>
              <span className="px-2 py-0.5 border border-[#292929] text-[9px] uppercase tracking-wider text-neutral-400">
                14 MOVEMENTS
              </span>
            </div>

            <div className="flex items-center gap-2">
              <IconOpenBook className="w-4 h-4 text-[#D99535]" />
              <h3 className="font-display font-bold text-xl text-[#EDEDED] group-hover:text-white transition-colors">
                The Design Archive
              </h3>
            </div>

            <p className="text-xs text-[#888888] font-sans leading-relaxed">
              Explore foundational trajectories from Swiss International Style and Bauhaus to Braun functionalism and post-modern rebellion.
            </p>
          </div>

          <div className="pt-4 border-t border-[#1F1F1F] flex items-center justify-between font-mono text-xs">
            <span className="text-[10px] text-neutral-500 uppercase">
              {state.archive.bookmarkedDesigners.length} SAVED PROFILES
            </span>
            <span className="text-white group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Resume <IconArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Track 2: Aptitude Lab */}
        <div
          onClick={() => handleNavigate('/think')}
          className="p-6 flex flex-col justify-between space-y-6 hover:bg-[#181818] transition-colors cursor-pointer group"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#D99535] font-bold">PILLAR 03</span>
              <span className="px-2 py-0.5 border border-[#292929] text-[9px] uppercase tracking-wider text-neutral-400">
                {accuracyAptitude}% ACCURACY
              </span>
            </div>

            <div className="flex items-center gap-2">
              <IconSpatialReasoning className="w-4 h-4 text-[#D99535]" />
              <h3 className="font-display font-bold text-xl text-[#EDEDED] group-hover:text-white transition-colors">
                Aptitude Lab
              </h3>
            </div>

            <p className="text-xs text-[#888888] font-sans leading-relaxed">
              Drill visual, spatial, and deductive reasoning problems calibrated to competitive entrance standards (CEED/UCEED).
            </p>
          </div>

          <div className="pt-4 border-t border-[#1F1F1F] flex items-center justify-between font-mono text-xs">
            <span className="text-[10px] text-neutral-500 uppercase">
              {attemptedAptitudeCount} SOLVED · {state.aptitude.streakDays}D CADENCE
            </span>
            <span className="text-white group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Practice <IconArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Track 3: Look Again */}
        <div
          onClick={() => handleNavigate('/explore')}
          className="p-6 flex flex-col justify-between space-y-6 hover:bg-[#181818] transition-colors cursor-pointer group"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#D99535] font-bold">PILLAR 04</span>
              <span className="px-2 py-0.5 border border-[#292929] text-[9px] uppercase tracking-wider text-neutral-400">
                FIELD RESEARCH
              </span>
            </div>

            <div className="flex items-center gap-2">
              <IconViewfinder className="w-4 h-4 text-[#D99535]" />
              <h3 className="font-display font-bold text-xl text-[#EDEDED] group-hover:text-white transition-colors">
                Look Again
              </h3>
            </div>

            <p className="text-xs text-[#888888] font-sans leading-relaxed">
              Train your observational eye in the physical world: document desire paths, accidental baselines, and unintended affordances.
            </p>
          </div>

          <div className="pt-4 border-t border-[#1F1F1F] flex items-center justify-between font-mono text-xs">
            <span className="text-[10px] text-neutral-500 uppercase">
              {completedMissionsCount} MISSIONS · {journalEntriesCount} ENTRIES
            </span>
            <span className="text-white group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Observe <IconArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
