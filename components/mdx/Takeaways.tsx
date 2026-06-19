interface TakeawaysProps {
  children: React.ReactNode
}

export default function Takeaways({ children }: TakeawaysProps) {
  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '1.25rem 1.5rem',
        margin: '2rem 0',
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-tertiary)',
          marginBottom: '0.75rem',
        }}
      >
        Key Takeaways
      </div>
      <div style={{ color: 'var(--text-secondary)' }}>{children}</div>
    </div>
  )
}
