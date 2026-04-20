'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'

type Phase = 'idle' | 'scanning' | 'done'

const BLOBS = [
  { x: 18, y: 12, color: '#E56B7A',  label: 'BLUSH 94%',       w: 14, h: 18 },
  { x: 58, y: 22, color: '#C08878',  label: 'LIPSTICK 91%',    w: 12, h: 20 },
  { x: 72, y: 52, color: '#DAB29A',  label: 'FOUNDATION 88%',  w: 16, h: 22 },
  { x: 12, y: 58, color: '#E8C88A',  label: 'HIGHLIGHTER 87%', w: 14, h: 14 },
  { x: 38, y: 74, color: '#A44B5C',  label: 'LIP MASK 95%',    w: 12, h: 12 },
  { x: 66, y: 78, color: '#C0A890',  label: 'BROW GEL 83%',    w: 10, h: 18 },
]

export default function ScanPage() {
  const router = useRouter()
  const { onboardingStep, advanceOnboarding } = useApp()
  const [phase, setPhase] = useState<Phase>('idle')
  const [visibleBlobs, setVisibleBlobs] = useState<number[]>([])

  const startScan = () => {
    setPhase('scanning')
    setVisibleBlobs([])

    BLOBS.forEach((_, i) => {
      setTimeout(() => {
        setVisibleBlobs(prev => [...prev, i])
      }, i * 280 + 200)
    })

    setTimeout(() => {
      setPhase('done')
      setTimeout(() => {
        if (onboardingStep === 1) {
          advanceOnboarding()
          router.push('/mybag')
        } else {
          router.push('/products')
        }
      }, 900)
    }, 2000)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 52,
        paddingBottom: 80,
      }}
    >
      {/* Header */}
      <div style={{ padding: '0 24px 16px' }}>
        <p
          style={{
            fontSize: 22,
            fontFamily: 'var(--font-fraunces, serif)',
            fontWeight: 400,
            color: 'var(--ink)',
            lineHeight: 1.25,
            letterSpacing: '-0.6px',
          }}
        >
          Lay your bag out. Good lighting, please.
        </p>
      </div>

      {/* Detected status bar */}
      {phase === 'done' && (
        <div
          className="anim-fade-up"
          style={{
            margin: '0 20px 12px',
            padding: '10px 16px',
            borderRadius: 10,
            background: '#D4EDDA',
            color: '#2D6A3F',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="7" fill="#2D6A3F" />
            <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-jetbrains-mono, monospace)',
              fontSize: 12,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Detected 8 Products
          </span>
        </div>
      )}

      {/* Viewfinder */}
      <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: '100%',
            maxWidth: 340,
            aspectRatio: '3/4',
            position: 'relative',
            borderRadius: 16,
            overflow: 'hidden',
            background: phase === 'idle' ? 'transparent' : '#0A0A12',
          }}
        >
          {/* Dashed border (idle) */}
          {phase === 'idle' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 16,
                border: '2px dashed var(--line)',
              }}
            />
          )}

          {/* Corner brackets (idle) */}
          {phase === 'idle' && (
            <>
              <CornerBracket pos="tl" />
              <CornerBracket pos="tr" />
              <CornerBracket pos="bl" />
              <CornerBracket pos="br" />
            </>
          )}

          {/* Idle center hint */}
          {phase === 'idle' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="17" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="4 3" />
                <circle cx="18" cy="18" r="6" stroke="var(--ink-faint)" strokeWidth="1.5" />
                <circle cx="18" cy="18" r="2" fill="var(--ink-faint)" />
              </svg>
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains-mono, monospace)',
                  fontSize: 12,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  color: 'var(--ink-faint)',
                }}
              >
                Point at your vanity
              </span>
            </div>
          )}

          {/* Scan animation */}
          {(phase === 'scanning' || phase === 'done') && (
            <>
              {/* Product blobs + detection boxes */}
              {BLOBS.map((blob, i) => {
                const visible = visibleBlobs.includes(i)
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${blob.x}%`,
                      top: `${blob.y}%`,
                      opacity: visible ? 1 : 0,
                      transition: `opacity 0.3s ${i * 0.08}s`,
                    }}
                  >
                    {/* Color blob */}
                    <div
                      style={{
                        width: blob.w * 2,
                        height: blob.h * 2,
                        borderRadius: 4,
                        background: blob.color,
                        opacity: 0.7,
                      }}
                    />
                    {/* Detection box */}
                    {visible && (
                      <div
                        className="anim-detect"
                        style={{
                          position: 'absolute',
                          inset: -6,
                          border: `1.5px solid ${blob.color}`,
                          borderRadius: 4,
                        }}
                      />
                    )}
                    {/* Label */}
                    {visible && (
                      <div
                        style={{
                          position: 'absolute',
                          top: -18,
                          left: 0,
                          background: blob.color,
                          color: '#fff',
                          fontFamily: 'var(--font-jetbrains-mono, monospace)',
                          fontSize: 10,
                          letterSpacing: '0.8px',
                          padding: '2px 5px',
                          borderRadius: 3,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {blob.label}
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Scan line */}
              {phase === 'scanning' && (
                <div
                  className="anim-scanline"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'linear-gradient(to right, transparent, var(--accent), transparent)',
                    boxShadow: '0 0 8px var(--accent)',
                    zIndex: 10,
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={startScan}
          disabled={phase !== 'idle'}
          className={onboardingStep === 1 && phase === 'idle' ? 'gold-pulse' : ''}
          style={{
            width: '100%',
            height: 54,
            borderRadius: 999,
            background: phase === 'idle' ? 'var(--ink)' : 'var(--line)',
            color: phase === 'idle' ? '#FBF6F2' : 'var(--ink-muted)',
            border: 'none',
            fontFamily: 'var(--font-inter-tight, sans-serif)',
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            cursor: phase === 'idle' ? 'pointer' : 'default',
            transition: 'all 0.2s',
          }}
        >
          {phase === 'idle' ? 'Take Photo' : phase === 'scanning' ? 'Scanning…' : 'Done ✓'}
        </button>

        <button
          style={{
            width: '100%',
            height: 48,
            borderRadius: 999,
            background: 'transparent',
            border: '1px solid var(--line)',
            color: 'var(--ink-muted)',
            fontFamily: 'var(--font-inter-tight, sans-serif)',
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Upload from library
        </button>
      </div>
    </div>
  )
}

function CornerBracket({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const size = 20
  const thickness = 2
  const color = 'var(--ink-muted)'
  const style: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
  }

  if (pos === 'tl') Object.assign(style, { top: 14, left: 14 })
  if (pos === 'tr') Object.assign(style, { top: 14, right: 14 })
  if (pos === 'bl') Object.assign(style, { bottom: 14, left: 14 })
  if (pos === 'br') Object.assign(style, { bottom: 14, right: 14 })

  const hFlip = pos === 'tr' || pos === 'br' ? 'scaleX(-1)' : ''
  const vFlip = pos === 'bl' || pos === 'br' ? 'scaleY(-1)' : ''

  return (
    <div style={{ ...style, transform: `${hFlip} ${vFlip}`.trim() }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <path
          d={`M ${size} ${thickness / 2} L ${thickness / 2} ${thickness / 2} L ${thickness / 2} ${size}`}
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
