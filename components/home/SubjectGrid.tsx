import type { Subject } from '@/types/content'
import SubjectCard from './SubjectCard'

interface SubjectGridProps {
  subjects: Subject[]
}

export default function SubjectGrid({ subjects }: SubjectGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
      }}
    >
      {subjects.map(subject => (
        <SubjectCard key={subject.slug} subject={subject} />
      ))}
    </div>
  )
}
