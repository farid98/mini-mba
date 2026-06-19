import type { ChapterFrontmatter } from '@/types/content'

const difficultyStyle = {
  foundational: { bg: '#edf7f1', color: '#1a6b3a' },
  intermediate: { bg: '#fffbeb', color: '#92400e' },
  advanced: { bg: '#fef2f2', color: '#991b1b' },
}

interface ChapterHeaderProps {
  chapter: ChapterFrontmatter
  subjectColor: string
}

export default function ChapterHeader({ chapter, subjectColor }: ChapterHeaderProps) {
  const d = difficultyStyle[chapter.difficulty]

  return (
    <header style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
      <h1
        style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          lineHeight: 1.25,
          color: 'var(--text-primary)',
          margin: '0 0 0.75rem',
        }}
      >
        {chapter.title}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            padding: '0.125rem 0.5rem',
            borderRadius: '999px',
            background: d.bg,
            color: d.color,
          }}
        >
          {chapter.difficulty}
        </span>

        <span style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
          {chapter.readTime} min read
        </span>
      </div>

      {chapter.summary && (
        <p
          style={{
            marginTop: '0.75rem',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}
        >
          {chapter.summary}
        </p>
      )}
    </header>
  )
}
