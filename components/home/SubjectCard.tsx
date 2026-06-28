'use client'

import Link from 'next/link'
import { useProgress } from '@/hooks/useProgress'
import type { Subject } from '@/types/content'

interface SubjectCardProps {
  subject: Subject
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const { isCompleted, loaded } = useProgress()
  const completedCount = loaded
    ? subject.chapters.filter(ch => isCompleted(`${subject.slug}/${ch.slug}`)).length
    : 0
  const pct = subject.chapters.length > 0 ? (completedCount / subject.chapters.length) * 100 : 0

  return (
    <Link href={`/${subject.slug}`} className="no-underline">
      <div
        className="border border-line rounded-lg p-5 bg-page cursor-pointer transition-colors duration-150"
        style={{ borderLeft: `4px solid ${subject.color}` }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.background = subject.colorBg
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.background = ''
        }}
      >
        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-base text-fg m-0">
            {subject.title}
          </h2>
          <span className="text-xs text-fg-subtle ml-3 whitespace-nowrap mt-0.5">
            {subject.chapters.length} chapters
          </span>
        </div>
        <p className="text-sm text-fg-muted mt-2 mb-0 leading-snug">
          {subject.description}
        </p>
        {loaded && completedCount > 0 && (
          <div className="mt-3">
            <div className="h-1 bg-page-alt rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{ width: `${pct}%`, background: subject.color }}
              />
            </div>
            <div className="text-[11px] text-fg-subtle mt-1">
              {completedCount} / {subject.chapters.length}
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
