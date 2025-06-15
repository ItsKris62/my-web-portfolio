import { ReactNode, useRef, useEffect } from 'react'
import styles from './ParallaxContainer.module.scss'

interface ParallaxProps {
  speed?: number
  children: ReactNode
}

export default function ParallaxContainer({ speed = 0.3, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handle = () => {
      const y = window.pageYOffset
      el.style.transform = `translateY(${y * speed}px)`
    }
    window.addEventListener('scroll', handle)
    return () => window.removeEventListener('scroll', handle)
  }, [speed])

  return (
    <div ref={ref} className={styles.container}>
      {children}
    </div>
  )
}