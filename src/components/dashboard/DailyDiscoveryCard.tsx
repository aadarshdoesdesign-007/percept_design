import React, { useState } from 'react';
import { DesignDiscovery } from '../../data/discoveriesBank';
import { ResponsiveImage } from '../media/ResponsiveImage';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { sound } from '../../utils/audio';
import { IconDiscovery, IconArrowRight } from '../ui/icons';

interface DailyDiscoveryCardProps {
  discovery: DesignDiscovery;
  onExploreMore?: () => void;
}

export const DailyDiscoveryCard: React.FC<DailyDiscoveryCardProps> = ({
  discovery,
  onExploreMore,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleOpen = () => {
    sound.click();
    setIsModalOpen(true);
  };

  const handleToggleSave = () => {
    sound.success();
    setIsSaved(!isSaved);
  };

  return (
    <>
      <section className="border border-[#292929] bg-[#111111] overflow-hidden">
        {/* Section Header */}
        <div className="px-6 py-3.5 border-b border-[#292929] bg-[#141414] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <IconDiscovery className="w-3.5 h-3.5 text-[#D99535]" />
            <span className="text-[#D99535] font-bold uppercase tracking-wider text-[11px]">
              TODAY'S DESIGN DISCOVERY
            </span>
            <span className="text-neutral-600 hidden sm:inline">·</span>
            <span className="text-neutral-400 uppercase text-[10px] hidden sm:inline">
              {discovery.categoryLabel}
            </span>
          </div>
          <span className="text-neutral-500 text-[10px] uppercase font-mono">
            {discovery.era} · {discovery.authorOrOrigin.split('·')[0]}
          </span>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#292929]">
          {/* Visual Specimen Frame */}
          <div className="lg:col-span-5 bg-[#0A0A0A] p-6 sm:p-8 flex items-center justify-center">
            <div className="w-full max-w-sm aspect-[4/3] bg-[#0A0A0A] border border-[#292929] relative overflow-hidden group cursor-pointer" onClick={handleOpen}>
              <ResponsiveImage
                src={discovery.imageUrl}
                alt={discovery.title}
                aspectRatio="4/3"
                priority
                containerClassName="w-full h-full border-0"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/85 border border-[#292929] font-mono text-[9px] text-[#D99535] uppercase">
                SPECIMEN DOSSIER
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider">
                  Inspect Specimen ↗
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Analysis */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#111111]">
            <div className="space-y-4">
              <div>
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
                  {discovery.authorOrOrigin}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#EDEDED] tracking-tight leading-snug">
                  {discovery.title}
                </h3>
                <p className="font-mono text-xs text-[#D99535] mt-1 font-medium">
                  "{discovery.axiom}"
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#888888] font-sans leading-relaxed">
                {discovery.description}
              </p>

              {/* Key Insights List */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 block font-bold">
                  CORE PRINCIPLES
                </span>
                <ul className="space-y-1.5 font-sans text-xs text-neutral-300">
                  {discovery.keyInsights.slice(0, 2).map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#D99535] font-mono font-bold">0{idx + 1}.</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-[#292929] flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[10px] text-neutral-500 uppercase truncate max-w-xs">
                {discovery.dimensionsOrSpecs || 'Archival Field Record'}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleSave}
                  className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
                    isSaved
                      ? 'border-[#D99535] text-[#D99535] bg-[#1a150e]'
                      : 'border-[#292929] text-neutral-400 hover:text-white'
                  }`}
                >
                  {isSaved ? '★ Saved to Notes' : '☆ Save Specimen'}
                </button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleOpen}
                  icon={<IconArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  Examine Monograph
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Examination Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={discovery.title}
        subtitle={`${discovery.categoryLabel.toUpperCase()} · ${discovery.era}`}
        maxWidth="xl"
      >
        <div className="space-y-6">
          <div className="w-full aspect-video bg-[#0A0A0A] border border-[#292929] overflow-hidden">
            <ResponsiveImage
              src={discovery.imageUrl}
              alt={discovery.title}
              aspectRatio="16/9"
              containerClassName="w-full h-full border-0"
            />
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-[#111111] border-l-2 border-[#D99535] font-mono text-xs text-neutral-300">
              <strong className="text-white block mb-0.5">DESIGN AXIOM:</strong>
              "{discovery.axiom}"
            </div>

            <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {discovery.description}
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#D99535] font-bold block">
              SYSTEMIC TAKEAWAYS & ANALYSIS
            </span>
            <div className="space-y-2">
              {discovery.keyInsights.map((insight, idx) => (
                <div key={idx} className="p-3 bg-[#0A0A0A] border border-[#292929] font-sans text-xs text-neutral-300 flex items-start gap-3">
                  <span className="font-mono text-[10px] text-[#D99535] font-bold mt-0.5">[{idx + 1}]</span>
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#141414] border border-[#292929] flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>CURATORIAL LOG: {discovery.curatorNote}</span>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
              Close Dossier
            </Button>
            {onExploreMore && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsModalOpen(false);
                  onExploreMore();
                }}
              >
                Go to Design Archive →
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
