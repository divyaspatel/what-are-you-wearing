'use client'

import { useState } from 'react'
import { useApp } from '@/lib/context'
import { SKIN_CONCERNS, SkinType } from '@/lib/data'

const SKIN_TYPES: { key: SkinType; label: string }[] = [
  { key: 'oily',   label: 'Oily'   },
  { key: 'combo',  label: 'Combo'  },
  { key: 'dry',    label: 'Dry'    },
  { key: 'normal', label: 'Normal' },
]

const MOCK_INSIGHTS = [
  {
    emoji: '🍩',
    tag: 'Vibe check',
    title: "You're in your glazed donut era",
    body: "Rhode Peptide Lip Treatment, Laneige Lip Sleeping Mask, and Dior Forever Skin Glow are all must-haves for you — you consistently reach for products that add luminosity, dewiness, and that lit-from-within look.",
  },
  {
    emoji: '💋',
    tag: 'Lips are the priority',
    title: 'You never skip lip care',
    body: "With 3 lip products rated must — Rhode, Laneige, and Tower 28 — lips are clearly your non-negotiable. Your routine is built around a hydrated, glossy pout before anything else.",
  },
  {
    emoji: '✨',
    tag: 'Pattern found',
    title: 'Glow over matte, every time',
    body: "You marked the NARS Orgasm Blush as skip and chose Rare Beauty Soft Pinch Blush as a must instead. The pattern is clear: you favour sheer, buildable formulas over heavy pigment.",
  },
  {
    emoji: '🔒',
    tag: 'Routine strength',
    title: 'Your base is locked in',
    body: "Dior Forever Skin Glow Foundation and YSL Touche Éclat are both must-haves, with Kosas Revealer Concealer on fine. You have a solid, layered base routine that clearly works for you.",
  },
  {
    emoji: '💡',
    tag: 'Worth knowing',
    title: 'Charlotte Tilbury is a fine, not a must',
    body: "The Pillow Talk Lipstick is iconic, but yours sits at fine — not must. You appreciate it but it's not a daily reach. There might be a bolder lip shade waiting for a must rating.",
  },
]

export default function InsightsPage() {
  const { skinType, setSkinType, concerns, toggleConcern } = useApp()
  const [showSkinSheet, setShowSkinSheet] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ paddingTop: 62, padding: '62px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
          <h1
            style={{
              fontFamily: 'var(--font-fraunces, serif)',
              fontSize: 24,
              fontWeight: 400,
              color: 'var(--ink)',
              letterSpacing: '-0.5px',
            }}
          >
            Insights
          </h1>

          {/* Skin concerns button */}
          <button
            onClick={() => setShowSkinSheet(true)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: skinType || concerns.length > 0 ? 'var(--accent-soft)' : 'var(--surface)',
                border: `1.5px solid ${skinType || concerns.length > 0 ? 'var(--accent)' : 'var(--line)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'all 0.2s',
              }}
            >
              <SkinProfileIcon size={32} active={!!(skinType || concerns.length > 0)} />
              {(skinType || concerns.length > 0) && (
                <div
                  style={{
                    position: 'absolute',
                    top: -1,
                    right: -1,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    border: '2px solid var(--bg)',
                  }}
                />
              )}
            </div>
            <span
              style={{
                fontFamily: 'var(--font-inter-tight, sans-serif)',
                fontSize: 10,
                color: 'var(--ink-muted)',
                textAlign: 'center',
                lineHeight: 1.2,
                maxWidth: 58,
              }}
            >
              update skin concerns
            </span>
          </button>
        </div>

        <p style={{ fontSize: 15, color: 'var(--ink-muted)' }}>
          What your bag says about you.
        </p>
      </div>

      {/* Insight cards */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {MOCK_INSIGHTS.map((card, i) => (
          <div
            key={i}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 14,
              padding: '18px 16px',
              opacity: 0,
              animation: `fadeUp 0.35s ease ${i * 70}ms forwards`,
            }}
          >
            {/* Emoji + tag row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 26, lineHeight: 1 }}>{card.emoji}</span>
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains-mono, monospace)',
                  fontSize: 10,
                  letterSpacing: '1.3px',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}
              >
                {card.tag}
              </div>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-fraunces, serif)',
                fontSize: 20,
                fontWeight: 400,
                color: 'var(--ink)',
                letterSpacing: '-0.3px',
                lineHeight: 1.25,
                marginBottom: 10,
              }}
            >
              {card.title}
            </div>
            <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.6 }}>
              {card.body}
            </p>
          </div>
        ))}
      </div>

      {/* Skin profile bottom sheet */}
      {showSkinSheet && (
        <>
          <div
            onClick={() => setShowSkinSheet(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(43,31,28,0.45)', zIndex: 50 }}
          />
          <div
            className="anim-slide-up"
            style={{
              position: 'fixed',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: 430,
              background: 'var(--surface)',
              borderRadius: '22px 22px 0 0',
              padding: '16px 20px 52px',
              zIndex: 51,
              maxHeight: '82vh',
              overflowY: 'auto',
            }}
          >
            {/* Handle */}
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--line)', margin: '0 auto 20px' }} />

            {/* Sheet header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'var(--accent-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <SkinProfileIcon size={36} active={true} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-fraunces, serif)',
                    fontSize: 20,
                    fontWeight: 400,
                    color: 'var(--ink)',
                    letterSpacing: '-0.3px',
                  }}
                >
                  Your skin profile
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-muted)', marginTop: 3 }}>
                  Personalises your insights over time.
                </div>
              </div>
            </div>

            {/* Skin type */}
            <div
              style={{
                fontFamily: 'var(--font-jetbrains-mono, monospace)',
                fontSize: 10,
                letterSpacing: '1.4px',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                marginBottom: 10,
              }}
            >
              Skin type
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 26 }}>
              {SKIN_TYPES.map(({ key, label }) => {
                const active = skinType === key
                return (
                  <button
                    key={key}
                    onClick={() => setSkinType(active ? null : key)}
                    style={{
                      flex: 1,
                      padding: '11px 4px',
                      borderRadius: 12,
                      border: active ? 'none' : '1px solid var(--line)',
                      background: active ? 'var(--ink)' : 'transparent',
                      color: active ? '#FBF6F2' : 'var(--ink-muted)',
                      fontFamily: 'var(--font-inter-tight, sans-serif)',
                      fontSize: 15,
                      fontWeight: active ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Concerns */}
            <div
              style={{
                fontFamily: 'var(--font-jetbrains-mono, monospace)',
                fontSize: 10,
                letterSpacing: '1.4px',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                marginBottom: 10,
              }}
            >
              Concerns
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SKIN_CONCERNS.map(concern => {
                const active = concerns.includes(concern)
                return (
                  <button
                    key={concern}
                    onClick={() => toggleConcern(concern)}
                    style={{
                      padding: '8px 15px',
                      borderRadius: 999,
                      border: active ? 'none' : '1px solid var(--line)',
                      background: active ? 'var(--accent-soft)' : 'transparent',
                      color: active ? 'var(--accent-deep)' : 'var(--ink-muted)',
                      fontFamily: 'var(--font-inter-tight, sans-serif)',
                      fontSize: 15,
                      fontWeight: active ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {concern}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/* ──────────────────────────────
   Side-profile face with magnifying glass + acne icon
   (line art, matching reference image)
────────────────────────────── */
function SkinProfileIcon({ size = 32, active }: { size?: number; active: boolean }) {
  const color = active ? 'var(--accent-deep)' : 'var(--ink)'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 115"
      fill="none"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* ── Hair / top of head ── */}
      <path d="M 54 10 C 44 6, 36 10, 34 18" />
      <path d="M 58 8 C 66 5, 75 9, 78 18 C 82 30, 80 52, 74 68 C 68 82, 58 94, 50 100" />

      {/* ── Face profile outline (left-facing) ── */}
      <path d="
        M 54 10
        C 50 16, 47 23, 46 30
        C 44 34, 42 36, 43 40
        C 44 43, 45 45, 43 50
        C 40 56, 35 61, 32 68
        C 30 72, 30 76, 32 79
        C 33 81, 35 83, 33 87
        C 31 91, 29 96, 32 102
        C 35 107, 44 110, 50 110
      " />

      {/* ── Neck continuation ── */}
      <path d="M 50 110 C 52 114, 56 118, 62 118" />

      {/* ── Closed eye ── */}
      <path d="M 45 37 C 49 34, 55 34, 59 37" strokeWidth="3" />

      {/* ── Nose ── */}
      <path d="M 37 65 C 34 68, 32 71, 34 74 C 35 76, 38 76, 40 74" strokeWidth="3" />

      {/* ── Magnifying glass circle (on cheek) ── */}
      <circle cx="32" cy="82" r="18" strokeWidth="3.5" />

      {/* ── Handle ── */}
      <path d="M 16 97 L 7 110" strokeWidth="5" strokeLinecap="round" />
      <path d="M 14 96 L 20 98" strokeWidth="3" />

      {/* ── Acne dots INSIDE magnifying glass ── */}
      <circle cx="28" cy="77" r="3"  fill={color} stroke="none" />
      <circle cx="36" cy="75" r="2"  fill={color} stroke="none" />
      <circle cx="24" cy="84" r="2.5" fill={color} stroke="none" />
      <circle cx="34" cy="86" r="2"  fill={color} stroke="none" />
      <circle cx="40" cy="80" r="1.8" fill={color} stroke="none" />

      {/* ── Acne dots on face (outside glass) ── */}
      <circle cx="44" cy="52" r="2"  fill={color} stroke="none" />
      <circle cx="47" cy="62" r="1.6" fill={color} stroke="none" />
    </svg>
  )
}
