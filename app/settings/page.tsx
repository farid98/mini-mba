'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()

    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    load()
  }, [])

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="max-w-[480px] mx-auto mt-20 px-6">
      <div className="flex items-baseline justify-between mb-1">
        <h1 className="text-[1.25rem] font-bold text-fg m-0">Settings</h1>
        {user && (
          <button
            onClick={signOut}
            className="bg-transparent border-none text-[13px] text-fg-subtle cursor-pointer p-0 hover:text-fg-muted"
          >
            Sign out
          </button>
        )}
      </div>
      <p className="text-[14px] text-fg-subtle mb-10">
        {user ? user.email : ''}
      </p>

      <div className="border border-line rounded-lg overflow-hidden">
        <div className="px-5 py-4 flex items-center justify-between gap-8">
          <div>
            <div className="font-semibold text-[14px] text-fg mb-[2px]">
              Chapter slides
            </div>
            <div className="text-[13px] text-fg-subtle">
              The Present button is always available on chapters with slides.
            </div>
          </div>

          <span className="shrink-0 text-[13px] text-fg-subtle">Always on</span>
        </div>
      </div>
    </div>
  )
}
