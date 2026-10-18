import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, ChevronLeft, Shield, Layers, CheckCircle2 } from 'lucide-react'
import { getProjectBySlug, publishedProjects, siteConfig } from '@/lib/data'
import { GithubIcon, AutomationIcon } from '@/components/icons'
import {
  NetworkDeploymentDiagram,
  CybersecurityLabDiagram,
  AutomationWorkflowDiagram,
} from '@/components/technical-diagrams'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Project not found' }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl || 'https://crateng.co.ke'
  const ogImage = project.desktopScreenshots?.[0]?.src
    ? `${siteUrl}${project.desktopScreenshots[0].src}`
    : `${siteUrl}/branding/christopher-rateng-logo-social.png`

  return {
    title: `${project.title} — Technical Case Study by ${siteConfig.name}`,
    description: project.description,
    keywords: [
      project.title,
      project.category,
      ...project.technologies,
      'Christopher Rateng',
      'Case Study',
      'Software Architecture',
      'Kenya',
    ],
    alternates: {
      canonical: `${siteUrl}/work/${slug}`,
    },
    openGraph: {
      title: `${project.title} — Technical Case Study by ${siteConfig.name}`,
      description: project.description,
      type: 'article',
      url: `${siteUrl}/work/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} showcase`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Technical Case Study by ${siteConfig.name}`,
      description: project.description,
      images: [ogImage],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="site-shell project-detail">
        <main className="section-pad" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
          <p>Project not found.</p>
          <Link className="text-link" href="/#work">
            <ChevronLeft aria-hidden="true" /> Back to selected work
          </Link>
        </main>
      </div>
    )
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl || 'https://crateng.co.ke'
  const ogImage = project.desktopScreenshots?.[0]?.src
    ? `${siteUrl}${project.desktopScreenshots[0].src}`
    : `${siteUrl}/branding/christopher-rateng-logo-social.png`

  const projectStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Work',
            item: `${siteUrl}/#work`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: `${siteUrl}/work/${slug}`,
          },
        ],
      },
      {
        '@type': 'CreativeWork',
        name: project.title,
        headline: project.description,
        description: project.overview || project.description,
        url: `${siteUrl}/work/${slug}`,
        image: ogImage,
        author: {
          '@type': 'Person',
          name: siteConfig.fullName,
          url: siteUrl,
        },
        keywords: project.technologies.join(', '),
        datePublished: `${project.year}-01-01`,
      },
    ],
  }

  const isFlagship = project.slug === 'sheriabot'

  return (
    <div className="site-shell project-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectStructuredData) }}
      />
      <main id="main-content">
        <section className={`hero section-pad project-hero${isFlagship ? ' flagship-project-hero' : ''}`}>
          <div className="project-top-nav">
            <Link className="text-link back-link" href="/#work">
              <ChevronLeft aria-hidden="true" /> Back to selected work
            </Link>
          </div>

          <div className="project-hero-meta">
            {isFlagship ? (
              <div className="flagship-hero-tag">
                <AutomationIcon className="w-3.5 h-3.5 inline mr-1 text-[var(--orange)]" />
                <span>FLAGSHIP PRODUCT &bull; FOUNDER-LED</span>
              </div>
            ) : (
              <span className="eyebrow">
                <span className="eyebrow-dot" /> {project.category}
              </span>
            )}

            <h1>{project.title}</h1>
            <p className="hero-lede">{project.fullDescription || project.description}</p>

            <div className="project-hero-actions">
              {project.websiteUrl && (
                <a className="button button-dark" href={project.websiteUrl} target="_blank" rel="noreferrer">
                  Visit Live Platform <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                </a>
              )}
              {project.repositoryUrl && (
                <a className="button button-outline" href={project.repositoryUrl} target="_blank" rel="noreferrer">
                  View Source Code <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="project-hero-facts">
              {project.client && (
                <span>
                  <strong>Client / Origin:</strong> {project.client}
                </span>
              )}
              <span>
                <strong>Role:</strong> {project.role}
              </span>
              <span>
                <strong>Timeline:</strong> {project.year}
              </span>
              {project.industry && (
                <span>
                  <strong>Sector:</strong> {project.industry}
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="section-pad ruled-section project-body">
          {project.overview && (
            <div className="case-section">
              <h2>Project Overview</h2>
              <p>{project.overview}</p>
            </div>
          )}

          {project.objectives && project.objectives.length > 0 && (
            <div className="case-section">
              <h2>Key Objectives</h2>
              <ul className="case-bullet-list">
                {project.objectives.map((o, i) => (
                  <li key={i}>
                    <CheckCircle2 className="w-4 h-4 text-[var(--teal)] shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.responsibilities && project.responsibilities.length > 0 && (
            <div className="case-section">
              <h2>My Engineering Scope &amp; Role</h2>
              <ul className="case-bullet-list">
                {project.responsibilities.map((r, i) => (
                  <li key={i}>
                    <CheckCircle2 className="w-4 h-4 text-[var(--orange)] shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.solution && (
            <div className="case-section">
              <h2>Architectural Solution</h2>
              <p>{project.solution}</p>
            </div>
          )}

          {project.implementationHighlights && project.implementationHighlights.length > 0 && (
            <div className="case-section">
              <h2>Implementation Highlights</h2>
              <ul className="case-bullet-list">
                {project.implementationHighlights.map((h, i) => (
                  <li key={i}>
                    <CheckCircle2 className="w-4 h-4 text-[var(--teal)] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.technologies.length > 0 && (
            <div className="case-section">
              <h2>Applied Technologies &amp; Standards</h2>
              <div className="tech-list">
                {project.technologies.map((t) => (
                  <span key={t} className="tech-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Visual Showcase: Real Screenshots OR Authentic Technical Diagrams */}
          <div className="case-section">
            <h2>Visual Showcase &amp; Architecture</h2>
            {project.desktopScreenshots && project.desktopScreenshots.length > 0 ? (
              <div className="screenshot-gallery">
                {project.desktopScreenshots.map((s, i) => (
                  <figure key={i} className="screenshot-frame">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={1200}
                      height={750}
                      sizes="(max-width: 860px) 100vw, 820px"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                      priority={i === 0}
                    />
                    <figcaption className="screenshot-caption">{s.alt}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="case-diagram-container">
                {project.slug === 'enterprise-network-deployment' && <NetworkDeploymentDiagram />}
                {project.slug === 'cybersecurity-monitoring-lab' && <CybersecurityLabDiagram />}
                {project.slug === 'automation-workflow-engineering' && <AutomationWorkflowDiagram />}
                <p className="case-diagram-note">
                  <em>
                    Technical architecture illustration for non-graphical infrastructure/security work. Clearly labeled
                    conceptual topology.
                  </em>
                </p>
              </div>
            )}
          </div>

          {project.outcomes && project.outcomes.length > 0 && (
            <div className="case-section">
              <h2>Verified Outcomes &amp; Impact</h2>
              <ul className="case-bullet-list">
                {project.outcomes.map((o, i) => (
                  <li key={i}>
                    <CheckCircle2 className="w-4 h-4 text-[var(--teal)] shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="section-pad project-cta ruled-section">
          <h2>Have a similar challenge in mind?</h2>
          <p className="project-cta-lede">
            Let&apos;s discuss how to apply these architectural patterns and operational safeguards to your systems.
          </p>
          <div className="project-cta-actions">
            <a
              className="button button-orange"
              href={`mailto:${siteConfig.contact.email}?subject=Project%20Enquiry%20%E2%80%94%20${encodeURIComponent(
                project.title,
              )}`}
            >
              Start a Conversation <ArrowUpRight aria-hidden="true" />
            </a>
            <Link className="text-link" href="/#work">
              <ChevronLeft aria-hidden="true" /> Back to all selected work
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
