'use client'
import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'mini-mba-progress'

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set()
  }
}

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setCompleted(load())
    setLoaded(true)
  }, [])

  const toggle = useCallback((key: string) => {
    setCompleted(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])) } catch {}
      return next
    })
  }, [])

  const isCompleted = useCallback((key: string) => completed.has(key), [completed])

  return { completed, toggle, isCompleted, loaded }
}
