'use client'

import ProductBottle from './ProductBottle'
import { Product, Rating } from '@/lib/data'

interface ProductCardProps {
  product: Product
  rating?: Rating | null
  onRate?: (id: string, rating: Rating | null) => void
  ownerRating?: Rating | null
  readOnly?: boolean
}

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

export default function ProductCard({
  product,
  rating,
  onRate,
  ownerRating,
  readOnly = false,
}: ProductCardProps) {
  const isMust = rating === 'must'
  const isSkip = rating === 'skip'

  return (
    <div
      style={{
        display: 'flex',
        borderRadius: 14,
        border: '1px solid var(--line)',
        background: 'var(--card-bg)',
        overflow: 'hidden',
        opacity: isSkip ? 0.42 : 1,
        transition: 'opacity 0.25s, box-shadow 0.25s',
        boxShadow: isMust
          ? '0 0 0 3px #D97A7A22, 0 8px 24px #D97A7A33'
          : '0 1px 4px rgba(43,31,28,0.05)',
      }}
    >
      {/* Bottle visual */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <ProductBottle
          type={product.bottle}
          color={product.bottleColor}
          shade={product.shadeHex}
          uid={product.id}
        />
        {/* owner rating badge */}
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
              border: '1.5px solid rgba(255,255,255,0.8)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
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
        {/* Brand */}
        <span
          style={{
            fontFamily: 'var(--font-jetbrains-mono, monospace)',
            fontSize: 10,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
          }}
        >
          {product.brand}
        </span>

        {/* Name */}
        <span
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: 'var(--ink)',
            lineHeight: 1.3,
            letterSpacing: '-0.2px',
          }}
        >
          {product.name}
        </span>

        {/* Shade */}
        {product.shade && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {product.shadeHex && (
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: product.shadeHex,
                  flexShrink: 0,
                  border: '1px solid rgba(0,0,0,0.08)',
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

        {/* Price */}
        <span
          style={{
            fontSize: 13,
            color: 'var(--ink-faint)',
            fontWeight: 400,
          }}
        >
          {product.price}
        </span>

        {/* Rating pills */}
        {!readOnly && (
          <div style={{ display: 'flex', gap: 5, marginTop: 5 }}>
            {(['skip', 'fine', 'must'] as Rating[]).map(r => {
              const active = rating === r
              return (
                <button
                  key={r}
                  onClick={() => onRate?.(product.id, active ? null : r)}
                  style={{
                    fontFamily: 'var(--font-inter-tight, sans-serif)',
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '0.4px',
                    textTransform: 'uppercase',
                    padding: '5px 11px',
                    borderRadius: 999,
                    border: active ? 'none' : '1px solid var(--line)',
                    background: active ? RATING_COLORS[r] : 'transparent',
                    color: active ? RATING_TEXT[r] : 'var(--ink-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.18s',
                    boxShadow:
                      active && r === 'must'
                        ? '0 2px 10px #D97A7A55'
                        : 'none',
                    flexShrink: 0,
                  }}
                >
                  {r}
                </button>
              )
            })}
          </div>
        )}

        {/* Read-only rating badge */}
        {readOnly && rating && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              marginTop: 5,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: RATING_COLORS[rating],
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-jetbrains-mono, monospace)',
                fontSize: 11,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
              }}
            >
              {rating}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
