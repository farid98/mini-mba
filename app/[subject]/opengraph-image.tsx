import { ImageResponse } from 'next/og'
import { SUBJECTS } from '@/lib/subjects'
import { getAllChapters, getAllSubjectSlugs } from '@/lib/content'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllSubjectSlugs().map(subject => ({ subject }))
}

export default async function Image({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params
  const meta = SUBJECTS.find(s => s.slug === subject)
  const chapters = getAllChapters(subject)

  if (!meta) return new ImageResponse(<div style={{ display: 'flex' }}>Not found</div>, size)

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#ffffff',
      }}
    >
      {/* Left color bar */}
      <div style={{ width: 16, background: meta.color, flexShrink: 0 }} />

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 88px',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', color: '#9ca3af', fontSize: 18, fontWeight: 600, letterSpacing: '0.08em' }}>
          MINI MBA
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', color: '#111111', fontSize: 72, fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
            {meta.title}
          </div>
          <div style={{ display: 'flex', color: '#6b7280', fontSize: 26, lineHeight: 1.5 }}>
            {meta.description}
          </div>
        </div>

        <div style={{ display: 'flex', color: meta.color, fontSize: 18, fontWeight: 600 }}>
          {chapters.length} chapters
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  )
}
