import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

const baseSvgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// =============================================================================
// 01. LEARN — Architectural & Archival Line System
// =============================================================================

/**
 * Open Book: Minimal geometric line symbol.
 * Clean architectural fold with angled planes, no bubbly curves.
 */
export const IconOpenBook: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <path d="M3 6.5L12 4.5l9 2v13l-9-2-9 2v-13z" strokeLinejoin="miter" />
    <path d="M12 4.5v13" strokeLinecap="square" />
    <line x1="6.5" y1="10.5" x2="9.5" y2="10" strokeLinecap="square" />
    <line x1="14.5" y1="10" x2="17.5" y2="10.5" strokeLinecap="square" />
  </svg>
);

/**
 * Archive: Stacked specimen sheets.
 * Clean rectangular sheets offset in isometric/stepped arrangement.
 */
export const IconSpecimenSheets: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <rect x="3" y="7" width="13" height="14" strokeLinecap="square" />
    <path d="M7 4h12v13" strokeLinecap="square" />
    <path d="M10 1h11v13" strokeLinecap="square" />
    <line x1="6" y1="11" x2="13" y2="11" strokeLinecap="square" />
    <line x1="6" y1="14.5" x2="11" y2="14.5" strokeLinecap="square" />
  </svg>
);

/**
 * Discovery: Technical magnifying lens / reticle.
 * Clean lens with central hair-cross reticle.
 */
export const IconDiscovery: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <line x1="15.5" y1="15.5" x2="21.5" y2="21.5" strokeLinecap="square" />
    <line x1="10.5" y1="8" x2="10.5" y2="13" />
    <line x1="8" y1="10.5" x2="13" y2="10.5" />
  </svg>
);


// =============================================================================
// 02. PLAY — Technical Field Survey & Cadence System
// =============================================================================

/**
 * Expedition: Crosshair or field-survey marker (benchmark monument).
 * Clean surveyor reticle with precise cardinal ticks.
 */
export const IconSurveyMarker: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <circle cx="12" cy="12" r="8" />
    <line x1="12" y1="2" x2="12" y2="6" strokeLinecap="square" />
    <line x1="12" y1="18" x2="12" y2="22" strokeLinecap="square" />
    <line x1="2" y1="12" x2="6" y2="12" strokeLinecap="square" />
    <line x1="18" y1="12" x2="22" y2="12" strokeLinecap="square" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * Daily Streak: Minimal consecutive-day counter / cadence mark (NOT A FLAME).
 * Clean technical calendar cadence indicator.
 */
export const IconCadence: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <rect x="3" y="4" width="18" height="17" strokeLinecap="square" />
    <line x1="3" y1="9" x2="21" y2="9" strokeLinecap="square" />
    <line x1="8" y1="2" x2="8" y2="5" strokeLinecap="square" />
    <line x1="16" y1="2" x2="16" y2="5" strokeLinecap="square" />
    <line x1="7" y1="13" x2="9.5" y2="13" strokeLinecap="square" />
    <line x1="11" y1="13" x2="13.5" y2="13" strokeLinecap="square" />
    <line x1="15" y1="13" x2="17.5" y2="13" strokeLinecap="square" />
    <line x1="7" y1="17" x2="9.5" y2="17" strokeLinecap="square" />
    <line x1="11" y1="17" x2="13.5" y2="17" strokeLinecap="square" />
  </svg>
);

/**
 * XP: Typographic XP label with a small measurement tick (NOT A SPARKLE).
 * Crisp vector lettering with caliper measurement reference.
 */
export const IconXP: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <rect x="2" y="3" width="20" height="18" strokeLinecap="square" />
    {/* Letter X */}
    <path d="M5.5 8l4 8M9.5 8l-4 8" strokeLinecap="square" />
    {/* Letter P */}
    <path d="M12.5 8h3a2.5 2.5 0 010 5h-3V8zm0 5v3" strokeLinecap="square" />
    {/* Caliper measurement ticks on right */}
    <line x1="19.5" y1="6" x2="19.5" y2="18" strokeLinecap="square" />
    <line x1="18" y1="6" x2="20.5" y2="6" strokeLinecap="square" />
    <line x1="18" y1="12" x2="20.5" y2="12" strokeLinecap="square" />
    <line x1="18" y1="18" x2="20.5" y2="18" strokeLinecap="square" />
  </svg>
);

/**
 * Completed Challenge: Precise engineering checkmark.
 * Crisp mitered right-angle check with square end caps.
 */
export const IconPrecisionCheck: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <path d="M4 12.5l5.5 5.5L20 6" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

/**
 * Verified Specimen Badge: Precision check enclosed in a square technical seal.
 */
export const IconVerifiedBadge: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <rect x="3" y="3" width="18" height="18" strokeLinecap="square" />
    <path d="M7 12l3.5 3.5L17 8" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

/**
 * Error / Misalignment: Precise technical cross mark in a square seal.
 */
export const IconCrossMark: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <rect x="3" y="3" width="18" height="18" strokeLinecap="square" />
    <line x1="8" y1="8" x2="16" y2="16" strokeLinecap="square" />
    <line x1="16" y1="8" x2="8" y2="16" strokeLinecap="square" />
  </svg>
);


// =============================================================================
// 03. THINK — Cognitive Aptitude & Geometric Reasoning System
// =============================================================================

/**
 * Visual Reasoning: Overlapping geometric forms.
 * Square and circle intersecting in clean constructive harmony.
 */
export const IconVisualReasoning: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <rect x="3" y="3" width="11" height="11" strokeLinecap="square" />
    <circle cx="14.5" cy="14.5" r="6.5" />
  </svg>
);

/**
 * Spatial Reasoning: Wireframe cube.
 * Axonometric wireframe projection with crisp technical lines.
 */
export const IconSpatialReasoning: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <path d="M12 2.5L20 7v10l-8 4.5L4 17V7l8-4.5z" strokeLinejoin="miter" />
    <path d="M12 2.5v9M12 11.5L20 7M12 11.5L4 7" strokeLinejoin="miter" />
  </svg>
);

/**
 * Logical Reasoning: Connected nodes.
 * Directed graph / deductive logic node system.
 */
export const IconLogicalReasoning: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <circle cx="5" cy="6" r="2" />
    <circle cx="19" cy="6" r="2" />
    <circle cx="12" cy="18" r="2" />
    <line x1="7" y1="6" x2="17" y2="6" strokeLinecap="square" />
    <line x1="6.5" y1="7.8" x2="10.5" y2="16.2" strokeLinecap="square" />
    <line x1="17.5" y1="7.8" x2="13.5" y2="16.2" strokeLinecap="square" />
  </svg>
);

/**
 * Analytical Reasoning: Measurement grid.
 * Technical Cartesian grid with coordinate matrix ticks.
 */
export const IconAnalyticalReasoning: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <rect x="3" y="3" width="18" height="18" strokeLinecap="square" />
    <line x1="9" y1="3" x2="9" y2="21" strokeLinecap="square" />
    <line x1="15" y1="3" x2="15" y2="21" strokeLinecap="square" />
    <line x1="3" y1="9" x2="21" y2="9" strokeLinecap="square" />
    <line x1="3" y1="15" x2="21" y2="15" strokeLinecap="square" />
    <circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="15" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * Creative Reasoning: Abstract constructed form.
 * Bauhaus/Constructivist geometric tension between circle, diagonal axis and rectilinear plane.
 */
export const IconCreativeReasoning: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <circle cx="9" cy="9" r="6" />
    <polygon points="9,3 21,3 21,15 15,15" strokeLinejoin="miter" />
    <line x1="3" y1="21" x2="21" y2="3" strokeLinecap="square" />
    <rect x="13" y="13" width="8" height="8" strokeLinecap="square" />
  </svg>
);

/**
 * Adaptive Elo Metric: Coordinate datum symbol (NOT A BRAIN).
 * Scientific coordinate datum mark with measurement axis.
 */
export const IconCoordinateDatum: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <path d="M4 4v16h16" strokeLinecap="square" />
    <line x1="4" y1="12" x2="7" y2="12" strokeLinecap="square" />
    <line x1="12" y1="20" x2="12" y2="17" strokeLinecap="square" />
    <circle cx="4" cy="20" r="1.5" fill="currentColor" stroke="none" />
    <path d="M7 15l4-5 4 3 5-7" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

/**
 * Mock Examination: Specimen assessment sheet with official benchmark seal (NOT A TROPHY).
 */
export const IconMockExam: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <rect x="4" y="3" width="16" height="18" strokeLinecap="square" />
    <line x1="8" y1="7" x2="16" y2="7" strokeLinecap="square" />
    <line x1="8" y1="11" x2="16" y2="11" strokeLinecap="square" />
    <line x1="8" y1="15" x2="12" y2="15" strokeLinecap="square" />
    <circle cx="15.5" cy="15.5" r="2.5" />
    <line x1="15.5" y1="14" x2="15.5" y2="17" />
    <line x1="14" y1="15.5" x2="17" y2="15.5" />
  </svg>
);


// =============================================================================
// 04. EXPLORE — Forensic Observation & Fieldwork System
// =============================================================================

/**
 * Observation: Geometric eye constructed from simple geometry.
 * Symmetrical geometric almond with concentric pupil and central focal point.
 */
export const IconGeometricEye: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * Photography: Minimal viewfinder (NOT A CARTOON CAMERA).
 * Technical camera ground-glass crop marks with central focal reticle.
 */
export const IconViewfinder: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" strokeLinecap="square" />
    <line x1="12" y1="10" x2="12" y2="14" strokeLinecap="square" />
    <line x1="10" y1="12" x2="14" y2="12" strokeLinecap="square" />
  </svg>
);

/**
 * Field Journal: Notebook outline with binding rule.
 * Minimalist field notebook outline with bound spine and entry rules.
 */
export const IconFieldJournal: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <rect x="5" y="3" width="14" height="18" strokeLinecap="square" />
    <line x1="9" y1="3" x2="9" y2="21" strokeLinecap="square" />
    <line x1="12" y1="8" x2="16" y2="8" strokeLinecap="square" />
    <line x1="12" y1="12" x2="16" y2="12" strokeLinecap="square" />
  </svg>
);

/**
 * Location: Technical map coordinate datum marker.
 * Surveyor monument pin with coordinate datum base.
 */
export const IconCoordinateMarker: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <circle cx="12" cy="9" r="6" />
    <circle cx="12" cy="9" r="2" />
    <path d="M12 15v6M9 21h6" strokeLinecap="square" />
  </svg>
);


// =============================================================================
// 05. UI & WORKFLOW UTILITIES — Restrained Swiss Editorial Tools
// =============================================================================

/**
 * Technical Chronometer / Stopwatch.
 */
export const IconTechnicalClock: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...props} {...baseSvgProps} className={className}>
    <circle cx="12" cy="13" r="8" />
    <line x1="12" y1="13" x2="12" y2="8" strokeLinecap="square" />
    <line x1="12" y1="13" x2="16" y2="13" strokeLinecap="square" />
    <line x1="12" y1="2" x2="12" y2="5" strokeLinecap="square" />
  </svg>
);

/**
 * Clean Directional Arrow Right.
 */
export const IconArrowRight: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <line x1="4" y1="12" x2="19" y2="12" strokeLinecap="square" />
    <path d="M13 6l6 6-6 6" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

/**
 * Clean Directional Arrow Left.
 */
export const IconArrowLeft: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <line x1="20" y1="12" x2="5" y2="12" strokeLinecap="square" />
    <path d="M11 6l-6 6 6 6" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

/**
 * Directional Arrow Up-Right (External / Inspect).
 */
export const IconArrowUpRight: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <line x1="7" y1="17" x2="17" y2="7" strokeLinecap="square" />
    <path d="M7 7h10v10" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

/**
 * Close / Dismiss mark.
 */
export const IconClose: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <line x1="5" y1="5" x2="19" y2="19" strokeLinecap="square" />
    <line x1="19" y1="5" x2="5" y2="19" strokeLinecap="square" />
  </svg>
);

/**
 * Refresh / Recalibrate / Rotate.
 */
export const IconRecalibrate: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <path d="M4 12a8 8 0 0114.93-4M20 12a8 8 0 01-14.93 4" strokeLinecap="square" />
    <polyline points="19 4 19 8 15 8" strokeLinecap="square" strokeLinejoin="miter" />
    <polyline points="5 20 5 16 9 16" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

/**
 * Copy Specimen Dossier.
 */
export const IconCopySpecimen: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <rect x="8" y="8" width="13" height="13" strokeLinecap="square" />
    <path d="M16 8V3H3v13h5" strokeLinecap="square" />
  </svg>
);

/**
 * Sound Audio Active.
 */
export const IconAudioOn: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" strokeLinecap="square" strokeLinejoin="miter" />
    <path d="M15.5 8.5a5 5 0 010 7" />
    <path d="M18.5 5.5a9 9 0 010 13" />
  </svg>
);

/**
 * Sound Audio Muted.
 */
export const IconAudioOff: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" strokeLinecap="square" strokeLinejoin="miter" />
    <line x1="22" y1="9" x2="16" y2="15" strokeLinecap="square" />
    <line x1="16" y1="9" x2="22" y2="15" strokeLinecap="square" />
  </svg>
);

/**
 * Minimal Hamburger / Navigation Menu.
 */
export const IconMenu: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <line x1="3" y1="7" x2="21" y2="7" strokeLinecap="square" />
    <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="square" />
    <line x1="3" y1="17" x2="21" y2="17" strokeLinecap="square" />
  </svg>
);

/**
 * Designer Dossier / Profile identifier.
 */
export const IconDesignerDossier: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <rect x="3" y="3" width="18" height="18" strokeLinecap="square" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 18a5 5 0 0110 0" strokeLinecap="square" />
  </svg>
);

/**
 * System Shield / Integrity Verification.
 */
export const IconVerificationSeal: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} {...baseSvgProps} className={className} {...props}>
    <path d="M12 2L4 6v6c0 5.5 3.8 10 8 11 4.2-1 8-5.5 8-11V6l-8-4z" strokeLinejoin="miter" />
    <path d="M9 12l2 2 4-4" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);
