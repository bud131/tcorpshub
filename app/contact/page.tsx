// app/contact/page.tsx
import type { Metadata } from "next";
import ContactClient from "@/components/client/ContactClient";

export const metadata: Metadata = {
  title: "Contact | Tcorps Hub",
  description:
    "Reach out to Tcorps Hub for Next.js/React & Web3 collaborations. Let’s build your vision.",
  openGraph: {
    title: "Contact | Tcorps Hub",
    description:
      "Get in touch for web development, Web3 work, and collaborations.",
    url: "https://tcorpshub.com/contact",
    siteName: "Tcorps Hub",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return <ContactClient />;
}
