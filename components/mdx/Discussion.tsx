'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Discussion({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => {
      if (!user?.email) return
      const allowed = (process.env.NEXT_PUBLIC_ALLOWED_EMAILS ?? '')
        .split(',')
        .map(e => e.trim().toLowerCase())
      setVisible(allowed.includes(user.email.toLowerCase()))
    })
  }, [])

  if (!visible) return null

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
