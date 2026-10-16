import type { MetadataRoute } from 'next'
import { publishedProjects } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://christopherrateng.com'
  const currentDate = new Date()

  const projectRoutes: MetadataRoute.Sitemap = publishedProjects.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...projectRoutes,
  ]
}
