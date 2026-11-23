import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { sound } from '../../../utils/audio';
import { IconArrowRight, IconPrecisionCheck } from '../../ui/icons';

interface InteractiveRogueGridGameProps {
  onComplete: (isCorrect: boolean, earnedXp: number, score: number) => void;
}

export const InteractiveRogueGridGame: React.FC<InteractiveRogueGridGameProps> = ({ onComplete }) => {
  const rogueIndex = 2; // Card 3 has p-9 padding
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isShake, setIsShake] = useState<boolean>(false);

  const CARDS = [
    { id: 0, tag: 'FOUNDATION', title: 'Spatial Geometry', desc: 'Strict multi-column proportional rhythm.', meta: '8PT GRID' },
    { id: 1, tag: 'SYSTEMS', title: 'Baseline Cadence', desc: 'Vertical leading aligned to standard 8pt steps.', meta: '8PT GRID' },
    { id: 2, tag: 'METRICS', title: 'Rogue Padding', desc: 'Breaks perimeter margin token balance.', meta: '+12PX MISMATCH' },
    { id: 3, tag: 'OPTICS', title: 'Visual Tension', desc: 'Uniform boundary padding preserves harmony.', meta: '8PT GRID' },
  ];

  const handleCardClick = (idx: number) => {
    if (isVerified) return;
    setSelectedCard(idx);

    if (idx === rogueIndex) {
      sound.success();
      setIsVerified(true);
      setIsShake(false);
    } else {
      sound.click();
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500);
    }
  };

  const handleProceed = () => {
    sound.click();
    onComplete(true, 80, 100);
  };

  return (
    <div className="w-full bg-[#141414] border border-[#292929] p-6 sm:p-10 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#292929]">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 bg-white text-black font-bold uppercase tracking-widest text-[10px]">
              LAB 04 · PRECISION DEFECT HUNTER
            </span>
            <span className="px-2 py-0.5 border border-[#292929] text-neutral-400 uppercase text-[10px]">
              MICRO-ALIGNMENT TOLERANCE
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight">
            Rogue Margin & Grid Hunter
          </h2>
        </div>
        <div className="font-mono text-xs text-neutral-400 shrink-0">
          PERCEPTUAL LATENCY: &lt;50MS TARGET
        </div>
      </div>

      <p className="text-xs sm:text-sm text-[#888888] font-sans leading-relaxed max-w-3xl">
        One of the four specimen modules below breaks the design system's padding token by +12px, creating subtle optical weight imbalance. Click the anomalous component.
      </p>

      {/* 4 Cards Grid */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${isShake ? 'animate-shake' : ''}`}>
        {CARDS.map((c, idx) => {
          const isTarget = idx === rogueIndex;
          const isSelected = selectedCard === idx;

          // Card 2 has rogue padding (p-9 instead of standard p-5)
          const paddingClass = isTarget ? 'p-9' : 'p-5';

          let stateBorder = 'border-[#292929] hover:border-neutral-500';
          if (isVerified && isTarget) {
            stateBorder = 'border-emerald-500 bg-[#0f1f17]';
          } else if (isSelected && !isTarget) {
            stateBorder = 'border-red-500 bg-[#221010]';
          }

          return (
            <div
              key={c.id}
              onClick={() => handleCardClick(idx)}
              className={`bg-[#111111] border transition-all cursor-pointer flex flex-col justify-between ${paddingClass} ${stateBorder}`}
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-widest mb-3">
                  <span>[{c.tag}]</span>
                  <span>CARD 0{idx + 1}</span>
                </div>

                <h3 className="font-display font-bold text-base text-white mb-2">
                  {c.title}
                </h3>
                <p className="text-xs text-[#888888] font-sans leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#1C1C1C] flex items-center justify-between font-mono text-[10px]">
                <span className="text-neutral-500">{c.meta}</span>
                {isVerified && isTarget && (
                  <span className="text-[#D99535] font-bold flex items-center gap-1">
                    <IconPrecisionCheck className="w-3.5 h-3.5" />
                    ROGUE DETECTED
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feedback Section */}
      {isVerified && (
        <div className="p-6 bg-[#0A0A0A] border border-[#292929] flex flex-col sm:flex-row items-center justify-between gap-6 animate-fadeIn">
          <div className="text-xs sm:text-sm text-[#EDEDED] font-sans leading-relaxed">
            <span className="text-white font-bold block mb-1 font-mono uppercase text-xs">
              DEFECT ISOLATED: CARD 03 PADDING MISMATCH (+12PX)
            </span>
            Card 03 implemented 36px internal padding instead of the canonical 24px step. The human eye perceives padding disparities primarily through uneven baseline text gravity.
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
