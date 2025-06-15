import { RefObject, useEffect } from 'react'
export default function useIntersectionObserver(
  ref: RefObject<Element>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(callback, options)
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, callback, options])
}