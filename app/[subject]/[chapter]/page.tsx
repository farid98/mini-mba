import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { SUBJECTS } from '@/lib/subjects'
import { getAllChapters, getAllSubjectSlugs, getChapter, resolveChapter } from '@/lib/content'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ChapterHeader from '@/components/chapter/ChapterHeader'
import ChapterSidebar from '@/components/chapter/ChapterSidebar'
import ChapterPagination from '@/components/chapter/ChapterPagination'
import MarkAsRead from '@/components/chapter/MarkAsRead'
import PrerequisiteBanner from '@/components/chapter/PrerequisiteBanner'
import RelatedLinks from '@/components/chapter/RelatedLinks'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ subject: string; chapter: string }>
}

export async function generateStaticParams() {
  return getAllSubjectSlugs().flatMap(subject =>
    getAllChapters(subject).map(ch => ({ subject, chapter: ch.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject, chapter } = await params
  const ch = getChapter(subject, chapter)
  if (!ch) return {}
  return {
    title: ch.title,
    description: ch.summary,
    openGraph: {
      title: ch.title,
      description: ch.summary,
      url: `/${subject}/${chapter}`,
      type: 'article',
    },
  }
}

export default async function ChapterPage({ params }: Props) {
  const { subject, chapter: chapterSlug } = await params
  const subjectMeta = SUBJECTS.find(s => s.slug === subject)
  if (!subjectMeta) notFound()

  const chapter = getChapter(subject, chapterSlug)
  if (!chapter) notFound()

  const allChapters = getAllChapters(subject)
  const idx = allChapters.findIndex(ch => ch.slug === chapterSlug)
  const prev = idx > 0 ? allChapters[idx - 1] : null
  const next = idx < allChapters.length - 1 ? allChapters[idx + 1] : null

  const prerequisites = (chapter.prerequisites ?? [])
    .map(ref => resolveChapter(ref))
    .filter((ch): ch is NonNullable<typeof ch> => ch !== null)

  const related = (chapter.related ?? [])
    .map(ref => resolveChapter(ref))
    .filter((ch): ch is NonNullable<typeof ch> => ch !== null)

  const MDXContent = dynamic(
    () => import(`@/content/${subject}/${String(chapter.order).padStart(2, '0')}-${chapterSlug}.mdx`)
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: chapter.title,
    description: chapter.summary,
    url: `https://mini-mba.app/${subject}/${chapterSlug}`,
    isPartOf: {
      '@type': 'Course',
      name: subjectMeta.title,
      url: `https://mini-mba.app/${subject}`,
    },
    educationalLevel: chapter.difficulty,
    timeRequired: `PT${chapter.readTime}M`,
  }

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="max-w-[1000px] mx-auto px-6 py-10 flex gap-12 items-start">
      <div className="hidden lg:block">
        <ChapterSidebar
          subject={subject}
          subjectTitle={subjectMeta.title}
          subjectColor={subjectMeta.color}
          chapters={allChapters}
          currentSlug={chapterSlug}
        />
      </div>

      <article className="flex-1 min-w-0 max-w-[720px]">
        <Breadcrumb subject={subject} chapter={chapter.title} />
        <PrerequisiteBanner prerequisites={prerequisites} />
        <ChapterHeader chapter={chapter} />

        <div className="prose">
          <MDXContent />
        </div>

        <RelatedLinks related={related} />
        <MarkAsRead subject={subject} slug={chapterSlug} />
        <ChapterPagination subject={subject} prev={prev} next={next} />
      </article>
    </div>
    </>
  )
}
