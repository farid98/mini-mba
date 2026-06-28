import Link from 'next/link'
import type { ChapterFrontmatter } from '@/types/content'

interface PrerequisiteBannerProps {
  prerequisites: ChapterFrontmatter[]
}

export default function PrerequisiteBanner({ prerequisites }: PrerequisiteBannerProps) {
  if (prerequisites.length === 0) return null

  return (
    <div className="bg-amber-50 border border-amber-500 rounded-[6px] px-4 py-3 mb-6 text-sm text-amber-800">
      <strong>Read first:</strong>{' '}
      {prerequisites.map((p, i) => (
        <span key={p.slug}>
          {i > 0 && ', '}
          <Link href={`/${p.subject}/${p.slug}`} className="text-amber-800 font-semibold">
            {p.title}
          </Link>
        </span>
      ))}
    </div>
  )
}
