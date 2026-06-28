'use client'

import Link from 'next/link'
import type { ChapterFrontmatter } from '@/types/content'

const difficultyClass = {
  foundational: 'bg-[#edf7f1] text-[#1a6b3a]',
  intermediate: 'bg-amber-50 text-amber-800',
  advanced:     'bg-red-50 text-red-800',
}

interface ChapterListItemProps {
  chapter: ChapterFrontmatter
  index: number
  subject: string
  subjectColor: string
  subjectColorBg: string
}

export default function ChapterListItem({
  chapter,
  index,
  subject,
  subjectColor,
  subjectColorBg,
}: ChapterListItemProps) {
  return (
    <li>
      <Link href={`/${subject}/${chapter.slug}`} className="no-underline block">
        <div
          className="flex gap-4 p-4 rounded-[6px] mb-2 bg-page transition-colors duration-150"
          style={{ borderLeft: `3px solid ${subjectColor}` }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.background = subjectColorBg
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.background = ''
          }}
        >
          <span className="text-sm text-fg-subtle w-6 shrink-0 pt-[0.125rem]">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="flex-1">
            {/* Difficulty pill — mobile only */}
            <div className="sm:hidden mb-[0.375rem]">
              <span className={`text-[0.6875rem] font-semibold uppercase px-2 py-[0.125rem] rounded-full whitespace-nowrap ${difficultyClass[chapter.difficulty]}`}>
                {chapter.difficulty}
              </span>
            </div>

            <div className="font-semibold text-[0.9375rem] text-fg mb-1">
              {chapter.title}
            </div>
            <div className="text-sm text-fg-muted leading-snug">
              {chapter.summary}
            </div>

            {/* Read time — mobile only */}
            <div className="sm:hidden mt-[0.375rem] text-xs text-fg-subtle">
              {chapter.readTime} min
            </div>
          </div>

          {/* Right meta — desktop only */}
          <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
            <span className={`text-[0.6875rem] font-semibold uppercase px-2 py-[0.125rem] rounded-full whitespace-nowrap ${difficultyClass[chapter.difficulty]}`}>
              {chapter.difficulty}
            </span>
            <span className="text-xs text-fg-subtle whitespace-nowrap">
              {chapter.readTime} min
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}
