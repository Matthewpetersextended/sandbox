// app/layout.tsx


import { ConditionalNav } from "@/components/website/conditional-nav";

import { Geist } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Teacher Pro",
  description: "Education Platform for Teachers",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Teacher Pro',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
  openGraph: {
    title: "Teacher Pro",
    description: "Education Platform for Teachers",
    type: "website",
  },
};

// NEW: Separate viewport export for Next.js 15
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#3b82f6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="bg-background text-foreground">
        <ConditionalNav />
        {children}
      </body>
    </html>
  );
}