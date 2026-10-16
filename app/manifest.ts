import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Christopher Rateng — IT Infrastructure, Cybersecurity, Software & AI Automation',
    short_name: 'Christopher Rateng',
    description:
      'Systems Infrastructure & Cloud Security Specialist, Software Developer, AI Automation Engineer, and founder of SheriaBot.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f7f4',
    theme_color: '#181b20',
    icons: [
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/branding/christopher-rateng-logo-icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/apple-touch-icon-dark.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
