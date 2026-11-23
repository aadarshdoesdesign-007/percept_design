import React from 'react';
import { GameChallenge } from '../../types/game';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Mascot } from '../mascot/Mascot';
import { sound } from '../../utils/audio';
import {
  IconPrecisionCheck,
  IconCrossMark,
  IconArrowRight,
  IconXP,
  IconOpenBook,
  IconSpecimenSheets,
} from '../ui/icons';

interface FeedbackOverlayProps {
  challenge: GameChallenge;
  isCorrect: boolean;
  selectedOptionId: string;
  earnedXp: number;
  isLastChallenge: boolean;
  onNext: () => void;
}

export const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({
  challenge,
  isCorrect,
  selectedOptionId: _selectedOptionId,
  earnedXp,
  isLastChallenge,
  onNext,
}) => {
  const correctOption = challenge.options.find((o) => o.id === challenge.correctAnswer);

  return (
    <div className="border border-[#292929] bg-[#141414] p-6 sm:p-8 space-y-6 animate-fadeIn">
      
      {/* Top Banner Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#292929]">
        <div className="flex items-center gap-3">
          {isCorrect ? (
            <div className="w-9 h-9 border border-neutral-600 bg-[#161616] flex items-center justify-center text-white">
              <IconPrecisionCheck className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-9 h-9 border border-neutral-600 bg-[#161616] flex items-center justify-center text-neutral-300">
              <IconCrossMark className="w-4 h-4" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-[#EDEDED]">
                {isCorrect ? 'Optical Deduction Verified' : 'Calibration Adjustment Needed'}
              </h3>
              <Badge variant={isCorrect ? 'neutral' : 'neutral'} size="xs">
                {isCorrect ? 'VERIFIED' : 'RECALIBRATE'}
              </Badge>
            </div>
            <p className="text-xs font-mono text-[#888888] mt-0.5">
              {challenge.title} · {challenge.gameModeTitle}
            </p>
          </div>
        </div>

        {/* XP Award Tag (Typographic XP, no sparkles) */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 border border-[#292929] bg-[#111111] font-mono text-xs text-white">
          <IconXP className="w-3.5 h-3.5 text-[#D99535]" />
          <span>+{earnedXp} XP</span>
        </div>
      </div>

      {/* Correct Answer Highlight */}
      <div className="p-4 bg-[#0A0A0A] border border-[#292929] space-y-2">
        <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
          <span className="uppercase tracking-widest text-neutral-500">CORRECT SPECIMEN DEDUCTION:</span>
          <span className="text-[#EDEDED] font-bold">[{challenge.correctAnswer}] {correctOption?.label}</span>
        </div>
        <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed">
          {challenge.explanation.summary}
        </p>
      </div>

      {/* In-Depth Design Critique & Theory */}
      <div className="space-y-4 pt-2">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-xs text-neutral-400 uppercase tracking-wider">
            <IconOpenBook className="w-3.5 h-3.5 text-[#D99535]" />
            <span>DESIGN THEORY & VOLUMETRIC PRINCIPLES</span>
          </div>
          <p className="text-xs sm:text-sm text-[#888888] font-sans leading-relaxed">
            {challenge.explanation.designTheory}
          </p>
        </div>

        {challenge.explanation.culturalContext && (
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-xs text-neutral-400 uppercase tracking-wider">
              <IconSpecimenSheets className="w-3.5 h-3.5 text-neutral-400" />
              <span>HISTORICAL & ARCHITECTURAL LINEAGE</span>
            </div>
            <p className="text-xs sm:text-sm text-[#888888] font-sans leading-relaxed">
              {challenge.explanation.culturalContext}
            </p>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#292929]">
        <div className="flex items-center gap-3">
          <Mascot variant="head" size="avatar" showBorder />
          <span className="font-mono text-xs text-neutral-500">
            {isLastChallenge ? 'FINAL INVESTIGATION COMPLETED' : 'PROCEED TO NEXT SPECIMEN'}
          </span>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => {
            sound.click();
            onNext();
          }}
          icon={<IconArrowRight className="w-4 h-4" />}
          iconPosition="right"
        >
          {isLastChallenge ? 'View Proof of Eye' : 'Next Investigation'}
        </Button>
      </div>

    </div>
  );
};
