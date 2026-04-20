'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'

export default function RestartFlowButton() {
  const pathname = usePathname()
  const router = useRouter()
  const { resetOnboarding } = useApp()

  if (pathname.startsWith('/friend')) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        zIndex: 200,
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '10px 16px 0',
        pointerEvents: 'none',
      }}
    >
      <button
        onClick={() => {
          resetOnboarding()
          router.push('/')
        }}
        style={{
          pointerEvents: 'auto',
          background: '#EDE5DC',
          border: '1px solid #DDD0C5',
          color: '#D4C5BA',
          borderRadius: 999,
          padding: '5px 12px',
          fontSize: 10,
          fontFamily: 'var(--font-inter-tight, Inter Tight, system-ui)',
          letterSpacing: '0.5px',
          cursor: 'pointer',
          lineHeight: 1.4,
          userSelect: 'none',
        }}
      >
        restart guided flow
      </button>
    </div>
  )
}
