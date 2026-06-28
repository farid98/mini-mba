interface TakeawaysProps {
  children: React.ReactNode
}

export default function Takeaways({ children }: TakeawaysProps) {
  return (
    <aside className="bg-teal-light border-l-[3px] border-teal rounded-r-[6px] py-4 pl-6 pr-5 my-8">
      <div className="font-bold text-[0.6875rem] uppercase tracking-[0.1em] text-teal mb-[0.625rem]">
        Key Takeaways
      </div>
      <div className="takeaways-body">{children}</div>
    </aside>
  )
}
