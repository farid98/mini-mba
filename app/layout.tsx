import type { Metadata } from 'next'
import ThemeProvider from '@/components/layout/ThemeProvider'
import FirebaseAnalytics from '@/components/FirebaseAnalytics'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://mini-mba.app'),
  title: {
    default: 'Mini MBA',
    template: '%s — Mini MBA',
  },
  description: 'A concise MBA curriculum — strategy, finance, marketing, leadership, operations, economics, and entrepreneurship.',
  openGraph: {
    siteName: 'Mini MBA',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <FirebaseAnalytics />
      </body>
    </html>
  )
}
