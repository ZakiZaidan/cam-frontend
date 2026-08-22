import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import ServicesSection from "@/components/sections/ServicesSection";
import CompanyInfoSection from "@/components/sections/CompanyInfoSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "CAM Cargo — Jasa Pengiriman Barang, Motor, Mobil & Alat Berat Balikpapan",
  description:
    "CAM Cargo, ekspedisi terpercaya di Balikpapan Kalimantan Timur. Kirim barang, motor, mobil, alat berat, pindahan, via udara ke seluruh Indonesia. Asuransi, door-to-door, tracking real-time.",
  alternates: { canonical: "https://camlogexpress.com" },
  openGraph: {
    title: "CAM Cargo — Ekspedisi Terpercaya Balikpapan",
    description: "Jasa pengiriman barang, motor, mobil, alat berat dan pindahan dari Balikpapan ke seluruh Indonesia.",
    url: "https://camlogexpress.com",
    images: [{ url: "/images/cargo-shipping.png", width: 1200, height: 630 }],
  },
};


export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero — Fullscreen cinematic */}
        <HeroSection />
        {/* 2. Corporate Philosophy — Light, 2-column */}
        <PhilosophySection />
        {/* 3. Our Business — Dark, numbered items */}
        <ServicesSection />
        {/* 4. Company Information — Light, row hover list */}
        <CompanyInfoSection />
        {/* 5. Our Values — Dark, 4-grid */}
        <FeaturesSection />
        {/* 6. Recent News — Light, hover rows */}
        <TestimonialsSection />
        {/* 7. Get In Touch — Dark CTA */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
