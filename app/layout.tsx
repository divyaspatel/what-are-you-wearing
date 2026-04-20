import type { Metadata } from 'next'
import { Fraunces, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/lib/context'
import BottomNav from '@/components/BottomNav'
import RestartFlowButton from '@/components/RestartFlowButton'

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
      outline: 9px solid #C9A227;
      outline-offset: 4px;
      box-shadow: 0 0 0 3px rgba(201,162,39,0.25), 0 0 18px 4px rgba(201,162,39,0.35);
    }
    50% {
      outline: 11px solid #F0D050;
      outline-offset: 6px;
      box-shadow: 0 0 0 6px rgba(240,208,80,0.35), 0 0 32px 8px rgba(240,208,80,0.55);
    }
  }
  @keyframes sparkleFloat {
    0%   { transform: scale(0.6) rotate(0deg);   opacity: 0; }
    30%  { opacity: 1; }
    70%  { opacity: 1; }
    100% { transform: scale(1.2) rotate(180deg); opacity: 0; }
  }
  .gold-pulse {
    animation: goldPulse 1s ease-in-out infinite !important;
    position: relative;
    z-index: 2;
  }
  .gold-pulse::before,
  .gold-pulse::after {
    content: '✦';
    position: absolute;
    color: #F0D050;
    font-size: 13px;
    line-height: 1;
    pointer-events: none;
    z-index: 10;
    animation: sparkleFloat 1.4s ease-in-out infinite;
  }
  .gold-pulse::before {
    top: -18px;
    right: -8px;
    animation-delay: 0s;
  }
  .gold-pulse::after {
    bottom: -18px;
    left: -8px;
    animation-delay: 0.7s;
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
            <RestartFlowButton />
            {children}
            <BottomNav />
          </AppProvider>
        </div>
      </body>
    </html>
  )
}
