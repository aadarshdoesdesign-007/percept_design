import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePercept } from '../context/PerceptContext';
import { ResponsiveImage } from '../components/media/ResponsiveImage';
import { Mascot } from '../components/mascot/Mascot';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { sound } from '../utils/audio';
import { DISCOVERIES_BANK } from '../data/discoveriesBank';
import { LEARN_TRACKS, LearnItem } from '../data/learnTracksBank';
import {
  IconSpecimenSheets,
  IconCadence,
  IconArrowRight,
  IconArrowLeft,
  IconDiscovery,
} from '../components/ui/icons';

export const LearnPage: React.FC = () => {
  const { state, updateArchive } = usePercept();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [surpriseTopic, setSurpriseTopic] = useState<typeof DISCOVERIES_BANK[0] | null>(null);
  const [activeItem, setActiveItem] = useState<LearnItem | null>(null);
  const todayStr = new Date().toISOString().slice(0, 10);

  const selectedTrackId = searchParams.get('track');
  const activeTrack = selectedTrackId ? LEARN_TRACKS[selectedTrackId] : null;

  const isBookmarked = state.archive.bookmarkedDesigners.some((d) => d.id === 'josef-muller-brockmann');

  const handleToggleBookmark = () => {
    sound.success();
    if (isBookmarked) {
      updateArchive({
        bookmarkedDesigners: state.archive.bookmarkedDesigners.filter((d) => d.id !== 'josef-muller-brockmann'),
      });
    } else {
      updateArchive({
        bookmarkedDesigners: [
          ...state.archive.bookmarkedDesigners,
          {
            id: 'josef-muller-brockmann',
            name: 'Josef Müller-Brockmann',
            movement: 'Swiss International Typographic Style',
            era: '1914–1996',
            disciplines: ['Graphic Design', 'Typography'],
            bookmarkedAt: new Date().toISOString(),
          },
        ],
      });
    }
  };

  const handleToggleItemSave = (itemId: string) => {
    sound.success();
    if (state.archive.savedArticles.includes(itemId)) {
      updateArchive({
        savedArticles: state.archive.savedArticles.filter((id) => id !== itemId),
      });
    } else {
      updateArchive({
        savedArticles: [...state.archive.savedArticles, itemId],
      });
    }
  };

  const handleSurpriseMe = () => {
    sound.click();
    const randomIndex = Math.floor(Math.random() * DISCOVERIES_BANK.length);
    setSurpriseTopic(DISCOVERIES_BANK[randomIndex]);
  };

  const openTrack = (trackId: string) => {
    sound.click();
    setSearchParams({ track: trackId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeTrack = () => {
    sound.click();
    setSearchParams({});
  };

  // Curated Designer of the Day (authentic historical record)
  const DESIGNER_OF_THE_DAY = {
    name: 'Josef Müller-Brockmann',
    lifespan: '1914 – 1996',
    discipline: 'Graphic Design · Typography',
    movement: 'Swiss International Typographic Style',
    city: 'Zurich, Switzerland',
    quote: 'The grid system is an aid, not a guarantee. It permits a number of possible uses and each designer can look for a solution appropriate to his personal style.',
    keyWorks: ['Musica Viva Concert Posters', 'Grid Systems in Graphic Design (1981)', 'Der Film Poster'],
  };

  const ARCHIVE_CATEGORIES = [
    {
      id: 'movements',
      title: 'Design Movements & Lineage',
      desc: 'Chronological trajectories from Bauhaus and Constructivism to Post-Modernism and Brutalism.',
      count: '14 Core Movements',
      index: '01',
    },
    {
      id: 'designers',
      title: 'Pioneers & Practitioners',
      desc: 'Foundational profiles, theoretical frameworks, and master monographs across centuries.',
      count: '48 Monographed Masters',
      index: '02',
    },
    {
      id: 'typography',
      title: 'Typography & Micro-Form',
      desc: 'Glyph anatomy, punchcutting heritage, optical baseline grids, and contemporary type foundries.',
      count: '32 Type Studies',
      index: '03',
    },
    {
      id: 'industrial',
      title: 'Industrial & Material Culture',
      desc: 'Dieter Rams’ Braun standards, Scandinavian ergonomics, and timeless everyday objects.',
      count: '24 Artifact Case Studies',
      index: '04',
    },
    {
      id: 'architecture',
      title: 'Architecture & Spatial Cadence',
      desc: 'From Le Corbusier’s Modulor to brutalist concrete geometry and contemporary parametric spaces.',
      count: '18 Spatial Surveys',
      index: '05',
    },
    {
      id: 'cinema',
      title: 'Cinema, Photography & Visual Culture',
      desc: 'Director framing, Soviet montage theories, chromatic grading, and photographic observation.',
      count: '16 Cultural Essays',
      index: '06',
    },
  ];

  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-12 animate-fadeIn">
      {/* Editorial Header Masthead */}
      <section className="border-b border-[#292929] pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="px-2.5 py-1 bg-white text-black font-bold uppercase tracking-widest text-[10px] whitespace-nowrap">
                PILLAR 01 · LEARN
              </span>
              <span className="text-neutral-500">/</span>
              <span className="text-[#D99535] font-semibold tracking-wider whitespace-nowrap">
                THE DESIGN ARCHIVE
              </span>
              {activeTrack && (
                <>
                  <span className="text-neutral-500">/</span>
                  <span className="text-white uppercase font-bold tracking-wider whitespace-nowrap">
                    TRACK [{activeTrack.index}] · {activeTrack.title}
                  </span>
                </>
              )}
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl text-[#EDEDED] tracking-tight leading-[1.04]">
              {activeTrack ? activeTrack.title : 'Visual Culture & Design Lineage.'}
            </h1>

            <p className="text-sm sm:text-base text-[#888888] font-sans leading-relaxed max-w-3xl">
              {activeTrack
                ? activeTrack.desc
                : 'An authoritative, curated reference repository connecting contemporary design decisions to 150 years of typography, industrial craft, spatial theories, and visual culture.'}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 font-mono text-xs text-neutral-400 shrink-0 whitespace-nowrap">
            <div className="px-4 py-2 border border-[#292929] bg-[#141414]">
              <span className="text-neutral-500 text-[10px] block uppercase">SAVED ARTICLES</span>
              <span className="text-white font-bold text-base">{state.archive.savedArticles.length}</span>
            </div>
            <div className="px-4 py-2 border border-[#292929] bg-[#141414]">
              <span className="text-neutral-500 text-[10px] block uppercase">BOOKMARKED MASTERS</span>
              <span className="text-white font-bold text-base">{state.archive.bookmarkedDesigners.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRACK DETAIL VIEW (Rendered when a track is actively selected) */}
      {activeTrack ? (
        <section className="space-y-8 animate-fadeIn">
          {/* Track Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#292929] pb-4 gap-4">
            <button
              onClick={closeTrack}
              className="font-mono text-xs uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-2 cursor-pointer transition-colors min-h-[44px]"
            >
              <IconArrowLeft className="w-4 h-4" />
              <span>← Return to 6 Exploration Tracks</span>
            </button>

            <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
              <span className="text-[#D99535] font-bold">[{activeTrack.taxonomyFocus}]</span>
              <span>·</span>
              <span>{activeTrack.items.length} LESSONS AVAILABLE</span>
            </div>
          </div>

          {/* Track Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTrack.items.map((item, idx) => {
              const isSaved = state.archive.savedArticles.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="p-6 sm:p-8 bg-[#141414] border border-[#292929] flex flex-col justify-between space-y-6 hover:border-neutral-500 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-[#D99535] font-bold">
                        SPECIMEN [0{idx + 1}]
                      </span>
                      <span className="px-2 py-0.5 border border-[#292929] text-[9px] uppercase tracking-wider text-neutral-400">
                        {item.readingTime}
                      </span>
                    </div>

                    {item.specimenImage && (
                      <div className="relative w-full aspect-[16/9] bg-[#0A0A0A] border border-[#292929] overflow-hidden">
                        <ResponsiveImage
                          src={item.specimenImage}
                          alt={item.title}
                          aspectRatio="16/9"
                          containerClassName="w-full h-full border-0"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 font-mono text-[9px] text-[#D99535] border border-[#292929]">
                          {item.era}
                        </div>
                      </div>
                    )}

                    <div className="space-y-1">
                      <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">
                        {item.discipline} · {item.author}
                      </span>
                      <h3 className="font-display font-bold text-2xl text-white group-hover:text-[#D99535] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-neutral-400 font-mono">
                        {item.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="p-3 bg-[#111111] border border-[#292929] space-y-1.5">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#D99535] font-bold block">
                        CORE AXIOM
                      </span>
                      <p className="font-mono text-xs text-neutral-300">
                        "{item.curatorAxiom}"
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#1F1F1F] flex flex-wrap items-center justify-between gap-3">
                    <Button
                      variant={isSaved ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => handleToggleItemSave(item.id)}
                    >
                      {isSaved ? "Saved in Archive ✓" : "Save Lesson"}
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        sound.click();
                        setActiveItem(item);
                      }}
                      icon={<IconArrowRight className="w-3.5 h-3.5" />}
                      iconPosition="right"
                    >
                      Examine Study
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        /* MAIN TRACKS OVERVIEW & CATALOG */
        <>
          {/* Featured: Designer of the Day Lockup */}
          <section className="border border-[#292929] bg-[#111111] p-6 sm:p-10 space-y-6">
            <div className="flex items-center justify-between font-mono text-xs border-b border-[#292929] pb-4">
              <div className="flex items-center gap-2 text-[#D99535] font-bold">
                <IconCadence className="w-4 h-4" />
                <span className="uppercase tracking-widest text-[10px]">DESIGNER OF THE DAY · {todayStr}</span>
              </div>
              <span className="text-neutral-500 text-[10px] uppercase tracking-wider">CURATED ARCHIVAL SEED</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                    {DESIGNER_OF_THE_DAY.movement} · {DESIGNER_OF_THE_DAY.city}
                  </span>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight">
                    {DESIGNER_OF_THE_DAY.name}
                  </h2>
                  <span className="font-mono text-xs text-[#D99535] block">
                    {DESIGNER_OF_THE_DAY.lifespan} · {DESIGNER_OF_THE_DAY.discipline}
                  </span>
                </div>

                <blockquote className="border-l-2 border-[#D99535] pl-4 italic text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                  "{DESIGNER_OF_THE_DAY.quote}"
                </blockquote>

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block">
                    CANONICAL WORKS & TEXTS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {DESIGNER_OF_THE_DAY.keyWorks.map((work) => (
                      <span
                        key={work}
                        className="px-3 py-1 bg-[#141414] border border-[#292929] font-mono text-xs text-neutral-300"
                      >
                        {work}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#141414] border border-[#292929] overflow-hidden flex flex-col justify-between">
                <div className="relative w-full aspect-[4/3] bg-[#0A0A0A] border-b border-[#292929] overflow-hidden">
                  <ResponsiveImage
                    src="/assets/learn/muller-brockmann.svg"
                    alt="Josef Müller-Brockmann Archival Monograph Plate"
                    aspectRatio="4/3"
                    priority
                    containerClassName="w-full h-full border-0"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 font-mono text-[9px] text-[#D99535] border border-[#292929]">
                    PLATE 01 · RETROSPECTIVE
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">
                      ARCHIVE MONOGRAPH STATUS
                    </span>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      Canonical monograph study featuring grid analysis, objective sans-serif typography, and mathematical counter-space.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#292929] flex items-center justify-between">
                    <span className="font-mono text-[10px] text-neutral-500 uppercase">
                      MONOGRAPH #01
                    </span>
                    <Button
                      variant={isBookmarked ? "primary" : "outline"}
                      size="sm"
                      onClick={handleToggleBookmark}
                      icon={<IconSpecimenSheets className="w-3.5 h-3.5" />}
                    >
                      {isBookmarked ? "Bookmarked ✓" : "Bookmark Profile"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Six Curated Archive Modules */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#292929] pb-4 gap-4">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block mb-1">
                  ARCHIVE STRUCTURE · 6 EXPLORATION TRACKS
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#EDEDED] tracking-tight">
                  Design Intelligence Encyclopedia
                </h2>
              </div>

              {/* Search & Surprise Me Button */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="Search movements or masters..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#111111] border border-[#292929] px-3 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-500 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleSurpriseMe}
                  icon={<IconDiscovery className="w-3.5 h-3.5 text-[#D99535]" />}
                  className="shrink-0 whitespace-nowrap"
                >
                  Surprise Specimen
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#292929] divide-y md:divide-y-0 md:divide-x divide-[#292929] bg-[#141414]">
              {ARCHIVE_CATEGORIES.filter((cat) => 
                cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cat.desc.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => openTrack(cat.id)}
                  className="p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:bg-[#181818] transition-colors group relative border-b border-[#292929] cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <IconSpecimenSheets className="w-4 h-4 text-[#D99535]" />
                        <span className="text-[#D99535] font-bold">[{cat.index}]</span>
                      </div>
                      <span className="px-2 py-0.5 border border-[#292929] text-[9px] uppercase tracking-wider text-neutral-400">
                        {cat.count}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#EDEDED] tracking-tight group-hover:text-white transition-colors">
                      {cat.title}
                    </h3>

                    <p className="text-xs text-[#888888] font-sans leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#1F1F1F] flex items-center justify-between font-mono text-xs text-neutral-400">
                    <span className="text-[10px] uppercase text-neutral-500">CURATED TRACK</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openTrack(cat.id);
                      }}
                      className="text-white group-hover:translate-x-1 transition-transform flex items-center gap-1.5 font-bold cursor-pointer"
                    >
                      <span>EXPLORE TRACK</span>
                      <IconArrowRight className="w-3.5 h-3.5 text-[#D99535]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mascot Companion Lockup */}
          <section className="border border-[#292929] bg-[#111111] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <Mascot variant="front" size="md" animate alt="PERCEPT Archive Guide" />
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-[#D99535] uppercase tracking-widest font-bold">
                  THE PERCEPT PEDAGOGICAL PHILOSOPHY
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#EDEDED] tracking-tight">
                  Study the past to perceive the present.
                </h3>
                <p className="text-xs sm:text-sm text-[#888888] font-sans max-w-xl leading-relaxed">
                  Every contemporary UI token, grid framework, and product proportion has roots in historic typography and industrial design. The Design Archive builds the historical vocabulary required for intuitive design mastery.
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => openTrack('movements')}
              icon={<IconArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Explore Movements
            </Button>
          </section>
        </>
      )}

      {/* Surprise Specimen Modal */}
      {surpriseTopic && (
        <Modal
          isOpen={!!surpriseTopic}
          onClose={() => setSurpriseTopic(null)}
          title={`ARCHIVAL SPECIMEN // ${surpriseTopic.id.toUpperCase()}`}
          subtitle={`${surpriseTopic.categoryLabel} · ${surpriseTopic.era}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            <div className="relative w-full aspect-[16/9] bg-[#0A0A0A] border border-[#292929] overflow-hidden">
              <ResponsiveImage
                src={surpriseTopic.imageUrl}
                alt={surpriseTopic.title}
                aspectRatio="16/9"
                priority
                containerClassName="w-full h-full border-0"
              />
              <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/90 font-mono text-[9px] uppercase tracking-wider text-[#D99535] border border-[#292929]">
                {surpriseTopic.authorOrOrigin}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-display font-bold text-2xl text-white">
                {surpriseTopic.title}
              </h3>
              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                {surpriseTopic.description}
              </p>
            </div>

            <div className="p-4 bg-[#141414] border border-[#292929] space-y-2">
              <span className="font-mono text-[10px] text-[#D99535] uppercase tracking-widest font-bold block">
                TECTONIC INSIGHT & AXIOM
              </span>
              <p className="text-xs text-[#EDEDED] font-mono leading-relaxed">
                "{surpriseTopic.axiom}"
              </p>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed pt-1">
                {surpriseTopic.curatorNote}
              </p>
            </div>

            <div className="pt-4 border-t border-[#292929] flex flex-wrap items-center justify-between gap-3">
              <Button
                variant={state.archive.savedArticles.includes(surpriseTopic.id) ? "primary" : "secondary"}
                size="sm"
                onClick={() => {
                  sound.success();
                  handleToggleItemSave(surpriseTopic.id);
                }}
              >
                {state.archive.savedArticles.includes(surpriseTopic.id) ? "Saved in Archive ✓" : "Save Specimen"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSurpriseTopic(null)}
              >
                Close Specimen
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Item Monograph Reader Modal */}
      {activeItem && (
        <Modal
          isOpen={!!activeItem}
          onClose={() => setActiveItem(null)}
          title={`MONOGRAPH // ${activeItem.id.toUpperCase()}`}
          subtitle={`${activeItem.discipline} · ${activeItem.era}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            {activeItem.specimenImage && (
              <div className="relative w-full aspect-[16/9] bg-[#0A0A0A] border border-[#292929] overflow-hidden">
                <ResponsiveImage
                  src={activeItem.specimenImage}
                  alt={activeItem.title}
                  aspectRatio="16/9"
                  priority
                  containerClassName="w-full h-full border-0"
                />
                <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/90 font-mono text-[9px] uppercase tracking-wider text-[#D99535] border border-[#292929]">
                  {activeItem.author}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <span className="font-mono text-xs text-[#D99535]">
                {activeItem.subtitle}
              </span>
              <h3 className="font-display font-bold text-2xl text-white">
                {activeItem.title}
              </h3>
              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                {activeItem.summary}
              </p>
            </div>

            {activeItem.keyPoints && activeItem.keyPoints.length > 0 && (
              <div className="p-4 bg-[#141414] border border-[#292929] space-y-2.5">
                <span className="font-mono text-[10px] text-[#D99535] uppercase tracking-widest font-bold block">
                  CANONICAL PRINCIPLES & TAKEAWAYS
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-300 font-sans list-disc pl-4">
                  {activeItem.keyPoints.map((point, pIdx) => (
                    <li key={pIdx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeItem.dimensionsOrSpecs && (
              <div className="flex items-center justify-between p-3 bg-[#111111] border border-[#292929] font-mono text-xs">
                <span className="text-neutral-500 uppercase">SPECIFICATIONS</span>
                <span className="text-white font-bold">{activeItem.dimensionsOrSpecs}</span>
              </div>
            )}

            <div className="pt-4 border-t border-[#292929] flex flex-wrap items-center justify-between gap-3">
              <Button
                variant={state.archive.savedArticles.includes(activeItem.id) ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleToggleItemSave(activeItem.id)}
              >
                {state.archive.savedArticles.includes(activeItem.id) ? "Saved in Archive ✓" : "Save Lesson to Notes"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveItem(null)}
              >
                Close Monograph
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
