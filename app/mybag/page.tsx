'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PRODUCTS, Rating } from '@/lib/data'
import { useApp } from '@/lib/context'
import ProductBottle from '@/components/ProductBottle'

const RATING_COLORS: Record<Rating, string> = {
  must: '#D97A7A',
  fine: '#C9B4A3',
  skip: '#CFC4BC',
}
const RATING_TEXT: Record<Rating, string> = {
  must: '#FFFFFF',
  fine: '#2B1F1C',
  skip: '#2B1F1C',
}

export default function MyBagPage() {
  const router = useRouter()
  const { ratings, setRating, notes, setNote, addToBag, onboardingStep, advanceOnboarding } = useApp()
  const [filter, setFilter]           = useState<'all' | Rating>('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const mustCount = Object.values(ratings).filter(r => r === 'must').length
  const fineCount = Object.values(ratings).filter(r => r === 'fine').length
  const skipCount = Object.values(ratings).filter(r => r === 'skip').length
  const totalCount = mustCount + fineCount + skipCount

  // During onboarding step 2, always show the first product (Rare Beauty Blush)
  // even if no filter matches, so the user has something to rate
  const bagProducts = PRODUCTS.filter(p => {
    const r = ratings[p.id]
    if (onboardingStep === 2 && p.id === 'p1') return true
    if (!r) return false
    return filter === 'all' || r === filter
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          paddingTop: 62,
          padding: '52px 20px 12px',
          background: 'var(--bg)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-fraunces, serif)',
                fontSize: 22,
                fontWeight: 400,
                color: 'var(--ink)',
                letterSpacing: '-0.5px',
                marginBottom: 4,
              }}
            >
              My make up bag
            </h1>
            {/* Description */}
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.45, maxWidth: 240 }}>
              Keep track of all the products you&apos;ve tried.
            </p>
          </div>

          {/* Share button — pulses gold during onboarding step 3 */}
          <button
            onClick={() => {
              if (onboardingStep === 3) advanceOnboarding()
              router.push('/share')
            }}
            className={onboardingStep === 3 ? 'gold-pulse' : ''}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '7px 13px',
              borderRadius: 999,
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              fontFamily: 'var(--font-inter-tight, sans-serif)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.4px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 2px 10px #D97A7A33',
              flexShrink: 0,
              marginTop: 2,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M6 9V2M3 5l3-3 3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 10h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Share
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 7, padding: '10px 16px 0' }}>
        <FilterPill label="All"  count={totalCount}  active={filter === 'all'}  onClick={() => setFilter('all')}  color="var(--ink)"  bg="var(--line)" />
        <FilterPill label="Must" count={mustCount}  active={filter === 'must'} onClick={() => setFilter(filter === 'must'  ? 'all' : 'must')}  color="#D97A7A" bg="#F5D9D4" />
        <FilterPill label="Fine" count={fineCount}  active={filter === 'fine'} onClick={() => setFilter(filter === 'fine'  ? 'all' : 'fine')}  color="#8A7060" bg="#EDE3DA" />
        <FilterPill label="Skip" count={skipCount}  active={filter === 'skip'} onClick={() => setFilter(filter === 'skip'  ? 'all' : 'skip')}  color="#7A6B63" bg="#EDE3DA" />
      </div>

      {/* Add a product button */}
      <div style={{ padding: '8px 16px 4px' }}>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            width: '100%',
            padding: '9px 16px',
            borderRadius: 12,
            border: '1.5px dashed var(--line)',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
            color: 'var(--ink-muted)',
            fontFamily: 'var(--font-inter-tight, sans-serif)',
            fontSize: 13,
            fontWeight: 500,
            transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.color = 'var(--accent)'
          }}
          onMouseOut={e => {
            e.currentTarget.style.borderColor = 'var(--line)'
            e.currentTarget.style.color = 'var(--ink-muted)'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Add a product to my bag
        </button>
      </div>

      {/* Product list */}
      <div style={{ padding: '8px 16px 0' }}>
        {bagProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontFamily: 'var(--font-fraunces, serif)', fontSize: 16, color: 'var(--ink-muted)', marginBottom: 6 }}>
              {filter === 'all' ? 'Your bag is empty.' : `No ${filter} products.`}
            </div>
            <div style={{ fontSize: 15, color: 'var(--ink-faint)' }}>
              Rate products in Picks, or add one above.
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {bagProducts.map((product, index) => {
              const isOnboardingTarget = onboardingStep === 2 && index === 0
              return (
                <BagCard
                  key={product.id}
                  product={product}
                  rating={isOnboardingTarget ? null : (ratings[product.id] ?? null)}
                  note={notes[product.id] ?? ''}
                  onRate={(id, r) => {
                    setRating(id, r)
                    if (isOnboardingTarget && r === 'must') advanceOnboarding()
                  }}
                  onNote={setNote}
                  pulseMusButton={isOnboardingTarget}
                />
              )
            })}
          </div>
        )}
      </div>

      {/* Add product modal */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdd={(id) => { addToBag(id); setShowAddModal(false) }}
          existingIds={Object.keys(ratings)}
        />
      )}
    </div>
  )
}

/* ──────────────────────────────
   ADD PRODUCT MODAL
────────────────────────────── */
function AddProductModal({
  onClose,
  onAdd,
  existingIds,
}: {
  onClose: () => void
  onAdd: (id: string) => void
  existingIds: string[]
}) {
  const router = useRouter()
  const [mode, setMode]       = useState<'choose' | 'list'>('choose')
  const [search, setSearch]   = useState('')

  const available = PRODUCTS.filter(p => {
    if (existingIds.includes(p.id)) return false
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
  })

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(43,31,28,0.45)', zIndex: 50 }} />
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
          padding: '16px 20px 48px',
          zIndex: 51,
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Handle */}
        <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--line)', margin: '0 auto 18px' }} />

        <h3
          style={{
            fontFamily: 'var(--font-fraunces, serif)',
            fontSize: 19,
            fontWeight: 400,
            color: 'var(--ink)',
            marginBottom: 16,
          }}
        >
          Add a product
        </h3>

        {mode === 'choose' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Option 1: Scan */}
            <button
              onClick={() => { onClose(); router.push('/scan') }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '16px 16px',
                borderRadius: 14,
                border: '1px solid var(--line)',
                background: 'var(--card-bg)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: 'var(--accent-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="5" width="16" height="12" rx="2.5" stroke="var(--accent)" strokeWidth="1.6" />
                  <circle cx="10" cy="11" r="3" stroke="var(--accent)" strokeWidth="1.6" />
                  <path d="M7 2h6" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>
                  Scan or upload
                </div>
                <div style={{ fontSize: 14, color: 'var(--ink-muted)' }}>
                  Take a photo or upload from your library
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                <path d="M6 3l5 5-5 5" stroke="var(--ink-faint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Option 2: Select from list */}
            <button
              onClick={() => setMode('list')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '16px 16px',
                borderRadius: 14,
                border: '1px solid var(--line)',
                background: 'var(--card-bg)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: 'var(--line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 6h12M4 10h8M4 14h10" stroke="var(--ink-muted)" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>
                  Select from list
                </div>
                <div style={{ fontSize: 14, color: 'var(--ink-muted)' }}>
                  Browse and pick from known products
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                <path d="M6 3l5 5-5 5" stroke="var(--ink-faint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            {/* Search */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--card-bg)',
                borderRadius: 10,
                padding: '8px 12px',
                marginBottom: 12,
                border: '1px solid var(--line)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="var(--ink-faint)" strokeWidth="1.4" />
                <path d="M9.5 9.5l3 3" stroke="var(--ink-faint)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input
                autoFocus
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by brand or name..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-inter-tight, sans-serif)',
                  fontSize: 14,
                  color: 'var(--ink)',
                }}
              />
            </div>

            {/* Product list */}
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {available.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--ink-faint)', fontSize: 13 }}>
                  {search ? 'No products match your search.' : 'All products are already in your bag.'}
                </div>
              ) : (
                available.map(product => (
                  <button
                    key={product.id}
                    onClick={() => onAdd(product.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 4px',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--line)',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 8,
                        background: 'var(--card-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg viewBox="0 0 60 80" width="20" height="27">
                        <rect x="18" y="16" width="24" height="52" rx="5" fill={product.bottleColor} />
                        <rect x="18" y="16" width="24" height="52" rx="5" fill="rgba(255,255,255,0.22)" />
                      </svg>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--font-jetbrains-mono, monospace)', fontSize: 10, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 1 }}>
                        {product.brand}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>{product.name}</div>
                    </div>
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: 'var(--accent-soft)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 2v8M2 6h8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </button>
                ))
              )}
            </div>

            <button
              onClick={() => setMode('choose')}
              style={{
                marginTop: 12,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--ink-faint)',
                fontFamily: 'var(--font-inter-tight, sans-serif)',
                fontSize: 15,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 3L4 7l5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>
          </>
        )}
      </div>
    </>
  )
}

/* ──────────────────────────────
   BAG CARD (with notes)
────────────────────────────── */
function BagCard({
  product,
  rating,
  note,
  onRate,
  onNote,
  pulseMusButton = false,
}: {
  product: typeof PRODUCTS[number]
  rating: Rating | null
  note: string
  onRate: (id: string, r: Rating | null) => void
  onNote: (id: string, n: string) => void
  pulseMusButton?: boolean
}) {
  const [editingNote, setEditingNote] = useState(false)
  const [draft, setDraft] = useState(note)
  const isSkip = rating === 'skip'
  const isMust = rating === 'must'

  const saveNote = () => {
    onNote(product.id, draft)
    setEditingNote(false)
  }

  return (
    <div
      style={{
        borderRadius: 14,
        border: '1px solid var(--line)',
        background: 'var(--card-bg)',
        opacity: isSkip ? 0.55 : 1,
        transition: 'opacity 0.25s, box-shadow 0.25s',
        boxShadow: isMust ? '0 0 0 3px #D97A7A22, 0 8px 24px #D97A7A33' : '0 1px 4px rgba(43,31,28,0.05)',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ flexShrink: 0 }}>
          <ProductBottle type={product.bottle} color={product.bottleColor} shade={product.shadeHex} uid={`bag-${product.id}`} />
        </div>

        <div style={{ flex: 1, padding: '11px 12px 11px 8px', display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
          <span style={{ fontFamily: 'var(--font-jetbrains-mono, monospace)', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
            {product.brand}
          </span>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.3 }}>
            {product.name}
          </span>
          {product.shade && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {product.shadeHex && (
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: product.shadeHex, border: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }} />
              )}
              <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{product.shade}</span>
            </div>
          )}
          <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{product.price}</span>

          {/* Rating pills */}
          <div style={{ display: 'flex', gap: 5, marginTop: 5 }}>
            {(['skip', 'fine', 'must'] as Rating[]).map(r => {
              const active = rating === r
              const isMustPulse = pulseMusButton && r === 'must'
              return (
                <button
                  key={r}
                  onClick={() => onRate(product.id, active ? null : r)}
                  className={isMustPulse ? 'gold-pulse' : ''}
                  style={{
                    fontFamily: 'var(--font-inter-tight, sans-serif)',
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.4px',
                    textTransform: 'uppercase',
                    padding: '4px 9px',
                    borderRadius: 999,
                    border: active ? 'none' : '1px solid var(--line)',
                    background: active ? RATING_COLORS[r] : 'transparent',
                    color: active ? RATING_TEXT[r] : 'var(--ink-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.18s',
                    boxShadow: active && r === 'must' ? '0 2px 10px #D97A7A55' : 'none',
                    flexShrink: 0,
                  }}
                >
                  {r}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Note section */}
      <div style={{ borderTop: '1px solid var(--line)', padding: '8px 12px', background: 'rgba(255,255,255,0.5)' }}>
        {editingNote ? (
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <textarea
              autoFocus
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder="Add a note about this product..."
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveNote() } }}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--line)',
                outline: 'none',
                fontFamily: 'var(--font-inter-tight, sans-serif)',
                fontSize: 14,
                color: 'var(--ink)',
                resize: 'none',
                minHeight: 40,
                lineHeight: 1.5,
                padding: '2px 0',
              }}
              rows={2}
            />
            <div style={{ display: 'flex', gap: 5, flexShrink: 0, paddingTop: 2 }}>
              <button onClick={saveNote} style={{ fontFamily: 'var(--font-inter-tight, sans-serif)', fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: 'var(--ink)', color: '#FBF6F2', border: 'none', cursor: 'pointer' }}>
                Save
              </button>
              <button onClick={() => { setDraft(note); setEditingNote(false) }} style={{ fontFamily: 'var(--font-inter-tight, sans-serif)', fontSize: 12, padding: '4px 8px', borderRadius: 999, background: 'transparent', color: 'var(--ink-faint)', border: '1px solid var(--line)', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        ) : note ? (
          <div onClick={() => { setDraft(note); setEditingNote(true) }} style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.5, cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M2 9.5V8l6-6 1.5 1.5-6 6H2z" stroke="var(--ink-faint)" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            {note}
          </div>
        ) : (
          <button
            onClick={() => { setDraft(''); setEditingNote(true) }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-inter-tight, sans-serif)', fontSize: 13, color: 'var(--ink-faint)', padding: 0, display: 'flex', alignItems: 'center', gap: 5 }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Add a note
          </button>
        )}
      </div>
    </div>
  )
}

function FilterPill({ label, count, active, onClick, color, bg }: {
  label: string; count: number; active: boolean; onClick: () => void; color: string; bg: string
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 5,
        padding: '5px 11px', borderRadius: 999,
        background: active ? color : bg,
        color: active ? (color === 'var(--ink)' ? '#FBF6F2' : color) : color,
        border: 'none', cursor: 'pointer', transition: 'all 0.15s',
      }}
    >
      <span style={{ fontFamily: 'var(--font-inter-tight, sans-serif)', fontSize: 14, fontWeight: 500 }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-jetbrains-mono, monospace)', fontSize: 11, letterSpacing: '0.5px' }}>{count}</span>
    </button>
  )
}
