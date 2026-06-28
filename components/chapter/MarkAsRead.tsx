'use client'
import { useProgress } from '@/hooks/useProgress'

interface Props {
  subject: string
  slug: string
}

export default function MarkAsRead({ subject, slug }: Props) {
  const key = `${subject}/${slug}`
  const { isCompleted, toggle, loaded } = useProgress()
  const done = isCompleted(key)

  if (!loaded) return null

  return (
    <div className="flex justify-center pt-8 mt-8 border-t border-line">
      <button
        onClick={() => toggle(key)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer border ${
          done
            ? 'bg-[#edf7f1] text-[#1a6b3a] border-[#1a6b3a33]'
            : 'bg-page text-fg-muted border-line hover:border-fg-subtle hover:text-fg'
        }`}
      >
        <span className="text-base leading-none">{done ? '✓' : '○'}</span>
        <span>{done ? 'Completed' : 'Mark as read'}</span>
      </button>
    </div>
  )
}
