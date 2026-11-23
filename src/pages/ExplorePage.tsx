import React, { useState } from 'react';
import { usePercept } from '../context/PerceptContext';
import { ResponsiveImage } from '../components/media/ResponsiveImage';
import { Mascot } from '../components/mascot/Mascot';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { sound } from '../utils/audio';
import {
  IconViewfinder,
  IconFieldJournal,
} from '../components/ui/icons';

interface MissionDef {
  id: string;
  title: string;
  domain: string;
  instructions: string;
  imageUrl: string;
  difficulty: string;
  xpReward: number;
  index: string;
}

const SAMPLE_MISSIONS: MissionDef[] = [
  {
    id: 'mission-01',
    title: 'Desire Paths & Organic Navigation',
    domain: 'Spatial Architecture & Wayfinding',
    instructions: 'Photograph a natural foot-worn path across grass or dirt where pedestrian human behavior diverged from planned concrete sidewalks.',
    imageUrl: '/assets/explore/mission-desire-paths.svg',
    difficulty: 'Beginner',
    xpReward: 50,
    index: '01',
  },
  {
    id: 'mission-02',
    title: 'Accidental Typographic Baselines',
    domain: 'Typography & Structural Rhythm',
    instructions: 'Find architectural elements, window mullions, or brick mortar lines that align unintentionally with urban storefront signage lettering.',
    imageUrl: '/assets/explore/mission-typographic-baselines.svg',
    difficulty: 'Intermediate',
    xpReward: 75,
    index: '02',
  },
  {
    id: 'mission-03',
    title: 'Luminance Shadows as Contrast Guides',
    domain: 'Optics & Perceptual Contrast',
    instructions: 'Capture sharp 2:00 PM cast shadows dividing a geometric plane into two distinct luminance fields with measurable edge acuity.',
    imageUrl: '/assets/explore/mission-luminance-shadows.svg',
    difficulty: 'Advanced',
    xpReward: 100,
    index: '03',
  },
  {
    id: 'mission-04',
    title: 'Everyday Industrial Affordances',
    domain: 'Industrial & Interaction Ergonomics',
    instructions: 'Spot a door handle, latch, or public kiosk control where the visual affordance contradicts the required physical action (Norman Door).',
    imageUrl: '/assets/explore/mission-everyday-affordances.svg',
    difficulty: 'Intermediate',
    xpReward: 75,
    index: '04',
  },
];

export const ExplorePage: React.FC = () => {
  const { state, updateJournal, updateExpedition } = usePercept();
  const [activeTab, setActiveTab] = useState<'missions' | 'journal'>('missions');
  const [activeMission, setActiveMission] = useState<MissionDef | null>(null);
  const [isCustomNoteOpen, setIsCustomNoteOpen] = useState(false);

  // Form states for log submission
  const [entryTitle, setEntryTitle] = useState('');
  const [entryNotes, setEntryNotes] = useState('');
  const [entryCategory, setEntryCategory] = useState('Spatial');
  const [entryTags, setEntryTags] = useState('Affordance, Urban');
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);

  const openMissionModal = (mission: MissionDef) => {
    sound.click();
    setActiveMission(mission);
    setEntryTitle(`Field Log: ${mission.title}`);
    setEntryCategory(mission.domain.split('&')[0].trim());
    setEntryNotes('');
    setUploadedImagePreview(mission.imageUrl);
  };

  const openNewNoteModal = () => {
    sound.click();
    setIsCustomNoteOpen(true);
    setEntryTitle('');
    setEntryCategory('Visual Observation');
    setEntryNotes('');
    setUploadedImagePreview('/assets/explore/mission-desire-paths.svg');
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitLog = () => {
    sound.success();
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const xpEarned = activeMission ? activeMission.xpReward : 50;

    const newEntry = {
      id: `entry-${Date.now()}`,
      title: entryTitle.trim() || (activeMission ? activeMission.title : 'Field Observation'),
      observationText: entryNotes.trim() || 'Recorded physical field observation displaying intentional or emergent visual cadence.',
      category: entryCategory,
      createdAt: dateFormatted,
      tags: entryTags.split(',').map((t) => t.trim()).filter(Boolean),
      imageRef: uploadedImagePreview || '/assets/explore/mission-desire-paths.svg',
    };

    const newCompletedMissions = activeMission
      ? [
          ...state.journal.completedMissions.filter((m) => m.id !== activeMission.id),
          {
            id: activeMission.id,
            title: activeMission.title,
            category: activeMission.domain,
            completedAt: now.toISOString(),
            notes: newEntry.observationText,
            imageRef: newEntry.imageRef,
          },
        ]
      : state.journal.completedMissions;

    updateJournal({
      entries: [newEntry, ...state.journal.entries],
      completedMissions: newCompletedMissions,
      totalObservationsCount: state.journal.totalObservationsCount + 1,
    });

    updateExpedition({
      totalXp: state.expedition.totalXp + xpEarned,
    });

    setActiveMission(null);
    setIsCustomNoteOpen(false);
    setActiveTab('journal');
  };

  const handleDeleteEntry = (entryId: string) => {
    sound.click();
    updateJournal({
      entries: state.journal.entries.filter((e) => e.id !== entryId),
    });
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-12 animate-fadeIn">
      {/* Editorial Header Masthead */}
      <section className="border-b border-[#292929] pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="px-2.5 py-1 bg-white text-black font-bold uppercase tracking-widest text-[10px] whitespace-nowrap">
                PILLAR 04 · EXPLORE
              </span>
              <span className="text-neutral-500">/</span>
              <span className="text-[#D99535] font-semibold tracking-wider whitespace-nowrap">
                LOOK AGAIN OBSERVATION LAB
              </span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl text-[#EDEDED] tracking-tight leading-[1.04]">
              Look Again: The World as a Classroom.
            </h1>

            <p className="text-sm sm:text-base text-[#888888] font-sans leading-relaxed max-w-3xl">
              Design mastery cannot be cultivated exclusively in Figma or textbooks. Train your peripheral vision, spot optical rhythm in physical reality, and record real-world design anomalies.
            </p>
          </div>

          {/* Quick Stats Ribbon */}
          <div className="flex items-center gap-4 font-mono text-xs text-neutral-400 shrink-0 whitespace-nowrap">
            <div className="px-4 py-2 border border-[#292929] bg-[#141414]">
              <span className="text-neutral-500 text-[10px] block uppercase">COMPLETED MISSIONS</span>
              <span className="text-white font-bold text-base">{state.journal.completedMissions.length}</span>
            </div>
            <div className="px-4 py-2 border border-[#292929] bg-[#141414]">
              <span className="text-neutral-500 text-[10px] block uppercase">JOURNAL LOGS</span>
              <span className="text-white font-bold text-base">{state.journal.entries.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mode Navigation Tabs */}
      <div className="flex border-b border-[#292929] font-mono text-xs">
        <button
          onClick={() => {
            sound.click();
            setActiveTab('missions');
          }}
          className={`px-6 py-3 border-b-2 uppercase tracking-wider transition-colors cursor-pointer min-h-[48px] ${
            activeTab === 'missions'
              ? 'border-white text-white font-bold bg-[#141414]'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Observation Missions ({SAMPLE_MISSIONS.length})
        </button>
        <button
          onClick={() => {
            sound.click();
            setActiveTab('journal');
          }}
          className={`px-6 py-3 border-b-2 uppercase tracking-wider transition-colors cursor-pointer min-h-[48px] ${
            activeTab === 'journal'
              ? 'border-white text-white font-bold bg-[#141414]'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Personal Visual Journal ({state.journal.entries.length})
        </button>
      </div>

      {activeTab === 'missions' ? (
        /* Observation Missions Catalog */
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#292929] pb-4 font-mono text-xs gap-2">
            <span className="text-[#D99535] font-bold uppercase tracking-widest">
              FIELD WORK MISSIONS · PERCEPTUAL DRILLS
            </span>
            <span className="text-neutral-500">
              TAP "ACCEPT BRIEF" TO LOG FIELD OBSERVATIONS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SAMPLE_MISSIONS.map((mission) => {
              const isCompleted = state.journal.completedMissions.some((m) => m.id === mission.id);

              return (
                <div
                  key={mission.id}
                  className="p-6 bg-[#141414] border border-[#292929] flex flex-col justify-between space-y-6 hover:border-neutral-500 transition-all group overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-[#D99535] font-bold">
                        MISSION [{mission.index}]
                      </span>
                      <span className="px-2 py-0.5 border border-[#292929] text-[9px] uppercase tracking-wider text-neutral-400">
                        {mission.difficulty} · +{mission.xpReward} XP
                      </span>
                    </div>

                    {/* Curated Field Observation Specimen Plate */}
                    <div className="w-full aspect-[16/10] bg-[#0A0A0A] border border-[#292929] overflow-hidden relative">
                      <ResponsiveImage
                        src={mission.imageUrl}
                        alt={mission.title}
                        aspectRatio="16/9"
                        priority
                        containerClassName="w-full h-full border-0"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-black font-mono text-[9px] text-[#D99535] border border-[#292929]">
                        FIELD BRIEF SPECIMEN
                      </div>
                      {isCompleted && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#D99535] text-black font-mono font-bold text-[9px] uppercase">
                          COMPLETED ✓
                        </div>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-2xl text-[#EDEDED] tracking-tight group-hover:text-white transition-colors">
                      {mission.title}
                    </h3>
                    <span className="font-mono text-[10px] text-neutral-500 block uppercase tracking-wider">
                      {mission.domain}
                    </span>

                    <p className="text-xs sm:text-sm text-[#888888] font-sans leading-relaxed">
                      {mission.instructions}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#1C1C1C] flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-[10px] text-neutral-500 uppercase">
                      SUBMISSION: PHOTO + CAPTION
                    </span>
                    <Button
                      variant={isCompleted ? "secondary" : "primary"}
                      size="sm"
                      onClick={() => openMissionModal(mission)}
                      icon={<IconViewfinder className="w-3.5 h-3.5" />}
                    >
                      {isCompleted ? "Update Field Log" : "Accept Brief"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        /* Personal Visual Journal & Submissions */
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#292929] pb-4 font-mono text-xs gap-3">
            <span className="text-[#D99535] font-bold uppercase tracking-widest flex items-center gap-2">
              <IconFieldJournal className="w-4 h-4" />
              <span>RECORDED FIELD OBSERVATIONS & SIGHTINGS</span>
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={openNewNoteModal}
              icon={<IconViewfinder className="w-3.5 h-3.5" />}
            >
              + New Journal Entry
            </Button>
          </div>

          {state.journal.entries.length === 0 ? (
            /* Authentic Empty State */
            <div className="border border-[#292929] bg-[#111111] p-12 text-center space-y-4">
              <div className="w-12 h-12 border border-[#292929] bg-[#141414] flex items-center justify-center text-neutral-400 mx-auto">
                <IconViewfinder className="w-6 h-6 text-neutral-400" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-xl text-[#EDEDED]">
                  Your Visual Journal is Empty
                </h3>
                <p className="text-xs text-[#888888] font-sans max-w-md mx-auto leading-relaxed">
                  You haven't recorded any real-world design observations or completed missions yet. Accept an observation mission or log a spontaneous urban design finding to build your perceptual archive.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('missions')}
              >
                Browse Observation Missions →
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.journal.entries.map((entry) => (
                <div key={entry.id} className="p-6 bg-[#141414] border border-[#292929] flex flex-col justify-between space-y-4 group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
                      <span>{entry.createdAt}</span>
                      <span className="uppercase text-[#D99535] px-2 py-0.5 border border-[#292929] text-[9px]">
                        {entry.category}
                      </span>
                    </div>

                    {entry.imageRef && (
                      <div className="relative w-full aspect-[16/10] bg-[#0A0A0A] border border-[#292929] overflow-hidden">
                        <img
                          src={entry.imageRef}
                          alt={entry.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <h4 className="font-display font-bold text-lg text-white group-hover:text-[#D99535] transition-colors">
                      {entry.title}
                    </h4>

                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      {entry.observationText}
                    </p>

                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {entry.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-[#1F1F1F] text-neutral-400 font-mono text-[9px]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#292929] flex items-center justify-between">
                    <span className="font-mono text-[9px] text-neutral-600 uppercase">
                      ID: {entry.id.slice(-6)}
                    </span>
                    <button
                      onClick={() => {
                        sound.click();
                        setEntryToDelete(entry.id);
                      }}
                      className="font-mono text-xs text-neutral-500 hover:text-red-400 cursor-pointer min-h-[36px] px-2"
                    >
                      Delete Log
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Mascot Companion Lockup */}
      <section className="border border-[#292929] bg-[#111111] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <Mascot variant="side" size="md" animate alt="PERCEPT Look Again Guide" />
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] text-[#D99535] uppercase tracking-widest font-bold">
              THE OBSERVATIONAL MUSCLE
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#EDEDED] tracking-tight">
              Notice what others walk past.
            </h3>
            <p className="text-xs sm:text-sm text-[#888888] font-sans max-w-xl leading-relaxed">
              Great designers have an insatiable curiosity for mechanical details, sidewalk rhythms, and unintended affordances. Look Again transforms your daily commute into an active perceptual laboratory.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => {
            sound.click();
            setActiveTab('missions');
          }}
        >
          View Active Missions →
        </Button>
      </section>

      {/* Observation Submission / Entry Modal */}
      {(activeMission || isCustomNoteOpen) && (
        <Modal
          isOpen={Boolean(activeMission || isCustomNoteOpen)}
          onClose={() => {
            setActiveMission(null);
            setIsCustomNoteOpen(false);
          }}
          title={activeMission ? `LOG FIELD BRIEF // ${activeMission.index}` : 'NEW VISUAL OBSERVATION'}
          subtitle={activeMission ? activeMission.title : 'Record design anomalies and real-world patterns'}
          maxWidth="lg"
        >
          <div className="space-y-6">
            {/* Image Preview / Upload Area */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block">
                FIELD PHOTOGRAPH / VISUAL RECORD
              </label>

              <div className="relative w-full aspect-[16/9] bg-[#0A0A0A] border border-[#292929] overflow-hidden flex items-center justify-center">
                {uploadedImagePreview ? (
                  <img
                    src={uploadedImagePreview}
                    alt="Field specimen preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center space-y-2 text-neutral-500 font-mono text-xs">
                    <IconViewfinder className="w-8 h-8 mx-auto" />
                    <span>NO IMAGE SELECTED</span>
                  </div>
                )}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <label className="px-3 py-1.5 bg-black/90 border border-[#292929] text-xs font-mono text-white cursor-pointer hover:border-white transition-colors">
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Title Input */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block">
                OBSERVATION TITLE
              </label>
              <input
                type="text"
                value={entryTitle}
                onChange={(e) => setEntryTitle(e.target.value)}
                placeholder="e.g. Broken baseline alignment on 42nd St signage"
                className="w-full bg-[#111111] border border-[#292929] px-3 py-2 text-sm text-white font-sans focus:outline-none focus:border-neutral-400"
              />
            </div>

            {/* Category / Discipline */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block">
                  PRIMARY DOMAIN
                </label>
                <input
                  type="text"
                  value={entryCategory}
                  onChange={(e) => setEntryCategory(e.target.value)}
                  placeholder="e.g. Typography, Ergonomics, Spatial"
                  className="w-full bg-[#111111] border border-[#292929] px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neutral-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block">
                  TAGS (COMMA-SEPARATED)
                </label>
                <input
                  type="text"
                  value={entryTags}
                  onChange={(e) => setEntryTags(e.target.value)}
                  placeholder="e.g. Norman Door, Affordance"
                  className="w-full bg-[#111111] border border-[#292929] px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neutral-400"
                />
              </div>
            </div>

            {/* Notes / Reflection Textarea */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block">
                FIELD NOTES & PERCEPTUAL ANALYSIS
              </label>
              <textarea
                value={entryNotes}
                onChange={(e) => setEntryNotes(e.target.value)}
                rows={3}
                placeholder="Describe what caught your eye. Why did the designer fail or succeed? What cognitive heuristic or visual principle is at play?"
                className="w-full bg-[#111111] border border-[#292929] p-3 text-xs text-neutral-200 font-sans focus:outline-none focus:border-neutral-400 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#292929] flex flex-wrap items-center justify-between gap-3">
              <div className="font-mono text-xs text-[#D99535]">
                REWARD: +{activeMission ? activeMission.xpReward : 50} XP
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setActiveMission(null);
                    setIsCustomNoteOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSubmitLog}
                >
                  Save to Visual Journal
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {entryToDelete && (
        <Modal
          isOpen={Boolean(entryToDelete)}
          onClose={() => setEntryToDelete(null)}
          title="CONFIRM DELETION"
          subtitle="Permanent removal from Visual Journal"
          maxWidth="sm"
        >
          <div className="space-y-4">
            <p className="text-sm text-neutral-300 font-sans leading-relaxed">
              Are you sure you want to delete this observation log from your personal Visual Journal? This action cannot be undone.
            </p>
            <div className="pt-4 border-t border-[#292929] flex justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEntryToDelete(null)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  handleDeleteEntry(entryToDelete);
                  setEntryToDelete(null);
                }}
              >
                Delete Log
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
