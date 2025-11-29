import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mamut",
  description: "Launch outbound in less than 1 week",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
