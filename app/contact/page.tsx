// app/contact/page.tsx
export const metadata = {
  title: "Contact | TCorps Hub",
  description: "Get in touch with TCorps Hub to discuss your Web3 development needs. We’re ready to support your project from idea to execution.",
  openGraph: {
    title: "Contact | TCorps Hub",
    description: "Reach out to TCorps Hub for custom Web3 development and crypto project support.",
    url: "https://tcorpshub.com/contact",
    siteName: "TCorps Hub",
    locale: "en_US",
    type: "website",
  },
};

"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Background from "../components/Background";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <Background />
      <Header />
      <main className="min-h-screen px-4 py-12 text-white">
        <h1 className="text-3xl font-bold text-center mb-8 underline decoration-blue-600 decoration-4 underline-offset-4">
          Contact Us
        </h1>
        <ContactForm />
        <div className="flex justify-center mt-8">
          <img src="/tg.png" alt="Telegram" className="w-[200px] h-[256px] mx-auto" />
        </div>
      </main>
      <Footer />
    </>
  );
}
