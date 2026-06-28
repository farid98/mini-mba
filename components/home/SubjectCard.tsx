'use client'

import Link from 'next/link'
import type { Subject } from '@/types/content'

interface SubjectCardProps {
  subject: Subject
}

export default function SubjectCard({ subject }: SubjectCardProps) {
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
      </div>
    </Link>
  )
}
