export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[720px] mx-auto px-6">
      {children}
    </div>
  )
}
