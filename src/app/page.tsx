import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import ServicesSection from "@/components/sections/ServicesSection";
import CompanyInfoSection from "@/components/sections/CompanyInfoSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

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
