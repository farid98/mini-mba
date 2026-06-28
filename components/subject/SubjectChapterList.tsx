'use client'
import { useProgress } from '@/hooks/useProgress'
import ChapterListItem from '@/components/chapter/ChapterListItem'
import type { ChapterFrontmatter } from '@/types/content'

interface Props {
  chapters: ChapterFrontmatter[]
  subject: string
  subjectColor: string
  subjectColorBg: string
}

export default function SubjectChapterList({ chapters, subject, subjectColor, subjectColorBg }: Props) {
  const { isCompleted, loaded } = useProgress()
  const completedCount = loaded
    ? chapters.filter(ch => isCompleted(`${subject}/${ch.slug}`)).length
    : 0

  return (
    <div>
      {loaded && completedCount > 0 && (
        <div className="mb-5">
          <div className="flex justify-between text-xs text-fg-subtle mb-2">
            <span>{completedCount} / {chapters.length} completed</span>
            {completedCount === chapters.length && (
              <span className="text-[#1a6b3a] font-medium">All done ✓</span>
            )}
          </div>
          <div className="h-1.5 bg-page-alt rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{ width: `${(completedCount / chapters.length) * 100}%`, background: subjectColor }}
            />
          </div>
        </div>
      )}
      <ol className="list-none p-0 m-0">
        {chapters.map((ch, i) => (
          <ChapterListItem
            key={ch.slug}
            chapter={ch}
            index={i}
            subject={subject}
            subjectColor={subjectColor}
            subjectColorBg={subjectColorBg}
            completed={loaded ? isCompleted(`${subject}/${ch.slug}`) : false}
          />
        ))}
      </ol>
    </div>
  )
}
