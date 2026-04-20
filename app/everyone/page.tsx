'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PEOPLE, PRODUCTS, SECTIONS, Person } from '@/lib/data'
import { useApp } from '@/lib/context'
import ProductBottle from '@/components/ProductBottle'

type Tab = 'people' | 'products'

export default function EveryonePage() {
  const [activeTab, setActiveTab] = useState<Tab>('people')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          paddingTop: 52,
          background: 'var(--bg)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div style={{ padding: '0 20px 8px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-fraunces, serif)',
              fontSize: 22,
              fontWeight: 400,
              color: 'var(--ink)',
              letterSpacing: '-0.5px',
            }}
          >
            What's everyone wearing?
          </h1>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', padding: '0 16px' }}>
          {(['people', 'products'] as Tab[]).map(tab => {
            const active = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: '8px 4px 12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-inter-tight, sans-serif)',
                    fontSize: 15,
                    fontWeight: active ? 600 : 400,
                    color: active ? 'var(--ink)' : 'var(--ink-faint)',
                    transition: 'color 0.15s',
                    textTransform: 'capitalize',
                  }}
                >
                  {tab}
                </span>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '15%',
                    right: '15%',
                    height: 2,
                    borderRadius: 999,
                    background: active ? 'var(--accent)' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                />
              </button>
            )
          })}
        </div>
      </div>

      {activeTab === 'people'   && <PeopleTab />}
      {activeTab === 'products' && <ProductsTab />}
    </div>
  )
}

/* ──────────────────────────────
   PEOPLE TAB
────────────────────────────── */
function PeopleTab() {
  const router  = useRouter()
  const friends     = PEOPLE.filter(p => p.type === 'friend')
  const influencers = PEOPLE.filter(p => p.type === 'influencer')
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div style={{ padding: '10px 16px 0' }}>
      <GroupLabel label="Friends" />
      {friends.map(p => (
        <PersonRow
          key={p.id}
          person={p}
          expanded={expanded === p.id}
          onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
          onViewProfile={() => router.push(`/friend/${p.handle}`)}
        />
      ))}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div
          style={{
            fontFamily: 'var(--font-jetbrains-mono, monospace)',
            fontSize: 11,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
          }}
        >
          Influencers
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '4px 10px',
            borderRadius: 999,
            border: '1.5px dashed var(--line)',
            background: 'transparent',
            cursor: 'pointer',
            fontFamily: 'var(--font-inter-tight, sans-serif)',
            fontSize: 11,
            fontWeight: 500,
            color: 'var(--ink-muted)',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Add Linktree URL
        </button>
      </div>
      {influencers.map(p => (
        <PersonRow
          key={p.id}
          person={p}
          expanded={expanded === p.id}
          onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
          onViewProfile={() => router.push(`/friend/${p.handle}`)}
        />
      ))}
    </div>
  )
}

function PersonRow({
  person,
  expanded,
  onToggle,
  onViewProfile,
}: {
  person: Person
  expanded: boolean
  onToggle: () => void
  onViewProfile: () => void
}) {
  const { addToCart, isInCart, onboardingStep, advanceOnboarding } = useApp()
  const products = PRODUCTS.filter(p => person.products.includes(p.id))

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 14,
        marginBottom: 10,
        overflow: 'hidden',
      }}
    >
      {/* Person header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 14px',
          gap: 12,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${person.avatarGradient[0]}, ${person.avatarGradient[1]})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 600,
            color: '#FBF6F2',
            flexShrink: 0,
          }}
        >
          {person.name[0]}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{person.name}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 1 }}>{person.note}</div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <button
            onClick={onViewProfile}
            style={{
              fontFamily: 'var(--font-jetbrains-mono, monospace)',
              fontSize: 10,
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              padding: '5px 8px',
              borderRadius: 999,
              background: 'var(--card-bg)',
              border: '1px solid var(--line)',
              color: 'var(--ink-muted)',
              cursor: 'pointer',
            }}
          >
            View
          </button>
          <button
            onClick={() => {
              if (onboardingStep === 5 && person.id === 'emma') advanceOnboarding()
              onToggle()
            }}
            className={onboardingStep === 5 && person.id === 'emma' ? 'gold-pulse' : ''}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: expanded ? 'var(--line)' : 'transparent',
              border: '1px solid var(--line)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            >
              <path d="M2 4l4 4 4-4" stroke="var(--ink-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded product list */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {products.map(product => (
            <div
              key={product.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 14px',
                borderBottom: '1px solid var(--line)',
                gap: 10,
              }}
            >
              {/* Mini bottle */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'var(--card-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg viewBox="0 0 60 80" width="20" height="26">
                  <rect x="18" y="16" width="24" height="52" rx="5" fill={product.bottleColor} />
                  <rect x="18" y="16" width="24" height="52" rx="5" fill="rgba(255,255,255,0.22)" />
                </svg>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono, monospace)',
                    fontSize: 10,
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)',
                    marginBottom: 1,
                  }}
                >
                  {product.brand}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.3 }}>
                  {product.name}
                </div>
                {person.musts.includes(product.id) && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 3,
                      marginTop: 3,
                    }}
                  >
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)' }} />
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono, monospace)', fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--accent)' }}>
                      her must
                    </span>
                  </div>
                )}
              </div>

              {/* Add to cart */}
              <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                <ActionBtn
                  label="+ Cart"
                  done={isInCart(product.id)}
                  doneLabel="In cart"
                  onClick={() => addToCart(product.id)}
                  color="var(--ink-muted)"
                  bg="var(--card-bg)"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ──────────────────────────────
   PRODUCTS TAB
────────────────────────────── */
function ProductsTab() {
  const { addToCart, isInCart } = useApp()
  const [activeSection, setActiveSection] = useState<string>('all')

  const sections = [
    { key: 'all', label: 'All' },
    ...SECTIONS.filter(s => s.key !== 'skincare' && PRODUCTS.some(p => p.section === s.key)),
  ]

  const filtered = activeSection === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.section === activeSection)

  const ownersByProduct: Record<string, typeof PEOPLE> = {}
  for (const person of PEOPLE) {
    for (const pid of person.products) {
      if (!ownersByProduct[pid]) ownersByProduct[pid] = []
      ownersByProduct[pid].push(person)
    }
  }

  return (
    <div style={{ padding: '16px 16px 0' }}>
      {/* Section filter chips */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 12, marginBottom: 4 }}>
        {sections.map(s => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            style={{
              flexShrink: 0,
              padding: '6px 12px',
              borderRadius: 999,
              border: activeSection === s.key ? 'none' : '1px solid var(--line)',
              background: activeSection === s.key ? 'var(--ink)' : 'transparent',
              color: activeSection === s.key ? '#FBF6F2' : 'var(--ink-muted)',
              fontFamily: 'var(--font-inter-tight, sans-serif)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Product cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(product => {
          const owners = ownersByProduct[product.id] ?? []
          return (
            <div
              key={product.id}
              style={{
                display: 'flex',
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 14,
                overflow: 'hidden',
              }}
            >
              {/* Bottle */}
              <div style={{ flexShrink: 0 }}>
                <ProductBottle
                  type={product.bottle}
                  color={product.bottleColor}
                  shade={product.shadeHex}
                  uid={`ev-${product.id}`}
                  size={52}
                />
              </div>

              {/* Info + actions */}
              <div
                style={{
                  flex: 1,
                  padding: '10px 12px 10px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono, monospace)',
                    fontSize: 11,
                    letterSpacing: '1.4px',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)',
                  }}
                >
                  {product.brand}
                </span>
                <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.3 }}>
                  {product.name}
                </span>
                {product.shade && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {product.shadeHex && (
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: product.shadeHex, border: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }} />
                    )}
                    <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{product.shade}</span>
                  </div>
                )}

                {/* Owner dots */}
                {owners.length > 0 && (
                  <div style={{ display: 'flex', gap: 3, marginTop: 2 }}>
                    {owners.slice(0, 5).map(owner => (
                      <div
                        key={owner.id}
                        title={owner.name}
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          background: owner.avatarColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 10,
                          color: '#fff',
                          fontWeight: 700,
                        }}
                      >
                        {owner.name[0]}
                      </div>
                    ))}
                    <span style={{ fontSize: 12, color: 'var(--ink-faint)', marginLeft: 2, alignSelf: 'center' }}>
                      {owners.length === 1 ? `${owners[0].name.split(' ')[0]} has this` : `${owners.length} people`}
                    </span>
                  </div>
                )}

                {/* Add to cart */}
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  <ActionBtn
                    label="+ Cart"
                    done={isInCart(product.id)}
                    doneLabel="In cart"
                    onClick={() => addToCart(product.id)}
                    color="var(--ink-muted)"
                    bg="var(--card-bg)"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ──────────────────────────────
   SHARED
────────────────────────────── */
function ActionBtn({
  label, done, doneLabel, onClick, color, bg,
}: {
  label: string; done: boolean; doneLabel: string; onClick: () => void; color: string; bg: string
}) {
  return (
    <button
      onClick={() => !done && onClick()}
      style={{
        fontFamily: 'var(--font-inter-tight, sans-serif)',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.3px',
        padding: '4px 10px',
        borderRadius: 999,
        border: done ? 'none' : `1px solid ${color}`,
        background: done ? bg : 'transparent',
        color: done ? color : color,
        cursor: done ? 'default' : 'pointer',
        transition: 'all 0.15s',
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        flexShrink: 0,
      }}
    >
      {done && (
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
          <path d="M1.5 4.5l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {done ? doneLabel : label}
    </button>
  )
}

function GroupLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-jetbrains-mono, monospace)',
        fontSize: 11,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: 'var(--ink-muted)',
        marginBottom: 10,
      }}
    >
      {label}
    </div>
  )
}
