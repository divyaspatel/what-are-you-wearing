'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { PRODUCTS, SECTIONS } from '@/lib/data'

const DISPLAY_SECTIONS = SECTIONS.filter(s => s.key !== 'skincare')
import { useApp } from '@/lib/context'
import ProductCard from '@/components/ProductCard'

export default function ProductsPage() {
  const router = useRouter()
  const { ratings, setRating } = useApp()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(DISPLAY_SECTIONS.map(s => [s.key, true]))
  )

  const productsBySection = useMemo(() => {
    const map: Record<string, typeof PRODUCTS> = {}
    for (const s of DISPLAY_SECTIONS) {
      map[s.key] = PRODUCTS.filter(p => p.section === s.key)
    }
    return map
  }, [])

  const ratedCount  = Object.keys(ratings).length
  const mustCount   = Object.values(ratings).filter(r => r === 'must').length
  const fineCount   = Object.values(ratings).filter(r => r === 'fine').length
  const skipCount   = Object.values(ratings).filter(r => r === 'skip').length
  const progressPct = Math.round((ratedCount / PRODUCTS.length) * 100)

  const toggleSection = (key: string) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 100 }}>
      {/* Fixed header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          background: 'var(--bg)',
          borderBottom: '1px solid var(--line)',
          padding: '14px 20px 12px',
        }}
      >
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-fraunces, serif)',
                fontSize: 20,
                fontWeight: 400,
                letterSpacing: '-0.5px',
                color: 'var(--ink)',
                lineHeight: 1.2,
              }}
            >
              What Are You Wearing?
            </h1>
            <span
              style={{
                fontFamily: 'var(--font-jetbrains-mono, monospace)',
                fontSize: 11,
                letterSpacing: '1.4px',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
              }}
            >
              Scan · Apr 19
            </span>
          </div>
          <div style={{ width: 40 }} />
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: 4,
            background: 'var(--line)',
            borderRadius: 999,
            overflow: 'hidden',
            marginBottom: 7,
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progressPct}%`,
              background: 'var(--accent)',
              borderRadius: 999,
              transition: 'width 0.4s ease',
            }}
          />
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <StatBadge label={`${ratedCount} / ${PRODUCTS.length} rated`} />
          <StatBadge label={`${mustCount} must`} color="var(--accent)" />
          <StatBadge label={`${fineCount} fine`} color="var(--fine)" />
          <StatBadge label={`${skipCount} skip`} color="var(--skip)" />
        </div>
      </div>

      {/* Sections */}
      <div style={{ padding: '12px 0' }}>
        {DISPLAY_SECTIONS.map(section => {
          const sectionProducts = productsBySection[section.key]
          const isEmpty = sectionProducts.length === 0
          const isOpen  = openSections[section.key]
          const sectionRatedCount = sectionProducts.filter(p => ratings[p.id]).length

          return (
            <div key={section.key} style={{ marginBottom: 4 }}>
              {/* Section header */}
              <button
                onClick={() => !isEmpty && toggleSection(section.key)}
                disabled={isEmpty}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 20px',
                  background: 'transparent',
                  border: 'none',
                  cursor: isEmpty ? 'default' : 'pointer',
                  opacity: isEmpty ? 0.38 : 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-fraunces, serif)',
                      fontSize: 16,
                      fontWeight: 400,
                      color: 'var(--ink)',
                      letterSpacing: '-0.3px',
                    }}
                  >
                    {section.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono, monospace)',
                      fontSize: 11,
                      letterSpacing: '1px',
                      color: 'var(--ink-faint)',
                      paddingTop: 1,
                    }}
                  >
                    {isEmpty ? '—' : `${sectionRatedCount}/${sectionProducts.length}`}
                  </span>
                </div>
                {!isEmpty && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                    }}
                  >
                    <path
                      d="M3 5l4 4 4-4"
                      stroke="var(--ink-muted)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              {/* Products */}
              {!isEmpty && isOpen && (
                <div
                  style={{
                    padding: '4px 16px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  {sectionProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      rating={ratings[product.id] ?? null}
                      onRate={setRating}
                    />
                  ))}
                </div>
              )}

              {/* Section divider */}
              <div style={{ height: 1, background: 'var(--line)', margin: '4px 20px 0' }} />
            </div>
          )
        })}
      </div>

      {/* Sticky CTA */}
      <div
        style={{
          position: 'fixed',
          bottom: 65,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 430,
          padding: '12px 20px 32px',
          background: 'linear-gradient(to top, var(--bg) 70%, transparent)',
          zIndex: 30,
        }}
      >
        <button
          onClick={() => router.push('/mybag')}
          style={{
            width: '100%',
            height: 54,
            borderRadius: 999,
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            fontFamily: 'var(--font-inter-tight, sans-serif)',
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 4px 20px #D97A7A44',
            transition: 'opacity 0.18s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = '0.88')}
          onMouseOut={e => (e.currentTarget.style.opacity = '1')}
        >
          Share my picks
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function StatBadge({ label, color }: { label: string; color?: string }) {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        fontFamily: 'var(--font-jetbrains-mono, monospace)',
        fontSize: 11,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        color: color ?? 'var(--ink-muted)',
      }}
    >
      {color && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: color,
            flexShrink: 0,
            display: 'inline-block',
          }}
        />
      )}
      {label}
    </span>
  )
}
