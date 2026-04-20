'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'

const NAV = [
  { path: '/scan',     label: 'Scan',     Icon: ScanIcon     },
  { path: '/everyone', label: 'Everyone', Icon: EveryoneIcon },
  { path: '/mybag',    label: 'My Bag',   Icon: BagIcon      },
  { path: '/shopping', label: 'Cart',     Icon: CartIcon     },
  { path: '/insights', label: 'Insights', Icon: InsightsIcon },
]

// step 4 = everyone tab pulses, step 6 = insights tab pulses
const ONBOARDING_PULSE: Record<number, string> = { 4: '/everyone', 6: '/insights' }

export default function BottomNav() {
  const pathname = usePathname()
  const router   = useRouter()
  const { onboardingStep, advanceOnboarding } = useApp()

  if (pathname === '/' || pathname.startsWith('/friend')) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        background: 'var(--surface)',
        borderTop: '1px solid var(--line)',
        display: 'flex',
        zIndex: 100,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {NAV.map(({ path, label, Icon }) => {
        const active =
          pathname === path ||
          (path !== '/scan' && pathname.startsWith(path))
        const shouldPulse = ONBOARDING_PULSE[onboardingStep] === path
        return (
          <button
            key={path}
            className={shouldPulse ? 'gold-pulse' : ''}
            onClick={() => {
              if (shouldPulse) advanceOnboarding()
              router.push(path)
            }}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              padding: '9px 0 13px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: active ? 'var(--accent)' : 'var(--ink)',
              transition: 'color 0.15s',
              position: 'relative',
            }}
          >
            {active && (
              <div
                style={{
                  position: 'absolute',
                  top: 4,
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                }}
              />
            )}
            <Icon active={active} />
            <span
              style={{
                fontFamily: 'var(--font-jetbrains-mono, monospace)',
                fontSize: 10,
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                fontWeight: active ? 600 : 400,
              }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function ScanIcon({ active }: { active: boolean }) {
  return (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="5" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4} />
      <circle cx="10" cy="11" r="3" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4} />
      <path d="M7 2h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function EveryoneIcon({ active }: { active: boolean }) {
  return (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
      <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4} />
      <path d="M1 18c0-3.3 2.2-5 6-5s6 1.7 6 5" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4} strokeLinecap="round" />
      <circle cx="15" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.6" />
      <path d="M18 18c0-2.5-1.5-4-4-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
  )
}

function BagIcon({ active }: { active: boolean }) {
  return (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
      <path d="M6 8V6a4 4 0 118 0v2" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4} strokeLinecap="round" />
      <rect x="2" y="8" width="16" height="10" rx="2.5" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4} />
    </svg>
  )
}

function CartIcon({ active }: { active: boolean }) {
  return (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
      <path d="M1 1h3l2 9h9l2-7H6" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="17" r="1.5" fill="currentColor" />
      <circle cx="15" cy="17" r="1.5" fill="currentColor" />
    </svg>
  )
}

function InsightsIcon({ active }: { active: boolean }) {
  return (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
      <path d="M10 2l1.8 4.8H17l-4.1 3 1.6 4.8L10 11.8l-4.5 2.8 1.6-4.8L3 6.8h5.2L10 2z"
        stroke="currentColor"
        strokeWidth={active ? 1.6 : 1.3}
        strokeLinejoin="round"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={active ? 0.15 : 0}
      />
    </svg>
  )
}
