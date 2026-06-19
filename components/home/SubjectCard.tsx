'use client'

import Link from 'next/link'
import type { Subject } from '@/types/content'

interface SubjectCardProps {
  subject: Subject
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Link
      href={`/${subject.slug}`}
      style={{ textDecoration: 'none' }}
    >
      <div
        style={{
          border: '1px solid var(--border-color)',
          borderLeft: `4px solid ${subject.color}`,
          borderRadius: '8px',
          padding: '1.25rem',
          background: 'var(--bg-primary)',
          transition: 'background 0.15s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.background = subject.colorBg
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-primary)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h2
            style={{
              fontWeight: 600,
              fontSize: '1rem',
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            {subject.title}
          </h2>
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
              marginLeft: '0.75rem',
              whiteSpace: 'nowrap',
              marginTop: '0.125rem',
            }}
          >
            {subject.chapters.length} chapters
          </span>
        </div>
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            margin: '0.5rem 0 0',
            lineHeight: 1.5,
          }}
        >
          {subject.description}
        </p>
      </div>
    </Link>
  )
}
