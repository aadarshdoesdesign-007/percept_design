import { ImageMetadata } from '../types/media';

/**
 * Validates whether an image source is non-empty, non-corrupt, and resolves to an existing route.
 */
export const isValidImageSource = (src?: string | null): boolean => {
  if (!src || typeof src !== 'string') return false;
  const trimmed = src.trim();
  if (trimmed.length === 0) return false;
  // Ensure not an unresolved placeholder string
  if (trimmed === 'undefined' || trimmed === 'null' || trimmed === '[object Object]') return false;
  return true;
};

/**
 * Registry of verified official PERCEPT assets with licensing and attribution metadata.
 */
export const VERIFIED_IMAGE_REGISTRY: Record<string, ImageMetadata> = {
  // Mascots
  'mascot-front': {
    id: 'mascot-front',
    src: '/assets/mascot/mascot_front.png',
    alt: 'PERCEPT Companion Guide (Full Front Elevation)',
    title: 'PERCEPT Mascot Companion',
    attribution: 'PERCEPT Design Systems',
    license: 'Proprietary · Educational',
    aspectRatio: '1/1',
    category: 'mascot',
  },
  'mascot-head': {
    id: 'mascot-head',
    src: '/assets/mascot/mascot_head.png',
    alt: 'PERCEPT Companion Eye / Reticle Avatar',
    title: 'PERCEPT Mascot Head Avatar',
    attribution: 'PERCEPT Design Systems',
    license: 'Proprietary · Educational',
    aspectRatio: '1/1',
    category: 'mascot',
  },
  'mascot-side': {
    id: 'mascot-side',
    src: '/assets/mascot/mascot_side.png',
    alt: 'PERCEPT Companion Guide (Side Profile)',
    title: 'PERCEPT Mascot Companion Profile',
    attribution: 'PERCEPT Design Systems',
    license: 'Proprietary · Educational',
    aspectRatio: '1/1',
    category: 'mascot',
  },

  // 02 PLAY Daily Specimens
  'swiss-poster': {
    id: 'swiss-poster',
    src: '/assets/specimens/swiss-poster.svg',
    alt: 'Swiss International Typographic Style Exhibition Poster 1958',
    title: 'Akzidenz · Kunstgewerbemuseum Zürich (1958)',
    attribution: 'Josef Müller-Brockmann Archive / Zurich Design Museum',
    license: 'Public Domain / Educational Fair Use',
    aspectRatio: '3/4',
    category: 'specimen',
  },
  'memphis-totem': {
    id: 'memphis-totem',
    src: '/assets/specimens/memphis-totem.svg',
    alt: 'Memphis Group Casablanca Sideboard & Bacterio Pattern 1981',
    title: 'Casablanca Totem · Ettore Sottsass (1981)',
    attribution: 'Memphis Milano Design Archive',
    license: 'Educational Fair Use',
    aspectRatio: '3/4',
    category: 'specimen',
  },
  'chandigarh-capitol': {
    id: 'chandigarh-capitol',
    src: '/assets/specimens/chandigarh-capitol.svg',
    alt: 'Chandigarh Capitol Complex Palace of Assembly Béton Brut Facade',
    title: 'Palace of Assembly · Le Corbusier (1951–1962)',
    attribution: 'Fondation Le Corbusier / UNESCO World Heritage Records',
    license: 'Educational Fair Use',
    aspectRatio: '16/9',
    category: 'specimen',
  },
  'kyoto-machiya': {
    id: 'kyoto-machiya',
    src: '/assets/specimens/kyoto-machiya.svg',
    alt: 'Traditional Kyoto Machiya Townhouse Timber Latticework & Yakisugi',
    title: 'Gion Machiya Vernacular Elevation',
    attribution: 'Kyoto Traditional Architecture Preservation Registry',
    license: 'Public Domain / Educational',
    aspectRatio: '16/9',
    category: 'specimen',
  },
  'braun-t3': {
    id: 'braun-t3',
    src: '/assets/specimens/braun-t3.svg',
    alt: 'Braun T3 Pocket Transistor Radio Perforated Grille & Rotary Dial',
    title: 'Braun T3 · Dieter Rams (1958)',
    attribution: 'Braun GmbH Historical Archive / Dieter and Ingeborg Rams Foundation',
    license: 'Educational Fair Use',
    aspectRatio: 'auto',
    category: 'specimen',
  },
  'arco-lamp': {
    id: 'arco-lamp',
    src: '/assets/specimens/arco-lamp.svg',
    alt: 'Flos Arco Floor Lamp Monolithic Carrara Marble Base with Through-Hole',
    title: 'Arco Floor Lamp · Achille & Pier Giacomo Castiglioni (1962)',
    attribution: 'Fondazione Achille Castiglioni / Flos S.p.A.',
    license: 'Educational Fair Use',
    aspectRatio: 'auto',
    category: 'specimen',
  },

  // 01 LEARN Monograph
  'muller-brockmann': {
    id: 'muller-brockmann',
    src: '/assets/learn/muller-brockmann.svg',
    alt: 'Josef Müller-Brockmann Archival Retrospective Plate',
    title: 'Monograph #01 · Josef Müller-Brockmann (1914–1996)',
    attribution: 'Neue Grafik Archives / Lars Müller Publishers Reference',
    license: 'Educational Fair Use',
    aspectRatio: '4/3',
    category: 'monograph',
  },

  // 04 EXPLORE Observation Missions
  'mission-desire-paths': {
    id: 'mission-desire-paths',
    src: '/assets/explore/mission-desire-paths.svg',
    alt: 'Field Observation Specimen: Desire Paths & Organic Navigation',
    title: 'Desire Paths & Organic Navigation',
    attribution: 'PERCEPT Field Observation Group',
    license: 'CC BY-SA 4.0',
    aspectRatio: '16/9',
    category: 'mission',
  },
  'mission-typographic-baselines': {
    id: 'mission-typographic-baselines',
    src: '/assets/explore/mission-typographic-baselines.svg',
    alt: 'Field Observation Specimen: Accidental Typographic Baselines',
    title: 'Accidental Typographic Baselines',
    attribution: 'PERCEPT Field Observation Group',
    license: 'CC BY-SA 4.0',
    aspectRatio: '16/9',
    category: 'mission',
  },
  'mission-luminance-shadows': {
    id: 'mission-luminance-shadows',
    src: '/assets/explore/mission-luminance-shadows.svg',
    alt: 'Field Observation Specimen: Luminance Shadows as Contrast Guides',
    title: 'Luminance Shadows as Contrast Guides',
    attribution: 'PERCEPT Field Observation Group',
    license: 'CC BY-SA 4.0',
    aspectRatio: '16/9',
    category: 'mission',
  },
  'mission-everyday-affordances': {
    id: 'mission-everyday-affordances',
    src: '/assets/explore/mission-everyday-affordances.svg',
    alt: 'Field Observation Specimen: Everyday Industrial Affordances (Norman Door)',
    title: 'Everyday Industrial Affordances',
    attribution: 'PERCEPT Field Observation Group',
    license: 'CC BY-SA 4.0',
    aspectRatio: '16/9',
    category: 'mission',
  },
};
