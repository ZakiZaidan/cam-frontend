"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS, SERVICES } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [layananOpen, setLayananOpen] = useState(false);
  const [mobileLayananOpen, setMobileLayananOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLayananOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const mainLinks = NAV_LINKS.filter((l) => l.label !== "Beranda");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between px-6 lg:px-16 py-6 lg:py-8">
          {/* Logo */}
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
                className={`text-sm lg:text-base font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isScrolled ? "text-[#111827]" : "text-white"
                }`}
              >
                CAM CARGO
              </span>
              <span
                className={`text-[10px] lg:text-xs font-medium tracking-[0.15em] uppercase mt-1 transition-colors duration-300 ${
                  isScrolled ? "text-gray-500" : "text-white/70"
                }`}
              >
                Logistics &amp; Transportation
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {mainLinks.map((link) => {
              if (link.label === "Layanan") {
                return (
                  <div
                    key={link.href}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setLayananOpen(true)}
                    onMouseLeave={() => setLayananOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 text-base font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                        isScrolled ? "text-[#111827]" : "text-white"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${layananOpen ? "rotate-180" : ""}`}
                      />
                    </Link>

                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                        layananOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                        <div className="py-2">
                          {SERVICES.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/layanan/${service.slug}`}
                              onClick={() => setLayananOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 group transition-colors"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div>
                                <p className="text-sm font-semibold text-gray-900 group-hover:text-red-700 transition-colors">
                                  {service.title}
                                </p>
                                <p className="text-xs text-gray-400">{service.subtitle}</p>
                              </div>
                            </Link>
                          ))}
                          <div className="border-t border-gray-100 mt-2 pt-2 px-4 pb-2">
                            <Link
                              href="/layanan"
                              onClick={() => setLayananOpen(false)}
                              className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
                            >
                              Lihat Semua Layanan →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                    isScrolled ? "text-[#111827]" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? "text-[#111827]" : "text-white"
            }`}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {/* Full-screen Mobile Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[999] bg-[#111827] flex flex-col animate-fade-in overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-5">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={() => setIsMobileOpen(false)}
            >
              <Image
                src="/logo/camLogo.png"
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

          <div className="flex-1 flex flex-col justify-center px-8 gap-2 pb-8">
            {NAV_LINKS.map((link) => {
              if (link.label === "Layanan") {
                return (
                  <div key={link.href}>
                    <button
                      onClick={() => setMobileLayananOpen((v) => !v)}
                      className="flex items-center justify-between w-full text-white text-2xl font-light tracking-wide py-3 border-b border-white/10"
                    >
                      <span>Layanan</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                          mobileLayananOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileLayananOpen && (
                      <div className="pl-4 mt-2 flex flex-col gap-1">
                        {SERVICES.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/layanan/${s.slug}`}
                            onClick={() => setIsMobileOpen(false)}
                            className="text-white/70 text-base py-1.5 hover:text-white transition-colors"
                          >
                            {s.title}
                          </Link>
                        ))}
                        <Link
                          href="/layanan"
                          onClick={() => setIsMobileOpen(false)}
                          className="text-red-400 text-sm font-semibold mt-1 hover:text-red-300 transition-colors"
                        >
                          Semua Layanan →
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-white text-2xl font-light tracking-wide py-3 border-b border-white/10 hover:text-gray-400 transition-colors block"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="px-8 py-6 text-gray-500 text-xs tracking-wider">
            © CAM Cargo — PT. Cipta Astama Mandala
          </div>
        </div>
      )}
    </>
  );
}
