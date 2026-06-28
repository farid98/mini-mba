interface ForceProps {
  rating: 'low' | 'medium' | 'high'
  summary: string
}

interface FiveForcesProps {
  threat_of_entry: ForceProps
  supplier_power: ForceProps
  buyer_power: ForceProps
  substitutes: ForceProps
  rivalry: ForceProps
}

const R = {
  low:    { badge: 'bg-[#edf7f1] text-[#1a6b3a]', border: '#1a6b3a', label: 'Low' },
  medium: { badge: 'bg-amber-50 text-amber-800',   border: '#d97706', label: 'Medium' },
  high:   { badge: 'bg-red-50 text-red-800',        border: '#dc2626', label: 'High' },
}

const AC = '#b8b8b8'

function Badge({ rating }: { rating: keyof typeof R }) {
  const c = R[rating]
  return (
    <span className={`inline-block text-[0.625rem] font-bold uppercase tracking-[0.07em] px-[0.4rem] py-[0.125rem] rounded-[3px] ${c.badge}`}>
      {c.label}
    </span>
  )
}

function ForceCard({ label, rating, summary }: { label: string } & ForceProps) {
  const c = R[rating]
  return (
    <div
      className="bg-white border border-line rounded-[5px] px-[0.875rem] py-3 h-full box-border"
      style={{ borderLeft: `4px solid ${c.border}` }}
    >
      <Badge rating={rating} />
      <div className="font-semibold text-[0.8125rem] text-fg leading-[1.35] mt-[0.35rem] mb-[0.375rem]">
        {label}
      </div>
      <p className="text-[0.75rem] text-[#555] m-0 leading-relaxed">{summary}</p>
    </div>
  )
}

function RivalryCard({ rating, summary }: ForceProps) {
  const c = R[rating]
  return (
    <div
      className="bg-[#f9f9f9] rounded-[7px] p-[0.875rem] h-full box-border"
      style={{ border: `2px solid ${c.border}` }}
    >
      <div className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#999] mb-[0.375rem]">
        Industry Rivalry
      </div>
      <Badge rating={rating} />
      <p className="text-[0.75rem] text-[#555] mt-[0.375rem] mb-0 leading-relaxed">{summary}</p>
    </div>
  )
}

function ArrowH() {
  return (
    <svg width="44" height="20" viewBox="0 0 44 20" className="block">
      <polygon points="0,10 9,4 9,16" fill={AC} />
      <rect x="9" y="9" width="26" height="2" fill={AC} />
      <polygon points="44,10 35,4 35,16" fill={AC} />
    </svg>
  )
}

function ArrowV() {
  return (
    <svg width="20" height="36" viewBox="0 0 20 36" className="block">
      <polygon points="10,0 4,9 16,9" fill={AC} />
      <rect x="9" y="9" width="2" height="18" fill={AC} />
      <polygon points="10,36 4,27 16,27" fill={AC} />
    </svg>
  )
}

export default function FiveForces({ threat_of_entry, supplier_power, buyer_power, substitutes, rivalry }: FiveForcesProps) {
  return (
    <div className="my-8 overflow-x-auto">
      <div className="grid grid-cols-[1fr_44px_1fr_44px_1fr] grid-rows-[auto_36px_auto_36px_auto] min-w-[560px] gap-0">

        <div className="col-start-3 row-start-1">
          <ForceCard label="Threat of New Entry" {...threat_of_entry} />
        </div>

        <div className="col-start-3 row-start-2 flex items-center justify-center">
          <ArrowV />
        </div>

        <div className="col-start-1 row-start-3 flex">
          <div className="flex-1"><ForceCard label="Bargaining Power of Suppliers" {...supplier_power} /></div>
        </div>
        <div className="col-start-2 row-start-3 flex items-center justify-center">
          <ArrowH />
        </div>
        <div className="col-start-3 row-start-3 flex">
          <div className="flex-1"><RivalryCard {...rivalry} /></div>
        </div>
        <div className="col-start-4 row-start-3 flex items-center justify-center">
          <ArrowH />
        </div>
        <div className="col-start-5 row-start-3 flex">
          <div className="flex-1"><ForceCard label="Bargaining Power of Buyers" {...buyer_power} /></div>
        </div>

        <div className="col-start-3 row-start-4 flex items-center justify-center">
          <ArrowV />
        </div>

        <div className="col-start-3 row-start-5">
          <ForceCard label="Threat of Substitutes" {...substitutes} />
        </div>

      </div>
    </div>
  )
}
