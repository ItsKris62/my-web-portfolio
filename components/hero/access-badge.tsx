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
import {
  HARDWARE_GEOMETRY,
  HARDWARE_TO_HOLDER_RATIO,
  LANYARD_LAYOUT,
  LANYARD_PATHS,
  LANYARD_VIEW_BOX,
  joinAnchor,
} from './access-badge/lanyard-geometry'
import {
  type LanyardPhysicsFrame,
  useLanyardPhysics,
} from './access-badge/use-lanyard-physics'

interface AccessBadgeProps {
  className?: string
  priority?: boolean
}

interface LanyardMaterialProps {
  className?: string
  href: string
  side: 'left' | 'right'
}

function LanyardMaterial({ className = '', href, side }: LanyardMaterialProps) {
  const stitchInset = side === 'left'
    ? ['translate(5 -1.5)', 'translate(-5 1.5)']
    : ['translate(-5 -1.5)', 'translate(5 1.5)']

  return (
    <g className={`lanyard-material ${className}`}>
      <use href={href} className="lanyard-depth" strokeWidth="33" />
      <use href={href} className="lanyard-base-fabric" strokeWidth="27" />
      <use href={href} className="lanyard-weave lanyard-weave-dark" strokeWidth="25" strokeDasharray="2 2" />
      <use
        href={href}
        className="lanyard-weave lanyard-weave-light"
        strokeWidth="25"
        strokeDasharray="2 2"
        strokeDashoffset="2"
        transform={side === 'left' ? 'translate(0.65 -0.35)' : 'translate(-0.65 -0.35)'}
      />
      <use href={href} className="lanyard-cylinder-shade" strokeWidth="25" />
      <use href={href} className="lanyard-dynamic-highlight" strokeWidth="9" />
      <use
        href={href}
        className="lanyard-edge-stitch"
        strokeWidth="1"
        strokeDasharray="4 4"
        transform={stitchInset[0]}
      />
      <use
        href={href}
        className="lanyard-edge-stitch"
        strokeWidth="1"
        strokeDasharray="4 4"
        strokeDashoffset="2"
        transform={stitchInset[1]}
      />
    </g>
  )
}

interface PointerVelocitySample {
  time: number
  x: number
  y: number
  velocityX: number
  velocityY: number
}

type PointerInteraction = 'badge' | 'lanyard'

export function AccessBadge({ className = '', priority = true }: AccessBadgeProps) {
  const sceneRef = useRef<HTMLElement>(null)
  const swingRef = useRef<HTMLDivElement>(null)
  const hardwareRef = useRef<HTMLDivElement>(null)
  const holderRef = useRef<HTMLDivElement>(null)
  const activePointerRef = useRef<number | null>(null)
  const pointerInteractionRef = useRef<PointerInteraction | null>(null)
  const pointerVelocityRef = useRef<PointerVelocitySample | null>(null)
  const [isTouchActive, setIsTouchActive] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [showEntrance, setShowEntrance] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => {
      setReducedMotion(media.matches)
      if (media.matches) {
        setShowEntrance(false)
      }
    }

    syncPreference()
    media.addEventListener('change', syncPreference)
    return () => media.removeEventListener('change', syncPreference)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const el = swingRef.current
    if (!el) return

    const finishEntrance = () => {
      setShowEntrance(false)
    }

    const fallbackTimer = window.setTimeout(finishEntrance, 2300)

    const handleAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName === 'badge-entrance') {
        window.clearTimeout(fallbackTimer)
        finishEntrance()
      }
    }

    el.addEventListener('animationend', handleAnimationEnd)
    return () => {
      window.clearTimeout(fallbackTimer)
      el.removeEventListener('animationend', handleAnimationEnd)
    }
  }, [reducedMotion])

  const applyPhysicsFrame = useCallback((frame: LanyardPhysicsFrame) => {
    const scene = sceneRef.current
    const hardware = hardwareRef.current
    const holder = holderRef.current
    if (!scene || !hardware || !holder) return

    scene.style.setProperty('--strap-x', `${frame.strap.x.toFixed(2)}px`)
    scene.style.setProperty('--strap-rz', `${frame.strap.rotateZ.toFixed(2)}deg`)
    scene.style.setProperty('--light-position', `${frame.strap.lightPosition.toFixed(2)}px`)
    scene.dataset.crossover = frame.strap.rotateZ < -0.02 ? 'left' : 'right'

    hardware.style.setProperty('--hardware-x', `${frame.hardware.x.toFixed(2)}px`)
    hardware.style.setProperty('--hardware-ry', `${frame.hardware.rotateY.toFixed(2)}deg`)
    hardware.style.setProperty('--hardware-rz', `${frame.hardware.rotateZ.toFixed(2)}deg`)

    holder.style.setProperty('--badge-x', `${frame.holder.x.toFixed(2)}px`)
    holder.style.setProperty('--badge-rx', `${frame.holder.rotateX.toFixed(2)}deg`)
    holder.style.setProperty('--badge-ry', `${frame.holder.rotateY.toFixed(2)}deg`)
    holder.style.setProperty('--badge-rz', `${frame.holder.rotateZ.toFixed(2)}deg`)
    holder.style.setProperty('--light-x', `${frame.holder.lightX.toFixed(1)}%`)
    holder.style.setProperty('--light-y', `${frame.holder.lightY.toFixed(1)}%`)
  }, [])

  const { release, setPointerTarget } = useLanyardPhysics({
    disabled: reducedMotion,
    onFrame: applyPhysicsFrame,
  })

  const getPointerPosition = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    return {
      x: Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1)),
      y: Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1)),
    }
  }, [])

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (reducedMotion) return

    const normalized = getPointerPosition(event)
    const isCaptured = activePointerRef.current === event.pointerId
    const interaction = pointerInteractionRef.current
    const isLanyardTarget = event.target instanceof Element
      && event.target.closest('.badge-lanyard-loop') !== null

    if ((event.pointerType === 'touch' || event.pointerType === 'pen') && !isCaptured) return

    if (isCaptured) {
      event.preventDefault()
      const now = event.timeStamp
      const previous = pointerVelocityRef.current
      if (previous) {
        const elapsed = Math.max(8, now - previous.time) / 1000
        pointerVelocityRef.current = {
          time: now,
          x: normalized.x,
          y: normalized.y,
          velocityX: previous.velocityX * 0.55 + ((normalized.x - previous.x) / elapsed) * 0.45,
          velocityY: previous.velocityY * 0.55 + ((normalized.y - previous.y) / elapsed) * 0.45,
        }
      }
    }

    if (isCaptured && interaction === 'badge') {
      setPointerTarget(normalized.x * 0.42, normalized.y * 0.28, 0.16)
      return
    }

    setPointerTarget(normalized.x, normalized.y, isCaptured || isLanyardTarget ? 1 : 0.32)
  }, [getPointerPosition, reducedMotion, setPointerTarget])

  const returnToRest = useCallback(() => {
    if (activePointerRef.current !== null) return
    setIsTouchActive(false)
    release()
  }, [release])

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (reducedMotion) return

    const isLanyardTarget = event.target instanceof Element
      && event.target.closest('.badge-lanyard-loop') !== null
    const isBadgeTarget = event.target instanceof Element
      && event.target.closest('.badge-holder-motion, .badge-hardware-motion') !== null
    const isInteractiveTarget = event.target instanceof Element
      && event.target.closest('a, button') !== null
    const isTouchPointer = event.pointerType === 'touch' || event.pointerType === 'pen'

    if (!isLanyardTarget && (!isTouchPointer || !isBadgeTarget || isInteractiveTarget)) return

    const normalized = getPointerPosition(event)
    const interaction: PointerInteraction = isLanyardTarget ? 'lanyard' : 'badge'
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    activePointerRef.current = event.pointerId
    pointerInteractionRef.current = interaction
    pointerVelocityRef.current = {
      time: event.timeStamp,
      x: normalized.x,
      y: normalized.y,
      velocityX: 0,
      velocityY: 0,
    }
    setIsTouchActive(true)
    setPointerTarget(
      interaction === 'badge' ? normalized.x * 0.42 : normalized.x,
      interaction === 'badge' ? normalized.y * 0.28 : normalized.y,
      interaction === 'badge' ? 0.16 : 1,
    )
  }, [getPointerPosition, reducedMotion, setPointerTarget])

  const finishPointerInteraction = useCallback((event: ReactPointerEvent<HTMLElement>, useMomentum: boolean) => {
    if (activePointerRef.current !== event.pointerId) return

    const velocity = pointerVelocityRef.current
    const interaction = pointerInteractionRef.current
    const momentumScale = velocity
      ? Math.max(0, 1 - (event.timeStamp - velocity.time) / 120)
      : 0
    const releasedVelocityX = (velocity?.velocityX ?? 0) * momentumScale
    const releasedVelocityY = (velocity?.velocityY ?? 0) * momentumScale
    const touchSide = (velocity?.x ?? 0) < 0 ? -1 : 1
    const badgeTapImpulse = interaction === 'badge' && Math.abs(releasedVelocityX) < 0.18
      ? touchSide * 0.9
      : 0
    activePointerRef.current = null
    pointerInteractionRef.current = null
    pointerVelocityRef.current = null
    setIsTouchActive(false)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    release(
      useMomentum ? releasedVelocityX * (interaction === 'badge' ? 0.45 : 1) + badgeTapImpulse : 0,
      useMomentum ? releasedVelocityY * (interaction === 'badge' ? 0.35 : 1) : 0,
    )
  }, [release])

  const handlePointerUp = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    finishPointerInteraction(event, true)
  }, [finishPointerInteraction])

  const handlePointerCancel = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    finishPointerInteraction(event, false)
  }, [finishPointerInteraction])

  const handleLostPointerCapture = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (activePointerRef.current === event.pointerId) {
      activePointerRef.current = null
      pointerInteractionRef.current = null
      pointerVelocityRef.current = null
      setIsTouchActive(false)
      release()
    }
  }, [release])

  const restingVariables = {
    '--lanyard-width': `${LANYARD_LAYOUT.widthPercent}%`,
    '--lanyard-join-x': `${LANYARD_LAYOUT.joinXPercent}%`,
    '--lanyard-join-y': `${LANYARD_LAYOUT.joinYPercent}%`,
    '--hardware-width': `${HARDWARE_GEOMETRY.renderedWidth}px`,
    '--hardware-attachment-ratio': HARDWARE_TO_HOLDER_RATIO,
    '--strap-x': '0px',
    '--strap-rz': '0deg',
    '--light-position': '0px',
  } as CSSProperties

  return (
    <figure
      ref={sceneRef}
      className={`access-badge-scene${showEntrance ? ' entrance' : ''}${isTouchActive ? ' is-grabbed' : ''}${className ? ` ${className}` : ''}`}
      style={restingVariables}
      data-crossover="right"
      onPointerMove={handlePointerMove}
      onPointerLeave={returnToRest}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onLostPointerCapture={handleLostPointerCapture}
      aria-label="Christopher Rateng studio profile badge"
    >
      <div className="badge-anchor-stage">
        <svg
          className="badge-lanyard-loop"
          viewBox={`0 0 ${LANYARD_VIEW_BOX.width} ${LANYARD_VIEW_BOX.height}`}
          aria-hidden="true"
        >
          <defs>
            <path id="strap-spine" d={LANYARD_PATHS.desktop.left} />
            <path id="strap-spine-right" d={LANYARD_PATHS.desktop.right} />
            <path id="strap-spine-right-text" d={LANYARD_PATHS.desktop.rightText} />
            <path id="strap-spine-mobile" d={LANYARD_PATHS.mobile.left} />
            <path id="strap-spine-mobile-right" d={LANYARD_PATHS.mobile.right} />
            <linearGradient id="lanyard-cylinder-light" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#000" stopOpacity="0.2" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0.15" />
              <stop offset="1" stopColor="#000" stopOpacity="0.2" />
            </linearGradient>
            <filter id="lanyard-soft-shadow" x="-25%" y="-15%" width="150%" height="150%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#080a0d" floodOpacity="0.22" />
              <feDropShadow dx="3" dy="6" stdDeviation="4.5" floodColor="#101217" floodOpacity="0.2" />
            </filter>
            <clipPath id="lanyard-crossover-clip">
              <circle cx={joinAnchor.x} cy={joinAnchor.y - 5} r="24" />
            </clipPath>
          </defs>

          <g className="lanyard-desktop-run" filter="url(#lanyard-soft-shadow)" fill="none" strokeLinecap="butt">
            <LanyardMaterial href="#strap-spine" side="left" />
            <LanyardMaterial href="#strap-spine-right" side="right" />
            <g clipPath="url(#lanyard-crossover-clip)">
              <LanyardMaterial href="#strap-spine" side="left" className="lanyard-crossover-front is-left" />
              <LanyardMaterial href="#strap-spine-right" side="right" className="lanyard-crossover-front is-right" />
            </g>
            <text className="lanyard-woven-mark">
              <textPath href="#strap-spine" startOffset="79%">CRATENG</textPath>
            </text>
            <text className="lanyard-woven-mark">
              <textPath href="#strap-spine-right-text" startOffset="12%">CRATENG</textPath>
            </text>
          </g>

          <g className="lanyard-mobile-run" filter="url(#lanyard-soft-shadow)" fill="none" strokeLinecap="butt">
            <LanyardMaterial href="#strap-spine-mobile" side="left" />
            <LanyardMaterial href="#strap-spine-mobile-right" side="right" />
            <g clipPath="url(#lanyard-crossover-clip)">
              <LanyardMaterial href="#strap-spine-mobile" side="left" className="lanyard-crossover-front is-left" />
              <LanyardMaterial href="#strap-spine-mobile-right" side="right" className="lanyard-crossover-front is-right" />
            </g>
          </g>
        </svg>
      </div>

      <div
        ref={swingRef}
        className={`badge-swing${isTouchActive ? ' is-touch-active' : ''}${showEntrance ? ' entrance' : ''}`}
      >
        <div ref={hardwareRef} className="badge-hardware-motion">
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
        </div>

        <div ref={holderRef} className="badge-holder-motion">
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
      </div>
    </figure>
  )
}
