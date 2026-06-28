type Variant = 'default' | 'title' | 'highlight' | 'dark'

const wrapperClass: Record<Variant, string> = {
  default:   '',
  // title:     'bg-navy rounded-lg px-14 py-12 text-center min-h-[260px] flex flex-col items-center justify-center',
  title: '',
  highlight: 'bg-navy-light border-l-4 border-navy rounded-r-lg px-10 py-8',
  dark:      'bg-[#111827] rounded-lg px-12 py-10',
}

const titleClass: Record<Variant, string> = {
  default:   'text-[2rem] font-bold text-fg m-0 mb-6 leading-tight',
  // title:     'text-white text-[2.5rem] font-bold m-0 mb-5 leading-tight',
  title: 'text-[2rem] font-bold text-fg m-0 mb-6 leading-tight', 
  highlight: 'text-navy text-[2rem] font-bold m-0 mb-6 leading-tight',
  dark:      'text-white text-[2rem] font-bold m-0 mb-6 leading-tight',
}

// CSS custom properties set on the body div — read by .slide-body CSS rules.
// Edit these to change body text colours per variant without touching globals.css.
const bodyVars: Record<Variant, React.CSSProperties> = {
  default: {
    '--slide-text':         '#444444',
    '--slide-strong':       '#111111',
    '--slide-em':           '#666666',
    '--slide-quote-border': '#1a4d8a',
  } as React.CSSProperties,
  highlight: {
    '--slide-text':         '#333333',
    '--slide-strong':       '#111111',
    '--slide-em':           '#555555',
    '--slide-quote-border': '#1a4d8a',
  } as React.CSSProperties,
  title: {
    '--slide-text':         '#444444',
    '--slide-strong':       '#111111',
    '--slide-em':           '#666666',
    '--slide-quote-border': '#1a4d8a',
  } as React.CSSProperties,


  // title2: {
  //   '--slide-text':         '#e5e7eb',
  //   '--slide-strong':       '#ffffff',
  //   '--slide-em':           '#d1d5db',
  //   '--slide-quote-border': 'rgba(255,255,255,0.35)',
  // } as React.CSSProperties,

  dark: {
    '--slide-text':         '#e5e7eb',
    '--slide-strong':       '#ffffff',
    '--slide-em':           '#d1d5db',
    '--slide-quote-border': 'rgba(255,255,255,0.35)',
  } as React.CSSProperties,
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
  return (
    <div className={wrapperClass[variant]}>
      {title && (
        <h2 className={titleClass[variant]}>
          {title}
        </h2>
      )}
      <div className="slide-body" style={bodyVars[variant]}>
        {children}
      </div>
    </div>
  )
}
