import React, { useState, useEffect } from 'react';
import { MockExamDefinition, AptitudeQuestion } from '../../types/aptitude';
import { MOCK_EXAMS, APTITUDE_QUESTION_BANK } from '../../data/aptitudeBank';
import { AptitudeDiagramRenderer } from './AptitudeDiagramRenderer';
import { Button } from '../ui/Button';
import { sound } from '../../utils/audio';
import {
  IconTechnicalClock,
  IconArrowRight,
  IconArrowLeft,
  IconMockExam,
  IconCoordinateDatum,
} from '../ui/icons';

interface AptitudeMockExamViewProps {
  onRecordResult: (examId: string, examName: string, score: number, total: number, timeSeconds: number) => void;
  onExit: () => void;
}

export const AptitudeMockExamView: React.FC<AptitudeMockExamViewProps> = ({
  onRecordResult,
  onExit,
}) => {
  const [selectedExam, setSelectedExam] = useState<MockExamDefinition | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);
  const [isReviewMode, setIsReviewMode] = useState<boolean>(false);

  // Active exam questions
  const examQuestions: AptitudeQuestion[] = React.useMemo(() => {
    if (!selectedExam) return [];
    return selectedExam.questionIds
      .map((id) => APTITUDE_QUESTION_BANK.find((q) => q.id === id))
      .filter(Boolean) as AptitudeQuestion[];
  }, [selectedExam]);

  // Start exam handler
  const handleStartExam = (exam: MockExamDefinition) => {
    sound.click();
    setSelectedExam(exam);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSecondsRemaining(exam.durationMinutes * 60);
    setIsExamCompleted(false);
    setIsReviewMode(false);
  };

  // Timer countdown
  useEffect(() => {
    if (!selectedExam || isExamCompleted || secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedExam, isExamCompleted, secondsRemaining]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isExamCompleted) return;
    sound.click();
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleFinishExam = () => {
    sound.success();
    setIsExamCompleted(true);

    if (selectedExam) {
      let score = 0;
      examQuestions.forEach((q) => {
        if (userAnswers[q.id] === q.correctAnswer) {
          score += 1;
        }
      });
      const timeTaken = selectedExam.durationMinutes * 60 - secondsRemaining;
      onRecordResult(selectedExam.id, selectedExam.title, score, examQuestions.length, timeTaken);
    }
  };

  // If no exam selected, show exam catalog
  if (!selectedExam) {
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Notice of authenticity */}
        <div className="p-4 bg-[#111111] border border-[#292929] flex items-start gap-3">
          <IconCoordinateDatum className="w-4 h-4 text-[#D99535] shrink-0 mt-0.5" />
          <p className="text-xs text-[#888888] font-sans leading-relaxed">
            <strong className="text-neutral-300">Notice on Examination Lineage:</strong> All mock tests contain original practice questions engineered by PERCEPT, calibrated to test the spatial deduction, observation, and logical patterns of premier design entrance exams. These questions are strictly distinguished from officially sourced past-year papers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_EXAMS.map((exam) => (
            <div
              key={exam.id}
              className="p-8 bg-[#141414] border border-[#292929] flex flex-col justify-between space-y-6 hover:border-neutral-500 transition-all cursor-pointer group"
              onClick={() => handleStartExam(exam)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#D99535] font-bold">
                    {exam.examType}
                  </span>
                  <span className="px-2 py-0.5 border border-[#292929] text-[9px] uppercase tracking-wider text-neutral-400">
                    {exam.durationMinutes} MIN · {exam.questionCount} Qs
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-[#EDEDED] tracking-tight group-hover:text-white transition-colors">
                  {exam.title}
                </h3>
                <span className="font-mono text-[10px] text-neutral-500 block uppercase tracking-wider">
                  {exam.subtitle}
                </span>

                <p className="text-xs text-[#888888] font-sans leading-relaxed">
                  {exam.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[#1F1F1F] flex items-center justify-between">
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                  MOCK SPRINT
                </span>
                <span className="font-mono text-xs text-white group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                  BEGIN EXAM →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentQ = examQuestions[currentQuestionIndex];
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timerStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // If completed exam and viewing score report
  if (isExamCompleted && !isReviewMode) {
    let score = 0;
    examQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) score += 1;
    });
    const accuracy = Math.round((score / examQuestions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
        <div className="bg-[#141414] border border-[#292929] p-8 sm:p-12 text-center space-y-6">
          <div className="w-14 h-14 border border-neutral-700 bg-white/5 flex items-center justify-center text-[#EDEDED] mx-auto">
            <IconMockExam className="w-7 h-7 text-[#D99535]" />
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[#D99535] uppercase tracking-widest font-bold block">
              MOCK EXAMINATION COMPLETED
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight">
              {selectedExam.title}
            </h2>
          </div>

          {/* Score Matrix */}
          <div className="grid grid-cols-3 divide-x divide-[#292929] border-y border-[#292929] py-6 font-mono">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase block mb-1">SCORE</span>
              <span className="font-display font-bold text-3xl text-white">
                {score} / {examQuestions.length}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 uppercase block mb-1">ACCURACY</span>
              <span className="font-display font-bold text-3xl text-emerald-400">
                {accuracy}%
              </span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 uppercase block mb-1">TIME TAKEN</span>
              <span className="font-display font-bold text-2xl text-white">
                {selectedExam.durationMinutes * 60 - secondsRemaining}S
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsReviewMode(true)}
            >
              Review Explanations
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setSelectedExam(null);
                onExit();
              }}
            >
              Back to Aptitude Lab
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Active examination runner
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Exam Header Ribbon */}
      <div className="p-4 bg-[#111111] border border-[#292929] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
        <div>
          <span className="text-[#D99535] font-bold block sm:inline mr-2">
            [{selectedExam.examType}]
          </span>
          <span className="text-white font-bold">{selectedExam.title}</span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-neutral-400">
            <IconTechnicalClock className="w-3.5 h-3.5 text-[#D99535]" />
            <span>TIME: <strong className={`font-bold ${secondsRemaining <= 120 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{timerStr}</strong></span>
          </div>

          {!isExamCompleted ? (
            <Button
              variant="danger"
              size="sm"
              onClick={handleFinishExam}
            >
              Finish Test
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedExam(null)}
            >
              Exit Review
            </Button>
          )}
        </div>
      </div>

      {/* Question Number Palette (1..N) */}
      <div className="p-4 bg-[#0E0E0E] border border-[#292929] flex flex-wrap items-center gap-2 font-mono text-xs">
        <span className="text-neutral-500 mr-2 uppercase text-[10px]">NAVIGATOR:</span>
        {examQuestions.map((q, idx) => {
          const isAnswered = Boolean(userAnswers[q.id]);
          const isCurrent = idx === currentQuestionIndex;
          return (
            <button
              key={q.id}
              onClick={() => {
                sound.click();
                setCurrentQuestionIndex(idx);
              }}
              className={`w-8 h-8 border font-bold text-[11px] transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-white text-black border-white'
                  : isAnswered
                  ? 'bg-[#1f190e] border-[#D99535] text-[#D99535]'
                  : 'bg-[#141414] border-[#292929] text-neutral-500 hover:text-white'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Active Question Display */}
      {currentQ && (
        <div className="p-6 sm:p-10 bg-[#141414] border border-[#292929] space-y-8">
          
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 font-mono text-xs">
            <span className="text-white font-bold">
              QUESTION {currentQuestionIndex + 1} OF {examQuestions.length}
            </span>
            <span className="text-neutral-500 uppercase">
              {currentQ.topic} · {currentQ.difficulty}
            </span>
          </div>

          {currentQ.diagram && (
            <AptitudeDiagramRenderer diagram={currentQ.diagram} />
          )}

          <div className="p-6 bg-[#0E0E0E] border border-[#292929]">
            <p className="text-base sm:text-lg text-[#EDEDED] font-sans font-medium leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* Options Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQ.options.map((opt) => {
              const isSelected = userAnswers[currentQ.id] === opt.id;
              const isCorrectAnswer = opt.id === currentQ.correctAnswer;

              let style = 'bg-[#111111] border-[#292929] text-neutral-400 hover:border-neutral-500 hover:text-neutral-200';
              if (isSelected && !isExamCompleted) {
                style = 'bg-[#181818] border-white text-white';
              } else if (isExamCompleted) {
                if (isCorrectAnswer) {
                  style = 'bg-[#0f1f17] border-emerald-500 text-emerald-300';
                } else if (isSelected && !isCorrectAnswer) {
                  style = 'bg-[#221010] border-red-500 text-red-400';
                }
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className={`p-5 border transition-all cursor-pointer flex flex-col justify-between ${style}`}
                >
                  <div className="space-y-1.5">
                    <span className="font-mono text-xs font-bold text-neutral-500">[{opt.id}]</span>
                    <p className="text-sm font-sans">{opt.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Review Mode Explanation */}
          {isExamCompleted && (
            <div className="p-6 bg-[#0A0A0A] border border-[#292929] space-y-3 font-sans text-xs">
              <span className="font-mono uppercase text-[#D99535] font-bold block">
                CORRECT CHOICE: [{currentQ.correctAnswer}] · PROOF & DEDUCTION:
              </span>
              <p className="text-neutral-300 leading-relaxed">
                {currentQ.explanation.summary}
              </p>
            </div>
          )}

          {/* Question Nav Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#292929]">
            <Button
              variant="secondary"
              size="sm"
              disabled={currentQuestionIndex === 0}
              onClick={() => {
                sound.click();
                setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
              }}
              icon={<IconArrowLeft className="w-3.5 h-3.5" />}
            >
              Previous
            </Button>

            {currentQuestionIndex < examQuestions.length - 1 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  sound.click();
                  setCurrentQuestionIndex((prev) => prev + 1);
                }}
                icon={<IconArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                Next Question
              </Button>
            ) : (
              !isExamCompleted && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleFinishExam}
                >
                  Submit Examination
                </Button>
              )
            )}
          </div>

        </div>
      )}

    </div>
  );
};
