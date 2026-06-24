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
        style={{
          margin: '2.5rem 0',
          padding: '1.25rem 1.5rem',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          background: 'var(--bg-secondary)',
          userSelect: 'none',
        }}
      >
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3, fontSize: 15 }}>
            Chapter Slides
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
            {slides.length} slides · arrow keys to navigate · Esc to exit
          </div>
        </div>
        <div style={{
          background: '#1a4d8a',
          color: 'white',
          padding: '0.45rem 1.1rem',
          borderRadius: '6px',
          fontWeight: 500,
          fontSize: 13,
          flexShrink: 0,
          marginLeft: '1rem',
        }}>
          ▶ Present
        </div>
      </div>
    )
  }

  const progress = ((index + 1) / slides.length) * 100

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ height: 3, background: '#e5e5e5', flexShrink: 0 }}>
        <div style={{
          height: '100%',
          background: '#1a4d8a',
          width: `${progress}%`,
          transition: 'width 0.2s ease',
        }} />
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 5rem',
        overflow: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: 820 }}>
          {slides[index]}
        </div>
      </div>

      <div style={{
        padding: '0.875rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid #e5e5e5',
        flexShrink: 0,
      }}>
        <button
          onClick={close}
          style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer', fontSize: 13, padding: '0.25rem 0' }}
        >
          ✕ Exit
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? 20 : 6,
                height: 6,
                borderRadius: 3,
                border: 'none',
                background: i === index ? '#1a4d8a' : '#d0d0d0',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.2s ease, background 0.2s ease',
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={prev}
            disabled={index === 0}
            style={{
              background: 'none',
              border: '1px solid #e5e5e5',
              color: index === 0 ? '#cccccc' : '#444444',
              cursor: index === 0 ? 'default' : 'pointer',
              padding: '0.35rem 0.9rem',
              borderRadius: 4,
              fontSize: 15,
              lineHeight: 1,
            }}
          >←</button>
          <span style={{ color: '#888888', fontSize: 12, minWidth: 55, textAlign: 'center' }}>
            {index + 1} / {slides.length}
          </span>
          <button
            onClick={next}
            disabled={index === slides.length - 1}
            style={{
              background: 'none',
              border: '1px solid #e5e5e5',
              color: index === slides.length - 1 ? '#cccccc' : '#444444',
              cursor: index === slides.length - 1 ? 'default' : 'pointer',
              padding: '0.35rem 0.9rem',
              borderRadius: 4,
              fontSize: 15,
              lineHeight: 1,
            }}
          >→</button>
        </div>

        <div style={{ color: '#cccccc', fontSize: 11, minWidth: 70, textAlign: 'right' }}>← → space</div>
      </div>
    </div>
  )
}
