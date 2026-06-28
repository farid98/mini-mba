import type { Subject } from '@/types/content'
import SubjectCard from './SubjectCard'

export default function SubjectGrid({ subjects }: { subjects: Subject[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {subjects.map(subject => (
        <SubjectCard key={subject.slug} subject={subject} />
      ))}
    </div>
  )
}
