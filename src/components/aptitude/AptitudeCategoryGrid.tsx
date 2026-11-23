import React from 'react';
import { AptitudeCategory, AptitudeUserProgress } from '../../types/aptitude';
import { APTITUDE_CATEGORIES } from '../../data/aptitudeBank';
import { sound } from '../../utils/audio';
import {
  IconVisualReasoning,
  IconSpatialReasoning,
  IconLogicalReasoning,
  IconAnalyticalReasoning,
  IconCreativeReasoning,
  IconMockExam,
  IconArrowRight,
} from '../ui/icons';

interface AptitudeCategoryGridProps {
  progress: AptitudeUserProgress;
  onSelectCategory: (category: AptitudeCategory) => void;
}

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'visual':
      return <IconVisualReasoning className="w-4 h-4 text-[#D99535]" />;
    case 'spatial':
      return <IconSpatialReasoning className="w-4 h-4 text-[#D99535]" />;
    case 'logical':
      return <IconLogicalReasoning className="w-4 h-4 text-[#D99535]" />;
    case 'analytical':
      return <IconAnalyticalReasoning className="w-4 h-4 text-[#D99535]" />;
    case 'creative':
      return <IconCreativeReasoning className="w-4 h-4 text-[#D99535]" />;
    case 'mock':
      return <IconMockExam className="w-4 h-4 text-[#D99535]" />;
    default:
      return <IconSpatialReasoning className="w-4 h-4 text-[#D99535]" />;
  }
};

export const AptitudeCategoryGrid: React.FC<AptitudeCategoryGridProps> = ({
  progress,
  onSelectCategory,
}) => {
  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between border-b border-[#292929] pb-4">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block mb-1">
            CORE DISCIPLINES · 6 SPECIALIZED CATEGORIES
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#EDEDED] tracking-tight">
            Aptitude Taxonomy & Modules
          </h2>
        </div>

        <span className="hidden sm:inline-block font-mono text-xs text-neutral-500">
          COMPETENCY DOMAINS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#292929] divide-y md:divide-y-0 md:divide-x divide-[#292929] bg-[#141414]">
        {APTITUDE_CATEGORIES.map((cat) => {
          const stats = progress.categoryStats[cat.id] || { attempted: 0, correct: 0, timeSpentSeconds: 0 };
          const accuracy = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;

          return (
            <div
              key={cat.id}
              onClick={() => {
                sound.click();
                onSelectCategory(cat.id);
              }}
              className="p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:bg-[#181818] transition-colors cursor-pointer group relative border-b border-[#292929]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(cat.id)}
                    <span className="text-[#D99535] font-bold">
                      [{cat.index}]
                    </span>
                  </div>
                  <span className="px-2 py-0.5 border border-[#292929] text-[9px] uppercase tracking-wider text-neutral-400">
                    {cat.totalQuestions} PROBLEMS
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#EDEDED] tracking-tight group-hover:text-white transition-colors">
                  {cat.title}
                </h3>

                <p className="text-xs text-[#888888] font-sans leading-relaxed">
                  {cat.shortDesc}
                </p>

                {/* Topics List */}
                <div className="flex flex-wrap gap-1 pt-2">
                  {cat.topics.slice(0, 3).map((top) => (
                    <span
                      key={top}
                      className="px-2 py-0.5 border border-[#292929] font-mono text-[9px] text-neutral-400 uppercase"
                    >
                      {top}
                    </span>
                  ))}
                  {cat.topics.length > 3 && (
                    <span className="px-1.5 py-0.5 font-mono text-[9px] text-neutral-600">
                      +{cat.topics.length - 3} MORE
                    </span>
                  )}
                </div>
              </div>

              {/* Progress & Launch Bar */}
              <div className="space-y-3 pt-6 border-t border-[#1F1F1F]">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-neutral-500 uppercase">
                    ACCURACY: {accuracy}% ({stats.correct}/{stats.attempted})
                  </span>
                  <span className="text-white group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                    PRACTICE
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="w-full bg-[#0A0A0A] h-1 border border-[#292929]">
                  <div
                    className="bg-white h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(5, (stats.attempted / cat.totalQuestions) * 100))}%` }}
                  />
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};
