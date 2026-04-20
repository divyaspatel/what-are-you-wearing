'use client'

import { useRouter, useParams } from 'next/navigation'
import { PEOPLE, PRODUCTS, Rating } from '@/lib/data'
import ProductBottle from '@/components/ProductBottle'

const RATING_COLORS: Record<Rating, string> = {
  must: '#D97A7A',
  fine: '#C9B4A3',
  skip: '#CFC4BC',
}
const RATING_BG: Record<Rating, string> = {
  must: '#F5D9D4',
  fine: '#EDE3DA',
  skip: '#EDE3DA',
}

export default function FriendPage() {
  const router = useRouter()
  const params  = useParams()
  const handle  = params.handle as string

  const person = PEOPLE.find(p => p.handle === handle) ?? PEOPLE[0]
  const ownerProducts = PRODUCTS.filter(p => person.products.includes(p.id))

  // Build ratings map: musts = 'must', everything else in their bag = 'fine'
  const ownerRatingsMap: Record<string, Rating> = {}
  person.products.forEach(id => {
    ownerRatingsMap[id] = person.musts.includes(id) ? 'must' : 'fine'
  })

  const mustProducts  = ownerProducts.filter(p => person.musts.includes(p.id))
  const otherProducts = ownerProducts.filter(p => !person.musts.includes(p.id))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 60 }}>
      {/* Header */}
      <div
        style={{
          padding: '52px 20px 16px',
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
            fontSize: 14,
            padding: '0 0 14px',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
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
                fontSize: 10,
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
      </div>

      <div style={{ padding: '16px 16px 0' }}>
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
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-jetbrains-mono, monospace)',
        fontSize: 10,
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
}: {
  product: { id: string; brand: string; name: string; shade: string | null; shadeHex: string | null; price: string; bottle: import('@/lib/data').BottleType; bottleColor: string }
  ownerRating: Rating | null
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
      {/* Bottle */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <ProductBottle
          type={product.bottle}
          color={product.bottleColor}
          shade={product.shadeHex}
          uid={`friend-${product.id}`}
        />
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
            fontSize: 9,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
          }}
        >
          {product.brand}
        </span>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.3 }}>
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
            <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{product.shade}</span>
          </div>
        )}
        <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{product.price}</span>

        {/* Her rating badge */}
        {ownerRating && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              marginTop: 5,
              padding: '3px 8px',
              borderRadius: 999,
              background: RATING_BG[ownerRating],
              alignSelf: 'flex-start',
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: RATING_COLORS[ownerRating],
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-jetbrains-mono, monospace)',
                fontSize: 9,
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                color: RATING_COLORS[ownerRating],
                fontWeight: 600,
              }}
            >
              {ownerRating}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
