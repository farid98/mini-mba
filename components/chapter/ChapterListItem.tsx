'use client'

import Link from 'next/link'
import type { ChapterFrontmatter } from '@/types/content'

const difficultyStyle = {
  foundational: { bg: '#edf7f1', color: '#1a6b3a' },
  intermediate: { bg: '#fffbeb', color: '#92400e' },
  advanced: { bg: '#fef2f2', color: '#991b1b' },
}

interface ChapterListItemProps {
  chapter: ChapterFrontmatter
  index: number
  subject: string
  subjectColor: string
  subjectColorBg: string
}

export default function ChapterListItem({
  chapter,
  index,
  subject,
  subjectColor,
  subjectColorBg,
}: ChapterListItemProps) {
  const d = difficultyStyle[chapter.difficulty]

  return (
    <li>
      <Link href={`/${subject}/${chapter.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem',
            borderRadius: '6px',
            borderLeft: `3px solid ${subjectColor}`,
            marginBottom: '0.5rem',
            background: 'var(--bg-primary)',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.background = subjectColorBg
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-primary)'
          }}
        >
          <span
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-tertiary)',
              width: '1.5rem',
              flexShrink: 0,
              paddingTop: '0.125rem',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: '0.9375rem',
                color: 'var(--text-primary)',
                marginBottom: '0.25rem',
              }}
            >
              {chapter.title}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {chapter.summary}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.25rem',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                padding: '0.125rem 0.5rem',
                borderRadius: '999px',
                background: d.bg,
                color: d.color,
                whiteSpace: 'nowrap',
              }}
            >
              {chapter.difficulty}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
              {chapter.readTime} min
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}
