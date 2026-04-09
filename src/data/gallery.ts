export interface GalleryImage {
  src: string;
  alt: string;
  category: 'trauung' | 'paarfotos' | 'details' | 'feier';
  width: number;
  height: number;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: '/images/gallery/wedding-01.jpg', alt: 'Brautpaar beim ersten Blick', category: 'trauung', width: 800, height: 1200 },
  { src: '/images/gallery/wedding-02.jpg', alt: 'Ringwechsel bei der Trauung', category: 'trauung', width: 1200, height: 800 },
  { src: '/images/gallery/wedding-03.jpg', alt: 'Brautpaar im Schlosspark', category: 'paarfotos', width: 800, height: 1200 },
  { src: '/images/gallery/wedding-04.jpg', alt: 'Romantischer Sonnenuntergang', category: 'paarfotos', width: 1200, height: 800 },
  { src: '/images/gallery/wedding-05.jpg', alt: 'Brautstrauß mit Eheringen', category: 'details', width: 800, height: 800 },
  { src: '/images/gallery/wedding-06.jpg', alt: 'Tischdekoration bei der Feier', category: 'details', width: 1200, height: 800 },
  { src: '/images/gallery/wedding-07.jpg', alt: 'Erster Tanz des Brautpaars', category: 'feier', width: 1200, height: 800 },
  { src: '/images/gallery/wedding-08.jpg', alt: 'Gäste feiern auf der Tanzfläche', category: 'feier', width: 800, height: 1200 },
  { src: '/images/gallery/wedding-09.jpg', alt: 'Braut beim Getting Ready', category: 'details', width: 800, height: 1200 },
  { src: '/images/gallery/wedding-10.jpg', alt: 'Brautpaar vor historischem Gebäude', category: 'paarfotos', width: 1200, height: 800 },
  { src: '/images/gallery/wedding-11.jpg', alt: 'Emotionaler Moment bei der Zeremonie', category: 'trauung', width: 800, height: 1200 },
  { src: '/images/gallery/wedding-12.jpg', alt: 'Brautpaar lacht zusammen', category: 'paarfotos', width: 1200, height: 800 },
];
