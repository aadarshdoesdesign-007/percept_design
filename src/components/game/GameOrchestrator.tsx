import React, { useState } from 'react';
import { GameChallenge } from '../../types/game';
import { SpecimenCanvas } from './SpecimenCanvas';
import { GeoGuessrClues } from './GeoGuessrClues';
import { FeedbackOverlay } from './FeedbackOverlay';
import { InteractiveKerningGame } from './interactive/InteractiveKerningGame';
import { InteractiveRogueGridGame } from './interactive/InteractiveRogueGridGame';
import { InteractiveGeoGuessrGame } from './interactive/InteractiveGeoGuessrGame';
import { InteractiveSpatialCubeGame } from './interactive/InteractiveSpatialCubeGame';
import { Button } from '../ui/Button';
import { sound } from '../../utils/audio';
import { IconPrecisionCheck, IconArrowRight } from '../ui/icons';

interface GameOrchestratorProps {
  challenge: GameChallenge;
  challengeIndex: number;
  totalChallenges: number;
  onAnswerComplete: (isCorrect: boolean, earnedXp: number) => void;
  onNext: () => void;
}

export const GameOrchestrator: React.FC<GameOrchestratorProps> = ({
  challenge,
  challengeIndex,
  totalChallenges,
  onAnswerComplete,
  onNext,
}) => {
  // If the challenge has a dedicated tactile game mode, launch the specialized game component!
  if (challenge.id === 'flaw-01') {
    return (
      <InteractiveKerningGame
        onComplete={(isCorrect, earnedXp) => {
          onAnswerComplete(isCorrect, earnedXp);
          onNext();
        }}
      />
    );
  }

  if (challenge.id === 'geo-01') {
    return (
      <InteractiveGeoGuessrGame
        onComplete={(isCorrect, earnedXp) => {
          onAnswerComplete(isCorrect, earnedXp);
          onNext();
        }}
      />
    );
  }

  if (challenge.id === 'spa-01') {
    return (
      <InteractiveSpatialCubeGame
        onComplete={(isCorrect, earnedXp) => {
          onAnswerComplete(isCorrect, earnedXp);
          onNext();
        }}
      />
    );
  }

  if (challenge.id === 'flaw-02') {
    return (
      <InteractiveRogueGridGame
        onComplete={(isCorrect, earnedXp) => {
          onAnswerComplete(isCorrect, earnedXp);
          onNext();
        }}
      />
    );
  }

  // Standard interactive investigation mode with visual canvas & forensic options
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [earnedXp, setEarnedXp] = useState<number>(0);

  const handleSelectOption = (optId: string) => {
    if (isSubmitted) return;
    sound.click();
    setSelectedOption(optId);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted) return;

    const correct = selectedOption === challenge.correctAnswer;
    const xp = correct ? challenge.xpReward : Math.round(challenge.xpReward * 0.25);

    setIsCorrect(correct);
    setEarnedXp(xp);
    setIsSubmitted(true);

    if (correct) {
      sound.success();
    } else {
      sound.click();
    }

    onAnswerComplete(correct, xp);
  };

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      
      {/* Top Header & Investigation Stepper */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#292929]">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 bg-white text-black font-bold uppercase tracking-widest text-[10px]">
              INVESTIGATION 0{challengeIndex + 1} / 0{totalChallenges}
            </span>
            <span className="px-2 py-0.5 border border-[#292929] text-neutral-400 uppercase text-[10px]">
              {challenge.gameModeTitle}
            </span>
            <span className="px-2 py-0.5 border border-amber-900/60 bg-[#1f190e] text-[#D99535] uppercase text-[10px]">
              +{challenge.xpReward} XP
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight leading-tight">
            {challenge.title}
          </h1>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 shrink-0">
          <span>CALIBRATION:</span>
          <span className="text-white uppercase font-bold">{challenge.difficulty}</span>
        </div>
      </div>

      {/* Visual Specimen Canvas (The Dominant Hero) */}
      <SpecimenCanvas specimen={challenge.visualSpecimen} />

      {/* Optional Progressive GeoGuessr Clues */}
      {challenge.gameMode === 'geoguessr' && challenge.visualSpecimen.clues && (
        <GeoGuessrClues clues={challenge.visualSpecimen.clues} />
      )}

      {/* Investigation Prompt */}
      <div className="p-6 bg-[#111111] border border-[#292929]">
        <div className="flex items-start gap-4">
          <span className="font-mono text-xs text-[#D99535] font-bold mt-0.5">
            [QUERY]
          </span>
          <p className="text-base sm:text-lg text-[#EDEDED] font-sans font-medium leading-relaxed">
            {challenge.question}
          </p>
        </div>
      </div>

      {/* Selectable Options Matrix */}
      {!isSubmitted ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {challenge.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-neutral-500">
                        [{opt.id}]
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 bg-white text-black flex items-center justify-center">
                          <IconPrecisionCheck className="w-3 h-3 text-black" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#EDEDED]">
                      {opt.label}
                    </h3>
                    {opt.description && (
                      <p className="text-xs text-[#888888] font-sans leading-relaxed">
                        {opt.description}
                      </p>
                    )}
                  </div>

                  {opt.subtext && (
                    <div className="mt-4 pt-3 border-t border-[#1F1F1F] text-[10px] font-mono text-neutral-500">
                      {opt.subtext}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Action */}
          <div className="flex justify-end pt-2">
            <Button
              variant="primary"
              size="lg"
              disabled={!selectedOption}
              onClick={handleSubmit}
              icon={<IconArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Verify Deduction
            </Button>
          </div>
        </div>
      ) : (
        /* In-Depth Feedback Overlay */
        <FeedbackOverlay
          challenge={challenge}
          isCorrect={isCorrect}
          selectedOptionId={selectedOption || ''}
          earnedXp={earnedXp}
          isLastChallenge={challengeIndex >= totalChallenges - 1}
          onNext={() => {
            setSelectedOption(null);
            setIsSubmitted(false);
            onNext();
          }}
        />
      )}

    </div>
  );
};
