import type { ChapterFrontmatter } from '@/types/content'
import ShareButton from './ShareButton'

const difficultyClass = {
  foundational: 'bg-[#edf7f1] text-[#1a6b3a]',
  intermediate: 'bg-amber-50 text-amber-800',
  advanced:     'bg-red-50 text-red-800',
}

interface ChapterHeaderProps {
  chapter: ChapterFrontmatter
}

export default function ChapterHeader({ chapter }: ChapterHeaderProps) {
  return (
    <header className="mb-8 pb-6 border-b border-line">
      <h1 className="text-[1.75rem] font-bold leading-tight text-fg m-0 mb-3">
        {chapter.title}
      </h1>

      <div className="flex items-center gap-3 flex-wrap">
        <span className={`text-[0.6875rem] font-semibold uppercase tracking-[0.06em] px-2 py-[0.125rem] rounded-full ${difficultyClass[chapter.difficulty]}`}>
          {chapter.difficulty}
        </span>
        <span className="text-sm text-fg-subtle">
          {chapter.readTime} min read
        </span>
        <ShareButton />
      </div>

      {chapter.summary && (
        <p className="mt-3 text-base text-fg-muted leading-relaxed">
          {chapter.summary}
        </p>
      )}
    </header>
  )
}
