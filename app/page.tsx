"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Background from "./components/Background";
import Script from "next/script";

const phrases = [
  "NEED A WEBSITE?",
  "NEED A WHITEPAPER?",
  "NEED NFT STRATEGY & IDEAS?",
  "NEED A LOGO?",
  "NEED TO CREATE A TOKEN?",
  "NEED A NEW DISCORD?",
  "NEED A DISCORD ADMIN / MODERATOR?",
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Background />
      <Header />
      <Script
        src="https://www.google.com/recaptcha/api.js"
        async
        defer
      />

      <main className="text-white min-h-screen px-4 py-12">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center whitespace-nowrap">
            TCorps Hub – Your Trusted Partner for Web3 Solutions
          </h1>

          {/* Animated Phrase Box */}
          <div className="relative h-20 w-full flex items-center justify-center">
            <div className="relative w-full h-full max-w-lg rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={phrases[index]}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.6 }}
                  className="text-white text-sm sm:text-base font-semibold absolute"
                >
                  {phrases[index]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-16 px-4 sm:px-0 space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-white underline decoration-blue-600 decoration-4 underline-offset-4">
            Who We Are
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed tracking-wide text-gray-300">
            At <span className="font-semibold text-blue-400">TCorpsHub.com</span>, I specialize in designing high-quality websites,
            whitepapers, branding, and security solutions for NFT and crypto projects. Everything is built with modern tools like <span className="text-blue-400 font-semibold">Next.js</span>, <span className="text-blue-400 font-semibold">Node.js</span>, <span className="text-blue-400 font-semibold">Tailwind</span>, and <span className="text-blue-400 font-semibold">Shadcn UI</span> — fast, clean, and optimized.
          </p>
          <p className="text-lg sm:text-xl leading-relaxed tracking-wide text-gray-300">
            I only take on a limited number of clients to ensure each project gets my full attention. Expect direct communication, transparency, and a rapid turnaround — typically within <span className="font-bold text-blue-400">1–2 days</span>.
          </p>
        </motion.section>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Button asChild className="text-white bg-blue-600 hover:bg-blue-700">
  <a href="/contact">
    <Rocket className="mr-2 h-4 w-4" />
    Launch Your Project
  </a>
</Button>
        </motion.div>

        {/* Our Services Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-16 px-4 sm:px-0 space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-white underline decoration-blue-600 decoration-4 underline-offset-4">
            Our Services
          </h2>

          <ul className="space-y-6 mt-6">
            {[{
              title: "Website Development",
              desc: "Custom-built, professional websites for NFT collections and crypto projects.",
            }, {
              title: "Whitepaper Creation",
              desc: "We craft professional, investor-ready whitepapers based on your project’s vision.",
            }, {
              title: "Logo & Branding",
              desc: "Unique and impactful brand identity for your Web3 venture.",
            }, {
              title: "Smart Contract Deployment",
              desc: "Need to create a token? We handle everything.",
            }, {
              title: "Discord Server Setup & Moderation",
              desc: "Structured, automated, and secure community management.",
            }, {
              title: "Web3 Security & Anti-Scam Solutions",
              desc: "We ensure safe transactions, anti-phishing measures, and scam prevention.",
            }, {
              title: "Next.js, Node.js & Tailwind Development",
              desc: "Fast, modern, and responsive frontend/backend development using the best dev stack.",
            }].map(({ title, desc }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="block text-lg sm:text-xl font-semibold text-blue-400">
                  {title}
                </span>
                <span className="text-lg sm:text-xl text-gray-300">{desc}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
