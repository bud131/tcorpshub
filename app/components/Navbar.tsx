// app/components/Header.tsx
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png" // βεβαιώσου ότι υπάρχει στον φάκελο public
            alt="Tcorps Logo"
            width={120}
            height={40}
          />
        </Link>

        {/* Menu */}
        <nav className="flex space-x-6 text-sm sm:text-base">
          <Link href="/">Tcorps Hub</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/projects">My Projects & Collaborations</Link>
          <Link href="/affiliates">Affiliates</Link>
          <Link href="/payment">Secure Payment</Link>
        </nav>
      </div>
    </header>
  );
}
