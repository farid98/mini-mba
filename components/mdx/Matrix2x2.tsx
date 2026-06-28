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
  'top-left':     { gridColumn: 1, gridRow: 1 },
  'top-right':    { gridColumn: 2, gridRow: 1 },
  'bottom-left':  { gridColumn: 1, gridRow: 2 },
  'bottom-right': { gridColumn: 2, gridRow: 2 },
}

const quadrantBg: Record<string, string> = {
  'top-left':     '#ffffff',
  'top-right':    '#fafcff',
  'bottom-left':  '#fafcff',
  'bottom-right': '#ffffff',
}

export default function Matrix2x2({ xAxis, yAxis, quadrants }: Matrix2x2Props) {
  return (
    <div className="my-8 bg-[#f7f8fa] border border-[#e0e4ea] rounded-[10px] px-5 pt-5 pb-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <div className="flex gap-[0.625rem]">
        {/* Y-axis endpoints column */}
        <div className="flex flex-col justify-between items-center w-4 shrink-0 py-1">
          <span className="[writing-mode:vertical-rl] rotate-180 text-[0.5625rem] text-[#aaa]">{yAxis.high}</span>
          <span className="[writing-mode:vertical-rl] rotate-180 text-[0.5625rem] text-[#aaa]">{yAxis.low}</span>
        </div>
        {/* Y-axis label column */}
        <div className="flex items-center justify-center w-4 shrink-0">
          <span className="[writing-mode:vertical-rl] rotate-180 text-[0.6875rem] font-bold text-[#555] tracking-[0.04em] uppercase">{yAxis.label}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-2 grid-rows-2 gap-[3px] bg-[#e0e4ea] border border-[#e0e4ea] rounded-[6px] overflow-hidden">
            {quadrants.map(q => {
              const pos = positionMap[q.position]
              return (
                <div
                  key={q.label}
                  className="px-4 py-[0.875rem]"
                  style={{
                    gridColumn: pos.gridColumn,
                    gridRow: pos.gridRow,
                    background: quadrantBg[q.position],
                  }}
                >
                  <div className="text-[0.6875rem] font-bold text-[#333] uppercase tracking-[0.05em] mb-[0.375rem]">
                    {q.label}
                  </div>
                  <div className="text-[0.8125rem] text-[#555] leading-[1.55]">
                    {q.description}
                  </div>
                </div>
              )
            })}
          </div>

          {/* X-axis */}
          <div className="flex justify-between items-center mt-2 px-[0.125rem]">
            <span className="text-[0.625rem] text-fg-subtle">← {xAxis.low}</span>
            <span className="text-[0.6875rem] font-bold text-[#555] uppercase tracking-[0.04em]">{xAxis.label}</span>
            <span className="text-[0.625rem] text-fg-subtle">{xAxis.high} →</span>
          </div>
        </div>
      </div>
    </div>
  )
}
