export const metadata = {
  title: "TCorps Hub | Affiliates",
  description: "Discover our trusted affiliate partnerships and support TCorps Hub through exclusive offers and tools.",
  openGraph: {
    title: "TCorps Hub | Affiliates",
    description: "Support us through our trusted affiliate links for hosting, cloud storage, crypto wallets and more.",
    url: "https://tcorpshub.com/affiliates",
    siteName: "TCorps Hub",
    locale: "en_US",
    type: "website",
  },
  keywords: ["affiliates", "partnerships", "referral", "tcorpshub", "tangem", "pcloud", "hostinger"],
  robots: "index, follow",
};

import AffiliatesClient from "@/components/client/AffiliatesClient";

export default function AffiliatesPage() {
  return <AffiliatesClient />;
}
