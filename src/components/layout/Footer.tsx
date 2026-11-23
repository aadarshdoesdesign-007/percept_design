import React from 'react';
import { Mascot } from '../mascot/Mascot';
import { getTodayDateString } from '../../utils/seed';

export const Footer: React.FC = () => {
  const todayStr = getTodayDateString();

  return (
    <footer className="w-full border-t border-[#292929] bg-[#0A0A0A] py-10 px-4 sm:px-8 lg:px-12 mt-auto">
      <div className="max-w-[1500px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Mascot & Brand Lock */}
        <div className="flex items-center gap-3 shrink-0">
          <Mascot variant="side" size="xs" alt="PERCEPT Mascot" />
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 whitespace-nowrap">
            <span className="font-bold text-[#EDEDED] font-display text-sm tracking-tight">PERCEPT</span>
            <span>·</span>
            <span className="uppercase tracking-widest text-[11px]">
              PRECISION OPTICAL ENGINE
            </span>
          </div>
        </div>

        {/* Center: System Architecture Statement */}
        <p className="font-mono text-xs text-neutral-500 text-center tracking-wider uppercase">
          Theory teaches rules · Percept trains muscle memory
        </p>

        {/* Right: Technical Metadata & Grid Lock */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-4 font-mono text-[10px] sm:text-[11px] text-neutral-500">
          <span>SEED: {todayStr}</span>
          <span>·</span>
          <span>8PT GRID LOCK</span>
          <span>·</span>
          <span className="text-emerald-400">PHASE 01 FOUNDATION</span>
        </div>

      </div>
    </footer>
  );
};
