import { ImageResponse } from 'next/og'
import { SUBJECTS } from '@/lib/subjects'
import { getChapter, getAllChapters, getAllSubjectSlugs } from '@/lib/content'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllSubjectSlugs().flatMap(subject =>
    getAllChapters(subject).map(ch => ({ subject, chapter: ch.slug }))
  )
}

export default async function Image({ params }: { params: Promise<{ subject: string; chapter: string }> }) {
  const { subject, chapter: chapterSlug } = await params
  const meta = SUBJECTS.find(s => s.slug === subject)
  const chapter = getChapter(subject, chapterSlug)

  if (!meta || !chapter) return new ImageResponse(<div style={{ display: 'flex' }}>Not found</div>, size)

  const difficultyColor =
    chapter.difficulty === 'foundational' ? '#16a34a'
    : chapter.difficulty === 'intermediate' ? '#d97706'
    : '#dc2626'

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
      }}
    >
      {/* Top color bar */}
      <div style={{ height: 12, background: meta.color, flexShrink: 0 }} />

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '56px 88px',
          justifyContent: 'space-between',
        }}
      >
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', color: meta.color, fontSize: 18, fontWeight: 700, letterSpacing: '0.06em' }}>
            {meta.title.toUpperCase()}
          </div>
          <div style={{ display: 'flex', color: '#d1d5db', fontSize: 18, marginLeft: 12, marginRight: 12 }}>·</div>
          <div style={{ display: 'flex', color: '#9ca3af', fontSize: 18 }}>Mini MBA</div>
        </div>

        {/* Title + summary */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              color: '#111111',
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            {chapter.title}
          </div>
          <div style={{ display: 'flex', color: '#6b7280', fontSize: 24, lineHeight: 1.5 }}>
            {chapter.summary}
          </div>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              background: difficultyColor + '18',
              color: difficultyColor,
              fontSize: 15,
              fontWeight: 600,
              padding: '6px 16px',
              borderRadius: 20,
              marginRight: 12,
            }}
          >
            {chapter.difficulty.charAt(0).toUpperCase() + chapter.difficulty.slice(1)}
          </div>
          <div
            style={{
              display: 'flex',
              background: '#f3f4f6',
              color: '#6b7280',
              fontSize: 15,
              fontWeight: 500,
              padding: '6px 16px',
              borderRadius: 20,
            }}
          >
            {chapter.readTime} min read
          </div>
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  )
}
