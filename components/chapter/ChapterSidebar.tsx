import Link from 'next/link'
import type { ChapterFrontmatter } from '@/types/content'

interface ChapterSidebarProps {
  subject: string
  subjectTitle: string
  subjectColor: string
  chapters: ChapterFrontmatter[]
  currentSlug: string
}

export default function ChapterSidebar({
  subject,
  subjectTitle,
  subjectColor,
  chapters,
  currentSlug,
}: ChapterSidebarProps) {
  return (
    <nav className="w-[220px] shrink-0 sticky top-6 self-start">
      <Link href={`/${subject}`} className="no-underline">
        <div
          className="font-bold text-sm mb-3 uppercase tracking-[0.06em]"
          style={{ color: subjectColor }}
        >
          {subjectTitle}
        </div>
      </Link>

      <ul className="list-none p-0 m-0">
        {chapters.map(ch => {
          const isActive = ch.slug === currentSlug
          return (
            <li key={ch.slug}>
              <Link
                href={`/${subject}/${ch.slug}`}
                className={`block px-3 py-[0.375rem] rounded text-sm no-underline mb-[0.125rem] leading-[1.4] border-l-2 ${
                  isActive
                    ? 'bg-page-alt font-semibold'
                    : 'bg-transparent font-normal text-fg-muted border-transparent'
                }`}
                style={isActive ? { color: subjectColor, borderLeftColor: subjectColor } : undefined}
              >
                {ch.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
