import './globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Christopher Rateng – IT Systems Engineer & Front-End Developer',
  description: 'Experienced IT Systems Engineer and Front-End Developer based in Nairobi, specializing in infrastructure optimization and modern web applications.',
  keywords: ['IT Systems Engineer', 'Front-End Developer', 'Nairobi', 'React', 'Next.js', 'Tailwind CSS'],
  authors: [
    { name: 'Christopher Rateng', url: 'https://www.linkedin.com/in/christopher-rateng' }
  ],
  creator: 'Christopher Rateng',
  openGraph: {
    title: 'Christopher Rateng – IT Systems Engineer & Front-End Developer',
    description: 'Experienced IT Systems Engineer and Front-End Developer based in Nairobi, specializing in infrastructure optimization and modern web applications.',
    url: 'https://your-domain.vercel.app',
    siteName: 'Christopher Rateng Portfolio',
    images: [
      {
        url: 'https://your-domain.vercel.app/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Christopher Rateng Portfolio'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christopher Rateng Portfolio',
    description: 'IT Systems Engineer & Front-End Developer Portfolio',
    images: ['https://your-domain.vercel.app/assets/og-image.png'],
    creator: '@chrisrateng',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body>{children}</body>
    </html>
  );
}