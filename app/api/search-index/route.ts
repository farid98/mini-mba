import { getAllSubjectSlugs, getAllChapters } from '@/lib/content'
import { SUBJECTS } from '@/lib/subjects'

export async function GET() {
  const entries = getAllSubjectSlugs().flatMap(subject => {
    const meta = SUBJECTS.find(s => s.slug === subject)
    return getAllChapters(subject).map(ch => ({
      title: ch.title,
      summary: ch.summary,
      tags: ch.tags ?? [],
      subject: ch.subject,
      subjectTitle: meta?.title ?? subject,
      subjectColor: meta?.color ?? '#888888',
      slug: ch.slug,
      difficulty: ch.difficulty,
    }))
  })
  return Response.json(entries)
}
