export interface DesignDiscovery {
  id: string;
  category: 'object' | 'designer' | 'movement' | 'architecture' | 'typography';
  categoryLabel: string;
  title: string;
  subtitle: string;
  era: string;
  authorOrOrigin: string;
  imageUrl: string;
  axiom: string;
  description: string;
  keyInsights: string[];
  dimensionsOrSpecs?: string;
  curatorNote: string;
}

export const DISCOVERIES_BANK: DesignDiscovery[] = [
  {
    id: 'disc-01',
    category: 'typography',
    categoryLabel: 'Typographic Specimen',
    title: 'Akzidenz-Grotesk & The 1958 Zürich Grid',
    subtitle: 'Mathematical Modular Hierarchy in Post-War Switzerland',
    era: '1958',
    authorOrOrigin: 'Josef Müller-Brockmann · Zürich, Switzerland',
    imageUrl: '/assets/specimens/swiss-poster.svg',
    axiom: 'Counter-space is active matter, not empty void.',
    description: 'Pioneered for the Kunstgewerbemuseum concert poster series, this layout established asymmetric flush-left ragged-right typography anchored to an 8×8 point modular grid. Rather than centering text decoratively, the visual rhythm mirrors musical cadence.',
    keyInsights: [
      'Asymmetric balance forces eye movement along dynamic compositional diagonals.',
      'A single typeface weight shift communicates hierarchy without requiring multiple fonts.',
      'Red #E63946 accent acts as a focal punctum rather than decorative filling.'
    ],
    dimensionsOrSpecs: '841 × 1189 mm · Letterpress on Litho Stock',
    curatorNote: 'Notice how the red acoustic arc intersects the baseline grid at exactly the 1/3 golden proportion coordinate.',
  },
  {
    id: 'disc-02',
    category: 'architecture',
    categoryLabel: 'Architectural Tectonic',
    title: 'Chandigarh High Court Brise-Soleil',
    subtitle: 'Climate-Calibrated Monolithic Béton Brut',
    era: '1951–1962',
    authorOrOrigin: 'Le Corbusier & Pierre Jeanneret · Punjab, India',
    imageUrl: '/assets/specimens/chandigarh-capitol.svg',
    axiom: 'Form follows solar geometry and monsoon thermodynamics.',
    description: 'The monumental Palace of Assembly features deep board-marked concrete louvers (brise-soleil) angled at 45 degrees. These massive monolithic blades block brutal subtropical solar radiation while channeling cross-ventilation breezes across the reflecting pool.',
    keyInsights: [
      'Structural sun-breakers reduce interior ambient cooling load by over 8°C passively.',
      'Béton brut celebrates the grain of timber formwork rather than hiding structural concrete.',
      'The inverted roof curve funnels torrential monsoon rainfall into monumental scuppers.'
    ],
    dimensionsOrSpecs: '254m Facade Length · Cast-in-place Reinforced Concrete',
    curatorNote: 'The massive reflecting pool acts as an evaporative pre-cooler for air entering the ground-level pilotis.',
  },
  {
    id: 'disc-03',
    category: 'object',
    categoryLabel: 'Industrial Ergonomics',
    title: 'Braun T3 Pocket Transistor Radio',
    subtitle: 'The Archetype of Functional Miniaturisation',
    era: '1958',
    authorOrOrigin: 'Dieter Rams · Frankfurt am Main, Germany',
    imageUrl: '/assets/specimens/braun-t3.svg',
    axiom: 'Weniger, aber besser — Less, but better.',
    description: 'Dieter Rams integrated the acoustic grille and structural casing into a single-shot precision injection-molded polystyrene housing. Perforating speaker holes directly into the tool eliminated metal stamped parts and established the circular dial archetype.',
    keyInsights: [
      'Eliminated separate decorative speaker fabric to reduce assembly friction.',
      'Flush rotary frequency wheel served as direct ancestral inspiration for the 2001 Apple iPod click wheel.',
      'Pocket scale transformed audio from a stationary furniture piece into a personal prosthetic.'
    ],
    dimensionsOrSpecs: '150 × 82 × 41 mm · 400g Polystyrene Case',
    curatorNote: 'Study the progressive pitch of the 64 speaker apertures: the acoustic impedance matches human speech resonance.',
  },
  {
    id: 'disc-04',
    category: 'object',
    categoryLabel: 'Kinetic Counterweight',
    title: 'Flos Arco Floor Lamp Pierced Monolith',
    subtitle: 'Overhead Illumination Without Ceiling Anchors',
    era: '1962',
    authorOrOrigin: 'Achille & Pier Giacomo Castiglioni · Brescia, Italy',
    imageUrl: '/assets/specimens/arco-lamp.svg',
    axiom: 'Every detail solves an explicit physical and ergonomic constraint.',
    description: 'Designed to illuminate dining tables without requiring ceiling electrical junction drilling. The Castiglioni brothers calculated that a 65 kg Carrara marble block could counterbalance a 2-meter telescoping stainless steel arch. The famous center hole was bored specifically for a broomstick transport handle.',
    keyInsights: [
      'Bored 20mm horizontal hole allows two adults to lift and reposition the 65kg stone with a broom.',
      'Chamfered beveled corners on the marble prevent injury to passing shins in domestic quarters.',
      'Perforated spun aluminum hood radiates upward heat while projecting glare-free light downward.'
    ],
    dimensionsOrSpecs: '2320 mm Height · 65 kg White Carrara Base',
    curatorNote: 'The lamp demonstrates design through subtraction: suspended overhead lighting without permanent architectural intervention.',
  },
  {
    id: 'disc-05',
    category: 'movement',
    categoryLabel: 'Radical Postmodernism',
    title: 'The Memphis Milano Casablanca Totem',
    subtitle: 'Disrupting Modernist Rationalism with Plastic Laminate',
    era: '1981',
    authorOrOrigin: 'Ettore Sottsass · Milan Furniture Fair, 1981',
    imageUrl: '/assets/specimens/memphis-totem.svg',
    axiom: 'Function is emotional, cultural, and semiotic, not purely mechanical.',
    description: 'Frustrated by dogmatic corporate modernism, the Memphis collective employed cheap printed plastic laminates (Bacterio pattern) and anthropomorphic shelving silhouettes to inject irony, pop culture, and exuberant chromatic vibrancy into design.',
    keyInsights: [
      'Elevated industrial plastic laminate—previously restricted to diner countertops—to high-end furniture.',
      'Asymmetric cantilevers challenge traditional load-bearing visual stability.',
      'Color clashing (magenta, cyan, canary yellow) rejects the monochrome Bauhaus canon.'
    ],
    dimensionsOrSpecs: '1950 × 1500 × 380 mm · Screen-Printed Laminate & Wood',
    curatorNote: 'The Bacterio squiggle pattern was hand-drawn by Sottsass to evoke bacterial colonies under an optical microscope.',
  },
  {
    id: 'disc-06',
    category: 'architecture',
    categoryLabel: 'Vernacular Climate Craft',
    title: 'Kyoto Machiya & Koushi Latticework',
    subtitle: 'Passive Optical Privacy & Microclimate Courtyards',
    era: 'Edo to Meiji Era',
    authorOrOrigin: 'Traditional Kyoto Master Joiners · Gion, Japan',
    imageUrl: '/assets/specimens/kyoto-machiya.svg',
    axiom: 'Privacy and breeze through calibrated angle of incidence.',
    description: 'Traditional Kyoto townhouses utilized narrow street frontages with fine vertical timber lattice screens (koushi). The slender cedar slats let interior occupants see out into the street while blocking direct line-of-sight from passersby, creating passive airflow connected to rear garden courtyards.',
    keyInsights: [
      'Narrow street frontage historically optimized municipal tax burdens calculated by width.',
      'Charred cedar siding (yakisugi) provides natural fire retardance, rot resistance, and insect protection.',
      'Rear garden (tsuboniwa) generates convective air pressure differentials to cool interior tatami rooms.'
    ],
    dimensionsOrSpecs: '5.5m Frontage × 28m Depth · Charred Sugi & Hinoki',
    curatorNote: 'Observe the curved bamboo inuyarai skirting along the base: protects mud-plaster walls from street splashing.',
  },
];

/**
 * Deterministically selects today's featured discovery based on the ISO date string.
 */
export function getDailyDiscovery(dateStr: string): DesignDiscovery {
  const seedNum = parseInt(dateStr.replace(/-/g, ''), 10);
  return DISCOVERIES_BANK[seedNum % DISCOVERIES_BANK.length];
}
