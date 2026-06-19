import Link from 'next/link'
import type { ChapterFrontmatter } from '@/types/content'
import { SUBJECTS } from '@/lib/subjects'

interface RelatedLinksProps {
  related: ChapterFrontmatter[]
}

export default function RelatedLinks({ related }: RelatedLinksProps) {
  if (related.length === 0) return null

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3
        style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--text-tertiary)',
          marginBottom: '0.75rem',
        }}
      >
        Related Chapters
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
        {related.map(ch => {
          const subject = SUBJECTS.find(s => s.slug === ch.subject)
          return (
            <Link
              key={ch.slug}
              href={`/${ch.subject}/${ch.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  border: '1px solid var(--border-color)',
                  borderLeft: `3px solid ${subject?.color ?? '#888'}`,
                  borderRadius: '6px',
                  padding: '0.75rem',
                  background: 'var(--bg-primary)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>
                  {subject?.title}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.3 }}>
                  {ch.title}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
