interface ForceProps {
  rating: 'low' | 'medium' | 'high'
  summary: string
}

interface FiveForcesProps {
  threat_of_entry: ForceProps
  supplier_power: ForceProps
  buyer_power: ForceProps
  substitutes: ForceProps
  rivalry: ForceProps
}

const ratingColor = {
  low: { bg: '#edf7f1', text: '#1a6b3a', border: '#1a6b3a' },
  medium: { bg: '#fffbeb', text: '#92400e', border: '#d97706' },
  high: { bg: '#fef2f2', text: '#991b1b', border: '#dc2626' },
}

function ForceCard({ label, rating, summary }: { label: string } & ForceProps) {
  const c = ratingColor[rating]
  return (
    <div
      style={{
        border: `1px solid var(--border-color)`,
        borderRadius: '8px',
        padding: '1rem',
        background: 'var(--bg-primary)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{label}</span>
        <span
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            padding: '0.125rem 0.5rem',
            borderRadius: '999px',
            background: c.bg,
            color: c.text,
            border: `1px solid ${c.border}`,
            whiteSpace: 'nowrap',
            marginLeft: '0.5rem',
          }}
        >
          {rating}
        </span>
      </div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>{summary}</p>
    </div>
  )
}

export default function FiveForces({
  threat_of_entry,
  supplier_power,
  buyer_power,
  substitutes,
  rivalry,
}: FiveForcesProps) {
  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
          marginBottom: '0.75rem',
        }}
      >
        <ForceCard label="Threat of Entry" {...threat_of_entry} />
        <ForceCard label="Supplier Power" {...supplier_power} />
      </div>
      <div style={{ marginBottom: '0.75rem' }}>
        <ForceCard label="Competitive Rivalry" {...rivalry} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <ForceCard label="Buyer Power" {...buyer_power} />
        <ForceCard label="Threat of Substitutes" {...substitutes} />
      </div>
    </div>
  )
}
