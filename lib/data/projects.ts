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
    coverImage: '/og/sheriabot_live.png',
    desktopScreenshots: [
      {
        src: '/og/sheriabot_live.png',
        alt: 'SheriaBot — Live AI Regulatory Intelligence & Compliance Platform',
      },
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
    role: 'Web Developer & Designer',
    description:
      'A client website project focused on delivering a professional digital experience, with attention to responsive presentation, interface usability, and maintainable web implementation.',
    fullDescription:
      'A dedicated client website implementation designed to articulate brand services cleanly and establish an accessible online presence with fast static page loads and mobile-optimised layouts.',
    overview:
      'A professional client website project with a focus on responsive presentation, interface usability, and maintainable web implementation.',
    problem:
      'The client needed a modern, responsive digital showcase to present their services with clean visual hierarchy, clear navigation, and dependable cross-device usability.',
    objectives: [
      'Create an engaging, responsive client web presence',
      'Ensure clear visual hierarchy and readable typography across devices',
      'Build with maintainable Next.js components for future expansion',
      'Deploy on reliable, modern cloud infrastructure',
    ],
    responsibilities: [
      'Website design and frontend implementation',
      'Responsive layout development',
      'Deployment and hosting configuration',
    ],
    solution:
      'A Next.js and Tailwind CSS website designed for fast loading times, clean layout structures, and intuitive touch usability on phones and tablets.',
    technicalApproach:
      'Component-driven frontend architecture using Next.js and Tailwind CSS, focusing on semantic layout, clean asset delivery, and responsive touch usability.',
    implementationHighlights: [
      'Responsive design structured for desktop and mobile viewport widths',
      'Modular layout components for easy content updates',
      'Fast delivery and global caching via Vercel',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    coverImage: '/og/adek_tatu_website.png',
    desktopScreenshots: [
      {
        src: '/og/adek_tatu_website.png',
        alt: 'Adek Tatu — Live Community Website & Brand Platform',
      },
      {
        src: '/og/adek_tatu_hero.jpg',
        alt: 'Adek Tatu — Community Initiative & Public Welfare Platform',
      },
    ],
    mobileScreenshots: [],
    outcomes: [
      'Public-facing brand website with responsive mobile layout',
      'Optimised static build deployed with automated CI/CD pipeline',
    ],
    websiteUrl: 'https://adek-tatu.vercel.app',
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
    fullDescription:
      'A member-facing website portal for Kolwa Beba SACCO, presenting statutory information, savings and loan services, and member contact pathways with trust and clarity.',
    overview:
      'A website project for a SACCO, demonstrating a trustworthy, clear, and professional digital presence for a financial-services organisation.',
    problem:
      'A growing financial-services cooperative needed a clear, professional web portal to communicate membership requirements, savings products, and administrative channels clearly to members and partners.',
    objectives: [
      'Establish a trustworthy, accessible digital presence for SACCO members',
      'Organise information architecture around member services and statutory clarity',
      'Ensure accessibility and mobile responsiveness across devices',
    ],
    responsibilities: [
      'Website design and frontend implementation',
      'Information architecture and content organisation',
      'Responsive and accessible layout development',
    ],
    solution:
      'A responsive web portal delivering structured member guidance, clear financial service categorisation, and straightforward administrative contact pathways.',
    technicalApproach:
      'Next.js and TypeScript implementation with structured content layouts, mobile-first design, and clean typography tailored to a financial cooperative audience.',
    implementationHighlights: [
      'Structured service pages for SACCO products and membership',
      'Accessible, mobile-optimised navigation and contact forms',
      'Clean typography and layout designed for trustworthiness',
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
    outcomes: [
      'Accessible financial services portal for SACCO members and partners',
      'Clear information hierarchy for loan and savings products',
    ],
    websiteUrl: 'https://kolwa.mwaloni.com',
    repositoryUrl: undefined,
    publishStatus: 'published',
    publicationApproved: true,
    featured: false,
    displayOrder: 3,
  },
  {
    slug: 'rentworks-east-africa',
    title: 'RentWorks East Africa',
    category: 'Client Websites',
    industry: 'Equipment Leasing & Asset Finance',
    projectType: 'Client Website',
    client: 'RentWorks East Africa',
    year: '2026',
    role: 'Website implementation, maintenance & SEO',
    description:
      'Corporate website implementation, maintenance, and search structure for an East African equipment leasing and asset-finance provider.',
    fullDescription:
      'Ongoing engagement on the public-facing RentWorks East Africa platform (https://rentworks.co.ke). Focuses on structuring sector-specific leasing services (IT, healthcare, transport, agriculture), improving mobile layout responsiveness, and laying the groundwork for on-page SEO. Theme template placeholder statistics are actively being phased out, and organic ranking claims are deliberately withheld while search campaigns are in progress.',
    overview:
      'RentWorks provides asset finance and leasing solutions across Kenya and East Africa. The engagement delivers clean corporate presentation, clear leasing category routing, and technical SEO structure.',
    problem:
      'Enterprise and SME prospective clients need rapid access to relevant leasing categories (laptops, diagnostic healthcare tools, commercial vehicles) and direct enquiry routes, requiring streamlined navigation and local search discovery.',
    objectives: [
      'Structure distinct sector pages for IT, healthcare, agriculture, and commercial vehicle leasing',
      'Maintain mobile responsive presentation and fast Core Web Vitals on WordPress',
      'Map East Africa search intent and implement structured JSON-LD / schema metadata',
      'Phase out legacy theme placeholder elements and refine commercial callback forms',
    ],
    responsibilities: [
      'WordPress website maintenance, content updates, and layout refinements',
      'Information architecture structuring for 7+ leasing sectors',
      'On-page SEO planning, keyword mapping, and metadata implementation',
      'Technical performance and responsive usability reviews',
    ],
    solution:
      'A structured corporate website implementation establishing clear equipment categories, direct callback conversion funnels, and an ethical, phased SEO roadmap tailored to Kenyan business search patterns.',
    implementationHighlights: [
      'Structured presentation for IT, healthcare, transport, and agricultural leasing portfolios',
      'Regional search keyword mapping and on-page metadata optimization',
      'Direct commercial inquiry and callback dispatch workflows',
    ],
    technologies: ['WordPress', 'Technical SEO', 'On-page SEO', 'Responsive Design', 'LiteSpeed'],
    coverImage: '/og/rentworks_east_africa.png',
    desktopScreenshots: [
      {
        src: '/og/rentworks_east_africa.png',
        alt: 'RentWorks East Africa — Corporate Equipment Leasing & Asset Finance Live Platform',
      },
      {
        src: '/og/rentworks_asset.jpg',
        alt: 'RentWorks East Africa — Agricultural & Commercial Asset Leasing Solutions',
      },
    ],
    mobileScreenshots: [],
    outcomes: [
      'Completed: Live corporate website serving equipment leasing inquiries across East Africa',
      'Completed: Structured sector portfolios for workplace tech, clinical healthcare, and commercial transport',
      'In Progress: Phased on-page SEO optimization and removal of theme template placeholder content',
    ],
    websiteUrl: 'https://rentworks.co.ke',
    repositoryUrl: undefined,
    publishStatus: 'published',
    publicationApproved: true,
    featured: false,
    displayOrder: 4,
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
    overview:
      'Multi-site network and infrastructure operations requiring structured cabling, segmented VLANs, branch routing, and POS terminal connectivity.',
    problem:
      'Distributed commercial locations experienced network unreliability, unsegmented POS transactions sharing bandwidth with guest traffic, and unstandardised rack cabling across branch sites.',
    objectives: [
      'Deliver reliable multi-site connectivity for revenue-critical systems',
      'Implement clean, auditable network infrastructure and rack documentation',
      'Isolate POS payment terminals into dedicated security zones',
      'Support branch-office hardware, VoIP, and POS rollouts',
    ],
    responsibilities: [
      'Site surveys and rack build-outs',
      'Switch and router configuration',
      'VLAN segmentation and POS network hardening',
      'Structured cabling reviews and rack organisation',
    ],
    solution:
      'Standardised network rollout featuring 802.1Q VLAN segmentation, site-to-site VPN tunnels, QoS prioritisation, and comprehensive patch-panel labelling.',
    technicalApproach:
      'Layer 2/3 managed switching with DHCP snooping, dedicated PCI-isolated POS zones, VoIP quality-of-service rules, and auditable structured cabling standards.',
    implementationHighlights: [
      'Multi-site LAN/WAN rollout with segmented VLANs',
      'Branch connectivity and MPLS support',
      'POS network hardening and payment zone isolation',
    ],
    technologies: ['Cisco', 'Huawei', 'Ubiquiti', 'TP-Link', 'VLANs', 'VPN', 'MPLS'],
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
    displayOrder: 5,
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
    overview:
      'A dedicated defensive security laboratory designed to test perimeter defences, network intrusion detection rules, and endpoint telemetry collection.',
    problem:
      'Evaluating detection rules, log decoders, and defensive configurations against adversary tactics requires a realistic, isolated multi-zone testing environment.',
    objectives: [
      'Study network segmentation and intrusion detection',
      'Practice endpoint monitoring and log aggregation',
      'Evaluate defensive tooling against realistic traffic and attack simulations',
      'Map telemetry against MITRE ATT&CK enterprise tactics',
    ],
    responsibilities: [
      'Firewall rule definition and multi-zone routing',
      'NIDS/IPS signature tuning with Suricata',
      'Wazuh agent deployment and log aggregation pipeline configuration',
    ],
    solution:
      'A multi-segmented detection laboratory pairing pfSense stateful firewall routing with inline Suricata NIDS inspection and centralized Wazuh SIEM telemetry.',
    technicalApproach:
      'Adversary simulation mapped to MITRE ATT&CK TTPs, evaluating detection coverage across Linux auditd, Sysmon, and network flow telemetry.',
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
    displayOrder: 6,
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
    overview:
      'Operational workflow automation designed to streamline repetitive IT tasks, integrate disparate business APIs, and maintain human oversight on critical actions.',
    problem:
      'Repetitive administrative operations, manual user onboarding steps, and siloed software tools consumed engineering hours and introduced manual transcription errors.',
    objectives: [
      'Reduce repetitive operational tasks through reliable automation',
      'Maintain human-in-the-loop controls for sensitive actions',
      'Connect disconnected tools and information via APIs',
      'Implement structured error alerting and failure recovery',
    ],
    responsibilities: [
      'Workflow design and event trigger configuration in n8n',
      'Custom Python data formatting and Bash utility scripting',
      'REST API integration with error handling and retry logic',
    ],
    solution:
      'Automated integration pipelines connecting webhooks, scheduled triggers, and internal communication channels with explicit approval steps before state modification.',
    technicalApproach:
      'Event-driven webhook ingestion, idempotent API calls, retry policies, and structured audit logs ensuring full transparency into automated workflows.',
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
    displayOrder: 7,
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
