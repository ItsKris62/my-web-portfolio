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
    role: 'Founder, Product Builder & Developer',
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
      'PostgreSQL-backed data model for regulatory content',
      'Authentication and role-based access controls',
      'AI-assisted research workflows with sourcing',
      'Secure application development practices',
      'Cloud deployment and operational monitoring',
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'AI workflows', 'Node.js'],
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
    websiteUrl: 'https://sheriabot.com',
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
    role: 'Web Developer & Designer',
    description:
      'A client website project focused on delivering a professional digital experience, with attention to responsive presentation, interface usability, and maintainable web implementation.',
    fullDescription: undefined,
    overview:
      'A professional client website project with a focus on responsive presentation, interface usability, and maintainable web implementation.',
    responsibilities: [
      'Website design and frontend implementation',
      'Responsive layout development',
      'Deployment and hosting configuration',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    coverImage: '/og/adek_tatu_website.png',
    desktopScreenshots: [
      {
        src: '/og/adek_tatu_website.png',
        alt: 'Adek Tatu — Modern Client Website & Brand Presentation',
      },
    ],
    mobileScreenshots: [],
    outcomes: [],
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
      'A website for Kolwa Beba SACCO, presenting the organisation’s digital presence through a professional and accessible web experience.',
    fullDescription: undefined,
    overview:
      'A website project for a SACCO, demonstrating a trustworthy, clear, and professional digital presence for a financial-services organisation.',
    responsibilities: [
      'Website design and frontend implementation',
      'Information architecture and content organisation',
      'Responsive and accessible layout development',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    coverImage: '/og/kolwa_admin_dashboard.png',
    desktopScreenshots: [
      {
        src: '/og/kolwa_admin_dashboard.png',
        alt: 'Kolwa Beba SACCO — Digital Administrative Portal & Member Management',
      },
    ],
    mobileScreenshots: [],
    outcomes: [],
    websiteUrl: undefined,
    repositoryUrl: undefined,
    publishStatus: 'published',
    publicationApproved: true,
    featured: false,
    displayOrder: 3,
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
