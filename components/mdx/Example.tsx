interface ExampleProps {
  title: string
  children: React.ReactNode
}

export default function Example({ title, children }: ExampleProps) {
  return (
    <div
      style={{
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '1.25rem',
        margin: '1.5rem 0',
      }}
    >
      <div
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-tertiary)',
          marginBottom: '0.5rem',
        }}
      >
        Case Study
      </div>
      <div
        style={{
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '0.75rem',
          fontSize: '0.9375rem',
        }}
      >
        {title}
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>{children}</div>
    </div>
  )
}
