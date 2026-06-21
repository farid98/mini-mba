'use client'

import { useEffect, useRef, useState } from 'react'
import React from 'react'

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (!node) return ''
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (React.isValidElement(node)) {
    const inner = extractText((node.props as { children?: React.ReactNode }).children)
    // Paragraph breaks must become newlines — without this, a blank line in the MDX
    // source splits the diagram code into separate <p> elements that get joined
    // without newlines, breaking diagram types like sankey-beta that need line-separated data.
    if (node.type === 'p') return inner + '\n'
    return inner
  }
  return ''
}

let mermaidReady = false

export default function Diagram({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const code = extractText(children).trim()
    if (!code) return

    import('mermaid').then(({ default: mermaid }) => {
      if (!mermaidReady) {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          fontFamily: 'inherit',
          fontSize: 14,
          sankey: {
            height: 400,
            width: 600,
          },
        })
        mermaidReady = true
      }

      const id = `mermaid-${Math.random().toString(36).slice(2)}`
      mermaid.render(id, code).then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg
      }).catch(err => {
        console.error('Mermaid render error:', String(err), '\nCode:\n', code)
        setError(String(err))
      })
    })
  }, [children])

  const rawText = extractText(children)

  if (error) {
    return (
      <pre
        style={{
          background: 'var(--bg-secondary)',
          padding: '1rem',
          borderRadius: '6px',
          fontSize: '0.875rem',
          color: 'var(--text-tertiary)',
          overflow: 'auto',
        }}
      >
        {rawText}
      </pre>
    )
  }

  return (
    <div
      ref={ref}
      style={{
        margin: '1.5rem 0',
        overflowX: 'auto',
        textAlign: 'center',
      }}
    />
  )
}
