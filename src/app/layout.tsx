import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import { Toaster } from 'react-hot-toast';


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://crateng.vercel.com'),
  title: "Christopher Rateng | IT Systems Engineer & Web Developer",
  description:
    "Portfolio of Christopher Modicai Rateng, an IT Systems Engineer with expertise in cybersecurity, system administration, and web development. Explore my projects, skills, and experience.",
  openGraph: {
    title: "Christopher Rateng | IT Systems Engineer & Web Developer",
    description:
      "Portfolio of Christopher Modicai Rateng, showcasing skills in IT systems, cybersecurity, and web development.",
    url: "https://crateng.vercel.com", // Replace with your deployed URL
    siteName: "Christopher Rateng Portfolio",
    images: [
      {
        url: "/assets/christopher-image.jpg", // Ensure this image exists in /public/assets
        width: 1200,
        height: 630,
        alt: "Christopher Rateng Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload key assets for performance */}
        <link rel="preload" href="/assets/christopher-image.jpg" as="image" />
        <link rel="preload" href="/assets/pattern-1.png" as="image" />
        <link rel="preload" href="/assets/pattern-2.png" as="image" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}>
          {children}
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>

    </html>
  );
}