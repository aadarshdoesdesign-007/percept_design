import React, { useState } from 'react';
import { UserProfile } from '../../types/game';
import { Button } from '../ui/Button';
import { Mascot } from '../mascot/Mascot';
import { sound } from '../../utils/audio';
import {
  IconCadence,
  IconCopySpecimen,
  IconPrecisionCheck,
  IconRecalibrate,
  IconArrowRight,
} from '../ui/icons';

interface DailyCompletionCardProps {
  profile: UserProfile;
  totalEarnedXp: number;
  accuracyPercent: number;
  onRestart: () => void;
  onOpenProfile: () => void;
}

export const DailyCompletionCard: React.FC<DailyCompletionCardProps> = ({
  profile,
  totalEarnedXp,
  accuracyPercent,
  onRestart,
  onOpenProfile,
}) => {
  const [copied, setCopied] = useState(false);
  const todayStr = new Date().toISOString().slice(0, 10);

  const handleCopySpecimen = () => {
    sound.click();
    const specimenText = `PERCEPT · PROOF OF EYE SPECIMEN RECORD\nIssue Date: ${todayStr}\nOptical Accuracy: ${accuracyPercent}%\nXP Earned: +${totalEarnedXp} XP\nActive Cadence: ${profile.currentStreak} Days\nCurated Disciplines: ${profile.disciplines.join(', ')}\nAdaptive Rating: ${profile.adaptiveRating} ELO`;
    navigator.clipboard.writeText(specimenText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Printed Editorial Specimen Sheet */}
      <div className="bg-[#141414] border border-[#292929] p-8 sm:p-14 relative overflow-hidden">
        
        {/* Top Header & Archival Numbering */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#292929]">
          <div>
            <span className="font-mono text-[10px] text-[#D99535] uppercase tracking-widest font-bold block mb-1">
              PERCEPT ARCHIVAL RECORD // ISSUE #{todayStr.replace(/-/g, '')}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#EDEDED] tracking-tight">
              Proof of Eye · Daily Certification
            </h2>
          </div>

          <div className="font-mono text-xs text-neutral-500 shrink-0">
            RECORD TIMESTAMP: {todayStr}
          </div>
        </div>

        {/* Central Archival Composition: Mascot + Typography */}
        <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-10 border-b border-[#292929]">
          <div className="w-48 h-48 shrink-0 select-none">
            <Mascot variant="front" size="lg" animate alt="PERCEPT Official Companion" />
          </div>

          <div className="flex-1 space-y-3 text-center md:text-left">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block">
              EXPEDITION ACCURACY BENCHMARK
            </span>
            <div className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-tight leading-none">
              {accuracyPercent}%
            </div>
            <p className="text-xs sm:text-sm text-[#888888] font-sans leading-relaxed pt-2">
              All 3 investigations completed for today's cadence. Your subconscious visual discrimination across typography, architectural vernaculars, and spatial geometry has been recorded into your designer dossier.
            </p>
          </div>
        </div>

        {/* Four-Column Archival Metadata Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#292929] border-b border-[#292929] py-6">
          <div className="p-3 sm:p-4 text-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 block mb-1">
              ACCUMULATED REWARD
            </span>
            <span className="font-display font-bold text-2xl text-white">
              +{totalEarnedXp} XP
            </span>
          </div>

          <div className="p-3 sm:p-4 text-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 block mb-1">
              ACTIVE CADENCE
            </span>
            <span className="font-display font-bold text-2xl text-white flex items-center justify-center gap-1.5">
              <IconCadence className="w-4 h-4 text-neutral-400" />
              {profile.currentStreak} DAYS
            </span>
          </div>

          <div className="p-3 sm:p-4 text-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 block mb-1">
              DYNAMIC EYE RATING
            </span>
            <span className="font-display font-bold text-2xl text-white">
              {profile.adaptiveRating}
            </span>
          </div>

          <div className="p-3 sm:p-4 text-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 block mb-1">
              LEVEL CALIBRATION
            </span>
            <span className="font-display font-bold text-lg text-white uppercase">
              {profile.experienceLevel}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleCopySpecimen}
            className="w-full sm:w-auto px-5 py-2.5 border border-[#292929] hover:border-neutral-500 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <IconPrecisionCheck className="w-3.5 h-3.5 text-[#D99535]" />
                <span className="text-[#D99535]">COPIED TO CLIPBOARD</span>
              </>
            ) : (
              <>
                <IconCopySpecimen className="w-3.5 h-3.5 text-neutral-400" />
                <span>COPY SPECIMEN DOSSIER</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={onRestart}
              icon={<IconRecalibrate className="w-3.5 h-3.5" />}
            >
              Re-Examine
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={onOpenProfile}
              icon={<IconArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Open Designer Profile
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
};
