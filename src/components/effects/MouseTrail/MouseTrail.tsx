import { useEffect, useRef } from 'react'
import useMouseTrail from '@/hooks/useMouseTrail'

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useMouseTrail(canvasRef)
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
    />
  )
}