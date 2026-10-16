'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  Lock,
  Mail,
  MapPin,
  Menu,
  Network,
  Shield,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}
import {
  career,
  certifications,
  education,
  projectCategories,
  publishedProjects,
  research,
  services,
  siteConfig,
  skillGroups,
  stats,
  webDevOffering,
  type Project,
  type ProjectCategory,
} from '@/lib/data'

const navItems = [
  ['About', 'about'],
  ['Journey', 'journey'],
  ['Expertise', 'expertise'],
  ['Skills', 'skills'],
  ['Work', 'work'],
  ['Education', 'education'],
  ['Credentials', 'credentials'],
  ['Contact', 'contact'],
]

const serviceIconMap: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>> = {
  shield: Shield,
  lock: Lock,
  network: Network,
  sparkles: Sparkles,
  terminal: Terminal,
}

function Mark() {
  return (
    <div className="brand-logo-frame">
      <Image
        src="/branding/christopher-rateng-logo-icon.png"
        alt="Christopher Rateng Logo"
        width={35}
        height={35}
        className="brand-logo-img"
        priority
      />
    </div>
  )
}

function SpatialSystem() {
  return (
    <div className="spatial-system" aria-label="Abstract diagram representing infrastructure, security, and software">
      <div className="system-grid" />
      <div className="system-orbit orbit-one" />
      <div className="system-orbit orbit-two" />
      <div className="system-panel panel-one"><span>01</span><strong>INFRA</strong></div>
      <div className="system-panel panel-two"><span>02</span><strong>SEC</strong></div>
      <div className="system-panel panel-three"><span>03</span><strong>CODE</strong></div>
      <i className="system-node node-one" />
      <i className="system-node node-two" />
      <i className="system-node node-three" />
      <span className="system-caption">SYSTEMS / 01—03</span>
    </div>
  )
}

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All Work'>('All Work')
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState<string>('about')
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)

      const sectionIds = navItems.map(([, id]) => id)
      const scrollPosition = window.scrollY + 220

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id)
          return
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -90
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveSection(id)
      history.replaceState(null, '', `#${id}`)
    }
  }

  const filteredProjects: Project[] =
    activeCategory === 'All Work'
      ? publishedProjects
      : publishedProjects.filter((p) => p.category === activeCategory)

  return (
    <div className="site-shell">
      <header className={`site-nav ${isScrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
        <a
          className="brand"
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setActiveSection('')
            history.replaceState(null, '', '#')
          }}
          aria-label="Christopher Rateng home"
        >
          <Mark />
          <div className="brand-text">
            <span className="brand-name">Christopher Rateng</span>
            <span className="brand-tag">ICT &bull; SECURITY</span>
          </div>
        </a>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {navItems.map(([label, id]) => {
            const isActive = activeSection === id
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={(e) => scrollToSection(e, id)}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="nav-link-text">{label}</span>
                {isActive && <span className="nav-active-indicator" />}
              </a>
            )
          })}
        </nav>

        <a className="nav-cta" href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>
          Let&apos;s talk <ArrowUpRight aria-hidden="true" />
        </a>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> {siteConfig.positioning}</div>
            <h1>I build, secure, automate<br /><em>&amp; maintain</em><br />technology.</h1>
            <p className="hero-lede">{siteConfig.tagline} {siteConfig.secondaryTagline}</p>
            <div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <ArrowDownRight aria-hidden="true" /></a><a className="text-link" href="#contact">Request an ICT consultation <ArrowUpRight aria-hidden="true" /></a></div>
            <div className="hero-meta"><span>Cybersecurity · Infrastructure · Software · AI Automation</span><span>{siteConfig.contact.location} / Remote worldwide</span></div>
          </div>
          <div className="hero-visual">
            <div className="portrait-frame">
              <div className="portrait-container">
                <Image
                  src="/portraits/Christopher_rateng-Passport-Photo.jpg"
                  alt="Christopher Modicai Rateng"
                  fill
                  priority
                  sizes="(max-width: 800px) 70vw, 420px"
                  className="portrait-photo"
                />
                <div className="portrait-overlay">
                  <span>Christopher M. Rateng</span>
                  <small>SYSTEMS · SECURITY · AUTOMATION</small>
                </div>
              </div>
            </div>
            <SpatialSystem />
            <span className="visual-coordinate">01° 17′ S / 36° 49′ E</span>
          </div>
          <a className="scroll-cue" href="#about"><span>Scroll to explore</span><ChevronDown aria-hidden="true" /></a>
        </section>

        <section id="about" className="about section-pad ruled-section">
          <div className="section-label"><span>01</span><span>The person behind the systems</span></div>
          <div className="about-grid"><h2>Not just someone<br />who keeps systems running.<br /><em>Someone who builds<br />what comes next.</em></h2><div className="about-copy"><p>I&apos;m {siteConfig.fullName} — a {siteConfig.positioning.toLowerCase()}, and founder of SheriaBot.</p><p>My background started in supporting real business systems — networks, endpoints, servers, users, and enterprise infrastructure. Over time, that foundation expanded into cybersecurity, software development, AI automation, and building digital products.</p><p>Today, I work across the technology lifecycle: understanding problems, designing solutions, implementing systems, securing them, and making sure they keep working. Services are available locally in Kenya, across East Africa where practical, and remotely worldwide.</p><p className="highlight">Technology should be dependable, understandable, and genuinely useful to the people who rely on it.</p></div></div>
        </section>

        <section className="stats section-pad"><div className="stats-intro"><span className="eyebrow">Selected signals</span><p>Measured by the work that happens behind the interface.</p></div><div className="stats-grid">{stats.map(({ value, label }) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>

        <section id="journey" className="journey section-pad dark-section ruled-section"><div className="section-label light-label"><span>02</span><span>The journey</span></div><div className="journey-heading"><h2>Every system<br /><em>taught me</em><br />something.</h2><p>From troubleshooting enterprise systems to building secure software and AI-powered products.</p></div><div className="timeline">{career.map((milestone, index) => { const isOpen = expandedMilestone === index; return <div className="timeline-item" key={milestone.title}><div className="timeline-year">{milestone.period}</div><div className="timeline-node"><span>{String(index + 1).padStart(2, '0')}</span></div><div className="timeline-copy"><h3>{milestone.title}</h3>{milestone.organization && <p className="timeline-org">{milestone.organization}</p>}<p>{milestone.summary}</p>{milestone.story && <p className="timeline-story">{milestone.story}</p>}<button className="timeline-toggle" onClick={() => setExpandedMilestone(isOpen ? null : index)} aria-expanded={isOpen}>{isOpen ? 'Hide details' : 'Read more'} {isOpen ? <ChevronDown aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}</button>{isOpen && (<div className="timeline-details"><ul>{milestone.details.map((d, i) => <li key={i}>{d}</li>)}</ul>{milestone.technologies && milestone.technologies.length > 0 && <p className="timeline-tech"><strong>Technologies:</strong> {milestone.technologies.join(' · ')}</p>}{milestone.impact && <p className="timeline-impact"><strong>Impact:</strong> {milestone.impact}</p>}</div>)}</div></div> })}</div><a className="button button-outline" href="#contact">Request résumé <ArrowDownRight aria-hidden="true" /></a></section>

        <section id="expertise" className="services section-pad ruled-section"><div className="section-label"><span>03</span><span>How I can help</span></div><div className="services-heading"><h2>Good technology<br /><em>should work harder</em><br />for your business.</h2><p>I work with businesses, startups, founders, and teams that need reliable technology, practical engineering expertise, and solutions built to last.</p></div><div className="services-grid">{services.map(({ number, title, headline, description, target, deliverables, technologies, engagementTypes, clientBenefit, cta, icon, tone }) => { const Icon = serviceIconMap[icon] ?? Terminal; return <article className={`service service-${tone}`} key={title}><div className="service-top"><span>{number}</span><Icon aria-hidden="true" /></div><h3>{title}</h3><p className="service-headline">&ldquo;{headline}&rdquo;</p><p>{description}</p><div className="service-meta"><p><strong>For:</strong> {target}</p>{technologies.length > 0 && <p><strong>Stack:</strong> {technologies.join(' · ')}</p>}{engagementTypes && engagementTypes.length > 0 && <p><strong>Engagements:</strong> {engagementTypes.join(' · ')}</p>}{clientBenefit && <p className="service-benefit"><strong>Client benefit:</strong> {clientBenefit}</p>}</div><details className="service-deliverables"><summary>What I deliver <ChevronDown aria-hidden="true" /></summary><ul>{deliverables.map((d, i) => <li key={i}>{d}</li>)}</ul></details><a className="service-cta text-link" href={`#contact?service=${encodeURIComponent(title)}`}>{cta} <ArrowUpRight aria-hidden="true" /></a></article> })}</div><div className="specialist"><span>Specialist callout</span><strong>Fintech &amp; RegTech Engineering</strong><p>Technical integrations, secure APIs, payment-system troubleshooting, and operational compliance workflows.</p><a className="text-link" href="#contact">Discuss your project <ArrowUpRight aria-hidden="true" /></a></div></section>

        <section className="web-offering section-pad ruled-section"><div className="web-offering-inner"><div className="web-offering-copy"><span className="eyebrow"><span className="eyebrow-dot" /> Also available</span><h2>{webDevOffering.title}</h2><p>{webDevOffering.description}</p><ul className="web-offering-list">{webDevOffering.services.map((s, i) => <li key={i}>{s}</li>)}</ul><a className="button button-orange" href="#work">{webDevOffering.cta} <ArrowUpRight aria-hidden="true" /></a></div><div className="web-offering-visual" aria-hidden="true"><div className="web-browser"><div className="web-browser-bar"><span /><span /><span /></div><div className="web-browser-body"><div className="web-line web-line-wide" /><div className="web-line" /><div className="web-line web-line-medium" /><div className="web-line" /></div></div></div></div></section>

        <section id="skills" className="skills section-pad ruled-section"><div className="section-label"><span>04</span><span>Technical capabilities</span></div><div className="skills-heading"><h2>A broad toolkit,<br /><em>applied to real</em><br />business problems.</h2><p>From identity and networking to security, development and automation — the technologies I use to design, implement and maintain dependable systems.</p></div><div className="skills-grid">{skillGroups.map((group) => <article className="skill-group" key={group.id}><h3>{group.label}</h3><ul className="skill-list">{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div></section>

        <section id="work" className="work section-pad"><div className="section-label"><span>05</span><span>Selected work</span></div><div className="work-heading"><h2>Proof is in<br /><em>what you build.</em></h2><p>A collection of software, digital experiences, infrastructure projects, and technical experiments.</p></div><div className="project-filters" role="tablist" aria-label="Filter projects by category">{projectCategories.map((cat) => <button key={cat.id} role="tab" aria-selected={activeCategory === cat.id} className={activeCategory === cat.id ? 'filter-active' : ''} onClick={() => setActiveCategory(cat.id)}>{cat.label}</button>)}</div><div className="projects">{filteredProjects.map(({ slug, title, category, description, technologies, featured, projectType, year, websiteUrl, desktopScreenshots }) => <article className={`project ${featured ? 'featured' : ''}`} key={slug}><a className="project-link" href={`/work/${slug}`} aria-label={`View case study for ${title}`}><div className="project-visual"><div className="project-lines" /><span className="project-type">{category}</span>{featured ? <div className="project-screenshot project-featured-render">{desktopScreenshots && desktopScreenshots.length > 0 ? (<><img src={desktopScreenshots[0].src} alt={desktopScreenshots[0].alt} /><div className="project-core project-core-badge"><span>Sheria</span><strong>Bot</strong><small>REGULATORY INTELLIGENCE</small></div></>) : (<div className="project-core"><span>Sheria</span><strong>Bot</strong><small>REGULATORY INTELLIGENCE</small></div>)}</div> : desktopScreenshots && desktopScreenshots.length > 0 ? <div className="project-screenshot"><img src={desktopScreenshots[0].src} alt={desktopScreenshots[0].alt} /></div> : <div className="project-placeholder"><span>{projectType}</span></div>}<span className="project-year">{year}</span></div><div className="project-info"><div><h3>{title}</h3><p>{description}</p></div><div className="project-footer"><span>{technologies.join(' · ')}</span><span className="case-study">View case study <ArrowUpRight aria-hidden="true" /></span></div></div></a>{websiteUrl ? <a className="project-visit" href={websiteUrl} target="_blank" rel="noreferrer" aria-label={`Visit ${title} website`}>Visit site <ExternalLink aria-hidden="true" /></a> : null}</article>)}</div></section>

        <section id="education" className="education section-pad ruled-section"><div className="section-label"><span>06</span><span>Education &amp; research</span></div><div className="education-heading"><h2>Built on a<br /><em>strong technical</em><br />foundation.</h2><p>Formal academic training and active research in information systems, networking, and information security.</p></div><div className="education-grid">{education.map((ed) => <article className="education-item" key={ed.degree}><div className="education-top-bar"><div className="usiu-seal-wrap"><Image src="/logos/usiu-logo.png" alt="United States International University–Africa" width={56} height={56} className="usiu-seal-img" /></div><div className="institution-info"><span className="institution-title">{ed.institution}</span><span className="institution-subtitle">School of Science &amp; Technology · Nairobi, Kenya</span></div></div><div className="education-body"><div className="education-degree-row"><GraduationCap className="education-icon" aria-hidden="true" /><h3 className="education-degree-title">{ed.degree}</h3></div><div className="education-tags"><span className="education-field-chip">{ed.field}</span><span className={`education-status-chip ${ed.status === 'in-progress' ? 'status-active' : 'status-complete'}`}>{ed.status === 'in-progress' ? 'In Progress · Target Nov 2026' : `Class of ${ed.year}`}</span></div></div></article>)}</div><div className="research-block"><div className="research-header-row"><div className="research-title-group"><span className="eyebrow"><span className="eyebrow-dot" /> Active research</span><h3>{research.title}</h3></div><div className="research-institution-seal"><Image src="/logos/usiu-logo.png" alt="USIU-Africa Research" width={38} height={38} className="research-seal-img" /><div className="research-seal-text"><strong>USIU-AFRICA</strong><small>Graduate Research</small></div></div></div><p>{research.description}</p><div className="research-interests"><strong>Research interests:</strong><ul>{research.interests.map((i) => <li key={i}>{i}</li>)}</ul></div>{research.context && <p className="research-context">{research.context}</p>}</div></section>

        <section id="credentials" className="credentials section-pad ruled-section"><div className="section-label"><span>07</span><span>Certifications</span></div><div className="credentials-heading"><h2>Verified<br /><em>professional</em><br />credentials.</h2><p>Industry certifications across cybersecurity, networking, and information technology fundamentals.</p></div><div className="credentials-grid">{certifications.map((cert) => <article className="credential" key={cert.title}><div className="credential-icon"><Award aria-hidden="true" /></div><div className="credential-body"><h3>{cert.title}</h3><p className="credential-issuer">{cert.issuer}</p><p className="credential-year">{cert.year}</p></div>{cert.verifyUrl ? <a className="credential-verify text-link" href={cert.verifyUrl} target="_blank" rel="noreferrer">Verify <ExternalLink aria-hidden="true" /></a> : null}</article>)}</div></section>

        <section id="contact" className="contact section-pad dark-section"><div className="contact-orb" /><div className="section-label light-label"><span>08</span><span>Start a conversation</span></div><div className="contact-content"><p className="eyebrow">Available for selected projects, consulting &amp; collaborations</p><h2>Have a difficult<br /><em>technical problem?</em></h2><p className="contact-copy">Let&apos;s make it clearer, safer, and more useful. Tell me what you&apos;re building, what&apos;s not working, or what needs to work better.</p><div className="contact-pathways"><div className="pathway pathway-client"><h3>For business clients</h3><p>Request an ICT consultation, or book an infrastructure &amp; security assessment.</p><a className="button button-orange" href={`mailto:${siteConfig.contact.email}?subject=ICT%20Consultation%20Request`}>Request an ICT consultation <ArrowUpRight aria-hidden="true" /></a><a className="text-link light-link" href={`mailto:${siteConfig.contact.email}?subject=Infrastructure%20%26%20Security%20Assessment%20Request`}>Book an assessment <ArrowUpRight aria-hidden="true" /></a></div><div className="pathway pathway-recruiter"><h3>For engineering &amp; employment opportunities</h3><p>View my public work or request a technical résumé.</p><div className="recruiter-links"><a className="recruiter-link" href={siteConfig.contact.github} target="_blank" rel="noreferrer"><GithubIcon className="w-[15px] h-[15px]" /> View GitHub</a><a className="recruiter-link" href={siteConfig.contact.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon className="w-[15px] h-[15px]" /> Connect on LinkedIn</a><a className="recruiter-link" href={`mailto:${siteConfig.contact.email}?subject=R%C3%A9sum%C3%A9%20Request`}><FileText aria-hidden="true" /> Request résumé</a></div></div></div><div className="contact-meta"><span><MapPin aria-hidden="true" /> {siteConfig.contact.location}</span><span><Globe aria-hidden="true" /> {siteConfig.contact.serviceRegions}</span><span><Mail aria-hidden="true" /> {siteConfig.contact.email}</span></div></div><footer><a className="brand footer-brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><Mark /><span className="footer-brand-name">{siteConfig.name}</span></a><span>{siteConfig.contact.location} / Remote worldwide</span><span>© 2026 {siteConfig.name}</span></footer></section>
      </main>
    </div>
  )
}
