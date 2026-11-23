import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { sound } from '../../../utils/audio';
import { ResponsiveImage } from '../../media/ResponsiveImage';
import {
  IconCoordinateMarker,
  IconDiscovery,
  IconPrecisionCheck,
  IconArrowRight,
} from '../../ui/icons';

interface GeoLocationOption {
  id: string;
  region: string;
  country: string;
  coords: string;
  architect: string;
  isCorrect: boolean;
  description: string;
}

interface InteractiveGeoGuessrGameProps {
  onComplete: (isCorrect: boolean, earnedXp: number, score: number) => void;
}

export const InteractiveGeoGuessrGame: React.FC<InteractiveGeoGuessrGameProps> = ({ onComplete }) => {
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [revealedClues, setRevealedClues] = useState<number>(1);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const CLUES = [
    'Visual Clue 1: The building utilizes deep concrete brise-soleil (sun-breakers) calibrated for extreme subtropical heat and monsoon winds.',
    'Visual Clue 2: Commissioned directly after 1947 independence by Prime Minister Jawaharlal Nehru as a bold symbol of modern nationhood.',
    'Visual Clue 3: The master architect coined the architectural term "béton brut" (raw unadorned concrete) while creating this complex.',
  ];

  const LOCATIONS: GeoLocationOption[] = [
    {
      id: 'A',
      region: 'Chandigarh, Punjab',
      country: 'India',
      coords: '30.7525° N, 76.8055° E',
      architect: 'Le Corbusier & Pierre Jeanneret',
      isCorrect: true,
      description: 'The monumental Capitol Complex: Palace of Assembly, Secretariat & High Court.',
    },
    {
      id: 'B',
      region: 'Brasília, Federal District',
      country: 'Brazil',
      coords: '15.7975° S, 47.8640° W',
      architect: 'Oscar Niemeyer & Lúcio Costa',
      isCorrect: false,
      description: 'Curvilinear white concrete pilotis and hyperbolic cathedral vaults.',
    },
    {
      id: 'C',
      region: 'Dhaka',
      country: 'Bangladesh',
      coords: '23.7629° N, 90.3787° E',
      architect: 'Louis Kahn',
      isCorrect: false,
      description: 'Monumental red brick with massive geometric triangular and circular cutouts.',
    },
    {
      id: 'D',
      region: 'Helsinki',
      country: 'Finland',
      coords: '60.1699° N, 24.9384° E',
      architect: 'Alvar Aalto',
      isCorrect: false,
      description: 'Nordic classicism utilizing tactile red brick, grass steps, and brass louvers.',
    },
  ];

  const handleSelectPin = (id: string) => {
    if (isVerified) return;
    sound.click();
    setSelectedPin(id);
  };

  const handleRevealClue = () => {
    sound.click();
    setRevealedClues((prev) => Math.min(CLUES.length, prev + 1));
  };

  const handleVerify = () => {
    if (!selectedPin || isVerified) return;
    sound.success();
    setIsVerified(true);
  };

  const handleProceed = () => {
    sound.click();
    const correct = selectedPin === 'A';
    const xp = correct ? 90 : 35;
    onComplete(correct, xp, correct ? 100 : 40);
  };

  return (
    <div className="w-full bg-[#141414] border border-[#292929] p-6 sm:p-10 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#292929]">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 bg-white text-black font-bold uppercase tracking-widest text-[10px]">
              LAB 02 · FORENSIC GEOGUESSR
            </span>
            <span className="px-2 py-0.5 border border-[#292929] text-neutral-400 uppercase text-[10px]">
              ARCHITECTURAL DEDUCTION
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#EDEDED] tracking-tight">
            Monolithic Béton Brut & Monumental Sun-Breakers
          </h2>
        </div>
        <div className="font-mono text-xs text-[#D99535] font-bold flex items-center gap-1.5 shrink-0">
          <IconCoordinateMarker className="w-3.5 h-3.5" />
          <span>PROGRESSIVE DOSSIER</span>
        </div>
      </div>

      {/* Visual Specimen with Authentic Architectural Plate */}
      <div className="w-full bg-[#0A0A0A] border border-[#292929] overflow-hidden relative">
        <div className="relative w-full aspect-video sm:aspect-[21/9] bg-[#0A0A0A] flex flex-col justify-end overflow-hidden">
          <ResponsiveImage
            src="/assets/specimens/chandigarh-capitol.svg"
            alt="Chandigarh Capitol Complex Palace of Assembly Architectural Plate"
            aspectRatio="21/9"
            objectFit="cover"
            priority
            containerClassName="w-full h-full border-0"
          />

          {/* Camera Viewfinder Reticle */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 font-mono text-[9px] text-white bg-black px-2.5 py-1 border border-[#292929] uppercase tracking-wider">
            OPTICAL SPECIMEN · FOV 84° · RETICLE LOCKED · LAT 30.7525° N
          </div>

          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 bg-[#0A0A0A] p-3 sm:p-4 border border-[#292929] max-w-xl">
            <span className="font-mono text-[10px] text-[#D99535] uppercase tracking-widest block font-bold mb-1">
              FIELD OBSERVATION EVIDENCE
            </span>
            <p className="text-xs text-[#EDEDED] font-sans leading-relaxed line-clamp-3 sm:line-clamp-none">
              Examine the raw board-marked concrete (béton brut), massive climate-shading fins (brise-soleil), and sculptured water spouts engineered to channel extreme monsoon downpours away from the civic plaza.
            </p>
          </div>
        </div>
      </div>

      {/* Progressive Clues System */}
      <div className="p-6 bg-[#0A0A0A] border border-[#292929] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconDiscovery className="w-4 h-4 text-[#D99535]" />
            <span className="font-mono text-xs font-bold text-neutral-300 uppercase tracking-wider">
              FIELD CLUES ({revealedClues} OF {CLUES.length} DECRYPTED)
            </span>
          </div>

          {revealedClues < CLUES.length && !isVerified && (
            <button
              onClick={handleRevealClue}
              className="font-mono text-xs text-[#D99535] hover:text-white underline cursor-pointer uppercase"
            >
              + Reveal Clue {revealedClues + 1}
            </button>
          )}
        </div>

        <div className="space-y-2">
          {CLUES.slice(0, revealedClues).map((clue, idx) => (
            <div key={idx} className="p-3 bg-[#141414] border border-[#292929] font-sans text-xs text-neutral-300">
              {clue}
            </div>
          ))}
        </div>
      </div>

      {/* Geo Location Deduction Grid */}
      <div className="space-y-4">
        <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase block">
          SELECT THE AUTHENTIC LOCATION & ARCHITECTURAL PAIRING:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LOCATIONS.map((loc) => {
            const isSelected = selectedPin === loc.id;
            return (
              <div
                key={loc.id}
                onClick={() => handleSelectPin(loc.id)}
                className={`p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#181818] border-white text-white'
                    : 'bg-[#141414] border-[#292929] text-neutral-400 hover:border-neutral-500 hover:text-neutral-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-neutral-500">
                      [{loc.id}] {loc.coords}
                    </span>
                    {isSelected && (
                      <div className="w-4 h-4 bg-white text-black flex items-center justify-center">
                        <IconPrecisionCheck className="w-3 h-3 text-black" />
                      </div>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#EDEDED] mb-1">
                    {loc.region}, {loc.country}
                  </h3>
                  <p className="font-mono text-[11px] text-[#D99535] mb-2 font-medium">
                    ARCHITECT: {loc.architect}
                  </p>
                  <p className="text-xs text-[#888888] font-sans leading-relaxed">
                    {loc.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verify / Next Button */}
      {!isVerified ? (
        <div className="flex justify-end pt-2">
          <Button
            variant="primary"
            size="lg"
            disabled={!selectedPin}
            onClick={handleVerify}
            icon={<IconArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Confirm Architectural Deduction
          </Button>
        </div>
      ) : (
        <div className="p-6 bg-[#0A0A0A] border border-[#292929] flex flex-col sm:flex-row items-center justify-between gap-6 animate-fadeIn">
          <div className="text-xs sm:text-sm text-[#EDEDED] font-sans leading-relaxed">
            <span className="text-white font-bold block mb-1 font-mono uppercase text-xs">
              DEDUCTION VERIFIED: CHANDIGARH CAPITOL COMPLEX (1951–1965)
            </span>
            Le Corbusier and his cousin Pierre Jeanneret designed the monumental Capitol Complex in Punjab after Indian independence. The sculptural concrete fins (brise-soleil) became one of the definitive archetypes of tropical modernism.
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleProceed}
            icon={<IconArrowRight className="w-4 h-4" />}
            iconPosition="right"
            className="shrink-0"
          >
            Continue to Next Specimen
          </Button>
        </div>
      )}

    </div>
  );
};
