import { RefObject, useEffect } from 'react'
export default function useMouseTrail(canvasRef: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const particles: any[] = []
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    function render() {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life--;
        ctx.fillStyle = `rgba(99,102,241,${p.life/30})`
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,2*Math.PI); ctx.fill()
      })
      for (let i = particles.length-1; i>=0; i--) if (particles[i].life<=0) particles.splice(i,1)
      requestAnimationFrame(render)
    }
    render()

    function onMove(e: MouseEvent) {
      particles.push({ x: e.clientX, y: e.clientY, vx:(Math.random()-0.5), vy:(Math.random()-0.5), size:5, life:30 })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [canvasRef])
}