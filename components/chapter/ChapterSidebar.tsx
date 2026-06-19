import Link from 'next/link'
import type { ChapterFrontmatter } from '@/types/content'

interface ChapterSidebarProps {
  subject: string
  subjectTitle: string
  subjectColor: string
  chapters: ChapterFrontmatter[]
  currentSlug: string
}

export default function ChapterSidebar({
  subject,
  subjectTitle,
  subjectColor,
  chapters,
  currentSlug,
}: ChapterSidebarProps) {
  return (
    <nav
      style={{
        width: '220px',
        flexShrink: 0,
        position: 'sticky',
        top: '1.5rem',
        alignSelf: 'flex-start',
      }}
    >
      <Link
        href={`/${subject}`}
        style={{ textDecoration: 'none' }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: '0.875rem',
            color: subjectColor,
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {subjectTitle}
        </div>
      </Link>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {chapters.map(ch => {
          const isActive = ch.slug === currentSlug
          return (
            <li key={ch.slug}>
              <Link
                href={`/${subject}/${ch.slug}`}
                style={{
                  display: 'block',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  color: isActive ? subjectColor : 'var(--text-secondary)',
                  background: isActive ? 'var(--bg-secondary)' : 'transparent',
                  fontWeight: isActive ? 600 : 400,
                  borderLeft: isActive ? `2px solid ${subjectColor}` : '2px solid transparent',
                  marginBottom: '0.125rem',
                  lineHeight: 1.4,
                }}
              >
                {ch.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
