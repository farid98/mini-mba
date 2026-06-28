interface CalloutProps {
  type: 'insight' | 'warning' | 'definition'
  children: React.ReactNode
}

const styles = {
  insight:    'bg-navy-light border-l-[3px] border-navy',
  warning:    'bg-amber-50 border-l-[3px] border-amber-500',
  definition: 'bg-page-alt border-l-[3px] border-line',
}

export default function Callout({ type, children }: CalloutProps) {
  return (
    <aside className={`${styles[type]} rounded-r-[6px] px-5 py-4 my-6 text-[0.9375rem]`}>
      {children}
    </aside>
  )
}
