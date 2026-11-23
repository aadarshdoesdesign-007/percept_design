import React, { useState } from 'react';
import { Mascot } from '../components/mascot/Mascot';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { sound } from '../utils/audio';
import {
  IconAnalyticalReasoning,
  IconSurveyMarker,
  IconPrecisionCheck,
  IconOpenBook,
  IconSpecimenSheets,
  IconDiscovery,
  IconCadence,
  IconXP,
  IconVisualReasoning,
  IconSpatialReasoning,
  IconLogicalReasoning,
  IconCreativeReasoning,
  IconCoordinateDatum,
  IconMockExam,
  IconGeometricEye,
  IconViewfinder,
  IconFieldJournal,
  IconCoordinateMarker,
  IconTechnicalClock,
  IconArrowRight,
  IconArrowLeft,
  IconArrowUpRight,
  IconClose,
  IconRecalibrate,
  IconCopySpecimen,
  IconAudioOn,
  IconDesignerDossier,
  IconVerificationSeal,
} from '../components/ui/icons';

export const DesignSystemPage: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToken = (name: string, val: string) => {
    sound.click();
    navigator.clipboard.writeText(val);
    setCopiedToken(name);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const COLOR_PALETTE = [
    { name: 'Canvas Background', token: '#0A0A0A', desc: 'Main canvas matte dark substrate' },
    { name: 'Primary Surface', token: '#141414', desc: 'High-contrast structural card background' },
    { name: 'Secondary Surface', token: '#111111', desc: 'Recessed containers and drawer navigation' },
    { name: 'Primary Text', token: '#EDEDED', desc: 'High-legibility primary editorial content' },
    { name: 'Muted Text', token: '#888888', desc: 'Explanatory body copy and secondary descriptions' },
    { name: 'Primary Action / CTA', token: '#FFFFFF', desc: 'Solid high-contrast inverted white actions' },
    { name: 'Hairline Border', token: '#292929', desc: '1px structural grid lines and hairline dividers' },
    { name: 'Mascot Accent Gold', token: '#D99535', desc: 'Selective highlights & progress indicators' },
    { name: 'Restrained Success', token: '#10B981', desc: 'Subtle calibration match indication' },
    { name: 'Restrained Error', token: '#EF4444', desc: 'Subtle misalignment alert indication' },
  ];

  const ICON_SHOWCASE = [
    { name: 'IconOpenBook', component: <IconOpenBook className="w-5 h-5" />, category: '01 LEARN' },
    { name: 'IconSpecimenSheets', component: <IconSpecimenSheets className="w-5 h-5" />, category: '01 LEARN' },
    { name: 'IconDiscovery', component: <IconDiscovery className="w-5 h-5" />, category: '01 LEARN' },
    { name: 'IconSurveyMarker', component: <IconSurveyMarker className="w-5 h-5" />, category: '02 PLAY' },
    { name: 'IconCadence', component: <IconCadence className="w-5 h-5" />, category: '02 PLAY' },
    { name: 'IconXP', component: <IconXP className="w-5 h-5" />, category: '02 PLAY' },
    { name: 'IconPrecisionCheck', component: <IconPrecisionCheck className="w-5 h-5" />, category: '02 PLAY' },
    { name: 'IconVisualReasoning', component: <IconVisualReasoning className="w-5 h-5" />, category: '03 THINK' },
    { name: 'IconSpatialReasoning', component: <IconSpatialReasoning className="w-5 h-5" />, category: '03 THINK' },
    { name: 'IconLogicalReasoning', component: <IconLogicalReasoning className="w-5 h-5" />, category: '03 THINK' },
    { name: 'IconAnalyticalReasoning', component: <IconAnalyticalReasoning className="w-5 h-5" />, category: '03 THINK' },
    { name: 'IconCreativeReasoning', component: <IconCreativeReasoning className="w-5 h-5" />, category: '03 THINK' },
    { name: 'IconCoordinateDatum', component: <IconCoordinateDatum className="w-5 h-5" />, category: '03 THINK' },
    { name: 'IconMockExam', component: <IconMockExam className="w-5 h-5" />, category: '03 THINK' },
    { name: 'IconGeometricEye', component: <IconGeometricEye className="w-5 h-5" />, category: '04 EXPLORE' },
    { name: 'IconViewfinder', component: <IconViewfinder className="w-5 h-5" />, category: '04 EXPLORE' },
    { name: 'IconFieldJournal', component: <IconFieldJournal className="w-5 h-5" />, category: '04 EXPLORE' },
    { name: 'IconCoordinateMarker', component: <IconCoordinateMarker className="w-5 h-5" />, category: '04 EXPLORE' },
    { name: 'IconTechnicalClock', component: <IconTechnicalClock className="w-5 h-5" />, category: 'UTILITY' },
    { name: 'IconArrowRight', component: <IconArrowRight className="w-5 h-5" />, category: 'UTILITY' },
    { name: 'IconArrowLeft', component: <IconArrowLeft className="w-5 h-5" />, category: 'UTILITY' },
    { name: 'IconArrowUpRight', component: <IconArrowUpRight className="w-5 h-5" />, category: 'UTILITY' },
    { name: 'IconClose', component: <IconClose className="w-5 h-5" />, category: 'UTILITY' },
    { name: 'IconRecalibrate', component: <IconRecalibrate className="w-5 h-5" />, category: 'UTILITY' },
    { name: 'IconCopySpecimen', component: <IconCopySpecimen className="w-5 h-5" />, category: 'UTILITY' },
    { name: 'IconAudioOn', component: <IconAudioOn className="w-5 h-5" />, category: 'UTILITY' },
    { name: 'IconDesignerDossier', component: <IconDesignerDossier className="w-5 h-5" />, category: 'UTILITY' },
    { name: 'IconVerificationSeal', component: <IconVerificationSeal className="w-5 h-5" />, category: 'UTILITY' },
  ];

  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-16 animate-fadeIn">
      
      {/* Page Header */}
      <section className="border-b border-[#292929] pb-8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-3">
          <span className="px-2 py-0.5 bg-white text-black font-bold uppercase tracking-widest text-[10px] whitespace-nowrap">
            DESIGN TOKENS · SPEC V2.0
          </span>
          <span className="text-neutral-500">/</span>
          <span className="text-[#D99535] font-semibold whitespace-nowrap">
            SWISS EDITORIAL DARK SYSTEM
          </span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-6xl text-[#EDEDED] tracking-tight leading-[1.04]">
          PERCEPT Design Tokens & Standards
        </h1>
        <p className="text-xs sm:text-sm text-[#888888] font-sans mt-3 max-w-3xl leading-relaxed">
          A restrained, high-contrast visual system optimized for optical precision training. Built strictly on dark matte surfaces, hairline borders (#292929), and authoritative grotesque typography.
        </p>
      </section>

      {/* 1. Color Palette Tokens */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-[#292929]">
          <IconAnalyticalReasoning className="w-4 h-4 text-[#D99535]" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-300">
            01 · COLOR SYSTEM SPECIFICATIONS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COLOR_PALETTE.map((color) => (
            <div
              key={color.name}
              onClick={() => copyToken(color.name, color.token)}
              className="p-5 bg-[#141414] border border-[#292929] hover:border-neutral-500 transition-all cursor-pointer group flex items-start gap-4"
            >
              <div
                className="w-10 h-10 shrink-0 border border-[#292929]"
                style={{ backgroundColor: color.token }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-mono text-xs font-bold text-[#EDEDED] truncate">
                    {color.name}
                  </h3>
                  <span className="font-mono text-[10px] text-neutral-500 group-hover:text-white">
                    {copiedToken === color.name ? 'COPIED!' : color.token}
                  </span>
                </div>
                <p className="text-[11px] text-[#888888] font-sans leading-relaxed">
                  {color.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Reusable Mascot Component Showcase */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-[#292929]">
          <IconSurveyMarker className="w-4 h-4 text-[#D99535]" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-300">
            02 · OFFICIAL MASCOT IDENTITY
          </span>
        </div>

        <div className="p-8 bg-[#141414] border border-[#292929] space-y-8">
          <div>
            <h3 className="font-display font-bold text-xl text-[#EDEDED] mb-1">
              Context Variants & Placement Modes
            </h3>
            <p className="text-xs text-[#888888] font-sans">
              Powered by local asset <code className="text-neutral-300 font-mono">public/assets/mascot/mascot.png</code> with true alpha transparency. Supports circular cropped headshots, full-standing companion stance, and side walking indicators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Head Avatar */}
            <div className="p-6 bg-[#0A0A0A] border border-[#292929] flex flex-col items-center text-center">
              <Mascot variant="head" size="md" showBorder className="mb-4" />
              <span className="font-mono text-xs font-bold mb-1 text-white uppercase">VARIANT: 'HEAD'</span>
              <p className="text-xs text-[#888888] font-sans">
                Cropped headshot badge for Top Navigation and User Profile.
              </p>
            </div>

            {/* Front View */}
            <div className="p-6 bg-[#0A0A0A] border border-[#292929] flex flex-col items-center text-center">
              <Mascot variant="front" size="md" animate className="mb-4" />
              <span className="font-mono text-xs font-bold mb-1 text-white uppercase">VARIANT: 'FRONT'</span>
              <p className="text-xs text-[#888888] font-sans">
                Full-standing companion with subtle floating animation for Hero & Results.
              </p>
            </div>

            {/* Side Walking Profile */}
            <div className="p-6 bg-[#0A0A0A] border border-[#292929] flex flex-col items-center text-center">
              <Mascot variant="side" size="md" className="mb-4" />
              <span className="font-mono text-xs font-bold mb-1 text-white uppercase">VARIANT: 'SIDE'</span>
              <p className="text-xs text-[#888888] font-sans">
                Side-profile walking stance for drawer navigation and transition markers.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Button Component Hierarchy */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-[#292929]">
          <IconPrecisionCheck className="w-4 h-4 text-[#D99535]" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-300">
            03 · ACTION CONTROLS & INTERACTIVE BUTTONS
          </span>
        </div>

        <div className="p-8 bg-[#141414] border border-[#292929] space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" onClick={() => sound.click()}>
              Primary Solid White
            </Button>
            <Button variant="secondary" onClick={() => sound.click()}>
              Secondary Surface
            </Button>
            <Button variant="outline" onClick={() => sound.click()}>
              Outline Border
            </Button>
            <Button variant="ghost" onClick={() => sound.click()}>
              Ghost Link
            </Button>
            <Button variant="danger" onClick={() => sound.click()}>
              Restrained Alert
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Badges & Chips */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-[#292929]">
          <IconOpenBook className="w-4 h-4 text-[#D99535]" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-300">
            04 · ARCHIVAL BADGES & MONOSPACE LABELS
          </span>
        </div>

        <div className="p-8 bg-[#141414] border border-[#292929]">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">Accent Inverted</Badge>
            <Badge variant="neutral">Neutral Substrate</Badge>
            <Badge variant="success">Restrained Success</Badge>
            <Badge variant="warning">Warning Threshold</Badge>
            <Badge variant="danger">Error Alert</Badge>
          </div>
        </div>
      </section>

      {/* 5. Systematic Technical Iconography */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-[#292929]">
          <IconCoordinateDatum className="w-4 h-4 text-[#D99535]" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-300">
            05 · SWISS ICONOGRAPHY & TECHNICAL ANNOTATIONS (1.5PX STROKE)
          </span>
        </div>

        <div className="p-8 bg-[#141414] border border-[#292929] space-y-6">
          <p className="text-xs text-[#888888] font-sans max-w-2xl leading-relaxed">
            All interface symbols adhere to a uniform 1.5px stroke weight, monochrome default styling, strict bounding metrics, and zero generic AI SaaS treatments (no generic sparkles, flames, brains or trophies).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {ICON_SHOWCASE.map((item) => (
              <div
                key={item.name}
                className="p-3.5 bg-[#0A0A0A] border border-[#292929] flex flex-col items-center text-center gap-2.5 group hover:border-neutral-500 transition-colors"
              >
                <div className="w-8 h-8 flex items-center justify-center text-neutral-300 group-hover:text-white transition-colors">
                  {item.component}
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] text-[#D99535] uppercase block">
                    {item.category}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-400 truncate block max-w-full">
                    {item.name.replace('Icon', '')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
