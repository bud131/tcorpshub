"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Background from "../components/Background";


export default function ProjectsPage() {
  return (
    <>
      <Background />
      <Header />
      <main className="min-h-screen px-4 py-12 text-white">
        <h1 className="text-3xl font-bold text-center mb-12 underline decoration-blue-600 decoration-4 underline-offset-4">
          My Projects & Collaborations
        </h1>

        <section className="max-w-4xl mx-auto space-y-12">
          {[{
            name: "Web3Crystals.io 💎",
            description: "Physical printed crystals backed by NFTs & crypto utility. Each purchase includes unique benefits like airdrops, NFT locking, and exclusive discounts.",
            links: [
              { label: "Start your journey here", href: "https://web3crystals.io" },
              { label: "info@web3crystals.io", href: "mailto:info@web3crystals.io" }
            ],
            image: "web3logo.gif"
          }, {
            name: "NextGen Reality 🎮",
            description: "Psychological tricks, mind hacks, and engaging content in YouTube Shorts & TikTok!",
            links: [
              { label: "@NextGenRealityOfficial", href: "https://www.youtube.com/@NextGenRealityOfficial/" },
              { label: "@nextgen_reality_official", href: "https://www.tiktok.com/@nextgen_reality_official" }
            ],
            image: "NextGenReality.png"
          }, {
            name: "Cryptopia 🌐",
            description: "An immersive blockchain-powered metaverse where players explore, trade, and shape the future of a decentralized society. Build, vote, and engage in a fully tokenized economy.",
            links: [
              { label: "Start your journey here", href: "https://cryptopia.com/" }
            ],
            image: "cryptopia_l.png"
          }].map((project, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center justify-between bg-white/5 p-6 rounded-lg border border-white/10">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-blue-400 mb-2">{project.name}</h2>
                <p className="text-gray-300 mb-2">{project.description}</p>
                {project.links.map((link, j) => (
                  <p key={j} className="text-gray-300">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {link.label}
                    </a>
                  </p>
                ))}
              </div>
              <a
                href={project.links[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 sm:mt-0 sm:ml-6"
              >
                <img
                  src={`/${project.image}`}
                  alt={`${project.name} Logo`}
                  className="w-40 max-h-32 object-contain rounded shadow-md"
                />
              </a>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
