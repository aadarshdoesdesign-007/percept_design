import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Mascot } from '../mascot/Mascot';
import { UserProfile } from '../../types/game';
import { sound } from '../../utils/audio';
import {
  IconCadence,
  IconXP,
  IconAudioOn,
  IconAudioOff,
  IconDesignerDossier,
  IconMenu,
} from '../ui/icons';

interface HeaderProps {
  profile: UserProfile;
  onOpenMobileNav: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenMobileNav,
  onOpenProfile,
}) => {
  const navigate = useNavigate();
  const [isAudioOn, setIsAudioOn] = useState(sound.enabled);

  const toggleSound = () => {
    const newState = sound.toggle();
    setIsAudioOn(newState);
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `font-mono text-xs tracking-wider uppercase transition-colors px-3.5 py-1.5 border whitespace-nowrap shrink-0 select-none ${
      isActive
        ? 'border-white bg-white text-black font-semibold'
        : 'border-transparent text-neutral-400 hover:text-white hover:border-[#292929]'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0A] border-b border-[#292929] px-3 sm:px-8 lg:px-12 py-2.5 sm:py-3 transition-colors pt-[calc(0.75rem+env(safe-area-inset-top,0px))]">
      <div className="max-w-[1500px] w-full mx-auto flex items-center justify-between gap-2 sm:gap-4 lg:gap-8 min-w-0">
        
        {/* Left: Mascot Head Crop & Brand Identity */}
        <div
          onClick={() => {
            sound.click();
            navigate('/');
          }}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
        >
          <Mascot
            variant="head"
            size="avatar"
            showBorder
            className="group-hover:scale-105 transition-transform shrink-0"
          />

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold tracking-tight text-lg sm:text-xl text-[#EDEDED] group-hover:text-white transition-colors">
                PERCEPT
              </span>
              <span className="hidden xl:inline-block font-mono text-[10px] text-neutral-500 uppercase tracking-widest whitespace-nowrap">
                / VISUAL INTELLIGENCE
              </span>
            </div>
            <span className="hidden sm:inline-block font-mono text-[9px] text-[#888888] tracking-widest uppercase whitespace-nowrap">
              FOR THE NERDS. BY THE NERDS. OF THE NERDS.
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Bar — Four Pillars */}
        <nav className="hidden md:flex items-center gap-1 bg-[#111111] p-1 border border-[#292929] shrink-0 whitespace-nowrap">
          <NavLink to="/learn" className={navItemClass}>
            <span className="text-[#D99535] mr-1.5 font-bold">01</span>Learn
          </NavLink>
          <NavLink to="/" end className={navItemClass}>
            <span className="text-[#D99535] mr-1.5 font-bold">02</span>Play
          </NavLink>
          <NavLink to="/think" className={navItemClass}>
            <span className="text-[#D99535] mr-1.5 font-bold">03</span>Think
          </NavLink>
          <NavLink to="/explore" className={navItemClass}>
            <span className="text-[#D99535] mr-1.5 font-bold">04</span>Explore
          </NavLink>
        </nav>

        {/* Right: Streak Display, XP Pill & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Tactile Audio Toggle */}
          <button
            onClick={toggleSound}
            className="w-11 h-11 min-w-[44px] min-h-[44px] bg-[#141414] border border-[#292929] text-neutral-400 hover:text-white hover:border-neutral-500 flex items-center justify-center transition-colors cursor-pointer shrink-0 touch-manipulation"
            title={isAudioOn ? 'Mute Audio' : 'Enable Audio'}
            aria-label="Toggle sound"
          >
            {isAudioOn ? (
              <IconAudioOn className="w-4 h-4 text-white" />
            ) : (
              <IconAudioOff className="w-4 h-4 text-neutral-500" />
            )}
          </button>

          {/* XP Metric */}
          <div
            onClick={() => {
              sound.click();
              navigate('/profile');
            }}
            className="hidden sm:flex items-center gap-1.5 bg-[#141414] border border-[#292929] px-3 py-1 font-mono text-xs text-neutral-300 hover:text-white hover:border-neutral-500 cursor-pointer transition-colors shrink-0 whitespace-nowrap min-h-[44px]"
          >
            <IconXP className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span>{profile.totalXp} XP</span>
          </div>

          {/* Streak Metric */}
          <div
            onClick={() => {
              sound.click();
              navigate('/');
            }}
            className="bg-white text-black px-2.5 sm:px-3.5 py-1.5 font-bold font-mono text-xs flex items-center gap-1.5 hover:bg-neutral-200 cursor-pointer transition-colors select-none border border-white shrink-0 whitespace-nowrap min-h-[44px]"
            title="Daily Active Streak"
          >
            <IconCadence className="w-3.5 h-3.5 text-black shrink-0" />
            <span className="hidden sm:inline">{profile.currentStreak} DAYS</span>
            <span className="sm:hidden">{profile.currentStreak}D</span>
          </div>

          {/* Profile Quick Button */}
          <button
            onClick={() => {
              sound.click();
              onOpenProfile();
            }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 border border-[#292929] text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer shrink-0 whitespace-nowrap min-h-[44px]"
            aria-label="Open profile modal"
          >
            <IconDesignerDossier className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
            <span>{profile.name}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              sound.click();
              onOpenMobileNav();
            }}
            className="md:hidden w-11 h-11 min-w-[44px] min-h-[44px] bg-[#141414] border border-[#292929] text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 touch-manipulation"
            aria-label="Open mobile navigation"
          >
            <IconMenu className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
};
