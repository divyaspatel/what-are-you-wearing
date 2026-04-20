'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { PEOPLE, PRODUCTS, Rating } from '@/lib/data'
import ProductBottle from '@/components/ProductBottle'

const RATING_COLORS: Record<Rating, string> = {
  must: '#D97A7A',
  fine: '#C9B4A3',
  skip: '#CFC4BC',
}

export default function FriendPage() {
  const router = useRouter()
  const params  = useParams()
  const handle  = params.handle as string

  const person = PEOPLE.find(p => p.handle === handle) ?? PEOPLE[0]
  const ownerProducts = PRODUCTS.filter(p => person.products.includes(p.id))
  const ownerRatingsMap: Record<string, Rating> = Object.fromEntries(
    person.musts.map(id => [id, 'must' as Rating])
  )

  const [myRatings, setMyRatings] = useState<Record<string, Rating>>({})
  const [sent, setSent] = useState(false)

  const setRating = (id: string, rating: Rating | null) => {
    setMyRatings(prev => {
      const next = { ...prev }
      if (rating === null) delete next[id]
      else next[id] = rating
      return next
    })
  }

  const mustProducts = ownerProducts.filter(p => person.musts.includes(p.id))
  const otherProducts = ownerProducts.filter(p => !person.musts.includes(p.id))

  const handleSend = () => {
    setSent(true)
  }

  if (sent) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--bg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 28px',
          textAlign: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'var(--accent-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 12l5 5L20 7" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-fraunces, serif)',
            fontSize: 26,
            fontWeight: 400,
            color: 'var(--ink)',
          }}
        >
          Verdict sent!
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.5 }}>
          {person.name.split(' ')[0]} will see what you think of her picks.
        </p>
        <button
          onClick={() => router.push('/')}
          style={{
            marginTop: 8,
            padding: '12px 28px',
            borderRadius: 999,
            background: 'var(--ink)',
            color: '#FBF6F2',
            border: 'none',
            fontFamily: 'var(--font-inter-tight, sans-serif)',
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Back home
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 100 }}>
      {/* Header */}
      <div
        style={{
          padding: '62px 20px 20px',
          background: 'var(--bg)',
          borderBottom: '1px solid var(--line)',
        }}
      >
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
            padding: '0 0 16px',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Avatar */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${person.avatarGradient[0]}, ${person.avatarGradient[1]})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-fraunces, serif)',
              fontSize: 20,
              color: '#FBF6F2',
              flexShrink: 0,
            }}
          >
            {person.name[0]}
          </div>
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-fraunces, serif)',
                fontSize: 20,
                fontWeight: 400,
                color: 'var(--ink)',
                letterSpacing: '-0.4px',
              }}
            >
              What {person.name.split(' ')[0]}&apos;s wearing
            </h1>
            <div
              style={{
                fontFamily: 'var(--font-jetbrains-mono, monospace)',
                fontSize: 11,
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
                marginTop: 2,
              }}
            >
              {person.type === 'influencer' ? 'Influencer' : 'Friend'} · {person.products.length} products
            </div>
          </div>
        </div>

        {/* Speech bubble */}
        <div
          style={{
            marginTop: 16,
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '12px 12px 12px 4px',
            padding: '12px 14px',
            fontSize: 15,
            color: 'var(--ink-muted)',
            lineHeight: 1.5,
          }}
        >
          "Here's what I'm wearing today — tell me which ones I should keep ✨"
        </div>
      </div>

      <div style={{ padding: '20px 16px 0' }}>
        {/* Must-haves */}
        {mustProducts.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <SectionLabel label="Her must-haves" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {mustProducts.map(product => (
                <FriendCard
                  key={product.id}
                  product={product}
                  ownerRating={ownerRatingsMap[product.id] ?? null}
                  myRating={myRatings[product.id] ?? null}
                  onRate={setRating}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other products */}
        {otherProducts.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <SectionLabel label="Everything else" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {otherProducts.map(product => (
                <FriendCard
                  key={product.id}
                  product={product}
                  ownerRating={ownerRatingsMap[product.id] ?? null}
                  myRating={myRatings[product.id] ?? null}
                  onRate={setRating}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
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
          onClick={handleSend}
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
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = '0.88')}
          onMouseOut={e => (e.currentTarget.style.opacity = '1')}
        >
          Send {person.name.split(' ')[0]} my verdict
        </button>
      </div>
    </div>
  )
}

function SectionLabel({ label }: { label: string }) {
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

function FriendCard({
  product,
  ownerRating,
  myRating,
  onRate,
}: {
  product: { id: string; brand: string; name: string; shade: string | null; shadeHex: string | null; price: string; bottle: import('@/lib/data').BottleType; bottleColor: string }
  ownerRating: Rating | null
  myRating: Rating | null
  onRate: (id: string, rating: Rating | null) => void
}) {
  return (
    <div
      style={{
        display: 'flex',
        borderRadius: 14,
        border: '1px solid var(--line)',
        background: 'var(--card-bg)',
        overflow: 'hidden',
      }}
    >
      {/* Bottle with owner badge */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <ProductBottle
          type={product.bottle}
          color={product.bottleColor}
          shade={product.shadeHex}
          uid={`friend-${product.id}`}
        />
        {ownerRating && (
          <div
            style={{
              position: 'absolute',
              top: 6,
              left: 6,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: RATING_COLORS[ownerRating],
              border: '1.5px solid rgba(255,255,255,0.9)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
            }}
          />
        )}
      </div>

      {/* Info */}
      <div
        style={{
          flex: 1,
          padding: '11px 12px 11px 8px',
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
            letterSpacing: '1.5px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {product.shadeHex && (
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: product.shadeHex,
                  border: '1px solid rgba(0,0,0,0.08)',
                  flexShrink: 0,
                }}
              />
            )}
            <span
              style={{
                fontSize: 13,
                color: 'var(--ink-muted)',
              }}
            >
              {product.shade}
            </span>
          </div>
        )}
        <span style={{ fontSize: 13, color: 'var(--ink-faint)' }}>{product.price}</span>

        {/* Friend's own rating pills */}
        <div style={{ display: 'flex', gap: 5, marginTop: 5 }}>
          {(['skip', 'fine', 'must'] as Rating[]).map(r => {
            const active = myRating === r
            return (
              <button
                key={r}
                onClick={() => onRate(product.id, active ? null : r)}
                style={{
                  fontFamily: 'var(--font-inter-tight, sans-serif)',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  padding: '4px 9px',
                  borderRadius: 999,
                  border: active ? 'none' : '1px solid var(--line)',
                  background: active
                    ? r === 'must' ? '#D97A7A' : r === 'fine' ? '#C9B4A3' : '#CFC4BC'
                    : 'transparent',
                  color: active
                    ? r === 'must' ? '#fff' : 'var(--ink)'
                    : 'var(--ink-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                  boxShadow: active && r === 'must' ? '0 2px 8px #D97A7A55' : 'none',
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
  )
}
