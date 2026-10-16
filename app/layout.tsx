import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { siteConfig } from '@/lib/data'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://christopherrateng.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Christopher Rateng — IT Infrastructure, Cybersecurity, Software & AI Automation',
    template: '%s — Christopher Rateng',
  },
  description:
    'Christopher Rateng is a Nairobi-based Systems Infrastructure & Cloud Security Specialist, Software Developer, AI Automation Engineer, and founder of SheriaBot. Building secure, automated, and dependable enterprise technology systems.',
  applicationName: 'Christopher Rateng Portfolio',
  keywords: [
    'Christopher Rateng',
    'Christopher Modicai Rateng',
    'ICT Consultant Kenya',
    'Cybersecurity Consultant Kenya',
    'Systems Infrastructure Engineer Nairobi',
    'Cloud Security Specialist',
    'Microsoft 365 Consultant Kenya',
    'Network Engineer Nairobi',
    'Software Developer Kenya',
    'Full-Stack Developer Nairobi',
    'AI Automation Engineer Kenya',
    'SheriaBot Founder',
    'Fintech Engineering East Africa',
    'RegTech Kenya',
    'Remote IT Support Specialist',
    'Enterprise IT Infrastructure Specialist',
  ],
  authors: [{ name: siteConfig.fullName, url: siteUrl }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  category: 'Technology',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: siteUrl,
    title: 'Christopher Rateng — IT Infrastructure, Cybersecurity, Software & AI Automation',
    description:
      'Nairobi-based Systems Infrastructure & Cloud Security Specialist, Software Developer, AI Automation Engineer, and founder of SheriaBot. I build, secure, automate, and support the technology businesses depend on.',
    siteName: 'Christopher Rateng',
    images: [
      {
        url: '/branding/christopher-rateng-logo-social.png',
        width: 1200,
        height: 630,
        alt: 'Christopher Rateng — Systems Infrastructure, Security, Software & Automation',
      },
      {
        url: '/portraits/Christopher_rateng-Passport-Photo.jpg',
        width: 800,
        height: 800,
        alt: 'Christopher Modicai Rateng',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christopher Rateng — IT Infrastructure, Cybersecurity, Software & AI Automation',
    description:
      'Systems Infrastructure & Cloud Security Specialist, Software Developer, AI Automation Engineer, and founder of SheriaBot.',
    images: ['/branding/christopher-rateng-logo-social.png'],
    creator: '@ItsKris62',
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icons/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/branding/christopher-rateng-logo-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/icons/apple-touch-icon-dark.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: '/icons/favicon.ico',
  },
  other: {
    'geo.region': 'KE-30',
    'geo.placename': 'Nairobi',
    'geo.position': '-1.286389;36.817223',
    ICBM: '-1.286389, 36.817223',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f7f4' },
    { media: '(prefers-color-scheme: dark)', color: '#181b20' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const structuredDataGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: siteConfig.fullName,
      alternateName: [siteConfig.name, 'Kris Rateng', 'Christopher M. Rateng'],
      jobTitle: 'Systems Infrastructure & Cloud Security Specialist',
      description: siteConfig.tagline,
      url: siteUrl,
      image: `${siteUrl}/portraits/Christopher_rateng-Passport-Photo.jpg`,
      email: `mailto:${siteConfig.contact.email}`,
      telephone: '+254714659346',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nairobi',
        addressCountry: 'KE',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'United States International University Africa (USIU-Africa)',
        url: 'https://www.usiu.ac.ke',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'SheriaBot',
        url: 'https://app.sheriabot.com',
      },
      sameAs: [
        siteConfig.contact.linkedin,
        siteConfig.contact.github,
      ],
      knowsAbout: [
        'IT Infrastructure & Enterprise Networking',
        'Cybersecurity & Threat Mitigation',
        'Cloud Security & Architecture',
        'Microsoft 365 Enterprise Administration',
        'Software Engineering & API Architecture',
        'AI Automation & Intelligent Agent Workflows',
        'Fintech Integrations & Payment Gateways',
        'Regulatory Technology (RegTech)',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Christopher Rateng — Official Portfolio',
      description: 'Official portfolio and engineering case studies of Christopher Modicai Rateng.',
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: 'Christopher Rateng — ICT, Security & Software Engineering Services',
      url: siteUrl,
      image: `${siteUrl}/branding/christopher-rateng-logo-social.png`,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nairobi',
        addressRegion: 'Nairobi County',
        addressCountry: 'KE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -1.286389,
        longitude: 36.817223,
      },
      areaServed: [
        { '@type': 'Country', name: 'Kenya' },
        { '@type': 'AdministrativeArea', name: 'East Africa' },
        { '@type': 'Place', name: 'Worldwide (Remote)' },
      ],
      serviceType: [
        'Systems Infrastructure & Network Administration',
        'Cybersecurity Audits & Vulnerability Assessment',
        'Custom Web & Software Development',
        'AI Workflow Automation & Integration',
        'Cloud Migration & Microsoft 365 Architecture',
      ],
      provider: {
        '@id': `${siteUrl}/#person`,
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
