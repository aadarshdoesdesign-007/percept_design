import React, { useState } from 'react';
import { UserProfile, DesignerDiscipline, ExperienceLevel, LearningGoal } from '../../types/game';
import { Button } from '../ui/Button';
import { Mascot } from '../mascot/Mascot';
import { sound } from '../../utils/audio';
import {
  Palette,
  Layout,
  Box,
  Building2,
  Scissors,
  Film,
  Type,
} from 'lucide-react';
import {
  IconPrecisionCheck,
  IconArrowRight,
  IconArrowLeft,
  IconCreativeReasoning,
  IconMockExam,
} from '../ui/icons';

interface OnboardingFlowProps {
  initialProfile: UserProfile;
  onComplete: (updatedProfile: UserProfile) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const DISCIPLINES: { id: DesignerDiscipline; label: string; desc: string; icon: React.ReactNode; index: string }[] = [
  { id: 'graphic', label: 'Graphic / Communication Design', desc: 'Typography, editorial architecture, grid systems & poster layout', icon: <Type className="w-4 h-4" />, index: '01' },
  { id: 'uiux', label: 'UI / UX & Product Design', desc: 'Interface ergonomics, micro-interactions, heuristics & systematic UI', icon: <Layout className="w-4 h-4" />, index: '02' },
  { id: 'industrial', label: 'Industrial / Physical Product', desc: 'Form-factor, manufacturing tectonic, tactile ergonomics & materials', icon: <Box className="w-4 h-4" />, index: '03' },
  { id: 'architecture', label: 'Architecture & Spatial Interior', desc: 'Volumetric rhythm, climatic brise-soleil, facade logic & light', icon: <Building2 className="w-4 h-4" />, index: '04' },
  { id: 'fashion', label: 'Fashion & Textile Design', desc: 'Silhouette drape, structural pattern-making & tactile materiality', icon: <Scissors className="w-4 h-4" />, index: '05' },
  { id: 'motion', label: 'Motion & Kinetic Animation', desc: 'Temporal pacing, visual momentum & dynamic typography', icon: <Film className="w-4 h-4" />, index: '06' },
  { id: 'illustration', label: 'Illustration & Visual Arts', desc: 'Figure-ground tension, tonal composition & visual storytelling', icon: <Palette className="w-4 h-4" />, index: '07' },
  { id: 'multidisciplinary', label: 'Multidisciplinary Practitioner', desc: 'Cross-boundary generalist synthesizing diverse creative languages', icon: <IconCreativeReasoning className="w-4 h-4" />, index: '08' },
  { id: 'student', label: 'Design Aspirant / CEED Candidate', desc: 'Training optical discrimination for competitive design aptitude', icon: <IconMockExam className="w-4 h-4" />, index: '09' },
];

const EXPERIENCE_LEVELS: { id: ExperienceLevel; label: string; desc: string; code: string; index: string }[] = [
  { id: 'beginner', label: 'Emerging Designer', desc: 'Internalizing foundational axioms: typographic balance, optical center, and primary compositional axes.', code: 'FOUNDATION', index: 'LVL.01' },
  { id: 'intermediate', label: 'Practicing Designer', desc: 'Sharpening subconscious visual reflexes: detecting 2px alignment errors, micro-kerning flaws, and subtle spatial distortions.', code: 'CALIBRATED', index: 'LVL.02' },
  { id: 'advanced', label: 'Design Director / Principal', desc: 'Mastery over historical vernaculars, parametric architecture, complex 3D unfolded nets, and avant-garde manifestos.', code: 'MASTER', index: 'LVL.03' },
];

const GOALS: { id: LearningGoal; label: string; index: string }[] = [
  { id: 'typography', label: 'Typography & Optical Kerning', index: '01' },
  { id: 'composition', label: 'Composition & Asymmetry', index: '02' },
  { id: 'hierarchy', label: 'Visual Hierarchy & Scannability', index: '03' },
  { id: 'colour', label: 'Colour Theory & Luminance', index: '04' },
  { id: 'history', label: 'Art & Design Historical Movements', index: '05' },
  { id: 'architecture', label: 'Architectural Vernaculars & Facades', index: '06' },
  { id: 'product', label: 'Product Form & Ergonomics', index: '07' },
  { id: 'spatial', label: 'Spatial Reasoning & 3D Nets', index: '08' },
  { id: 'observation', label: 'Forensic Visual Deduction (GeoGuessr)', index: '09' },
  { id: 'problem-solving', label: 'Lateral Problem-Solving', index: '10' },
  { id: 'aptitude', label: 'Aptitude Benchmarking (CEED / UCEED)', index: '11' },
];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  initialProfile,
  onComplete,
  onCancel,
  isEditing: _isEditing = false,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [disciplines, setDisciplines] = useState<DesignerDiscipline[]>(initialProfile.disciplines || ['graphic', 'uiux']);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(initialProfile.experienceLevel || 'intermediate');
  const [goals, setGoals] = useState<LearningGoal[]>(initialProfile.goals || ['typography', 'observation', 'spatial']);

  const toggleDiscipline = (id: DesignerDiscipline) => {
    sound.click();
    setDisciplines((prev) =>
      prev.includes(id)
        ? prev.length > 1 ? prev.filter((d) => d !== id) : prev
        : [...prev, id]
    );
  };

  const selectLevel = (level: ExperienceLevel) => {
    sound.click();
    setExperienceLevel(level);
  };

  const toggleGoal = (goal: LearningGoal) => {
    sound.click();
    setGoals((prev) =>
      prev.includes(goal)
        ? prev.length > 1 ? prev.filter((g) => g !== goal) : prev
        : [...prev, goal]
    );
  };

  const handleFinish = () => {
    sound.success();
    const updated: UserProfile = {
      ...initialProfile,
      disciplines,
      experienceLevel,
      goals,
      hasCompletedOnboarding: true,
      adaptiveRating: experienceLevel === 'advanced' ? 1400 : experienceLevel === 'intermediate' ? 1200 : 1000,
    };
    onComplete(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col justify-between overflow-y-auto">
      
      {/* Top Editorial Bar */}
      <header className="border-b border-[#292929] px-6 sm:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mascot variant="head" size="avatar" showBorder />
          <div>
            <span className="font-display font-bold tracking-tight text-lg text-[#EDEDED]">
              PERCEPT
            </span>
            <span className="hidden sm:inline font-mono text-[10px] text-neutral-500 uppercase ml-2 tracking-widest">
              / CALIBRATION MANIFESTO
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="font-mono text-xs text-neutral-400">
            <span className="text-white font-bold">0{step}</span>
            <span className="text-neutral-600"> / 04</span>
          </div>

          {onCancel && (
            <button
              onClick={onCancel}
              className="text-xs font-mono text-neutral-500 hover:text-white uppercase transition-colors"
            >
              Close [ESC]
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto w-full px-6 sm:px-12 py-8 sm:py-12 flex-1">
        
        {/* Step 1: Designer Discipline */}
        {step === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-[#292929] pb-6">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-2">
                INDEX 01 · PRACTICE TAXONOMY
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#EDEDED] tracking-tight max-w-3xl leading-[1.08]">
                What kind of designer are you?
              </h1>
              <p className="text-xs sm:text-sm text-[#888888] font-sans mt-3 max-w-2xl leading-relaxed">
                Select your active creative disciplines. The visual engine selects actual historical specimens, architectural field-records, and typographic artifacts tailored to your practices.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {DISCIPLINES.map((d) => {
                const isSelected = disciplines.includes(d.id);
                return (
                  <div
                    key={d.id}
                    onClick={() => toggleDiscipline(d.id)}
                    className={`p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#141414] border-white text-white'
                        : 'bg-[#111111] border-[#292929] text-neutral-400 hover:border-neutral-500 hover:text-neutral-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-[10px] text-neutral-500 font-bold">
                          [{d.index}]
                        </span>
                        <div
                          className={`w-4 h-4 border flex items-center justify-center ${
                            isSelected ? 'border-white bg-white text-black' : 'border-[#292929]'
                          }`}
                        >
                          {isSelected && <IconPrecisionCheck className="w-3 h-3 text-black" />}
                        </div>
                      </div>

                      <h3 className="font-display font-bold text-base text-[#EDEDED] mb-1.5">
                        {d.label}
                      </h3>
                      <p className="text-xs text-[#888888] font-sans leading-relaxed">
                        {d.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span>DISCIPLINE SPECIMEN</span>
                      <span className="text-neutral-400">{d.id.toUpperCase()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Experience Level */}
        {step === 2 && (
          <div className="space-y-8 animate-fadeIn max-w-4xl">
            <div className="border-b border-[#292929] pb-6">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-2">
                INDEX 02 · OPTICAL RESOLUTION
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#EDEDED] tracking-tight leading-[1.08]">
                Select your optical acuity baseline.
              </h1>
              <p className="text-xs sm:text-sm text-[#888888] font-sans mt-3 max-w-2xl leading-relaxed">
                Calibrates tolerance windows for kerning, geometric alignment distortion, and historical attribution.
              </p>
            </div>

            <div className="space-y-4">
              {EXPERIENCE_LEVELS.map((lvl) => {
                const isSelected = experienceLevel === lvl.id;
                return (
                  <div
                    key={lvl.id}
                    onClick={() => selectLevel(lvl.id)}
                    className={`p-6 border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#141414] border-white text-white'
                        : 'bg-[#111111] border-[#292929] text-neutral-400 hover:border-neutral-500'
                    }`}
                  >
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-neutral-500 font-bold">
                          [{lvl.index}]
                        </span>
                        <h3 className="font-display font-bold text-lg text-[#EDEDED]">
                          {lvl.label}
                        </h3>
                        <span className="px-2 py-0.5 border border-[#292929] font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                          {lvl.code}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#888888] font-sans leading-relaxed">
                        {lvl.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <div
                        className={`w-5 h-5 border flex items-center justify-center ${
                          isSelected ? 'border-white bg-white text-black' : 'border-[#292929]'
                        }`}
                      >
                        {isSelected && <IconPrecisionCheck className="w-3.5 h-3.5 text-black" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Learning Goals */}
        {step === 3 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-[#292929] pb-6">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-2">
                INDEX 03 · PERCEPTUAL TARGETS
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#EDEDED] tracking-tight max-w-3xl leading-[1.08]">
                Which design instincts do you want to train?
              </h1>
              <p className="text-xs sm:text-sm text-[#888888] font-sans mt-3 max-w-2xl leading-relaxed">
                Choose the visual reflexes and historical lineages PERCEPT should emphasize in your daily expedition queue.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {GOALS.map((g) => {
                const isSelected = goals.includes(g.id);
                return (
                  <div
                    key={g.id}
                    onClick={() => toggleGoal(g.id)}
                    className={`p-4 border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#141414] border-white text-white'
                        : 'bg-[#111111] border-[#292929] text-neutral-400 hover:border-neutral-500 hover:text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-neutral-500">
                        {g.index}
                      </span>
                      <span className="text-xs sm:text-sm font-sans font-medium text-[#EDEDED]">
                        {g.label}
                      </span>
                    </div>

                    <div
                      className={`w-4 h-4 border flex items-center justify-center shrink-0 ml-2 ${
                        isSelected ? 'border-white bg-white text-black' : 'border-[#292929]'
                      }`}
                    >
                      {isSelected && <IconPrecisionCheck className="w-2.5 h-2.5 text-black" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Editorial Calibration Dossier */}
        {step === 4 && (
          <div className="max-w-3xl mx-auto py-6 space-y-8 animate-fadeIn">
            <div className="border border-[#292929] bg-[#141414] p-8 sm:p-12">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#292929]">
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-[#D99535] uppercase font-bold block mb-1">
                    PROFILE SYNCHRONIZATION COMPLETE
                  </span>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight">
                    Expedition Dossier Active
                  </h2>
                </div>

                <div className="w-28 h-28 shrink-0">
                  <Mascot variant="front" size="md" animate alt="PERCEPT Official Companion" />
                </div>
              </div>

              {/* Archival Metadata Table */}
              <div className="py-6 space-y-4 font-mono text-xs border-b border-[#292929]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-neutral-400">
                  <span className="uppercase tracking-widest text-neutral-500">CURATED DISCIPLINES:</span>
                  <span className="text-white font-bold">{disciplines.join(' · ')}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-neutral-400">
                  <span className="uppercase tracking-widest text-neutral-500">EXPERIENCE CALIBRATION:</span>
                  <span className="text-white font-bold uppercase">{experienceLevel}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-neutral-400">
                  <span className="uppercase tracking-widest text-neutral-500">OPTICAL OBJECTIVES:</span>
                  <span className="text-white font-bold">{goals.length} ACTIVE FOCUS DOMAINS</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-neutral-400">
                  <span className="uppercase tracking-widest text-neutral-500">INITIAL ADAPTIVE RATING:</span>
                  <span className="text-[#D99535] font-bold">
                    {experienceLevel === 'advanced' ? '1400 ELO' : experienceLevel === 'intermediate' ? '1200 ELO' : '1000 ELO'}
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <p className="text-xs text-[#888888] font-sans leading-relaxed">
                  Your daily expedition has been seeded deterministically for today's date. Three real-world visual artifacts and interactive challenges are staged for deduction.
                </p>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Bottom Editorial Actions Bar */}
      <footer className="border-t border-[#292929] px-6 sm:px-12 py-4 bg-[#0A0A0A] flex items-center justify-between">
        {step > 1 ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              sound.click();
              setStep((s) => (s - 1) as any);
            }}
            icon={<IconArrowLeft className="w-3.5 h-3.5" />}
          >
            Previous
          </Button>
        ) : (
          <span className="font-mono text-[11px] text-neutral-600">PERCEPT ARCHIVAL ENGINE</span>
        )}

        {step < 4 ? (
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              sound.click();
              setStep((s) => (s + 1) as any);
            }}
            icon={<IconArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Next Section
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            onClick={handleFinish}
            icon={<IconArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Begin Expedition
          </Button>
        )}
      </footer>

    </div>
  );
};
