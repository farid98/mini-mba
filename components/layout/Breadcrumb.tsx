'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { SUBJECTS } from '@/lib/subjects'

interface BreadcrumbProps {
  subject?: string
  chapter?: string
}

const A = 11 // chevron arrow depth, px

// Steps: [first, middle, last] — opacity of subject color over white
const STEPS: Record<number, number[]> = {
  1: [1],
  2: [0.15, 1],
  3: [0.12, 0.48, 1],
}

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}

// Chevron clip — all crumbs have right-pointing arrow; only first has flat left edge
function clip(isFirst: boolean) {
  return isFirst
    ? `polygon(0 0, calc(100% - ${A}px) 0, 100% 50%, calc(100% - ${A}px) 100%, 0 100%)`
    : `polygon(${A}px 0, calc(100% - ${A}px) 0, 100% 50%, calc(100% - ${A}px) 100%, ${A}px 100%, 0 50%)`
}

export default function Breadcrumb({ subject, chapter }: BreadcrumbProps) {
  const subjectMeta = subject ? SUBJECTS.find(s => s.slug === subject) : null
  const [r, g, b] = subjectMeta ? hexToRgb(subjectMeta.color) : [40, 40, 40]

  const crumbs: { label: string; href?: string }[] = [{ label: 'Home', href: '/' }]
  if (subjectMeta) crumbs.push({ label: subjectMeta.title, href: chapter ? `/${subject}` : undefined })
  if (chapter)     crumbs.push({ label: chapter })

  const steps = STEPS[crumbs.length] ?? [1]

  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', flexWrap: 'wrap', rowGap: '6px', marginBottom: '2rem' }}>
      {crumbs.map((crumb, i) => {
        const alpha  = steps[i] ?? 1
        const isLast = i === crumbs.length - 1
        const isDark = alpha >= 0.65   // flip text to white above this threshold

        const style: CSSProperties = {
          display:        'inline-flex',
          alignItems:     'center',
          height:         '30px',
          paddingLeft:    i === 0 ? '14px' : `${A + 10}px`,
          paddingRight:   `${A + 12}px`,
          background:     `rgba(${r}, ${g}, ${b}, ${alpha})`,
          color:          isDark ? '#ffffff' : '#111111',
          fontSize:       '0.8125rem',
          fontWeight:     isLast ? 600 : 500,
          textDecoration: 'none',
          clipPath:       clip(i === 0),
          marginLeft:     i === 0 ? '0' : `-${A}px`,
          position:       'relative',
          zIndex:         i + 1,  // later crumbs sit on top, notch reveals arrow beneath
          whiteSpace:     'nowrap',
          letterSpacing:  '-0.01em',
          transition:     'filter 0.12s',
        }

        return crumb.href ? (
          <Link
            key={i}
            href={crumb.href}
            style={style}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.filter = 'brightness(0.88)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.filter = '')}
          >
            {crumb.label}
          </Link>
        ) : (
          <span key={i} style={style}>{crumb.label}</span>
        )
      })}
    </nav>
  )
}
