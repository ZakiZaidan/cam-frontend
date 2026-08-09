import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Warehouse,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fasilitas — CAM Cargo | PT. Cipta Astama Mandala",
  description:
    "Fasilitas unggulan CAM Cargo: legalitas usaha, warehouse & armada berkualitas, dan call center 24/7 untuk solusi logistik terpercaya.",
};

const FACILITIES = [
  {
    number: "01.",
    icon: FileText,
    title: "Legalitas Usaha",
    description:
      "Legalitas usaha logistik adalah syarat mutlak yang harus dipenuhi oleh setiap pelaku usaha yang bergerak di bidang pengiriman barang dan jasa. CAM Cargo telah memenuhi seluruh persyaratan legalitas yang berlaku, sehingga setiap transaksi pengiriman Anda terjamin secara hukum dan profesional.",
    image: "/images/cargo-shipping.png",
  },
  {
    number: "02.",
    icon: Warehouse,
    title: "Warehouse & Armada",
    description:
      "Sebagai perusahaan logistik yang berpengalaman dan profesional, kami memiliki fasilitas warehouse dan armada yang berkualitas dan handal. Kami menyadari bahwa warehouse dan armada adalah aset penting yang menentukan keberhasilan layanan kami kepada pelanggan.",
    image: "/images/car-transport.png",
  },
  {
    number: "03.",
    icon: PhoneCall,
    title: "Call Center",
    description:
      "Kami berkomitmen untuk memberikan kepuasan kepada pelanggan dengan memberikan solusi logistik yang tepat, cepat, dan aman. Call center kami adalah salah satu cara kami untuk menjalin hubungan yang baik dengan pelanggan dan mitra bisnis kami.",
    image: "/images/cargo-shipping.png",
  },
];

export default function FasilitasPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* ── Hero Banner ─────────────────────────────────────── */}
        <section className="relative bg-[#3D4550] overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/car-transport.png')",
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
                Fasilitas
              </span>
              <span
                className="block font-extralight"
                style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
              >
                Kami
              </span>
            </h1>
            <div className="mt-6 flex items-center gap-2">
              <span className="nics-dash" />
              <span className="text-xs tracking-[0.2em] text-white/60 uppercase">
                PT. Cipta Astama Mandala
              </span>
            </div>
          </div>
        </section>

        {/* ── Intro Section ───────────────────────────────────── */}
        <section className="bg-white px-8 lg:px-24 py-24 lg:py-36 max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left */}
            <div>
              <h2 className="nics-title">
                Fasilitas
                <br />
                Andal & Terpercaya
              </h2>
              <div className="mt-6 flex items-center gap-2">
                <span className="nics-dash" />
                <span className="text-xs tracking-[0.2em] text-gray-500 uppercase">
                  Fasilitas Perusahaan
                </span>
              </div>
            </div>

            {/* Right */}
            <div className="pt-4">
              <p className="text-black text-base lg:text-lg leading-[2] font-light">
                Kami berkomitmen untuk memberikan fasilitas yang andal dan
                terpercaya kepada pelanggan kami. Kami selalu berusaha untuk
                memberikan yang terbaik dan menjaga kepercayaan pelanggan kami.
              </p>
              <p className="text-black text-base lg:text-lg leading-[2] font-light mt-6">
                Dengan fasilitas yang kami miliki, kami dapat memberikan solusi
                logistik yang sesuai dengan kebutuhan dan harapan pelanggan
                kami. Kami juga terus berinovasi dan meningkatkan kualitas
                fasilitas kami agar dapat memberikan pelayanan yang lebih baik
                dan efisien.
              </p>

              {/* Quick stats */}
              <div className="mt-16 flex flex-wrap justify-center lg:justify-start items-center gap-12 lg:gap-20">
                {[
                  { value: "3+", label: "Fasilitas Utama" },
                  { value: "100%", label: "Legal & Terdaftar" },
                  { value: "24/7", label: "Call Center" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center justify-center text-center">
                    <p
                      className="font-extralight text-[#111827] mb-1"
                      style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-black tracking-wider uppercase font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Facility Bento Box Cards ────────────────────────── */}
        <section className="bg-[#F8F8F8] py-24 lg:py-40 overflow-hidden">
          {/* Align exactly with the 'Mitra Logistik Terpercaya' box below it */}
          <div className="mx-6 lg:mx-16">
            {/* Bento Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

              {/* Item 1: Large Left Card (Spans 1 column out of 2) */}
              <div className="lg:col-span-1 h-[450px] lg:h-[700px]">
                {(() => {
                  const item = FACILITIES[0];
                  const IconComp = item.icon;
                  return (
                    <div className="group relative w-full h-full rounded-[2rem] overflow-hidden bg-[#111827] cursor-pointer">
                      {/* Background Image */}
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-30 transition-all duration-[800ms] ease-out"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

                      {/* Icon & Number (Top) */}
                      <div className="absolute top-8 left-8 right-8 lg:top-12 lg:left-12 lg:right-12 flex items-start justify-between z-10">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0">
                          <IconComp className="text-white w-5 h-5 lg:w-7 lg:h-7" />
                        </div>
                        <span className="text-white/40 font-extralight text-5xl lg:text-7xl leading-none">
                          {item.number}
                        </span>
                      </div>

                      {/* Content (Center) */}
                      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 lg:p-12 z-10">
                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-[800ms] ease-out">
                          <h3 className="text-white font-light text-3xl lg:text-5xl leading-[1.1] tracking-tight mb-4">
                            {item.title}
                          </h3>
                          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-[800ms] ease-out">
                            <div className="overflow-hidden">
                              <p className="text-white/70 text-sm lg:text-lg leading-relaxed font-light pt-2 pb-2">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Right Column for Item 2 & 3 */}
              <div className="flex flex-col gap-6 lg:gap-8 lg:col-span-1 lg:h-[700px]">

                {/* Item 2: Top Right Card */}
                <div className="h-[350px] lg:flex-1 lg:h-auto">
                  {(() => {
                    const item = FACILITIES[1];
                    const IconComp = item.icon;
                    return (
                      <div className="group relative w-full h-full rounded-[2rem] overflow-hidden bg-[#111827] cursor-pointer">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-30 transition-all duration-[800ms] ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

                        <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-10">
                          <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0">
                            <IconComp className="text-white w-4 h-4" />
                          </div>
                          <span className="text-white/40 font-extralight text-4xl leading-none">
                            {item.number}
                          </span>
                        </div>

                        {/* Content (Center) */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 lg:p-8 z-10">
                          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-[800ms] ease-out">
                            <h3 className="text-white font-light text-2xl lg:text-3xl leading-[1.1] tracking-tight mb-3">
                              {item.title}
                            </h3>
                            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-[800ms] ease-out">
                              <div className="overflow-hidden">
                                <p className="text-white/70 text-xs lg:text-sm leading-relaxed font-light pt-2 pb-1">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Item 3: Bottom Right Card */}
                <div className="h-[350px] lg:flex-1 lg:h-auto">
                  {(() => {
                    const item = FACILITIES[2];
                    const IconComp = item.icon;
                    return (
                      <div className="group relative w-full h-full rounded-[2rem] overflow-hidden bg-[#111827] cursor-pointer">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-30 transition-all duration-[800ms] ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

                        <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-10">
                          <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0">
                            <IconComp className="text-white w-4 h-4" />
                          </div>
                          <span className="text-white/40 font-extralight text-4xl leading-none">
                            {item.number}
                          </span>
                        </div>

                        {/* Content (Center) */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 lg:p-8 z-10">
                          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-[800ms] ease-out">
                            <h3 className="text-white font-light text-2xl lg:text-3xl leading-[1.1] tracking-tight mb-3">
                              {item.title}
                            </h3>
                            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-[800ms] ease-out">
                              <div className="overflow-hidden">
                                <p className="text-white/70 text-xs lg:text-sm leading-relaxed font-light pt-2 pb-1">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Dokumen Legalitas (KBLI) ────────────────────────── */}
        <section className="bg-white py-24 lg:py-32 px-6 lg:px-16 overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
              <h2 className="text-[#111827] font-light text-3xl lg:text-5xl mb-4">
                Dokumen <span className="font-semibold">Legalitas Usaha</span>
              </h2>
              <div className="w-20 h-1 bg-red-600 mb-6" />
              <p className="text-gray-500 max-w-2xl text-lg font-light">
                Sebagai perusahaan logistik yang profesional, CAM Cargo telah terdaftar secara resmi dan memiliki KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) untuk menjalankan operasional logistik dengan aman dan terpercaya.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {/* Dokumen 1 */}
              <div className="bg-gray-50 p-4 lg:p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-500">
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-white">
                  <Image
                    src="/images/nib-cam.png"
                    alt="Dokumen KBLI CAM Cargo 1"
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
              {/* Dokumen 2 */}
              <div className="bg-gray-50 p-4 lg:p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-500">
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-white">
                  <Image
                    src="/images/kbli-cam.png"
                    alt="Dokumen KBLI CAM Cargo 2"
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
              {/* Dokumen 3 */}
              <div className="bg-gray-50 p-4 lg:p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-500">
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-white">
                  <Image
                    src="/images/kbli-cam2.png"
                    alt="Dokumen NIB CAM Cargo"
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Commitment Red Section ─────────────────────────── */}
        <section className="bg-[#C81E1E] rounded-[3rem] relative overflow-hidden mx-6 lg:mx-16 mb-20">
          <div className="relative z-10 px-8 lg:px-20 py-28 lg:py-40">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-[1400px] mx-auto">
              <div>
                <h2
                  className="text-white font-extralight leading-[0.95] tracking-[-0.03em] mb-6"
                  style={{ fontSize: "clamp(3.5rem, 7vw, 8.5rem)" }}
                >
                  Mitra Logistik
                  <br />
                  Terpercaya
                </h2>
                <div className="flex items-center gap-2 mb-10">
                  <span className="nics-dash bg-white" />
                  <span className="text-xs tracking-[0.2em] text-white/50 uppercase">
                    Komitmen Kami
                  </span>
                </div>
                <Link
                  href="/kontak"
                  className="nics-pill group !bg-white !border-black shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="nics-pill__text !text-[#C81E1E]">
                    <span className="nics-pill__label font-bold">Hubungi Kami</span>
                    <span className="nics-pill__sublabel font-medium">(Contact Us)</span>
                  </span>
                  <span className="nics-pill__badge !bg-[#C81E1E]">
                    <ArrowRight size={16} className="text-white" />
                  </span>
                </Link>
              </div>
              <div className="flex flex-col gap-8">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Fasilitas Berstandar Tinggi",
                    desc: "Seluruh fasilitas kami memenuhi standar kualitas dan keamanan tertinggi untuk menjamin kepuasan pelanggan.",
                  },
                  {
                    icon: PhoneCall,
                    title: "Dukungan Penuh 24/7",
                    desc: "Tim kami siap membantu Anda kapan saja dan di mana saja, memastikan setiap kebutuhan logistik terpenuhi.",
                  },
                  {
                    icon: FileText,
                    title: "Legalitas Terjamin",
                    desc: "Beroperasi dengan izin resmi dan memenuhi seluruh regulasi yang berlaku, memberikan rasa aman bagi setiap pelanggan.",
                  },
                ].map((point) => {
                  const PointIcon = point.icon;
                  return (
                    <div key={point.title} className="flex items-start gap-5 lg:gap-6">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-white/30 flex items-center justify-center shrink-0 mt-1">
                        <PointIcon className="text-white/80 w-5 h-5 lg:w-6 lg:h-6" />
                      </div>
                      <div>
                        <h3 className="text-white text-lg lg:text-2xl font-medium mb-2 lg:mb-3">
                          {point.title}
                        </h3>
                        <p className="text-white/80 text-base lg:text-lg leading-relaxed font-light">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
