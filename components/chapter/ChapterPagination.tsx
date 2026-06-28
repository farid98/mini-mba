import Link from 'next/link'
import type { ChapterFrontmatter } from '@/types/content'

interface ChapterPaginationProps {
  subject: string
  prev: ChapterFrontmatter | null
  next: ChapterFrontmatter | null
}

export default function ChapterPagination({ subject, prev, next }: ChapterPaginationProps) {
  if (!prev && !next) return null

  return (
    <div className="flex justify-between pt-8 mt-8 border-t border-line gap-4">
      {prev ? (
        <Link href={`/${subject}/${prev.slug}`} className="no-underline flex-1">
          <div className="text-xs text-fg-subtle mb-1">← Previous</div>
          <div className="text-sm text-fg font-medium">{prev.title}</div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={`/${subject}/${next.slug}`} className="no-underline flex-1 text-right">
          <div className="text-xs text-fg-subtle mb-1">Next →</div>
          <div className="text-sm text-fg font-medium">{next.title}</div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
