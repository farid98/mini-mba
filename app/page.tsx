import Link from 'next/link'
import { SUBJECTS } from '@/lib/subjects'
import { getAllChapters } from '@/lib/content'
import SubjectGrid from '@/components/home/SubjectGrid'
import ContinueReading from '@/components/home/ContinueReading'
import type { Subject } from '@/types/content'

export default function HomePage() {
  const subjects: Subject[] = SUBJECTS.map(s => ({
    ...s,
    chapters: getAllChapters(s.slug),
  })).sort((a, b) => a.order - b.order)

  const totalChapters = subjects.reduce((n, s) => n + s.chapters.length, 0)
  const totalMins = subjects.reduce((n, s) => n + s.chapters.reduce((m, ch) => m + ch.readTime, 0), 0)
  const totalHrs = Math.round(totalMins / 60)

  const allChapters = subjects.flatMap(s =>
    s.chapters.map(ch => ({ subject: s.slug, slug: ch.slug, title: ch.title }))
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mini MBA',
    url: 'https://mini-mba.app',
    description: 'A concise MBA curriculum — strategy, finance, marketing, leadership, operations, economics, and entrepreneurship.',
    hasPart: subjects.map(s => ({
      '@type': 'Course',
      name: s.title,
      url: `https://mini-mba.app/${s.slug}`,
      description: s.description,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <div className="max-w-[960px] mx-auto px-6 pt-16 pb-12">
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-fg-subtle mb-5">
          Free · Self-paced · No sign-up required
        </div>

        <h1 className="text-[2.5rem] sm:text-[3rem] font-bold leading-[1.08] tracking-[-0.02em] text-fg mb-5 max-w-[18ch]">
          The MBA core, distilled to what actually matters.
        </h1>

        <p className="text-lg text-fg-muted leading-relaxed max-w-[52ch] mb-0">
          {subjects.length} disciplines. {totalChapters} chapters. The frameworks taught at top
          business schools — explained clearly enough to use, not just recognise.
        </p>

        <ContinueReading chapters={allChapters} />

        {/* Stats strip */}
        <div className="flex gap-10 mt-10 pt-8 border-t border-line flex-wrap">
          {[
            { n: subjects.length, l: 'Disciplines' },
            { n: totalChapters,   l: 'Chapters' },
            { n: `~${totalHrs} hrs`, l: 'To complete' },
            { n: '$0',            l: 'Cost' },
          ].map(({ n, l }) => (
            <div key={l}>
              <div className="text-[1.75rem] font-bold tracking-[-0.01em] text-fg leading-none">{n}</div>
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-fg-subtle mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Curriculum ─────────────────────────────────────────── */}
      <div className="max-w-[960px] mx-auto px-6 py-14">
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-fg-subtle mb-3">
          The curriculum
        </div>
        <h2 className="text-[1.75rem] font-bold tracking-[-0.015em] text-fg mb-3">
          Seven disciplines that compound on each other.
        </h2>
        <p className="text-base text-fg-muted mb-10 max-w-[56ch]">
          Start anywhere, or follow them in order. Strategy tells you where to compete;
          finance tells you whether it's worth it; the rest tell you how to pull it off.
        </p>

        <SubjectGrid subjects={subjects} />
      </div>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <div className="max-w-[960px] mx-auto px-6 pb-20">
        <div className="bg-[#1a1a1a] rounded-2xl px-10 py-14 text-center">
          <h2 className="text-[1.75rem] font-bold tracking-[-0.02em] text-white mb-3">
            Begin with the most misused word in business.
          </h2>
          <p className="text-base text-[#a8a49c] max-w-[44ch] mx-auto mb-8 leading-relaxed">
            Strategy, Lesson 01. Ten minutes. No sign-up, no paywall — just the start of a
            genuine business education.
          </p>
          <Link
            href="/strategy/what-is-strategy"
            className="no-underline inline-block bg-white text-[#1a1a1a] font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#f0ede8] transition-colors duration-150"
          >
            Start the first lesson →
          </Link>
        </div>
      </div>
    </>
  )
}
