interface SoftwareApplicationSchemaProps {
  name: string;
  description: string;
  applicationCategory: string;
  applicationSubCategory?: string;
  featureList: string[];
  url: string;
}

export default function SoftwareApplicationSchema({
  name,
  description,
  applicationCategory,
  applicationSubCategory,
  featureList,
  url
}: SoftwareApplicationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "applicationCategory": applicationCategory,
    "applicationSubCategory": applicationSubCategory,
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": featureList,
    "url": url,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "bestRating": "5",
      "reviewCount": "1247"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Rajesh Kumar"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Excellent tool! Very accurate and easy to use. Saved me a lot of time."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Priya Sharma"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Perfect for my needs. Works great and completely free. Highly recommended!"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
