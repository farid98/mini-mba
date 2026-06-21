interface AxisConfig {
  label: string
  low: string
  high: string
}

interface Quadrant {
  label: string
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  description: string
}

interface Matrix2x2Props {
  xAxis: AxisConfig
  yAxis: AxisConfig
  quadrants: Quadrant[]
}

const positionMap = {
  'top-left': { gridColumn: 1, gridRow: 1 },
  'top-right': { gridColumn: 2, gridRow: 1 },
  'bottom-left': { gridColumn: 1, gridRow: 2 },
  'bottom-right': { gridColumn: 2, gridRow: 2 },
}

// Top-right and bottom-left quadrants get a subtle tint to show the off-diagonal axis tension
const quadrantBg: Record<string, string> = {
  'top-left': '#ffffff',
  'top-right': '#fafcff',
  'bottom-left': '#fafcff',
  'bottom-right': '#ffffff',
}

export default function Matrix2x2({ xAxis, yAxis, quadrants }: Matrix2x2Props) {
  return (
    <div style={{
      margin: '2rem 0',
      background: '#f7f8fa',
      border: '1px solid #e0e4ea',
      borderRadius: '10px',
      padding: '1.25rem 1.25rem 1rem',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', gap: '0.625rem' }}>
        {/* Y-axis: two columns — outer for high/low endpoints, inner for axis label */}
        {/* Outer column: high at top, low at bottom */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '1rem', flexShrink: 0, paddingTop: '0.25rem', paddingBottom: '0.25rem' }}>
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '0.5625rem', color: '#aaa' }}>
            {yAxis.high}
          </span>
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '0.5625rem', color: '#aaa' }}>
            {yAxis.low}
          </span>
        </div>
        {/* Inner column: axis label centered */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '1rem', flexShrink: 0 }}>
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '0.6875rem', fontWeight: 700, color: '#555', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {yAxis.label}
          </span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: '3px',
              background: '#e0e4ea',
              border: '1px solid #e0e4ea',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            {quadrants.map(q => {
              const pos = positionMap[q.position]
              return (
                <div
                  key={q.label}
                  style={{
                    gridColumn: pos.gridColumn,
                    gridRow: pos.gridRow,
                    background: quadrantBg[q.position],
                    padding: '0.875rem 1rem',
                  }}
                >
                  <div style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: '#333',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.375rem',
                  }}>
                    {q.label}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#555', lineHeight: 1.55 }}>
                    {q.description}
                  </div>
                </div>
              )
            })}
          </div>

          {/* X-axis label */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', padding: '0 0.125rem' }}>
            <span style={{ fontSize: '0.625rem', color: '#888' }}>← {xAxis.low}</span>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{xAxis.label}</span>
            <span style={{ fontSize: '0.625rem', color: '#888' }}>{xAxis.high} →</span>
          </div>
        </div>
      </div>
    </div>
  )
}
