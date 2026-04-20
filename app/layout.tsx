import type { Metadata } from 'next'
import { Fraunces, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/lib/context'
import BottomNav from '@/components/BottomNav'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: 'normal',
  axes: ['opsz', 'SOFT', 'WONK'],
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'What Are You Wearing?',
  description: 'Snap your vanity. Decide what stays, what goes, what to try.',
}

const GOLD_PULSE_CSS = `
  @keyframes goldPulse {
    0%, 100% {
      outline: 3px solid #C9A227;
      outline-offset: 2px;
    }
    50% {
      outline: 4px solid #E8C040;
      outline-offset: 4px;
    }
  }
  .gold-pulse {
    animation: goldPulse 1s ease-in-out infinite !important;
    position: relative;
    z-index: 2;
  }
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: GOLD_PULSE_CSS }} />
      </head>
      <body
        style={{
          background: '#1C1210',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <div
          className="phone-frame"
          style={{
            width: '100%',
            maxWidth: 430,
            minHeight: '100vh',
            background: '#FBF6F2',
            position: 'relative',
          }}
        >
          <AppProvider>
            {children}
            <BottomNav />
          </AppProvider>
        </div>
      </body>
    </html>
  )
}
