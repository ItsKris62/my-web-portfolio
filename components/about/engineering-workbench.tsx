'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Code2,
  Server,
  Shield,
  Cpu,
  ArrowUpRight,
  Workflow,
} from 'lucide-react'

export type DisciplineId = 'fullstack' | 'infrastructure' | 'cybersecurity' | 'automation'

interface DisciplineData {
  id: DisciplineId
  number: string
  label: string
  shortLabel: string
  tagline: string
  color: string
  icon: React.ElementType
  philosophy: string
  handshake: {
    target: string
    detail: string
  }[]
  caseStudy: {
    title: string
    slug: string
    summary: string
  }
  stack: string[]
  coordinates: { x: number; y: number }
}

export const DISCIPLINES: Record<DisciplineId, DisciplineData> = {
  fullstack: {
    id: 'fullstack',
    number: '01',
    label: 'Full-Stack Engineering',
    shortLabel: 'Full-Stack',
    tagline: 'Modern Web Architecture & Type-Safe Systems',
    color: 'var(--orange)',
    icon: Code2,
    philosophy:
      'Architecting software from database schemas to frontend interfaces with strict type contracts, maintainable module boundaries, and server components.',
    handshake: [
      {
        target: 'Infrastructure',
        detail: 'Containerized deployment environments, edge caching, and automated builds.',
      },
      {
        target: 'Cybersecurity',
        detail: 'Least-privilege API authorization, server-side session checks, and defensive input parsing with Zod.',
      },
      {
        target: 'Automation',
        detail: 'Type-safe webhook receivers, structured JSON events, and background async queue consumption.',
      },
    ],
    caseStudy: {
      title: 'SheriaBot & Adek Tatu',
      slug: 'sheriabot',
      summary: 'Founder-led Next.js 16 application with PostgreSQL data modeling and client platforms.',
    },
    stack: ['React', 'Next.js 16', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    coordinates: { x: 100, y: 80 },
  },
  infrastructure: {
    id: 'infrastructure',
    number: '02',
    label: 'Infrastructure & Cloud',
    shortLabel: 'Infrastructure',
    tagline: 'Resilient Networks & Systems Operations',
    color: 'var(--teal)',
    icon: Server,
    philosophy:
      'Designing dependable multi-site physical networks, Linux host environments, and segmented traffic topologies engineered for continuous business uptime.',
    handshake: [
      {
        target: 'Full-Stack',
        detail: 'High-performance HTTP/3 reverse proxies, DNS routing, and static asset delivery.',
      },
      {
        target: 'Cybersecurity',
        detail: '802.1Q VLAN boundary segmentation, isolating POS payment terminals into dedicated subnets.',
      },
      {
        target: 'Automation',
        detail: 'Scheduled Cron maintenance tasks, SSH configuration automation, and hardware telemetry.',
      },
    ],
    caseStudy: {
      title: 'Multi-Site Network Deployment',
      slug: 'enterprise-network-deployment',
      summary: 'End-to-end commercial LAN/WAN infrastructure with isolated VLAN subnets and rack buildouts.',
    },
    stack: ['LAN/WAN', '802.1Q VLANs', 'Linux', 'LiteSpeed', 'Structured Cabling', 'Network Monitoring'],
    coordinates: { x: 440, y: 80 },
  },
  cybersecurity: {
    id: 'cybersecurity',
    number: '03',
    label: 'Defensive Cybersecurity',
    shortLabel: 'Cybersecurity',
    tagline: 'Zero-Trust Architecture & Threat Observability',
    color: 'var(--teal)',
    icon: Shield,
    philosophy:
      'Treating security as a foundational architectural property through zero-trust access, auditable logging, network isolation, and rigorous endpoint validation.',
    handshake: [
      {
        target: 'Full-Stack',
        detail: 'Role-based access control (RBAC), CSRF mitigations, and secure cryptographic headers.',
      },
      {
        target: 'Infrastructure',
        detail: 'Suricata/Wazuh log ingest, firewall rule verification, and network TAP monitoring.',
      },
      {
        target: 'Automation',
        detail: 'Automated threat containment workflows and SIEM threshold notification dispatch.',
      },
    ],
    caseStudy: {
      title: 'Cybersecurity Monitoring Lab',
      slug: 'cybersecurity-monitoring-lab',
      summary: 'Controlled security observability lab with Wazuh SIEM, auditd logging, and attack simulations.',
    },
    stack: ['Wazuh SIEM', 'Suricata IDS', 'Auditd Logging', 'Network Hardening', 'Access Control', 'Linux'],
    coordinates: { x: 100, y: 300 },
  },
  automation: {
    id: 'automation',
    number: '04',
    label: 'AI & Practical Automation',
    shortLabel: 'Automation',
    tagline: 'Event-Driven Pipelines & Retrieval Workflows',
    color: 'var(--orange)',
    icon: Cpu,
    philosophy:
      'Eliminating manual friction through resilient event-driven pipelines, HMAC-validated webhooks, and human-in-the-loop AI assistance workflows.',
    handshake: [
      {
        target: 'Full-Stack',
        detail: 'Retrieval-assisted guidance workflows, structured JSON payloads, and automated notification triggers.',
      },
      {
        target: 'Infrastructure',
        detail: 'Automated database snapshots, system health heartbeats, and log archiving.',
      },
      {
        target: 'Cybersecurity',
        detail: 'HMAC signature verification, dead-letter retry safety, and auditable event ledgers.',
      },
    ],
    caseStudy: {
      title: 'Automation & Workflow Engineering',
      slug: 'automation-workflow-engineering',
      summary: 'Fault-tolerant webhook pipeline with Redis idempotency, dead-letter queues, and audit logging.',
    },
    stack: ['n8n Pipelines', 'HMAC Signatures', 'Redis Queues', 'Webhook Ingest', 'AI Workflows', 'Zod'],
    coordinates: { x: 440, y: 300 },
  },
}

const DISCIPLINE_KEYS: DisciplineId[] = ['fullstack', 'infrastructure', 'cybersecurity', 'automation']

export function EngineeringWorkbench() {
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineId>('fullstack')
  const [isHovered, setIsHovered] = useState<DisciplineId | null>(null)
  const [pulseActive, setPulseActive] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const pulseTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isInViewRef = useRef(false)

  // 1. Check prefers-reduced-motion dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = () => setReducedMotion(media.matches)
    setReducedMotion(media.matches)
    media.addEventListener('change', handleMotionChange)
    return () => media.removeEventListener('change', handleMotionChange)
  }, [])

  // 2. IntersectionObserver to pause motion when off-screen
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      isInViewRef.current = true
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting
        if (!entry.isIntersecting) {
          // Reset parallax when scrolled out of view
          el.style.setProperty('--wb-tilt-x', '0deg')
          el.style.setProperty('--wb-tilt-y', '0deg')
          if (pulseTimerRef.current) {
            clearTimeout(pulseTimerRef.current)
            setPulseActive(false)
          }
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // 3. Trigger purposeful short pulse on discipline change (lasts 600ms, then settles)
  const selectDiscipline = useCallback(
    (id: DisciplineId) => {
      setActiveDiscipline(id)
      if (!reducedMotion && isInViewRef.current) {
        setPulseActive(true)
        if (pulseTimerRef.current) clearTimeout(pulseTimerRef.current)
        pulseTimerRef.current = setTimeout(() => {
          setPulseActive(false)
        }, 650)
      }
    },
    [reducedMotion]
  )

  useEffect(() => {
    return () => {
      if (pulseTimerRef.current) clearTimeout(pulseTimerRef.current)
    }
  }, [])

  // 4. Zero React re-renders on pointer move: direct DOM CSS Variable update!
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion || !isInViewRef.current || e.pointerType === 'touch') return
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1))
      const ny = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1))

      el.style.setProperty('--wb-tilt-x', `${(ny * -2.2).toFixed(2)}deg`)
      el.style.setProperty('--wb-tilt-y', `${(nx * 2.5).toFixed(2)}deg`)
    },
    [reducedMotion]
  )

  const handlePointerLeave = useCallback(() => {
    const el = containerRef.current
    if (el) {
      el.style.setProperty('--wb-tilt-x', '0deg')
      el.style.setProperty('--wb-tilt-y', '0deg')
    }
  }, [])

  // 5. W3C ARIA Tablist keyboard navigation: Left/Right/Up/Down/Home/End
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      nextIndex = (index + 1) % DISCIPLINE_KEYS.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      nextIndex = (index - 1 + DISCIPLINE_KEYS.length) % DISCIPLINE_KEYS.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      nextIndex = DISCIPLINE_KEYS.length - 1
    }

    if (nextIndex !== null) {
      const nextId = DISCIPLINE_KEYS[nextIndex]
      selectDiscipline(nextId)
      tabRefs.current[nextIndex]?.focus()
    }
  }

  const active = DISCIPLINES[activeDiscipline]
  const centerPos = { x: 270, y: 190 }

  return (
    <div
      ref={containerRef}
      className="engineering-workbench"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* ── Console Header Bar ── */}
      <div className="wb-header-bar">
        <div className="wb-meta-left">
          <span className="wb-indicator-dot" aria-hidden="true" />
          <span className="wb-meta-title">SYSTEMS ARCHITECTURE CONSOLE</span>
        </div>
        <div className="wb-meta-right">
          <span className="wb-mode-label">INTERACTIVE DISCIPLINE MATRIX</span>
        </div>
      </div>

      {/* ── Mobile-Optimized Segmented Control (Maintains 48px Touch Targets) ── */}
      <div
        className="wb-segmented-tabs"
        role="tablist"
        aria-label="Engineering discipline selector"
      >
        {DISCIPLINE_KEYS.map((key, idx) => {
          const item = DISCIPLINES[key]
          const isSelected = activeDiscipline === key
          const Icon = item.icon

          return (
            <button
              key={key}
              ref={(el) => {
                tabRefs.current[idx] = el
              }}
              role="tab"
              id={`workbench-tab-${key}`}
              aria-selected={isSelected}
              aria-controls="workbench-panel"
              tabIndex={isSelected ? 0 : -1}
              className={`wb-tab-btn ${isSelected ? 'active' : ''}`}
              onClick={() => selectDiscipline(key)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              <div className="wb-tab-icon-wrap" aria-hidden="true">
                <Icon className="w-4 h-4" />
              </div>
              <div className="wb-tab-text">
                <span className="wb-tab-num">{item.number}</span>
                <span className="wb-tab-name">{item.shortLabel}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* ── Precision Vector Instrument Topology ── */}
      <div className="wb-chassis-stage">
        <div className="wb-parallax-layer">
          <svg
            viewBox="0 0 540 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="wb-topology-svg select-none"
            role="img"
            aria-label="Interactive topology connecting Full-Stack, Infrastructure, Cybersecurity, and AI Automation to the central Synthesis Core"
          >
            <defs>
              <pattern id="wb-matrix-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              </pattern>
              <linearGradient id="wb-center-glow" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#ff6433" stopOpacity="0.2" />
                <stop offset="1" stopColor="#087f73" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Substrate Grid */}
            <rect width="540" height="380" rx="8" fill="#101317" />
            <rect width="540" height="380" fill="url(#wb-matrix-grid)" />
            <rect x="0.5" y="0.5" width="539" height="379" rx="7.5" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            {/* Corner Precision Ticks */}
            <path d="M 12 20 L 20 20 M 20 12 L 20 20" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
            <path d="M 528 20 L 520 20 M 520 12 L 520 20" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
            <path d="M 12 360 L 20 360 M 20 368 L 20 360" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
            <path d="M 528 360 L 520 360 M 520 368 L 520 360" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />

            {/* ── Static Background Bus Channels ── */}
            {/* Horizontal Perimeter Buses */}
            <line x1="100" y1="80" x2="440" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            <line x1="100" y1="300" x2="440" y2="300" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            {/* Vertical Perimeter Buses */}
            <line x1="100" y1="80" x2="100" y2="300" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            <line x1="440" y1="80" x2="440" y2="300" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

            {/* Radial Spokes connecting 4 nodes to the Synthesis Core */}
            <line x1="100" y1="80" x2={centerPos.x} y2={centerPos.y} stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="440" y1="80" x2={centerPos.x} y2={centerPos.y} stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="100" y1="300" x2={centerPos.x} y2={centerPos.y} stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="440" y1="300" x2={centerPos.x} y2={centerPos.y} stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* ── Active Highlighted Signal Traces for Currently Selected Discipline ── */}
            {activeDiscipline === 'fullstack' && (
              <g className={`wb-active-signals ${pulseActive ? 'pulse-engaged' : ''}`}>
                <line x1="100" y1="80" x2="440" y2="80" stroke="#ff6433" strokeWidth="2" strokeOpacity="0.85" />
                <line x1="100" y1="80" x2="100" y2="300" stroke="#ff6433" strokeWidth="2" strokeOpacity="0.85" />
                <line x1="100" y1="80" x2={centerPos.x} y2={centerPos.y} stroke="#ff6433" strokeWidth="2" strokeOpacity="0.95" />
              </g>
            )}

            {activeDiscipline === 'infrastructure' && (
              <g className={`wb-active-signals ${pulseActive ? 'pulse-engaged' : ''}`}>
                <line x1="440" y1="80" x2="100" y2="80" stroke="#087f73" strokeWidth="2" strokeOpacity="0.85" />
                <line x1="440" y1="80" x2="440" y2="300" stroke="#087f73" strokeWidth="2" strokeOpacity="0.85" />
                <line x1="440" y1="80" x2={centerPos.x} y2={centerPos.y} stroke="#087f73" strokeWidth="2" strokeOpacity="0.95" />
              </g>
            )}

            {activeDiscipline === 'cybersecurity' && (
              <g className={`wb-active-signals ${pulseActive ? 'pulse-engaged' : ''}`}>
                <line x1="100" y1="300" x2="100" y2="80" stroke="#087f73" strokeWidth="2" strokeOpacity="0.85" />
                <line x1="100" y1="300" x2="440" y2="300" stroke="#087f73" strokeWidth="2" strokeOpacity="0.85" />
                <line x1="100" y1="300" x2={centerPos.x} y2={centerPos.y} stroke="#087f73" strokeWidth="2" strokeOpacity="0.95" />
              </g>
            )}

            {activeDiscipline === 'automation' && (
              <g className={`wb-active-signals ${pulseActive ? 'pulse-engaged' : ''}`}>
                <line x1="440" y1="300" x2="440" y2="80" stroke="#ff6433" strokeWidth="2" strokeOpacity="0.85" />
                <line x1="440" y1="300" x2="100" y2="300" stroke="#ff6433" strokeWidth="2" strokeOpacity="0.85" />
                <line x1="440" y1="300" x2={centerPos.x} y2={centerPos.y} stroke="#ff6433" strokeWidth="2" strokeOpacity="0.95" />
              </g>
            )}

            {/* ── Central Synthesis Core (Convergence Node) ── */}
            <g className="wb-synthesis-node" transform={`translate(${centerPos.x}, ${centerPos.y})`}>
              <circle r="46" fill="#181b20" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
              <circle r="38" fill="url(#wb-center-glow)" />
              <circle r="38" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Concentric core crosshairs */}
              <line x1="-12" y1="0" x2="12" y2="0" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <circle r="4" fill="#ffffff" />

              <text
                y="-14"
                textAnchor="middle"
                fill="#ffffff"
                fontFamily="var(--font-mono, monospace)"
                fontSize="10.5"
                letterSpacing="1.8"
                fontWeight="bold"
              >
                SYNTHESIS
              </text>
              <text
                y="20"
                textAnchor="middle"
                fill="#cbd5e1"
                fontFamily="var(--font-mono, monospace)"
                fontSize="9.5"
                letterSpacing="0.8"
                fontWeight="600"
              >
                SECURE · SCALE · AUTOMATE
              </text>
            </g>

            {/* ── Four Corner Discipline Nodes ── */}
            {DISCIPLINE_KEYS.map((key) => {
              const item = DISCIPLINES[key]
              const isSelected = activeDiscipline === key
              const isNodeHover = isHovered === key
              const { x, y } = item.coordinates
              const accentColor = item.id === 'fullstack' || item.id === 'automation' ? '#ff6433' : '#087f73'

              return (
                <g
                  key={key}
                  className={`wb-node-group ${isSelected ? 'active' : ''} ${isNodeHover ? 'hovered' : ''}`}
                  onClick={() => selectDiscipline(key)}
                  onPointerEnter={() => setIsHovered(key)}
                  onPointerLeave={() => setIsHovered(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer pulse indicator on selection */}
                  {isSelected && (
                    <circle
                      cx={x}
                      cy={y}
                      r="36"
                      fill="none"
                      stroke={accentColor}
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                    />
                  )}

                  {/* Main Node Disc */}
                  <circle
                    cx={x}
                    cy={y}
                    r="28"
                    fill={isSelected ? '#20252e' : '#181b20'}
                    stroke={isSelected ? accentColor : 'rgba(255,255,255,0.22)'}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                  />

                  {/* Internal status ring */}
                  <circle
                    cx={x}
                    cy={y}
                    r="18"
                    fill="none"
                    stroke={isSelected ? accentColor : 'rgba(255,255,255,0.1)'}
                    strokeWidth="1"
                    strokeDasharray={isSelected ? '2 2' : undefined}
                  />

                  {/* Number identifier badge */}
                  <text
                    x={x}
                    y={y + 4.5}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : '#cbd5e1'}
                    fontFamily="var(--font-mono, monospace)"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {item.number}
                  </text>

                  {/* Node Label Annotation - Enhanced Readability */}
                  <text
                    x={x}
                    y={y + (y < 200 ? -36 : 46)}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : '#cbd5e1'}
                    fontFamily="var(--font-mono, monospace)"
                    fontSize="11"
                    letterSpacing="1"
                    fontWeight={isSelected ? 'bold' : '600'}
                  >
                    {item.shortLabel.toUpperCase()}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* ── Contextual Engineering Dossier Card (Fixed ARIA relationship) ── */}
      <div
        id="workbench-panel"
        role="tabpanel"
        aria-labelledby={`workbench-tab-${active.id}`}
        className="wb-dossier-card"
      >
        <div className="wb-dossier-header">
          <div className="wb-dossier-badge-row">
            <span
              className="wb-dossier-tag"
              style={{
                borderColor: active.id === 'fullstack' || active.id === 'automation' ? 'var(--orange)' : 'var(--teal)',
                color: active.id === 'fullstack' || active.id === 'automation' ? 'var(--orange)' : 'var(--teal)',
              }}
            >
              {active.number} // {active.label.toUpperCase()}
            </span>
            <span className="wb-dossier-meta">{active.tagline}</span>
          </div>
          <h3 className="wb-dossier-title">{active.label}</h3>
        </div>

        {/* Philosophy Block */}
        <p className="wb-dossier-philosophy">{active.philosophy}</p>

        {/* Cross-Discipline Connectors (The Handshake) */}
        <div className="wb-handshake-section">
          <h4 className="wb-handshake-title">
            <Workflow className="w-3.5 h-3.5 inline mr-1.5 text-[var(--orange)]" />
            Cross-Discipline Synthesis:
          </h4>
          <ul className="wb-handshake-list">
            {active.handshake.map((h, i) => (
              <li key={i} className="wb-handshake-item">
                <span className="wb-handshake-target">With {h.target}:</span>
                <span className="wb-handshake-detail">{h.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Chips */}
        <div className="wb-stack-row" aria-label="Key technologies">
          {active.stack.map((tech) => (
            <span key={tech} className="wb-stack-pill">
              {tech}
            </span>
          ))}
        </div>

        {/* Grounded Project Reference & Case Study Link */}
        <div className="wb-dossier-footer">
          <div className="wb-case-ref">
            <span className="wb-ref-label">Verified Case Reference:</span>
            <strong className="wb-ref-title">{active.caseStudy.title}</strong>
            <p className="wb-ref-summary">{active.caseStudy.summary}</p>
          </div>
          <Link href={`/work/${active.caseStudy.slug}`} className="wb-case-link">
            <span>Read Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
