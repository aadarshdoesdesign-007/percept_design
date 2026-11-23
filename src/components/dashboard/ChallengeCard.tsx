import React from 'react';
import { ChallengePreview } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { sound } from '../../utils/audio';
import { IconTechnicalClock, IconArrowRight } from '../ui/icons';

interface ChallengeCardProps {
  challenge: ChallengePreview;
  onSelect: (challenge: ChallengePreview) => void;
  isCompleted?: boolean;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  onSelect,
  isCompleted = false,
}) => {
  return (
    <Card
      variant="primary"
      className="p-6 sm:p-7 flex flex-col justify-between group hover:border-neutral-700 transition-all duration-300 relative overflow-hidden"
    >
      {/* Top Meta Line: Track & Index */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <Badge variant={isCompleted ? 'success' : 'neutral'} size="xs">
            {challenge.track}
          </Badge>
          <span className="font-mono text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">
            [{challenge.index}]
          </span>
        </div>

        {/* Title & Discipline */}
        <h3 className="font-bold text-xl sm:text-2xl text-[#EDEDED] tracking-tight mb-2 group-hover:text-white transition-colors">
          {challenge.title}
        </h3>
        
        <p className="text-xs text-[#888888] font-sans leading-relaxed mb-6 line-clamp-3">
          {challenge.description}
        </p>
      </div>

      {/* Structural Metadata Badges & Specs */}
      <div className="space-y-4 pt-4 border-t border-neutral-800/80">
        
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2.5 bg-[#0a0a0a] border border-neutral-800/80">
            <span className="text-[10px] text-neutral-500 uppercase block mb-0.5">TOLERANCE</span>
            <span className="text-[#EDEDED] font-semibold text-[11px] truncate block">
              {challenge.toleranceMetric}
            </span>
          </div>

          <div className="p-2.5 bg-[#0a0a0a] border border-neutral-800/80">
            <span className="text-[10px] text-neutral-500 uppercase block mb-0.5">BENCHMARK</span>
            <span className="text-[#EDEDED] font-semibold text-[11px] truncate block">
              {challenge.benchmarkOrigin}
            </span>
          </div>
        </div>

        {/* Action Button & Time Estimate */}
        <div className="flex items-center justify-between pt-2">
          <span className="flex items-center gap-1.5 text-xs font-mono text-neutral-500">
            <IconTechnicalClock className="w-3.5 h-3.5" />
            {challenge.estimatedMinutes} MIN RUN
          </span>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              sound.click();
              onSelect(challenge);
            }}
            icon={<IconArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />}
            iconPosition="right"
          >
            Inspect Spec
          </Button>
        </div>

      </div>
    </Card>
  );
};
