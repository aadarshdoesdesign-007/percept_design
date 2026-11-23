import React from 'react';
import { AptitudeDiagram } from '../../types/aptitude';

interface AptitudeDiagramRendererProps {
  diagram: AptitudeDiagram;
}

export const AptitudeDiagramRenderer: React.FC<AptitudeDiagramRendererProps> = ({ diagram }) => {
  return (
    <div className="w-full bg-[#0E0E0E] border border-[#292929] p-6 flex flex-col items-center justify-center select-none">
      
      {/* 1. Cube Net Diagram */}
      {diagram.type === 'svg-cube-net' && (
        <div className="flex flex-col items-center py-4">
          <div className="grid grid-cols-3 gap-1">
            <div />
            <div className="w-12 h-12 bg-[#141414] border border-[#292929] flex items-center justify-center font-mono font-bold text-white text-sm">
              1
            </div>
            <div />

            <div className="w-12 h-12 bg-[#1f190e] border border-[#D99535] flex items-center justify-center font-mono font-bold text-[#D99535] text-sm">
              L
            </div>
            <div className="w-12 h-12 bg-white text-black font-mono font-bold flex items-center justify-center text-sm">
              2
            </div>
            <div className="w-12 h-12 bg-[#1f190e] border border-[#D99535] flex items-center justify-center font-mono font-bold text-[#D99535] text-sm">
              R
            </div>

            <div />
            <div className="w-12 h-12 bg-[#141414] border border-[#292929] flex items-center justify-center font-mono font-bold text-white text-sm">
              3
            </div>
            <div />

            <div />
            <div className="w-12 h-12 bg-[#141414] border border-[#292929] flex items-center justify-center font-mono font-bold text-white text-sm">
              4
            </div>
            <div />
          </div>
          <span className="font-mono text-[10px] text-neutral-500 mt-4 tracking-widest uppercase">
            LATIN CROSS CUBE NET · FACES: [1], [2], [3], [4], [L], [R]
          </span>
        </div>
      )}

      {/* 2. Rotational Series Sequence */}
      {diagram.type === 'svg-series' && (
        <div className="w-full max-w-lg py-4 space-y-4">
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((step) => {
              const angles = [0, 45, 90, 135];
              const isEven = step % 2 === 1;
              return (
                <div key={step} className="p-3 bg-[#141414] border border-[#292929] flex flex-col items-center">
                  <span className="font-mono text-[9px] text-neutral-500 mb-2">STEP 0{step + 1}</span>
                  <div className="w-16 h-16 bg-[#0A0A0A] border border-[#292929] relative flex items-center justify-center">
                    {/* Rotating Arrow */}
                    <div
                      className="w-8 h-0.5 bg-white relative transition-transform"
                      style={{ transform: `rotate(${angles[step]}deg)` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-6 border-l-white" />
                    </div>
                    {/* Alternating Dot */}
                    <div
                      className={`absolute w-2 h-2 rounded-full bg-[#D99535] ${
                        isEven ? 'bottom-1 left-1' : 'top-1 right-1'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
            STEP 01 (0° + TR) → STEP 02 (45° + BL) → STEP 03 (90° + TR) → STEP 04 (135° + BL) → [STEP 05 ?]
          </div>
        </div>
      )}

      {/* 3. Chiral Pattern Rotation vs Reflection */}
      {diagram.type === 'svg-pattern' && (
        <div className="w-full max-w-lg py-4">
          <div className="grid grid-cols-4 gap-3">
            {['A', 'B', 'C', 'D'].map((lbl, idx) => (
              <div key={lbl} className="p-3 bg-[#141414] border border-[#292929] flex flex-col items-center">
                <span className="font-mono text-[10px] text-neutral-500 mb-2 font-bold">[{lbl}]</span>
                <div className="w-16 h-16 bg-[#0A0A0A] border border-[#292929] flex items-center justify-center font-display font-black text-2xl text-white">
                  <span
                    style={{
                      transform:
                        idx === 0
                          ? 'rotate(90deg)'
                          : idx === 1
                          ? 'rotate(180deg)'
                          : idx === 2
                          ? 'scaleX(-1)' // Mirror reflection!
                          : 'rotate(270deg)',
                    }}
                  >
                    F
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Caption footer */}
      {diagram.caption && (
        <div className="mt-4 pt-3 border-t border-[#1C1C1C] text-center font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
          {diagram.caption}
        </div>
      )}

    </div>
  );
};
