import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mascot } from '../mascot/Mascot';
import { UserProfile } from '../../types/game';
import { sound } from '../../utils/audio';
import {
  IconClose,
  IconCadence,
  IconXP,
  IconCoordinateDatum,
  IconDesignerDossier,
  IconSpecimenSheets,
  IconAnalyticalReasoning,
} from '../ui/icons';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  const handleLinkClick = () => {
    sound.click();
    onClose();
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between p-3.5 border font-mono text-xs uppercase tracking-wider transition-all min-h-[48px] touch-manipulation ${
      isActive
        ? 'bg-white text-black font-bold border-white'
        : 'bg-[#111111] border-[#292929] text-neutral-400 hover:text-white hover:border-neutral-500'
    }`;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex justify-end">
      {/* Backdrop: Solid deep scrim without glassmorphism */}
      <div
        className="fixed inset-0 bg-black/85 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-xs bg-[#0A0A0A] border-l border-[#292929] p-6 flex flex-col justify-between h-full z-10 overflow-y-auto">
        
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#292929]">
            <div className="flex items-center gap-3">
              <Mascot variant="head" size="avatar" showBorder />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-[#EDEDED]">
                  PERCEPT
                </span>
                <span className="font-mono text-[8px] text-[#888888] tracking-widest uppercase">
                  FOR THE NERDS. BY THE NERDS. OF THE NERDS.
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                sound.click();
                onClose();
              }}
              className="w-12 h-12 min-w-[48px] min-h-[48px] bg-[#141414] border border-[#292929] text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors touch-manipulation"
              aria-label="Close menu"
            >
              <IconClose className="w-4 h-4" />
            </button>
          </div>

          {/* Four Pillar Primary Links — Numbered Navigation System (No Unnecessary Icons) */}
          <div className="space-y-1 mb-4">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#D99535] px-1 font-bold">
              CORE PILLARS
            </span>
            <nav className="space-y-1.5 pt-1">
              <NavLink to="/learn" onClick={handleLinkClick} className={navLinkClass}>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#D99535]">01</span>
                  <span>LEARN · ARCHIVE</span>
                </div>
                <span className="font-mono text-[10px] text-neutral-500">INDEX</span>
              </NavLink>

              <NavLink to="/" end onClick={handleLinkClick} className={navLinkClass}>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#D99535]">02</span>
                  <span>PLAY · EXPEDITION</span>
                </div>
                <span className="font-mono text-[10px] text-neutral-500">ACTIVE</span>
              </NavLink>

              <NavLink to="/think" onClick={handleLinkClick} className={navLinkClass}>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#D99535]">03</span>
                  <span>THINK · APTITUDE</span>
                </div>
                <span className="font-mono text-[10px] text-neutral-500">LAB</span>
              </NavLink>

              <NavLink to="/explore" onClick={handleLinkClick} className={navLinkClass}>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#D99535]">04</span>
                  <span>EXPLORE · LOOK AGAIN</span>
                </div>
                <span className="font-mono text-[10px] text-neutral-500">FIELD</span>
              </NavLink>
            </nav>
          </div>

          {/* Secondary Utility Links */}
          <div className="space-y-1 pt-2 border-t border-[#1C1C1C]">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 px-1 font-bold">
              SYSTEM UTILITIES
            </span>
            <nav className="space-y-1 pt-1">
              <NavLink to="/profile" onClick={handleLinkClick} className={navLinkClass}>
                <div className="flex items-center gap-2.5">
                  <IconDesignerDossier className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Designer Dossier</span>
                </div>
              </NavLink>

              <NavLink to="/curriculum" onClick={handleLinkClick} className={navLinkClass}>
                <div className="flex items-center gap-2.5">
                  <IconSpecimenSheets className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Pedagogy Curriculum</span>
                </div>
              </NavLink>

              <NavLink to="/design-system" onClick={handleLinkClick} className={navLinkClass}>
                <div className="flex items-center gap-2.5">
                  <IconAnalyticalReasoning className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Design Tokens Spec</span>
                </div>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* User Mini Stats Footer */}
        <div className="p-4 bg-[#141414] border border-[#292929] space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-neutral-400">
            <span>STREAK</span>
            <span className="text-white font-bold flex items-center gap-1.5">
              <IconCadence className="w-3.5 h-3.5 text-neutral-400" />
              {profile.currentStreak} DAYS
            </span>
          </div>
          <div className="flex items-center justify-between text-neutral-400">
            <span>TOTAL XP</span>
            <span className="text-white font-bold flex items-center gap-1.5">
              <IconXP className="w-3.5 h-3.5 text-neutral-400" />
              {profile.totalXp} XP
            </span>
          </div>
          <div className="flex items-center justify-between text-neutral-400">
            <span>RATING</span>
            <span className="text-neutral-200 font-bold flex items-center gap-1.5">
              <IconCoordinateDatum className="w-3.5 h-3.5 text-neutral-400" />
              {profile.adaptiveRating} ELO
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
