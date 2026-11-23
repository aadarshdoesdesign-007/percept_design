import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { PerceptProvider, usePercept } from './context/PerceptContext';

// Route Code Splitting via React.lazy()
const DailyExpeditionPage = lazy(() =>
  import('./pages/DailyExpeditionPage').then((m) => ({ default: m.DailyExpeditionPage }))
);
const LearnPage = lazy(() =>
  import('./pages/LearnPage').then((m) => ({ default: m.LearnPage }))
);
const AptitudeLabPage = lazy(() =>
  import('./pages/AptitudeLabPage').then((m) => ({ default: m.AptitudeLabPage }))
);
const ExplorePage = lazy(() =>
  import('./pages/ExplorePage').then((m) => ({ default: m.ExplorePage }))
);
const ProfilePage = lazy(() =>
  import('./pages/ProfilePage').then((m) => ({ default: m.ProfilePage }))
);
const CurriculumPage = lazy(() =>
  import('./pages/CurriculumPage').then((m) => ({ default: m.CurriculumPage }))
);
const DesignSystemPage = lazy(() =>
  import('./pages/DesignSystemPage').then((m) => ({ default: m.DesignSystemPage }))
);

// Restrained Swiss-editorial Loading Fallback
const RouteLoadingFallback = () => (
  <div className="w-full min-h-[50vh] flex items-center justify-center animate-fadeIn">
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="w-5 h-5 border-2 border-white/20 border-t-white animate-spin" />
      <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">
        CALIBRATING OPTICAL SUBSYSTEM...
      </span>
    </div>
  </div>
);

function MainApp() {
  const { legacyProfile, updateLegacyProfile } = usePercept();
  const navigate = useNavigate();

  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        <Route
          element={
            <AppShell
              profile={legacyProfile}
              onUpdateProfile={updateLegacyProfile}
            />
          }
        >
          {/* 01 LEARN — Design Archive */}
          <Route path="/learn" element={<LearnPage />} />

          {/* 02 PLAY — Daily Expedition (Root Home) */}
          <Route
            path="/"
            element={
              <DailyExpeditionPage
                profile={legacyProfile}
                onUpdateProfile={updateLegacyProfile}
                onNavigateToProfile={() => navigate('/profile')}
              />
            }
          />

          {/* 03 THINK — Aptitude Lab (Canonical Route: /think) */}
          <Route path="/think" element={<AptitudeLabPage />} />
          {/* Backward compatibility: redirect /aptitude to /think */}
          <Route path="/aptitude" element={<Navigate to="/think" replace />} />

          {/* 04 EXPLORE — Look Again Observation Lab */}
          <Route path="/explore" element={<ExplorePage />} />

          {/* Secondary Utilities */}
          <Route
            path="/profile"
            element={
              <ProfilePage
                profile={legacyProfile}
                onUpdateProfile={updateLegacyProfile}
              />
            }
          />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PerceptProvider>
        <MainApp />
      </PerceptProvider>
    </BrowserRouter>
  );
}
