'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface SearchEntry {
  title: string
  summary: string
  tags: string[]
  subject: string
  subjectTitle: string
  subjectColor: string
  slug: string
  difficulty: string
}

export default function SearchModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<SearchEntry[]>([])
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // ⌘K / Ctrl+K to open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Fetch index on first open
  useEffect(() => {
    if (open && index.length === 0) {
      fetch('/api/search-index').then(r => r.json()).then(setIndex)
    }
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  const results = query.length < 2
    ? []
    : index.filter(ch => {
        const q = query.toLowerCase()
        return ch.title.toLowerCase().includes(q) ||
          ch.summary.toLowerCase().includes(q) ||
          ch.tags.some(t => t.toLowerCase().includes(q))
      }).slice(0, 8)

  function go(entry: SearchEntry) {
    router.push(`/${entry.subject}/${entry.slug}`)
    setOpen(false)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(i => Math.min(i + 1, results.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && results[selected]) go(results[selected])
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-[2px] flex items-start justify-center pt-[14vh] px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-page w-full max-w-[560px] rounded-xl shadow-2xl border border-line overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fg-subtle shrink-0">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0) }}
            onKeyDown={onKeyDown}
            placeholder="Search chapters…"
            className="flex-1 outline-none bg-transparent text-fg text-[15px] placeholder:text-fg-subtle"
          />
          <kbd className="text-[11px] text-fg-subtle border border-line rounded px-1.5 py-0.5 font-sans">Esc</kbd>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="max-h-[360px] overflow-y-auto py-1">
            {results.map((r, i) => (
              <li
                key={`${r.subject}/${r.slug}`}
                onClick={() => go(r)}
                onMouseEnter={() => setSelected(i)}
                className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors duration-75 ${i === selected ? 'bg-page-alt' : ''}`}
              >
                <div
                  className="mt-[3px] w-2 h-2 rounded-full shrink-0"
                  style={{ background: r.subjectColor }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-fg truncate">{r.title}</div>
                  <div className="text-[12px] text-fg-subtle mt-0.5 truncate">{r.subjectTitle} · {r.difficulty}</div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="px-4 py-8 text-sm text-fg-subtle text-center">
            No chapters matching &ldquo;{query}&rdquo;
          </div>
        )}

        {query.length < 2 && (
          <div className="px-4 py-3 text-[12px] text-fg-subtle">
            {index.length > 0 ? `Search across ${index.length} chapters` : 'Loading…'}
          </div>
        )}

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-line flex gap-4 text-[11px] text-fg-subtle">
          <span><kbd className="border border-line rounded px-1 font-sans">↑↓</kbd> navigate</span>
          <span><kbd className="border border-line rounded px-1 font-sans">↵</kbd> open</span>
          <span><kbd className="border border-line rounded px-1 font-sans">Esc</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
