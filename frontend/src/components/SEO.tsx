import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: string;
}

export default function SEO({ 
  title, 
  description, 
  canonicalUrl, 
  ogImage = '/assets/generated/hero-banner.dim_1200x400.png',
  ogType = 'website'
}: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to set or update meta tag
    const setMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Set or update link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      
      element.href = href;
    };

    // Meta description
    setMetaTag('description', description);

    // Open Graph tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:image', `${window.location.origin}${ogImage}`, true);

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', `${window.location.origin}${ogImage}`);

    // Canonical link
    setLinkTag('canonical', canonicalUrl);
  }, [title, description, canonicalUrl, ogImage, ogType]);

  return null;
}
