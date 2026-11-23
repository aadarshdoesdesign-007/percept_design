import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { sound } from '../utils/audio';
import { IconPrecisionCheck } from '../components/ui/icons';

interface CurriculumTrack {
  id: string;
  number: string;
  title: string;
  domain: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Elite CEED';
  description: string;
  learningOutcomes: string[];
  benchmarks: string;
}

const TRACKS: CurriculumTrack[] = [
  {
    id: 'track-1',
    number: '01',
    title: 'Typographic Equilibrium',
    domain: 'Glyph Counter-Spaces & Stem Volume',
    difficulty: 'Foundational',
    description: 'Training subconscious visual calibration to balance negative volume between adjacent letterforms without relying on algorithmic bounding boxes.',
    learningOutcomes: [
      'Overcoming mechanical spacing biases on diagonal letterforms (A, V, W, Y)',
      'Perceptual centering vs mathematical midpoint alignment',
      'Stem weight balance and optical overshoots on round curves (O, C, S)',
    ],
    benchmarks: 'High-contrast Display Grotesk & Swiss Editorial Typographers',
  },
  {
    id: 'track-2',
    number: '02',
    title: 'Spatial Cadence & Rogue Element Hunting',
    domain: 'Padding Tokens & Margin Anomaly Detection',
    difficulty: 'Intermediate',
    description: 'Developing high-speed visual scanning to spot rogue margin tokens, baseline breaks, and padding anomalies across structured grid layouts.',
    learningOutcomes: [
      'Sub-50ms identification of broken 8pt margin rhythm',
      'Consistent peripheral scanning across responsive multi-column surfaces',
      'Distinguishing cognitive reading friction caused by micro-spacing defects',
    ],
    benchmarks: 'International Typographic Style & Editorial Grid Layouts',
  },
  {
    id: 'track-3',
    number: '03',
    title: 'CEED / UCEED Geometric Spatial Reasoning',
    domain: '3D Volumetric Transformation & Mental Rotation',
    difficulty: 'Elite CEED',
    description: 'Rigorous spatial deduction problems derived directly from the premier national design school entrance examinations.',
    learningOutcomes: [
      'Mental unfolding of complex polyhedral forms and surfaces',
      'Calculating painted vs unpainted face counts on sectioned cubes',
      'Perspective projection, orthographic mapping, and topological logic',
    ],
    benchmarks: 'CEED / UCEED IIT Design Aptitude Benchmarks',
  },
  {
    id: 'track-4',
    number: '04',
    title: 'Chromatic Luminance & Contrast Optics',
    domain: 'Perceptual vs Mathematical Contrast',
    difficulty: 'Intermediate',
    description: 'Calibrating human luminance perception across color temperatures, WCAG APCA perceptual contrast thresholds, and optical vibration.',
    learningOutcomes: [
      'Simultaneous contrast and Helmholtz-Kohlrausch chromatic luminance effect',
      'APCA (Accessible Perceptual Contrast Algorithm) threshold alignment',
      'Designing for atmospheric depth using restrained monochromatic scales',
    ],
    benchmarks: 'Modern Color Science & Restrained Editorial Palettes',
  },
];

export const CurriculumPage: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<CurriculumTrack | null>(null);

  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-12 animate-fadeIn">
      
      {/* Header */}
      <section className="border-b border-[#292929] pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="px-2 py-0.5 bg-white text-black font-bold uppercase tracking-widest text-[10px] whitespace-nowrap">
                PEDAGOGY SPECIFICATION
              </span>
              <span className="text-neutral-500">/</span>
              <span className="text-[#D99535] font-semibold whitespace-nowrap">
                4 CORE COMPETENCIES
              </span>
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-6xl text-[#EDEDED] tracking-tight leading-[1.04]">
              Visual Intelligence Curriculum
            </h1>
            <p className="text-xs sm:text-sm text-[#888888] font-sans leading-relaxed max-w-3xl">
              A systematic training methodology engineered for digital product designers, creative directors, and CEED / UCEED entrance candidates.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Tracks Grid (Asymmetric Editorial Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TRACKS.map((track) => (
          <div
            key={track.id}
            className="p-8 bg-[#141414] border border-[#292929] flex flex-col justify-between space-y-6 hover:border-neutral-500 transition-all cursor-pointer group"
            onClick={() => {
              sound.click();
              setActiveTrack(track);
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs whitespace-nowrap">
                <span className="text-[#D99535] font-bold">
                  TRACK [{track.number}]
                </span>
                <span className="px-2 py-0.5 border border-[#292929] text-[9px] uppercase tracking-wider text-neutral-400 whitespace-nowrap">
                  {track.difficulty}
                </span>
              </div>

              <h2 className="font-display font-bold text-2xl text-[#EDEDED] tracking-tight group-hover:text-white transition-colors">
                {track.title}
              </h2>
              <span className="font-mono text-[10px] text-neutral-500 block uppercase tracking-wider">
                {track.domain}
              </span>

              <p className="text-xs sm:text-sm text-[#888888] font-sans leading-relaxed">
                {track.description}
              </p>
            </div>

            <div className="pt-6 border-t border-[#1C1C1C] flex items-center justify-between">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                BENCHMARK: {track.benchmarks.slice(0, 32)}...
              </span>
              <span className="font-mono text-xs text-white group-hover:translate-x-1 transition-transform flex items-center gap-1">
                INSPECT SYLLABUS →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Track Syllabus Modal */}
      {activeTrack && (
        <Modal
          isOpen={Boolean(activeTrack)}
          onClose={() => setActiveTrack(null)}
          title={`Track [${activeTrack.number}] · ${activeTrack.title}`}
          maxWidth="lg"
        >
          <div className="space-y-6 pt-2 font-sans">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#D99535] block mb-1">
                COMPETENCY DOMAIN
              </span>
              <p className="text-sm text-neutral-300 font-semibold">
                {activeTrack.domain}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">
                METHODOLOGY & SCOPE
              </span>
              <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                {activeTrack.description}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-3">
                KEY LEARNING OUTCOMES
              </span>
              <div className="space-y-2">
                {activeTrack.learningOutcomes.map((lo, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <IconPrecisionCheck className="w-3.5 h-3.5 text-[#D99535] shrink-0 mt-0.5" />
                    <span>{lo}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#292929] flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveTrack(null)}
              >
                Close Syllabus
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
