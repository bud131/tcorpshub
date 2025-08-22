// app/layout.tsx
import "./globals.css";
import Script from "next/script";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import RecaptchaScript from "@/components/RecaptchaScript";

export const metadata: Metadata = {
  metadataBase: new URL("https://tcorpshub.com"),
  title: { default: "Tcorps Hub", template: "%s | Tcorps Hub" },
  description:
    "Harry’s web development portfolio: Next.js/React projects, collaborations, and Web3 work.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tcorps Hub",
    description:
      "Next.js/React portfolio and collaborations by Harry. View projects, contact, and work with me.",
    url: "https://tcorpshub.com",
    siteName: "Tcorps Hub",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Tcorps Hub" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tcorps Hub",
    description:
      "Next.js/React portfolio and collaborations by Harry. View projects and get in touch.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* reCAPTCHA v3 */}
        <RecaptchaScript />

        {/* Vercel Web Analytics */}
        <Analytics />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>

        {/* JSON-LD (Person Schema) */}
        <Script id="org-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Harry",
            url: "https://tcorpshub.com",
            sameAs: [],
          })}
        </Script>
      </body>
    </html>
  );
}
