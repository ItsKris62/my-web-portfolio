'use client'

import Image from 'next/image'
import { Contact } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'

export function AccessBadge() {
  const ref = useRef<HTMLDivElement>(null)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), { stiffness: 180, damping: 22 })

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  function resetTilt() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className="access-badge-wrap"
      initial={{ rotate: -8, y: -25, transformOrigin: 'top center' }}
      animate={{ rotate: [-8, 6, -3, 1.5, 0], y: [-25, 0] }}
      transition={{ duration: 2.2, ease: 'easeOut' }}
      style={{ rotateX, rotateY }}
      onPointerMove={handleMove}
      onPointerLeave={resetTilt}
    >
      <div className="badge-punch" aria-hidden="true"><span /></div>
      <div className="access-badge">
        <div className="badge-topline">
          <span>BIOMETRIC // 07</span>
          <span className="badge-nfc"><Contact size={18} aria-hidden="true" /> ((N))</span>
        </div>
        <div className="badge-portrait">
          <Image src="/portraits/Christopher_rateng-Passport-Photo.jpg" alt="Christopher M. Rateng" fill sizes="320px" priority />
          <div className="badge-sheen" aria-hidden="true" />
          <span className="scan-corner scan-tl" /><span className="scan-corner scan-tr" /><span className="scan-corner scan-bl" /><span className="scan-corner scan-br" />
          <span className="scan-line" aria-hidden="true" />
        </div>
        <div className="badge-barcode" aria-label="Security code SEC-CR-2026-NBO">
          <div className="barcode-lines" aria-hidden="true" />
          <span>SEC-CR-2026-NBO</span>
        </div>
        <div className="badge-status"><span className="badge-led" /> AVAILABLE FOR WORK <span className="badge-status-rule" /></div>
        <div className="badge-bottomline">
          <div className="emv-chip" aria-label="EMV smart card chip"><span /><span /><span /><span /><span /><span /></div>
          <div className="badge-coords">01°17&apos;S / 36°49&apos;E<br /><strong>NBO // KE</strong></div>
        </div>
        <div className="badge-footer">NAME: CHRISTOPHER M. RATENG<br />ROLE: SYSTEMS &amp; SECURITY</div>
      </div>
    </motion.div>
  )
}
