
import { RefObject, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

export default function useScrollAnimation(ref: RefObject<HTMLElement>) {
  const controls = useAnimation()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    function onScroll() {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        controls.start('visible')
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref, controls])
  return controls
}