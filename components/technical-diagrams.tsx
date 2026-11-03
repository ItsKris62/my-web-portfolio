import React from 'react'

/**
 * Authentic, native SVG technical illustrations for projects without live screenshots.
 * Clearly labeled conceptual/architectural diagrams without fabricated telemetry.
 * All text optimized for mobile readability (minimum 10.5px) and high-contrast rendering.
 */

export function NetworkDeploymentDiagram({ className }: { className?: string }) {
  return (
    <div className={`tech-diagram-wrap ${className || ''}`} aria-label="Enterprise Network Deployment Architecture Diagram">
      <svg
        viewBox="0 0 600 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto select-none"
        role="img"
      >
        <rect width="600" height="360" rx="6" fill="#181b20" />
        <defs>
          <pattern id="net-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
          <linearGradient id="net-accent" x1="0" y1="0" x2="600" y2="360" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff6433" stopOpacity="0.15" />
            <stop offset="1" stopColor="#087f73" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect width="600" height="360" fill="url(#net-grid)" />
        <rect width="600" height="360" fill="url(#net-accent)" />

        {/* Diagram Header */}
        <text x="32" y="38" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="11.5" letterSpacing="1.2">
          TOPOLOGY // ENTERPRISE MULTI-SITE LAN/WAN &amp; VLAN SEGMENTATION
        </text>
        <text x="568" y="38" textAnchor="end" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          CONCEPTUAL ARCHITECTURE
        </text>
        <line x1="32" y1="48" x2="568" y2="48" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        {/* WAN / ISP Gateway */}
        <rect x="210" y="68" width="180" height="46" rx="4" fill="#1f2329" stroke="#ff6433" strokeWidth="1.5" />
        <text x="300" y="87" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="12.5" fontWeight="600">
          WAN Gateway / Router
        </text>
        <text x="300" y="104" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          MPLS &amp; IPSec VPN Tunnel
        </text>

        {/* Bus Connection */}
        <line x1="300" y1="114" x2="300" y2="148" stroke="#ff6433" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Core Managed Switch */}
        <rect x="170" y="148" width="260" height="46" rx="4" fill="#1f2329" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <text x="300" y="167" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="12.5" fontWeight="600">
          Core Managed Switch (L2/L3)
        </text>
        <text x="300" y="184" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          802.1Q Trunking · DHCP Snooping · STP
        </text>

        {/* Trunk branches to VLAN Segments */}
        <path d="M 300 194 L 300 216 M 110 216 L 490 216" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="110" y1="216" x2="110" y2="238" stroke="#087f73" strokeWidth="1.5" />
        <line x1="300" y1="216" x2="300" y2="238" stroke="#ff6433" strokeWidth="1.5" />
        <line x1="490" y1="216" x2="490" y2="238" stroke="#087f73" strokeWidth="1.5" />

        {/* VLAN 10: POS Isolated */}
        <rect x="35" y="238" width="150" height="76" rx="4" fill="#1f2329" stroke="#ff6433" strokeWidth="1.2" />
        <text x="110" y="258" textAnchor="middle" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          VLAN 10 // POS NETWORK
        </text>
        <text x="110" y="278" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Isolated PCI-DSS Zone
        </text>
        <text x="110" y="296" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          POS Terminals &amp; Printers
        </text>

        {/* VLAN 20: Corporate LAN */}
        <rect x="225" y="238" width="150" height="76" rx="4" fill="#1f2329" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        <text x="300" y="258" textAnchor="middle" fill="#cbd5e1" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          VLAN 20 // CORP LAN
        </text>
        <text x="300" y="278" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Staff Workstations
        </text>
        <text x="300" y="296" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          AD &amp; Internal Servers
        </text>

        {/* VLAN 30: Branch Wi-Fi / VoIP */}
        <rect x="415" y="238" width="150" height="76" rx="4" fill="#1f2329" stroke="#087f73" strokeWidth="1.2" />
        <text x="490" y="258" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          VLAN 30 // VOIP &amp; GUEST
        </text>
        <text x="490" y="278" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Voice &amp; Guest Wi-Fi
        </text>
        <text x="490" y="296" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          QoS Traffic Prioritization
        </text>

        {/* Diagram Footer */}
        <text x="300" y="340" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          SECURE PERIMETER · SEGMENTED SUBNETS · VERIFIED PHYSICAL CABLING
        </text>
      </svg>
    </div>
  )
}

export function CybersecurityLabDiagram({ className }: { className?: string }) {
  return (
    <div className={`tech-diagram-wrap ${className || ''}`} aria-label="Cybersecurity Monitoring Lab Topology Diagram">
      <svg
        viewBox="0 0 600 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto select-none"
        role="img"
      >
        <rect width="600" height="360" rx="6" fill="#181b20" />
        <defs>
          <pattern id="sec-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
          <linearGradient id="sec-accent" x1="0" y1="0" x2="600" y2="360" gradientUnits="userSpaceOnUse">
            <stop stopColor="#087f73" stopOpacity="0.15" />
            <stop offset="1" stopColor="#ff6433" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <rect width="600" height="360" fill="url(#sec-grid)" />
        <rect width="600" height="360" fill="url(#sec-accent)" />

        {/* Diagram Header */}
        <text x="32" y="38" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="11.5" letterSpacing="1.2">
          LAB // SECURITY OBSERVABILITY &amp; INCIDENT SIMULATION
        </text>
        <text x="568" y="38" textAnchor="end" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          LAB ENVIRONMENT
        </text>
        <line x1="32" y1="48" x2="568" y2="48" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        {/* Left Column: Attack / Test VMs */}
        <rect x="35" y="75" width="155" height="150" rx="4" fill="#1f2329" stroke="#ff6433" strokeWidth="1.2" />
        <text x="112" y="98" textAnchor="middle" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          01 // TELEMETRY SOURCES
        </text>
        <rect x="45" y="112" width="135" height="32" rx="3" fill="#181b20" stroke="rgba(255,255,255,0.08)" />
        <text x="112" y="132" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Linux Syslog &amp; Auditd
        </text>
        <rect x="45" y="152" width="135" height="32" rx="3" fill="#181b20" stroke="rgba(255,255,255,0.08)" />
        <text x="112" y="172" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Snort / Suricata IDS
        </text>
        <rect x="45" y="192" width="135" height="24" rx="3" fill="#181b20" stroke="rgba(255,255,255,0.08)" />
        <text x="112" y="208" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          PCAP Network Tap
        </text>

        {/* Arrow to Ingestion */}
        <line x1="190" y1="150" x2="222" y2="150" stroke="#087f73" strokeWidth="1.5" strokeDasharray="3 3" />
        <polygon points="222,147 228,150 222,153" fill="#087f73" />

        {/* Center: Ingestion & Analysis Engine */}
        <rect x="228" y="75" width="165" height="150" rx="4" fill="#1f2329" stroke="#087f73" strokeWidth="1.5" />
        <text x="310" y="98" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          02 // LOG INGEST &amp; SIEM
        </text>
        <rect x="238" y="112" width="145" height="32" rx="3" fill="#181b20" stroke="rgba(255,255,255,0.08)" />
        <text x="310" y="132" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Wazuh / ELK Stack
        </text>
        <rect x="238" y="152" width="145" height="32" rx="3" fill="#181b20" stroke="rgba(255,255,255,0.08)" />
        <text x="310" y="172" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Sigma Detection Rules
        </text>
        <rect x="238" y="192" width="145" height="24" rx="3" fill="#181b20" stroke="rgba(255,255,255,0.08)" />
        <text x="310" y="208" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Event Correlation Engine
        </text>

        {/* Arrow to Dashboard */}
        <line x1="393" y1="150" x2="425" y2="150" stroke="#087f73" strokeWidth="1.5" strokeDasharray="3 3" />
        <polygon points="425,147 431,150 425,153" fill="#087f73" />

        {/* Right Column: Visualization & Alerts */}
        <rect x="431" y="75" width="140" height="150" rx="4" fill="#1f2329" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        <text x="501" y="98" textAnchor="middle" fill="#cbd5e1" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          03 // SOC TRIAGE
        </text>
        <rect x="441" y="112" width="120" height="32" rx="3" fill="#181b20" stroke="rgba(255,255,255,0.08)" />
        <text x="501" y="132" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Kibana Dashboards
        </text>
        <rect x="441" y="152" width="120" height="32" rx="3" fill="#181b20" stroke="rgba(255,255,255,0.08)" />
        <text x="501" y="172" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Alert Thresholds
        </text>
        <rect x="441" y="192" width="120" height="24" rx="3" fill="#181b20" stroke="rgba(255,255,255,0.08)" />
        <text x="501" y="208" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Incident Playbooks
        </text>

        {/* Bottom Banner: Detection Capabilities */}
        <rect x="35" y="244" width="536" height="52" rx="4" fill="#14171c" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <text x="50" y="266" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          ATTACK SCENARIOS SIMULATED &amp; VALIDATED:
        </text>
        <text x="50" y="284" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          SSH Brute-Force · Port Scans · Web Directory Traversal · Privilege Escalation Signals
        </text>

        {/* Diagram Footer */}
        <text x="300" y="336" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          CONTROLLED ISOLATED LAB · PRACTICAL SOC OBSERVABILITY · ZERO FABRICATED DATA
        </text>
      </svg>
    </div>
  )
}

export function AutomationWorkflowDiagram({ className }: { className?: string }) {
  return (
    <div className={`tech-diagram-wrap ${className || ''}`} aria-label="Automation Workflow Engineering Architecture Diagram">
      <svg
        viewBox="0 0 600 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto select-none"
        role="img"
      >
        <rect width="600" height="360" rx="6" fill="#181b20" />
        <defs>
          <pattern id="auto-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
          <linearGradient id="auto-accent" x1="0" y1="0" x2="600" y2="360" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff6433" stopOpacity="0.12" />
            <stop offset="0.6" stopColor="#087f73" stopOpacity="0.12" />
            <stop offset="1" stopColor="#181b20" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <rect width="600" height="360" fill="url(#auto-grid)" />
        <rect width="600" height="360" fill="url(#auto-accent)" />

        {/* Diagram Header */}
        <text x="32" y="38" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="11.5" letterSpacing="1.2">
          PIPELINE // SECURE WEBHOOK INGEST &amp; EVENT-DRIVEN DISPATCH
        </text>
        <text x="568" y="38" textAnchor="end" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          PRODUCTION PATTERN
        </text>
        <line x1="32" y1="48" x2="568" y2="48" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        {/* Stage 1: Ingress */}
        <rect x="35" y="70" width="118" height="162" rx="4" fill="#1f2329" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <text x="94" y="94" textAnchor="middle" fill="#cbd5e1" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          01 // INGRESS
        </text>
        <rect x="43" y="108" width="102" height="36" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="94" y="125" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Client Apps
        </text>
        <text x="94" y="137" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          HTTPS Webhooks
        </text>
        <rect x="43" y="152" width="102" height="36" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="94" y="169" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Third-Party APIs
        </text>
        <text x="94" y="181" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Stripe · Formspree
        </text>

        {/* Arrow 1 to 2 */}
        <line x1="153" y1="151" x2="173" y2="151" stroke="#ff6433" strokeWidth="1.5" />
        <polygon points="173,148 179,151 173,154" fill="#ff6433" />

        {/* Stage 2: Security & Validation */}
        <rect x="179" y="70" width="124" height="162" rx="4" fill="#1f2329" stroke="#ff6433" strokeWidth="1.2" />
        <text x="241" y="94" textAnchor="middle" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          02 // SECURITY
        </text>
        <rect x="187" y="108" width="108" height="36" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="241" y="125" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          HMAC-SHA256
        </text>
        <text x="241" y="137" textAnchor="middle" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Signature Verified
        </text>
        <rect x="187" y="152" width="108" height="36" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="241" y="169" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Zod Schema
        </text>
        <text x="241" y="181" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Payload Validated
        </text>

        {/* Arrow 2 to 3 */}
        <line x1="303" y1="151" x2="323" y2="151" stroke="#087f73" strokeWidth="1.5" />
        <polygon points="323,148 329,151 323,154" fill="#087f73" />

        {/* Stage 3: Queue & Resiliency */}
        <rect x="329" y="70" width="124" height="162" rx="4" fill="#1f2329" stroke="#087f73" strokeWidth="1.2" />
        <text x="391" y="94" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          03 // RESILIENCY
        </text>
        <rect x="337" y="108" width="108" height="36" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="391" y="125" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Idempotency Key
        </text>
        <text x="391" y="137" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Redis Deduplication
        </text>
        <rect x="337" y="152" width="108" height="36" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="391" y="169" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Exponential Retry
        </text>
        <text x="391" y="181" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Dead-Letter Queue
        </text>

        {/* Arrow 3 to 4 */}
        <line x1="453" y1="151" x2="473" y2="151" stroke="#087f73" strokeWidth="1.5" />
        <polygon points="473,148 479,151 473,154" fill="#087f73" />

        {/* Stage 4: Dispatch */}
        <rect x="479" y="70" width="94" height="162" rx="4" fill="#1f2329" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <text x="526" y="94" textAnchor="middle" fill="#cbd5e1" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          04 // SINK
        </text>
        <rect x="485" y="108" width="82" height="36" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="526" y="125" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          PostgreSQL
        </text>
        <text x="526" y="137" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Audit Ledger
        </text>
        <rect x="485" y="152" width="82" height="36" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="526" y="169" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Slack / Email
        </text>
        <text x="526" y="181" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Alert Dispatch
        </text>

        {/* Bottom Bar: Operational Highlights */}
        <rect x="35" y="248" width="538" height="48" rx="4" fill="#14171c" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <text x="50" y="270" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          FAILURE HANDLING:
        </text>
        <text x="175" y="270" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Transient network drops auto-retry · Non-2xx sent to Dead-Letter Queue
        </text>
        <text x="50" y="286" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          AUDIT LOG:
        </text>
        <text x="135" y="286" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Immutable event log with trace IDs for zero dropped requests
        </text>

        {/* Diagram Footer */}
        <text x="300" y="336" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          FAULT-TOLERANT ARCHITECTURE · ZERO MESSAGE LOSS · REAL-WORLD INTEGRATION PATTERN
        </text>
      </svg>
    </div>
  )
}

export function RentWorksDiagram({ className }: { className?: string }) {
  return (
    <div className={`tech-diagram-wrap ${className || ''}`} aria-label="RentWorks East Africa Website Architecture & SEO Diagram">
      <svg
        viewBox="0 0 600 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto select-none"
        role="img"
      >
        <rect width="600" height="360" rx="6" fill="#181b20" />
        <defs>
          <pattern id="rw-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
          <linearGradient id="rw-accent" x1="0" y1="0" x2="600" y2="360" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff6433" stopOpacity="0.14" />
            <stop offset="0.5" stopColor="#087f73" stopOpacity="0.1" />
            <stop offset="1" stopColor="#181b20" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <rect width="600" height="360" fill="url(#rw-grid)" />
        <rect width="600" height="360" fill="url(#rw-accent)" />

        {/* Diagram Header */}
        <text x="32" y="34" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="11.5" letterSpacing="1.2">
          ARCHITECTURE // RENTWORKS EAST AFRICA
        </text>
        <text x="568" y="34" textAnchor="end" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          CORPORATE WEB &amp; SEO
        </text>
        <line x1="32" y1="44" x2="568" y2="44" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        {/* Browser URL Chassis Bar */}
        <rect x="32" y="54" width="536" height="34" rx="4" fill="#14171c" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
        <circle cx="48" cy="71" r="3.5" fill="#ff6433" opacity="0.85" />
        <circle cx="60" cy="71" r="3.5" fill="#e5a93c" opacity="0.85" />
        <circle cx="72" cy="71" r="3.5" fill="#087f73" opacity="0.85" />

        {/* URL Pill */}
        <rect x="88" y="60" width="310" height="22" rx="3" fill="#1b1f26" stroke="rgba(255,255,255,0.08)" />
        {/* Padlock icon representation */}
        <rect x="98" y="66" width="7" height="9" rx="1.5" fill="#087f73" />
        <path d="M 99.5 66 V 64 C 99.5 62.6 100.6 61.5 101.5 61.5 C 102.4 61.5 103.5 62.6 103.5 64 V 66" stroke="#087f73" strokeWidth="1" fill="none" />
        <text x="112" y="75" fill="#fcfcfa" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          https://rentworks.co.ke
        </text>
        <text x="554" y="75" textAnchor="end" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="10" fontWeight="bold">
          LIVE CLIENT PLATFORM
        </text>

        {/* Column 1: Asset Portfolios & Solutions (Completed) */}
        <rect x="32" y="100" width="166" height="212" rx="5" fill="#1c2026" stroke="#ff6433" strokeWidth="1.2" />
        <text x="115" y="122" textAnchor="middle" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          01 // LEASING SERVICES
        </text>

        {/* Sub-card 1: IT Equipment */}
        <rect x="42" y="132" width="146" height="50" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="52" y="151" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="12" fontWeight="600">
          Workplace &amp; IT Tech
        </text>
        <text x="52" y="169" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Laptops · Servers · Networks
        </text>

        {/* Sub-card 2: Healthcare & Fleet */}
        <rect x="42" y="190" width="146" height="50" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="52" y="209" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="12" fontWeight="600">
          Medical &amp; Vehicles
        </text>
        <text x="52" y="227" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Clinical Tools · Fleet Assets
        </text>

        {/* Sub-card 3: Commercial Finance */}
        <rect x="42" y="248" width="146" height="52" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="52" y="267" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="12" fontWeight="600">
          Commercial Finance
        </text>
        <text x="52" y="287" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Off-Balance-Sheet Leasing
        </text>

        {/* Connector 1 to 2 */}
        <path d="M 198 206 L 217 206" stroke="#ff6433" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Column 2: Information Architecture & Technical SEO (In Progress) */}
        <rect x="217" y="100" width="166" height="212" rx="5" fill="#1c2026" stroke="#087f73" strokeWidth="1.2" />
        <text x="300" y="122" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          02 // SEO (IN PROGRESS)
        </text>

        {/* Sub-card 1: Kenya Search Mapping */}
        <rect x="227" y="132" width="146" height="50" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="237" y="151" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="12" fontWeight="600">
          Regional Search Intent
        </text>
        <text x="237" y="169" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Kenya &amp; East Africa Keywords
        </text>

        {/* Sub-card 2: Structured Data & Schema */}
        <rect x="227" y="190" width="146" height="50" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="237" y="209" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="12" fontWeight="600">
          Structured Schema
        </text>
        <text x="237" y="227" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          JSON-LD &amp; Breadcrumb Hierarchy
        </text>

        {/* Sub-card 3: Mobile Usability */}
        <rect x="227" y="248" width="146" height="52" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="237" y="267" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="12" fontWeight="600">
          Mobile Usability
        </text>
        <text x="237" y="287" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Fast Core Web Vitals
        </text>

        {/* Connector 2 to 3 */}
        <path d="M 383 206 L 402 206" stroke="#087f73" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Column 3: Lead & Inquiry Conversion Funnel (Completed) */}
        <rect x="402" y="100" width="166" height="212" rx="5" fill="#1c2026" stroke="rgba(255,255,255,0.24)" strokeWidth="1.2" />
        <text x="485" y="122" textAnchor="middle" fill="#cbd5e1" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          03 // ENQUIRY FUNNEL
        </text>

        {/* Sub-card 1: Solution Discovery */}
        <rect x="412" y="132" width="146" height="50" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="422" y="151" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="12" fontWeight="600">
          Sector Landing Pages
        </text>
        <text x="422" y="169" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Direct Solution Discovery
        </text>

        {/* Sub-card 2: Commercial Scoping */}
        <rect x="412" y="190" width="146" height="50" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="422" y="209" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="12" fontWeight="600">
          Lease Scoping Forms
        </text>
        <text x="422" y="227" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Customer Callback Requests
        </text>

        {/* Sub-card 3: Commercial Dispatch */}
        <rect x="412" y="248" width="146" height="52" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="422" y="267" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="12" fontWeight="600">
          Corporate Routing
        </text>
        <text x="422" y="287" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          Nairobi Office Dispatch
        </text>

        {/* Bottom Verification Label */}
        <text x="300" y="340" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono, monospace)" fontSize="10.5">
          VERIFIED CLIENT SCOPE · PLANNED ON-PAGE SEO (IN PROGRESS) · NAIROBI, KENYA
        </text>
      </svg>
    </div>
  )
}
