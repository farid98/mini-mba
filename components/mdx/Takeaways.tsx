interface TakeawaysProps {
  children: React.ReactNode
}

export default function Takeaways({ children }: TakeawaysProps) {
  return (
    <aside
      style={{
        background: '#f0f7f4',
        borderLeft: '3px solid #1a6b6b',
        borderRadius: '0 6px 6px 0',
        padding: '1rem 1.25rem 1rem 1.5rem',
        margin: '2rem 0',
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: '0.6875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#1a6b6b',
          marginBottom: '0.625rem',
        }}
      >
        Key Takeaways
      </div>
      <div className="takeaways-body">{children}</div>
    </aside>
  )
}
