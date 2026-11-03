import { Quote } from 'lucide-react'
import { EngineeringWorkbench } from '@/components/about/engineering-workbench'

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
              I&apos;m <strong>Christopher Modicai Rateng</strong> — a full-stack React/Next.js engineer,
              infrastructure and cybersecurity practitioner, AI automation builder, and founder of SheriaBot.
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

        <div className="about-workbench-col">
          <EngineeringWorkbench />
        </div>
      </div>
    </section>
  )
}
