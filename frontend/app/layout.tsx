//frontend/app/layout.tsx

import type { Metadata } from "next";
import "./global.css";  // or "./globals.css" if you rename the file

export const metadata: Metadata = {
  title: "Mamut - Own Your Pipeline Forever",
  description: "Launch outbound in <1 week. Build to permanent ownership. Own your pipeline forever.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}