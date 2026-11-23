import React, { useState, useEffect } from 'react';
import { AptitudeQuestion } from '../../types/aptitude';
import { AptitudeDiagramRenderer } from './AptitudeDiagramRenderer';
import { Button } from '../ui/Button';
import { sound } from '../../utils/audio';
import {
  IconTechnicalClock,
  IconDiscovery,
  IconPrecisionCheck,
  IconCrossMark,
  IconArrowRight,
  IconOpenBook,
} from '../ui/icons';

interface AptitudeQuestionCardProps {
  question: AptitudeQuestion;
  questionNumber: number;
  totalQuestions: number;
  timedMode?: boolean;
  timeLimitSeconds?: number;
  onAnswerSubmit: (isCorrect: boolean, timeSpentSeconds: number) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export const AptitudeQuestionCard: React.FC<AptitudeQuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  timedMode = false,
  timeLimitSeconds,
  onAnswerSubmit,
  onNextQuestion,
  isLastQuestion,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(timeLimitSeconds || question.suggestedTimeSeconds || 60);

  // Timer effect
  useEffect(() => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    setSecondsElapsed(0);
    setTimeRemaining(timeLimitSeconds || question.suggestedTimeSeconds || 60);

    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
      if (timedMode) {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [question, timedMode, timeLimitSeconds]);

  const handleSelect = (optionId: string) => {
    if (isSubmitted) return;
    sound.click();
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted) return;

    const correct = selectedOption === question.correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct) {
      sound.success();
    } else {
      sound.click();
    }

    onAnswerSubmit(correct, secondsElapsed);
  };

  const difficultyColors = {
    beginner: 'text-neutral-300 border-[#292929] bg-[#141414]',
    intermediate: 'text-[#D99535] border-[#292929] bg-[#141414]',
    advanced: 'text-neutral-200 border-[#292929] bg-[#1a1a1a]',
  };

  return (
    <div className="w-full bg-[#141414] border border-[#292929] p-6 sm:p-10 space-y-8 animate-fadeIn">
      
      {/* Top Header & Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#292929]">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 bg-white text-black font-bold uppercase tracking-widest text-[10px]">
              QUESTION 0{questionNumber} / 0{totalQuestions}
            </span>
            <span className="px-2 py-0.5 border border-[#292929] text-neutral-400 uppercase text-[10px]">
              {question.topic}
            </span>
            <span className={`px-2 py-0.5 border font-mono text-[10px] uppercase font-bold ${difficultyColors[question.difficulty]}`}>
              {question.difficulty}
            </span>
            {question.examTag && (
              <span className="px-2 py-0.5 border border-[#292929] bg-[#111111] text-neutral-300 font-mono text-[10px] uppercase">
                {question.examTag} PATTERN
              </span>
            )}
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#EDEDED] tracking-tight">
            {question.subtopic || question.topic}
          </h2>
        </div>

        {/* Stopwatch / Timer Display */}
        <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 shrink-0">
          <IconTechnicalClock className="w-4 h-4 text-[#D99535]" />
          {timedMode ? (
            <span>
              TIME REMAINING: <strong className={`font-bold ${timeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{timeRemaining}S</strong>
            </span>
          ) : (
            <span>
              TIME: <strong className="text-white">{secondsElapsed}S</strong>
            </span>
          )}
        </div>
      </div>

      {/* Diagram Area (If present) */}
      {question.diagram && (
        <AptitudeDiagramRenderer diagram={question.diagram} />
      )}

      {/* Narrative Problem Statement */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">
          PROBLEM SPECIFICATION
        </span>
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed">
          {question.question || question.questionText}
        </p>
      </div>

      {/* Expandable Hint (Optional) */}
      {question.hint && !isSubmitted && (
        <div className="space-y-2">
          <button
            onClick={() => {
              sound.click();
              setShowHint(!showHint);
            }}
            className="flex items-center gap-1.5 font-mono text-xs text-[#D99535] hover:text-white transition-colors cursor-pointer uppercase"
          >
            <IconDiscovery className="w-3.5 h-3.5" />
            <span>{showHint ? 'Hide Hint' : 'Reveal Conceptual Clue'}</span>
          </button>

          {showHint && (
            <div className="p-4 bg-[#111111] border border-[#292929] text-xs font-sans text-neutral-300 animate-fadeIn">
              {question.hint}
            </div>
          )}
        </div>
      )}

      {/* Selectable Options Matrix */}
      {!isSubmitted ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#181818] border-white text-white'
                      : 'bg-[#111111] border-[#292929] text-neutral-400 hover:border-neutral-500 hover:text-neutral-200'
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
                    <p className="text-sm sm:text-base font-sans text-[#EDEDED] leading-relaxed">
                      {opt.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

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
        /* In-Depth Explanation & Deductive Proof */
        <div className="space-y-6 animate-fadeIn">
          
          {/* Result Banner */}
          <div className="p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A0A0A] border-[#292929]">
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <div className="w-8 h-8 border border-neutral-600 bg-[#161616] flex items-center justify-center text-white">
                  <IconPrecisionCheck className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 border border-neutral-600 bg-[#161616] flex items-center justify-center text-neutral-300">
                  <IconCrossMark className="w-4 h-4" />
                </div>
              )}

              <div>
                <span className={`font-mono text-xs font-bold uppercase tracking-wider block ${isCorrect ? 'text-white' : 'text-neutral-300'}`}>
                  {isCorrect ? 'ACCURATE DEDUCTION' : 'MISALIGNMENT DETECTED'}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  CORRECT CHOICE: [{question.correctAnswer}]
                </span>
              </div>
            </div>

            <div className="font-mono text-xs text-neutral-500">
              TIME ELAPSED: {secondsElapsed} SECONDS
            </div>
          </div>

          {/* Step-by-Step Proof */}
          <div className="p-6 bg-[#0E0E0E] border border-[#292929] space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 uppercase tracking-wider">
              <IconOpenBook className="w-3.5 h-3.5 text-[#D99535]" />
              <span>STEP-BY-STEP DEDUCTION & PROOF</span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed">
              {question.explanation.summary}
            </p>

            <div className="space-y-2 pt-2 border-t border-[#1C1C1C]">
              {question.explanation.stepByStep.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-400 font-sans">
                  <span className="font-mono text-[#D99535]">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {question.explanation.keyFormula && (
              <div className="p-3 bg-[#141414] border border-[#292929] font-mono text-xs text-[#D99535]">
                FORMULA / AXIOM: {question.explanation.keyFormula}
              </div>
            )}
          </div>

          {/* Action to Continue */}
          <div className="flex justify-end pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={onNextQuestion}
              icon={<IconArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              {isLastQuestion ? 'Complete Aptitude Session' : 'Next Question'}
            </Button>
          </div>

        </div>
      )}

    </div>
  );
};
