'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import {
  InfrastructureIcon,
  CybersecurityIcon,
  SoftwareIcon,
  AutomationIcon,
} from '@/components/icons'
import { siteConfig } from '@/lib/data'

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect()
            if (rect.bottom > 0) {
              setScrollY(window.scrollY)
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Parallax layer calculations (hardware-accelerated transforms)
  const bgGridTransform = `translateY(${Math.round(scrollY * 0.12)}px)`
  const busSignalsTransform = `translateY(${Math.round(scrollY * 0.25)}px)`
  const portraitCardTransform = `translateY(${Math.round(scrollY * 0.05)}px)`

  return (
    <section
      ref={heroRef}
      className="hero section-pad hero-choreography living-network-hero"
      aria-labelledby="hero-headline"
    >
      {/* ── PARALLAX LAYER 1: Background Topological Coordinate Grid ── */}
      <div
        className="hero-parallax-bg"
        style={{ transform: bgGridTransform }}
        aria-hidden="true"
      >
        <svg
          className="hero-grid-svg"
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid-pattern"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="rgba(23, 25, 28, 0.05)"
                strokeWidth="1"
              />
              <circle cx="0" cy="0" r="1.5" fill="rgba(23, 25, 28, 0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />

          {/* Coordinate reference markers */}
          <text x="48" y="60" fill="rgba(115, 122, 128, 0.4)" fontFamily="var(--font-mono)" fontSize="9">
            LAT 01&deg;17&prime;S / LON 36&deg;49&prime;E [NRB_CORE]
          </text>
          <text x="1152" y="60" textAnchor="end" fill="rgba(8, 127, 115, 0.5)" fontFamily="var(--font-mono)" fontSize="9">
            TOPOLOGY // AS37053 &bull; HYBRID BUS ACTIVE
          </text>
          <text x="48" y="740" fill="rgba(115, 122, 128, 0.35)" fontFamily="var(--font-mono)" fontSize="8">
            PHYSICAL LAYER: 10G-BASE-T &bull; 802.1Q TRUNK
          </text>
          <text x="1152" y="740" textAnchor="end" fill="rgba(255, 100, 51, 0.45)" fontFamily="var(--font-mono)" fontSize="8">
            SECURITY POLICY: ZERO-TRUST RECURSIVE RBAC
          </text>
        </svg>
      </div>

      {/* ── PARALLAX LAYER 2: Living Network Signal Bus Lines ── */}
      <div
        className="hero-signal-bus-layer"
        style={{ transform: busSignalsTransform }}
        aria-hidden="true"
      >
        <svg
          className="hero-bus-svg"
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Primary Signal Circuit (Orange Active Route) */}
          <path
            d="M 60 140 H 340 V 320 H 620 V 220 H 940"
            stroke="rgba(255, 100, 51, 0.22)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            className="signal-flow-pulse pulse-primary"
            d="M 60 140 H 340 V 320 H 620 V 220 H 940"
            stroke="var(--orange)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeDasharray="24 160"
          />

          {/* Secondary Telemetry Circuit (Teal Defense Bus) */}
          <path
            d="M 940 380 H 680 V 460 H 420 V 380 H 120"
            stroke="rgba(8, 127, 115, 0.2)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            className="signal-flow-pulse pulse-secondary"
            d="M 940 380 H 680 V 460 H 420 V 380 H 120"
            stroke="var(--teal)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeDasharray="18 140"
          />

          {/* Network Geometric Routing Junctions */}
          <circle cx="340" cy="140" r="4" fill="var(--white)" stroke="var(--orange)" strokeWidth="2" />
          <circle cx="340" cy="320" r="4.5" fill="var(--graphite)" stroke="var(--orange)" strokeWidth="2" />
          <circle cx="620" cy="320" r="4" fill="var(--white)" stroke="var(--teal)" strokeWidth="2" />
          <circle cx="620" cy="220" r="4.5" fill="var(--teal)" />
          <circle cx="680" cy="380" r="3.5" fill="var(--white)" stroke="var(--teal)" strokeWidth="1.5" />
          <circle cx="420" cy="460" r="3.5" fill="var(--orange)" />

          {/* Junction telemetry labels */}
          <text x="348" y="136" fill="var(--orange)" fontFamily="var(--font-mono)" fontSize="8" fontWeight="600">
            GW_INGRESS
          </text>
          <text x="628" y="216" fill="var(--teal)" fontFamily="var(--font-mono)" fontSize="8" fontWeight="600">
            SECOPS_NODE
          </text>
        </svg>
      </div>

      {/* ── PARALLAX LAYER 3: Foreground Content & Studio Identity ── */}
      <div className="hero-copy" style={{ position: 'relative', zIndex: 10 }}>
        <p className="eyebrow hero-eyebrow-animate">
          <span className="eyebrow-dot" aria-hidden="true" />
          {siteConfig.positioning}
        </p>

        <h1 id="hero-headline" className="hero-title-animate">
          I build, secure, automate
          <br />
          <em>&amp; maintain</em>
          <br />
          technology.
        </h1>

        <p className="hero-lede hero-lede-animate">
          {siteConfig.tagline} {siteConfig.secondaryTagline}
        </p>

        <div className="hero-actions hero-actions-animate">
          <a id="hero-cta-work" className="button button-dark hero-btn-interactive" href="#work">
            <span>Explore selected work</span>
            <ArrowDownRight aria-hidden="true" className="w-4 h-4 arrow-shift" />
          </a>
          <a id="hero-cta-consult" className="text-link hero-link-interactive" href="#contact">
            <span>Request an ICT consultation</span>
            <ArrowUpRight aria-hidden="true" className="w-4 h-4 arrow-shift" />
          </a>
        </div>

        <div className="hero-meta hero-meta-animate" aria-label="Core focus areas and physical base">
          <span className="meta-pill">
            <CybersecurityIcon className="w-3.5 h-3.5 inline mr-1 text-[var(--orange)]" /> Cybersecurity
          </span>
          <span className="meta-pill">
            <InfrastructureIcon className="w-3.5 h-3.5 inline mr-1 text-[var(--teal)]" /> Infrastructure
          </span>
          <span className="meta-pill">
            <SoftwareIcon className="w-3.5 h-3.5 inline mr-1 text-[var(--ink)]" /> Software Development
          </span>
          <span className="meta-pill">
            <AutomationIcon className="w-3.5 h-3.5 inline mr-1 text-[var(--orange)]" /> AI Automation
          </span>
          <span className="hero-meta-location">
            Nairobi, Kenya &bull; East Africa &bull; Worldwide Remote
          </span>
        </div>
      </div>

      {/* Right-Hand Studio Chassis with Micro-Parallax */}
      <div
        className="hero-visual hero-visual-animate"
        style={{ transform: portraitCardTransform, zIndex: 12 }}
      >
        {/* Studio Portrait Card — Fixed 1:1 Intrinsic Geometry (Zero Distortion) */}
        <div className="portrait-studio-card">
          <div className="portrait-aspect-frame">
            <Image
              src="/portraits/Christopher_rateng-Passport-Photo.jpg"
              alt="Christopher Modicai Rateng — Systems Infrastructure & Cloud Security Specialist"
              fill
              sizes="(max-width: 768px) 290px, 360px"
              className="portrait-studio-img"
              priority
            />
            {/* Precision Blueprint Corner Markers */}
            <span className="blueprint-corner top-left" aria-hidden="true" />
            <span className="blueprint-corner top-right" aria-hidden="true" />
            <span className="blueprint-corner bottom-left" aria-hidden="true" />
            <span className="blueprint-corner bottom-right" aria-hidden="true" />
          </div>

          <div className="portrait-studio-spec">
            <div className="spec-status-row">
              <span className="live-status-dot" aria-hidden="true" />
              <span className="spec-status-text">AVAILABLE FOR PROJECTS &bull; CONSULTING</span>
            </div>
            <div className="spec-identity-row">
              <strong className="spec-name">Christopher M. Rateng</strong>
              <span className="spec-coords">01&deg; 17&prime; S / 36&deg; 49&prime; E &bull; NAIROBI, KE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
