'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'

const VALUE_PROPS = [
  {
    emoji: '🗂️',
    headline: 'Stop buying what you already hated.',
    body: 'Rate every product you try. Your beauty history, finally in one place.',
  },
  {
    emoji: '👯',
    headline: 'Your circle\'s best-kept secrets, visible.',
    body: 'See exactly what your most trusted people are using — and what they actually love.',
  },
  {
    emoji: '✨',
    headline: 'AI that actually knows your skin.',
    body: 'Insights built from your own ratings and notes. Not a quiz. Yours.',
  },
]

export default function LoginPage() {
  const router = useRouter()
  const { onboardingStep, advanceOnboarding } = useApp()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = () => {
    if (onboardingStep === 0) advanceOnboarding()
    router.push('/scan')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 28px',
        background: 'var(--bg)',
      }}
    >
      <div style={{ flex: '0 0 62px' }} />

      {/* Logo mark */}
      <div style={{ marginBottom: 22 }}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="14" stroke="var(--accent)" strokeWidth="1.5" />
          <circle cx="15" cy="15" r="5" fill="var(--accent)" fillOpacity="0.25" />
          <circle cx="15" cy="15" r="2" fill="var(--accent)" />
        </svg>
      </div>

      {/* Headline */}
      <h1
        style={{
          fontFamily: 'var(--font-fraunces, serif)',
          fontSize: 42,
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: '-1.2px',
          color: 'var(--ink)',
          marginBottom: 28,
        }}
      >
        What Are You
        <br />
        Wearing?
      </h1>

      {/* Value props */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
        {VALUE_PROPS.map((vp, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
              padding: '14px 16px',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 14,
              opacity: 0,
              animation: `fadeUp 0.4s ease ${i * 100}ms forwards`,
            }}
          >
            <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{vp.emoji}</span>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-fraunces, serif)',
                  fontSize: 16,
                  fontWeight: 400,
                  color: 'var(--ink)',
                  letterSpacing: '-0.2px',
                  marginBottom: 3,
                  lineHeight: 1.3,
                }}
              >
                {vp.headline}
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.45 }}>
                {vp.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 28 }}>
        <div>
          <label
            style={{
              fontFamily: 'var(--font-jetbrains-mono, monospace)',
              fontSize: 10,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
              display: 'block',
              marginBottom: 6,
            }}
          >
            Email
          </label>
          <input
            type="email"
            className="input-underline"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label
            style={{
              fontFamily: 'var(--font-jetbrains-mono, monospace)',
              fontSize: 10,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
              display: 'block',
              marginBottom: 6,
            }}
          >
            Password
          </label>
          <input
            type="password"
            className="input-underline"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Sign in CTA — pulses gold during onboarding step 0 */}
      <button
        onClick={handleSignIn}
        className={onboardingStep === 0 ? 'gold-pulse' : ''}
        style={{
          width: '100%',
          height: 54,
          borderRadius: 999,
          background: 'var(--ink)',
          color: '#FBF6F2',
          border: 'none',
          fontFamily: 'var(--font-inter-tight, sans-serif)',
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: '0.6px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'opacity 0.18s',
          marginBottom: 24,
        }}
        onMouseOver={e => (e.currentTarget.style.opacity = '0.82')}
        onMouseOut={e => (e.currentTarget.style.opacity = '1')}
      >
        Sign In
      </button>

      {/* OR divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        <span
          style={{
            fontFamily: 'var(--font-jetbrains-mono, monospace)',
            fontSize: 10,
            letterSpacing: '1px',
            color: 'var(--ink-faint)',
          }}
        >
          OR
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>

      {/* Social buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        <SocialButton label="Continue with Apple" icon="apple" />
        <SocialButton label="Continue with Google" icon="google" />
      </div>

      <div style={{ flex: 1 }} />

      <p
        style={{
          textAlign: 'center',
          fontSize: 14,
          color: 'var(--ink-muted)',
          paddingBottom: 44,
        }}
      >
        New here?{' '}
        <span style={{ color: 'var(--accent)', fontWeight: 500, cursor: 'pointer' }}>
          Create account
        </span>
      </p>
    </div>
  )
}

function SocialButton({ label, icon }: { label: string; icon: 'apple' | 'google' }) {
  return (
    <button
      style={{
        width: '100%',
        height: 50,
        borderRadius: 999,
        background: 'transparent',
        border: '1px solid var(--line)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        cursor: 'pointer',
        fontFamily: 'var(--font-inter-tight, sans-serif)',
        fontSize: 14,
        color: 'var(--ink)',
        fontWeight: 500,
        transition: 'background 0.15s',
      }}
      onMouseOver={e => (e.currentTarget.style.background = 'rgba(43,31,28,0.04)')}
      onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
    >
      {icon === 'apple' ? (
        <svg width="15" height="18" viewBox="0 0 15 18" fill="currentColor">
          <path d="M10.5.5c.2 1.1-.3 2.3-1 3.1-.68.82-1.8 1.44-2.9 1.36-.2-1.06.38-2.2 1.02-2.94C8.3.82 9.54.2 10.5.5zM14 11.4c-.45 1.04-.67 1.5-1.24 2.42-.8 1.26-1.94 2.82-3.36 2.84-1.25.02-1.57-.8-3.27-.79-1.7.01-2.05.82-3.32.8-1.4-.02-2.48-1.44-3.28-2.7C-1.03 11.83-1.24 8.7.2 6.58c1-1.5 2.6-2.37 4.1-2.37 1.52 0 2.48.82 3.73.82 1.22 0 1.97-.82 3.73-.82 1.32 0 2.74.72 3.74 1.96-.97.56-1.92 1.72-1.9 3.28.01 1.81 1.17 2.94 2.4 1.95z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path fill="#4285F4" d="M15.84 8.18c0-.57-.05-1.12-.14-1.64H8.1v3.1h4.33a3.7 3.7 0 01-1.61 2.43v2h2.6c1.53-1.41 2.42-3.48 2.42-5.89z"/>
          <path fill="#34A853" d="M8.1 16c2.16 0 3.97-.72 5.3-1.94l-2.6-2.02c-.71.48-1.62.76-2.7.76-2.08 0-3.84-1.4-4.47-3.28H.95v2.08A8 8 0 008.1 16z"/>
          <path fill="#FBBC05" d="M3.63 9.52A4.8 4.8 0 013.38 8c0-.53.09-1.04.25-1.52V4.4H.95A8 8 0 000 8c0 1.29.31 2.51.95 3.6l2.68-2.08z"/>
          <path fill="#EA4335" d="M8.1 3.18c1.17 0 2.22.4 3.05 1.2l2.28-2.28A8 8 0 008.1 0 8 8 0 00.95 4.4L3.63 6.48c.63-1.88 2.39-3.3 4.47-3.3z"/>
        </svg>
      )}
      {label}
    </button>
  )
}
