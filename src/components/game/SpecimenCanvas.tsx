import React from 'react';
import { VisualSpecimenData } from '../../types/game';
import { ResponsiveImage } from '../media/ResponsiveImage';

interface SpecimenCanvasProps {
  specimen: VisualSpecimenData;
}

export const SpecimenCanvas: React.FC<SpecimenCanvasProps> = ({ specimen }) => {
  return (
    <div className="w-full bg-[#0A0A0A] border border-[#292929] overflow-hidden relative select-none">
      
      {/* Specimen Technical Header Plaque */}
      <div className="px-6 py-3 border-b border-[#292929] bg-[#111111] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-[#D99535]" />
          <span className="text-white uppercase tracking-widest font-bold">
            {specimen.title || 'ARCHIVAL SPECIMEN'}
          </span>
        </div>
        <div className="flex items-center gap-4 text-neutral-500 uppercase text-[10px]">
          <span>{specimen.subtitle || 'OPTICAL ARTIFACT'}</span>
          <span>·</span>
          <span>SCALE: 1:1 FIELD VIEW</span>
        </div>
      </div>

      {/* Main Specimen Display Gallery */}
      <div className="p-4 sm:p-8 lg:p-12 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[420px] bg-[#0A0A0A] relative">
        
        {/* Subtle Archival Crosshair Markers in Corners */}
        <div className="absolute top-3 left-3 font-mono text-[9px] text-neutral-700 select-none">+0.0</div>
        <div className="absolute top-3 right-3 font-mono text-[9px] text-neutral-700 select-none">+1.0</div>
        <div className="absolute bottom-3 left-3 font-mono text-[9px] text-neutral-700 select-none">-0.0</div>
        <div className="absolute bottom-3 right-3 font-mono text-[9px] text-neutral-700 select-none">-1.0</div>

        {/* Specimen 1: Swiss Akzidenz Typography Poster */}
        {specimen.id === 'swiss-poster' && (
          <div className="w-full max-w-lg p-2 bg-[#141414] border border-[#292929] flex flex-col items-center">
            <ResponsiveImage
              src={specimen.imageUrl || '/assets/specimens/swiss-poster.svg'}
              alt="Swiss International Typographic Style Poster 1958"
              aspectRatio="3/4"
              priority
              containerClassName="w-full"
            />
          </div>
        )}

        {/* Specimen 2: Memphis Group Radical Post-Modernism */}
        {specimen.id === 'memphis-totem' && (
          <div className="w-full max-w-lg p-2 bg-[#141414] border border-[#292929] flex flex-col items-center">
            <ResponsiveImage
              src={specimen.imageUrl || '/assets/specimens/memphis-totem.svg'}
              alt="Memphis Group Casablanca Totem by Ettore Sottsass 1981"
              aspectRatio="3/4"
              priority
              containerClassName="w-full"
            />
          </div>
        )}

        {/* Specimen 3: Visual GeoGuessr - Chandigarh Brutalism */}
        {specimen.id === 'chandigarh-capitol' && (
          <div className="w-full max-w-3xl bg-[#141414] border border-[#292929] p-3 sm:p-4">
            <div className="relative w-full aspect-video bg-[#0A0A0A] overflow-hidden border border-[#292929] flex flex-col justify-end">
              <ResponsiveImage
                src={specimen.imageUrl || '/assets/specimens/chandigarh-capitol.svg'}
                alt="Chandigarh Capitol Complex Palace of Assembly by Le Corbusier"
                aspectRatio="16/9"
                objectFit="cover"
                priority
                containerClassName="w-full h-full border-0"
              />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 bg-[#0A0A0A] p-3 sm:p-4 border border-[#292929] max-w-xl">
                <span className="font-mono text-[10px] text-[#D99535] uppercase tracking-widest block font-bold mb-1">
                  ARCHITECTURAL FIELD EVIDENCE · CAPITOL COMPLEX
                </span>
                <span className="text-xs text-[#EDEDED] font-sans leading-relaxed line-clamp-3 sm:line-clamp-none">
                  Deep board-marked concrete fins (brise-soleil) angled at 45° to block harsh solar radiation while inducing convective thermal drafts across the monumental public esplanade.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Specimen 4: Visual GeoGuessr - Kyoto Machiya */}
        {specimen.id === 'kyoto-machiya' && (
          <div className="w-full max-w-3xl bg-[#141414] border border-[#292929] p-3 sm:p-4">
            <div className="relative w-full aspect-video bg-[#0A0A0A] overflow-hidden border border-[#292929] flex flex-col justify-end">
              <ResponsiveImage
                src={specimen.imageUrl || '/assets/specimens/kyoto-machiya.svg'}
                alt="Kyoto Traditional Machiya Townhouse Timber Latticework"
                aspectRatio="16/9"
                objectFit="cover"
                priority
                containerClassName="w-full h-full border-0"
              />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 bg-[#0A0A0A] p-3 sm:p-4 border border-[#292929] max-w-xl">
                <span className="font-mono text-[10px] text-[#D99535] uppercase tracking-widest block font-bold mb-1">
                  HISTORICAL VERNACULAR EVIDENCE · GION DISTRICT
                </span>
                <span className="text-xs text-[#EDEDED] font-sans leading-relaxed line-clamp-3 sm:line-clamp-none">
                  Narrow street frontage with fine vertical timber lattice (koushi) admitting breeze while maintaining optical privacy, paired with dark charred cedar slats (yakisugi).
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Specimen 5: Object Intelligence - Braun T3 Radio */}
        {specimen.id === 'braun-t3' && (
          <div className="w-full max-w-md p-2 bg-[#141414] border border-[#292929] flex flex-col items-center">
            <ResponsiveImage
              src={specimen.imageUrl || '/assets/specimens/braun-t3.svg'}
              alt="Braun T3 Transistor Radio by Dieter Rams 1958"
              aspectRatio="4/3"
              priority
              containerClassName="w-full aspect-[4/5]"
            />
          </div>
        )}

        {/* Specimen 6: Object Intelligence - Arco Lamp Base */}
        {specimen.id === 'arco-lamp' && (
          <div className="w-full max-w-lg p-2 bg-[#141414] border border-[#292929] flex flex-col items-center">
            <ResponsiveImage
              src={specimen.imageUrl || '/assets/specimens/arco-lamp.svg'}
              alt="Arco Floor Lamp Pierced Marble Base by Castiglioni Brothers 1962"
              aspectRatio="4/3"
              priority
              containerClassName="w-full aspect-[4/5]"
            />
          </div>
        )}

        {/* Specimen 7: Spot the Flaw - Kerning Collision */}
        {specimen.id === 'kerning-flaw' && (
          <div className="w-full py-12 px-6 bg-[#0E0E0E] border border-[#292929] flex flex-col items-center justify-center text-center">
            <div className="font-display font-bold text-5xl sm:text-7xl tracking-tight text-[#EDEDED] flex items-baseline">
              <span>AVA</span>
              <span className="text-red-400 bg-red-950/40 px-2 ml-8 border border-red-800/80">L</span>
              <span className="ml-8">ANCHE</span>
            </div>
            <span className="mt-6 font-mono text-xs text-neutral-400 uppercase tracking-widest">
              OPTICAL COLLISION POINT: ABNORMAL COUNTER-SPACE BETWEEN 'L' AND 'A'
            </span>
          </div>
        )}

        {/* Specimen 8: Spot the Flaw - Contrast Failure */}
        {specimen.id === 'contrast-flaw' && (
          <div className="w-full max-w-lg grid grid-cols-2 gap-4">
            <div className="p-6 bg-white text-black font-bold text-sm text-center border border-white">
              Primary Solid (18:1 PASS)
            </div>
            <div className="p-6 bg-[#141414] border border-[#292929] text-[#EDEDED] font-semibold text-sm text-center">
              Surface Card (12:1 PASS)
            </div>
            <div className="p-6 bg-[#1E293B] text-[#3B82F6] font-bold text-sm text-center border border-red-500">
              Blue on Slate (&lt;2.8:1 FAIL)
            </div>
            <div className="p-6 bg-[#0A0A0A] border border-emerald-500/80 text-emerald-400 font-bold text-sm text-center">
              Emerald Ghost (7:1 PASS)
            </div>
          </div>
        )}

        {/* Specimen 9: Spatial Lab - 3x3x3 Cube */}
        {specimen.id === 'cube-cut-27' && (
          <div className="w-full max-w-md flex flex-col items-center justify-center py-6">
            <div className="relative w-52 h-52 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-1.5 p-3 bg-[#1C1C1C] border border-[#292929]">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 border flex items-center justify-center font-mono text-[10px] font-bold ${
                      i === 4
                        ? 'bg-[#1f190e] border-[#D99535] text-[#D99535]'
                        : [1, 3, 5, 7].includes(i)
                        ? 'bg-[#0f1f17] border-emerald-500 text-emerald-300'
                        : 'bg-[#141414] border-[#292929] text-neutral-400'
                    }`}
                  >
                    {[1, 3, 5, 7].includes(i) ? 'EDGE' : i === 4 ? 'FACE' : 'CNR'}
                  </div>
                ))}
              </div>
            </div>
            <span className="font-mono text-xs text-neutral-400 mt-4 text-center">
              [EDGE] = 2 PAINTED FACES · [CNR] = 3 FACES · [FACE] = 1 FACE
            </span>
          </div>
        )}

        {/* Specimen 10: Spatial Lab - Cube Net */}
        {specimen.id === 'cube-net-folding' && (
          <div className="flex flex-col items-center py-4">
            <div className="grid grid-cols-3 gap-1.5">
              <div />
              <div className="w-14 h-14 bg-[#141414] border border-[#292929] flex items-center justify-center font-mono text-sm font-bold text-white">
                1
              </div>
              <div />

              <div className="w-14 h-14 bg-[#0f1f17] border border-emerald-500 flex items-center justify-center font-mono text-sm font-bold text-emerald-300">
                L
              </div>
              <div className="w-14 h-14 bg-[#141414] border border-[#292929] flex items-center justify-center font-mono text-sm font-bold text-white">
                2
              </div>
              <div className="w-14 h-14 bg-[#0f1f17] border border-emerald-500 flex items-center justify-center font-mono text-sm font-bold text-emerald-300">
                R
              </div>

              <div />
              <div className="w-14 h-14 bg-[#141414] border border-[#292929] flex items-center justify-center font-mono text-sm font-bold text-white">
                3
              </div>
              <div />

              <div />
              <div className="w-14 h-14 bg-[#141414] border border-[#292929] flex items-center justify-center font-mono text-sm font-bold text-white">
                4
              </div>
              <div />
            </div>
          </div>
        )}

        {/* Specimen 11: Visual Instinct - Optical Center */}
        {specimen.id === 'optical-center' && (
          <div className="grid grid-cols-2 gap-8 w-full max-w-lg">
            <div className="p-6 bg-[#141414] border border-[#292929] flex flex-col items-center">
              <span className="font-mono text-[10px] text-neutral-500 mb-3">[A] 50% GEOMETRIC</span>
              <div className="w-32 h-44 bg-[#0A0A0A] border border-[#292929] relative flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-neutral-500" />
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-neutral-800" />
              </div>
            </div>

            <div className="p-6 bg-[#141414] border border-white flex flex-col items-center">
              <span className="font-mono text-[10px] text-white font-bold mb-3">[B] 45% OPTICAL CENTER</span>
              <div className="w-32 h-44 bg-[#0A0A0A] border border-[#292929] relative flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white -translate-y-2.5" />
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-neutral-800" />
              </div>
            </div>
          </div>
        )}

        {/* Specimen 12: Visual Instinct - Gestalt Closure */}
        {specimen.id === 'gestalt-closure' && (
          <div className="grid grid-cols-2 gap-8 w-full max-w-lg">
            <div className="p-8 bg-[#141414] border border-white flex flex-col items-center justify-center">
              <span className="font-mono text-[10px] text-white font-bold mb-4">[A] GESTALT CLOSURE</span>
              <div className="w-24 h-24 relative flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-dashed border-white rounded-full" />
              </div>
            </div>

            <div className="p-8 bg-[#141414] border border-[#292929] flex flex-col items-center justify-center opacity-70">
              <span className="font-mono text-[10px] text-neutral-500 mb-4">[B] EXPLICIT OUTLINE</span>
              <div className="w-20 h-20 border-2 border-neutral-500 flex items-center justify-center font-mono text-xs">
                BOX
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Archival Placard Footer */}
      {specimen.caption && (
        <div className="p-4 bg-[#111111] border-t border-[#292929] text-center font-mono text-xs text-neutral-400">
          {specimen.caption}
        </div>
      )}

    </div>
  );
};
