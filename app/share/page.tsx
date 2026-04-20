'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { PRODUCTS } from '@/lib/data'
import ProductBottle from '@/components/ProductBottle'

const HANDLE = 'emma-9f3x2'
const LINK = `wya.ren/${HANDLE}`

export default function SharePage() {
  const router = useRouter()
  const { ratings } = useApp()
  const [copied, setCopied] = useState(false)

  const mustCount = Object.values(ratings).filter(r => r === 'must').length
  const fineCount = Object.values(ratings).filter(r => r === 'fine').length
  const skipCount = Object.values(ratings).filter(r => r === 'skip').length

  const topMusts = PRODUCTS.filter(p => ratings[p.id] === 'must').slice(0, 4)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://${LINK}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        paddingTop: 62,
        paddingBottom: 96,
      }}
    >
      {/* Back */}
      <div style={{ padding: '0 20px 20px' }}>
        <button
          onClick={() => router.back()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--ink-muted)',
            fontFamily: 'var(--font-inter-tight, sans-serif)',
            fontSize: 15,
            padding: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-fraunces, serif)',
            fontSize: 32,
            fontWeight: 400,
            letterSpacing: '-0.8px',
            color: 'var(--ink)',
            lineHeight: 1.15,
            marginBottom: 6,
          }}
        >
          Your picks,
          <br />
          ready to share.
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 28 }}>
          Send your link and let friends decide.
        </p>

        {/* Link card */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 14,
            padding: '16px 18px',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-jetbrains-mono, monospace)',
              fontSize: 11,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--ink-faint)',
              marginBottom: 6,
            }}
          >
            Your link
          </div>
          <div
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: 'var(--ink)',
              letterSpacing: '-0.3px',
              marginBottom: 14,
            }}
          >
            {LINK}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <StatPill count={mustCount} label="must" color="#D97A7A" bg="#F5D9D4" />
            <StatPill count={fineCount} label="fine" color="#8A7060" bg="#EDE3DA" />
            <StatPill count={skipCount} label="skip" color="#7A6B63" bg="#EDE3DA" />
          </div>

          {/* Copy button */}
          <button
            onClick={copyLink}
            style={{
              width: '100%',
              height: 48,
              borderRadius: 999,
              background: copied ? 'var(--positive)' : 'var(--accent-deep)',
              color: '#fff',
              border: 'none',
              fontFamily: 'var(--font-inter-tight, sans-serif)',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background 0.25s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l3.5 3.5L12 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="2" y="4" width="8" height="9" rx="2" stroke="white" strokeWidth="1.4" />
                  <path d="M5 4V3a2 2 0 012-2h3a2 2 0 012 2v7a2 2 0 01-2 2h-1" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Copy link
              </>
            )}
          </button>
        </div>

        {/* Share icons */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, justifyContent: 'center' }}>
          {[
            { label: 'Message', icon: '💬' },
            { label: 'Twitter', icon: '𝕏' },
            { label: 'Instagram', icon: '◻' },
            { label: 'More', icon: '···' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  cursor: 'pointer',
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains-mono, monospace)',
                  fontSize: 10,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: 'var(--ink-faint)',
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* QR code */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 14,
            padding: '20px',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: 'var(--line)',
              borderRadius: 8,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <QrPlaceholder />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-jetbrains-mono, monospace)',
                fontSize: 11,
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
                marginBottom: 4,
              }}
            >
              Scan to view
            </div>
            <div style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.4 }}>
              Share IRL — friends can scan to see your picks
            </div>
          </div>
        </div>

        {/* Must-haves preview */}
        {topMusts.length > 0 && (
          <div>
            <div
              style={{
                fontFamily: 'var(--font-jetbrains-mono, monospace)',
                fontSize: 11,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                marginBottom: 12,
              }}
            >
              Top must-haves
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {topMusts.map(product => (
                <div
                  key={product.id}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: 12,
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    width: 'calc(50% - 5px)',
                    boxSizing: 'border-box',
                  }}
                >
                  <ProductBottle
                    type={product.bottle}
                    color={product.bottleColor}
                    shade={product.shadeHex}
                    uid={`share-${product.id}`}
                    size={44}
                  />
                  <div style={{ width: '100%' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-jetbrains-mono, monospace)',
                        fontSize: 10,
                        letterSpacing: '1.2px',
                        textTransform: 'uppercase',
                        color: 'var(--ink-muted)',
                        marginBottom: 2,
                      }}
                    >
                      {product.brand}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.3, fontWeight: 500 }}>
                      {product.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Friend view link */}
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <button
            onClick={() => router.push('/friend/emma-9f3x2')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--accent)',
              fontFamily: 'var(--font-inter-tight, sans-serif)',
              fontSize: 15,
              fontWeight: 500,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Preview friend view →
          </button>
        </div>
      </div>
    </div>
  )
}

function StatPill({
  count,
  label,
  color,
  bg,
}: {
  count: number
  label: string
  color: string
  bg: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        background: bg,
        borderRadius: 999,
        padding: '5px 10px',
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 700, color }}>{count}</span>
      <span
        style={{
          fontFamily: 'var(--font-jetbrains-mono, monospace)',
          fontSize: 11,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color,
        }}
      >
        {label}
      </span>
    </div>
  )
}

function QrPlaceholder() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      {/* Simple QR-like pattern */}
      <rect x="4" y="4" width="22" height="22" rx="3" fill="var(--ink-faint)" fillOpacity="0.4" />
      <rect x="8" y="8" width="14" height="14" rx="1" fill="var(--ink-faint)" fillOpacity="0.5" />
      <rect x="34" y="4" width="22" height="22" rx="3" fill="var(--ink-faint)" fillOpacity="0.4" />
      <rect x="38" y="8" width="14" height="14" rx="1" fill="var(--ink-faint)" fillOpacity="0.5" />
      <rect x="4" y="34" width="22" height="22" rx="3" fill="var(--ink-faint)" fillOpacity="0.4" />
      <rect x="8" y="38" width="14" height="14" rx="1" fill="var(--ink-faint)" fillOpacity="0.5" />
      {/* Data dots */}
      {[34,38,42,46,50].map(x => [34,38,42,46,50].map(y => (
        <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" rx="0.5" fill="var(--ink-faint)" fillOpacity={Math.random() > 0.4 ? 0.5 : 0.1} />
      )))}
    </svg>
  )
}
