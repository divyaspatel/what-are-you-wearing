'use client'

import React from 'react'
import { BottleType } from '@/lib/data'

interface ProductBottleProps {
  type: BottleType
  color: string
  shade?: string | null
  uid: string
  size?: number
}

export default function ProductBottle({
  type,
  color,
  shade,
  uid,
  size = 58,
}: ProductBottleProps) {
  const s = shade || '#C8A090'
  const gradId = `hl-${uid}`
  const gradId2 = `sh-${uid}`
  const hl = `url(#${gradId})`
  const sh = `url(#${gradId2})`
  const h = Math.round(size * 80 / 60)

  const defs = (
    <defs>
      <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="white" stopOpacity="0.38" />
        <stop offset="55%"  stopColor="white" stopOpacity="0"    />
      </linearGradient>
      <linearGradient id={gradId2} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="rgba(0,0,0,0)"    />
        <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
      </linearGradient>
    </defs>
  )

  let inner: React.ReactNode

  switch (type) {
    case 'lipstick':
      inner = (
        <>
          {defs}
          {/* case body */}
          <rect x="21" y="33" width="18" height="37" rx="3" fill={color} />
          <rect x="21" y="33" width="18" height="37" rx="3" fill={sh} />
          {/* bullet sleeve */}
          <rect x="23" y="15" width="14" height="20" rx="2" fill={color} fillOpacity="0.82" />
          {/* bullet tip */}
          <polygon points="23,15 37,15 33,7" fill={s} />
          {/* cap seam */}
          <rect x="20" y="30" width="20" height="5" rx="1" fill="rgba(0,0,0,0.14)" />
          {/* highlights */}
          <rect x="21" y="33" width="18" height="37" rx="3" fill={hl} />
          <rect x="23" y="15" width="14" height="20" rx="2" fill={hl} />
        </>
      )
      break

    case 'tall':
      inner = (
        <>
          {defs}
          {/* cap */}
          <rect x="22" y="7" width="16" height="18" rx="4" fill="rgba(0,0,0,0.55)" />
          <rect x="22" y="7" width="16" height="18" rx="4" fill={hl} />
          {/* body */}
          <rect x="17" y="23" width="26" height="50" rx="6" fill={color} />
          <rect x="17" y="23" width="26" height="50" rx="6" fill={sh} />
          {/* liquid window */}
          <rect x="21" y="47" width="18" height="22" rx="4" fill={s} fillOpacity="0.55" />
          {/* body highlight */}
          <rect x="17" y="23" width="26" height="50" rx="6" fill={hl} />
        </>
      )
      break

    case 'compact':
      inner = (
        <>
          {defs}
          {/* top lid */}
          <rect x="7" y="14" width="46" height="24" rx="6" fill={color} fillOpacity="0.88" />
          {/* mirror */}
          <rect x="11" y="17" width="38" height="18" rx="3" fill="#C8D8E8" fillOpacity="0.45" />
          {/* bottom pan */}
          <rect x="7" y="42" width="46" height="24" rx="6" fill={color} />
          <rect x="7" y="42" width="46" height="24" rx="6" fill={sh} />
          {/* product */}
          <rect x="11" y="45" width="38" height="18" rx="3" fill={s} fillOpacity="0.72" />
          {/* highlights */}
          <rect x="7" y="14" width="46" height="24" rx="6" fill={hl} />
          <rect x="7" y="42" width="46" height="24" rx="6" fill={hl} />
          {/* hinge */}
          <rect x="51" y="36" width="5" height="8" rx="2" fill="rgba(0,0,0,0.18)" />
        </>
      )
      break

    case 'dropper':
      inner = (
        <>
          {defs}
          {/* rubber bulb */}
          <ellipse cx="30" cy="15" rx="10" ry="11" fill="#9E8272" />
          <ellipse cx="26" cy="11" rx="3.5" ry="4" fill="rgba(255,255,255,0.22)" />
          {/* neck */}
          <rect x="27" y="24" width="6" height="9" fill="#B89880" />
          {/* glass body */}
          <rect x="19" y="31" width="22" height="42" rx="9" fill={color} fillOpacity="0.78" />
          {/* liquid */}
          <rect x="19" y="51" width="22" height="22" rx="9" fill={s} fillOpacity="0.62" />
          {/* glass highlight */}
          <rect x="19" y="31" width="22" height="42" rx="9" fill={hl} />
        </>
      )
      break

    case 'wand':
      inner = (
        <>
          {defs}
          {/* body */}
          <rect x="23" y="7" width="14" height="52" rx="6" fill={color} />
          <rect x="23" y="7" width="14" height="52" rx="6" fill={sh} />
          {/* cap line */}
          <rect x="23" y="24" width="14" height="2.5" fill="rgba(0,0,0,0.14)" />
          {/* neck */}
          <rect x="27" y="57" width="6" height="9" rx="2" fill={color} fillOpacity="0.65" />
          {/* applicator tip */}
          <ellipse cx="30" cy="70" rx="5" ry="4" fill={s} />
          {/* highlight */}
          <rect x="23" y="7" width="14" height="52" rx="6" fill={hl} />
        </>
      )
      break

    case 'jar':
      inner = (
        <>
          {defs}
          {/* lid */}
          <rect x="8" y="14" width="44" height="16" rx="6" fill={color} fillOpacity="0.85" />
          <rect x="8" y="14" width="44" height="16" rx="6" fill={hl} />
          {/* body */}
          <rect x="8" y="28" width="44" height="36" rx="5" fill={color} />
          <rect x="8" y="28" width="44" height="36" rx="5" fill={sh} />
          {/* product surface */}
          <ellipse cx="30" cy="28" rx="19" ry="8" fill={s} fillOpacity="0.68" />
          {/* body highlight */}
          <rect x="8" y="28" width="44" height="36" rx="5" fill={hl} />
          {/* base */}
          <rect x="8" y="60" width="44" height="6" rx="5" fill="rgba(0,0,0,0.08)" />
        </>
      )
      break

    case 'mascara':
      inner = (
        <>
          {defs}
          {/* body tube */}
          <rect x="24" y="10" width="12" height="52" rx="5.5" fill={color} />
          <rect x="24" y="10" width="12" height="52" rx="5.5" fill={sh} />
          {/* cap (darker) */}
          <rect x="23" y="10" width="14" height="22" rx="5.5" fill="rgba(0,0,0,0.32)" />
          <rect x="23" y="10" width="14" height="22" rx="5.5" fill={hl} />
          {/* wand neck */}
          <rect x="27" y="60" width="6" height="8" rx="2" fill={color} fillOpacity="0.55" />
          {/* bristles */}
          {[0, 1, 2, 3, 4].map(i => (
            <rect key={i} x={24 + i * 3} y="66" width="1.8" height="6" rx="1" fill="#1A1A1A" />
          ))}
          {/* tube highlight */}
          <rect x="24" y="10" width="12" height="52" rx="5.5" fill={hl} />
        </>
      )
      break

    case 'click-pen':
      inner = (
        <>
          {defs}
          {/* body */}
          <rect x="25" y="7" width="10" height="54" rx="4" fill={color} />
          <rect x="25" y="7" width="10" height="54" rx="4" fill={sh} />
          {/* click cap */}
          <rect x="26" y="5" width="8" height="7" rx="3.5" fill="rgba(0,0,0,0.22)" />
          {/* label band */}
          <rect x="25" y="30" width="10" height="2" fill="rgba(0,0,0,0.14)" />
          {/* pointed tip */}
          <polygon points="25,59 35,59 30,72" fill={color} fillOpacity="0.75" />
          {/* highlights */}
          <rect x="25" y="7" width="10" height="54" rx="4" fill={hl} />
        </>
      )
      break

    case 'spray':
      inner = (
        <>
          {defs}
          {/* body */}
          <rect x="11" y="30" width="38" height="44" rx="7" fill={color} />
          <rect x="11" y="30" width="38" height="44" rx="7" fill={sh} />
          {/* shoulder trapezoid */}
          <polygon points="11,30 49,30 45,16 15,16" fill={color} fillOpacity="0.88" />
          {/* pump body */}
          <rect x="27" y="6" width="11" height="22" rx="4" fill={color} fillOpacity="0.68" />
          {/* nozzle */}
          <rect x="15" y="8" width="14" height="6" rx="3" fill="rgba(0,0,0,0.28)" />
          {/* label area */}
          <rect x="14" y="38" width="32" height="26" rx="3" fill="rgba(255,255,255,0.18)" />
          {/* highlights */}
          <rect x="11" y="30" width="38" height="44" rx="7" fill={hl} />
        </>
      )
      break

    case 'squeeze-tube':
      inner = (
        <>
          {defs}
          {/* flip cap */}
          <rect x="23" y="5" width="14" height="13" rx="5" fill="rgba(0,0,0,0.32)" />
          {/* body */}
          <rect x="17" y="16" width="26" height="46" rx="5" fill={color} />
          <rect x="17" y="16" width="26" height="46" rx="5" fill={sh} />
          {/* crimp / tapered bottom */}
          <polygon points="17,58 43,58 41,72 19,72" fill={color} fillOpacity="0.65" />
          <rect x="21" y="70" width="18" height="4" rx="2" fill="rgba(0,0,0,0.2)" />
          {/* label */}
          <rect x="19" y="25" width="22" height="26" rx="3" fill="rgba(255,255,255,0.28)" />
          {/* highlights */}
          <rect x="17" y="16" width="26" height="46" rx="5" fill={hl} />
        </>
      )
      break

    case 'balm-stick':
      inner = (
        <>
          {defs}
          {/* twist base */}
          <rect x="20" y="56" width="20" height="18" rx="4" fill={color} fillOpacity="0.68" />
          {/* body */}
          <rect x="20" y="26" width="20" height="32" rx="3" fill={color} />
          <rect x="20" y="26" width="20" height="32" rx="3" fill={sh} />
          {/* product dome */}
          <ellipse cx="30" cy="26" rx="10" ry="6" fill={s} />
          <ellipse cx="26" cy="23" rx="4" ry="3" fill="rgba(255,255,255,0.2)" />
          {/* twist ridges */}
          <rect x="20" y="62" width="20" height="2" fill="rgba(0,0,0,0.12)" />
          <rect x="20" y="58" width="20" height="2" fill="rgba(0,0,0,0.08)" />
          {/* highlights */}
          <rect x="20" y="26" width="20" height="32" rx="3" fill={hl} />
          <rect x="20" y="56" width="20" height="18" rx="4" fill={hl} />
        </>
      )
      break

    default:
      inner = (
        <>
          {defs}
          <rect x="17" y="18" width="26" height="52" rx="6" fill={color} />
          <rect x="17" y="18" width="26" height="52" rx="6" fill={hl} />
        </>
      )
  }

  return (
    <div
      style={{
        width: 92,
        height: 92,
        background: 'var(--card-bg)',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <svg
        viewBox="0 0 60 80"
        width={size}
        height={h}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {inner}
      </svg>
      {/* cast shadow */}
      <div
        style={{
          position: 'absolute',
          bottom: 5,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '52%',
          height: 7,
          background: 'rgba(43,31,28,0.11)',
          borderRadius: '50%',
          filter: 'blur(5px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
