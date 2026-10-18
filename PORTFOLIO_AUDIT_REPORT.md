# PORTFOLIO AUDIT REPORT — Christopher Rateng Portfolio
**Prepared:** October 2026  
**Purpose:** Full codebase audit for UX/UI redesign context. Feed this document directly into v0.app to execute a complete redesign with dedicated case study sub-pages (`/work/[slug]`).

---

## 1. STACK & ENVIRONMENT SPECIFICATION

### Framework & Runtime
| Package | Version |
|---------|---------|
| **Next.js** | `16.4.0` |
| **React** | `^19` (React 19) |
| **React DOM** | `^19` |
| **TypeScript** | `5.7.3` |
| **Node.js** | Not pinned in package.json; inferred from Next.js 16 compatibility (Node >= 18.18) |
| **Package Manager** | `pnpm@10.30.0` |

> **Next.js 16 Breaking Change Warning** — App Router conventions differ from prior versions. The `AGENTS.md` file in the repo root explicitly warns of this. In particular: `params` on dynamic routes is now a `Promise<{ slug: string }>` and must be `await`-ed (already done correctly in `/work/[slug]/page.tsx`).

### Styling System
| Layer | Detail |
|-------|--------|
| **CSS Framework** | Tailwind CSS `^4.3.3` (v4 — config-free, CSS-native) |
| **Tailwind PostCSS Plugin** | `@tailwindcss/postcss@^4.3.3` |
| **Animation library (CSS)** | `tw-animate-css@^1.4.0` — imported in `globals.css` via `@import 'tw-animate-css'` |
| **Component system** | shadcn/ui `^4.11.0` (`base-nova` style, neutral base color) |
| **Component primitives** | `@base-ui/react@^1.5.0` (powers the shadcn Button) |
| **Utility helpers** | `class-variance-authority@^0.7.1`, `clsx@^2.1.1`, `tailwind-merge@^3.3.1` |
| **Custom CSS file** | `app/globals.css` — 38 kB of bespoke BEM-style class rules. Tailwind v4 is imported at line 1 but almost none of the site's actual styling uses Tailwind utility classes in JSX. All visual design lives in raw CSS within `globals.css`. |

### CSS Variables (Design Tokens) — declared on `:root` in `globals.css`
```css
--ink: #17191c       /* primary text */
--muted: #737a80     /* secondary text */
--paper: #f7f7f4     /* page background */
--white: #fcfcfa     /* card/elevated background */
--line: rgba(23,25,28,.13) /* dividers/borders */
--orange: #ff6433    /* brand accent */
--teal: #087f73      /* secondary accent */
--graphite: #181b20  /* dark section background */
```

**Dark Mode:** NOT implemented. `color-scheme: light` only. The `Viewport` export sets `colorScheme: 'light dark'` and `themeColor` for both schemes, but the CSS has no `@media (prefers-color-scheme: dark)` rules.

**Custom Fonts:** One custom font — `Autography` (OTF, 52 kB) at `/public/fonts/Autography.otf` via `@font-face`. Used only for the brand name. Body defaults to `Arial, Helvetica, sans-serif` (no premium font).

**Google Fonts (Dead Links):** Two `<link rel="preconnect">` tags for `fonts.googleapis.com` and `fonts.gstatic.com` exist in `layout.tsx` but no Google Font is actually imported anywhere.

### Animation Libraries
| Library | Version | Usage |
|---------|---------|-------|
| `tw-animate-css` | `^1.4.0` | Imported globally; only `@keyframes indicatorPop` explicitly defined for nav active indicator |
| `lucide-react` | `^1.16.0` | Used for all icons (ArrowUpRight, ArrowDownRight, Menu, X, Shield, Lock, Network, etc.) |
| Framer Motion | — | NOT installed |
| GSAP | — | NOT installed |
| Scroll parallax | Vanilla JS | Achieved via `requestAnimationFrame` + `scrollY` state, applied as inline `style={{ transform }}` |

### Deployment Target & Configuration
| Setting | Value |
|---------|-------|
| **Primary deployment** | Vercel (`@vercel/analytics` dependency + domain `crateng.co.ke`) |
| **Analytics** | `@vercel/analytics@1.6.1` — `<Analytics />` injected in production only |
| **Domain** | `https://crateng.co.ke` (set in `siteConfig.siteUrl`, `NEXT_PUBLIC_SITE_URL` env var expected) |
| **Build config** | `next.config.mjs` — minimal; only `typescript.ignoreBuildErrors: true` set |
| **PWA manifest** | `app/manifest.ts` — renders a full Web App Manifest |
| **Robots / Sitemap** | `app/robots.ts` and `app/sitemap.ts` both present |

---

## 2. ROUTING & DATA ARCHITECTURE

### Router: App Router (Next.js App Directory)
```
app/
├── globals.css          # Global stylesheet
├── layout.tsx           # Root layout with metadata, OG, JSON-LD, Analytics
├── manifest.ts          # Web App Manifest
├── page.tsx             # Root route `/` — renders <PortfolioPage />
├── robots.ts            # Robots.txt generation
├── sitemap.ts           # Sitemap generation
└── work/
    └── [slug]/
        └── page.tsx     # Dynamic case study route `/work/[slug]`
```

- **No Pages Router** — `/pages` directory does not exist.
- `app/page.tsx` is a thin 6-line Server Component that imports `<PortfolioPage />` from `/components/portfolio-page.tsx`.
- `portfolio-page.tsx` is marked `'use client'` and contains the **entire** single-page portfolio UI as one monolithic component.

### Data Storage Model
All data is stored as **typed TypeScript constant arrays** in local files under `lib/data/`. No CMS, database, MDX, or external API.

```
lib/
├── utils.ts             # cn() helper (clsx + tailwind-merge)
└── data/
    ├── index.ts         # Barrel export of all data modules
    ├── types.ts         # All TypeScript interface definitions
    ├── site.ts          # siteConfig object
    ├── projects.ts      # projects[] array + derived exports
    ├── services.ts      # services[] array + webDevOffering
    ├── career.ts        # career[] array + stats[]
    ├── skills.ts        # skillGroups[] array
    ├── certifications.ts # certifications[] array
    └── education.ts     # education[] array + research object
```

### `/work/[slug]` Route Feasibility Assessment
**Already implemented and fully functional.** The dynamic route at `app/work/[slug]/page.tsx`:
1. Uses `generateStaticParams()` — pre-renders all 6 published projects at build time
2. Uses `getProjectBySlug(slug)` to look up project from local TypeScript data
3. Renders a case study page with: breadcrumb JSON-LD, per-project OG metadata, hero section, structured content sections (overview, problem, objectives, role, solution, implementation highlights, technologies, screenshots, outcomes, lessons learned), and CTA footer
4. Links back to `/#work`

**Data model fully supports case studies.** The `Project` interface has all required fields:
```typescript
interface Project {
  slug, title, category, industry, projectType, client, year, role,
  description, fullDescription, overview, problem, objectives,
  responsibilities, solution, technicalApproach, implementationHighlights,
  challenges, lessonsLearned, clientBackground,
  technologies, coverImage, desktopScreenshots, mobileScreenshots,
  outcomes, websiteUrl, repositoryUrl,
  publishStatus, publicationApproved, featured, displayOrder
}
```

**Gap:** The `problem`, `technicalApproach`, `challenges`, `lessonsLearned`, and `clientBackground` fields are currently `undefined` for all six projects. Content population (not routing infrastructure) is the primary missing piece.

---

## 3. CURRENT ASSET INVENTORY & MEDIA PIPELINE

### `/public` Directory Tree
```
public/
├── CMR logo.png                               # 384 kB, PNG — alternate logo, root level (unreferenced)
├── Elegant CMR Monogram Logo with Emblem.png  # 313 kB, PNG — unreferenced, root level
├── branding/
│   ├── christopher-rateng-logo-dark.png       # 260 kB, PNG — dark variant logo
│   ├── christopher-rateng-logo-emblem.png     # 336 kB, PNG — emblem/crest variant
│   ├── christopher-rateng-logo-icon.png       # 1.5 MB, PNG [CRITICAL] — used as favicon 192x192 & PWA icon
│   ├── christopher-rateng-logo-primary.png    # 286 kB, PNG — primary horizontal logo
│   └── christopher-rateng-logo-social.png     # 305 kB, PNG — OG/social share image (1200x630)
├── documents/
│   └── Christopher_Rateng_Information_Security_Resume.pdf  # 128 kB — resume, downloadable
├── fonts/
│   └── Autography.otf                         # 52 kB — custom signature font
├── icons/
│   ├── apple-touch-icon-dark.png              # 1.5 MB [CRITICAL] — referenced in layout icons
│   ├── apple-touch-icon-light.png             # 1.1 MB — NOT referenced anywhere
│   ├── favicon.ico                            # 1.1 MB [CRITICAL] — should be <50 kB
│   └── icon-512.png                           # 270 kB — PWA icon 512x512
├── logos/
│   └── usiu-logo.png                          # 39 kB, PNG — USIU-Africa university seal
├── og/
│   ├── SheriaBot AI User Dashboard.png        # 672 kB, PNG — SheriaBot user UI screenshot
│   ├── adek_tatu_website.png                  # 1.5 MB [CRITICAL], PNG — Adek Tatu website screenshot
│   ├── kolwa_admin_dashboard.png              # 540 kB, PNG — Kolwa SACCO portal screenshot
│   └── sheriabot_admin.png                    # 878 kB, PNG — SheriaBot admin console screenshot
└── portraits/
    └── Christopher_rateng-Passport-Photo.jpg  # 205 kB, JPEG — passport-style headshot
```

### Image Format & Aspect Ratio Summary
| Asset | Format | Approx. Ratio | Notes |
|-------|--------|---------------|-------|
| Portrait headshot | JPEG | ~1:1 (square) | Used with `fill` + `object-position: center 20%` |
| OG — SheriaBot UI Dashboard | PNG | ~16:10 desktop | Project card thumbnail AND OG image |
| OG — Adek Tatu website | PNG | ~16:10 desktop | Largest file at 1.5 MB — needs WebP |
| OG — Kolwa admin dashboard | PNG | ~16:10 desktop | Project thumbnail |
| OG — SheriaBot admin | PNG | ~16:10 desktop | Second screenshot for SheriaBot case study |
| Logo social | PNG | 1200x630 (16:9 OG) | OG fallback image |
| Logo icon | PNG | Square (192x192) | 1.5 MB — critically oversized for favicon |
| Apple touch icon dark | PNG | 180x180 | 1.5 MB — critically oversized |
| Favicon.ico | ICO | Multi-size | 1.1 MB — should be <50 kB |

### Asset Issues Identified
1. **No WebP versions** of any image. Next.js `<Image>` auto-converts to WebP, but raw `<img>` tags do NOT.
2. **Oversized icon files**: logo-icon.png (1.5 MB), apple-touch-icon-dark.png (1.5 MB), favicon.ico (1.1 MB).
3. **Two unreferenced files** at public root: `CMR logo.png` and `Elegant CMR Monogram Logo with Emblem.png`.
4. **`apple-touch-icon-light.png`** (1.1 MB) present but not referenced anywhere in code.

### Missing Assets for Case Study Pages
Three of six projects have **no screenshots at all**:
- `enterprise-network-deployment` — empty `desktopScreenshots: []`
- `cybersecurity-monitoring-lab` — empty `desktopScreenshots: []`
- `automation-workflow-engineering` — empty `desktopScreenshots: []`

**Assets needed for full case study experience:**
- Hi-res device mockups (MacBook, desktop monitor) for SheriaBot and Adek Tatu
- Network topology / architecture diagrams for Enterprise Network Deployment case study
- Lab environment screenshots (pfSense UI, Wazuh dashboard) for Cybersecurity Lab case study
- Workflow screenshots or n8n canvas exports for Automation & Workflow Engineering case study
- Mobile/responsive screenshots for Adek Tatu and Kolwa SACCO
- Client logos (where approved) for Kolwa Beba SACCO and Adek Tatu

---

## 4. COMPONENT & CONTENT CATALOG

### 4A. Verbatim Text Content

#### Site Identity (`lib/data/site.ts`)
- **Name:** Christopher Rateng
- **Full Name:** Christopher Modicai Rateng
- **Tagline:** "I build, secure, automate, and support the technology businesses depend on."
- **Secondary Tagline:** "From physical networks and enterprise cloud infrastructure to secure applications and intelligent automation, I turn complex technical challenges into dependable solutions."
- **Positioning:** "Systems Infrastructure & Cloud Security Specialist | Software Developer | AI Automation Engineer | Independent ICT Consultant"
- **Site URL:** `https://crateng.co.ke`
- **Email:** `crateng13@gmail.com`
- **Location:** Nairobi, Kenya
- **Service Regions:** Kenya, East Africa & Remote worldwide
- **LinkedIn:** `https://www.linkedin.com/in/christopher-rateng/`
- **GitHub:** `https://github.com/ItsKris62`
- **Twitter/X handle:** `@ItsKris62`
- **Phone (JSON-LD only):** `+254714659346`

#### Hero Section (verbatim from `portfolio-page.tsx`)
- **Eyebrow:** "Systems Infrastructure & Cloud Security Specialist | Software Developer | AI Automation Engineer | Independent ICT Consultant"
- **H1:** "I build, secure, automate & maintain technology."
- **Lede:** "I build, secure, automate, and support the technology businesses depend on. From physical networks and enterprise cloud infrastructure to secure applications and intelligent automation, I turn complex technical challenges into dependable solutions."
- **CTA 1:** "Explore my work"
- **CTA 2:** "Request an ICT consultation"
- **Meta line 1:** "Cybersecurity · Infrastructure · Software · AI Automation"
- **Meta line 2:** "Nairobi, Kenya / Remote worldwide"
- **Portrait overlay name:** "Christopher M. Rateng"
- **Portrait overlay subtitle:** "SYSTEMS · SECURITY · AUTOMATION"
- **Coordinate tag:** "01° 17′ S / 36° 49′ E"

#### About Section (verbatim)
- **Section label:** "01 — The person behind the systems"
- **H2:** "Not just someone who keeps systems running. *Someone who builds what comes next.*"
- **Para 1:** "I'm Christopher Modicai Rateng — a systems infrastructure & cloud security specialist, software developer, ai automation engineer, and independent ict consultant, and founder of SheriaBot."
- **Para 2:** "My background started in supporting real business systems — networks, endpoints, servers, users, and enterprise infrastructure. Over time, that foundation expanded into cybersecurity, software development, AI automation, and building digital products."
- **Para 3:** "Today, I work across the technology lifecycle: understanding problems, designing solutions, implementing systems, securing them, and making sure they keep working. Services are available locally in Kenya, across East Africa where practical, and remotely worldwide."
- **Pull quote:** "Technology should be dependable, understandable, and genuinely useful to the people who rely on it."

#### Stats (`lib/data/career.ts`)
| Value | Label |
|-------|-------|
| 5+ | years in infrastructure & operations |
| 100+ | endpoints and users supported |
| 200+ | IT assets managed |
| 30% | reduction in security incidents |

#### Career / Journey (`lib/data/career.ts`)
| Period | Title | Organization | Impact / Story |
|--------|-------|--------------|----------------|
| Sep 2019 – Dec 2019 | IT Support Intern | Royal Media Services | "The beginning of my career taught me how much organisations rely on technology being available, stable, and well supported." |
| Oct 2020 – Aug 2023 | IT Support Specialist / Systems Administration | Sledge Group Enterprises | "This was where I learned to manage infrastructure beyond the desktop — from structured cabling and branch connectivity to business systems and operational continuity." Metric: ~95% of support requests resolved within 30 minutes. |
| Aug 2023 – Present | IT Support Manager | Net Scaling Solutions | "Supporting distributed environments strengthened my understanding of reliability, proactive security, automation, and the importance of making technical operations measurable and repeatable." Metrics: 30% reduction in security incidents · 25% improvement in incident resolution time · 100+ endpoints supported · 3 junior engineers mentored. |
| Current | Founder & Software Builder | SheriaBot | "Building SheriaBot brought together my interests in software, cybersecurity, fintech, research, and automation — turning years of practical experience into a product." |

#### Projects (`lib/data/projects.ts`)
| Slug | Title | Category | Year | Role | Tech | Live URL | Featured | Screenshots |
|------|-------|----------|------|------|------|---------|----------|------------|
| `sheriabot` | SheriaBot | Software & SaaS | 2024—Present | Founder, Product Builder & Developer | Next.js, TypeScript, PostgreSQL, AI workflows, Node.js | https://app.sheriabot.com | YES | 2 |
| `adek-tatu` | Adek Tatu | Client Websites | 2025 | Web Developer & Designer | Next.js, TypeScript, Tailwind CSS, Vercel | https://adek-tatu.vercel.app | no | 1 |
| `kolwa-beba-sacco` | Kolwa Beba SACCO | Client Websites | 2025 | Web Developer | Next.js, TypeScript, Tailwind CSS | https://kolwa.mwaloni.com | no | 1 |
| `enterprise-network-deployment` | Enterprise Infrastructure & Network Deployment | Infrastructure | 2020—2023 | IT Infrastructure Engineer | Cisco, Ubiquiti, TP-Link, VLANs, VPN, MPLS | — | no | NONE |
| `cybersecurity-monitoring-lab` | Cybersecurity Monitoring Lab | Cybersecurity | 2024 | Security Engineer | pfSense, Wazuh, Suricata, Linux, MITRE ATT&CK | — | no | NONE |
| `automation-workflow-engineering` | Automation & Workflow Engineering | AI & Automation | 2023—Present | Automation Engineer | n8n, Python, Bash, Node.js, REST APIs, PostgreSQL | — | no | NONE |

**Project descriptions (verbatim):**
- **SheriaBot:** "A regulatory intelligence platform designed to help fintech and regulated organisations navigate complex compliance requirements across African markets."
- **Adek Tatu:** "A client website project focused on delivering a professional digital experience, with attention to responsive presentation, interface usability, and maintainable web implementation."
- **Kolwa Beba SACCO:** "A website for Kolwa Beba SACCO, presenting the organisation's digital presence through a professional and accessible web experience."
- **Enterprise Network Deployment:** "Multi-site network deployments covering LAN/WAN design, VLAN segmentation, POS connectivity, structured cabling, and branch-office hardware rollouts."
- **Cybersecurity Monitoring Lab:** "A hands-on detection environment using pfSense, Suricata, Wazuh, Linux, and MITRE ATT&CK concepts to practice network defence and incident detection."
- **Automation & Workflow Engineering:** "n8n workflows, API integrations, and Python/Bash scripts that reduce repetitive operational tasks while keeping people in control through approval gates and alerting."

**Project category filter tabs:**
`All Work` · `Client Websites` · `Software & SaaS` · `Cybersecurity` · `Infrastructure` · `AI & Automation`

#### Services (`lib/data/services.ts`) — 7 Services
| # | Title | Headline | CTA |
|---|-------|----------|-----|
| 01 | Cloud Identity & Microsoft 365 Security | "Secure identities. Simpler administration." | Discuss Microsoft 365 Support |
| 02 | SME Cybersecurity & GRC Readiness | "Practical security for real business risks." | Book a Security Assessment |
| 03 | Network Infrastructure & Field Engineering | "Reliable connectivity, from the rack to the cloud." | Request Infrastructure Support |
| 04 | Managed IT Operations & Technical Support | "Expert technical support without unnecessary overhead." | Request Managed IT Support |
| 05 | Web Design, Development & Digital Experiences | "Professional websites that communicate clearly." | Discuss a Website Project |
| 06 | Custom AI Solutions & Workflow Automation | "Automate the repetitive. Keep people in control." | Discuss an Automation Project |
| 07 | Technical Consulting, Training & Documentation | "Clearer processes. Stronger teams." | Discuss Consulting or Training |

**Web Offering Callout:**
- Title: "Web Design, Development & Technical Implementation"
- CTA: "Explore Websites I've Built"

#### Skills (`lib/data/skills.ts`) — 9 Skill Groups
| Group | Skills (verbatim) |
|-------|------------------|
| Identity & Cloud | Microsoft 365, Microsoft Entra ID, Active Directory, MFA, RBAC, Identity lifecycle management, Exchange Online, Teams, SharePoint |
| Networking | Cisco, Huawei, Ubiquiti, TP-Link, LAN/WAN, MPLS, VLANs, DNS/DHCP, VPNs, Firewalls, Switch configuration, Structured cabling, Network monitoring |
| Field Infrastructure | Hardware deployment, Rack management, CCTV, Hikvision, LTS, VoIP/PBX, POS networks, Site surveys, Asset lifecycle management |
| Cybersecurity | Security hardening, EDR, Vulnerability assessment, Patch management, BitLocker, Wazuh, Suricata, pfSense, SIEM, Incident response, GRC, Technical security documentation |
| Systems | Windows Server, Linux, Microsoft 365, Endpoint management, System monitoring, Backup and disaster recovery |
| Development | JavaScript, TypeScript, Python, Bash, Node.js, Fastify, REST APIs, SQL, PostgreSQL, Prisma, Frontend web development |
| AI & Automation | n8n, LLM integrations, RAG, AI agent workflows, API automation, Scripting, Human-in-the-loop processes |
| Cloud & Deployment | Microsoft Azure, Vercel, Render, Railway, Cloudflare, DNS, HTTPS, Deployment support |
| Project & Operations | Incident management, SLA support, Troubleshooting, Technical documentation, SOPs, Asset management, Vendor coordination, User training |

#### Education (`lib/data/education.ts`)
| Degree | Field | Institution | Status |
|--------|-------|-------------|--------|
| Bachelor of Science in Information Systems & Technology | Networking concentration | United States International University–Africa | Class of 2019 — Completed |
| Master of Science in Information Systems | Information Security specialisation | United States International University–Africa | Expected November 2026 — In Progress |

**Active Research Thesis:**
- **Title:** "An Empirical Assessment of Coordinated Vulnerability Disclosure Workflow Maturity in Kenyan Mobile Money Systems."
- **Description:** "Examining how organisations and independent security researchers coordinate vulnerability discovery, reporting, assessment, remediation, and responsible disclosure within Kenya's mobile-money ecosystem."
- **Research Interests:** Coordinated vulnerability disclosure · Financial technology security · Vulnerability management · Information security governance · Regulatory compliance · Security research · Secure digital financial systems
- **Context:** "Research conducted as part of the MSc in Information Systems, Information Security specialisation, at USIU-Africa. The thesis is in progress and has not been completed or published."

#### Certifications (`lib/data/certifications.ts`)
| Title | Issuer | Year | Verify URL |
|-------|--------|------|------------|
| Cisco CyberOps Associate | Cisco | 2025 | MISSING |
| Cisco Ethical Hacker | Cisco | 2025 | MISSING |
| IBM Cybersecurity Training | IBM | 2025 | MISSING |
| IBM Governance, Risk, Compliance and Data Privacy | IBM | 2025 | MISSING |
| Incident Response and Systems Forensics | IBM | 2025 | MISSING |
| System and Network Security | IBM | 2025 | MISSING |
| IBM Information Technology Fundamentals | IBM | 2022 | MISSING |

> All `verifyUrl` fields are `undefined` — the "Verify" link in the credentials grid never renders for any certification.

#### Contact Copy (verbatim)
- **Eyebrow:** "Available for selected projects, consulting & collaborations"
- **H2:** "Have a difficult *technical problem?*"
- **Body:** "Let's make it clearer, safer, and more useful. Tell me what you're building, what's not working, or what needs to work better."
- **Business clients heading:** "For business clients"
- **Business clients copy:** "Request an ICT consultation, or book an infrastructure & security assessment."
- **Recruiters heading:** "For engineering & employment opportunities"
- **Recruiters copy:** "View my public work or download a technical résumé."
- **Footer:** "Nairobi, Kenya / Remote worldwide | © 2026 Christopher Rateng"

---

### 4B. Component Inventory

#### Active Components
| Component | File | Notes |
|-----------|------|-------|
| `PortfolioPage` | `components/portfolio-page.tsx` | 290-line monolith, `'use client'`. Contains entire site. |
| `Mark` (brand logo) | Inline in `portfolio-page.tsx` | Logo frame with Next/Image. Extractable. |
| `SpatialSystem` (hero graphic) | Inline in `portfolio-page.tsx` | Pure CSS decorative diagram. Replaceable. |
| `GithubIcon` | Inline in `portfolio-page.tsx` AND `work/[slug]/page.tsx` | DUPLICATED. Custom SVG icon. |
| `LinkedinIcon` | Inline in `portfolio-page.tsx` | Custom SVG icon. |
| `ProjectPage` | `app/work/[slug]/page.tsx` | Server Component. Functional. Needs visual redesign. |

#### Orphaned / Unused Components
| Component | File | Status |
|-----------|------|--------|
| `Button` | `components/ui/button.tsx` | Uses `@base-ui/react` + CVA. Correctly built but **never imported** in the actual site. |

#### Navigation Items
```
About | Journey | Expertise | Skills | Work | Education | Credentials | Contact
```
Maps to section IDs: `about`, `journey`, `expertise`, `skills`, `work`, `education`, `credentials`, `contact`

---

## 5. IDENTIFIED CODE REDUNDANCIES & FRICTION POINTS

### 5A. Architecture Issues
| Issue | Location | Severity |
|-------|----------|----------|
| Monolithic `'use client'` — entire 290-line site is one client component, no RSC benefits | `components/portfolio-page.tsx` | HIGH |
| Duplicate `GithubIcon` SVG defined twice identically | Lines 26–32 (portfolio) and 7–13 (slug page) | MEDIUM |
| Orphaned `Button` component never imported | `components/ui/button.tsx` | LOW |
| `typescript.ignoreBuildErrors: true` — masks type errors in production builds | `next.config.mjs` | HIGH |
| Same `NEXT_PUBLIC_SITE_URL` fallback guard repeated in 3 files | `layout.tsx` and `work/[slug]/page.tsx` | MEDIUM |

### 5B. Styling Issues
| Issue | Location | Severity |
|-------|----------|----------|
| 38 kB single CSS file with no comments or logical separation | `app/globals.css` | HIGH |
| Entire CSS written as ~85 lines of minified-style rules | `app/globals.css` | HIGH |
| Tailwind v4 imported but essentially unused in JSX | `globals.css` + all components | MEDIUM |
| No dark mode CSS despite `colorScheme: 'light dark'` viewport export | `globals.css` | MEDIUM |
| Dead Google Fonts preconnect tags — no font ever loaded from Google | `layout.tsx` lines 230–231 | LOW |
| Inline `style` scroll parallax creates layout recalculations on every scroll event | `portfolio-page.tsx` lines 234, 251, 283 | MEDIUM |
| Body font is `Arial, Helvetica, sans-serif` — no premium font loaded | `globals.css` line 16 | MEDIUM |
| Raw `<img>` tag for project card screenshots — no WebP negotiation, no srcset, no lazy load | `portfolio-page.tsx` line 274 | HIGH |
| `.project-visual` CSS class defined twice with conflicting rules | `globals.css` lines 48 and 62 | MEDIUM |

### 5C. SEO & Metadata Issues
| Issue | Status |
|-------|--------|
| Root-level metadata (title, OG, Twitter, JSON-LD) | Comprehensive — OK |
| Per-project metadata via `generateMetadata` | Implemented — OK |
| Certification `verifyUrl` fields | ALL MISSING — Verify links never render |
| `repositoryUrl` for projects | ALL MISSING — No project links to GitHub source |
| `application/ld+json` placed in `<body>` not `<head>` | Technically valid but non-standard |
| Google Fonts preconnect links (dead) | Present but ineffective |
| Sitemap (`app/sitemap.ts`) | Present |
| Robots (`app/robots.ts`) | Present |

### 5D. Responsive Layout Issues
| Issue | Notes |
|-------|-------|
| Only ONE breakpoint at `max-width: 800px` | No tablet breakpoint; layouts jump from 3-column desktop to 1-column mobile |
| `max-width: 390px` breakpoint for tiny phones | A second small-device patch exists |
| `hero min-height: 850px` | Can be clipped on landscape mobile and 768p height viewports |
| Portrait frame can overlap hero text on mobile | `right: 2%; width: 70%` on mobile |

### 5E. Performance Issues
| Asset / Code | Impact |
|-------------|--------|
| `christopher-rateng-logo-icon.png` = 1.5 MB | CRITICAL — should be <=50 kB |
| `apple-touch-icon-dark.png` = 1.5 MB | CRITICAL — should be <=30 kB |
| `favicon.ico` = 1.1 MB | CRITICAL — should be <=20 kB |
| `adek_tatu_website.png` = 1.5 MB | CRITICAL — convert to WebP |
| Raw `<img>` for project screenshots | HIGH — no lazy loading, no WebP, no responsive srcset |
| Below-fold `next/image` without lazy | LOW — USIU logo, credential icons |

---

## 6. REDESIGN RECOMMENDATIONS FOR v0.app

### Preserve As-Is
- The **data layer** (`lib/data/`) — clean, typed, comprehensive — keep entirely unchanged
- The **routing structure** (`app/` App Router, `/work/[slug]`) — correct and already functional
- The **SEO/metadata** in `layout.tsx` — production-grade JSON-LD, OG, Twitter Card
- The **CSS design tokens** (`--ink`, `--paper`, `--orange`, `--teal`, `--graphite`) — coherent palette
- The **`Autography` font** for brand signature name
- The **8-section information architecture** (About → Journey → Expertise → Skills → Work → Education → Credentials → Contact)

### Redesign / Replace
- Decompose `portfolio-page.tsx` into **section-level Server Components** with only interactive elements as Client Components
- Replace single-breakpoint CSS with a **proper responsive system** (sm/md/lg/xl)
- Load a **premium body font** (Inter, Outfit, or Geist — actually wire up the Google Fonts preconnects)
- Replace raw `<img>` with `next/image` `<Image>` throughout
- Replace `<details>`/`<summary>` service deliverables with animated **Radix/Shadcn Accordion**
- Replace the `SpatialSystem` CSS diagram with a proper animated SVG
- Compress and convert all oversized icon/image files to WebP
- Add **dark mode** CSS layer
- Consolidate `GithubIcon` and `LinkedinIcon` into shared `components/icons.tsx`
- Populate `verifyUrl` for all certifications
- Add missing case study content fields (`problem`, `challenges`, `lessonsLearned`) for all 6 projects

---

## v0.app PROMPT CONTEXT BLOCK

> **About the subject:** Christopher Modicai Rateng (goes by "Christopher Rateng" or "Kris"). Nairobi, Kenya-based IT professional: Systems Infrastructure Engineer, Cloud Security Specialist, Software Developer, AI Automation Engineer, and founder of SheriaBot (a RegTech/fintech SaaS platform for African markets).
>
> **Brand palette:** Orange `#ff6433` (primary accent), Graphite `#181b20` (dark sections/nav), Teal `#087f73` (secondary accent), Paper `#f7f7f4` (warm off-white background), Ink `#17191c` (text). Aesthetic: editorial/minimal, monospace type for labels and metadata, serif italic for heading emphasis, premium and trust-building.
>
> **Tech stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4. Deploy target: Vercel. Package manager: pnpm.
>
> **Routing:** The `/work/[slug]` dynamic route already exists at `app/work/[slug]/page.tsx` and pre-renders 6 project slugs: `sheriabot`, `adek-tatu`, `kolwa-beba-sacco`, `enterprise-network-deployment`, `cybersecurity-monitoring-lab`, `automation-workflow-engineering`.
>
> **Data layer:** All content lives in TypeScript objects in `lib/data/`. Do not change the data layer — only change how it is presented.
>
> **Key redesign goals:** Make project cards on the homepage link to full case study sub-pages. Elevate the visual design with premium typography, dark mode support, proper responsive breakpoints, and remove the monolithic client component anti-pattern.
