import React from 'react';
import { AptitudePracticeMode } from '../../types/aptitude';
import { sound } from '../../utils/audio';
import {
  IconOpenBook,
  IconSurveyMarker,
  IconCadence,
  IconTechnicalClock,
  IconMockExam,
} from '../ui/icons';

interface AptitudeModeSelectorProps {
  activeMode: AptitudePracticeMode;
  onSelectMode: (mode: AptitudePracticeMode) => void;
}

export const AptitudeModeSelector: React.FC<AptitudeModeSelectorProps> = ({
  activeMode,
  onSelectMode,
}) => {
  const MODES: { id: AptitudePracticeMode; label: string; desc: string; icon: React.ReactNode; index: string }[] = [
    {
      id: 'topic',
      label: 'Topic Practice',
      desc: 'Browse by category and topic',
      icon: <IconOpenBook className="w-4 h-4" />,
      index: '01',
    },
    {
      id: 'quick',
      label: 'Quick Challenge',
      desc: 'Rapid 5-question sprint',
      icon: <IconSurveyMarker className="w-4 h-4" />,
      index: '02',
    },
    {
      id: 'daily',
      label: 'Daily Aptitude',
      desc: 'Single daily featured deduction',
      icon: <IconCadence className="w-4 h-4" />,
      index: '03',
    },
    {
      id: 'timed',
      label: 'Timed Practice',
      desc: 'Strict countdown drills',
      icon: <IconTechnicalClock className="w-4 h-4" />,
      index: '04',
    },
    {
      id: 'mock',
      label: 'Mock Exams',
      desc: 'CEED, UCEED & NID DAT tests',
      icon: <IconMockExam className="w-4 h-4" />,
      index: '05',
    },
  ];

  return (
    <div className="border border-[#292929] bg-[#111111] p-1.5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
      {MODES.map((m) => {
        const isActive = activeMode === m.id;
        return (
          <button
            key={m.id}
            onClick={() => {
              sound.click();
              onSelectMode(m.id);
            }}
            className={`p-3.5 text-left border transition-all cursor-pointer flex flex-col justify-between ${
              isActive
                ? 'bg-white text-black border-white'
                : 'bg-[#141414] border-[#292929] text-neutral-400 hover:text-white hover:border-neutral-500'
            }`}
          >
            <div className="flex items-center justify-between font-mono text-[9px] mb-2">
              <span className={isActive ? 'text-black/60 font-bold' : 'text-neutral-500'}>
                [{m.index}]
              </span>
              <span className={isActive ? 'text-black' : 'text-[#D99535]'}>
                {m.icon}
              </span>
            </div>
            <div>
              <h4 className={`font-display font-bold text-sm tracking-tight whitespace-nowrap ${isActive ? 'text-black' : 'text-[#EDEDED]'}`}>
                {m.label}
              </h4>
              <p className={`text-[10px] font-sans truncate mt-0.5 ${isActive ? 'text-neutral-700' : 'text-neutral-500'}`}>
                {m.desc}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
