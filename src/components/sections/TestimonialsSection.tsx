"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const generateLogo = (name: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="250" height="100" viewBox="0 0 250 100">
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="16" fill="#1e293b">${name}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const PARTNERS = [
  { name: "Partner 1", logo: "/scraped-images/1-4-1-1024x768.webp" },
  { name: "Partner 2", logo: "/scraped-images/2-4-1-1024x768.webp" },
  { name: "Partner 3", logo: "/scraped-images/3-4-1-1024x768.webp" },
  { name: "Partner 4", logo: "/scraped-images/4-4-1-1024x768.webp" },
  { name: "Partner 5", logo: "/scraped-images/5-4-1-1024x768.webp" },
  { name: "Partner 6", logo: "/scraped-images/6-1-1024x768.webp" },
  { name: "Partner 7", logo: "/scraped-images/7-1-1024x768.webp" },
  { name: "Partner 8", logo: "/scraped-images/8-1-1024x768.webp" },
  { name: "Partner 9", logo: "/scraped-images/9-1-1024x768.webp" },
  { name: "Partner 10", logo: "/scraped-images/10-1-1024x768.webp" },
  { name: "Partner 11", logo: "/scraped-images/11-1-1024x768.webp" },
  { name: "Partner 12", logo: "/scraped-images/12-1-1024x768.webp" },
  { name: "Partner 13", logo: "/scraped-images/13-1-1024x768.webp" },
  { name: "Partner 14", logo: "/scraped-images/14-1-1024x768.webp" },
  { name: "Partner 15", logo: "/scraped-images/15-1-1024x768.webp" },
  { name: "Partner 16", logo: "/scraped-images/16-1-1024x768.webp" },
  { name: "Partner 17", logo: "/scraped-images/17-1-1024x768.webp" },
  { name: "Partner 18", logo: "/scraped-images/18-1-1024x768.webp" },
  { name: "Partner 19", logo: "/scraped-images/ce4d135d-brand-logo-1.png" },
  { name: "Partner 20", logo: "/scraped-images/248a1db6-brand-logo-2.png" },
  { name: "Partner 21", logo: "/scraped-images/a9b3532c-brand-logo-3.png" },
  { name: "Partner 22", logo: "/scraped-images/e120f962-brand-logo-4.png" },
  { name: "Partner 23", logo: "/scraped-images/9ab76f54-brand-logo-5.png" },
  { name: "Partner 24", logo: "/scraped-images/aa044667-image16.png" },
  { name: "Partner 25", logo: "/scraped-images/3a71b3a9-image18.png" },
  // { name: "EDELWEIS LOGISTIC", logo: generateLogo("EDELWEIS LOGISTIC") },
  // { name: "ALTON LOGISTIK INDONESIA", logo: generateLogo("ALTON LOGISTIK") },
  // { name: "ANDALAN DOMESTIK CARGO", logo: generateLogo("ANDALAN DOMESTIK") },
  // { name: "WUERTH INDONESIA GREEN", logo: generateLogo("WUERTH INDONESIA") },
  // { name: "ENERGI UTAMA", logo: generateLogo("ENERGI UTAMA") },
  // { name: "PT. MULTI NITROTAMA KIMIA", logo: generateLogo("MULTI NITROTAMA") },
  // { name: "DMX", logo: generateLogo("DMX") },
  // { name: "ALIH JAYA TRANS", logo: generateLogo("ALIH JAYA TRANS") },
  // { name: "AJI MANDIRI EXSPRESS", logo: generateLogo("AJI MANDIRI") },
  // { name: "PT INDRATAMA LOGISTICS", logo: generateLogo("INDRATAMA LOGISTICS") },
  // { name: "PT TRIMITRA SINERGI NUSA", logo: generateLogo("TRIMITRA SINERGI") },
  // { name: "PT RIANINDA UTAMA EKSPRESS", logo: generateLogo("RIANINDA UTAMA") },
  // { name: "ASIA TEKNIK", logo: generateLogo("ASIA TEKNIK") },
  // { name: "M2M LOGISTIC", logo: generateLogo("M2M LOGISTIC") },
  // { name: "PONDOK CABE GOLF", logo: generateLogo("PONDOK CABE GOLF") },
  // { name: "JAYA SAMUDRA CARGO", logo: generateLogo("JAYA SAMUDRA") },
  // { name: "PT. HAS ENVIRONMENTAL", logo: generateLogo("HAS ENVIRONMENTAL") },
  // { name: "ALP LOGISTIK", logo: generateLogo("ALP LOGISTIK") },
  // { name: "ANGKASA PURA", logo: generateLogo("ANGKASA PURA") },
  // { name: "PT. SANTOS JAYA MAKMUR", logo: generateLogo("SANTOS JAYA MAKMUR") },
];

export default function PartnersSection() {
  // Duplicate the list enough times to ensure a seamless infinite scroll
  const scrollItems = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="bg-white overflow-hidden">
      <div className="px-12 md:px-20 lg:px-32 xl:px-44 py-24 lg:py-32 max-w-[1500px] mx-auto">
        {/* Section Header */}
        <div className="mb-8 lg:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <h2 className="nics-title">
              Our
              <br />
              Partners
            </h2>
            <div className="mt-6 flex items-center gap-2">
              <span className="nics-dash" />
              <span className="text-xs tracking-[0.2em] text-gray-500 uppercase">
                Mitra Kami
              </span>
            </div>
          </div>

          <Link href="/kontak" className="nics-pill group hidden lg:inline-flex">
            <span className="nics-pill__text">
              <span className="nics-pill__label">Join Us</span>
              <span className="nics-pill__sublabel">(Menjadi Mitra)</span>
            </span>
            <span className="nics-pill__badge">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full border-y border-gray-100 py-12 lg:py-20 bg-[#FBFBFB]">
        {/* We use inline style for animation to guarantee it works with our custom @keyframes marquee-right */}
        <div
          className="flex w-max"
          style={{ animation: "marquee-right 200s linear infinite" }}
        >
          {scrollItems.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center px-10 lg:px-20 mx-4 transition-transform duration-500 hover:scale-105 cursor-pointer"
            >
              <div className="relative w-48 h-24 lg:w-64 lg:h-32">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="px-12 md:px-20 py-16 lg:hidden flex justify-center">
        <Link href="/kontak" className="nics-pill group">
          <span className="nics-pill__text">
            <span className="nics-pill__label">Join Us</span>
            <span className="nics-pill__sublabel">(Menjadi Mitra)</span>
          </span>
          <span className="nics-pill__badge">
            <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </section>
  );
}
