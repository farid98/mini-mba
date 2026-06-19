import { SUBJECTS } from '@/lib/subjects'
import { getAllChapters } from '@/lib/content'
import SubjectGrid from '@/components/home/SubjectGrid'
import type { Subject } from '@/types/content'

export default function HomePage() {
  const subjects: Subject[] = SUBJECTS.map(s => ({
    ...s,
    chapters: getAllChapters(s.slug),
  })).sort((a, b) => a.order - b.order)

  return (
    <main
      style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '3rem 1.5rem',
      }}
    >
      <header style={{ marginBottom: '2.5rem' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
          }}
        >
          Mini MBA
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '560px' }}>
          A concise graduate business curriculum — seven subjects, thirty-five chapters.
          Built for practitioners who want the substance without the two-year detour.
        </p>
      </header>

      <SubjectGrid subjects={subjects} />
    </main>
  )
}
