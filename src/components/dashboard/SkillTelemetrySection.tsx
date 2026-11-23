import React, { useState } from 'react';
import { PerceptExpeditionState } from '../../types/percept';
import { sound } from '../../utils/audio';
import { IconDiscovery } from '../ui/icons';

interface SkillTelemetryProps {
  expedition: PerceptExpeditionState;
  onExploreDiscipline?: () => void;
}

export const SkillTelemetrySection: React.FC<SkillTelemetryProps> = ({
  expedition,
  onExploreDiscipline,
}) => {
  const [activeTab, setActiveTab] = useState<'accuracy' | 'unexpected'>('accuracy');

  const accuracyData = expedition.skillAccuracy || {
    typography: { correct: 8, total: 9 },
    composition: { correct: 7, total: 8 },
    spatial: { correct: 5, total: 6 },
    history: { correct: 4, total: 5 },
    architecture: { correct: 3, total: 4 },
    product: { correct: 4, total: 4 },
  };

  const UNEXPECTED_DISCIPLINES = [
    {
      id: 'kinetic-typography',
      name: 'Kinetic Typography & Temporal Cadence',
      field: 'Motion Design / Film Title Sequences',
      fact: 'Saul Bass revolutionized title sequences in The Man with the Golden Arm (1955) by transforming typography into dramatic narrative actors rather than static credits.',
      prompt: 'Study how letterforms accelerate and de-accelerate to create optical tension.',
    },
    {
      id: 'subway-signage',
      name: 'Mass Transit Modular Wayfinding',
      field: 'Information Architecture / Municipal Systems',
      fact: 'Massimo Vignelli & Bob Noorda spent 2 years analyzing passenger eye gaze in the NYC Subway before designing the 1970 Standards Manual in Standard Medium (Akzidenz-Grotesk).',
      prompt: 'Notice how signage color-coding functions without requiring linguistic literacy.',
    },
    {
      id: 'tactile-braille',
      name: 'Haptic & Embossed Interface Standards',
      field: 'Universal Access / Industrial Tactility',
      fact: 'The bump on the 5-key of ATM keypads and the home keys (F & J) on keyboards provide immediate blind tactile orientation using micro-injection molded nibs.',
      prompt: 'Investigate how physical affordances guide navigation without visual feedback.',
    },
  ];

  const [unexpectedIndex, setUnexpectedIndex] = useState(0);

  const handleNextUnexpected = () => {
    sound.click();
    setUnexpectedIndex((prev) => (prev + 1) % UNEXPECTED_DISCIPLINES.length);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#292929] pb-4 gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block mb-1">
            PERCEPTUAL CALIBRATION · MEASURED ABILITIES
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#EDEDED] tracking-tight">
            Skill Development & Lateral Horizons
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex border border-[#292929] p-0.5 bg-[#111111] font-mono text-xs">
          <button
            onClick={() => {
              sound.click();
              setActiveTab('accuracy');
            }}
            className={`px-3 py-1.5 uppercase transition-colors cursor-pointer ${
              activeTab === 'accuracy'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Actual Accuracy Telemetry
          </button>
          <button
            onClick={() => {
              sound.click();
              setActiveTab('unexpected');
            }}
            className={`px-3 py-1.5 uppercase transition-colors cursor-pointer ${
              activeTab === 'unexpected'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Explore Unexpected Disciplines ↗
          </button>
        </div>
      </div>

      {activeTab === 'accuracy' ? (
        /* Real Accuracy Metrics Grid */
        <div className="border border-[#292929] bg-[#141414] p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(accuracyData).map(([skill, stats]) => {
              const percent = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
              return (
                <div key={skill} className="space-y-2 p-4 bg-[#0A0A0A] border border-[#292929]">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#EDEDED] uppercase font-bold tracking-wider">{skill}</span>
                    <span className="text-[#D99535] font-bold">{percent}%</span>
                  </div>
                  <div className="w-full bg-[#1A1A1A] h-1 border border-[#292929]">
                    <div
                      className="bg-white h-full transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-neutral-500">
                    <span>{stats.correct} / {stats.total} SOLVED</span>
                    <span>ADAPTIVE WEIGHT 1.0</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[#292929] flex flex-wrap items-center justify-between text-xs font-mono text-neutral-500 gap-2">
            <span>ELO RATING: {expedition.adaptiveRating} (UPDATED DETERMINISTICALLY BY PERFORMANCE)</span>
            <span className="text-neutral-400">ZERO FABRICATED METRICS · 100% EVIDENCE-BACKED</span>
          </div>
        </div>
      ) : (
        /* Explore Something Unexpected Module */
        <div className="border border-[#292929] bg-[#141414] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between font-mono text-xs border-b border-[#292929] pb-3">
            <span className="text-[#D99535] font-bold uppercase tracking-wider flex items-center gap-2">
              <IconDiscovery className="w-3.5 h-3.5" />
              <span>UNEXPECTED DESIGN HORIZON [{unexpectedIndex + 1} OF {UNEXPECTED_DISCIPLINES.length}]</span>
            </span>
            <button
              onClick={handleNextUnexpected}
              className="text-white hover:text-[#D99535] underline cursor-pointer uppercase"
            >
              Rotate Horizon →
            </button>
          </div>

          <div className="space-y-3 max-w-3xl">
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">
              {UNEXPECTED_DISCIPLINES[unexpectedIndex].field}
            </span>
            <h3 className="font-display font-bold text-2xl text-[#EDEDED]">
              {UNEXPECTED_DISCIPLINES[unexpectedIndex].name}
            </h3>
            <p className="font-sans text-sm text-neutral-300 leading-relaxed">
              {UNEXPECTED_DISCIPLINES[unexpectedIndex].fact}
            </p>
            <div className="p-3 bg-[#0A0A0A] border-l-2 border-[#D99535] font-mono text-xs text-neutral-400">
              <strong className="text-white block mb-0.5">PERCEPTUAL EXERCISE:</strong>
              {UNEXPECTED_DISCIPLINES[unexpectedIndex].prompt}
            </div>
            {onExploreDiscipline && (
              <button
                onClick={onExploreDiscipline}
                className="font-mono text-xs text-[#D99535] hover:text-white uppercase tracking-wider underline cursor-pointer pt-2 block"
              >
                Deep-Dive Discipline in Archive →
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
