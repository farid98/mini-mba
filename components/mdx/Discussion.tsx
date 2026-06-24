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
    <div style={{
      margin: '2rem 0',
      padding: '1.25rem 1.5rem',
      borderLeft: '3px solid #7c3aed',
      borderRadius: '0 8px 8px 0',
      background: '#faf5ff',
    }}>
      <div style={{
        fontWeight: 600,
        fontSize: 11,
        color: '#7c3aed',
        marginBottom: '0.875rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>
        Discussion Questions
      </div>
      <div className="discussion-body">
        {children}
      </div>
    </div>
  )
}
