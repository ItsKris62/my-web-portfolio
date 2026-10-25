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
  const [isSettling, setIsSettling] = useState(false)
  const [isTouchActive, setIsTouchActive] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  // Entrance flag: true while badge performs initial drop+swing animation
  const [showEntrance, setShowEntrance] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => {
      setReducedMotion(media.matches)
      if (media.matches) {
        setIsSettling(false)
        setShowEntrance(false)
      }
    }

    syncPreference()
    media.addEventListener('change', syncPreference)
    return () => media.removeEventListener('change', syncPreference)
  }, [])

  // Coordinate entrance lifecycle via animationend (single continuous 2.2s motion to resting pose)
  useEffect(() => {
    if (reducedMotion) return
    const el = swingRef.current
    if (!el) return

    const finishEntrance = () => {
      setShowEntrance(false)
      setIsSettling(false)
    }

    const fallbackTimer = window.setTimeout(finishEntrance, 2300)

    const handleAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName === 'badge-entrance') {
        window.clearTimeout(fallbackTimer)
        finishEntrance()
      } else if (e.animationName === 'badge-settle') {
        setIsSettling(false)
      }
    }

    el.addEventListener('animationend', handleAnimationEnd)
    return () => {
      window.clearTimeout(fallbackTimer)
      el.removeEventListener('animationend', handleAnimationEnd)
    }
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
      className={`access-badge-scene${showEntrance ? ' entrance' : ''}${className ? ` ${className}` : ''}`}
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
          <pattern id="hero-lanyard-weave" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(34)">
            <rect width="8" height="8" fill="#22252a" />
            <path d="M 0 1.25 H 8 M 0 4.75 H 8" stroke="#555a61" strokeWidth="0.72" opacity="0.5" />
            <path d="M 2.25 0 V 8 M 6.25 0 V 8" stroke="#0b0d10" strokeWidth="0.72" opacity="0.72" />
            <path d="M 0 6.5 H 8" stroke="#30343a" strokeWidth="0.45" opacity="0.8" />
          </pattern>
          <linearGradient id="lanyard-edge-light" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0b0c0f" />
            <stop offset="0.18" stopColor="#44484e" />
            <stop offset="0.52" stopColor="#25282d" />
            <stop offset="0.82" stopColor="#53575d" />
            <stop offset="1" stopColor="#0c0e10" />
          </linearGradient>
          <linearGradient id="lanyard-surface-light" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="0.24" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="0.52" stopColor="rgba(255,255,255,0.015)" />
            <stop offset="0.78" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="1" stopColor="rgba(0,0,0,0.2)" />
          </linearGradient>
          <filter id="lanyard-soft-shadow" x="-25%" y="-15%" width="150%" height="150%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#080a0d" floodOpacity="0.22" />
            <feDropShadow dx="3" dy="6" stdDeviation="4.5" floodColor="#101217" floodOpacity="0.2" />
          </filter>
        </defs>
        <g className="lanyard-desktop-run" filter="url(#lanyard-soft-shadow)" fill="none" strokeLinecap="butt">
          <path d="M -72 -560 C -54 -350, -10 -94, 20 5 C 31 53, 57 96, 114 140" stroke="url(#lanyard-edge-light)" strokeWidth="33" />
          <path d="M -72 -560 C -54 -350, -10 -94, 20 5 C 31 53, 57 96, 114 140" stroke="url(#hero-lanyard-weave)" strokeWidth="27" />
          <path d="M -72 -560 C -54 -350, -10 -94, 20 5 C 31 53, 57 96, 114 140" stroke="url(#lanyard-surface-light)" strokeWidth="25" opacity="0.55" />
          <path d="M 340 -560 C 314 -348, 275 -88, 232 5 C 222 54, 196 96, 138 140" stroke="url(#lanyard-edge-light)" strokeWidth="33" />
          <path d="M 340 -560 C 314 -348, 275 -88, 232 5 C 222 54, 196 96, 138 140" stroke="url(#hero-lanyard-weave)" strokeWidth="27" />
          <path d="M 340 -560 C 314 -348, 275 -88, 232 5 C 222 54, 196 96, 138 140" stroke="url(#lanyard-surface-light)" strokeWidth="25" opacity="0.48" />
          <path d="M -63 -560 C -45 -350, -1 -94, 29 3 C 40 49, 64 89, 115 132" stroke="rgba(255,255,255,.15)" strokeWidth="1.1" />
          <path d="M 331 -560 C 305 -348, 266 -88, 223 3 C 213 50, 189 90, 137 132" stroke="rgba(255,255,255,.13)" strokeWidth="1.1" />
        </g>
        <g className="lanyard-mobile-run" filter="url(#lanyard-soft-shadow)" fill="none" strokeLinecap="butt">
          <path d="M -280 -560 C -282 -350, -280 -120, -278 -18 C -228 50, 4 108, 114 140" stroke="url(#lanyard-edge-light)" strokeWidth="33" />
          <path d="M -280 -560 C -282 -350, -280 -120, -278 -18 C -228 50, 4 108, 114 140" stroke="url(#hero-lanyard-weave)" strokeWidth="27" />
          <path d="M -280 -560 C -282 -350, -280 -120, -278 -18 C -228 50, 4 108, 114 140" stroke="url(#lanyard-surface-light)" strokeWidth="25" opacity="0.55" />
          <path d="M 532 -560 C 534 -350, 532 -120, 530 -18 C 480 50, 248 108, 138 140" stroke="url(#lanyard-edge-light)" strokeWidth="33" />
          <path d="M 532 -560 C 534 -350, 532 -120, 530 -18 C 480 50, 248 108, 138 140" stroke="url(#hero-lanyard-weave)" strokeWidth="27" />
          <path d="M 532 -560 C 534 -350, 532 -120, 530 -18 C 480 50, 248 108, 138 140" stroke="url(#lanyard-surface-light)" strokeWidth="25" opacity="0.48" />
          <path d="M -271 -560 C -273 -350, -271 -120, -269 -18 C -219 45, 9 101, 115 132" stroke="rgba(255,255,255,.15)" strokeWidth="1.1" />
          <path d="M 523 -560 C 525 -350, 523 -120, 521 -18 C 471 45, 243 101, 137 132" stroke="rgba(255,255,255,.13)" strokeWidth="1.1" />
        </g>
        <text x="43" y="65" transform="rotate(50 43 65)" className="lanyard-woven-mark lanyard-desktop-run">CRATENG</text>
        <text x="205" y="62" transform="rotate(-50 205 62)" className="lanyard-woven-mark lanyard-desktop-run">CRATENG</text>
        <ellipse cx="126" cy="150" rx="22" ry="6.5" fill="#080a0d" opacity="0.2" />
        <path d="M 106 132 Q 126 151 146 132 L 140 151 Q 126 160 112 151 Z" fill="url(#lanyard-edge-light)" stroke="#111318" strokeWidth="1.5" />
        <path d="M 110 134 Q 126 148 142 134 L 137 148 Q 126 154 115 148 Z" fill="url(#hero-lanyard-weave)" />
        <path d="M 113 142 Q 126 152 139 142" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="0.8" strokeDasharray="2 2" />
      </svg>

      <div
        ref={swingRef}
        className={`badge-swing${isSettling ? ' is-settling' : ''}${isTouchActive ? ' is-touch-active' : ''}${showEntrance ? ' entrance' : ''}`}
        style={restingVariables}
      >
        <svg className="badge-hardware" viewBox="0 0 76 112" aria-hidden="true">
          <defs>
            <linearGradient id="badge-gunmetal" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#121519" />
              <stop offset="0.16" stopColor="#3c434c" />
              <stop offset="0.38" stopColor="#7a8591" />
              <stop offset="0.55" stopColor="#434b55" />
              <stop offset="0.82" stopColor="#22262d" />
              <stop offset="1" stopColor="#0e1014" />
            </linearGradient>
            <linearGradient id="badge-steel-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#a2abb5" />
              <stop offset="0.25" stopColor="#525a64" />
              <stop offset="0.7" stopColor="#23272d" />
              <stop offset="1" stopColor="#111317" />
            </linearGradient>
            <linearGradient id="badge-ring-metallic" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#4e5661" />
              <stop offset="0.22" stopColor="#8d98a5" />
              <stop offset="0.48" stopColor="#343a42" />
              <stop offset="0.78" stopColor="#697482" />
              <stop offset="1" stopColor="#181b20" />
            </linearGradient>
            <filter id="hardware-shadow" x="-35%" y="-20%" width="170%" height="160%">
              <feDropShadow dx="1.5" dy="3.5" stdDeviation="3" floodColor="#090b0e" floodOpacity="0.42" />
            </filter>
            <filter id="ring-contact-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#06080a" floodOpacity="0.45" />
            </filter>
          </defs>
          <g className="badge-hardware-assembly" filter="url(#hardware-shadow)">
            {/* 1. Strap keeper / Crimp ferrule (woven lanyard clamp) */}
            <rect x="16" y="2" width="44" height="17" rx="4.5" fill="url(#badge-gunmetal)" stroke="#0c0e11" strokeWidth="1.2" />
            <path d="M 18 3.5 H 58" stroke="rgba(255,255,255,0.4)" strokeWidth="0.75" fill="none" />
            <rect x="23" y="6" width="30" height="7" rx="3.5" fill="#13161a" stroke="#5d6672" strokeWidth="0.8" />
            <circle cx="19.5" cy="10.5" r="1.5" fill="#181c21" stroke="#535c68" strokeWidth="0.7" />
            <circle cx="56.5" cy="10.5" r="1.5" fill="#181c21" stroke="#535c68" strokeWidth="0.7" />

            {/* 2. Swivel mechanism: upper collar & knurled cylinder barrel */}
            <path d="M 33 19 H 43 L 45 23 H 31 Z" fill="url(#badge-steel-face)" stroke="#111317" strokeWidth="0.9" />
            <rect x="31.5" y="23" width="13" height="9" rx="2" fill="url(#badge-gunmetal)" stroke="#0e1014" strokeWidth="1" />
            <path d="M 32 25.5 H 44 M 32 28.5 H 44" stroke="#8d96a2" strokeWidth="0.6" opacity="0.6" />
            <path d="M 34 23 V 32" stroke="rgba(255,255,255,0.45)" strokeWidth="0.75" />

            {/* 4. Connecting Ring (Forged Oval D-Ring / Split Ring) - layered behind clasp hook */}
            <g className="badge-connector-ring" filter="url(#ring-contact-shadow)">
              {/* Outer ring loop */}
              <path
                d="M 38 58 C 45 58, 50 63, 50 70 V 84 C 50 91.5, 45 96.5, 38 96.5 C 31 96.5, 26 91.5, 26 84 V 70 C 26 63, 31 58, 38 58 Z"
                fill="none"
                stroke="url(#badge-ring-metallic)"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Ring specular highlights on left side & bottom bend */}
              <path
                d="M 27 68 V 83 C 27 89, 31 94, 38 95"
                fill="none"
                stroke="rgba(255,255,255,0.48)"
                strokeWidth="0.85"
                strokeLinecap="round"
              />
              <path
                d="M 48.5 68 V 83"
                fill="none"
                stroke="rgba(0,0,0,0.35)"
                strokeWidth="0.7"
              />
            </g>

            {/* 3. Compact Swivel Clasp (Lobster Claw / Snap Hook) */}
            {/* Clasp upper collar looping under swivel */}
            <path d="M 33 32 H 43 L 45 37 H 31 Z" fill="url(#badge-steel-face)" stroke="#111317" strokeWidth="0.9" />

            {/* Clasp solid hook body cradling the top of the ring */}
            <path
              d="M 34 37 C 31 38, 27 44, 27 52 C 27 60, 30 66, 36 67 C 40 67.5, 43 64.5, 43 62 C 43 59, 41 58, 39 58 C 36 58, 33 60, 33 55 C 33 49, 36 43, 39 40 Z"
              fill="url(#badge-gunmetal)"
              stroke="#0b0d10"
              strokeWidth="1.2"
            />
            {/* Spring gate latch closing the clasp mouth */}
            <path d="M 39 41 L 43 43 L 42 61 L 39 60 Z" fill="url(#badge-steel-face)" stroke="#121519" strokeWidth="0.8" />
            {/* Gate thumb-lever textured tab */}
            <path d="M 42 46 L 46 48 L 45 53 L 41 52 Z" fill="url(#badge-steel-face)" stroke="#121519" strokeWidth="0.7" />
            <path d="M 43 49 H 45.5 M 42.5 51 H 45" stroke="#22262c" strokeWidth="0.6" />

            {/* Stainless steel pivot rivet */}
            <circle cx="39.5" cy="42" r="2.2" fill="#9da7b2" stroke="#16181d" strokeWidth="0.8" />
            <circle cx="39.5" cy="42" r="0.8" fill="#1b1e24" />

            {/* Specular rim light on clasp curve */}
            <path
              d="M 28 47 C 27 53, 28.5 60, 34 65"
              fill="none"
              stroke="#b0bac6"
              strokeWidth="0.9"
              opacity="0.65"
            />

            {/* Ambient occlusion shadow under hook where it sits on the connecting ring */}
            <ellipse cx="36" cy="62" rx="4.5" ry="1.8" fill="#080a0d" opacity="0.45" />

            {/* Contact shadow at bottom where ring passes through slot hole */}
            <ellipse cx="38" cy="95.5" rx="6.5" ry="2" fill="#06080b" opacity="0.5" />
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
