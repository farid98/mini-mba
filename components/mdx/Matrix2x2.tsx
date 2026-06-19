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

export default function Matrix2x2({ xAxis, yAxis, quadrants }: Matrix2x2Props) {
  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {/* Y-axis label */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '1.5rem',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap', transform: 'rotate(-90deg)', display: 'block' }}>
            {yAxis.high}
          </span>
          <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap', transform: 'rotate(-90deg)', display: 'block', margin: '0.5rem 0' }}>
            {yAxis.label}
          </span>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap', transform: 'rotate(-90deg)', display: 'block' }}>
            {yAxis.low}
          </span>
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: '2px',
              background: 'var(--border-color)',
              border: '1px solid var(--border-color)',
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
                    background: 'var(--bg-primary)',
                    padding: '1rem',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {q.label}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    {q.description}
                  </div>
                </div>
              )
            })}
          </div>

          {/* X-axis label */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.375rem', padding: '0 0.25rem' }}>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>{xAxis.low}</span>
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{xAxis.label}</span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>{xAxis.high}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
