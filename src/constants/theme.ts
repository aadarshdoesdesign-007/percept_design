export const COLOR_TOKENS = {
  background: '#0A0A0A',
  primarySurface: '#141414',
  secondarySurface: '#111111',
  primaryText: '#EDEDED',
  secondaryText: '#888888',
  border: '#292929',
  borderSubtle: '#1C1C1C',
  primaryAction: '#FFFFFF',
  primaryActionText: '#000000',
  accentGold: '#D99535',
  accentAmber: '#F59E0B',
  success: '#10B981',
  error: '#EF4444',
} as const;

export const TYPOGRAPHY = {
  displayLarge: "font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#EDEDED] leading-[1.05]",
  displayMedium: "font-display font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#EDEDED] leading-tight",
  sectionHeading: "font-display font-bold text-xl sm:text-2xl tracking-tight text-[#EDEDED]",
  bodyLarge: "font-sans text-base sm:text-lg text-[#888888] leading-relaxed",
  body: "font-sans text-xs sm:text-sm text-[#888888] leading-relaxed",
  label: "font-mono text-[10px] sm:text-xs tracking-widest uppercase text-neutral-400 font-medium",
  indexNumber: "font-mono text-xs tracking-widest text-neutral-500 font-semibold",
} as const;
