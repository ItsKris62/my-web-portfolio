import type { EducationItem, Research } from './types'

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Science in Information Systems & Technology',
    field: 'Networking concentration',
    institution: 'United States International University–Africa',
    year: '2019',
    status: 'completed',
  },
  {
    degree: 'Master of Science in Information Systems',
    field: 'Information Security specialisation',
    institution: 'United States International University–Africa',
    year: 'Expected November 2026',
    status: 'in-progress',
  },
]

export const research: Research = {
  title:
    'An Empirical Assessment of Coordinated Vulnerability Disclosure Workflow Maturity in Kenyan Mobile Money Systems.',
  description:
    'Examining how organisations and independent security researchers coordinate vulnerability discovery, reporting, assessment, remediation, and responsible disclosure within Kenya\u2019s mobile-money ecosystem.',
  interests: [
    'Coordinated vulnerability disclosure',
    'Financial technology security',
    'Vulnerability management',
    'Information security governance',
    'Regulatory compliance',
    'Security research',
    'Secure digital financial systems',
  ],
  context:
    'Research conducted as part of the MSc in Information Systems, Information Security specialisation, at USIU-Africa. The thesis is in progress and has not been completed or published.',
}
