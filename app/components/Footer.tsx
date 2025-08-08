import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black py-12">
      <div className="relative flex justify-center items-center max-w-6xl mx-auto px-4">
        {/* Left Bot */}
        <img
          src="/left.png"
          alt="Left Bot"
          className="w-28 sm:w-36 object-contain"
        />

        {/* Center Logo */}
        <img
          src="/logo.gif"
          alt="TCorps Logo"
          className="w-100 sm:w-120 mx-4 object-contain"
        />

        {/* Right Bot */}
        <img
          src="/right.png"
          alt="Right Bot"
          className="w-28 sm:w-36 object-contain"
        />
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-12 mt-10">
        {[
          { label: "DISCORD", icon: "/discord.png", href: "https://discord.gg/DvS9xtvA32" },
          { label: "TELEGRAM", icon: "/telegram.png", href: "https://t.me/TC131" },
          { label: "EMAIL", icon: "/email.png", href: "#" },
        ].map(({ label, icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-white hover:text-blue-400 transition"
          >
            <div className="bg-white/10 p-4 rounded-full shadow-lg backdrop-blur-sm hover:scale-110 transition-all duration-300">
              <img src={icon} alt={label} className="w-10 h-10" />
            </div>
            <span className="mt-2 text-sm">{label}</span>
          </a>
        ))}
      </div>
	  <div className="mt-10 text-center text-sm text-gray-400 px-4">
  © TCorps Hub – All rights reserved – Web3 development & design by{" "}
  <a
    href="https://tcorpshub.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 hover:underline"
  >
    TCorps Hub
  </a>{" "}
  | Built with React & Next.js
</div>


    </footer>
  );
}