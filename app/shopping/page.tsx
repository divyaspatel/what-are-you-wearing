'use client'

import { PRODUCTS } from '@/lib/data'
import { useApp } from '@/lib/context'
import ProductBottle from '@/components/ProductBottle'

export default function ShoppingPage() {
  const { cartItems, removeFromCart, addToBag, isInBag, ratings } = useApp()

  const cartProducts = PRODUCTS.filter(p => cartItems[p.id])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          paddingTop: 62,
          padding: '62px 20px 16px',
          background: 'var(--bg)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-fraunces, serif)',
            fontSize: 22,
            fontWeight: 400,
            color: 'var(--ink)',
            letterSpacing: '-0.5px',
            marginBottom: 2,
          }}
        >
          My shopping cart
        </h1>
        <div
          style={{
            fontFamily: 'var(--font-jetbrains-mono, monospace)',
            fontSize: 9,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            color: 'var(--ink-faint)',
          }}
        >
          {cartProducts.length} {cartProducts.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        {cartProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'var(--card-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M1 1h4l2.5 11h10l2.5-9H7" stroke="var(--ink-faint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="19" r="1.5" fill="var(--ink-faint)" />
                <circle cx="17" cy="19" r="1.5" fill="var(--ink-faint)" />
              </svg>
            </div>
            <div style={{ fontFamily: 'var(--font-fraunces, serif)', fontSize: 16, color: 'var(--ink-muted)', marginBottom: 6 }}>
              Cart is empty.
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-faint)' }}>
              Add products from the Everyone tab.
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {cartProducts.map(product => {
              const inBag    = isInBag(product.id)
              const bagRating = ratings[product.id]
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
                      uid={`cart-${product.id}`}
                      size={52}
                    />
                  </div>

                  {/* Info */}
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
                        fontSize: 8.5,
                        letterSpacing: '1.4px',
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {product.shadeHex && (
                          <div style={{ width: 7, height: 7, borderRadius: '50%', background: product.shadeHex, border: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }} />
                        )}
                        <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{product.shade}</span>
                      </div>
                    )}
                    <span style={{ fontSize: 11, color: 'var(--ink-faint)', fontWeight: 500 }}>
                      {product.price}
                    </span>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                      {!inBag && (
                        <button
                          onClick={() => addToBag(product.id)}
                          style={{
                            fontFamily: 'var(--font-inter-tight, sans-serif)',
                            fontSize: 10,
                            fontWeight: 600,
                            padding: '4px 10px',
                            borderRadius: 999,
                            border: '1px solid var(--accent)',
                            background: 'transparent',
                            color: 'var(--accent)',
                            cursor: 'pointer',
                          }}
                        >
                          + Add to bag
                        </button>
                      )}
                      <button
                        onClick={() => removeFromCart(product.id)}
                        style={{
                          fontFamily: 'var(--font-inter-tight, sans-serif)',
                          fontSize: 10,
                          fontWeight: 500,
                          padding: '4px 10px',
                          borderRadius: 999,
                          border: '1px solid var(--line)',
                          background: 'transparent',
                          color: 'var(--ink-faint)',
                          cursor: 'pointer',
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
