import Link from 'next/link'
import type { ChapterFrontmatter } from '@/types/content'

interface PrerequisiteBannerProps {
  prerequisites: ChapterFrontmatter[]
}

export default function PrerequisiteBanner({ prerequisites }: PrerequisiteBannerProps) {
  if (prerequisites.length === 0) return null

  return (
    <div
      style={{
        background: '#fffbeb',
        border: '1px solid #d97706',
        borderRadius: '6px',
        padding: '0.75rem 1rem',
        marginBottom: '1.5rem',
        fontSize: '0.875rem',
        color: '#92400e',
      }}
    >
      <strong>Read first:</strong>{' '}
      {prerequisites.map((p, i) => (
        <span key={p.slug}>
          {i > 0 && ', '}
          <Link
            href={`/${p.subject}/${p.slug}`}
            style={{ color: '#92400e', fontWeight: 600 }}
          >
            {p.title}
          </Link>
        </span>
      ))}
    </div>
  )
}
