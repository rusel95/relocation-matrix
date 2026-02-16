import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  url = 'https://relocation-matrix.vercel.app',
  image = 'https://relocation-matrix.vercel.app/og-image.png',
  type = 'website',
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const updateProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    updateMeta('description', description);
    updateMeta('viewport', 'width=device-width, initial-scale=1');
    updateMeta('theme-color', '#667eea');

    // Open Graph
    updateProperty('og:title', title);
    updateProperty('og:description', description);
    updateProperty('og:url', url);
    updateProperty('og:type', type);
    updateProperty('og:image', image);
    updateProperty('og:site_name', 'Relocation Matrix');

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);
  }, [title, description, url, image, type]);

  return null;
};

export const useSEO = (props: SEOProps) => {
  return <SEO {...props} />;
};
