import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SERVICES } from "@/lib/constants";
import Link from "next/link";
import {
  Package,
  Bike,
  Car,
  Truck,
  Home,
  Plane,
  Building2,
  Container,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Layanan — CAM Cargo",
  description:
    "Layanan pengiriman lengkap via darat, laut, dan udara oleh CAM Cargo.",
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Package,
  Bike,
  Car,
  Truck,
  Home,
  Plane,
  Building2,
  Container,
};

const serviceColors = [
  { from: "#0F172A", accent: "#C81E1E" },
  { from: "#1E293B", accent: "#DC2626" },
  { from: "#111827", accent: "#B91C1C" },
  { from: "#1a1a2e", accent: "#C81E1E" },
  { from: "#0F172A", accent: "#EF4444" },
  { from: "#1E293B", accent: "#DC2626" },
  { from: "#111827", accent: "#C81E1E" },
  { from: "#1a1a2e", accent: "#B91C1C" },
];

export default function LayananPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F5F5F0]">

        {/* ── Hero Section ─────────────────────────── */}
        <section className="relative bg-[#0F172A] overflow-hidden" style={{ minHeight: "70vh" }}>
          {/* Background image */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/car-transport.png')",
                filter: "brightness(0.15)",
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C81E1E]/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
          </div>

          {/* Decorative grid lines */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "80px 80px"
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-end px-8 lg:px-20 pb-20 pt-48 max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-10 h-[1px] bg-[#C81E1E]" />
                  <span className="text-[#C81E1E] text-xs tracking-[0.3em] uppercase font-medium">
                    PT. Cipta Astama Mandala
                  </span>
                </div>
                <h1
                  className="text-white font-extralight leading-[0.9] tracking-[-0.04em]"
                  style={{ fontSize: "clamp(3.5rem, 9vw, 10rem)" }}
                >
                  Layanan<br />
                  <span className="text-white/30">Kami</span>
                </h1>
              </div>
              <p className="text-white/50 text-base lg:text-lg font-light leading-[1.9] max-w-sm lg:max-w-xs mb-2">
                Solusi logistik terlengkap untuk setiap kebutuhan pengiriman Anda — dari paket kecil hingga alat berat.
              </p>
            </div>

            {/* Service count bar */}
            <div className="mt-16 flex items-center gap-8 border-t border-white/10 pt-8">
              <div className="flex items-center gap-3">
                <span className="text-4xl lg:text-5xl text-white font-extralight">{SERVICES.length}</span>
                <span className="text-white/40 text-xs uppercase tracking-wider font-medium leading-tight">Jenis<br />Layanan</span>
              </div>
              <div className="w-[1px] h-12 bg-white/10" />
              <div className="flex items-center gap-3">
                <span className="text-4xl lg:text-5xl text-white font-extralight">24/7</span>
                <span className="text-white/40 text-xs uppercase tracking-wider font-medium leading-tight">Siap<br />Melayani</span>
              </div>
              <div className="w-[1px] h-12 bg-white/10" />
              <div className="flex items-center gap-3">
                <span className="text-4xl lg:text-5xl text-white font-extralight">100%</span>
                <span className="text-white/40 text-xs uppercase tracking-wider font-medium leading-tight">Legal<br />& Terdaftar</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Services Grid ─────────────────────────── */}
        <section className="px-6 lg:px-16 py-20 lg:py-32">
          <div className="max-w-[1400px] mx-auto">

            {/* Section header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-16">
              <h2 className="font-extralight text-[#111827] leading-[1] tracking-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                Semua Layanan
              </h2>
              <p className="text-gray-400 text-sm font-light lg:max-w-xs lg:text-right">
                Klik salah satu layanan untuk mengetahui detail informasi pengiriman.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {SERVICES.map((service, i) => {
                const IconComp = iconMap[service.icon] || Package;
                const colors = serviceColors[i % serviceColors.length];
                return (
                  <Link
                    key={service.slug}
                    href={`/layanan/${service.slug}`}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer"
                    style={{ background: colors.from, minHeight: "280px" }}
                  >
                    {/* Card top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: colors.accent }}
                    />

                    {/* Content */}
                    <div className="relative z-10 p-7 flex flex-col h-full" style={{ minHeight: "280px" }}>
                      {/* Top row: number + icon */}
                      <div className="flex items-start justify-between mb-auto">
                        <span className="text-white/20 font-extralight text-4xl tabular-nums leading-none">
                          0{i + 1}
                        </span>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                          style={{ background: `${colors.accent}22`, border: `1px solid ${colors.accent}44` }}
                        >
                          <IconComp size={18} className="text-white/60 group-hover:text-white transition-colors duration-300" />
                        </div>
                      </div>

                      {/* Bottom: title + subtitle + arrow */}
                      <div className="mt-10">
                        <p
                          className="text-[10px] uppercase tracking-[0.25em] font-medium mb-2 transition-colors duration-300"
                          style={{ color: `${colors.accent}cc` }}
                        >
                          {service.subtitle}
                        </p>
                        <h3 className="text-white font-light text-xl leading-tight mb-4 group-hover:text-white transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-white/40 text-xs font-light leading-relaxed mb-6 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-white/30 text-xs tracking-wider uppercase group-hover:text-white/70 transition-colors duration-300">
                            Lihat Detail
                          </span>
                          <ArrowUpRight
                            size={14}
                            className="text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Subtle hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(ellipse at top right, ${colors.accent}15, transparent 60%)` }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Process Strip ─────────────────────────── */}
        <section className="bg-white px-6 lg:px-16 py-20 lg:py-28 border-y border-gray-100">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
              <div className="lg:w-1/3">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-[1px] bg-[#C81E1E]" />
                  <span className="text-[#C81E1E] text-[10px] tracking-[0.3em] uppercase font-medium">Cara Kerja</span>
                </div>
                <h2 className="font-extralight text-[#111827] leading-tight" style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}>
                  Proses Simpel,<br />Hasil Maksimal
                </h2>
              </div>
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
                {[
                  { step: "01", title: "Konsultasi", desc: "Hubungi kami dan ceritakan kebutuhan pengiriman Anda." },
                  { step: "02", title: "Penawaran", desc: "Kami berikan penawaran harga terbaik dan jadwal pengiriman." },
                  { step: "03", title: "Pengiriman", desc: "Barang dikirim dengan aman, real-time tracking tersedia." },
                ].map((p) => (
                  <div key={p.step} className="flex flex-col gap-4">
                    <span className="text-[#C81E1E] font-extralight text-4xl">{p.step}</span>
                    <div>
                      <h3 className="font-medium text-[#111827] text-lg mb-1">{p.title}</h3>
                      <p className="text-gray-500 text-sm font-light leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────── */}
        <section className="bg-[#C81E1E] mx-6 lg:mx-16 my-20 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }}
          />
          <div className="relative z-10 px-8 lg:px-20 py-20 lg:py-28 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div>
              <h2
                className="text-white font-extralight leading-[0.95] tracking-[-0.03em] mb-4"
                style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}
              >
                Butuh Solusi<br />
                <span className="text-white/60">Khusus?</span>
              </h2>
              <p className="text-white/70 text-base font-light leading-[1.9] max-w-md mt-4">
                Tim kami siap membantu konsultasi gratis dan memberikan penawaran terbaik sesuai kebutuhan Anda.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/kontak"
                className="inline-flex items-center gap-6 py-4 pl-8 pr-4 rounded-full bg-white group hover:bg-white/90 transition-all duration-300 shadow-2xl"
              >
                <span className="flex flex-col text-[#C81E1E]">
                  <span className="font-bold text-lg leading-tight">Hubungi Kami</span>
                  <span className="font-normal text-sm text-[#C81E1E]/70">(Contact Us)</span>
                </span>
                <span className="w-12 h-12 rounded-full bg-[#C81E1E] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight size={18} />
                </span>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
