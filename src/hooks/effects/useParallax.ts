import { RefObject, useEffect } from 'react'
export default function useParallax(ref: RefObject<HTMLElement>, speed = 0.3) {
  useEffect(() => {
    const element = ref.current
    if (!element) return
    function handleScroll() {
      const offset = window.pageYOffset
      element.style.backgroundPositionY = `${offset * speed}px`
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref, speed])
}