type Variant = 'default' | 'title' | 'highlight' | 'dark'

const styles: Record<Variant, {
  wrapper: React.CSSProperties
  title: React.CSSProperties
  body: React.CSSProperties
}> = {
  default: {
    wrapper: {},
    title: {},
    body: {},
  },
  title: {
    wrapper: {
      background: '#1a4d8a',
      borderRadius: 8,
      padding: '3rem 3.5rem',
      textAlign: 'center',
      minHeight: 260,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: '#ffffff',
      fontSize: '2.5rem',
      marginBottom: '1.25rem',
    },
    body: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: '1.2rem',
      textAlign: 'center',
    },
  },
  highlight: {
    wrapper: {
      background: '#eef3fb',
      borderLeft: '4px solid #1a4d8a',
      borderRadius: '0 8px 8px 0',
      padding: '2rem 2.5rem',
    },
    title: {
      color: '#1a4d8a',
    },
    body: {
      color: '#333333',
    },
  },
  dark: {
    wrapper: {
      background: '#111827',
      borderRadius: 8,
      padding: '2.5rem 3rem',
    },
    title: {
      color: '#ffffff',
    },
    body: {
      color: 'rgba(255,255,255,0.75)',
    },
  },
}

export default function Slide({
  title,
  variant = 'default',
  children,
}: {
  title?: string
  variant?: Variant
  children: React.ReactNode
}) {
  const s = styles[variant]
  return (
    <div className="slide-content" style={s.wrapper}>
      {title && (
        <h2 className="slide-title" style={s.title}>
          {title}
        </h2>
      )}
      <div className={`slide-body slide-body--${variant}`} style={s.body}>
        {children}
      </div>
    </div>
  )
}
