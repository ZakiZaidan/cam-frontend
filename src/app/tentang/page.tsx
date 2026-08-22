import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COMPANY } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import {
  Target,
  Eye,
  Award,
  Users,
  TrendingUp,
  MapPin,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami — Profil CAM Cargo Balikpapan",
  description:
    "Mengenal lebih dekat CAM Cargo (PT. Cipta Astama Mandala), perusahaan ekspedisi dan logistik berpusat di Balikpapan, Kalimantan Timur. Visi, misi, dan komitmen kami untuk pengiriman terbaik.",
  alternates: { canonical: "https://camlogexpress.com/tentang" },
  openGraph: {
    title: "Tentang CAM Cargo — Ekspedisi Terpercaya Balikpapan",
    description: "Profil lengkap PT. Cipta Astama Mandala (CAM Cargo), ekspedisi logistik Balikpapan yang melayani pengiriman ke seluruh Indonesia.",
    url: "https://camlogexpress.com/tentang",
  },
};


export default function TentangPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Banner — dark, Nissan NICS style */}
        <section className="relative bg-[#3D4550] overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/cargo-shipping.png')",
                filter: "brightness(0.25)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3D4550] via-[#3D4550]/60 to-transparent" />
          </div>
          <div className="relative z-10 px-8 lg:px-24 pb-20 pt-40 w-full max-w-[1400px] mx-auto">
            <h1 className="text-white leading-[0.95] tracking-[-0.03em]">
              <span
                className="block font-extralight"
                style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
              >
                About
              </span>
              <span
                className="block font-extralight"
                style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
              >
                Us
              </span>
            </h1>
            <div className="mt-6 flex items-center gap-2">
              <span className="nics-dash" />
              <span className="text-xs tracking-[0.2em] text-white/60 uppercase">
                Tentang Perusahaan
              </span>
            </div>
          </div>
        </section>

        {/* Company Description — light section */}
        <section className="bg-white px-8 lg:px-24 py-24 lg:py-36 max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left — company name */}
            <div>
              <div className="mb-6 lg:mb-8">
                <Image
                  src="/logo/camLogo.png"
                  alt="CAM Cargo Logo"
                  width={140}
                  height={140}
                  className="rounded-2xl shadow-sm border border-gray-100"
                />
              </div>
              <h2 className="text-3xl lg:text-[2.5rem] font-light text-[#111827] tracking-tight leading-[1.2]">
                {COMPANY.legalName.split(" ").slice(0, 2).join(" ")}
                <br />
                {COMPANY.legalName.split(" ").slice(2).join(" ")}
              </h2>
              <div className="mt-6 flex items-center gap-2">
                <span className="nics-dash" />
                <span className="text-xs tracking-[0.2em] text-gray-500 uppercase">
                  Profil Perusahaan
                </span>
              </div>
              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-6">
                {[
                  { value: "500+", label: "Klien Aktif", icon: Users },
                  { value: "5000+", label: "Pengiriman", icon: TrendingUp },
                  { value: "150+", label: "Kota", icon: MapPin },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p
                      className="font-extralight text-[#111827] mb-1"
                      style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 tracking-wider uppercase font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — description */}
            <div className="pt-4">
              <p className="text-gray-600 text-base lg:text-lg leading-[2] font-light">
                {COMPANY.description}
              </p>
              <p className="text-gray-600 text-base lg:text-lg leading-[2] font-light mt-6">
                Cam Cargo didirikan pada tahun 2023, memiliki tekad untuk berperan
                aktif melaksanakan layanan pengiriman dengan berlandaskan
                kepercayaan dan kemampuan diri secara profesional & tanggung
                jawab. Cam Cargo terkenal sangat fleksibel untuk melakukan
                distribusi barang antar pulau di seluruh Indonesia, termasuk daerah
                terpencil.
              </p>
              {/* <div className="mt-8 flex items-center gap-2">
                <span className="text-xs tracking-wider text-gray-400 uppercase">Didirikan</span>
                <span className="font-extralight text-3xl text-[#111827]">{COMPANY.founded}</span>
              </div> */}
            </div>
          </div>
        </section>

        {/* Photos Gallery Row */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="grid grid-cols-3 gap-4 lg:gap-6">
            {[
              { src: "/images/cargo-shipping.png", alt: "Operasional Port" },
              { src: "/images/car-transport.png", alt: "Transport Kendaraan" },
              { src: "/images/cargo-shipping.png", alt: "Logistik Container" },
            ].map((img, i) => (
              <div
                key={i}
                className={`nics-img-zoom rounded-2xl overflow-hidden aspect-[4/3] ${i === 1 ? "mt-8 lg:mt-12" : ""
                  }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Visi & Misi */}
        <section className="relative mx-4 lg:mx-16 mb-24 rounded-[3rem] overflow-hidden bg-[#C81E1E] shadow-2xl">
          <div className="relative z-10 px-6 lg:px-20 py-16 lg:py-20">
            <h2
              className="text-center text-white font-extralight leading-[0.95] tracking-[-0.03em] mb-6"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              Vision &<br />Mission
            </h2>
            <div className="flex justify-center items-center gap-3 mb-12 lg:mb-16">
              <span className="w-8 lg:w-12 h-[2px] bg-white" />
              <span className="text-xs tracking-[0.2em] text-white/80 uppercase text-center font-medium">
                Tujuan Kami
              </span>
              <span className="w-8 lg:w-12 h-[2px] bg-white" />
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Visi */}
              <div className="bg-white/10 border border-white/20 rounded-3xl p-8 lg:p-12 backdrop-blur-md hover:bg-white/15 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                    <Eye size={24} className="text-white" />
                  </div>
                  <h3 className="text-white text-xl lg:text-2xl font-light tracking-widest uppercase">
                    Visi
                  </h3>
                </div>
                <p className="text-white text-xl lg:text-2xl leading-[1.7] font-light">
                  {COMPANY.visi}
                </p>
              </div>
              
              {/* Misi */}
              <div className="bg-white/10 border border-white/20 rounded-3xl p-8 lg:p-12 backdrop-blur-md hover:bg-white/15 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                    <Target size={24} className="text-white" />
                  </div>
                  <h3 className="text-white text-xl lg:text-2xl font-light tracking-widest uppercase">
                    Misi
                  </h3>
                </div>
                <div className="flex flex-col gap-8">
                  {COMPANY.misi.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 lg:gap-5 group">
                      <span className="text-white font-bold text-2xl lg:text-3xl leading-none mt-1 shrink-0 group-hover:scale-110 transition-transform">
                        0{i + 1}.
                      </span>
                      <p className="text-white/95 text-lg lg:text-xl leading-relaxed font-light">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values — light section */}
        <section className="bg-white px-6 lg:px-16 py-28 lg:py-40">
          <h2 className="nics-title mb-6">
            Why Choose
            <br />
            CAM Cargo
          </h2>
          <div className="flex items-center gap-2 mb-16">
            <span className="nics-dash" />
            <span className="text-xs tracking-[0.2em] text-gray-500 uppercase">
              Mengapa Memilih Kami
            </span>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            {[
              { icon: Award, title: "Profesional", desc: "Tim berpengalaman di bidang logistik dan pengiriman barang." },
              { icon: Users, title: "Terpercaya", desc: "Dipercaya ratusan klien untuk kebutuhan pengiriman mereka." },
              { icon: TrendingUp, title: "Berkembang", desc: "Terus berinovasi dan memperluas jangkauan layanan." },
            ].map((value) => {
              const IconComp = value.icon;
              return (
                <div key={value.title}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                      <IconComp size={18} className="text-gray-500" />
                    </div>
                    <h3 className="text-xl font-light text-[#111827]">{value.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">{value.desc}</p>
                </div>
              );
            })}
          </div>

          {/* CTA pill */}
          <div className="mt-20 flex justify-end">
            <Link href="/kontak" className="nics-pill group">
              <span className="nics-pill__text">
                <span className="nics-pill__label">Contact Us</span>
                <span className="nics-pill__sublabel">(Hubungi Kami)</span>
              </span>
              <span className="nics-pill__badge">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
