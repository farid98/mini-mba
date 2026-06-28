import type { MetadataRoute } from 'next'
import { getAllSubjectSlugs, getAllChapters } from '@/lib/content'

const BASE_URL = 'https://mini-mba.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'monthly' },
  ]

  for (const subject of getAllSubjectSlugs()) {
    entries.push({
      url: `${BASE_URL}/${subject}`,
      priority: 0.8,
      changeFrequency: 'monthly',
    })
    for (const ch of getAllChapters(subject)) {
      entries.push({
        url: `${BASE_URL}/${subject}/${ch.slug}`,
        priority: 0.7,
        changeFrequency: 'monthly',
      })
    }
  }

  return entries
}
