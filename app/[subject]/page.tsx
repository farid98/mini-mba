import { notFound } from 'next/navigation'
import { SUBJECTS } from '@/lib/subjects'
import { getAllChapters, getAllSubjectSlugs } from '@/lib/content'
import Breadcrumb from '@/components/layout/Breadcrumb'
import SubjectChapterList from '@/components/subject/SubjectChapterList'
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
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${subject}`,
    },
  }
}

export default async function SubjectPage({ params }: Props) {
  const { subject } = await params
  const meta = SUBJECTS.find(s => s.slug === subject)
  if (!meta) notFound()

  const chapters = getAllChapters(subject)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: meta.title,
    description: meta.description,
    url: `https://mini-mba-seven.vercel.app/${subject}`,
    provider: { '@type': 'Organization', name: 'Mini MBA', url: 'https://mini-mba-seven.vercel.app' },
    hasCourseInstance: chapters.map(ch => ({
      '@type': 'CourseInstance',
      name: ch.title,
      description: ch.summary,
      url: `https://mini-mba-seven.vercel.app/${subject}/${ch.slug}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-[760px] mx-auto px-6 py-10">
      <Breadcrumb subject={subject} />

      <header className="mb-8">
        <h1 className="text-[1.75rem] font-bold text-fg mb-2">
          {meta.title}
        </h1>
        <p className="text-fg-muted text-base">{meta.description}</p>
      </header>

      <SubjectChapterList
        chapters={chapters}
        subject={subject}
        subjectColor={meta.color}
        subjectColorBg={meta.colorBg}
      />
    </main>
    </>
  )
}
