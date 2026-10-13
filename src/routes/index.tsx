import { createFileRoute } from '@tanstack/react-router';
import { StudioPage } from '@/components/studio-page';
export const Route = createFileRoute('/')({
 head: () => ({ meta: [
  { title: 'LA BLUSH MAKEOVER STUDIO | Beauty & Makeovers in Pathanamthitta' },
  { name: 'description', content: 'Discover LA BLUSH MAKEOVER STUDIO in Pathanamthitta. Thoughtful beauty, personal styling and bridal makeovers that celebrate you.' },
  { property: 'og:title', content: 'LA BLUSH MAKEOVER STUDIO | Beauty, Personally' },
  { property: 'og:description', content: 'A personal beauty experience in Pathanamthitta. Explore our studio and contact us for your next makeover.' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: StudioPage,
});
