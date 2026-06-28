import type { Metadata } from 'next'
import ThemeProvider from '@/components/layout/ThemeProvider'
import FirebaseAnalytics from '@/components/FirebaseAnalytics'
import SearchModal from '@/components/search/SearchModal'
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
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <SearchModal />
        <FirebaseAnalytics />
        <footer className="border-t border-line mt-8">
          <div className="max-w-[960px] mx-auto px-6 py-6 flex flex-wrap gap-2 items-center justify-between text-[13px] text-fg-subtle">
            <span>Built by Farid Ahmad · Gold Medal MBA, LUMS · AI-assisted content</span>
            <span>© {new Date().getFullYear()} Mini MBA</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
