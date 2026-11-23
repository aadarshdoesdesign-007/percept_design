import React from 'react';
import { AptitudeUserProgress } from '../../types/aptitude';
import {
  IconSurveyMarker,
  IconPrecisionCheck,
  IconCadence,
  IconTechnicalClock,
  IconCoordinateDatum,
} from '../ui/icons';

interface AptitudeStatsOverviewProps {
  progress: AptitudeUserProgress;
}

export const AptitudeStatsOverview: React.FC<AptitudeStatsOverviewProps> = ({ progress }) => {
  const accuracy = progress.questionsAttempted > 0
    ? Math.round((progress.correctAnswers / progress.questionsAttempted) * 100)
    : 0;

  const avgTime = progress.questionsAttempted > 0
    ? Math.round(progress.totalTimeSpentSeconds / progress.questionsAttempted)
    : 0;

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-y border-[#292929] divide-y sm:divide-y-0 sm:divide-x divide-[#292929] bg-[#0E0E0E]">
      
      {/* 1. Questions Attempted */}
      <div className="p-6 flex flex-col justify-between space-y-2">
        <div className="flex items-center justify-between text-neutral-500 font-mono text-[10px] tracking-widest uppercase whitespace-nowrap">
          <span>ATTEMPTED</span>
          <IconSurveyMarker className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
        </div>
        <div className="flex items-baseline gap-2 whitespace-nowrap font-display font-bold text-3xl sm:text-4xl text-[#EDEDED]">
          <span>{progress.questionsAttempted}</span>
          <span className="text-sm font-mono font-normal text-neutral-500">SOLVED</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-500 whitespace-nowrap">
          {progress.correctAnswers} VERIFIED ACCURATE
        </span>
      </div>

      {/* 2. Overall Accuracy */}
      <div className="p-6 flex flex-col justify-between space-y-2">
        <div className="flex items-center justify-between text-neutral-500 font-mono text-[10px] tracking-widest uppercase whitespace-nowrap">
          <span>ACCURACY</span>
          <IconPrecisionCheck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
        </div>
        <div className="flex items-baseline gap-2 whitespace-nowrap font-display font-bold text-3xl sm:text-4xl text-[#EDEDED]">
          <span>{accuracy}%</span>
        </div>
        <div className="w-full bg-[#1C1C1C] h-1 border border-[#292929]">
          <div
            className="bg-white h-full transition-all duration-300"
            style={{ width: `${accuracy}%` }}
          />
        </div>
      </div>

      {/* 3. Aptitude Streak / Cadence */}
      <div className="p-6 flex flex-col justify-between space-y-2">
        <div className="flex items-center justify-between text-neutral-500 font-mono text-[10px] tracking-widest uppercase whitespace-nowrap">
          <span>APTITUDE CADENCE</span>
          <IconCadence className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
        </div>
        <div className="flex items-baseline gap-2 whitespace-nowrap font-display font-bold text-3xl sm:text-4xl text-[#EDEDED]">
          <span>{progress.streakDays}</span>
          <span className="text-sm font-mono font-normal text-neutral-500">DAYS</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-500 whitespace-nowrap">
          UNBROKEN LOGICAL CADENCE
        </span>
      </div>

      {/* 4. Average Solving Time */}
      <div className="p-6 flex flex-col justify-between space-y-2">
        <div className="flex items-center justify-between text-neutral-500 font-mono text-[10px] tracking-widest uppercase whitespace-nowrap">
          <span>AVG SPEED</span>
          <IconTechnicalClock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
        </div>
        <div className="flex items-baseline gap-2 whitespace-nowrap font-display font-bold text-3xl sm:text-4xl text-[#EDEDED]">
          <span>{avgTime}</span>
          <span className="text-sm font-mono font-normal text-neutral-500">SEC</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-500 whitespace-nowrap">
          TARGET: &lt;60S PER PROBLEM
        </span>
      </div>

      {/* 5. Dynamic Difficulty Level */}
      <div className="p-6 flex flex-col justify-between space-y-2 col-span-2 sm:col-span-1">
        <div className="flex items-center justify-between text-neutral-500 font-mono text-[10px] tracking-widest uppercase whitespace-nowrap">
          <span>CALIBRATION</span>
          <IconCoordinateDatum className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
        </div>
        <div className="flex items-baseline gap-2 whitespace-nowrap font-display font-bold text-2xl sm:text-3xl text-white uppercase">
          <span>{progress.currentDifficulty}</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-500 whitespace-nowrap">
          DYNAMIC TIERS ACTIVE
        </span>
      </div>

    </section>
  );
};
