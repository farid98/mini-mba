import { SUBJECTS } from '@/lib/subjects'
import { getAllChapters } from '@/lib/content'
import SubjectGrid from '@/components/home/SubjectGrid'
import type { Subject } from '@/types/content'

export default function HomePage() {
  const subjects: Subject[] = SUBJECTS.map(s => ({
    ...s,
    chapters: getAllChapters(s.slug),
  })).sort((a, b) => a.order - b.order)

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
      <main className="max-w-[960px] mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-[2rem] font-bold text-fg mb-2">
          Mini MBA
        </h1>
        <p className="text-fg-muted text-base max-w-[560px]">
          A concise MBA refresher.
          A quick cheat-sheet to everything they teach you in 2 years ;)
        </p>
      </header>

      <SubjectGrid subjects={subjects} />
    </main>
    </>
  )
}
