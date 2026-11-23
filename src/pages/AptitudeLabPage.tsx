import React, { useState, useMemo } from 'react';
import {
  AptitudeCategory,
  AptitudeDifficulty,
  AptitudePracticeMode,
  AptitudeQuestion,
  AptitudeUserProgress,
} from '../types/aptitude';
import {
  APTITUDE_QUESTION_BANK,
} from '../data/aptitudeBank';
import {
  loadAptitudeProgress,
  recordAptitudeAnswer,
  recordMockExamResult,
} from '../services/aptitudeStorage';
import { AptitudeStatsOverview } from '../components/aptitude/AptitudeStatsOverview';
import { AptitudeModeSelector } from '../components/aptitude/AptitudeModeSelector';
import { AptitudeCategoryGrid } from '../components/aptitude/AptitudeCategoryGrid';
import { AptitudeQuestionCard } from '../components/aptitude/AptitudeQuestionCard';
import { AptitudeMockExamView } from '../components/aptitude/AptitudeMockExamView';
import { Button } from '../components/ui/Button';
import { Mascot } from '../components/mascot/Mascot';
import { sound } from '../utils/audio';
import {
  IconRecalibrate,
  IconMockExam,
} from '../components/ui/icons';

interface SessionResultItem {
  question: AptitudeQuestion;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export const AptitudeLabPage: React.FC = () => {
  const [progress, setProgress] = useState<AptitudeUserProgress>(() => loadAptitudeProgress());
  const [activeMode, setActiveMode] = useState<AptitudePracticeMode>('topic');
  const [selectedCategory, setSelectedCategory] = useState<AptitudeCategory | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<AptitudeDifficulty | 'all'>('all');

  // Active question session state
  const [activeSessionQuestions, setActiveSessionQuestions] = useState<AptitudeQuestion[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [sessionResults, setSessionResults] = useState<SessionResultItem[]>([]);
  const [isSessionCompleted, setIsSessionCompleted] = useState<boolean>(false);
  const [expandedExplanationId, setExpandedExplanationId] = useState<string | null>(null);

  // Filtered pool of questions
  const filteredQuestions = useMemo(() => {
    return APTITUDE_QUESTION_BANK.filter((q) => {
      if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
      if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
      return true;
    });
  }, [selectedCategory, difficultyFilter]);

  // Weakest category computation from real progress
  const weakestCategory = useMemo(() => {
    const categories: AptitudeCategory[] = ['visual', 'spatial', 'logical', 'analytical', 'creative'];
    let lowestAcc = 101;
    let targetCat: AptitudeCategory | null = null;

    for (const cat of categories) {
      const stats = progress.categoryStats[cat];
      if (stats && stats.attempted > 0) {
        const acc = Math.round((stats.correct / stats.attempted) * 100);
        if (acc < lowestAcc) {
          lowestAcc = acc;
          targetCat = cat;
        }
      }
    }
    return targetCat ? { category: targetCat, accuracy: lowestAcc } : null;
  }, [progress]);

  // Start Quick Challenge (5 questions)
  const handleStartQuickChallenge = () => {
    sound.click();
    const shuffled = [...APTITUDE_QUESTION_BANK].sort(() => 0.5 - Math.random()).slice(0, 5);
    setActiveSessionQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSessionResults([]);
    setIsSessionCompleted(false);
    setExpandedExplanationId(null);
  };

  // Start Daily Aptitude (1 question seeded by today's date)
  const handleStartDailyAptitude = () => {
    sound.click();
    const todayNum = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''), 10);
    const question = APTITUDE_QUESTION_BANK[todayNum % APTITUDE_QUESTION_BANK.length];
    setActiveSessionQuestions([question]);
    setCurrentQuestionIndex(0);
    setSessionResults([]);
    setIsSessionCompleted(false);
    setExpandedExplanationId(null);
  };

  // Start Category Practice
  const handleStartCategoryPractice = (category: AptitudeCategory) => {
    setSelectedCategory(category);
    if (category === 'mock') {
      setActiveMode('mock');
      return;
    }
    sound.click();
    const categoryQuestions = APTITUDE_QUESTION_BANK.filter((q) => q.category === category);
    setActiveSessionQuestions(categoryQuestions);
    setCurrentQuestionIndex(0);
    setSessionResults([]);
    setIsSessionCompleted(false);
    setExpandedExplanationId(null);
  };

  // Replay only missed questions
  const handleRetryMissedQuestions = () => {
    sound.click();
    const missed = sessionResults.filter((r) => !r.isCorrect).map((r) => r.question);
    if (missed.length > 0) {
      setActiveSessionQuestions(missed);
      setCurrentQuestionIndex(0);
      setSessionResults([]);
      setIsSessionCompleted(false);
      setExpandedExplanationId(null);
    }
  };

  // Handle single question answer completion
  const handleAnswerSubmit = (isCorrect: boolean, timeSpentSeconds: number) => {
    if (!activeSessionQuestions) return;
    const currentQ = activeSessionQuestions[currentQuestionIndex];

    setSessionResults((prev) => [
      ...prev,
      {
        question: currentQ,
        isCorrect,
        timeSpentSeconds,
      },
    ]);

    const updated = recordAptitudeAnswer(currentQ.id, currentQ.category, isCorrect, timeSpentSeconds);
    setProgress(updated);
  };

  // Move to next question or complete session
  const handleNextQuestion = () => {
    if (!activeSessionQuestions) return;

    if (currentQuestionIndex < activeSessionQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      sound.success();
      setIsSessionCompleted(true);
    }
  };

  const handleRecordMockResult = (examId: string, examName: string, score: number, total: number, timeSeconds: number) => {
    const updated = recordMockExamResult(examId, examName, score, total, timeSeconds);
    setProgress(updated);
  };

  // Active question session is running
  if (activeSessionQuestions && activeSessionQuestions.length > 0) {
    if (isSessionCompleted) {
      const correctCount = sessionResults.filter((r) => r.isCorrect).length;
      const totalCount = activeSessionQuestions.length;
      const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
      const totalSessionTime = sessionResults.reduce((acc, r) => acc + r.timeSpentSeconds, 0);
      const missedCount = totalCount - correctCount;

      return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-12 animate-fadeIn space-y-8">
          <div className="bg-[#141414] border border-[#292929] p-8 sm:p-12 text-center space-y-6">
            <div className="w-14 h-14 border border-neutral-700 bg-white/5 flex items-center justify-center text-[#EDEDED] mx-auto">
              <IconMockExam className="w-7 h-7 text-[#D99535]" />
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] text-[#D99535] uppercase tracking-widest font-bold block">
                SPRINT TELEMETRY REPORT
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#EDEDED] tracking-tight">
                {accuracy}% Session Accuracy
              </h2>
              <p className="text-xs sm:text-sm text-[#888888] font-sans max-w-md mx-auto pt-1 leading-relaxed">
                You correctly solved {correctCount} of {totalCount} aptitude questions in {totalSessionTime}s. Detailed deduction records have been committed to your Aptitude Lab profile.
              </p>
            </div>

            {/* Performance Metrics Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2 text-left">
              <div className="p-3 bg-[#111111] border border-[#292929]">
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 block">ATTEMPTED</span>
                <span className="font-mono font-bold text-lg text-white">{totalCount} Qs</span>
              </div>
              <div className="p-3 bg-[#111111] border border-[#292929]">
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 block">CORRECT</span>
                <span className="font-mono font-bold text-lg text-[#D99535]">{correctCount} Qs</span>
              </div>
              <div className="p-3 bg-[#111111] border border-[#292929]">
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 block">TIME ELAPSED</span>
                <span className="font-mono font-bold text-lg text-white">{totalSessionTime}s</span>
              </div>
              <div className="p-3 bg-[#111111] border border-[#292929]">
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 block">AVG SPEED</span>
                <span className="font-mono font-bold text-lg text-neutral-300">
                  {totalCount > 0 ? Math.round(totalSessionTime / totalCount) : 0}s/Q
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              {missedCount > 0 && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleRetryMissedQuestions}
                  icon={<IconRecalibrate className="w-4 h-4" />}
                >
                  Review Missed Problems ({missedCount})
                </Button>
              )}

              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  sound.click();
                  setCurrentQuestionIndex(0);
                  setSessionResults([]);
                  setIsSessionCompleted(false);
                  setExpandedExplanationId(null);
                }}
                icon={<IconRecalibrate className="w-4 h-4" />}
              >
                Replay Full Sprint
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  sound.click();
                  setActiveSessionQuestions(null);
                }}
              >
                Return to Aptitude Lab
              </Button>
            </div>
          </div>

          {/* Question-by-Question Review Section */}
          <div className="bg-[#111111] border border-[#292929] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#292929] pb-3 font-mono text-xs">
              <span className="text-[#D99535] font-bold uppercase tracking-wider">
                ITEMIZED SESSION REVIEW
              </span>
              <span className="text-neutral-500">
                CLICK ANY ITEM TO INSPECT CANONICAL DEDUCTION
              </span>
            </div>

            <div className="divide-y divide-[#1F1F1F]">
              {sessionResults.map((result, idx) => {
                const isExpanded = expandedExplanationId === result.question.id;

                return (
                  <div key={result.question.id} className="py-4 space-y-3">
                    <div
                      className="flex items-center justify-between cursor-pointer group"
                      onClick={() => {
                        sound.click();
                        setExpandedExplanationId(isExpanded ? null : result.question.id);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs px-2 py-0.5 border ${
                            result.isCorrect
                              ? 'bg-emerald-950/60 border-emerald-700 text-emerald-400 font-bold'
                              : 'bg-red-950/60 border-red-700 text-red-400 font-bold'
                          }`}
                        >
                          {result.isCorrect ? 'CORRECT' : 'INCORRECT'}
                        </span>
                        <span className="font-mono text-xs text-neutral-400">
                          Q{idx + 1} · {result.question.category.toUpperCase()}
                        </span>
                        <span className="font-sans text-xs text-neutral-200 line-clamp-1 group-hover:text-white">
                          {result.question.question}
                        </span>
                      </div>

                      <span className="font-mono text-xs text-neutral-500 group-hover:text-white shrink-0">
                        {isExpanded ? 'Hide ▲' : 'Inspect ▼'}
                      </span>
                    </div>

                    {isExpanded && (
                      <div className="p-4 bg-[#141414] border border-[#292929] space-y-3 font-sans text-xs animate-fadeIn">
                        <div className="font-mono text-[10px] text-[#D99535] uppercase tracking-wider font-bold">
                          CORRECT OPTION: {result.question.correctAnswer}
                        </div>
                        <p className="text-neutral-300 leading-relaxed">
                          {result.question.explanation.summary}
                        </p>
                        {result.question.explanation.stepByStep && (
                          <ul className="list-disc pl-5 space-y-1 text-neutral-400">
                            {result.question.explanation.stepByStep.map((step, sIdx) => (
                              <li key={sIdx}>{step}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    const currentQ = activeSessionQuestions[currentQuestionIndex];
    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn space-y-6">
        <div className="flex items-center justify-between border-b border-[#292929] pb-4 font-mono text-xs text-neutral-400">
          <button
            onClick={() => {
              sound.click();
              setActiveSessionQuestions(null);
            }}
            className="hover:text-white uppercase flex items-center gap-2 transition-colors cursor-pointer min-h-[48px] px-2"
          >
            ← Exit to Aptitude Lab
          </button>

          <span>
            PROBLEM {currentQuestionIndex + 1} OF {activeSessionQuestions.length}
          </span>
        </div>

        <AptitudeQuestionCard
          question={currentQ}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={activeSessionQuestions.length}
          timedMode={activeMode === 'timed'}
          onAnswerSubmit={handleAnswerSubmit}
          onNextQuestion={handleNextQuestion}
          isLastQuestion={currentQuestionIndex >= activeSessionQuestions.length - 1}
        />
      </div>
    );
  }

  // Aptitude Lab Landing Page
  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-12 animate-fadeIn">
      {/* Editorial Header Masthead */}
      <section className="border-b border-[#292929] pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="px-2.5 py-1 bg-white text-black font-bold uppercase tracking-widest text-[10px] whitespace-nowrap">
                PILLAR 03 · THINK
              </span>
              <span className="text-neutral-500">/</span>
              <span className="text-[#D99535] font-semibold tracking-wider whitespace-nowrap">
                APTITUDE LAB · REASONING ENGINE
              </span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl text-[#EDEDED] tracking-tight leading-[1.04]">
              Train the way you think.
            </h1>

            <p className="text-sm sm:text-base text-[#888888] font-sans leading-relaxed max-w-3xl">
              A focused training ground for visual intelligence, analytical thinking, logical deduction and competitive design aptitude.
            </p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex flex-wrap items-center gap-3 pt-4 lg:pt-0 shrink-0 whitespace-nowrap">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleStartDailyAptitude}
            >
              Daily Deduction
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleStartQuickChallenge}
            >
              Quick Challenge (5 Qs) →
            </Button>
          </div>
        </div>
      </section>

      {/* Real Statistics Ribbon (Derived from Actual User Activity) */}
      <AptitudeStatsOverview progress={progress} />

      {/* Weakest Area Callout (If telemetry indicates an area needing focus) */}
      {weakestCategory && weakestCategory.accuracy < 80 && (
        <section className="border border-[#D99535]/40 bg-[#161208] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs text-[#D99535] font-bold">
              <IconRecalibrate className="w-4 h-4" />
              <span className="uppercase tracking-widest text-[10px]">TARGETED CALIBRATION RECOMMENDATION</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-200 font-sans">
              Your accuracy in <strong className="text-white capitalize">{weakestCategory.category} Reasoning</strong> is currently {weakestCategory.accuracy}%. Run focused drills to strengthen your visual deduction score.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleStartCategoryPractice(weakestCategory.category)}
            className="shrink-0 whitespace-nowrap"
          >
            Practice {weakestCategory.category.toUpperCase()} →
          </Button>
        </section>
      )}

      {/* Practice Mode Selector Tabs */}
      <section className="space-y-4">
        <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block">
          PRACTICE ARCHITECTURE · SELECT TRAINING FORMAT
        </span>
        <AptitudeModeSelector
          activeMode={activeMode}
          onSelectMode={(mode) => {
            setActiveMode(mode);
            if (mode === 'quick') handleStartQuickChallenge();
            if (mode === 'daily') handleStartDailyAptitude();
          }}
        />
      </section>

      {/* Content depending on Active Mode */}
      {activeMode === 'mock' ? (
        <AptitudeMockExamView
          onRecordResult={handleRecordMockResult}
          onExit={() => setActiveMode('topic')}
        />
      ) : (
        <>
          {/* Six Learning Categories Grid */}
          <AptitudeCategoryGrid
            progress={progress}
            onSelectCategory={(cat) => handleStartCategoryPractice(cat)}
          />

          {/* Question Bank Filter & Browse Strip */}
          <section className="border border-[#292929] bg-[#111111] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#292929]">
              <div>
                <h3 className="font-display font-bold text-xl text-[#EDEDED] tracking-tight">
                  Question Bank Repository
                </h3>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">
                  60+ VALIDATED SCIENTIFIC PROBLEMS ACROSS DESIGN REASONING
                </p>
              </div>

              {/* Filter controls */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => {
                      sound.click();
                      setDifficultyFilter(diff);
                    }}
                    className={`px-3 py-1.5 border uppercase text-[10px] tracking-wider transition-all cursor-pointer min-h-[36px] ${
                      difficultyFilter === diff
                        ? 'bg-white text-black font-bold border-white'
                        : 'bg-[#141414] border-[#292929] text-neutral-400 hover:text-white'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions List preview */}
            <div className="divide-y divide-[#1C1C1C]">
              {filteredQuestions.slice(0, 8).map((q) => (
                <div
                  key={q.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#141414] px-3 transition-colors cursor-pointer group"
                  onClick={() => {
                    sound.click();
                    setActiveSessionQuestions([q]);
                    setCurrentQuestionIndex(0);
                    setSessionResults([]);
                    setIsSessionCompleted(false);
                    setExpandedExplanationId(null);
                  }}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <span className="text-[#D99535] font-bold">[{q.category.toUpperCase()}]</span>
                      <span className="text-neutral-500">{q.topic}</span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-neutral-400 uppercase">{q.difficulty}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-sans text-neutral-200 line-clamp-1 group-hover:text-white">
                      {q.question}
                    </p>
                  </div>

                  <span className="font-mono text-xs text-neutral-400 group-hover:text-white flex items-center gap-1 shrink-0">
                    PRACTICE →
                  </span>
                </div>
              ))}
            </div>

            {filteredQuestions.length > 8 && (
              <div className="pt-2 text-center font-mono text-xs text-neutral-500">
                + {filteredQuestions.length - 8} MORE QUESTIONS AVAILABLE IN THIS FILTER
              </div>
            )}
          </section>
        </>
      )}

      {/* Mascot Companion Lockup */}
      <section className="border border-[#292929] bg-[#111111] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <Mascot variant="front" size="md" animate alt="PERCEPT Companion" />
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] text-[#D99535] uppercase tracking-widest font-bold">
              PERCEPT COGNITIVE ARCHITECTURE
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#EDEDED] tracking-tight">
              Design is logical architecture applied visually.
            </h3>
            <p className="text-xs sm:text-sm text-[#888888] font-sans max-w-xl leading-relaxed">
              Top design programs like CEED and UCEED test spatial folding, topological nets, and analytical ratios because exceptional design requires both perceptual nuance and rigorous mathematical discipline.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleStartQuickChallenge}
        >
          Launch 5-Question Sprint
        </Button>
      </section>
    </div>
  );
};
