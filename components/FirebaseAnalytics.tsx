'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAEFTi3s1-woTd75NhRgX8SV9g1m-M0wfw',
  authDomain: 'minimba-62498.firebaseapp.com',
  projectId: 'minimba-62498',
  storageBucket: 'minimba-62498.firebasestorage.app',
  messagingSenderId: '204084734201',
  appId: '1:204084734201:web:9584efa3e9d65c33d95a28',
  measurementId: 'G-LYK00GL9FJ',
}

export default function FirebaseAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    const analytics = getAnalytics(app)
    logEvent(analytics, 'page_view', {
      page_path: pathname,
      page_title: document.title,
    })
  }, [pathname])

  return null
}
