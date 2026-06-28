'use client'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function LoginForm() {
  const searchParams = useSearchParams()
  const unauthorized = searchParams.get('error') === 'unauthorized'
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (unauthorized) {
    return (
      <div className="max-w-[400px] mx-auto mt-24 px-6">
        <h1 className="text-[1.25rem] font-bold text-fg mb-1">Access denied</h1>
        <p className="text-[14px] text-fg-subtle">
          Your account does not have permission to access this page.
        </p>
      </div>
    )
  }

  async function signInWithGoogle() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[400px] mx-auto mt-24 px-6">
      <h1 className="text-[1.25rem] font-bold text-fg mb-1">Sign in</h1>
      <p className="text-[14px] text-fg-subtle mb-8">
        Sign in to access your settings.
      </p>

      <button
        onClick={signInWithGoogle}
        className="w-full py-[0.6rem] px-4 bg-page border border-line rounded-[6px] text-[14px] font-medium text-fg cursor-pointer flex items-center justify-center gap-[0.6rem] mb-6"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-line" />
        <span className="text-[12px] text-fg-subtle">or</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      {sent ? (
        <div className="px-5 py-4 bg-page-alt border border-line rounded-lg text-[14px] text-fg-muted">
          Link sent to <strong className="text-fg">{email}</strong>.
          Check your inbox and click it to sign in.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="px-[0.875rem] py-[0.6rem] border border-line rounded-[6px] text-[14px] text-fg bg-page outline-none w-full box-border"
          />
          {error && (
            <p className="text-[13px] text-red-600 m-0">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`py-[0.6rem] px-4 border-none rounded-[6px] text-[14px] font-medium cursor-pointer ${
              loading
                ? 'bg-page-alt text-fg-subtle cursor-default'
                : 'bg-navy text-white'
            }`}
          >
            {loading ? 'Sending…' : 'Send magic link'}
          </button>
        </form>
      )}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
