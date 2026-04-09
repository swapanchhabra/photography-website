import { SITE } from './constants';
import { TESTIMONIALS } from '../data/testimonials';

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Photographer'],
    name: SITE.name,
    description:
      'Professionelle Hochzeitsfotografie in Karlsruhe und Ettlingen. Authentische, emotionale Hochzeitsfotos.',
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: [
      { '@type': 'City', name: 'Karlsruhe' },
      { '@type': 'City', name: 'Ettlingen' },
      { '@type': 'State', name: 'Baden-Württemberg' },
    ],
    priceRange: '$$',
    image: `${SITE.url}/og-image.jpg`,
    sameAs: [SITE.social.instagram, SITE.social.facebook],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hochzeitsfotografie Pakete',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Basis-Paket',
          description: 'Bis zu 4 Stunden Begleitung, 200+ bearbeitete Fotos',
          priceCurrency: 'EUR',
          price: '1200',
        },
        {
          '@type': 'Offer',
          name: 'Premium-Paket',
          description: 'Bis zu 8 Stunden Begleitung, 400+ bearbeitete Fotos, Hochzeitsalbum',
          priceCurrency: 'EUR',
          price: '2200',
        },
        {
          '@type': 'Offer',
          name: 'Deluxe-Paket',
          description: 'Ganztägige Begleitung, 600+ bearbeitete Fotos, Premium-Album, Second Photographer',
          priceCurrency: 'EUR',
          price: '3500',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: String(TESTIMONIALS.length),
      bestRating: '5',
      worstRating: '1',
    },
    review: TESTIMONIALS.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: t.text,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
