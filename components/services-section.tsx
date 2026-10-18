'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  ChevronDown,
  Globe,
  CheckCircle2,
} from 'lucide-react'
import {
  InfrastructureIcon,
  CybersecurityIcon,
  SoftwareIcon,
  AutomationIcon,
  CloudIdentityIcon,
  ConsultancyIcon,
} from '@/components/icons'
import { services, webDevOffering, siteConfig } from '@/lib/data'

type IconPropType = { className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }
const serviceIdIconMap: Record<string, React.ComponentType<IconPropType>> = {
  'cloud-identity-m365': CloudIdentityIcon,
  'sme-cybersecurity-grc': CybersecurityIcon,
  'network-infrastructure': InfrastructureIcon,
  'managed-it-operations': SoftwareIcon,
  'web-design-development': SoftwareIcon,
  'ai-automation': AutomationIcon,
  'technical-consulting-training': ConsultancyIcon,
}

// Map service to relevant project case studies
const serviceProjectMap: Record<string, { title: string; slug: string }> = {
  'cloud-identity-m365': { title: 'Enterprise Network & Identity Deployment', slug: 'enterprise-network-deployment' },
  'sme-cybersecurity-grc': { title: 'Cybersecurity Monitoring Lab', slug: 'cybersecurity-monitoring-lab' },
  'network-infrastructure': { title: 'Enterprise Infrastructure Deployment', slug: 'enterprise-network-deployment' },
  'web-design-development': { title: 'Adek Tatu & Kolwa Beba SACCO', slug: 'adek-tatu' },
  'ai-automation': { title: 'SheriaBot & Automation Workflows', slug: 'sheriabot' },
  'managed-it-operations': { title: 'Enterprise Operations Case Study', slug: 'enterprise-network-deployment' },
  'technical-consulting-training': { title: 'Cybersecurity & GRC Research', slug: 'cybersecurity-monitoring-lab' },
}

export function ServicesSection() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const toggleRow = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id))
  }

  return (
    <section id="services" className="services-section section-pad ruled-section" aria-labelledby="services-title">
      <div className="section-label" aria-hidden="true">
        <span>04</span>
        <span>Professional Services &amp; Advisory Index</span>
      </div>

      <div className="services-header">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Client Engagements
          </p>
          <h2 id="services-title">
            Good technology
            <br />
            <em>should work harder</em>
            <br />
            for your business.
          </h2>
        </div>
        <p className="services-header-desc">
          I work with businesses, startups, founders, and teams that need dependable technology,
          practical engineering expertise, and solutions built to last.
        </p>
      </div>

      {/* ── Sophisticated Editorial Service Index ── */}
      <div className="service-editorial-index" role="region" aria-label="Services index list">
        {services.map((svc) => {
          const IconComponent = serviceIdIconMap[svc.id] || SoftwareIcon
          const mailtoSubject = encodeURIComponent(`Consultation Inquiry — ${svc.title}`)
          const isExpanded = expandedRow === svc.id
          const relatedProject = serviceProjectMap[svc.id]

          return (
            <article
              key={svc.id}
              className={`service-index-row ${isExpanded ? 'row-expanded' : ''}`}
            >
              <div
                className="service-row-summary"
                onClick={() => toggleRow(svc.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleRow(svc.id)
                  }
                }}
              >
                <div className="service-row-num-col">
                  <span className="service-index-num">{svc.number}</span>
                  <div className="service-index-icon" aria-hidden="true">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                <div className="service-row-main-col">
                  <h3 className="service-index-title">{svc.title}</h3>
                  <p className="service-index-headline">&ldquo;{svc.headline}&rdquo;</p>
                  <p className="service-index-desc">{svc.description}</p>
                </div>

                <div className="service-row-meta-col">
                  <span className="service-target-tag">{svc.target.split(',')[0]}</span>
                  <div className="service-expand-cue">
                    <span className="expand-label">{isExpanded ? 'Hide Scope' : 'Scope & Deliverables'}</span>
                    <ChevronDown
                      className={`accordion-chevron w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {/* Expandable Technical Scope & Deliverables Drawer */}
              {isExpanded && (
                <div className="service-drawer-content" role="region" aria-label={`${svc.title} detailed scope`}>
                  <div className="service-drawer-grid">
                    <div className="drawer-col">
                      <h4 className="drawer-subhead">Target Organisations</h4>
                      <p className="drawer-text">{svc.target}</p>

                      {svc.clientBenefit && (
                        <>
                          <h4 className="drawer-subhead" style={{ marginTop: '1.25rem' }}>Client Outcome</h4>
                          <p className="drawer-text">{svc.clientBenefit}</p>
                        </>
                      )}

                      {relatedProject && (
                        <div className="drawer-related-project">
                          <span className="related-label">Demonstrated In Project Work:</span>
                          <Link href={`/work/${relatedProject.slug}`} className="drawer-project-link">
                            <span>{relatedProject.title}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 arrow-shift" />
                          </Link>
                        </div>
                      )}
                    </div>

                    <div className="drawer-col">
                      <h4 className="drawer-subhead">Deliverables Scope ({svc.deliverables.length})</h4>
                      <ul className="drawer-deliverables-list">
                        {svc.deliverables.map((d, idx) => (
                          <li key={idx}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--teal)] shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>

                      {svc.technologies && svc.technologies.length > 0 && (
                        <div className="drawer-tech-wrap">
                          <span className="drawer-tech-label">Technologies:</span>
                          <div className="drawer-tech-pills">
                            {svc.technologies.map((t) => (
                              <span key={t} className="tech-pill">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="drawer-action-row">
                        <a
                          href={`mailto:${siteConfig.contact.email}?subject=${mailtoSubject}`}
                          className="button button-dark text-xs"
                        >
                          {svc.cta} <ArrowUpRight className="w-3.5 h-3.5 arrow-shift" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Animated precision hairline divider */}
              <div className="service-row-divider" aria-hidden="true" />
            </article>
          )
        })}
      </div>

      {/* Web Development Offering Callout Banner */}
      {webDevOffering && (
        <div className="web-dev-callout-card">
          <div className="callout-icon-col" aria-hidden="true">
            <Globe className="w-10 h-10 text-[var(--orange)]" />
          </div>
          <div className="callout-content-col">
            <span className="callout-badge">FEATURED OFFERING &bull; DIGITAL EXPERIENCES</span>
            <h3 className="callout-title">{webDevOffering.title}</h3>
            <p className="callout-desc">{webDevOffering.description}</p>

            <div className="callout-actions">
              <Link href="#work" className="button button-orange">
                Explore Websites I&apos;ve Built <ArrowUpRight className="w-4 h-4 arrow-shift" />
              </Link>
              <a
                href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
                  'Web Development Project Discussion',
                )}`}
                className="button button-outline"
              >
                Discuss a Website Project <ArrowUpRight className="w-4 h-4 arrow-shift" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
