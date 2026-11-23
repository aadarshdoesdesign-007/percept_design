import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { MobileBottomNav } from './MobileBottomNav';
import { Footer } from './Footer';
import { UserProfile } from '../../types/game';

interface AppShellProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const AppShell: React.FC<AppShellProps> = ({ profile, onUpdateProfile: _onUpdateProfile }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans antialiased flex flex-col justify-between selection:bg-white selection:text-black">
      
      {/* Top Fixed Header */}
      <Header
        profile={profile}
        onOpenMobileNav={() => setIsMobileNavOpen(true)}
        onOpenProfile={() => navigate('/profile')}
      />

      {/* Mobile Slide-out Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        profile={profile}
      />

      {/* Main Content Area with safe-area spacing and bottom padding for mobile navigation */}
      <main className="w-full flex-1 pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-16">
        <Outlet />
      </main>

      {/* Persistent Mobile Bottom Navigation Bar (4 Pillars) */}
      <MobileBottomNav />

      {/* Swiss-editorial Footer */}
      <Footer />

    </div>
  );
};
