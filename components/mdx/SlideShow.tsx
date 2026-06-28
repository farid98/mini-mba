'use client'
import React, { useState, useEffect, useCallback } from 'react'

export default function SlideShow({ children }: { children: React.ReactNode }) {
  const slides = React.Children.toArray(children)
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setEnabled(localStorage.getItem('mini-mba-slides') === 'true')
    setLoaded(true)
  }, [])

  const prev = useCallback(() => setIndex(i => Math.max(0, i - 1)), [])
  const next = useCallback(() => setIndex(i => Math.min(slides.length - 1, i + 1)), [slides.length])
  const close = useCallback(() => { setOpen(false); setIndex(0) }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev() }
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, next, prev, close])

  if (!loaded || !enabled) return null

  if (!open) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => { setIndex(0); setOpen(true) }}
        onKeyDown={e => { if (e.key === 'Enter') { setIndex(0); setOpen(true) } }}
        className="my-10 px-6 py-5 border border-line rounded-lg flex items-center justify-between cursor-pointer bg-page-alt select-none"
      >
        <div>
          <div className="font-semibold text-fg mb-[3px] text-[15px]">
            Chapter Slides
          </div>
          <div className="text-[13px] text-fg-subtle">
            {slides.length} slides · arrow keys to navigate · Esc to exit
          </div>
        </div>
        <div className="bg-navy text-white py-[0.45rem] px-[1.1rem] rounded-[6px] font-medium text-[13px] shrink-0 ml-4">
          ▶ Present
        </div>
      </div>
    )
  }

  const progress = ((index + 1) / slides.length) * 100

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col">
      {/* Progress bar */}
      <div className="h-[3px] bg-line shrink-0">
        <div
          className="h-full bg-navy transition-[width] duration-200 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center px-20 py-12 overflow-auto">
        <div className="w-full max-w-[820px]">
          {slides[index]}
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-[0.875rem] flex items-center justify-between border-t border-line shrink-0">
        <button
          onClick={close}
          className="bg-transparent border-none text-fg-subtle cursor-pointer text-[13px] py-1 px-0 hover:text-fg-muted"
        >
          ✕ Exit
        </button>

        {/* Bullet dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="h-[6px] rounded-[3px] border-none cursor-pointer p-0 transition-[width,background-color] duration-200 ease-in-out"
              style={{
                width: i === index ? 20 : 6,
                background: i === index ? '#1a4d8a' : '#d0d0d0',
              }}
            />
          ))}
        </div>

        {/* Prev / counter / next */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            disabled={index === 0}
            className="bg-transparent border border-line text-[15px] py-[0.35rem] px-[0.9rem] rounded cursor-pointer leading-none disabled:text-[#cccccc] disabled:cursor-default text-fg-muted"
          >←</button>
          <span className="text-fg-subtle text-[12px] min-w-[55px] text-center">
            {index + 1} / {slides.length}
          </span>
          <button
            onClick={next}
            disabled={index === slides.length - 1}
            className="bg-transparent border border-line text-[15px] py-[0.35rem] px-[0.9rem] rounded cursor-pointer leading-none disabled:text-[#cccccc] disabled:cursor-default text-fg-muted"
          >→</button>
        </div>

        <div className="text-[#cccccc] text-[11px] min-w-[70px] text-right">← → space</div>
      </div>
    </div>
  )
}
