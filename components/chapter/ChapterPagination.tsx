import Link from 'next/link'
import type { ChapterFrontmatter } from '@/types/content'

interface ChapterPaginationProps {
  subject: string
  prev: ChapterFrontmatter | null
  next: ChapterFrontmatter | null
}

export default function ChapterPagination({ subject, prev, next }: ChapterPaginationProps) {
  if (!prev && !next) return null

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '2rem',
        marginTop: '2rem',
        borderTop: '1px solid var(--border-color)',
        gap: '1rem',
      }}
    >
      {prev ? (
        <Link href={`/${subject}/${prev.slug}`} style={{ textDecoration: 'none', flex: 1 }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>← Previous</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>{prev.title}</div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={`/${subject}/${next.slug}`} style={{ textDecoration: 'none', flex: 1, textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>Next →</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>{next.title}</div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
