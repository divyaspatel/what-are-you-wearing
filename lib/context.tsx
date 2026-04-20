'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Rating, MY_RATINGS, SkinType } from './data'

interface AppContextType {
  ratings: Record<string, Rating>
  setRating: (id: string, rating: Rating | null) => void
  notes: Record<string, string>
  setNote: (id: string, note: string) => void
  cartItems: Record<string, boolean>
  addToCart: (id: string) => void
  removeFromCart: (id: string) => void
  isInCart: (id: string) => boolean
  isInBag: (id: string) => boolean
  addToBag: (id: string) => void
  skinType: SkinType | null
  setSkinType: (t: SkinType | null) => void
  concerns: string[]
  toggleConcern: (c: string) => void
  onboardingStep: number  // 0–6, -1 = done
  advanceOnboarding: () => void
  resetOnboarding: () => void
}

const AppContext = createContext<AppContextType>({
  ratings: { ...MY_RATINGS },
  setRating: () => {},
  notes: {},
  setNote: () => {},
  cartItems: {},
  addToCart: () => {},
  removeFromCart: () => {},
  isInCart: () => false,
  isInBag: () => false,
  addToBag: () => {},
  skinType: null,
  setSkinType: () => {},
  concerns: [],
  toggleConcern: () => {},
  onboardingStep: 0,
  advanceOnboarding: () => {},
  resetOnboarding: () => {},
})

export function AppProvider({ children }: { children: ReactNode }) {
  const [ratings, setRatings]           = useState<Record<string, Rating>>({ ...MY_RATINGS })
  const [notes, setNotes]               = useState<Record<string, string>>({})
  const [cartItems, setCartItems]       = useState<Record<string, boolean>>({})
  const [skinType, setSkinTypeState]    = useState<SkinType | null>(null)
  const [concerns, setConcerns]         = useState<string[]>([])
  const [onboardingStep, setOnboarding] = useState(0)

  const setRating = (id: string, rating: Rating | null) =>
    setRatings(prev => {
      const next = { ...prev }
      if (rating === null) delete next[id]
      else next[id] = rating
      return next
    })

  const setNote = (id: string, note: string) =>
    setNotes(prev => {
      const next = { ...prev }
      if (!note.trim()) delete next[id]
      else next[id] = note.trim()
      return next
    })

  const addToCart      = (id: string) => setCartItems(prev => ({ ...prev, [id]: true }))
  const removeFromCart = (id: string) =>
    setCartItems(prev => { const n = { ...prev }; delete n[id]; return n })

  const isInCart = (id: string) => !!cartItems[id]
  const isInBag  = (id: string) => !!ratings[id]
  const addToBag = (id: string) => { if (!ratings[id]) setRating(id, 'fine') }

  const setSkinType = (t: SkinType | null) => setSkinTypeState(t)

  const toggleConcern = (c: string) =>
    setConcerns(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    )

  const advanceOnboarding = () =>
    setOnboarding(prev => (prev >= 6 ? -1 : prev + 1))

  const resetOnboarding = () => setOnboarding(0)

  return (
    <AppContext.Provider value={{
      ratings, setRating,
      notes, setNote,
      cartItems, addToCart, removeFromCart, isInCart, isInBag, addToBag,
      skinType, setSkinType,
      concerns, toggleConcern,
      onboardingStep, advanceOnboarding, resetOnboarding,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
