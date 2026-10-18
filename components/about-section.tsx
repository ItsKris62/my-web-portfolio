import { Quote, Compass, ShieldCheck, Wrench } from 'lucide-react'
import { siteConfig } from '@/lib/data'

export function AboutSection() {
  return (
    <section id="about" className="about-section section-pad ruled-section" aria-labelledby="about-title">
      <div className="section-label" aria-hidden="true">
        <span>05</span>
        <span>The Person Behind The Systems</span>
      </div>

      <div className="about-grid">
        <div className="about-narrative-col">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Background &amp; Philosophy
          </p>
          <h2 id="about-title">
            Not just someone who keeps systems running.
            <br />
            <em>Someone who builds what comes next.</em>
          </h2>

          <div className="about-paragraphs">
            <p>
              I&apos;m <strong>Christopher Modicai Rateng</strong> — a systems infrastructure &amp; cloud security
              specialist, software developer, AI automation engineer, independent ICT consultant, and founder of
              SheriaBot.
            </p>
            <p>
              My background started in supporting real business systems — networks, endpoints, servers, users, and
              enterprise infrastructure. Over time, that foundation expanded into cybersecurity, software development,
              AI automation, and building digital products.
            </p>
            <p>
              Today, I work across the technology lifecycle: understanding problems, designing solutions, implementing
              systems, securing them, and making sure they keep working. Services are available locally in Kenya, across
              East Africa where practical, and remotely worldwide.
            </p>
          </div>

          <blockquote className="about-pullquote">
            <Quote className="quote-icon" aria-hidden="true" />
            <p>&ldquo;Technology should be dependable, understandable, and genuinely useful to the people who rely on it.&rdquo;</p>
            <cite>&mdash; Christopher Modicai Rateng</cite>
          </blockquote>
        </div>

        <div className="about-cards-col">
          <div className="ethos-card">
            <div className="ethos-icon" aria-hidden="true">
              <Compass className="w-5 h-5 text-[var(--orange)]" />
            </div>
            <h4>Pragmatic Engineering</h4>
            <p>
              I choose proven, maintainable technologies over transient hype. Systems should solve real operational
              bottlenecks without introducing unmanageable complexity.
            </p>
          </div>

          <div className="ethos-card">
            <div className="ethos-icon" aria-hidden="true">
              <ShieldCheck className="w-5 h-5 text-[var(--teal)]" />
            </div>
            <h4>Security from Day Zero</h4>
            <p>
              Security isn&apos;t an afterthought bolted onto a finished product. Every architecture incorporates least-privilege
              access, network segmentation, and auditable verification.
            </p>
          </div>

          <div className="ethos-card">
            <div className="ethos-icon" aria-hidden="true">
              <Wrench className="w-5 h-5 text-[var(--ink)]" />
            </div>
            <h4>End-to-End Ownership</h4>
            <p>
              From structured cabling in a multi-site branch office to Next.js App Router code and automated n8n
              pipelines, I take pride in understanding every layer of the stack.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
