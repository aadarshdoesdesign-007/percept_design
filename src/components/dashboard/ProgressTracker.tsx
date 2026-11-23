import React from 'react';
import { MonoText } from '../ui/MonoText';
import { IconSurveyMarker, IconTechnicalClock } from '../ui/icons';

interface ProgressTrackerProps {
  completedCount: number;
  totalCount: number;
  estimatedMinutes?: number;
  dateSeed: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  completedCount,
  totalCount,
  estimatedMinutes = 4,
  dateSeed,
}) => {
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="bg-[#141414] border border-neutral-800 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        
        {/* Left: Indicator title and status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-neutral-700 bg-white/5 flex items-center justify-center shrink-0">
            <IconSurveyMarker className="w-4 h-4 text-[#EDEDED]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs tracking-widest text-[#EDEDED] font-bold">
                0{completedCount} / 0{totalCount} DRILLS COMPLETED
              </span>
              <span className="font-mono text-[10px] text-neutral-500 uppercase">
                · {percentage}% CALIBRATED
              </span>
            </div>
            <p className="text-xs text-[#888888] font-sans">
              Daily drop seed: <code className="font-mono text-neutral-300">{dateSeed}</code>
            </p>
          </div>
        </div>

        {/* Right: Est time & mode */}
        <div className="flex items-center gap-4 text-xs font-mono text-[#888888]">
          <span className="flex items-center gap-1.5">
            <IconTechnicalClock className="w-3.5 h-3.5 text-neutral-500" />
            EST: {estimatedMinutes} MIN
          </span>
          <span className="hidden sm:inline-block">·</span>
          <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-400 border border-[#292929] px-2 py-0.5">
            PHASE 01 SPEC
          </span>
        </div>

      </div>

      {/* Hairline Minimal Progress Bar */}
      <div className="w-full bg-neutral-900 h-1.5 overflow-hidden border border-neutral-800">
        <div
          className="bg-white h-full transition-all duration-500 ease-out"
          style={{ width: `${Math.max(percentage, 4)}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-neutral-500">
        <MonoText size="xs" dimmed>DRILL 01: KERNING</MonoText>
        <MonoText size="xs" dimmed>DRILL 02: ROGUE MARGIN</MonoText>
        <MonoText size="xs" dimmed>DRILL 03: CEED CUBE</MonoText>
      </div>
    </div>
  );
};
