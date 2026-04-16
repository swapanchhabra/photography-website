export interface PortraitImage {
  src: string;
  alt: string;
  category: 'business' | 'bewerbung' | 'outdoor' | 'studio';
  width: number;
  height: number;
}

export const PORTRAIT_IMAGES: PortraitImage[] = [
  { src: '/images/portraits/portrait-01.jpg', alt: 'Business Portrait im Studio', category: 'studio', width: 800, height: 1200 },
  { src: '/images/portraits/portrait-02.jpg', alt: 'Bewerbungsfoto klassisch', category: 'bewerbung', width: 800, height: 1200 },
  { src: '/images/portraits/portrait-03.jpg', alt: 'LinkedIn Profilbild', category: 'business', width: 800, height: 1200 },
  { src: '/images/portraits/portrait-04.jpg', alt: 'Outdoor Business Shooting', category: 'outdoor', width: 1200, height: 800 },
  { src: '/images/portraits/portrait-05.jpg', alt: 'Portrait mit natürlichem Licht', category: 'studio', width: 800, height: 1200 },
  { src: '/images/portraits/portrait-06.jpg', alt: 'Modernes Business Portrait', category: 'business', width: 1200, height: 800 },
  { src: '/images/portraits/portrait-07.jpg', alt: 'Bewerbungsbild im Anzug', category: 'bewerbung', width: 800, height: 1200 },
  { src: '/images/portraits/portrait-08.jpg', alt: 'Outdoor Portrait im Park', category: 'outdoor', width: 1200, height: 800 },
];
