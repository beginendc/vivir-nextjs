import React from 'react';

export const TravelAgencySchema = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vivir.travel';
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Vivir Travel",
    "url": siteUrl,
    "logo": `${siteUrl}/logo-gold.svg`,
    "description": "Luxury boutique travel agency specializing in bespoke journeys across Mexico.",
    "telephone": "+520000000000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mexico City",
      "addressCountry": "MX"
    },
    "sameAs": [
      "https://www.instagram.com/vivir.travel",
      "https://www.pinterest.com/vivirtravel"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Mexico"
    },
    "priceRange": "$$$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
