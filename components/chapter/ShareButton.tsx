'use client'
import { useState } from 'react'

export default function ShareButton() {
  const [copied, setCopied] = useState(false)

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <button
      onClick={handleClick}
      className="ml-auto flex items-center gap-1.5 text-sm text-fg-subtle hover:text-fg transition-colors cursor-pointer bg-transparent border-none p-0"
    >
      {copied ? (
        <span className="text-[#1a6b3a]">✓ Copied!</span>
      ) : (
        <span>Share ↗</span>
      )}
    </button>
  )
}
