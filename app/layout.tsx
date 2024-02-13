import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Company Logos",
  description:
    "Find & download over 250,000 company logos for free, in a simple, clean and beautiful interface.",
  openGraph: {
    title: "Company Logos",
    description:
      "Find & download over 250,000 company logos for free, in a simple, clean and beautiful interface.",
    url: "https://copanylogos.xyz",
    siteName: "Company Logos",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
