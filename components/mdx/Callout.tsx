interface CalloutProps {
  type: 'insight' | 'warning' | 'definition'
  children: React.ReactNode
}

const styles = {
  insight: {
    background: '#eef3fb',
    borderColor: '#1a4d8a',
    icon: '💡',
  },
  warning: {
    background: '#fffbeb',
    borderColor: '#d97706',
    icon: '⚠️',
  },
  definition: {
    background: 'var(--bg-secondary)',
    borderColor: 'var(--border-color)',
    icon: '📖',
  },
}

export default function Callout({ type, children }: CalloutProps) {
  const s = styles[type]
  return (
    <aside
      style={{
        background: s.background,
        borderLeft: `3px solid ${s.borderColor}`,
        borderRadius: '0 6px 6px 0',
        padding: '1rem 1.25rem',
        margin: '1.5rem 0',
        fontSize: '0.9375rem',
      }}
    >
      {children}
    </aside>
  )
}
