'use client'
import { useEffect, useState } from 'react'

export default function ReadingProgress({ color }: { color: string }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    function update() {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setPct(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent pointer-events-none">
      <div
        className="h-full transition-[width] duration-75"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  )
}
