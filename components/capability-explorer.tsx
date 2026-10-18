'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, Layers } from 'lucide-react'
import {
  InfrastructureIcon,
  CybersecurityIcon,
  SoftwareIcon,
  AutomationIcon,
} from '@/components/icons'

type PillarId = 'infrastructure' | 'cybersecurity' | 'software' | 'automation'

interface PillarData {
  id: PillarId
  number: string
  title: string
  headline: string
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
  accentColor: string
  overview: string
  architecturalPrinciples: string[]
  coreSkills: string[]
  specializedTools: string[]
  linkedProjects: Array<{ title: string; slug: string; tag: string }>
  proofMetric: { value: string; label: string }
}

const pillars: PillarData[] = [
  {
    id: 'infrastructure',
    number: '01',
    title: 'Infrastructure & Cloud',
    headline: 'Reliable connectivity from the rack to the cloud.',
    icon: InfrastructureIcon,
    accentColor: 'var(--teal)',
    overview:
      'Designing and operating dependable multi-site systems. Spanning physical structured cabling, switch provisioning, VLAN segmentation, branch WAN/MPLS routing, and enterprise Microsoft 365 / Entra ID cloud administration.',
    architecturalPrinciples: [
      'Isolated VLAN zones (PCI-DSS compliant POS networks separated from staff LAN and guest traffic)',
      'High-availability gateway routing with redundant failover and IPSec site-to-site VPN tunnels',
      'Auditable structured cabling and rack management documentation across multi-branch retail sites',
      'Centralized cloud identity lifecycle management via Microsoft Entra ID and RBAC policies',
    ],
    coreSkills: [
      'Cisco & Huawei Switching',
      'VLAN Segmentation (802.1Q)',
      'MPLS & Site-to-Site VPN',
      'Microsoft 365 & Entra ID',
      'Active Directory & Group Policy',
      'DNS / DHCP & Subnetting',
      'Structured Cabling & Rack Audits',
      'POS & VoIP Network QoS',
    ],
    specializedTools: ['Ubiquiti UniFi', 'TP-Link Omada', 'Windows Server', 'Linux Admin', 'Hikvision CCTV'],
    linkedProjects: [
      {
        title: 'Enterprise Infrastructure & Network Deployment',
        slug: 'enterprise-network-deployment',
        tag: 'Infrastructure Case Study',
      },
    ],
    proofMetric: {
      value: '200+',
      label: 'managed IT assets & 100+ distributed endpoints supported across multiple locations',
    },
  },
  {
    id: 'cybersecurity',
    number: '02',
    title: 'Cybersecurity & Defense',
    headline: 'Practical security for real business risks.',
    icon: CybersecurityIcon,
    accentColor: 'var(--orange)',
    overview:
      'Defensive engineering, vulnerability assessment, endpoint detection, and active academic research into Coordinated Vulnerability Disclosure (CVD) within digital financial systems.',
    architecturalPrinciples: [
      'Defense-in-depth perimeter filtering with pfSense and inline Suricata signature matching',
      'Centralized SIEM telemetry, File Integrity Monitoring (FIM), and log aggregation via Wazuh',
      'Threat behavior mapping against MITRE ATT&CK enterprise tactics, techniques, and procedures (TTPs)',
      'Empirical vulnerability management and responsible disclosure governance in mobile financial ecosystems',
    ],
    coreSkills: [
      'Wazuh SIEM & Log Decoders',
      'Suricata NIDS / IPS',
      'pfSense Firewall Architecture',
      'MITRE ATT&CK Mapping',
      'Vulnerability Assessment',
      'Incident Response Runbooks',
      'Security Hardening & BitLocker',
      'Coordinated Vulnerability Disclosure',
    ],
    specializedTools: ['Linux Auditd', 'Sysmon', 'Wireshark', 'EDR Telemetry', 'GRC Frameworks'],
    linkedProjects: [
      {
        title: 'Cybersecurity Monitoring Lab',
        slug: 'cybersecurity-monitoring-lab',
        tag: 'Security Engineering Case Study',
      },
      {
        title: 'SheriaBot Compliance Intelligence',
        slug: 'sheriabot',
        tag: 'Fintech RegTech Platform',
      },
    ],
    proofMetric: {
      value: '30%',
      label: 'reduction in security incidents through proactive hardening and automated endpoint detection',
    },
  },
  {
    id: 'software',
    number: '03',
    title: 'Software Engineering',
    headline: 'Production web applications built to last.',
    icon: SoftwareIcon,
    accentColor: 'var(--ink)',
    overview:
      'Full-stack engineering combining modern React and Next.js architectures with clean TypeScript typing, relational PostgreSQL data stores, secure API backends, and maintainable frontend user experiences.',
    architecturalPrinciples: [
      'Strict TypeScript contracts across data fetching, UI state, and database models',
      'Server-driven architecture with Next.js App Router for optimal performance and SEO pre-rendering',
      'Relational database modeling with PostgreSQL, indexing, migrations, and transactional integrity',
      'Secure authentication, session management, and fine-grained role-based access control (RBAC)',
    ],
    coreSkills: [
      'TypeScript & Modern JavaScript',
      'Next.js 16 (App Router & SSG)',
      'React 19 & State Primitives',
      'PostgreSQL & Relational Schema',
      'REST API Design & Fastify/Node',
      'Tailwind CSS & Design Tokens',
      'Git Version Control & CI/CD',
      'Responsive Web Architecture',
    ],
    specializedTools: ['Prisma ORM', 'Vercel Platform', 'Docker', 'Postman', 'Shadcn Primitives'],
    linkedProjects: [
      { title: 'SheriaBot Regulatory Intelligence', slug: 'sheriabot', tag: 'Flagship SaaS' },
      { title: 'Adek Tatu', slug: 'adek-tatu', tag: 'Client Website' },
      { title: 'Kolwa Beba SACCO', slug: 'kolwa-beba-sacco', tag: 'Financial Portal' },
    ],
    proofMetric: {
      value: '100%',
      label: 'pre-rendered static routes and responsive client interfaces across production deployments',
    },
  },
  {
    id: 'automation',
    number: '04',
    title: 'AI & Workflow Automation',
    headline: 'Automate the repetitive. Keep people in control.',
    icon: AutomationIcon,
    accentColor: 'var(--teal)',
    overview:
      'Connecting fragmented systems through event-driven workflows, asynchronous webhooks, and Python/Bash automation. Embedding LLM retrieval workflows with strict citation sourcing and human-in-the-loop review.',
    architecturalPrinciples: [
      'Decoupled event triggers (webhooks, cron timers, API changes) with automated error retry queues',
      'Python and Bash worker scripts for data sanitization, schema validation, and file processing',
      'Human-in-the-loop checkpoints: sensitive financial and regulatory actions require explicit approval signoff',
      'Immutable audit logs tracking workflow execution state, inputs, outputs, and system changes',
    ],
    coreSkills: [
      'n8n Workflow Engineering',
      'Python Automation Scripting',
      'Bash / Shell Automation',
      'LLM Prompt Pipelines & RAG',
      'REST API Integration',
      'Human-in-the-Loop Signoffs',
      'Audit Logging & Error Resiliency',
      'Webhook Ingestion Architecture',
    ],
    specializedTools: ['PostgreSQL Auditing', 'Slack/Telegram Webhooks', 'OpenAI API', 'cURL / Requests'],
    linkedProjects: [
      {
        title: 'Automation & Workflow Engineering',
        slug: 'automation-workflow-engineering',
        tag: 'Automation Case Study',
      },
      {
        title: 'SheriaBot Regulatory Retrieval',
        slug: 'sheriabot',
        tag: 'AI Retrieval Engine',
      },
    ],
    proofMetric: {
      value: '25%',
      label: 'faster incident triage and operational task resolution via automated notification pipelines',
    },
  },
]

export function CapabilityExplorer() {
  const [selectedPillarId, setSelectedPillarId] = useState<PillarId>('infrastructure')
  const activePillar = pillars.find((p) => p.id === selectedPillarId) || pillars[0]

  return (
    <section id="capabilities" className="capabilities-section section-pad ruled-section" aria-labelledby="cap-title">
      <div className="section-label" aria-hidden="true">
        <span>02</span>
        <span>Engineering Capabilities</span>
      </div>

      <div className="capabilities-header">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Core Disciplines
          </p>
          <h2 id="cap-title">
            The four pillars of
            <br />
            <em>dependable technology.</em>
          </h2>
        </div>
        <p className="capabilities-header-desc">
          Modern systems don&apos;t fail in isolation. True technical reliability requires proficiency across
          the entire lifecycle: physical networks, defensive security, application code, and intelligent automation.
        </p>
      </div>

      {/* ── Central Connected Systems Switchboard Diagram ── */}
      <div className="systems-switchboard-wrap" aria-label="Interactive systems architecture switchboard">
        <div className="switchboard-header-row">
          <span className="switchboard-title">INTEGRATED ARCHITECTURAL BUS // SELECT NODE TO INSPECT</span>
          <span className="switchboard-status">ACTIVE: {activePillar.title.toUpperCase()}</span>
        </div>

        <svg
          viewBox="0 0 800 280"
          className="switchboard-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Systems topology showing interconnects between Infrastructure, Security, Software, and Automation"
        >
          {/* Background Bus Grid */}
          <line x1="140" y1="80" x2="660" y2="80" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="140" y1="200" x2="660" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="140" y1="80" x2="140" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="660" y1="80" x2="660" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="140" y1="80" x2="660" y2="200" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="140" y1="200" x2="660" y2="80" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" />

          {/* Active Highlighted Buses based on selected pillar */}
          {selectedPillarId === 'infrastructure' && (
            <>
              <line x1="140" y1="80" x2="660" y2="80" stroke="var(--teal)" strokeWidth="2.5" className="switchboard-active-line" />
              <line x1="140" y1="80" x2="140" y2="200" stroke="var(--teal)" strokeWidth="2.5" className="switchboard-active-line" />
              <circle cx="400" cy="80" r="3" fill="var(--teal)" className="switchboard-pulse-dot" />
            </>
          )}

          {selectedPillarId === 'cybersecurity' && (
            <>
              <line x1="140" y1="80" x2="660" y2="80" stroke="var(--orange)" strokeWidth="2.5" className="switchboard-active-line" />
              <line x1="660" y1="80" x2="660" y2="200" stroke="var(--orange)" strokeWidth="2.5" className="switchboard-active-line" />
              <circle cx="660" cy="140" r="3.5" fill="var(--orange)" className="switchboard-pulse-dot" />
            </>
          )}

          {selectedPillarId === 'software' && (
            <>
              <line x1="140" y1="80" x2="140" y2="200" stroke="var(--white)" strokeWidth="2.5" className="switchboard-active-line" />
              <line x1="140" y1="200" x2="660" y2="200" stroke="var(--white)" strokeWidth="2.5" className="switchboard-active-line" />
              <circle cx="400" cy="200" r="3" fill="var(--white)" className="switchboard-pulse-dot" />
            </>
          )}

          {selectedPillarId === 'automation' && (
            <>
              <line x1="140" y1="200" x2="660" y2="200" stroke="var(--teal)" strokeWidth="2.5" className="switchboard-active-line" />
              <line x1="660" y1="80" x2="660" y2="200" stroke="var(--teal)" strokeWidth="2.5" className="switchboard-active-line" />
              <circle cx="530" cy="200" r="3" fill="var(--teal)" className="switchboard-pulse-dot" />
            </>
          )}

          {/* Interactive Node 01: Infrastructure (Top Left) */}
          <g
            className={`switchboard-interactive-node ${selectedPillarId === 'infrastructure' ? 'node-active' : ''}`}
            onClick={() => setSelectedPillarId('infrastructure')}
            role="button"
            tabIndex={0}
            aria-label="Inspect Infrastructure & Cloud"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setSelectedPillarId('infrastructure')
              }
            }}
          >
            <rect x="70" y="52" width="140" height="56" rx="4" className="node-bg" />
            <text x="140" y="74" textAnchor="middle" className="node-title">01 INFRASTRUCTURE</text>
            <text x="140" y="92" textAnchor="middle" className="node-sub">NETWORKS &bull; ENTRA ID</text>
          </g>

          {/* Interactive Node 02: Cybersecurity (Top Right) */}
          <g
            className={`switchboard-interactive-node ${selectedPillarId === 'cybersecurity' ? 'node-active' : ''}`}
            onClick={() => setSelectedPillarId('cybersecurity')}
            role="button"
            tabIndex={0}
            aria-label="Inspect Cybersecurity & Defense"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setSelectedPillarId('cybersecurity')
              }
            }}
          >
            <rect x="590" y="52" width="140" height="56" rx="4" className="node-bg" />
            <text x="660" y="74" textAnchor="middle" className="node-title">02 CYBERSECURITY</text>
            <text x="660" y="92" textAnchor="middle" className="node-sub">SIEM &bull; MITRE &bull; CVD</text>
          </g>

          {/* Interactive Node 03: Software (Bottom Left) */}
          <g
            className={`switchboard-interactive-node ${selectedPillarId === 'software' ? 'node-active' : ''}`}
            onClick={() => setSelectedPillarId('software')}
            role="button"
            tabIndex={0}
            aria-label="Inspect Software Engineering"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setSelectedPillarId('software')
              }
            }}
          >
            <rect x="70" y="172" width="140" height="56" rx="4" className="node-bg" />
            <text x="140" y="194" textAnchor="middle" className="node-title">03 SOFTWARE ENG</text>
            <text x="140" y="212" textAnchor="middle" className="node-sub">NEXT.JS &bull; POSTGRES</text>
          </g>

          {/* Interactive Node 04: Automation (Bottom Right) */}
          <g
            className={`switchboard-interactive-node ${selectedPillarId === 'automation' ? 'node-active' : ''}`}
            onClick={() => setSelectedPillarId('automation')}
            role="button"
            tabIndex={0}
            aria-label="Inspect AI & Workflow Automation"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setSelectedPillarId('automation')
              }
            }}
          >
            <rect x="590" y="172" width="140" height="56" rx="4" className="node-bg" />
            <text x="660" y="194" textAnchor="middle" className="node-title">04 AI &bull; AUTOMATION</text>
            <text x="660" y="212" textAnchor="middle" className="node-sub">N8N &bull; RAG &bull; PYTHON</text>
          </g>
        </svg>
      </div>

      {/* 4-Pillar Tab Buttons (Synchronized) */}
      <div className="pillar-tabs" role="tablist" aria-label="Engineering capability pillars">
        {pillars.map((pillar) => {
          const isSelected = pillar.id === selectedPillarId
          const Icon = pillar.icon
          return (
            <button
              key={pillar.id}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`pillar-panel-${pillar.id}`}
              id={`pillar-tab-${pillar.id}`}
              className={`pillar-tab-btn${isSelected ? ' active' : ''}`}
              onClick={() => setSelectedPillarId(pillar.id)}
            >
              <div className="pillar-tab-top">
                <span className="pillar-number">{pillar.number}</span>
                <Icon className="pillar-icon" aria-hidden="true" />
              </div>
              <strong className="pillar-tab-title">{pillar.title}</strong>
              <span className="pillar-tab-indicator" aria-hidden="true" />
            </button>
          )
        })}
      </div>

      {/* Active Pillar Deep-Dive Panel */}
      <div
        id={`pillar-panel-${activePillar.id}`}
        role="tabpanel"
        aria-labelledby={`pillar-tab-${activePillar.id}`}
        className="pillar-detail-card"
      >
        <div className="pillar-detail-head">
          <div>
            <span className="pillar-detail-eyebrow">
              PILLAR {activePillar.number} &bull; {activePillar.title.toUpperCase()}
            </span>
            <h3 className="pillar-detail-headline">&ldquo;{activePillar.headline}&rdquo;</h3>
          </div>
          <div className="pillar-stat-chip">
            <span className="stat-chip-val">{activePillar.proofMetric.value}</span>
            <span className="stat-chip-lbl">{activePillar.proofMetric.label}</span>
          </div>
        </div>

        <p className="pillar-overview">{activePillar.overview}</p>

        <div className="pillar-detail-grid">
          {/* Architectural Principles */}
          <div className="pillar-col">
            <h4 className="pillar-col-title">Architectural Principles</h4>
            <ul className="pillar-principles-list">
              {activePillar.architecturalPrinciples.map((item, idx) => (
                <li key={idx}>
                  <CheckCircle2 className="w-4 h-4 text-[var(--teal)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Authentic Technical Competencies */}
          <div className="pillar-col">
            <h4 className="pillar-col-title">Core Competencies &amp; Protocols</h4>
            <div className="pillar-skills-wrap">
              {activePillar.coreSkills.map((skill) => (
                <span key={skill} className="skill-chip">
                  {skill}
                </span>
              ))}
            </div>

            <h5 className="pillar-sub-title">Tools &amp; Environment</h5>
            <div className="pillar-tools-wrap">
              {activePillar.specializedTools.map((tool) => (
                <span key={tool} className="tool-chip">
                  {tool}
                </span>
              ))}
            </div>

            {/* Linked Projects */}
            <div className="pillar-linked-projects">
              <h5 className="pillar-sub-title">Demonstrated In Project Work:</h5>
              <div className="pillar-links-row">
                {activePillar.linkedProjects.map((proj) => (
                  <Link key={proj.slug} href={`/work/${proj.slug}`} className="pillar-project-link">
                    <span>{proj.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 arrow-shift" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
