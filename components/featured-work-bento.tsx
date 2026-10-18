'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, Layers, ShieldCheck, Terminal, Cpu } from 'lucide-react'
import { AutomationIcon } from '@/components/icons'
import { publishedProjects, projectCategories, type Project, type ProjectCategory } from '@/lib/data'
import {
  NetworkDeploymentDiagram,
  CybersecurityLabDiagram,
  AutomationWorkflowDiagram,
} from '@/components/technical-diagrams'

export function FeaturedWorkBento() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All Work'>('All Work')

  const filteredProjects =
    activeCategory === 'All Work'
      ? publishedProjects
      : publishedProjects.filter((p) => p.category === activeCategory)

  const flagshipProject = publishedProjects.find((p) => p.slug === 'sheriabot')
  const otherProjects = publishedProjects.filter((p) => p.slug !== 'sheriabot')

  // Render project visual: either real screenshot or authentic native SVG diagram
  const renderVisual = (project: Project, isFlagship = false) => {
    if (project.desktopScreenshots && project.desktopScreenshots.length > 0) {
      return (
        <div className={`bento-media-wrap ${isFlagship ? 'flagship-media' : ''}`}>
          <Image
            src={project.desktopScreenshots[0].src}
            alt={project.desktopScreenshots[0].alt || `${project.title} screenshot`}
            fill
            sizes={isFlagship ? '(max-width: 1024px) 100vw, 65vw' : '(max-width: 768px) 100vw, 40vw'}
            className="bento-img"
            loading="lazy"
          />
          <div className="bento-media-overlay" aria-hidden="true" />
        </div>
      )
    }

    if (project.slug === 'enterprise-network-deployment') {
      return <NetworkDeploymentDiagram className="bento-diagram" />
    }
    if (project.slug === 'cybersecurity-monitoring-lab') {
      return <CybersecurityLabDiagram className="bento-diagram" />
    }
    if (project.slug === 'automation-workflow-engineering') {
      return <AutomationWorkflowDiagram className="bento-diagram" />
    }

    return (
      <div className="bento-fallback-visual">
        <Layers className="w-8 h-8 text-[var(--muted)]" />
        <span>{project.projectType}</span>
      </div>
    )
  }

  return (
    <section id="work" className="work-section section-pad ruled-section" aria-labelledby="work-title">
      <div className="section-label" aria-hidden="true">
        <span>01</span>
        <span>Selected Work &amp; Case Studies</span>
      </div>

      <div className="work-header">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Engineering Portfolio
          </p>
          <h2 id="work-title">
            Proof is in
            <br />
            <em>what you build &amp; secure.</em>
          </h2>
        </div>
        <p className="work-header-desc">
          Production SaaS, client websites, hardened enterprise infrastructure, and event-driven automation.
          Every project links to a dedicated technical case study.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="bento-filter-bar" role="tablist" aria-label="Filter portfolio projects">
        {projectCategories.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              className={`bento-filter-chip${isActive ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* If "All Work", render the signature Bento Layout */}
      {activeCategory === 'All Work' ? (
        <div className="bento-grid">
          {/* ── Flagship Item: SheriaBot (Large 2-column hero card) ── */}
          {flagshipProject && (
            <article className="bento-card flagship-card">
              <div className="flagship-badge">
                <AutomationIcon className="w-3.5 h-3.5 inline mr-1 text-[var(--orange)]" />
                <span>FLAGSHIP PRODUCT &bull; FOUNDER-LED</span>
              </div>

              <div className="flagship-body">
                <div className="flagship-content">
                  <div className="bento-tag-row">
                    <span className="bento-category">{flagshipProject.category}</span>
                    <span className="bento-year">{flagshipProject.year}</span>
                    <span className="bento-status">Production Active</span>
                  </div>

                  <h3 className="flagship-title">
                    <Link href={`/work/${flagshipProject.slug}`}>{flagshipProject.title}</Link>
                  </h3>
                  <p className="flagship-desc">{flagshipProject.description}</p>

                  <div className="flagship-role-strip">
                    <span className="role-spec"><strong>ROLE:</strong> Founder &amp; Full-Stack Architect</span>
                    <span className="role-spec"><strong>IMPACT:</strong> 1,200+ statutes indexed &bull; Sub-second precision</span>
                  </div>

                  <div className="flagship-impact-bullets">
                    <div>
                      <strong>RegTech AI Engine</strong>
                      <p>Regulatory intelligence retrieval for fintech operators</p>
                    </div>
                    <div>
                      <strong>Human-in-the-Loop</strong>
                      <p>Sourced guidance with strict compliance review controls</p>
                    </div>
                  </div>

                  <div className="bento-tech-wrap">
                    {flagshipProject.technologies.map((t) => (
                      <span key={t} className="tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="bento-action-row">
                    <Link href={`/work/${flagshipProject.slug}`} className="button button-dark">
                      Read Technical Case Study <ArrowUpRight className="w-4 h-4 arrow-shift" />
                    </Link>
                    {flagshipProject.websiteUrl && (
                      <a
                        href={flagshipProject.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="button button-outline"
                      >
                        Live Platform <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flagship-preview">
                  <div className="browser-chassis-frame">
                    <div className="browser-chassis-topbar" aria-hidden="true">
                      <div className="browser-traffic-dots">
                        <span className="dot red" />
                        <span className="dot yellow" />
                        <span className="dot green" />
                      </div>
                      <span className="browser-address-bar">sheriabot.co.ke</span>
                    </div>
                    <Link href={`/work/${flagshipProject.slug}`} className="flagship-preview-link">
                      {renderVisual(flagshipProject, true)}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* ── Secondary Bento Cards ── */}
          {otherProjects.map((project) => (
            <article key={project.slug} className={`bento-card bento-card-${project.slug}`}>
              <div className="bento-card-media">
                <Link href={`/work/${project.slug}`} tabIndex={-1} aria-hidden="true">
                  {renderVisual(project)}
                </Link>
              </div>

              <div className="bento-card-info">
                <div className="bento-tag-row">
                  <span className="bento-category">{project.category}</span>
                  <span className="bento-year">{project.year}</span>
                </div>

                <h3 className="bento-card-title">
                  <Link href={`/work/${project.slug}`}>{project.title}</Link>
                </h3>

                <p className="bento-card-desc">{project.description}</p>

                <div className="bento-card-footer">
                  <div className="bento-tech-wrap">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="tech-pill text-faint">+{project.technologies.length - 4}</span>
                    )}
                  </div>

                  <div className="bento-card-links">
                    <Link href={`/work/${project.slug}`} className="text-link">
                      Case Study <ArrowUpRight className="w-3.5 h-3.5 arrow-shift" />
                    </Link>
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bento-live-icon"
                        aria-label={`Open ${project.title} live website`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Filtered List Layout */
        <div className="bento-filtered-list">
          {filteredProjects.map((project) => (
            <article key={project.slug} className="bento-card filtered-card">
              <div className="bento-card-media">
                <Link href={`/work/${project.slug}`} tabIndex={-1} aria-hidden="true">
                  {renderVisual(project)}
                </Link>
              </div>
              <div className="bento-card-info">
                <div className="bento-tag-row">
                  <span className="bento-category">{project.category}</span>
                  <span className="bento-year">{project.year}</span>
                </div>
                <h3 className="bento-card-title">
                  <Link href={`/work/${project.slug}`}>{project.title}</Link>
                </h3>
                <p className="bento-card-desc">{project.description}</p>
                <div className="bento-card-footer">
                  <div className="bento-tech-wrap">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="bento-card-links">
                    <Link href={`/work/${project.slug}`} className="button button-dark text-xs">
                      View Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="button button-outline text-xs"
                      >
                        Live Website <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
