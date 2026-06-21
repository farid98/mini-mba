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

const R = {
  low:    { bg: '#edf7f1', text: '#1a6b3a', border: '#1a6b3a', label: 'Low' },
  medium: { bg: '#fffbeb', text: '#92400e', border: '#d97706', label: 'Medium' },
  high:   { bg: '#fef2f2', text: '#991b1b', border: '#dc2626', label: 'High' },
}

const AC = '#b8b8b8' // arrow color

function Badge({ rating }: { rating: keyof typeof R }) {
  const c = R[rating]
  return (
    <span style={{
      display: 'inline-block',
      fontSize: '0.625rem',
      fontWeight: 700,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.07em',
      padding: '0.125rem 0.4rem',
      borderRadius: '3px',
      background: c.bg,
      color: c.text,
    }}>
      {c.label}
    </span>
  )
}

// Outer force card — colored left border indicates rating intensity
function ForceCard({ label, rating, summary }: { label: string } & ForceProps) {
  const c = R[rating]
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e5e5e5',
      borderLeft: `4px solid ${c.border}`,
      borderRadius: '5px',
      padding: '0.75rem 0.875rem',
      height: '100%',
      boxSizing: 'border-box' as const,
    }}>
      <Badge rating={rating} />
      <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: '#111', lineHeight: 1.35, margin: '0.35rem 0 0.375rem' }}>
        {label}
      </div>
      <p style={{ fontSize: '0.75rem', color: '#555', margin: 0, lineHeight: 1.5 }}>{summary}</p>
    </div>
  )
}

// Center rivalry card — full border, slightly different background to anchor the diagram
function RivalryCard({ rating, summary }: ForceProps) {
  const c = R[rating]
  return (
    <div style={{
      background: '#f9f9f9',
      border: `2px solid ${c.border}`,
      borderRadius: '7px',
      padding: '0.875rem',
      height: '100%',
      boxSizing: 'border-box' as const,
    }}>
      <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: '#999', marginBottom: '0.375rem' }}>
        Industry Rivalry
      </div>
      <Badge rating={rating} />
      <p style={{ fontSize: '0.75rem', color: '#555', margin: '0.375rem 0 0', lineHeight: 1.5 }}>{summary}</p>
    </div>
  )
}

// Bidirectional horizontal arrow
function ArrowH() {
  return (
    <svg width="44" height="20" viewBox="0 0 44 20" style={{ display: 'block' }}>
      <polygon points="0,10 9,4 9,16" fill={AC} />
      <rect x="9" y="9" width="26" height="2" fill={AC} />
      <polygon points="44,10 35,4 35,16" fill={AC} />
    </svg>
  )
}

// Bidirectional vertical arrow
function ArrowV() {
  return (
    <svg width="20" height="36" viewBox="0 0 20 36" style={{ display: 'block' }}>
      <polygon points="10,0 4,9 16,9" fill={AC} />
      <rect x="9" y="9" width="2" height="18" fill={AC} />
      <polygon points="10,36 4,27 16,27" fill={AC} />
    </svg>
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
    <div style={{ margin: '2rem 0', overflowX: 'auto' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 44px 1fr 44px 1fr',
        gridTemplateRows: 'auto 36px auto 36px auto',
        minWidth: '560px',
        gap: 0,
      }}>

        {/* Row 1 — Threat of New Entry (center column) */}
        <div style={{ gridColumn: 3, gridRow: 1 }}>
          <ForceCard label="Threat of New Entry" {...threat_of_entry} />
        </div>

        {/* Row 2 — vertical arrow (center column) */}
        <div style={{ gridColumn: 3, gridRow: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowV />
        </div>

        {/* Row 3 — Suppliers / Rivalry / Buyers */}
        <div style={{ gridColumn: 1, gridRow: 3, display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <ForceCard label="Bargaining Power of Suppliers" {...supplier_power} />
          </div>
        </div>
        <div style={{ gridColumn: 2, gridRow: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowH />
        </div>
        <div style={{ gridColumn: 3, gridRow: 3, display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <RivalryCard {...rivalry} />
          </div>
        </div>
        <div style={{ gridColumn: 4, gridRow: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowH />
        </div>
        <div style={{ gridColumn: 5, gridRow: 3, display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <ForceCard label="Bargaining Power of Buyers" {...buyer_power} />
          </div>
        </div>

        {/* Row 4 — vertical arrow (center column) */}
        <div style={{ gridColumn: 3, gridRow: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowV />
        </div>

        {/* Row 5 — Threat of Substitutes (center column) */}
        <div style={{ gridColumn: 3, gridRow: 5 }}>
          <ForceCard label="Threat of Substitutes" {...substitutes} />
        </div>

      </div>
    </div>
  )
}
