import Image from 'next/image'
import { GraduationCap, Award, BookOpen, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { education, research, certifications } from '@/lib/data'

export function EducationCredentials() {
  return (
    <section id="credentials" className="credentials-section section-pad ruled-section" aria-labelledby="creds-title">
      <div className="section-label" aria-hidden="true">
        <span>06</span>
        <span>Academic Pedigree &amp; Credentials</span>
      </div>

      <div className="credentials-header">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Formal Qualifications
          </p>
          <h2 id="creds-title">
            Built on a
            <br />
            <em>rigorous technical</em>
            <br />
            foundation.
          </h2>
        </div>
        <p className="credentials-header-desc">
          Formal academic training in information systems, networking, and security, complemented by verified
          industry certifications and empirical research into financial technology defense.
        </p>
      </div>

      {/* Degrees Grid */}
      <div className="education-grid">
        {education.map((ed) => (
          <article key={ed.degree} className="education-card">
            <div className="education-card-top">
              <div className="usiu-seal-wrap">
                <Image
                  src="/logos/usiu-logo.png"
                  alt="United States International University–Africa Seal"
                  width={52}
                  height={52}
                  className="usiu-seal-img"
                  loading="lazy"
                />
              </div>
              <div className="institution-info">
                <span className="institution-title">{ed.institution}</span>
                <span className="institution-subtitle">School of Science &amp; Technology &bull; Nairobi, Kenya</span>
              </div>
            </div>

            <div className="education-card-body">
              <div className="education-degree-row">
                <GraduationCap className="w-5 h-5 text-[var(--orange)] shrink-0" aria-hidden="true" />
                <h3 className="education-degree-title">{ed.degree}</h3>
              </div>

              <div className="education-chips-row">
                <span className="education-field-chip">{ed.field}</span>
                <span
                  className={`education-status-chip ${
                    ed.status === 'in-progress' ? 'status-active' : 'status-complete'
                  }`}
                >
                  {ed.status === 'in-progress' ? 'In Progress &bull; Target Nov 2026' : `Class of ${ed.year}`}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Active MSc Graduate Research Highlight Card */}
      <div className="research-highlight-card">
        <div className="research-card-header">
          <div className="research-title-group">
            <span className="research-badge">
              <BookOpen className="w-3.5 h-3.5 inline mr-1 text-[var(--orange)]" />
              ACTIVE GRADUATE THESIS &bull; MSC INFORMATION SECURITY
            </span>
            <h3 className="research-title">&ldquo;{research.title}&rdquo;</h3>
          </div>
          <div className="research-seal-box">
            <Image
              src="/logos/usiu-logo.png"
              alt="USIU-Africa"
              width={40}
              height={40}
              className="research-seal-img"
              loading="lazy"
            />
            <div className="research-seal-text">
              <strong>USIU-AFRICA</strong>
              <small>Graduate School of Science &amp; Technology</small>
            </div>
          </div>
        </div>

        <p className="research-description">{research.description}</p>

        <div className="research-interests-box">
          <strong className="research-interests-label">Research Domains &amp; Focus:</strong>
          <div className="research-tags-wrap">
            {research.interests.map((interest) => (
              <span key={interest} className="research-tag">
                {interest}
              </span>
            ))}
          </div>
        </div>

        {research.context && (
          <p className="research-disclaimer">
            <em>Note: {research.context}</em>
          </p>
        )}
      </div>

      {/* Verified Professional Certifications */}
      <div className="certifications-block">
        <h3 className="certifications-subhead">
          <Award className="w-5 h-5 inline mr-1 text-[var(--orange)]" /> Verified Professional Certifications
        </h3>
        <p className="certifications-subtext">
          Industry-recognized credentials in offensive security, defensive operations, forensics, and IT fundamentals.
        </p>

        <div className="certifications-grid">
          {certifications.map((cert) => (
            <article key={cert.title} className="cert-card">
              <div className="cert-top">
                <span className="cert-issuer-badge">{cert.issuer}</span>
                <span className="cert-year">{cert.year}</span>
              </div>
              <h4 className="cert-title">{cert.title}</h4>

              {cert.verifyUrl ? (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-verify-link text-link"
                  aria-label={`Verify ${cert.title} credential`}
                >
                  Verify Credential <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <div className="cert-verified-status">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--teal)] inline mr-1" />
                  <span>Credential Completed</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
