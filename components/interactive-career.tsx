'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowDownRight, ArrowUpRight, Building2, Calendar, Award, CheckCircle2 } from 'lucide-react'
import { career, stats, type CareerMilestone } from '@/lib/data'

// Map career milestones to real project case studies
const milestoneProjectMap: Record<string, { title: string; slug: string }> = {
  SheriaBot: { title: 'SheriaBot Case Study', slug: 'sheriabot' },
  'Sledge Group Enterprises': {
    title: 'Enterprise Infrastructure Deployment Case Study',
    slug: 'enterprise-network-deployment',
  },
  'Net Scaling Solutions': {
    title: 'Automation & Workflow Engineering Case Study',
    slug: 'automation-workflow-engineering',
  },
}

const narrativePhases = [
  'Phase 01: Enterprise Support Foundations',
  'Phase 02: Infrastructure & Branch Operations',
  'Phase 03: Technical Leadership & Cloud Security',
  'Phase 04: Product Architecture & SaaS Leadership',
]

export function InteractiveCareer() {
  const [selectedIndex, setSelectedIndex] = useState<number>(career.length - 1)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const activeMilestone: CareerMilestone = career[selectedIndex] ?? career[0]
  const linkedProject = activeMilestone?.organization ? milestoneProjectMap[activeMilestone.organization] : undefined
  const activePhase = narrativePhases[selectedIndex] || narrativePhases[narrativePhases.length - 1]

  // Track scroll position to synchronize active milestone while allowing manual override
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (isAutoScrolling) return
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect()
            const sectionHeight = rect.height
            // Only update if section is actively occupying middle of viewport
            if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
              const progress = Math.min(
                1,
                Math.max(0, (window.innerHeight * 0.4 - rect.top) / (sectionHeight * 0.7))
              )
              const computedIndex = Math.min(career.length - 1, Math.floor(progress * career.length))
              // Only advance forward or backward if difference exists
              if (computedIndex !== selectedIndex && Math.abs(computedIndex - selectedIndex) <= 1) {
                setSelectedIndex(computedIndex)
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [selectedIndex, isAutoScrolling])

  const handleManualSelect = (index: number) => {
    setIsAutoScrolling(true)
    setSelectedIndex(index)
    setTimeout(() => setIsAutoScrolling(false), 800)
  }

  const progressPercentage = ((selectedIndex) / (career.length - 1)) * 100

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="journey-section section-pad ruled-section"
      aria-labelledby="journey-title"
    >
      <div className="section-label" aria-hidden="true">
        <span>03</span>
        <span>Career Progression &amp; Technical Evolution</span>
      </div>

      <div className="journey-header">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Practical Engineering Background
          </p>
          <h2 id="journey-title">
            From the desktop &amp; server room
            <br />
            <em>to enterprise security &amp; SaaS.</em>
          </h2>
        </div>
        <p className="journey-header-desc">
          Five years of operational experience supporting real business environments, scaling distributed infrastructure,
          hardening endpoints, and building software systems.
        </p>
      </div>

      {/* High-Impact Stat Strip */}
      <div className="stats-strip" aria-label="Key operational statistics">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <span className="stat-number">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Narrative Phase Status Bar */}
      <div className="career-narrative-bar">
        <span className="narrative-tag">TECHNICAL EVOLUTION:</span>
        <strong className="narrative-current-phase">{activePhase}</strong>
        <span className="narrative-counter">
          MILESTONE 0{selectedIndex + 1} / 0{career.length}
        </span>
      </div>

      {/* Connected Geometric Node Selector with Active SVG Connector Bus */}
      <div className="career-node-track" role="tablist" aria-label="Career milestones timeline">
        <div className="career-node-line" aria-hidden="true">
          <div
            className="career-node-line-progress"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="career-nodes-container">
          {career.map((milestone, index) => {
            const isSelected = index === selectedIndex
            return (
              <button
                key={milestone.period + milestone.organization}
                role="tab"
                id={`career-node-${index}`}
                aria-selected={isSelected}
                aria-controls="career-detail-panel"
                className={`career-node-btn${isSelected ? ' active' : ''}`}
                onClick={() => handleManualSelect(index)}
              >
                <div className="node-marker-wrap">
                  <span className="node-pulse" aria-hidden="true" />
                  <span className="node-dot" />
                </div>
                <div className="node-text">
                  <span className="node-period">{milestone.period}</span>
                  <strong className="node-org">{milestone.organization}</strong>
                  <span className="node-title">{milestone.title}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Interactive Milestone Detail Card */}
      <div
        id="career-detail-panel"
        role="tabpanel"
        aria-labelledby={`career-node-${selectedIndex}`}
        className="career-detail-card"
      >
        <div className="career-detail-header">
          <div className="career-title-group">
            <div className="career-badge-row">
              <span className="career-period-badge">
                <Calendar className="w-3.5 h-3.5 inline mr-1" />
                {activeMilestone.period}
              </span>
              <span className="career-org-badge">
                <Building2 className="w-3.5 h-3.5 inline mr-1" />
                {activeMilestone.organization}
              </span>
            </div>
            <h3 className="career-active-role">{activeMilestone.title}</h3>
          </div>

          {activeMilestone.impact && (
            <div className="career-impact-callout">
              <Award className="w-4 h-4 text-[var(--orange)] shrink-0 mt-0.5" />
              <div>
                <strong>Key Operational Metric:</strong>
                <p>{activeMilestone.impact}</p>
              </div>
            </div>
          )}
        </div>

        {/* Narrative & Story */}
        <div className="career-story-block">
          <p className="career-summary">{activeMilestone.summary}</p>
          {activeMilestone.story && <p className="career-story-quote">&ldquo;{activeMilestone.story}&rdquo;</p>}
        </div>

        {/* Operational Highlights & Skills */}
        <div className="career-breakdown-grid">
          <div className="career-col">
            <h4 className="career-col-heading">Operational Deliverables &amp; Responsibilities</h4>
            <ul className="career-details-list">
              {activeMilestone.details.map((detail, idx) => (
                <li key={idx}>
                  <CheckCircle2 className="w-4 h-4 text-[var(--teal)] shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="career-col">
            <h4 className="career-col-heading">Applied Technologies &amp; Methods</h4>
            <div className="career-tech-wrap">
              {(activeMilestone.technologies || []).map((tech) => (
                <span key={tech} className="tech-pill">
                  {tech}
                </span>
              ))}
            </div>

            {/* Related Case Study Link if available */}
            {linkedProject && (
              <div className="career-linked-project">
                <span className="career-sub-label">Associated Case Study:</span>
                <Link href={`/work/${linkedProject.slug}`} className="career-case-link">
                  <span>{linkedProject.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 arrow-shift" />
                </Link>
              </div>
            )}

            <div className="career-step-nav">
              <span className="career-step-counter">
                Milestone 0{selectedIndex + 1} of 0{career.length}
              </span>
              <div className="career-step-arrows">
                <button
                  type="button"
                  disabled={selectedIndex === 0}
                  onClick={() => handleManualSelect(Math.max(0, selectedIndex - 1))}
                  className="step-btn"
                  aria-label="Previous milestone"
                >
                  &larr; Earlier
                </button>
                <button
                  type="button"
                  disabled={selectedIndex === career.length - 1}
                  onClick={() => handleManualSelect(Math.min(career.length - 1, selectedIndex + 1))}
                  className="step-btn"
                  aria-label="Next milestone"
                >
                  Later &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Résumé Download CTA */}
      <div className="career-resume-cta">
        <div className="resume-cta-text">
          <strong>Looking for a comprehensive breakdown of technical tenure?</strong>
          <p>Download my Information Security &amp; Systems Engineering résumé (PDF, 128 kB).</p>
        </div>
        <a
          id="journey-resume-download"
          className="button button-dark"
          href="/documents/Christopher_Rateng_Information_Security_Resume.pdf"
          download="Christopher_Rateng_Information_Security_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Technical Résumé <ArrowDownRight className="w-4 h-4 arrow-shift" />
        </a>
      </div>
    </section>
  )
}
