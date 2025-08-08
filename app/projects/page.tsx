export const metadata = {
  title: "TCorps Hub | Projects",
  description: "Explore TCorps Hub's latest Web3 projects, collaborations, and creative ventures.",
  openGraph: {
    title: "TCorps Hub | Projects",
    description: "Dive into Web3Crystals, Cryptopia, and more cutting-edge collaborations by TCorps Hub.",
    url: "https://tcorpshub.com/projects",
    siteName: "TCorps Hub",
    locale: "en_US",
    type: "website",
  },
  keywords: ["web3 projects", "collaborations", "nft utility", "cryptopia", "web3crystals"],
  robots: "index, follow",
};

import ProjectsClient from "@/components/client/ProjectsClient";

export default function ProjectsPage() {
  return <ProjectsClient />;
}
