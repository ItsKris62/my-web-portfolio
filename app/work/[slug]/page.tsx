import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, ChevronLeft } from 'lucide-react'
import { getProjectBySlug, publishedProjects, siteConfig } from '@/lib/data'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  )
}

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://christopherrateng.com'
  const ogImage = project.desktopScreenshots?.[0]?.src
    ? `${siteUrl}${project.desktopScreenshots[0].src}`
    : `${siteUrl}/branding/christopher-rateng-logo-social.png`

  return {
    title: `${project.title} — Case Study by ${siteConfig.name}`,
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
      title: `${project.title} — Case Study by ${siteConfig.name}`,
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
      title: `${project.title} — Case Study by ${siteConfig.name}`,
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
          <Link className="text-link" href="/#work"><ChevronLeft aria-hidden="true" /> Back to work</Link>
        </main>
      </div>
    )
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://christopherrateng.com'
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
            name: 'Selected Work',
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

  return (
    <div className="site-shell project-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectStructuredData) }}
      />
      <main id="top">
        <section className="hero section-pad project-hero">
          <Link className="text-link back-link" href="/#work"><ChevronLeft aria-hidden="true" /> Back to work</Link>
          <div className="project-hero-meta">
            <span className="eyebrow"><span className="eyebrow-dot" /> {project.category}</span>
            <h1>{project.title}</h1>
            <p className="hero-lede">{project.description}</p>
            <div className="project-hero-actions">
              {project.websiteUrl ? (
                <a className="button button-dark" href={project.websiteUrl} target="_blank" rel="noreferrer">Visit Website <ExternalLink aria-hidden="true" /></a>
              ) : null}
              {project.repositoryUrl ? (
                <a className="button button-outline" href={project.repositoryUrl} target="_blank" rel="noreferrer">View Source <GithubIcon className="w-[15px] h-[15px]" /></a>
              ) : null}
            </div>
            <div className="project-hero-facts">
              {project.client ? <span><strong>Client:</strong> {project.client}</span> : null}
              <span><strong>Role:</strong> {project.role}</span>
              <span><strong>Year:</strong> {project.year}</span>
              {project.industry ? <span><strong>Industry:</strong> {project.industry}</span> : null}
            </div>
          </div>
        </section>

        <section className="section-pad ruled-section project-body">
          {project.overview ? (
            <div className="case-section">
              <h2>Overview</h2>
              <p>{project.overview}</p>
            </div>
          ) : null}

          {project.problem ? (
            <div className="case-section">
              <h2>The Problem</h2>
              <p>{project.problem}</p>
            </div>
          ) : null}

          {project.objectives && project.objectives.length > 0 ? (
            <div className="case-section">
              <h2>Objectives</h2>
              <ul>
                {project.objectives.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </div>
          ) : null}

          {project.responsibilities && project.responsibilities.length > 0 ? (
            <div className="case-section">
              <h2>My Role</h2>
              <ul>
                {project.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          ) : null}

          {project.solution ? (
            <div className="case-section">
              <h2>Solution</h2>
              <p>{project.solution}</p>
            </div>
          ) : null}

          {project.technicalApproach ? (
            <div className="case-section">
              <h2>Technical Approach</h2>
              <p>{project.technicalApproach}</p>
            </div>
          ) : null}

          {project.implementationHighlights && project.implementationHighlights.length > 0 ? (
            <div className="case-section">
              <h2>Implementation Highlights</h2>
              <ul>
                {project.implementationHighlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          ) : null}

          {project.technologies.length > 0 ? (
            <div className="case-section">
              <h2>Technologies</h2>
              <div className="tech-list">
                {project.technologies.map((t) => <span key={t} className="tech-chip">{t}</span>)}
              </div>
            </div>
          ) : null}

          {project.desktopScreenshots && project.desktopScreenshots.length > 0 ? (
            <div className="case-section">
              <h2>Screenshots &amp; Renders</h2>
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
                    {s.placeholder ? (
                      <figcaption className="screenshot-note">Screenshot pending replacement</figcaption>
                    ) : (
                      <figcaption className="screenshot-caption">{s.alt}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          ) : null}

          {project.challenges && project.challenges.length > 0 ? (
            <div className="case-section">
              <h2>Challenges</h2>
              <ul>
                {project.challenges.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          ) : null}

          {project.outcomes && project.outcomes.length > 0 ? (
            <div className="case-section">
              <h2>Outcomes</h2>
              <ul>
                {project.outcomes.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </div>
          ) : null}

          {project.lessonsLearned && project.lessonsLearned.length > 0 ? (
            <div className="case-section">
              <h2>Lessons Learned</h2>
              <ul>
                {project.lessonsLearned.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            </div>
          ) : null}
        </section>

        <section className="section-pad project-cta ruled-section">
          <h2>Have a similar project in mind?</h2>
          <a className="button button-orange" href={`mailto:${siteConfig.contact.email}?subject=Project%20enquiry%20%E2%80%94%20${encodeURIComponent(project.title)}`}>Start a conversation <ArrowUpRight aria-hidden="true" /></a>
          <Link className="text-link" href="/#work"><ChevronLeft aria-hidden="true" /> Back to all work</Link>
        </section>
      </main>
    </div>
  )
}
