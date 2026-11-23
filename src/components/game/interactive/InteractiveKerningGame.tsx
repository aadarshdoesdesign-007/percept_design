import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { sound } from '../../../utils/audio';
import { IconArrowRight, IconPrecisionCheck } from '../../ui/icons';

interface InteractiveKerningGameProps {
  onComplete: (isCorrect: boolean, earnedXp: number, score: number) => void;
}

export const InteractiveKerningGame: React.FC<InteractiveKerningGameProps> = ({ onComplete }) => {
  const [offset, setOffset] = useState<number>(24); // Initial displacement
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [precisionScore, setPrecisionScore] = useState<number>(0);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isVerified) return;
    setOffset(parseInt(e.target.value, 10));
    sound.click();
  };

  const handleVerify = () => {
    if (isVerified) return;
    sound.success();
    const delta = Math.abs(offset);
    const score = Math.max(0, Math.min(100, Math.round(100 - delta * 4.2)));
    setPrecisionScore(score);
    setIsVerified(true);
  };

  const handleProceed = () => {
    sound.click();
    const isSuccess = precisionScore >= 80;
    const xp = isSuccess ? 85 : 45;
    onComplete(isSuccess, xp, precisionScore);
  };

  return (
    <div className="w-full bg-[#141414] border border-[#292929] p-6 sm:p-10 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#292929]">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 bg-white text-black font-bold uppercase tracking-widest text-[10px]">
              LAB 01 · TACTILE SPOT THE FLAW
            </span>
            <span className="px-2 py-0.5 border border-[#292929] text-neutral-400 uppercase text-[10px]">
              TYPOGRAPHIC EQUILIBRIUM
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight">
            The Optical Kerning Lab
          </h2>
        </div>
        <div className="font-mono text-xs text-neutral-400 shrink-0">
          TARGET: 4TH GLYPH ('L') · TOLERANCE: ±2PX
        </div>
      </div>

      <p className="text-xs sm:text-sm text-[#888888] font-sans leading-relaxed max-w-3xl">
        Mechanical font metrics space glyphs by bounding box perimeters. The human retina evaluates internal counter-space volume. Drag the tactile slider to restore optical balance to the specimen below.
      </p>

      {/* Interactive Display Canvas */}
      <div className="w-full py-16 px-6 bg-[#0A0A0A] border border-[#292929] flex flex-col items-center justify-center relative overflow-hidden select-none">
        
        {/* Baseline Guide Line */}
        <div className={`absolute bottom-12 left-8 right-8 h-[1px] transition-all duration-300 ${
          isVerified ? 'bg-emerald-500 opacity-90' : 'bg-neutral-800 opacity-60'
        }`} />

        {/* Word Display */}
        <div className="flex items-baseline justify-center font-display font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#EDEDED] relative">
          {'AVALANCHE'.split('').map((char, idx) => {
            if (idx !== 3) {
              return <span key={idx}>{char}</span>;
            }

            // Target 'L' with dynamic live displacement
            return (
              <span
                key={idx}
                className="relative inline-block transition-transform duration-75"
                style={{
                  transform: `translateX(${offset}px)`,
                }}
              >
                {char}
                {!isVerified ? (
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#D99535]" />
                ) : (
                  <div className="absolute inset-0 border border-emerald-400/80 bg-emerald-400/10 pointer-events-none -m-1" />
                )}
              </span>
            );
          })}

          {/* Mathematical zero ghost outline on verification */}
          {isVerified && (
            <div className="absolute inset-0 pointer-events-none select-none flex items-baseline justify-center text-emerald-400/30">
              {'AVALANCHE'.split('').map((char, idx) => {
                if (idx !== 3) return <span key={idx} className="opacity-0">{char}</span>;
                return (
                  <span key={idx} className="border border-dashed border-emerald-400/60 bg-emerald-400/10 -m-1">
                    <span className="opacity-0">{char}</span>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Displacement Ticker */}
        <div className="mt-12 flex items-center gap-6 font-mono text-xs text-neutral-400">
          <span>OFFSET: <strong className="text-white">{offset > 0 ? `+${offset}` : offset}PX</strong></span>
          {isVerified && (
            <span className="text-emerald-400 font-bold">
              OPTICAL PRECISION: {precisionScore}% (Δ = {Math.abs(offset)}PX)
            </span>
          )}
        </div>
      </div>

      {/* Tactile Range Slider */}
      <div className="space-y-6 pt-2">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-neutral-500 font-bold">-30PX</span>
          <input
            type="range"
            min="-30"
            max="30"
            value={offset}
            disabled={isVerified}
            onChange={handleSliderChange}
            className="flex-1 cursor-pointer touch-none min-h-[44px]"
            aria-label="Kerning adjustment slider"
          />
          <span className="font-mono text-xs text-neutral-500 font-bold">+30PX</span>
        </div>

        {/* Verify Action / Feedback */}
        {!isVerified ? (
          <div className="flex justify-end">
            <Button
              variant="primary"
              size="lg"
              onClick={handleVerify}
              icon={<IconPrecisionCheck className="w-4 h-4" />}
            >
              Verify Optical Kerning
            </Button>
          </div>
        ) : (
          <div className="p-6 bg-[#0A0A0A] border border-[#292929] flex flex-col sm:flex-row items-center justify-between gap-6 animate-fadeIn">
            <div className="text-xs sm:text-sm text-[#EDEDED] font-sans leading-relaxed">
              <span className="text-white font-bold block mb-1 font-mono uppercase text-xs">
                EQUILIBRIUM ACHIEVED ({precisionScore}% PRECISION):
              </span>
              Open diagonal glyphs create optical whitespace voids. The foot of 'L' requires inward tracking to balance the counter-space volume against adjacent vertical stems.
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleProceed}
              icon={<IconArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="shrink-0"
            >
              Proceed to Next Specimen
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};
