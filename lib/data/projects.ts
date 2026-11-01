import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'sheriabot',
    title: 'SheriaBot',
    category: 'Software & SaaS',
    industry: 'Fintech / RegTech',
    projectType: 'SaaS Product',
    client: 'Founder-led product',
    year: '2024—Present',
    role: 'Founder & Full-Stack Engineer',
    description:
      'A regulatory intelligence platform designed to help fintech and regulated organisations navigate complex compliance requirements across African markets.',
    fullDescription:
      'SheriaBot combines regulatory research, secure backend systems, and AI-assisted workflows to make financial-regulation guidance more accessible to fintech operators. The product focuses on accurate retrieval, clear sourcing, and human-in-the-loop review rather than autonomous decision-making.',
    overview:
      'SheriaBot is a founder-led product that brings together software engineering, cybersecurity, fintech domain knowledge, and AI-assisted workflows. It is presented as both a technical project and evidence of entrepreneurship.',
    objectives: [
      'Make regulatory guidance more accessible to fintech operators across African markets',
      'Combine structured regulatory research with AI-assisted retrieval',
      'Maintain human-in-the-loop review for compliance-sensitive outputs',
      'Build a secure, maintainable SaaS application',
    ],
    responsibilities: [
      'Product direction and feature definition',
      'Frontend and backend engineering',
      'API integration and database architecture',
      'Authentication and access-control implementation',
      'AI-assisted workflow design',
      'Cloud deployment and operational monitoring',
    ],
    solution:
      'A web application that pairs a structured regulatory knowledge base with retrieval-assisted workflows, surfacing sourced guidance while keeping human review in the loop.',
    implementationHighlights: [
      'Type-safe API design with Fastify, tRPC, Prisma and PostgreSQL',
      'PostgreSQL-backed data model for regulatory content',
      'Authentication and role-based access controls',
      'AI-assisted research workflows with sourcing',
      'Secure application development practices',
      'Cloud deployment and operational monitoring',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Fastify', 'tRPC', 'Prisma', 'PostgreSQL', 'Supabase', 'Docker', 'n8n', 'RAG'],
    coverImage: '/og/SheriaBot AI User Dashboard.png',
    desktopScreenshots: [
      {
        src: '/og/SheriaBot AI User Dashboard.png',
        alt: 'SheriaBot AI User Dashboard — Regulatory Intelligence & Compliance Platform',
      },
      {
        src: '/og/sheriabot_admin.png',
        alt: 'SheriaBot Administration Console & Workflow Controls',
      },
    ],
    mobileScreenshots: [],
    outcomes: [
      'Regulatory intelligence workflow for African fintech markets',
      'Secure backend with structured data retrieval',
      'AI-assisted research with human review controls',
    ],
    websiteUrl: 'https://app.sheriabot.com',
    repositoryUrl: undefined,
    publishStatus: 'published',
    publicationApproved: true,
    featured: true,
    displayOrder: 1,
  },
  {
    slug: 'adek-tatu',
    title: 'Adek Tatu',
    category: 'Client Websites',
    industry: 'Client Work',
    projectType: 'Client Website',
    client: 'Adek Tatu',
    year: '2025',
    role: 'Full-Stack Web Engineer & Designer',
    description:
      'A client website project focused on delivering a professional digital experience, with attention to responsive presentation, interface usability, and maintainable web implementation.',
    fullDescription: undefined,
    overview:
      'A full-stack client web application combining a responsive Next.js interface with a dedicated Fastify and PostgreSQL backend. Public details are intentionally limited to the architectural scope and non-sensitive implementation work.',
    responsibilities: [
      'React/Next.js frontend design and responsive implementation',
      'Node.js and Fastify API development with PostgreSQL data models',
      'Application administration and authentication workflows',
      'Deployment, hosting configuration and CI/CD',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Fastify', 'PostgreSQL', 'Drizzle ORM', 'Tailwind CSS', 'CI/CD'],
    coverImage: '/og/adek_tatu_website.png',
    desktopScreenshots: [
      {
        src: '/og/adek_tatu_website.png',
        alt: 'Adek Tatu — Modern Client Website & Brand Presentation',
      },
    ],
    mobileScreenshots: [],
    outcomes: [],
    // The client site is intentionally not linked publicly.
    websiteUrl: undefined,
    repositoryUrl: undefined,
    publishStatus: 'published',
    publicationApproved: true,
    featured: false,
    displayOrder: 2,
  },
  {
    slug: 'kolwa-beba-sacco',
    title: 'Kolwa Beba SACCO',
    category: 'Client Websites',
    industry: 'Financial Services',
    projectType: 'Client Website',
    client: 'Kolwa Beba SACCO',
    year: '2025',
    role: 'Web Developer',
    description:
      'A Next.js and React web portal with an administration dashboard, user-management interfaces and structured data-import workflows.',
    fullDescription: undefined,
    overview:
      'A financial-services web application and administrative interface focused on accessible, responsive flows for user administration, structured data imports and platform configuration.' ,
    responsibilities: [
      'Website design and frontend implementation',
      'Information architecture and content organisation',
      'Responsive and accessible layout development',
      'Implementation of administration and data-import user interfaces',
    ],
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Radix UI', 'React Hook Form', 'Zod'],
    coverImage: '/og/kolwa_admin_dashboard.png',
    desktopScreenshots: [
      {
        src: '/og/kolwa_admin_dashboard.png',
        alt: 'Kolwa Beba SACCO — Digital Administrative Portal & Member Management',
      },
    ],
    mobileScreenshots: [],
    outcomes: [],
    websiteUrl: 'https://kolwa.mwaloni.com',
    repositoryUrl: undefined,
    publishStatus: 'published',
    publicationApproved: true,
    featured: false,
    displayOrder: 3,
  },
  {
    slug: 'christopher-rateng-portfolio',
    title: 'Christopher Rateng — Engineering Portfolio',
    category: 'Client Websites',
    industry: 'Independent Engineering / Personal Brand',
    projectType: 'Client Website',
    client: 'Independent project',
    year: '2026',
    role: 'Frontend Engineer & Creative Developer',
    description:
      'A custom-built React and Next.js engineering portfolio combining case studies, responsive interfaces, technical storytelling and accessible interactions.',
    fullDescription:
      'An independently developed Next.js portfolio that presents software, infrastructure, cybersecurity and automation work through interactive case studies and a distinctive design system.',
    overview:
      'Designed and developed to communicate engineering expertise, make practical work easier to explore, and connect both potential clients and employers with relevant case studies.',
    responsibilities: [
      'Architecture and implementation with Next.js App Router, React and TypeScript',
      'Reusable UI components, responsive layouts and custom visual identity',
      'Interactive engineering capability panels and accessible navigation',
      'Metadata, structured data and static project routes',
    ],
    implementationHighlights: [
      'Next.js App Router with typed, data-driven project pages',
      'CSS-based network and pulse motifs with restrained scroll-linked motion',
      'Mobile-friendly case-study navigation and SEO metadata',
    ],
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Vercel', 'SEO', 'Accessible UI'],
    outcomes: [
      'Public portfolio with separate technical case-study routes',
      'Clearer paths for client enquiries and recruitment conversations',
    ],
    websiteUrl: 'https://www.crateng.co.ke',
    repositoryUrl: 'https://github.com/ItsKris62/my-web-portfolio',
    publishStatus: 'published',
    publicationApproved: true,
    featured: false,
    displayOrder: 4,
  },
  {
    slug: 'rentworks-web-seo',
    title: 'Rentworks — Website SEO & Technical Strategy',
    category: 'Client Websites',
    industry: 'Leasing / Financial Services',
    projectType: 'Client Website',
    client: 'Rentworks',
    year: '2026',
    role: 'Website SEO Research & Technical Strategy',
    description:
      'An ongoing website visibility initiative involving competitor research, Kenya-focused keyword mapping, technical SEO recommendations and AI-search discoverability planning.',
    fullDescription:
      'Research and planning work aimed at helping a leasing business improve organic discovery in Kenya. The engagement covers page-level keyword strategy, competitor comparisons and recommendations for technical SEO and AI-search visibility. Improvements are being planned and assessed; ranking gains are not claimed.',
    overview:
      'A digital visibility and website improvement engagement for a leasing-sector business, with a focus on connecting search intent to service-page content and identifying technical barriers to discovery.',
    objectives: [
      'Map relevant leasing and related search queries to priority pages',
      'Identify content and technical SEO opportunities',
      'Define measurements for organic traffic, indexing and enquiries',
    ],
    responsibilities: [
      'Competitor keyword and content research',
      'Page-level SEO recommendations and content mapping',
      'Planning technical SEO checks and monitoring',
    ],
    technologies: ['Technical SEO', 'Keyword Research', 'Website Audit', 'Search Console', 'Analytics'],
    outcomes: [
      'Page-oriented keyword strategy and implementation recommendations prepared',
      'Measurement and optimization roadmap defined; performance results pending validation',
    ],
    websiteUrl: 'https://rentworks.co.ke/',
    publishStatus: 'published',
    publicationApproved: true,
    featured: false,
    displayOrder: 5,
  },
  {
    slug: 'enterprise-network-deployment',
    title: 'Enterprise Infrastructure & Network Deployment',
    category: 'Infrastructure',
    industry: 'Multi-site Retail & Operations',
    projectType: 'Infrastructure Deployment',
    year: '2020—2023',
    role: 'IT Infrastructure Engineer',
    description:
      'Multi-site network deployments covering LAN/WAN design, VLAN segmentation, POS connectivity, structured cabling, and branch-office hardware rollouts.',
    fullDescription:
      'End-to-end infrastructure delivery across distributed sites: site surveys, rack build-outs, switch and router configuration, business Wi-Fi, POS network hardening, and ongoing support. The work emphasised reliable uptime for revenue-critical systems and clean, auditable network documentation.',
    objectives: [
      'Deliver reliable multi-site connectivity for revenue-critical systems',
      'Implement clean, auditable network infrastructure',
      'Support branch-office hardware and POS rollouts',
    ],
    responsibilities: [
      'Site surveys and rack build-outs',
      'Switch and router configuration',
      'VLAN segmentation and POS network hardening',
      'Structured cabling reviews and rack organisation',
    ],
    implementationHighlights: [
      'Multi-site LAN/WAN rollout with segmented VLANs',
      'Branch connectivity and MPLS support',
      'POS network hardening',
    ],
    technologies: ['Cisco', 'Ubiquiti', 'TP-Link', 'VLANs', 'VPN', 'MPLS'],
    desktopScreenshots: [],
    mobileScreenshots: [],
    outcomes: [
      'Multi-site LAN/WAN rollout with segmented VLANs',
      'POS network hardening and branch connectivity',
      'Structured cabling and rack management audits',
    ],
    publishStatus: 'published',
    publicationApproved: true,
    featured: false,
    displayOrder: 4,
  },
  {
    slug: 'cybersecurity-monitoring-lab',
    title: 'Cybersecurity Monitoring Lab',
    category: 'Cybersecurity',
    industry: 'Security Engineering',
    projectType: 'Security Lab',
    year: '2024',
    role: 'Security Engineer',
    description:
      'A hands-on detection environment using pfSense, Suricata, Wazuh, Linux, and MITRE ATT&CK concepts to practice network defence and incident detection.',
    fullDescription:
      'A self-built detection lab used to study network segmentation, intrusion detection, endpoint monitoring, and incident-response workflows. The environment mirrors common enterprise topologies so that defensive tooling can be evaluated against realistic traffic patterns.',
    objectives: [
      'Study network segmentation and intrusion detection',
      'Practice endpoint monitoring and log aggregation',
      'Evaluate defensive tooling against realistic traffic',
    ],
    implementationHighlights: [
      'Segmented lab network with firewall and IDS coverage',
      'Endpoint detection and log aggregation pipeline',
      'Detection-alert triage and response workflow',
    ],
    technologies: ['pfSense', 'Wazuh', 'Suricata', 'Linux', 'MITRE ATT&CK'],
    desktopScreenshots: [],
    mobileScreenshots: [],
    outcomes: [
      'Segmented lab network with firewall and IDS coverage',
      'Endpoint detection and log aggregation pipeline',
      'Detection-alert triage and response workflow',
    ],
    publishStatus: 'published',
    publicationApproved: true,
    featured: false,
    displayOrder: 5,
  },
  {
    slug: 'automation-workflow-engineering',
    title: 'Automation & Workflow Engineering',
    category: 'AI & Automation',
    industry: 'Internal Tooling & Operations',
    projectType: 'AI Automation',
    year: '2023—Present',
    role: 'Automation Engineer',
    description:
      'n8n workflows, API integrations, and Python/Bash scripts that reduce repetitive operational tasks while keeping people in control through approval gates and alerting.',
    fullDescription:
      'A set of internal automation patterns covering onboarding/offboarding, scheduled reporting, approval routing, and API-driven integrations. Each workflow is built with error handling, human-in-the-loop checkpoints, and cost-conscious execution so automation improves reliability without creating opaque failure modes.',
    objectives: [
      'Reduce repetitive operational tasks through automation',
      'Maintain human-in-the-loop controls for sensitive actions',
      'Connect disconnected tools and information via APIs',
    ],
    implementationHighlights: [
      'Automated onboarding and offboarding workflows',
      'Scheduled reporting and approval routing',
      'Error handling and alerting with human review',
    ],
    technologies: ['n8n', 'Python', 'Bash', 'Node.js', 'REST APIs', 'PostgreSQL'],
    desktopScreenshots: [],
    mobileScreenshots: [],
    outcomes: [
      'Automated onboarding and offboarding workflows',
      'Scheduled reporting and approval routing',
      'Error handling and alerting with human review',
    ],
    publishStatus: 'published',
    publicationApproved: true,
    featured: false,
    displayOrder: 6,
  },
]

export const publishedProjects = projects.filter(
  (p) => p.publishStatus === 'published' && p.publicationApproved,
)

export function getProjectBySlug(slug: string): Project | undefined {
  return publishedProjects.find((p) => p.slug === slug)
}

export const projectCategories: Array<{ id: Project['category'] | 'All Work'; label: string }> = [
  { id: 'All Work', label: 'All Work' },
  { id: 'Client Websites', label: 'Client Websites' },
  { id: 'Software & SaaS', label: 'Software & SaaS' },
  { id: 'Cybersecurity', label: 'Cybersecurity' },
  { id: 'Infrastructure', label: 'Infrastructure' },
  { id: 'AI & Automation', label: 'AI & Automation' },
]
