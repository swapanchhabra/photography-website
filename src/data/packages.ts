export interface Package {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const PACKAGES: Package[] = [
  {
    name: 'Basis',
    price: 'ab 1.200 €',
    description: 'Perfekt für kleine, intime Hochzeitsfeiern.',
    features: [
      'Bis zu 4 Stunden Begleitung',
      '200+ bearbeitete Hochzeitsfotos',
      'Online-Galerie zum Herunterladen',
      'Persönliches Vorgespräch',
    ],
  },
  {
    name: 'Premium',
    price: 'ab 2.200 €',
    description: 'Unser beliebtestes Paket für den kompletten Hochzeitstag.',
    features: [
      'Bis zu 8 Stunden Begleitung',
      '400+ bearbeitete Hochzeitsfotos',
      'Online-Galerie zum Herunterladen',
      'Engagement-Shooting inklusive',
      'Hochwertiges Hochzeitsalbum',
      'Persönliches Vorgespräch',
    ],
    highlighted: true,
  },
  {
    name: 'Deluxe',
    price: 'ab 3.500 €',
    description: 'Das Rundum-sorglos-Paket für Ihren unvergesslichen Tag.',
    features: [
      'Ganztägige Begleitung',
      '600+ bearbeitete Hochzeitsfotos',
      'Online-Galerie zum Herunterladen',
      'Engagement-Shooting inklusive',
      'Premium-Hochzeitsalbum',
      'Second Photographer',
      'Persönliches Vorgespräch',
      'Expressbild-Lieferung',
    ],
  },
];
