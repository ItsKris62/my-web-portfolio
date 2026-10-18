import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  MapPin,
  Globe,
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { siteConfig } from '@/lib/data'

export function ConversionFooter() {
  return (
    <footer id="contact" className="contact-section dark-section" aria-labelledby="contact-title">
      <div className="section-pad contact-inner">
        <div className="contact-ambient-orb" aria-hidden="true" />

        <div className="section-label light-label" aria-hidden="true">
          <span>07</span>
          <span>Start A Conversation</span>
        </div>

      <div className="contact-header">
        <p className="eyebrow text-faint">
          <span className="eyebrow-dot" aria-hidden="true" /> Available for selected projects, consulting &amp;
          collaborations
        </p>
        <h2 id="contact-title">
          Have a difficult
          <br />
          <em>technical challenge?</em>
        </h2>
        <p className="contact-lede">
          Let&apos;s make it clearer, safer, and more dependable. Tell me what you&apos;re building, what&apos;s not
          working, or what needs to scale.
        </p>
      </div>

      {/* Dual Audience Conversion Pathways */}
      <div className="conversion-pathways-grid">
        {/* Pathway 1: Business Clients & Founders */}
        <div className="conversion-card client-conversion-card">
          <div className="conversion-card-badge">BUSINESS CLIENTS &bull; CONSULTING</div>
          <h3 className="conversion-card-title">For Founders, SMEs &amp; Organizations</h3>
          <p className="conversion-card-desc">
            Direct advisory and engineering implementation for cloud identity, defensive cybersecurity, multi-site
            networks, or custom web/SaaS builds.
          </p>

          <div className="conversion-card-actions">
            <a
              id="client-cta-consult"
              className="button button-orange w-full text-center"
              href={`mailto:${siteConfig.contact.email}?subject=ICT%20Consultation%20Request%20%E2%80%94%20Christopher%20Rateng`}
            >
              Request an ICT Consultation <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              id="client-cta-assess"
              className="button button-outline-light w-full text-center"
              href={`mailto:${siteConfig.contact.email}?subject=Security%20%26%20Infrastructure%20Assessment%20Request`}
            >
              Book an Infrastructure Assessment <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="conversion-guarantees">
            <span>
              <CheckCircle className="w-3.5 h-3.5 text-[var(--teal)] inline mr-1" /> Clear project scoping
            </span>
            <span>
              <CheckCircle className="w-3.5 h-3.5 text-[var(--teal)] inline mr-1" /> Practical timelines
            </span>
            <span>
              <CheckCircle className="w-3.5 h-3.5 text-[var(--teal)] inline mr-1" /> NDA / Confidentiality honored
            </span>
          </div>
        </div>

        {/* Pathway 2: Technical Recruiters & Engineering Hiring Teams */}
        <div className="conversion-card recruiter-conversion-card">
          <div className="conversion-card-badge">RECRUITERS &bull; FULL-TIME ROLES</div>
          <h3 className="conversion-card-title">For Engineering Teams &amp; Leadership</h3>
          <p className="conversion-card-desc">
            Evaluating candidates for Systems Infrastructure, Cloud Security, Full-Stack Engineering, or AI Automation
            roles? Quick links to verify my background:
          </p>

          <div className="recruiter-action-links">
            <a
              id="recruiter-resume-btn"
              className="button button-light w-full text-center"
              href="/documents/Christopher_Rateng_Information_Security_Resume.pdf"
              download="Christopher_Rateng_Information_Security_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="w-4 h-4 mr-1 inline" /> Download Technical Résumé (PDF)
              <ArrowDownRight className="w-4 h-4 ml-1 inline" />
            </a>

            <div className="recruiter-social-grid">
              <a
                id="contact-social-github"
                className="social-btn"
                href={siteConfig.contact.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Christopher Rateng's GitHub profile"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>

              <a
                id="contact-social-linkedin"
                className="social-btn"
                href={siteConfig.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="Connect with Christopher Rateng on LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>
            </div>

            <a
              id="recruiter-direct-email"
              className="text-link light-link text-center block pt-2"
              href={`mailto:${siteConfig.contact.email}?subject=Engineering%20Opportunity%20%E2%80%94%20Interview%20Inquiry`}
            >
              Email Directly for Employment Opportunities &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Direct Metadata Strip */}
      <div className="contact-metadata-strip">
        <div className="meta-item">
          <MapPin className="w-4 h-4 text-[var(--orange)]" aria-hidden="true" />
          <span>{siteConfig.contact.location}</span>
        </div>
        <div className="meta-item">
          <Globe className="w-4 h-4 text-[var(--teal)]" aria-hidden="true" />
          <span>{siteConfig.contact.serviceRegions}</span>
        </div>
        <div className="meta-item">
          <Mail className="w-4 h-4 text-[var(--orange)]" aria-hidden="true" />
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
        </div>
        <div className="meta-item">
          <Clock className="w-4 h-4 text-[var(--muted)]" aria-hidden="true" />
          <span>Typical response: Within 24 business hours</span>
        </div>
      </div>

      {/* Bottom Sub-Footer */}
      <div className="site-sub-footer">
        <div className="sub-footer-brand">
          <div className="footer-monogram">
            <Image
              src="/branding/christopher-rateng-logo-icon.png"
              alt="Christopher Rateng Monogram"
              width={26}
              height={26}
              className="brand-logo-img"
            />
          </div>
          <div>
            <strong>{siteConfig.name}</strong>
            <small>Systems Infrastructure &bull; Cloud Security &bull; Software</small>
          </div>
        </div>

        <div className="sub-footer-nav">
          <a href="#top" className="text-link light-link">
            Back to Top &uarr;
          </a>
        </div>

        <div className="sub-footer-copy">
          <span>&copy; {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.</span>
        </div>
      </div>
      </div>
    </footer>
  )
}
