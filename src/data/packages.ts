export interface Package {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const PACKAGES: Package[] = [
  {
    name: 'Standesamt',
    price: 'ab 890 €',
    description: 'Perfekt für die standesamtliche Trauung und kleine Feiern.',
    features: [
      'Bis zu 3 Stunden Begleitung',
      '150+ bearbeitete Hochzeitsfotos',
      'Private Online-Galerie',
      'Persönliches Vorgespräch',
      'Anfahrt bis 30 km inklusive',
    ],
  },
  {
    name: 'Hochzeitsreportage',
    price: 'ab 1.990 €',
    description: 'Das beliebteste Paket — euer kompletter Hochzeitstag.',
    features: [
      'Bis zu 8 Stunden Begleitung',
      '400+ bearbeitete Hochzeitsfotos',
      'Private Online-Galerie',
      'Engagement-Shooting inklusive',
      'Hochwertiges Hochzeitsalbum (30 Seiten)',
      'Persönliches Vorgespräch',
      'Anfahrt bis 30 km inklusive',
      'Sneak Preview am nächsten Tag',
    ],
    highlighted: true,
  },
  {
    name: 'Rundum-sorglos',
    price: 'ab 2.990 €',
    description: 'Das komplette Paket für euren unvergesslichen Tag.',
    features: [
      'Ganztägige Begleitung (12+ Stunden)',
      '600+ bearbeitete Hochzeitsfotos',
      'Private Online-Galerie',
      'Engagement-Shooting inklusive',
      'Premium-Hochzeitsalbum (50 Seiten)',
      'Second Photographer',
      'Persönliches Vorgespräch',
      'Anfahrt bis 50 km inklusive',
      'Sneak Preview am nächsten Tag',
      'Expressbild-Lieferung in 4 Wochen',
    ],
  },
];
