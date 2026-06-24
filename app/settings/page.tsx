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
    <div style={{ maxWidth: 480, margin: '5rem auto', padding: '0 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Settings
        </h1>
        {user && (
          <button
            onClick={signOut}
            style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--text-tertiary)', cursor: 'pointer', padding: 0 }}
          >
            Sign out
          </button>
        )}
      </div>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: '2.5rem' }}>
        {user ? user.email : ''}
      </p>

      <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
        }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 2 }}>
              Chapter slides
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
              Show a "Present" button at the bottom of each chapter
            </div>
          </div>

          {loaded ? (
            <button
              onClick={toggle}
              role="switch"
              aria-checked={showSlides}
              style={{
                flexShrink: 0,
                width: 44,
                height: 24,
                borderRadius: 12,
                border: 'none',
                background: showSlides ? '#1a4d8a' : '#d0d0d0',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.15s ease',
                padding: 0,
              }}
            >
              <span style={{
                position: 'absolute',
                top: 2,
                left: showSlides ? 22 : 2,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#ffffff',
                transition: 'left 0.15s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }} />
            </button>
          ) : (
            <div style={{ width: 44, height: 24, borderRadius: 12, background: 'var(--bg-secondary)' }} />
          )}
        </div>
      </div>
    </div>
  )
}
