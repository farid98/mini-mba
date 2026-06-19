import Link from 'next/link'
import { SUBJECTS } from '@/lib/subjects'

interface BreadcrumbProps {
  subject?: string
  chapter?: string
}

export default function Breadcrumb({ subject, chapter }: BreadcrumbProps) {
  const subjectMeta = subject ? SUBJECTS.find(s => s.slug === subject) : null

  return (
    <nav style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
      <Link href="/" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>
        Home
      </Link>
      {subjectMeta && (
        <>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          {chapter ? (
            <Link
              href={`/${subject}`}
              style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}
            >
              {subjectMeta.title}
            </Link>
          ) : (
            <span style={{ color: 'var(--text-secondary)' }}>{subjectMeta.title}</span>
          )}
        </>
      )}
      {chapter && (
        <>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>{chapter}</span>
        </>
      )}
    </nav>
  )
}
