'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [showSlides, setShowSlides] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data } = await supabase
          .from('user_settings')
          .select('show_slides')
          .eq('id', user.id)
          .single()

        const val = data?.show_slides ?? false
        setShowSlides(val)
        localStorage.setItem('mini-mba-slides', String(val))
      }

      setLoaded(true)
    }

    load()
  }, [])

  async function toggle() {
    const supabase = createClient()
    const next = !showSlides
    setShowSlides(next)
    localStorage.setItem('mini-mba-slides', String(next))

    await supabase
      .from('user_settings')
      .upsert({ id: user!.id, show_slides: next, updated_at: new Date().toISOString() })
  }

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    localStorage.removeItem('mini-mba-slides')
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
              Show a "Present" button at the bottom of each chapter
            </div>
          </div>

          {loaded ? (
            <button
              onClick={toggle}
              role="switch"
              aria-checked={showSlides}
              className="shrink-0 w-11 h-6 rounded-xl border-none cursor-pointer relative p-0 transition-colors duration-150"
              style={{ background: showSlides ? '#1a4d8a' : '#d0d0d0' }}
            >
              <span
                className="absolute top-[2px] w-5 h-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-[left] duration-150"
                style={{ left: showSlides ? 22 : 2 }}
              />
            </button>
          ) : (
            <div className="w-11 h-6 rounded-xl bg-page-alt" />
          )}
        </div>
      </div>
    </div>
  )
}
