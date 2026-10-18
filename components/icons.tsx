import React from 'react'

/**
 * Standardized Premium Engineering Iconography System
 * All icons follow:
 * - 24x24 viewBox
 * - 1.8px stroke width for vector paths
 * - strokeLinecap="round" strokeLinejoin="round"
 * - Consistent semantic coloring via currentColor or CSS custom property tokens
 * - Accessible labels or aria-hidden for decorative usage
 */

interface IconProps {
  className?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

// ── Social & Brand Icons ───────────────────────────────────────────────────

export function GithubIcon({ className, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={ariaHidden}
      role="img"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  )
}

export function LinkedinIcon({ className, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={ariaHidden}
      role="img"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

// ── Technical Domain Icons (Handcrafted Linear / Studio Geometry) ───────────

/** Infrastructure: Core router, managed switch trunk & dual endpoints */
export function InfrastructureIcon({ className, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      <rect x="2" y="3" width="20" height="5" rx="1.5" />
      <rect x="2" y="16" width="20" height="5" rx="1.5" />
      <path d="M6 8v3" />
      <path d="M18 8v3" />
      <path d="M6 11h12" />
      <path d="M12 11v5" />
      <circle cx="6" cy="5.5" r="1" fill="currentColor" />
      <circle cx="18" cy="18.5" r="1" fill="currentColor" />
    </svg>
  )
}

/** Cybersecurity: Hardened geometric shield with internal cryptographic keyhole */
export function CybersecurityIcon({ className, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v4" />
      <circle cx="12" cy="14" r="1.25" fill="currentColor" />
    </svg>
  )
}

/** Software Engineering: Code architecture window with prompt cursor */
export function SoftwareIcon({ className, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      <rect x="2.5" y="4" width="19" height="16" rx="2" />
      <path d="M2.5 9h19" />
      <path d="M6.5 6.5h.01" />
      <path d="M9.5 6.5h.01" />
      <path d="M7 13l3 2.5-3 2.5" />
      <line x1="13" y1="18" x2="16.5" y2="18" />
    </svg>
  )
}

/** AI & Automation: Node orchestrator with event triggers and decision gates */
export function AutomationIcon({ className, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      <circle cx="5" cy="6" r="3" />
      <circle cx="19" cy="6" r="3" />
      <circle cx="12" cy="18" r="3" />
      <path d="M7.6 7.5L10 15.5" />
      <path d="M16.4 7.5L14 15.5" />
      <path d="M8 6h8" strokeDasharray="2 2" />
    </svg>
  )
}

/** Cloud Identity: Entra ID / MFA verified biometric identity shield */
export function CloudIdentityIcon({ className, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      <path d="M17.5 19H9a5 5 0 0 1-5-5c0-2.3 1.5-4.2 3.6-4.8A7 7 0 0 1 20 11a4.5 4.5 0 0 1-2.5 8z" />
      <path d="M12 12v4" />
      <path d="M10 14h4" />
    </svg>
  )
}

/** Consultancy: Technical blueprint & precision architecture compass */
export function ConsultancyIcon({ className, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      <circle cx="12" cy="12" r="9" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.2" />
    </svg>
  )
}

/** Research: Analytical document with structural logic tree */
export function ResearchIcon({ className, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

/** Interactive Signal Line Indicator (Precision kinetic marker) */
export function SignalLineMarker({ className, active = false }: { className?: string; active?: boolean }) {
  return (
    <span
      className={`signal-line-indicator ${active ? 'signal-active' : ''} ${className || ''}`}
      aria-hidden="true"
    />
  )
}
