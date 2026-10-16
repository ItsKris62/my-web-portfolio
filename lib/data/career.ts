import type { CareerMilestone, Stat } from './types'

export const career: CareerMilestone[] = [
  {
    period: 'Sep 2019 – Dec 2019',
    title: 'IT Support Intern',
    organization: 'Royal Media Services',
    summary:
      'Enterprise IT support in a broadcast environment, administering Active Directory and supporting more than 200 user accounts across Linux and Windows workstations.',
    details: [
      'Provided enterprise IT support for broadcast operations and end users.',
      'Administered Active Directory and managed more than 200 user accounts.',
      'Supported Linux and Windows workstation environments.',
      'Performed hardware and software troubleshooting.',
      'Produced technical documentation for support processes.',
    ],
    technologies: ['Active Directory', 'Linux', 'Windows', 'User support', 'Hardware troubleshooting'],
    impact:
      'Learned how much organisations rely on technology being available, stable, and well supported.',
    story:
      'The beginning of my career taught me how much organisations rely on technology being available, stable, and well supported.',
  },
  {
    period: 'Oct 2020 – Aug 2023',
    title: 'IT Support Specialist / Systems Administration',
    organization: 'Sledge Group Enterprises',
    summary:
      'Multi-site IT operations spanning branch networking, 200+ IT assets, POS systems, MPLS connectivity, VoIP, and disaster-recovery procedures.',
    details: [
      'Managed multi-site IT infrastructure for more than 100 users.',
      'Oversaw 200+ IT assets across distributed locations.',
      'Implemented branch networking with Huawei switching and VLANs.',
      'Configured MPLS connectivity and VPNs.',
      'Supported VoIP/PBX and POS systems.',
      'Managed enterprise applications and backups/disaster recovery.',
    ],
    technologies: ['Huawei', 'VLANs', 'MPLS', 'VPN', 'VoIP/PBX', 'POS systems', 'Asset management'],
    impact:
      'Resolved approximately 95% of support requests within 30 minutes in a previous SLA-driven environment.',
    story:
      'This was where I learned to manage infrastructure beyond the desktop — from structured cabling and branch connectivity to business systems and operational continuity.',
  },
  {
    period: 'Aug 2023 – Present',
    title: 'IT Support Manager',
    organization: 'Net Scaling Solutions',
    summary:
      'Leading managed services across distributed client environments, covering Microsoft 365, identity, endpoint protection, monitoring, automation, and junior-engineer mentorship.',
    details: [
      'Oversee managed IT services for distributed client environments.',
      'Administer Microsoft 365, Active Directory, and Entra ID.',
      'Manage endpoint protection and IT monitoring.',
      'Drive incident escalation and response.',
      'Build Python/Bash automation to reduce repetitive tasks.',
      'Produce technical documentation and mentor three junior engineers.',
    ],
    technologies: [
      'Microsoft 365',
      'Entra ID',
      'Active Directory',
      'Endpoint protection',
      'Monitoring',
      'Python',
      'Bash',
      'n8n',
    ],
    impact:
      '30% reduction in security incidents · 25% improvement in incident resolution time · Support for 100+ endpoints · Mentorship of three junior engineers.',
    story:
      'Supporting distributed environments strengthened my understanding of reliability, proactive security, automation, and the importance of making technical operations measurable and repeatable.',
  },
  {
    period: 'Current',
    title: 'Founder & Software Builder',
    organization: 'SheriaBot',
    summary:
      'Founding and building a regulatory intelligence platform, combining software architecture, product development, secure APIs, AI-assisted workflows, and fintech domain knowledge.',
    details: [
      'Leading product development and software architecture.',
      'Designing and building secure backend systems and APIs.',
      'Integrating AI-assisted workflows for regulatory research.',
      'Managing PostgreSQL database architecture.',
      'Implementing authentication and access controls.',
      'Overseeing cloud deployment and operational monitoring.',
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Node.js', 'AI workflows'],
    story:
      'Building SheriaBot brought together my interests in software, cybersecurity, fintech, research, and automation — turning years of practical experience into a product.',
  },
]

export const stats: Stat[] = [
  { value: '5+', label: 'years in infrastructure & operations' },
  { value: '100+', label: 'endpoints and users supported' },
  { value: '200+', label: 'IT assets managed' },
  { value: '30%', label: 'reduction in security incidents' },
]
