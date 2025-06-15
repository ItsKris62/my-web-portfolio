import { useEffect } from 'react'
import { useRouter } from 'next/router'
export default function ScrollToTop() {
  const { events } = useRouter()
  useEffect(() => {
    events.on('routeChangeComplete', () => window.scrollTo(0,0))
    return () => events.off('routeChangeComplete', () => {})
  }, [events])
  return null
}