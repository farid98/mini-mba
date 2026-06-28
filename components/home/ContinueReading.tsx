'use client'
import Link from 'next/link'
import { useProgress } from '@/hooks/useProgress'

interface Chapter {
  subject: string
  slug: string
  title: string
}

export default function ContinueReading({ chapters }: { chapters: Chapter[] }) {
  const { isCompleted, loaded } = useProgress()
  if (!loaded) return null

  const completedCount = chapters.filter(ch => isCompleted(`${ch.subject}/${ch.slug}`)).length
  if (completedCount === 0) return null

  const next = chapters.find(ch => !isCompleted(`${ch.subject}/${ch.slug}`))
  if (!next) return null

  return (
    <div className="flex items-center gap-3 mt-6">
      <span className="text-sm text-fg-subtle">Continue where you left off</span>
      <Link
        href={`/${next.subject}/${next.slug}`}
        className="text-sm font-semibold text-navy hover:underline no-underline"
      >
        {next.title} →
      </Link>
    </div>
  )
}
