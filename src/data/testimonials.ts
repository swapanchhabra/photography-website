export interface Testimonial {
  name: string;
  text: string;
  image: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Anna & Markus',
    text: 'Die Fotos sind einfach wunderschön! Sie hat unsere Emotionen so authentisch eingefangen. Wir sind begeistert und können sie nur weiterempfehlen.',
    image: '/images/testimonials/couple-01.jpg',
  },
  {
    name: 'Laura & Thomas',
    text: 'Von Anfang an haben wir uns sehr wohl gefühlt. Die Ergebnisse haben unsere Erwartungen weit übertroffen — jedes Bild erzählt eine Geschichte.',
    image: '/images/testimonials/couple-02.jpg',
  },
  {
    name: 'Sarah & Jan',
    text: 'Professionell, kreativ und unglaublich sympathisch. Unsere Hochzeitsfotos sind unser größter Schatz. Vielen Dank für diesen wundervollen Tag!',
    image: '/images/testimonials/couple-03.jpg',
  },
];
