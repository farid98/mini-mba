export default function Discussion({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 px-6 py-5 border-l-[3px] border-violet-600 rounded-r-lg bg-[#faf5ff]">
      <div className="font-semibold text-[11px] text-violet-600 mb-3.5 uppercase tracking-[0.08em]">
        Discussion Questions
      </div>
      <div className="discussion-body">
        {children}
      </div>
    </div>
  )
}
