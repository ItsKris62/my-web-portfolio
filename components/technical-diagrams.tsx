import React from 'react'

/**
 * Authentic, native SVG technical illustrations for projects without live screenshots.
 * Clearly labeled conceptual/architectural diagrams without fabricated telemetry.
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
        <text x="32" y="38" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="11" letterSpacing="1.5">
          TOPOLOGY // ENTERPRISE MULTI-SITE LAN/WAN &amp; VLAN SEGMENTATION
        </text>
        <text x="568" y="38" textAnchor="end" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="10">
          CONCEPTUAL ARCHITECTURE
        </text>
        <line x1="32" y1="48" x2="568" y2="48" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* WAN / ISP Gateway */}
        <rect x="220" y="70" width="160" height="44" rx="4" fill="#1f2329" stroke="#ff6433" strokeWidth="1.5" />
        <text x="300" y="88" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="12" fontWeight="600">
          WAN Gateway / Router
        </text>
        <text x="300" y="104" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="9">
          MPLS &amp; IPSec VPN Tunnel
        </text>

        {/* Bus Connection */}
        <line x1="300" y1="114" x2="300" y2="150" stroke="#ff6433" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Core Managed Switch */}
        <rect x="180" y="150" width="240" height="42" rx="4" fill="#1f2329" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <text x="300" y="168" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="12" fontWeight="600">
          Core Managed Switch (L2/L3)
        </text>
        <text x="300" y="182" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="9">
          802.1Q Trunking · DHCP Snooping · STP
        </text>

        {/* Trunk branches to VLAN Segments */}
        <path d="M 300 192 L 300 216 M 110 216 L 490 216" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="110" y1="216" x2="110" y2="240" stroke="#087f73" strokeWidth="1.5" />
        <line x1="300" y1="216" x2="300" y2="240" stroke="#ff6433" strokeWidth="1.5" />
        <line x1="490" y1="216" x2="490" y2="240" stroke="#087f73" strokeWidth="1.5" />

        {/* VLAN 10: POS Isolated */}
        <rect x="35" y="240" width="150" height="74" rx="4" fill="#1f2329" stroke="#ff6433" strokeWidth="1.2" />
        <text x="110" y="260" textAnchor="middle" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="10" fontWeight="bold">
          VLAN 10 // POS NETWORK
        </text>
        <text x="110" y="278" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="10">
          Isolated PCI-DSS Zone
        </text>
        <text x="110" y="294" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="9">
          POS Terminals &amp; Fiscal Printers
        </text>

        {/* VLAN 20: Corporate LAN */}
        <rect x="225" y="240" width="150" height="74" rx="4" fill="#1f2329" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <text x="300" y="260" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-mono, monospace)" fontSize="10" fontWeight="bold">
          VLAN 20 // CORP LAN
        </text>
        <text x="300" y="278" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="10">
          Staff Workstations
        </text>
        <text x="300" y="294" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="9">
          Active Directory &amp; File Shares
        </text>

        {/* VLAN 30: Branch Wi-Fi / VoIP */}
        <rect x="415" y="240" width="150" height="74" rx="4" fill="#1f2329" stroke="#087f73" strokeWidth="1.2" />
        <text x="490" y="260" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="10" fontWeight="bold">
          VLAN 30 // VOIP &amp; GUEST
        </text>
        <text x="490" y="278" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="10">
          PBX / QoS Priority
        </text>
        <text x="490" y="294" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="9">
          Isolated Captive Portal Wi-Fi
        </text>

        {/* Bottom verification badge */}
        <text x="300" y="342" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="9">
          PHYSICAL INFRASTRUCTURE · HARDENED SEGMENTATION · 200+ ASSETS MONITORED
        </text>
      </svg>
    </div>
  )
}

export function CybersecurityLabDiagram({ className }: { className?: string }) {
  return (
    <div className={`tech-diagram-wrap ${className || ''}`} aria-label="Cybersecurity Monitoring Lab Architecture Diagram">
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
            <stop stopColor="#087f73" stopOpacity="0.18" />
            <stop offset="1" stopColor="#ff6433" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <rect width="600" height="360" fill="url(#sec-grid)" />
        <rect width="600" height="360" fill="url(#sec-accent)" />

        {/* Diagram Header */}
        <text x="32" y="38" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="11" letterSpacing="1.5">
          SECURITY LAB // DEFENSIVE SIEM &amp; NIDS PIPELINE
        </text>
        <text x="568" y="38" textAnchor="end" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="10">
          CONCEPTUAL ARCHITECTURE
        </text>
        <line x1="32" y1="48" x2="568" y2="48" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* Pipeline Column 1: Perimeter & IDS */}
        <rect x="35" y="80" width="160" height="210" rx="5" fill="#1f2329" stroke="#087f73" strokeWidth="1.2" />
        <text x="115" y="106" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          01 // PERIMETER
        </text>
        <rect x="50" y="125" width="130" height="42" rx="3" fill="#181b20" stroke="rgba(255,255,255,0.1)" />
        <text x="115" y="143" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          pfSense Firewall
        </text>
        <text x="115" y="157" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8">
          Packet Filtering &amp; NAT
        </text>

        <rect x="50" y="180" width="130" height="42" rx="3" fill="#181b20" stroke="rgba(8,127,115,0.4)" />
        <text x="115" y="198" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Suricata NIDS/IPS
        </text>
        <text x="115" y="212" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="8">
          Inline Signature Matching
        </text>

        <text x="115" y="258" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8.5">
          SPAN / Port Mirroring &rarr;
        </text>

        {/* Pipeline Column 2: Log Aggregation & SIEM */}
        <rect x="220" y="80" width="160" height="210" rx="5" fill="#1f2329" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <text x="300" y="106" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          02 // ANALYSIS
        </text>
        <rect x="235" y="125" width="130" height="48" rx="3" fill="#181b20" stroke="#ff6433" strokeWidth="1.2" />
        <text x="300" y="145" textAnchor="middle" fill="#ff6433" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="bold">
          Wazuh Manager / SIEM
        </text>
        <text x="300" y="161" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8">
          Rule Engine &amp; Log Decoder
        </text>

        <rect x="235" y="185" width="130" height="40" rx="3" fill="#181b20" stroke="rgba(255,255,255,0.1)" />
        <text x="300" y="202" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="10.5">
          Linux &amp; Windows Agents
        </text>
        <text x="300" y="216" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8">
          FIM &amp; Auditd Event Feeds
        </text>

        <text x="300" y="258" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8.5">
          Decoded Alerts &rarr;
        </text>

        {/* Pipeline Column 3: MITRE ATT&CK Mapping */}
        <rect x="405" y="80" width="160" height="210" rx="5" fill="#1f2329" stroke="#ff6433" strokeWidth="1.2" />
        <text x="485" y="106" textAnchor="middle" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="11" fontWeight="bold">
          03 // TRIAGE &amp; TTPs
        </text>
        <rect x="420" y="125" width="130" height="42" rx="3" fill="#181b20" stroke="rgba(255,255,255,0.1)" />
        <text x="485" y="143" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          MITRE ATT&amp;CK Matrix
        </text>
        <text x="485" y="157" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8">
          T1059 / T1078 / T1087 Mapping
        </text>

        <rect x="420" y="180" width="130" height="42" rx="3" fill="#181b20" stroke="rgba(8,127,115,0.4)" />
        <text x="485" y="198" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Incident Response Runbook
        </text>
        <text x="485" y="212" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="8">
          Containment &amp; Triage SOPs
        </text>

        <text x="485" y="258" textAnchor="middle" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="8.5">
          Actionable Defense
        </text>

        {/* Bottom verification badge */}
        <text x="300" y="342" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="9">
          DETECTION ENGINEERING · CONTINUOUS MONITORING · LOG AGGREGATION &amp; TRIAGE
        </text>
      </svg>
    </div>
  )
}

export function AutomationWorkflowDiagram({ className }: { className?: string }) {
  return (
    <div className={`tech-diagram-wrap ${className || ''}`} aria-label="Automation and Workflow Engineering Architecture Diagram">
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
            <stop offset="1" stopColor="#087f73" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <rect width="600" height="360" fill="url(#auto-grid)" />
        <rect width="600" height="360" fill="url(#auto-accent)" />

        {/* Diagram Header */}
        <text x="32" y="38" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="11" letterSpacing="1.5">
          PIPELINE // EVENT-DRIVEN AUTOMATION &amp; HUMAN-IN-THE-LOOP
        </text>
        <text x="568" y="38" textAnchor="end" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="10">
          CONCEPTUAL ARCHITECTURE
        </text>
        <line x1="32" y1="48" x2="568" y2="48" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* Step 1: Webhook / Trigger */}
        <rect x="35" y="80" width="115" height="100" rx="4" fill="#1f2329" stroke="rgba(255,255,255,0.2)" />
        <text x="92" y="105" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="10" fontWeight="bold">
          01 // TRIGGER
        </text>
        <text x="92" y="128" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Webhook / Cron
        </text>
        <text x="92" y="146" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8">
          API Event Feeds
        </text>
        <text x="92" y="162" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8">
          Form &amp; HR Triggers
        </text>

        {/* Arrow to Step 2 */}
        <path d="M 150 130 L 175 130" stroke="#087f73" strokeWidth="2" markerEnd="url(#arrow)" />

        {/* Step 2: n8n Orchestrator */}
        <rect x="175" y="70" width="135" height="120" rx="4" fill="#1f2329" stroke="#ff6433" strokeWidth="1.5" />
        <text x="242" y="95" textAnchor="middle" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="10" fontWeight="bold">
          02 // ORCHESTRATOR
        </text>
        <text x="242" y="118" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="12" fontWeight="bold">
          n8n Workflow Core
        </text>
        <text x="242" y="136" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8.5">
          Conditional Routing
        </text>
        <text x="242" y="152" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8.5">
          Data Transformation
        </text>
        <text x="242" y="168" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="8">
          Retry &amp; Error Queues
        </text>

        {/* Arrow to Step 3 */}
        <path d="M 310 130 L 335 130" stroke="#ff6433" strokeWidth="2" />

        {/* Step 3: Python / Bash Worker */}
        <rect x="335" y="80" width="115" height="100" rx="4" fill="#1f2329" stroke="rgba(255,255,255,0.2)" />
        <text x="392" y="105" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="10" fontWeight="bold">
          03 // WORKER
        </text>
        <text x="392" y="128" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Python / Node
        </text>
        <text x="392" y="146" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8">
          Data Sanitization
        </text>
        <text x="392" y="162" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8">
          LLM Prompt Pipeline
        </text>

        {/* Arrow to Step 4 */}
        <path d="M 450 130 L 475 130" stroke="#087f73" strokeWidth="2" />

        {/* Step 4: Verification & Gate */}
        <rect x="475" y="70" width="95" height="120" rx="4" fill="#1f2329" stroke="#087f73" strokeWidth="1.2" />
        <text x="522" y="95" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="10" fontWeight="bold">
          04 // GATE
        </text>
        <text x="522" y="118" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="10.5" fontWeight="600">
          Human Signoff
        </text>
        <text x="522" y="136" textAnchor="middle" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="8">
          Slack / Email Alert
        </text>
        <text x="522" y="152" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8">
          Approval Required
        </text>
        <text x="522" y="168" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8">
          Prior to Execution
        </text>

        {/* Destination layer below */}
        <rect x="75" y="235" width="450" height="65" rx="4" fill="#1f2329" stroke="rgba(255,255,255,0.12)" />
        <path d="M 242 190 L 242 235" stroke="#ff6433" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 522 190 L 522 235" stroke="#087f73" strokeWidth="1.5" strokeDasharray="3 3" />

        <text x="300" y="258" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Enterprise Systems &amp; Audit Storage
        </text>
        <text x="300" y="278" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="9">
          PostgreSQL Audit Log · Microsoft Entra ID Lifecycle · Cloud Infrastructure State
        </text>

        {/* Bottom verification badge */}
        <text x="300" y="342" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="9">
          SECURE AUTOMATION · ERROR RESILIENCE · AUDITABLE LOGS
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
        <text x="32" y="34" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="11" letterSpacing="1.5">
          ARCHITECTURE // RENTWORKS EAST AFRICA
        </text>
        <text x="568" y="34" textAnchor="end" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="10">
          CORPORATE WEB &amp; SEO
        </text>
        <line x1="32" y1="44" x2="568" y2="44" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* Browser URL Chassis Bar */}
        <rect x="32" y="54" width="536" height="34" rx="4" fill="#14171c" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <circle cx="48" cy="71" r="3" fill="#ff6433" opacity="0.8" />
        <circle cx="58" cy="71" r="3" fill="#e5a93c" opacity="0.8" />
        <circle cx="68" cy="71" r="3" fill="#087f73" opacity="0.8" />

        {/* URL Pill */}
        <rect x="84" y="60" width="310" height="22" rx="3" fill="#1b1f26" stroke="rgba(255,255,255,0.08)" />
        {/* Padlock icon representation */}
        <rect x="94" y="66" width="7" height="9" rx="1.5" fill="#087f73" />
        <path d="M 95.5 66 V 64 C 95.5 62.6 96.6 61.5 97.5 61.5 C 98.4 61.5 99.5 62.6 99.5 64 V 66" stroke="#087f73" strokeWidth="1" fill="none" />
        <text x="108" y="75" fill="#e2e8f0" fontFamily="var(--font-mono, monospace)" fontSize="9.5">
          https://rentworks.co.ke
        </text>
        <text x="554" y="75" textAnchor="end" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="8.5" fontWeight="bold">
          LIVE CLIENT PLATFORM
        </text>

        {/* Column 1: Asset Portfolios & Solutions */}
        <rect x="32" y="102" width="166" height="210" rx="5" fill="#1c2026" stroke="#ff6433" strokeWidth="1.2" />
        <text x="115" y="124" textAnchor="middle" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="10.5" fontWeight="bold">
          01 // LEASING SOLUTIONS
        </text>

        {/* Sub-card 1: IT Equipment */}
        <rect x="42" y="136" width="146" height="46" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="52" y="153" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          IT &amp; Workplace Tech
        </text>
        <text x="52" y="169" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8.5">
          Laptops · Servers · Networks
        </text>

        {/* Sub-card 2: Healthcare Tech */}
        <rect x="42" y="190" width="146" height="46" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="52" y="207" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Medical &amp; Healthcare
        </text>
        <text x="52" y="223" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8.5">
          Diagnostic &amp; Clinical Assets
        </text>

        {/* Sub-card 3: Industrial & Commercial */}
        <rect x="42" y="244" width="146" height="54" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="52" y="261" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Industrial &amp; Vehicles
        </text>
        <text x="52" y="277" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8.5">
          Fleet · Specialized Machinery
        </text>
        <text x="52" y="289" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="7.5">
          Off-Balance-Sheet Financing
        </text>

        {/* Connector 1 to 2 */}
        <path d="M 198 207 L 217 207" stroke="#ff6433" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Column 2: Information Architecture & Technical SEO */}
        <rect x="217" y="102" width="166" height="210" rx="5" fill="#1c2026" stroke="#087f73" strokeWidth="1.2" />
        <text x="300" y="124" textAnchor="middle" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="10.5" fontWeight="bold">
          02 // DISCOVERY &amp; SEO
        </text>

        {/* Sub-card 1: Kenya Search Mapping */}
        <rect x="227" y="136" width="146" height="46" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="237" y="153" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Regional Search Intent
        </text>
        <text x="237" y="169" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="8.5">
          Kenya &amp; East Africa Keywords
        </text>

        {/* Sub-card 2: Structured Data & Schema */}
        <rect x="227" y="190" width="146" height="46" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="237" y="207" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Structured Data &amp; Schema
        </text>
        <text x="237" y="223" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8.5">
          JSON-LD · Breadcrumbs · OpenGraph
        </text>

        {/* Sub-card 3: Responsive Performance */}
        <rect x="227" y="244" width="146" height="54" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="237" y="261" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          On-Page Architecture
        </text>
        <text x="237" y="277" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8.5">
          Clean Page Hierarchy · Meta Tags
        </text>
        <text x="237" y="289" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="7.5">
          Mobile Usability &amp; Core Web Vitals
        </text>

        {/* Connector 2 to 3 */}
        <path d="M 383 207 L 402 207" stroke="#087f73" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Column 3: Lead & Inquiry Conversion Funnel */}
        <rect x="402" y="102" width="166" height="210" rx="5" fill="#1c2026" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />
        <text x="485" y="124" textAnchor="middle" fill="#fcfcfa" fontFamily="var(--font-mono, monospace)" fontSize="10.5" fontWeight="bold">
          03 // INQUIRY FUNNEL
        </text>

        {/* Sub-card 1: Solution Discovery */}
        <rect x="412" y="136" width="146" height="46" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="422" y="153" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Targeted Landing Pages
        </text>
        <text x="422" y="169" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8.5">
          Direct Service Routing
        </text>

        {/* Sub-card 2: Commercial Scoping */}
        <rect x="412" y="190" width="146" height="46" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="422" y="207" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Lease Scoping Forms
        </text>
        <text x="422" y="223" fill="#ff6433" fontFamily="var(--font-mono, monospace)" fontSize="8.5">
          Clear Customer Enquiry Path
        </text>

        {/* Sub-card 3: Commercial Dispatch */}
        <rect x="412" y="244" width="146" height="54" rx="3" fill="#15181d" stroke="rgba(255,255,255,0.08)" />
        <text x="422" y="261" fill="#fcfcfa" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="600">
          Finance Lead Routing
        </text>
        <text x="422" y="277" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="8.5">
          Enterprise Account Contacts
        </text>
        <text x="422" y="289" fill="#087f73" fontFamily="var(--font-mono, monospace)" fontSize="7.5">
          Nairobi Corporate Office
        </text>

        {/* Bottom Verification Label */}
        <text x="300" y="342" textAnchor="middle" fill="#737a80" fontFamily="var(--font-mono, monospace)" fontSize="9">
          CORPORATE LEASING DISCOVERY · ON-PAGE TECHNICAL SEO · EAST AFRICA
        </text>
      </svg>
    </div>
  )
}
