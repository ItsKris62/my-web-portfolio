import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { siteConfig } from '@/lib/data'

const siteUrl = 'https://christopherrateng.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Christopher Rateng — IT Infrastructure, Cybersecurity, Software & AI Automation',
    template: '%s — Christopher Rateng',
  },
  description:
    'Christopher Rateng is a Nairobi-based Systems Infrastructure & Cloud Security Specialist, Software Developer, AI Automation Engineer, and founder of SheriaBot. I build, secure, automate, and support the technology businesses depend on.',
  keywords: [
    'Christopher Rateng',
    'ICT Consultant Kenya',
    'Freelance IT Support Nairobi',
    'Microsoft 365 Consultant Kenya',
    'Network Engineer Nairobi',
    'Cybersecurity Consultant Kenya',
    'Freelance Systems Administrator',
    'Website Developer Kenya',
    'AI Workflow Automation Consultant',
    'Remote IT Support Engineer',
    'IT Infrastructure Specialist East Africa',
    'SheriaBot',
  ],
  authors: [{ name: siteConfig.fullName }],
  creator: siteConfig.fullName,
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Christopher Rateng — IT Infrastructure, Cybersecurity, Software & AI Automation',
    description:
      'I build, secure, automate, and support the technology businesses depend on.',
    siteName: 'Christopher Rateng',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christopher Rateng — IT Infrastructure, Cybersecurity, Software & AI Automation',
    description:
      'Systems Infrastructure & Cloud Security Specialist, Software Developer, AI Automation Engineer, and founder of SheriaBot.',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f7f4' },
    { media: '(prefers-color-scheme: dark)', color: '#181b20' },
  ],
}

const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  jobTitle: siteConfig.positioning,
  email: `mailto:${siteConfig.contact.email}`,
  url: siteUrl,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  sameAs: [
    siteConfig.contact.linkedin,
    siteConfig.contact.github,
  ],
  knowsAbout: [
    'IT Infrastructure',
    'Cybersecurity',
    'Microsoft 365',
    'Network Engineering',
    'Software Development',
    'AI Automation',
    'Cloud Security',
    'Systems Administration',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
