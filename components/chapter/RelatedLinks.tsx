import Link from 'next/link'
import type { ChapterFrontmatter } from '@/types/content'
import { SUBJECTS } from '@/lib/subjects'

interface RelatedLinksProps {
  related: ChapterFrontmatter[]
}

export default function RelatedLinks({ related }: RelatedLinksProps) {
  if (related.length === 0) return null

  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold uppercase tracking-[0.06em] text-fg-subtle mb-3">
        Related Chapters
      </h3>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
        {related.map(ch => {
          const subject = SUBJECTS.find(s => s.slug === ch.subject)
          return (
            <Link key={ch.slug} href={`/${ch.subject}/${ch.slug}`} className="no-underline">
              <div
                className="border border-line rounded-[6px] p-3 bg-page"
                style={{ borderLeft: `3px solid ${subject?.color ?? '#888'}` }}
              >
                <div className="text-xs text-fg-subtle mb-1">{subject?.title}</div>
                <div className="text-sm text-fg font-medium leading-tight">{ch.title}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
