export const SITE = {
  name: 'Pose and Say Cheese Photography',
  url: 'https://pose-and-say-cheese.de',
  email: 'info@pose-and-say-cheese.de',
  phone: '+49 XXX XXXXXXX',
  address: {
    street: 'Musterstraße 1',
    city: 'Ettlingen',
    region: 'Baden-Württemberg',
    postalCode: '76275',
    country: 'DE',
  },
  geo: {
    latitude: 48.9419,
    longitude: 8.4075,
  },
  social: {
    instagram: 'https://www.instagram.com/pose_n_say_cheese/',
    instagramHandle: '@pose_n_say_cheese',
    facebook: 'https://facebook.com/poseandsaycheese',
  },
} as const;

export const NAV_ITEMS = [
  { label: 'Startseite', href: '/' },
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Preise', href: '/preise' },
  { label: 'Galerie', href: '/galerie' },
  { label: 'Über mich', href: '/ueber-mich' },
  { label: 'Kontakt', href: '/kontakt' },
] as const;
