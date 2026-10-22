'use client'

import Image from 'next/image'
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

interface AccessBadgeProps {
  className?: string
  priority?: boolean
}

const RESTING_POSE = {
  x: 1.4,
  y: -3.2,
  z: -4.2,
  lightX: 31,
  lightY: 20,
  strapX: 0,
  strapSkew: 0,
}

export function AccessBadge({ className = '', priority = true }: AccessBadgeProps) {
  const sceneRef = useRef<HTMLElement>(null)
  const swingRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const activeRef = useRef(false)
  const lanyardGrabRef = useRef(false)
  const currentRef = useRef({ ...RESTING_POSE })
  const targetRef = useRef({ ...RESTING_POSE })
  const [isSettling, setIsSettling] = useState(true)
  const [isTouchActive, setIsTouchActive] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => {
      setReducedMotion(media.matches)
      if (media.matches) setIsSettling(false)
    }

    syncPreference()
    media.addEventListener('change', syncPreference)
    return () => media.removeEventListener('change', syncPreference)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const timer = window.setTimeout(() => setIsSettling(false), 1450)
    return () => window.clearTimeout(timer)
  }, [reducedMotion])

  const updatePose = useCallback(() => {
    if (reducedMotion || !sceneRef.current || !swingRef.current) {
      activeRef.current = false
      return
    }

    const current = currentRef.current
    const target = targetRef.current
    const ease = 0.105

    current.x += (target.x - current.x) * ease
    current.y += (target.y - current.y) * ease
    current.z += (target.z - current.z) * ease
    current.lightX += (target.lightX - current.lightX) * ease
    current.lightY += (target.lightY - current.lightY) * ease
    current.strapX += (target.strapX - current.strapX) * ease
    current.strapSkew += (target.strapSkew - current.strapSkew) * ease

    swingRef.current.style.setProperty('--badge-rx', `${current.x.toFixed(2)}deg`)
    swingRef.current.style.setProperty('--badge-ry', `${current.y.toFixed(2)}deg`)
    swingRef.current.style.setProperty('--badge-rz', `${current.z.toFixed(2)}deg`)
    swingRef.current.style.setProperty('--light-x', `${current.lightX.toFixed(1)}%`)
    swingRef.current.style.setProperty('--light-y', `${current.lightY.toFixed(1)}%`)
    sceneRef.current.style.setProperty('--strap-x', `${current.strapX.toFixed(2)}px`)
    sceneRef.current.style.setProperty('--strap-skew', `${current.strapSkew.toFixed(2)}deg`)

    const remaining = Math.max(
      Math.abs(target.x - current.x),
      Math.abs(target.y - current.y),
      Math.abs(target.z - current.z),
      Math.abs(target.lightX - current.lightX) / 10,
      Math.abs(target.lightY - current.lightY) / 10,
      Math.abs(target.strapX - current.strapX),
      Math.abs(target.strapSkew - current.strapSkew),
    )

    if (remaining > 0.012) {
      frameRef.current = window.requestAnimationFrame(updatePose)
    } else {
      currentRef.current = { ...target }
      activeRef.current = false
      frameRef.current = null
    }
  }, [reducedMotion])

  const startAnimation = useCallback(() => {
    if (activeRef.current || reducedMotion) return
    activeRef.current = true
    frameRef.current = window.requestAnimationFrame(updatePose)
  }, [reducedMotion, updatePose])

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (reducedMotion) return

    const rect = event.currentTarget.getBoundingClientRect()
    const normalizedX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1))
    const normalizedY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1))
    const isLanyardTarget = event.target instanceof Element
      && event.target.closest('.badge-lanyard-loop') !== null

    if (event.pointerType === 'touch' || event.pointerType === 'pen') {
      if (!lanyardGrabRef.current) return

      targetRef.current = {
        x: RESTING_POSE.x - normalizedY * 1.8,
        y: RESTING_POSE.y + normalizedX * 3.4,
        z: RESTING_POSE.z + normalizedX * 1.8,
        lightX: 31 + normalizedX * 13,
        lightY: 20 + normalizedY * 9,
        strapX: normalizedX * 10,
        strapSkew: normalizedX * 3.2,
      }
      startAnimation()
      return
    }

    setIsSettling(false)
    const strapInfluence = isLanyardTarget ? 1 : 0.32

    targetRef.current = {
      x: RESTING_POSE.x - normalizedY * 2.6,
      y: RESTING_POSE.y + normalizedX * 4.2,
      z: RESTING_POSE.z + normalizedX * 1.35,
      lightX: 31 + normalizedX * 18,
      lightY: 20 + normalizedY * 12,
      strapX: normalizedX * 8 * strapInfluence,
      strapSkew: normalizedX * 2.7 * strapInfluence,
    }
    startAnimation()
  }, [reducedMotion, startAnimation])

  const returnToRest = useCallback(() => {
    lanyardGrabRef.current = false
    setIsTouchActive(false)
    targetRef.current = { ...RESTING_POSE }
    startAnimation()
  }, [startAnimation])

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (reducedMotion) return

    const isLanyardTarget = event.target instanceof Element
      && event.target.closest('.badge-lanyard-loop') !== null

    if (event.pointerType === 'mouse') {
      if (isLanyardTarget) setIsSettling(false)
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const normalizedX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1))

    lanyardGrabRef.current = isLanyardTarget
    setIsSettling(false)
    setIsTouchActive(true)
    targetRef.current = isLanyardTarget
      ? {
          x: 1.9,
          y: RESTING_POSE.y + normalizedX * 3.4,
          z: RESTING_POSE.z + normalizedX * 1.8,
          lightX: 31 + normalizedX * 13,
          lightY: 24,
          strapX: normalizedX * 10,
          strapSkew: normalizedX * 3.2,
        }
      : {
          x: 2.4,
          y: -1.8,
          z: -2.9,
          lightX: 40,
          lightY: 28,
          strapX: 1.8,
          strapSkew: 0.6,
        }
    startAnimation()
  }, [reducedMotion, startAnimation])

  useEffect(() => () => {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
  }, [])

  const restingVariables = {
    '--badge-rx': `${RESTING_POSE.x}deg`,
    '--badge-ry': `${RESTING_POSE.y}deg`,
    '--badge-rz': `${RESTING_POSE.z}deg`,
    '--light-x': `${RESTING_POSE.lightX}%`,
    '--light-y': `${RESTING_POSE.lightY}%`,
  } as CSSProperties

  const restingStrapVariables = {
    '--strap-x': `${RESTING_POSE.strapX}px`,
    '--strap-skew': `${RESTING_POSE.strapSkew}deg`,
  } as CSSProperties

  return (
    <figure
      ref={sceneRef}
      className={`access-badge-scene ${className}`}
      style={restingStrapVariables}
      onPointerMove={handlePointerMove}
      onPointerLeave={returnToRest}
      onPointerDown={handlePointerDown}
      onPointerUp={returnToRest}
      onPointerCancel={returnToRest}
      aria-label="Christopher Rateng studio profile badge"
    >
      <svg className="badge-lanyard-loop" viewBox="0 0 252 164" aria-hidden="true">
        <defs>
          <pattern id="hero-lanyard-weave" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(34)">
            <rect width="7" height="7" fill="#24272b" />
            <path d="M 0 1.5 H 7 M 0 5 H 7" stroke="#4a4e53" strokeWidth="0.75" opacity="0.58" />
            <path d="M 2.5 0 V 7" stroke="#101215" strokeWidth="1" opacity="0.7" />
          </pattern>
          <linearGradient id="lanyard-edge-light" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0b0c0f" />
            <stop offset="0.18" stopColor="#44484e" />
            <stop offset="0.52" stopColor="#25282d" />
            <stop offset="0.82" stopColor="#53575d" />
            <stop offset="1" stopColor="#0c0e10" />
          </linearGradient>
          <filter id="lanyard-soft-shadow" x="-25%" y="-15%" width="150%" height="150%">
            <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#101217" floodOpacity="0.24" />
          </filter>
        </defs>
        <g className="lanyard-desktop-run" filter="url(#lanyard-soft-shadow)" fill="none" strokeLinecap="butt">
          <path d="M -72 -560 C -54 -350, -10 -94, 20 5 C 31 53, 57 96, 114 140" stroke="url(#lanyard-edge-light)" strokeWidth="32" />
          <path d="M -72 -560 C -54 -350, -10 -94, 20 5 C 31 53, 57 96, 114 140" stroke="url(#hero-lanyard-weave)" strokeWidth="27" />
          <path d="M 340 -560 C 314 -348, 275 -88, 232 5 C 222 54, 196 96, 138 140" stroke="url(#lanyard-edge-light)" strokeWidth="32" />
          <path d="M 340 -560 C 314 -348, 275 -88, 232 5 C 222 54, 196 96, 138 140" stroke="url(#hero-lanyard-weave)" strokeWidth="27" />
          <path d="M -63 -560 C -45 -350, -1 -94, 29 3 C 40 49, 64 89, 115 132" stroke="rgba(255,255,255,.15)" strokeWidth="1.1" />
          <path d="M 331 -560 C 305 -348, 266 -88, 223 3 C 213 50, 189 90, 137 132" stroke="rgba(255,255,255,.13)" strokeWidth="1.1" />
        </g>
        <g className="lanyard-mobile-run" filter="url(#lanyard-soft-shadow)" fill="none" strokeLinecap="butt">
          <path d="M -280 -560 C -282 -350, -280 -120, -278 -18 C -228 50, 4 108, 114 140" stroke="url(#lanyard-edge-light)" strokeWidth="32" />
          <path d="M -280 -560 C -282 -350, -280 -120, -278 -18 C -228 50, 4 108, 114 140" stroke="url(#hero-lanyard-weave)" strokeWidth="27" />
          <path d="M 532 -560 C 534 -350, 532 -120, 530 -18 C 480 50, 248 108, 138 140" stroke="url(#lanyard-edge-light)" strokeWidth="32" />
          <path d="M 532 -560 C 534 -350, 532 -120, 530 -18 C 480 50, 248 108, 138 140" stroke="url(#hero-lanyard-weave)" strokeWidth="27" />
          <path d="M -271 -560 C -273 -350, -271 -120, -269 -18 C -219 45, 9 101, 115 132" stroke="rgba(255,255,255,.15)" strokeWidth="1.1" />
          <path d="M 523 -560 C 525 -350, 523 -120, 521 -18 C 471 45, 243 101, 137 132" stroke="rgba(255,255,255,.13)" strokeWidth="1.1" />
        </g>
        <text x="43" y="65" transform="rotate(50 43 65)" className="lanyard-woven-mark lanyard-desktop-run">CRATENG</text>
        <text x="205" y="62" transform="rotate(-50 205 62)" className="lanyard-woven-mark lanyard-desktop-run">CRATENG</text>
        <path d="M 106 132 Q 126 151 146 132 L 140 151 Q 126 160 112 151 Z" fill="url(#lanyard-edge-light)" stroke="#111318" strokeWidth="1.5" />
        <path d="M 110 134 Q 126 148 142 134 L 137 148 Q 126 154 115 148 Z" fill="url(#hero-lanyard-weave)" />
        <path d="M 113 142 Q 126 152 139 142" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="0.8" strokeDasharray="2 2" />
      </svg>

      <div
        ref={swingRef}
        className={`badge-swing${isSettling ? ' is-settling' : ''}${isTouchActive ? ' is-touch-active' : ''}`}
        style={restingVariables}
      >
        <svg className="badge-hardware" viewBox="0 0 76 112" aria-hidden="true">
          <defs>
            <linearGradient id="badge-gunmetal" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#111318" />
              <stop offset="0.18" stopColor="#3b4149" />
              <stop offset="0.42" stopColor="#8a949f" />
              <stop offset="0.57" stopColor="#4b525b" />
              <stop offset="0.82" stopColor="#252a31" />
              <stop offset="1" stopColor="#0d0f12" />
            </linearGradient>
            <linearGradient id="badge-steel-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#aab3bc" />
              <stop offset="0.28" stopColor="#4d555e" />
              <stop offset="0.7" stopColor="#20242a" />
              <stop offset="1" stopColor="#0f1115" />
            </linearGradient>
            <filter id="hardware-shadow" x="-40%" y="-20%" width="180%" height="170%">
              <feDropShadow dx="2" dy="5" stdDeviation="3.5" floodColor="#0b0d10" floodOpacity="0.42" />
            </filter>
          </defs>
          <g filter="url(#hardware-shadow)">
            <rect x="15" y="2" width="46" height="18" rx="8" fill="url(#badge-gunmetal)" stroke="#0c0e11" strokeWidth="1.5" />
            <rect x="23" y="7" width="30" height="7" rx="3.5" fill="#15181d" stroke="#747e89" strokeWidth="1" />
            <path d="M 31 20 H 45 L 48 31 Q 38 38 28 31 Z" fill="url(#badge-steel-face)" stroke="#111318" strokeWidth="1.2" />
            <rect x="26" y="29" width="24" height="18" rx="7" fill="url(#badge-gunmetal)" stroke="#101216" strokeWidth="1.2" />
            <path d="M 28 35 H 48 M 28 41 H 48" stroke="#9ca5af" strokeWidth="0.8" opacity="0.48" />
            <path
              d="M 36 46 C 23 48, 17 59, 18 73 C 19 88, 29 101, 42 103 C 53 104, 61 95, 61 83 C 61 70, 54 59, 45 52 L 40 61 C 47 66, 51 73, 50 81 C 50 89, 45 94, 39 92 C 31 90, 27 82, 28 72 C 28 64, 32 58, 39 55 Z"
              fill="url(#badge-gunmetal)"
              stroke="#0d0f12"
              strokeWidth="1.6"
            />
            <path d="M 46 53 L 58 59 L 55 70 L 43 62 Z" fill="url(#badge-steel-face)" stroke="#111318" strokeWidth="1" />
            <path d="M 50 61 C 55 69, 57 80, 53 89" fill="none" stroke="#aab2bb" strokeWidth="1.15" opacity="0.62" />
            <circle cx="43.5" cy="53.5" r="3.3" fill="#a7b0b9" stroke="#171a1e" strokeWidth="1.2" />
            <path d="M 32 96 C 38 101, 45 101, 50 96" fill="none" stroke="#bdc4ca" strokeWidth="1.1" opacity="0.5" />
          </g>
        </svg>

        <div className="badge-holder-shell">
          <div className="badge-holder-crown" aria-hidden="true" />
          <div className="badge-holder-slot" aria-hidden="true"><span /></div>

          <article className="badge-card-insert">
            <div className="badge-security-field" aria-hidden="true" />

            <header className="badge-card-header">
              <div>
                <span className="badge-brand-name">CRATENG</span>
                <span className="badge-brand-subline">Hybrid Engineering Studio</span>
              </div>
              <span className="badge-profile-label">Studio profile</span>
            </header>

            <div className="badge-portrait-well" style={{ position: 'relative' }}>
              <Image
                src="/portraits/Christopher_rateng-Passport-Photo.jpg"
                alt="Christopher M. Rateng"
                fill
                sizes="(max-width: 480px) 224px, (max-width: 1023px) 252px, 280px"
                className="badge-portrait-photo"
                priority={priority}
              />
              <span className="badge-registration-corner top-left" aria-hidden="true" />
              <span className="badge-registration-corner top-right" aria-hidden="true" />
              <span className="badge-registration-corner bottom-left" aria-hidden="true" />
              <span className="badge-registration-corner bottom-right" aria-hidden="true" />
            </div>

            <section className="badge-identity">
              <span className="badge-name-kicker">Independent consultant · Nairobi</span>
              <h2>Christopher M. Rateng</h2>
              <p className="badge-disciplines">Systems · Security · Automation</p>
              <p className="badge-role">ICT, infrastructure &amp; software engineering</p>
            </section>

            <footer className="badge-card-footer">
              <div className="badge-availability">
                <span className="badge-status-dot" aria-hidden="true" />
                <div>
                  <strong>Available for selected work</strong>
                  <span>East Africa · Worldwide remote</span>
                </div>
              </div>
              <a className="badge-qr-link" href="https://www.crateng.co.ke/" aria-label="Open crateng.co.ke">
                <Image src="/branding/portfolio-qr.svg" alt="" width={48} height={48} unoptimized />
                <span>crateng.co.ke</span>
              </a>
            </footer>
          </article>

          <div className="badge-holder-reflection" aria-hidden="true" />
          <div className="badge-holder-edge" aria-hidden="true" />
        </div>
      </div>
    </figure>
  )
}
