import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { sound } from '../../../utils/audio';
import {
  IconPrecisionCheck,
  IconArrowRight,
  IconSpatialReasoning,
} from '../../ui/icons';

interface InteractiveSpatialCubeGameProps {
  onComplete: (isCorrect: boolean, earnedXp: number, score: number) => void;
}

export const InteractiveSpatialCubeGame: React.FC<InteractiveSpatialCubeGameProps> = ({ onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<'all' | 'top' | 'mid' | 'bot'>('all');
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const OPTIONS = [
    { id: 'A', value: '8', desc: 'Corner cubes (3 painted faces)' },
    { id: 'B', value: '12', desc: 'Edge midpoints (2 painted faces)', isCorrect: true },
    { id: 'C', value: '6', desc: 'Face centers (1 painted face)' },
    { id: 'D', value: '1', desc: 'Internal core (0 painted faces)' },
  ];

  const handleSelectOption = (id: string) => {
    if (isVerified) return;
    sound.click();
    setSelectedAnswer(id);
  };

  const handleVerify = () => {
    if (!selectedAnswer || isVerified) return;
    sound.success();
    setIsVerified(true);
  };

  const handleProceed = () => {
    sound.click();
    const correct = selectedAnswer === 'B';
    const xp = correct ? 90 : 35;
    onComplete(correct, xp, correct ? 100 : 40);
  };

  return (
    <div className="w-full bg-[#141414] border border-[#292929] p-6 sm:p-10 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#292929]">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 bg-white text-black font-bold uppercase tracking-widest text-[10px]">
              LAB 03 · SPATIAL LAB
            </span>
            <span className="px-2 py-0.5 border border-[#292929] text-neutral-400 uppercase text-[10px]">
              TOPOLOGY & AXONOMETRIC SLICING
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight">
            3D Cube Volumetric Sectioning
          </h2>
        </div>
        <div className="font-mono text-xs text-neutral-400 shrink-0">
          SPATIAL DEDUCTION BENCHMARK
        </div>
      </div>

      <p className="text-xs sm:text-sm text-[#888888] font-sans leading-relaxed max-w-3xl">
        A 3×3×3 solid wooden cube is painted completely black on all 6 outer faces. It is subsequently cut along internal planes into 27 identical 1×1×1 unit cubes. How many small cubes possess <strong className="text-white">EXACTLY TWO painted faces</strong>?
      </p>

      {/* Layer Slicing Controls */}
      <div className="flex items-center gap-2 font-mono text-xs">
        <span className="text-neutral-500 uppercase mr-2 flex items-center gap-1.5">
          <IconSpatialReasoning className="w-3.5 h-3.5 text-[#D99535]" />
          SECTION VIEW:
        </span>
        {(['all', 'top', 'mid', 'bot'] as const).map((l) => (
          <button
            key={l}
            onClick={() => {
              sound.click();
              setActiveLayer(l);
            }}
            className={`px-3 py-1 border uppercase text-[10px] tracking-wider transition-all cursor-pointer ${
              activeLayer === l
                ? 'bg-white text-black font-bold border-white'
                : 'bg-[#111111] border-[#292929] text-neutral-400 hover:text-white'
            }`}
          >
            {l === 'all' ? 'All 3 Layers' : `${l.toUpperCase()} Slice`}
          </button>
        ))}
      </div>

      {/* Interactive Cube Layer Visualization */}
      <div className="w-full py-12 px-6 bg-[#0A0A0A] border border-[#292929] flex flex-col items-center justify-center select-none">
        <div className="grid grid-cols-3 gap-2 p-4 bg-[#141414] border border-[#292929]">
          {[...Array(9)].map((_, i) => {
            const isCorner = [0, 2, 6, 8].includes(i);
            const isEdge = [1, 3, 5, 7].includes(i);

            let paintedCount = 0;
            if (activeLayer === 'all' || activeLayer === 'top' || activeLayer === 'bot') {
              paintedCount = isCorner ? 3 : isEdge ? 2 : 1;
            } else if (activeLayer === 'mid') {
              paintedCount = isCorner ? 2 : isEdge ? 1 : 0;
            }

            return (
              <div
                key={i}
                className={`w-16 h-16 border flex flex-col items-center justify-center font-mono transition-all ${
                  paintedCount === 2
                    ? 'bg-[#0f1f17] border-emerald-500 text-emerald-300'
                    : paintedCount === 3
                    ? 'bg-[#1f190e] border-[#D99535] text-[#D99535]'
                    : 'bg-[#0A0A0A] border-[#292929] text-neutral-500'
                }`}
              >
                <span className="text-[10px] uppercase font-bold">
                  {isCorner ? 'CNR' : isEdge ? 'EDGE' : 'CENTER'}
                </span>
                <span className="text-xs font-bold text-white">
                  {paintedCount}F
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-6 font-mono text-[11px] text-neutral-400">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#1f190e] border border-[#D99535]" />
            CORNER = 3 FACES (8 CUBES)
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#0f1f17] border border-emerald-500" />
            EDGE MIDPOINT = 2 FACES (12 CUBES)
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#0A0A0A] border border-[#292929]" />
            FACE CENTER = 1 FACE (6 CUBES)
          </span>
        </div>
      </div>

      {/* Selectable Deduction Options */}
      <div className="space-y-4">
        <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase block">
          SELECT THE COUNT OF CUBES WITH EXACTLY 2 PAINTED FACES:
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {OPTIONS.map((opt) => {
            const isSelected = selectedAnswer === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#181818] border-white text-white'
                    : 'bg-[#141414] border-[#292929] text-neutral-400 hover:border-neutral-500 hover:text-neutral-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-neutral-500">[{opt.id}]</span>
                    {isSelected && (
                      <div className="w-4 h-4 bg-white text-black flex items-center justify-center">
                        <IconPrecisionCheck className="w-3 h-3 text-black" />
                      </div>
                    )}
                  </div>
                  <div className="font-display font-bold text-3xl text-white mb-1">
                    {opt.value}
                  </div>
                  <p className="text-xs text-[#888888] font-sans">
                    {opt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verify / Proceed */}
      {!isVerified ? (
        <div className="flex justify-end pt-2">
          <Button
            variant="primary"
            size="lg"
            disabled={!selectedAnswer}
            onClick={handleVerify}
            icon={<IconArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Confirm Spatial Deduction
          </Button>
        </div>
      ) : (
        <div className="p-6 bg-[#0A0A0A] border border-[#292929] flex flex-col sm:flex-row items-center justify-between gap-6 animate-fadeIn">
          <div className="text-xs sm:text-sm text-[#EDEDED] font-sans leading-relaxed">
            <span className="text-white font-bold block mb-1 font-mono uppercase text-xs">
              TOPOLOGICAL PROOF VERIFIED: EXACTLY 12 CUBES
            </span>
            A 3D cube features 12 linear edges. The cubes possessing exactly two painted exterior faces are located exclusively at the midpoint of each edge. Formula: 12 × (n - 2) = 12 × (3 - 2) = 12.
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleProceed}
            icon={<IconArrowRight className="w-4 h-4" />}
            iconPosition="right"
            className="shrink-0"
          >
            Continue to Next Specimen
          </Button>
        </div>
      )}

    </div>
  );
};
