'use client'

import Image from 'next/image'

export default function FeedbackPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        paddingBottom: 100,
      }}
    >
      {/* Header */}
      <div style={{ padding: '62px 24px 16px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-fraunces, serif)',
            fontSize: 24,
            fontWeight: 400,
            color: 'var(--ink)',
            letterSpacing: '-0.5px',
            lineHeight: 1.3,
          }}
        >
          Hey, I'm Divya &amp; I built this.
        </h1>
      </div>

      {/* Photo + intro card */}
      <div style={{ padding: '0 20px 20px' }}>
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid var(--line)',
            display: 'flex',
            gap: 14,
            padding: 14,
            alignItems: 'center',
          }}
        >
          {/* Photo — small */}
          <div
            style={{
              position: 'relative',
              width: 72,
              height: 88,
              flexShrink: 0,
              borderRadius: 12,
              overflow: 'hidden',
              background: '#E8C84A22',
            }}
          >
            <Image
              src="/divya.png"
              alt="Divya Patel"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              priority
            />
          </div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: 'var(--font-inter-tight, system-ui)',
                fontSize: 14,
                lineHeight: 1.6,
                color: 'var(--ink)',
              }}
            >
              Every Sephora sale, I buy what my makeup guru friends tell me to. I needed this app, so I made it. Would you find this helpful too?
            </p>
          </div>
        </div>
      </div>

      {/* Divider label */}
      <div style={{ padding: '0 20px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        <span
          style={{
            fontFamily: 'var(--font-jetbrains-mono, monospace)',
            fontSize: 9,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--accent-deep)',
          }}
        >
          Leave feedback
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>

      {/* Embedded Google Form */}
      <div style={{ padding: '0 20px' }}>
        <div
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid var(--line)',
            background: 'var(--surface)',
          }}
        >
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeF74bY9dLxuovnQUlOj5HGRiAJyGcgIQutOpIxhg2bPYZrrg/viewform?embedded=true"
            width="100%"
            height="640"
            frameBorder="0"
            style={{ display: 'block' }}
            title="Feedback form"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  )
}
