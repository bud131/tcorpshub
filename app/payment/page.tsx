// app/payment/page.tsx

export const metadata = {
  title: "TCorps Hub | Secure Payments",
  description: "Pay securely via Stripe or crypto for any Web3-related service from TCorps Hub.",
  openGraph: {
    title: "TCorps Hub | Secure Payments",
    description: "Choose between Stripe or crypto payments. Simple, safe, and flexible.",
    url: "https://tcorpshub.com/payment",
    siteName: "TCorps Hub",
    locale: "en_US",
    type: "website",
  },
  keywords: ["payments", "stripe", "crypto", "tcorpshub", "web3", "checkout", "secure payments"],
  robots: "index, follow",
};

import PaymentClient from "@/components/client/PaymentClient";

export default function PaymentPage() {
  return <PaymentClient />;
}
