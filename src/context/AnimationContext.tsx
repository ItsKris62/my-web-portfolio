import { createContext, ReactNode, useContext } from 'react'
import { AnimationControls, useAnimationControls } from 'framer-motion'

const AnimationContext = createContext<AnimationControls | undefined>(undefined)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const controls = useAnimationControls()
  return <AnimationContext.Provider value={controls}>{children}</AnimationContext.Provider>
}

export function useAnimationContext() {
  const controls = useContext(AnimationContext)
  if (!controls) throw new Error('useAnimationContext must be used within AnimationProvider')
  return controls
}