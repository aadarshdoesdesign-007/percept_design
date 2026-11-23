import React, { useState } from 'react';
import { UserStats } from '../../types';
import { Card } from '../ui/Card';
import { MonoText } from '../ui/MonoText';
import { sound } from '../../utils/audio';
import {
  IconCadence,
  IconPrecisionCheck,
  IconCopySpecimen,
  IconVerificationSeal,
} from '../ui/icons';

interface StreakDisplayProps {
  stats: UserStats;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ stats }) => {
  const [copied, setCopied] = useState(false);

  const handleShareStreak = () => {
    sound.click();
    const text = `PERCEPT · CADENCE RECORD: ${stats.currentStreak} Days · Precision Index ${stats.overallAccuracy}%`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card variant="primary" className="p-6 sm:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
        
        {/* Left: Active Streak Headline */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-[#292929] bg-[#141414] flex items-center justify-center shrink-0">
            <IconCadence className="w-5 h-5 text-neutral-200" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
                CALIBRATION CADENCE
              </span>
              <span className="w-1.5 h-1.5 bg-[#D99535]" />
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#EDEDED] font-sans">
                {stats.currentStreak} Days
              </h2>
              <span className="font-mono text-xs text-[#888888]">
                ACTIVE RHYTHM
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Streak Actions & Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <MonoText size="xs" dimmed className="block">ACCURACY INDEX</MonoText>
            <span className="font-mono font-bold text-sm text-[#EDEDED]">
              {stats.overallAccuracy}% PRECISION
            </span>
          </div>

          <button
            onClick={handleShareStreak}
            className="px-4 py-2 bg-[#111111] border border-neutral-800 hover:border-neutral-600 text-[#EDEDED] font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            title="Copy streak record"
          >
            {copied ? (
              <>
                <IconPrecisionCheck className="w-3.5 h-3.5 text-[#D99535]" />
                <span className="text-[#D99535]">COPIED</span>
              </>
            ) : (
              <>
                <IconCopySpecimen className="w-3.5 h-3.5 text-neutral-400" />
                <span>SHARE RECORD</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* 7-Day Rhythm Cadence Tracker */}
      <div className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <IconCadence className="w-3.5 h-3.5 text-neutral-400" />
            <MonoText size="xs">7-DAY CADENCE MAP</MonoText>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
            <span>RECORD: {stats.highestStreak} DAYS</span>
            <span>·</span>
            <span>TOTAL: {stats.totalCalibrations} RUNS</span>
          </div>
        </div>

        {/* Day Pills Grid */}
        <div className="grid grid-cols-7 gap-2">
          {stats.weeklyHistory.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center p-3 border transition-all ${
                item.completed
                  ? 'bg-neutral-900 border-neutral-700 text-[#EDEDED]'
                  : 'bg-[#0a0a0a] border-neutral-800/80 text-neutral-600'
              }`}
            >
              <span className="font-mono text-xs font-bold mb-1">
                {item.day}
              </span>
              <div
                className={`w-2 h-2 flex items-center justify-center ${
                  item.completed
                    ? 'bg-white'
                    : 'bg-neutral-800'
                }`}
              />
              <span className="font-mono text-[9px] mt-1 text-neutral-500">
                {item.completed ? `${item.score}%` : '—'}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs font-mono text-neutral-500">
          <span className="flex items-center gap-1.5">
            <IconVerificationSeal className="w-3.5 h-3.5 text-neutral-400" />
            Cadence preserved · Next calibration reset at 00:00 UTC
          </span>
          <span className="text-[#888888]">1 DRILL RETAINS STREAK</span>
        </div>
      </div>
    </Card>
  );
};
