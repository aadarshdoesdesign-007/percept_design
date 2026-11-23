import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { IconCoordinateMarker, IconDiscovery } from '../ui/icons';

interface GeoGuessrCluesProps {
  clues?: string[];
}

export const GeoGuessrClues: React.FC<GeoGuessrCluesProps> = ({ clues = [] }) => {
  const [revealedCount, setRevealedCount] = useState(1);

  if (!clues || clues.length === 0) return null;

  const handleRevealNext = () => {
    sound.click();
    setRevealedCount((prev) => Math.min(clues.length, prev + 1));
  };

  return (
    <div className="bg-[#141414] border border-neutral-800 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconCoordinateMarker className="w-4 h-4 text-[#D99535]" />
          <span className="font-mono text-xs font-bold text-[#EDEDED] uppercase tracking-wider">
            PROGRESSIVE FIELD CLUES ({revealedCount} OF {clues.length} UNLOCKED)
          </span>
        </div>

        {revealedCount < clues.length && (
          <button
            onClick={handleRevealNext}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#1e1e1e] hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <IconDiscovery className="w-3.5 h-3.5 text-[#D99535]" />
            <span>Unlock Next Clue (+0 XP penalty)</span>
          </button>
        )}
      </div>

      <div className="space-y-2">
        {clues.slice(0, revealedCount).map((clue, idx) => (
          <div
            key={idx}
            className="p-3 bg-[#0A0A0A] border border-neutral-800/80 text-xs text-[#EDEDED] font-sans flex items-start gap-2.5 animate-fadeIn"
          >
            <span className="font-mono text-[10px] text-[#D99535] font-bold shrink-0 mt-0.5">
              [CLUE 0{idx + 1}]
            </span>
            <p className="leading-relaxed">{clue}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
