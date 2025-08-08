export const metadata = {
  title: "TCorps Hub | Web3 Development & Strategy",
  description: "TCorps Hub is your trusted partner for Web3 development, branding, and crypto solutions. From websites to smart contracts – we build your Web3 vision.",
  keywords: [
    "Web3 development",
    "crypto websites",
    "Next.js",
    "smart contracts",
    "NFT strategy",
    "token creation",
    "whitepaper design",
    "Discord setup",
    "TCorps Hub"
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "TCorps Hub | Web3 Development & Strategy",
    description: "We build Web3 experiences – websites, whitepapers, tokens, Discords & more.",
    url: "https://tcorpshub.com",
    siteName: "TCorps Hub",
    locale: "en_US",
    type: "website",
  },
};


import HomeClient from "@/components/client/HomeClient";





export default function HomePage() {
  return <HomeClient />;
}
