interface ExampleProps {
  title: string
  children: React.ReactNode
}

export default function Example({ title, children }: ExampleProps) {
  return (
    <div className="border border-line rounded-lg p-5 my-6">
      <div className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-fg-subtle mb-2">
        Case Study
      </div>
      <div className="font-semibold text-fg mb-3 text-[0.9375rem]">
        {title}
      </div>
      <div className="text-fg-muted text-[0.9375rem]">{children}</div>
    </div>
  )
}
