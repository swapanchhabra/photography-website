export interface Package {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const WEDDING_PACKAGES: Package[] = [
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

export const PORTRAIT_PACKAGES: Package[] = [
  {
    name: 'Bewerbungsfoto',
    price: 'ab 89 €',
    description: 'Das perfekte Foto für eure Bewerbung oder euer Profil.',
    features: [
      'Ca. 30 Minuten Shooting',
      '1 professionell bearbeitetes Bild',
      'Studio in Ettlingen',
      'Auswahl aus ca. 15 Motiven',
      'Hautretusche inklusive',
      'Digital in Web- und Druckauflösung',
    ],
  },
  {
    name: 'Business Portrait',
    price: 'ab 189 €',
    description: 'Professionelle Porträts für LinkedIn, Website & Co.',
    features: [
      'Ca. 60 Minuten Shooting',
      '3 professionell bearbeitete Bilder',
      'Studio oder Outdoor',
      '2 Outfit-Wechsel',
      'Auswahl aus ca. 40 Motiven',
      'Hautretusche inklusive',
      'Private Online-Galerie',
      'Für Social Media & Website optimiert',
    ],
    highlighted: true,
  },
  {
    name: 'Executive Portrait',
    price: 'ab 349 €',
    description: 'Das Premium-Paket für Führungskräfte und Unternehmer.',
    features: [
      'Ca. 90 Minuten Shooting',
      '5 professionell bearbeitete Bilder',
      'Studio und Outdoor kombiniert',
      'Bis zu 4 Outfit-Wechsel',
      'Auswahl aus ca. 80 Motiven',
      'Professionelle Hautretusche',
      'Private Online-Galerie',
      'Alle Bilder auch in Schwarz-Weiß',
      'Für LinkedIn, Xing & Website optimiert',
    ],
  },
];

