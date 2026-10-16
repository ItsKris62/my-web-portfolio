export type PublishStatus = 'published' | 'draft'

export type ProjectCategory =
  | 'Client Websites'
  | 'Software & SaaS'
  | 'Cybersecurity'
  | 'Infrastructure'
  | 'AI & Automation'

export type ProjectType =
  | 'Client Website'
  | 'SaaS Product'
  | 'Security Lab'
  | 'Infrastructure Deployment'
  | 'AI Automation'

export interface ProjectScreenshot {
  src: string
  alt: string
  placeholder?: boolean
}

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  industry?: string
  projectType: ProjectType
  client?: string
  year: string
  role: string
  description: string
  fullDescription?: string
  technologies: string[]
  coverImage?: string
  desktopScreenshots?: ProjectScreenshot[]
  mobileScreenshots?: ProjectScreenshot[]
  outcomes?: string[]
  websiteUrl?: string
  repositoryUrl?: string
  publishStatus: PublishStatus
  publicationApproved: boolean
  featured: boolean
  displayOrder: number
  // Optional structured case-study fields (only render when populated)
  overview?: string
  problem?: string
  objectives?: string[]
  responsibilities?: string[]
  solution?: string
  technicalApproach?: string
  implementationHighlights?: string[]
  challenges?: string[]
  lessonsLearned?: string[]
  clientBackground?: string
}

export interface ServiceDeliverable {
  text: string
}

export interface Service {
  id: string
  number: string
  title: string
  headline: string
  description: string
  target: string
  deliverables: string[]
  technologies: string[]
  engagementTypes?: string[]
  clientBenefit?: string
  cta: string
  icon: string
  tone: 'light' | 'orange' | 'dark'
}

export interface CareerMilestone {
  period: string
  title: string
  organization?: string
  summary: string
  details: string[]
  technologies?: string[]
  impact?: string
  story?: string
}

export interface SkillGroup {
  id: string
  label: string
  skills: string[]
}

export interface Stat {
  value: string
  label: string
}

export interface Certification {
  title: string
  issuer: string
  year: string
  verifyUrl?: string
}

export interface EducationItem {
  degree: string
  field: string
  institution: string
  year: string
  status?: 'completed' | 'in-progress'
}

export interface Research {
  title: string
  description: string
  interests: string[]
  context?: string
}

export interface ContactInfo {
  email: string
  location: string
  serviceRegions: string
  linkedin: string
  github: string
  resumeUrl?: string
}

export interface SiteConfig {
  name: string
  fullName: string
  tagline: string
  secondaryTagline: string
  positioning: string
  contact: ContactInfo
}
