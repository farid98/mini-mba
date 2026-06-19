export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 'var(--reading-width)', margin: '0 auto', padding: '0 1.5rem' }}>
      {children}
    </div>
  )
}
