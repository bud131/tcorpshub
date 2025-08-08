export const metadata = {
  title: "Contact | TCorps Hub – Web3 Development & Strategy",
  description: "Reach out to TCorps Hub for tailored Web3 development, branding, whitepapers, and crypto solutions. Let's build your vision.",
  keywords: [
    "TCorps Hub", "Contact", "Web3 development", "crypto branding", "NFT websites", "smart contracts", "whitepapers", "blockchain strategy"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Contact | TCorps Hub – Web3 Development & Strategy",
    description: "Let’s work together on your Web3 project – from websites and whitepapers to branding and moderation.",
    url: "https://tcorpshub.com/contact",
    siteName: "TCorps Hub",
    locale: "en_US",
    type: "website",
  },
};

import ContactClient from "@/components/client/ContactClient";

export default function ContactPage() {
  return <ContactClient />;
}
