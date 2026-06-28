'use client'

import Link from 'next/link'
import {
  IconTarget, IconCoin, IconSpeakerphone, IconUsers,
  IconSettings, IconTrendingUp, IconRocket,
} from '@tabler/icons-react'
import { useProgress } from '@/hooks/useProgress'
import type { Subject } from '@/types/content'

const ICONS: Record<string, React.ComponentType<{ size?: number; stroke?: number }>> = {
  strategy:       IconTarget,
  finance:        IconCoin,
  marketing:      IconSpeakerphone,
  leadership:     IconUsers,
  operations:     IconSettings,
  economics:      IconTrendingUp,
  entrepreneurship: IconRocket,
}

export default function SubjectCard({ subject }: { subject: Subject }) {
  const { isCompleted, loaded } = useProgress()
  const completedCount = loaded
    ? subject.chapters.filter(ch => isCompleted(`${subject.slug}/${ch.slug}`)).length
    : 0
  const pct = subject.chapters.length > 0 ? (completedCount / subject.chapters.length) * 100 : 0
  const Icon = ICONS[subject.slug] ?? IconTarget

  return (
    <Link href={`/${subject.slug}`} className="no-underline group">
      <div
        className="bg-page border border-line rounded-xl p-6 h-full flex flex-col transition-[transform,box-shadow] duration-200 group-hover:-translate-y-[3px] group-hover:shadow-[0_12px_32px_rgba(26,26,26,0.08)] group-hover:border-[#d8d3c9]"
      >
        {/* Top row */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: subject.colorBg, color: subject.color }}
          >
            <Icon size={18} stroke={1.75} />
          </div>
          <span
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{ background: subject.colorBg, color: subject.color }}
          >
            {subject.chapters.length} chapters
          </span>
        </div>

        {/* Title + description */}
        <h2 className="font-bold text-[1.0625rem] text-fg mb-2 m-0">
          {subject.title}
        </h2>
        <p className="text-sm text-fg-muted leading-snug flex-1 m-0">
          {subject.description}
        </p>

        {/* Progress bar */}
        {loaded && completedCount > 0 && (
          <div className="mt-4">
            <div className="h-1 bg-page-alt rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{ width: `${pct}%`, background: subject.color }}
              />
            </div>
            <div className="text-[11px] text-fg-subtle mt-1">
              {completedCount} / {subject.chapters.length} completed
            </div>
          </div>
        )}

        {/* Begin → */}
        <div
          className="mt-4 text-sm font-semibold transition-colors duration-150"
          style={{ color: subject.color }}
        >
          {completedCount > 0 && completedCount < subject.chapters.length
            ? 'Continue →'
            : completedCount === subject.chapters.length
            ? 'Review →'
            : 'Begin →'}
        </div>
      </div>
    </Link>
  )
}
