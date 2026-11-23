import React, { useState } from 'react';
import { ChallengePreview } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { sound } from '../../utils/audio';
import {
  IconPrecisionCheck,
  IconCopySpecimen,
  IconArrowUpRight,
  IconVerificationSeal,
  IconSpecimenSheets,
  IconCoordinateDatum,
  IconAnalyticalReasoning,
} from '../ui/icons';

interface ChallengeModalProps {
  challenge: ChallengePreview | null;
  isOpen: boolean;
  onClose: () => void;
  onLaunchPreview?: (challenge: ChallengePreview) => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  challenge,
  isOpen,
  onClose,
  onLaunchPreview,
}) => {
  const [copied, setCopied] = useState(false);

  if (!challenge) return null;

  const handleCopySpec = () => {
    sound.click();
    const specSummary = `PERCEPT DRILL SPEC [${challenge.index}]: ${challenge.title}\nTrack: ${challenge.track}\nTolerance: ${challenge.toleranceMetric}\nEvaluation: ${challenge.specs.evaluationMethod}`;
    navigator.clipboard.writeText(specSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      subtitle={`SPECIFICATION DOCUMENT · ${challenge.index}`}
      title={challenge.title}
      maxWidth="lg"
    >
      <div className="space-y-6">
        
        {/* Discipline and status tags */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{challenge.track}</Badge>
          <Badge variant="neutral">{challenge.discipline}</Badge>
          <Badge variant="success">READY FOR PHASE 02</Badge>
          <span className="font-mono text-xs text-neutral-500 ml-auto">
            {challenge.toleranceMetric}
          </span>
        </div>

        {/* Narrative Description */}
        <div className="p-4 bg-[#0a0a0a] border border-neutral-800 text-sm text-[#EDEDED] font-sans leading-relaxed">
          {challenge.description}
        </div>

        {/* Technical Architecture Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          <div className="p-4 bg-[#111111] border border-neutral-800">
            <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px] uppercase mb-1">
              <IconSpecimenSheets className="w-3.5 h-3.5" />
              Target System
            </div>
            <p className="font-sans text-xs text-[#EDEDED] font-medium">
              {challenge.specs.targetSystem}
            </p>
          </div>

          <div className="p-4 bg-[#111111] border border-neutral-800">
            <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px] uppercase mb-1">
              <IconCoordinateDatum className="w-3.5 h-3.5" />
              Target Precision
            </div>
            <p className="font-sans text-xs text-[#EDEDED] font-medium">
              {challenge.specs.targetAccuracy}
            </p>
          </div>

          <div className="p-4 bg-[#111111] border border-neutral-800 sm:col-span-2">
            <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px] uppercase mb-1">
              <IconAnalyticalReasoning className="w-3.5 h-3.5" />
              Evaluation Methodology
            </div>
            <p className="font-sans text-xs text-[#EDEDED]">
              {challenge.specs.evaluationMethod}
            </p>
          </div>

        </div>

        {/* Key Cognitive Concepts */}
        <div>
          <span className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase block mb-2">
            COGNITIVE & VISUAL BENCHMARKS
          </span>
          <div className="space-y-1.5">
            {challenge.keyConcepts.map((concept, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 text-xs text-neutral-300 font-sans"
              >
                <div className="w-1.5 h-1.5 bg-white/40" />
                <span>{concept}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 02 Engine Status Banner */}
        <div className="p-4 bg-neutral-900/60 border border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <IconVerificationSeal className="w-4 h-4 text-neutral-400" />
            <span>Phase 01 Design Foundation Active · Engine Hooks Ready</span>
          </div>
          <span className="text-[#888888]">v1.0 SPEC</span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-neutral-800">
          
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopySpec}
            icon={copied ? <IconPrecisionCheck className="w-3.5 h-3.5 text-[#D99535]" /> : <IconCopySpecimen className="w-3.5 h-3.5" />}
          >
            {copied ? 'Spec Copied' : 'Copy Spec Summary'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              sound.click();
              onClose();
              if (onLaunchPreview) {
                onLaunchPreview(challenge);
              }
            }}
            icon={<IconArrowUpRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            Inspect In Dashboard
          </Button>

        </div>

      </div>
    </Modal>
  );
};
