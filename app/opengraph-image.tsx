import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#0f172a',
        padding: '80px 96px',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', color: '#64748b', fontSize: 18, fontWeight: 600, letterSpacing: '0.1em' }}>
        MINI MBA
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
          <div style={{ width: 8, height: 80, background: '#3b82f6', borderRadius: 4, marginRight: 32, flexShrink: 0 }} />
          <div style={{ color: '#f8fafc', fontSize: 96, fontWeight: 800, lineHeight: 1 }}>
            Mini MBA
          </div>
        </div>
        <div style={{ display: 'flex', color: '#94a3b8', fontSize: 26, lineHeight: 1.5 }}>
          Strategy · Finance · Marketing · Leadership · Operations · Economics · Entrepreneurship
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  )
}
