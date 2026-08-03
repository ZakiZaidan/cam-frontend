"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Nissan NICS style: minimal top nav links, no dropdown
  const mainLinks = NAV_LINKS.filter(
    (l) => l.label !== "Beranda"
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
          }`}
      >
        <nav className="flex items-center justify-between px-6 lg:px-16 py-6 lg:py-8">
          {/* Logo — Nissan NICS style: small icon + stacked text */}
          <Link href="/" className="flex items-center gap-4 group">
            <Image
              src="/logo/camLogo.png"
              alt="CAM Cargo"
              width={56}
              height={56}
              className="rounded-sm"
            />
            <div className="flex flex-col leading-none justify-center mt-1">
              <span
                className={`text-sm lg:text-base font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${isScrolled ? "text-[#111827]" : "text-white"
                  }`}
              >
                CAM CARGO
              </span>
              <span
                className={`text-[10px] lg:text-xs font-medium tracking-[0.15em] uppercase mt-1 transition-colors duration-300 ${isScrolled ? "text-gray-500" : "text-white/70"
                  }`}
              >
                Logistics & Transportation
              </span>
            </div>
          </Link>

          {/* Desktop Links — right aligned, clean */}
          <div className="hidden lg:flex items-center gap-12">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${isScrolled ? "text-[#111827]" : "text-white"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className={`lg:hidden p-2 transition-colors ${isScrolled ? "text-[#111827]" : "text-white"
              }`}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {/* Full-screen Mobile Menu — Nissan NICS Style */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[999] bg-[#111827] flex flex-col animate-fade-in">
          <div className="flex items-center justify-between px-6 py-5">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={() => setIsMobileOpen(false)}
            >
              <Image
                src="/logo/logo-cam.png"
                alt="CAM Cargo"
                width={36}
                height={36}
                className="rounded-sm"
              />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white">
                CAM CARGO
              </span>
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="text-white p-2"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-12 gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-white text-3xl font-light tracking-wide hover:text-gray-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="px-12 py-8 text-gray-500 text-xs tracking-wider">
            © CAM Cargo — PT. Cipta Astama Mandala
          </div>
        </div>
      )}
    </>
  );
}
