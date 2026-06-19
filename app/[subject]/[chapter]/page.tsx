import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { SUBJECTS } from '@/lib/subjects'
import { getAllChapters, getAllSubjectSlugs, getChapter, resolveChapter } from '@/lib/content'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ChapterHeader from '@/components/chapter/ChapterHeader'
import ChapterSidebar from '@/components/chapter/ChapterSidebar'
import ChapterPagination from '@/components/chapter/ChapterPagination'
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
  return { title: `${ch.title} — Mini MBA` }
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

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '2.5rem 1.5rem',
        display: 'flex',
        gap: '3rem',
        alignItems: 'flex-start',
      }}
    >
      {/* Sidebar — hidden on mobile via inline style (no Tailwind needed) */}
      <div className="hidden lg:block">
        <ChapterSidebar
          subject={subject}
          subjectTitle={subjectMeta.title}
          subjectColor={subjectMeta.color}
          chapters={allChapters}
          currentSlug={chapterSlug}
        />
      </div>

      <article style={{ flex: 1, minWidth: 0, maxWidth: 'var(--reading-width)' }}>
        <Breadcrumb subject={subject} chapter={chapter.title} />
        <PrerequisiteBanner prerequisites={prerequisites} />
        <ChapterHeader chapter={chapter} subjectColor={subjectMeta.color} />

        <div className="prose">
          <MDXContent />
        </div>

        <RelatedLinks related={related} />
        <ChapterPagination subject={subject} prev={prev} next={next} />
      </article>
    </div>
  )
}
