import { notFound } from 'next/navigation'
import { SUBJECTS } from '@/lib/subjects'
import { getAllChapters, getAllSubjectSlugs } from '@/lib/content'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ChapterListItem from '@/components/chapter/ChapterListItem'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ subject: string }>
}

export async function generateStaticParams() {
  return getAllSubjectSlugs().map(subject => ({ subject }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject } = await params
  const meta = SUBJECTS.find(s => s.slug === subject)
  if (!meta) return {}
  return { title: `${meta.title} — Mini MBA` }
}

export default async function SubjectPage({ params }: Props) {
  const { subject } = await params
  const meta = SUBJECTS.find(s => s.slug === subject)
  if (!meta) notFound()

  const chapters = getAllChapters(subject)

  return (
    <main style={{ maxWidth: '760px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      <Breadcrumb subject={subject} />

      <header style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
          }}
        >
          {meta.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{meta.description}</p>
      </header>

      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {chapters.map((ch, i) => (
          <ChapterListItem
            key={ch.slug}
            chapter={ch}
            index={i}
            subject={subject}
            subjectColor={meta.color}
            subjectColorBg={meta.colorBg}
          />
        ))}
      </ol>
    </main>
  )
}
