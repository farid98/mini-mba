'use client'

export default function SearchTrigger() {
  function open(e: React.MouseEvent) {
    e.preventDefault()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }))
  }

  return (
    <button
      onClick={open}
      className="mt-6 flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-line bg-page text-fg-subtle text-sm hover:border-fg-subtle transition-colors duration-150 cursor-pointer"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <span>Search chapters…</span>
      <kbd className="ml-auto text-[11px] border border-line rounded px-1.5 py-0.5 font-sans text-fg-subtle">⌘K</kbd>
    </button>
  )
}
