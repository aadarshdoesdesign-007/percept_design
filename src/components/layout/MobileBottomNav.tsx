import React from 'react';
import { NavLink } from 'react-router-dom';
import { sound } from '../../utils/audio';
import {
  IconOpenBook,
  IconSurveyMarker,
  IconSpatialReasoning,
  IconViewfinder,
  IconDesignerDossier,
} from '../ui/icons';

export const MobileBottomNav: React.FC = () => {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex-1 flex flex-col items-center justify-center py-2 px-1 transition-colors select-none min-h-[48px] min-w-[48px] touch-manipulation ${
      isActive
        ? 'text-white bg-[#181818] border-t-2 border-white'
        : 'text-neutral-400 hover:text-white border-t-2 border-transparent'
    }`;

  const playNavItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex-1 flex flex-col items-center justify-center py-2 px-1 transition-colors select-none min-h-[48px] min-w-[48px] touch-manipulation ${
      isActive
        ? 'text-white bg-[#222222] border-t-2 border-[#D99535]'
        : 'text-neutral-200 hover:text-white border-t-2 border-transparent bg-[#141414]'
    }`;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A] border-t border-[#292929] flex items-center justify-around pb-[env(safe-area-inset-bottom,0px)]"
      aria-label="Mobile Bottom Navigation"
    >
      <NavLink
        to="/learn"
        onClick={() => sound.click()}
        className={navItemClass}
      >
        <IconOpenBook className="w-4 h-4 mb-1" />
        <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">01 Learn</span>
      </NavLink>

      <NavLink
        to="/"
        end
        onClick={() => sound.click()}
        className={playNavItemClass}
      >
        <IconSurveyMarker className="w-4 h-4 mb-1 text-[#D99535]" />
        <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-white">02 Play</span>
      </NavLink>

      <NavLink
        to="/think"
        onClick={() => sound.click()}
        className={navItemClass}
      >
        <IconSpatialReasoning className="w-4 h-4 mb-1" />
        <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">03 Think</span>
      </NavLink>

      <NavLink
        to="/explore"
        onClick={() => sound.click()}
        className={navItemClass}
      >
        <IconViewfinder className="w-4 h-4 mb-1" />
        <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">04 Explore</span>
      </NavLink>

      <NavLink
        to="/profile"
        onClick={() => sound.click()}
        className={navItemClass}
      >
        <IconDesignerDossier className="w-4 h-4 mb-1" />
        <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">Profile</span>
      </NavLink>
    </nav>
  );
};
