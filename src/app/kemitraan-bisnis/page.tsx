import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  TrendingUp,
  Award,
  Banknote,
  Network,
  ClipboardList,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kemitraan Bisnis — CAM Cargo",
  description:
    "Bergabunglah sebagai Freelancer Ekspedisi Partner CAM Cargo dan dapatkan komisi 4%–10% dari omset market yang Anda hasilkan.",
};

const STEPS = [
  {
    no: "01",
    title: "Daftar & Dapatkan Kode Unik",
    desc: "Freelancer mendaftar dan mendapatkan kode unik untuk mengakses platform promosi CAM Cargo.",
    icon: ClipboardList,
  },
  {
    no: "02",
    title: "Promosikan Layanan",
    desc: "Freelancer mempromosikan jasa ekspedisi CAM Cargo melalui jaringan pemasaran mereka.",
    icon: Network,
  },
  {
    no: "03",
    title: "Pelanggan Kirim via Link Anda",
    desc: "Calon pelanggan nantinya bisa melakukan pengiriman melalui link promosi freelancer.",
    icon: Users,
  },
  {
    no: "04",
    title: "Terima Komisi",
    desc: "Freelancer akan mendapatkan komisi berdasarkan omset market yang dihasilkan.",
    icon: Banknote,
  },
];

const BENEFITS = [
  {
    icon: Banknote,
    title: "Mendapatkan Komisi",
    desc: "Freelancer akan mendapatkan komisi yang kompetitif untuk setiap pengiriman yang dihasilkan.",
  },
  {
    icon: Network,
    title: "Memperluas Jaringan",
    desc: "Freelancer bisa memperluas jaringan pemasaran mereka serta meningkatkan kemampuan dalam memasarkan jasa ekspedisi.",
  },
];

const REQUIREMENTS = [
  "Freelancer harus memiliki jaringan pemasaran yang luas dan efektif",
  "Freelancer harus bisa memenuhi target pengiriman yang telah ditetapkan",
  "Freelancer harus mematuhi kebijakan dan prosedur perusahaan",
];

const COMMISSION_LEVELS = [
  {
    level: "Level 1",
    rate: "4%",
    range: "Rp 0 – Rp 50.000.000",
    color: "from-slate-700 to-slate-800",
    badge: "bg-slate-600",
  },
  {
    level: "Level 2",
    rate: "6%",
    range: "Rp 50.000.001 – Rp 100.000.000",
    color: "from-red-800 to-red-900",
    badge: "bg-red-700",
  },
  {
    level: "Level 3",
    rate: "8%",
    range: "Rp 100.000.001 – Rp 200.000.000",
    color: "from-red-700 to-red-800",
    badge: "bg-red-600",
  },
  {
    level: "Level 4",
    rate: "10%",
    range: "Di atas Rp 200.000.000",
    color: "from-[#C81E1E] to-[#9B1515]",
    badge: "bg-[#C81E1E]",
    highlight: true,
  },
];

const COMMISSION_NOTES = [
  "Keuntungan bagi freelancer 4% – 10% dari omset market yang dihasilkan",
  "Pembayaran komisi dilakukan secara bulanan",
  "Metode pembayaran melalui transfer bank maupun dompet digital",
];

export default function KemitraanBisnisPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F3F4F6]">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative bg-[#0F172A] overflow-hidden min-h-[70vh] flex flex-col justify-end">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/cargo-shipping.png')",
              filter: "brightness(0.12)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#C81E1E]/15 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />

          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Red glow */}
          <div className="absolute top-0 left-1/2 w-[600px] h-[400px] bg-red-700 rounded-full blur-[140px] opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 px-8 lg:px-20 pb-20 pt-48 max-w-[1400px] mx-auto w-full">
            {/* Breadcrumb */}
            <div className="inline-flex items-center gap-2 text-xs text-gray-400 font-medium tracking-[0.1em] uppercase mb-8">
              <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
              <ChevronRight size={12} className="text-gray-600" />
              <span className="text-white">Kemitraan Bisnis</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-semibold tracking-widest text-gray-200 uppercase">
                    Freelancer Ekspedisi Partner
                  </span>
                </div>

                <h1
                  className="text-white font-extralight tracking-tight mb-6"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05 }}
                >
                  Bermitra Bersama
                  <br />
                  <span className="font-semibold">CAM Cargo</span>
                </h1>

                <p className="text-gray-300 text-base lg:text-xl font-light leading-relaxed max-w-2xl">
                  Anda bisa bermitra bersama kami sebagai Freelancer Ekspedisi Partner dan dapatkan komisi kompetitif dari setiap pengiriman yang Anda hasilkan.
                </p>
              </div>

              <a
                href="https://wa.me/6281146602305?text=Halo%20CAM%20Kargo%2C%20Saya%20tertarik%20untuk%20bermitra%20sebagai%20Freelancer%20Ekspedisi%20Partner%2C%20mohon%20dibantu"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-3 bg-[#C81E1E] text-white py-4 px-8 rounded-full font-medium hover:bg-[#A01818] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
              >
                Daftar Sekarang
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Tujuan ─────────────────────────────────── */}
        <section className="bg-white border-b border-gray-100">
          <div className="px-8 lg:px-20 py-16 lg:py-20 max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-24">
              <div className="lg:w-1/3">
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-12 h-[2px] bg-red-600" />
                  <span className="text-xs font-semibold text-red-600 tracking-widest uppercase">Tujuan</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-light text-[#111827]">
                  Kenapa Ada <span className="font-semibold">Program Mitra?</span>
                </h2>
              </div>
              <div className="lg:w-2/3">
                <p className="text-gray-600 text-lg font-light leading-relaxed">
                  Adanya mitra ini bisa <strong className="text-[#111827] font-semibold">meningkatkan volume pengiriman</strong> serta{" "}
                  <strong className="text-[#111827] font-semibold">memperluas jaringan pemasaran</strong> CAM Cargo melalui freelancer yang berbakat dan berdedikasi.
                </p>
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-red-50 rounded-xl px-5 py-4">
                    <TrendingUp className="text-red-600 shrink-0" size={20} />
                    <span className="text-sm font-medium text-[#111827]">Tingkatkan volume pengiriman</span>
                  </div>
                  <div className="flex items-center gap-3 bg-red-50 rounded-xl px-5 py-4">
                    <Network className="text-red-600 shrink-0" size={20} />
                    <span className="text-sm font-medium text-[#111827]">Perluas jaringan pemasaran</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cara Bermitra (Steps) ──────────────────── */}
        <section className="px-8 lg:px-20 py-20 lg:py-28 max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-[2px] bg-red-600" />
              <span className="text-xs font-semibold text-red-600 tracking-widest uppercase">Cara Bermitra</span>
              <span className="w-12 h-[2px] bg-red-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#111827]">
              Cara Bermitra Bersama <span className="font-semibold">CAM Cargo</span>
            </h2>
            <p className="text-gray-500 font-light mt-4 max-w-xl mx-auto">
              Untuk mendaftar mitra di CAM Cargo cukup mudah, berikut beberapa caranya.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Connector arrow (desktop) */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                        <ChevronRight size={12} className="text-white" />
                      </div>
                    </div>
                  )}

                  <div className="text-red-100 font-bold text-5xl mb-5 group-hover:text-red-600 transition-colors duration-500 leading-none">
                    {step.no}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-5 group-hover:bg-red-600 transition-colors duration-300">
                    <Icon size={18} className="text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-base font-semibold text-[#111827] mb-2">{step.title}</h4>
                  <p className="text-sm font-light text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Keuntungan ────────────────────────────── */}
        <section className="bg-[#0F172A] py-20 lg:py-28">
          <div className="px-8 lg:px-20 max-w-[1400px] mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="w-12 h-[2px] bg-red-600" />
              <h2 className="text-2xl lg:text-3xl font-light text-white">
                Keuntungan <span className="font-semibold">Bermitra</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {BENEFITS.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 backdrop-blur-md hover:bg-white/10 transition-colors group">
                    <div className="w-14 h-14 rounded-2xl bg-red-600/20 flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300">
                      <Icon size={24} className="text-red-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{b.title}</h3>
                    <p className="text-gray-400 font-light leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Syarat & Ketentuan ────────────────────── */}
        <section className="px-8 lg:px-20 py-20 lg:py-28 max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[2px] bg-red-600" />
                <h2 className="text-2xl lg:text-3xl font-light text-[#111827]">
                  Syarat <span className="font-semibold">&amp; Ketentuan</span>
                </h2>
              </div>
              <p className="text-gray-500 font-light mb-8">
                Berikut ini beberapa syarat dan ketentuan bermitra bersama CAM Cargo.
              </p>
              <div className="flex flex-col gap-4">
                {REQUIREMENTS.map((req, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                    <CheckCircle2 className="text-red-600 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-gray-700 leading-relaxed">{req}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[2px] bg-red-600" />
                <h2 className="text-2xl lg:text-3xl font-light text-[#111827]">
                  Tentang <span className="font-semibold">Komisi</span>
                </h2>
              </div>
              <p className="text-gray-500 font-light mb-8">
                Kami selalu pastikan transparansi mengenai komisi freelancer yang bermitra bersama kami.
              </p>
              <div className="bg-[#111827] rounded-2xl p-6 lg:p-8">
                <div className="flex flex-col gap-4">
                  {COMMISSION_NOTES.map((note, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <BadgeCheck className="text-red-500 shrink-0 mt-0.5" size={18} />
                      <p className="text-gray-300 text-sm font-light leading-relaxed">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Struktur Komisi ───────────────────────── */}
        <section className="bg-[#F3F4F6] py-20 lg:py-28 border-t border-gray-200">
          <div className="px-8 lg:px-20 max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="w-12 h-[2px] bg-red-600" />
                <span className="text-xs font-semibold text-red-600 tracking-widest uppercase">Transparansi Komisi</span>
                <span className="w-12 h-[2px] bg-red-600" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-light text-[#111827]">
                Struktur <span className="font-semibold">Komisi</span>
              </h2>
              <p className="text-gray-500 font-light mt-4 max-w-xl mx-auto">
                Semakin tinggi omset yang Anda hasilkan, semakin besar persentase komisi yang Anda terima.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {COMMISSION_LEVELS.map((lvl, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl bg-gradient-to-br ${lvl.color} p-8 text-white overflow-hidden group hover:-translate-y-2 transition-transform duration-300 ${
                    lvl.highlight ? "ring-2 ring-red-500 ring-offset-2 ring-offset-[#F3F4F6]" : ""
                  }`}
                >
                  {lvl.highlight && (
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-bold tracking-widest bg-white text-red-700 px-2 py-1 rounded-full uppercase">
                        Tertinggi
                      </span>
                    </div>
                  )}
                  {/* Glow */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />

                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest ${lvl.badge} bg-opacity-60 mb-6`}>
                    {lvl.level}
                  </div>

                  <div className="text-5xl font-bold mb-2">{lvl.rate}</div>
                  <div className="text-sm text-white/70 font-light mb-4">komisi dari omset</div>
                  <div className="w-8 h-[1px] bg-white/30 mb-4" />
                  <div className="text-xs text-white/80 font-light leading-relaxed">{lvl.range}</div>
                </div>
              ))}
            </div>

            {/* Award badge */}
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm max-w-2xl mx-auto">
              <Award className="text-red-600 shrink-0" size={36} />
              <p className="text-center sm:text-left text-gray-700 font-light leading-relaxed">
                <strong className="text-[#111827] font-semibold">Tidak ada batas atas komisi.</strong>{" "}
                Semakin banyak Anda membawa pelanggan, semakin besar penghasilan Anda bersama CAM Cargo.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────── */}
        <section className="bg-[#C81E1E] py-20 lg:py-24">
          <div className="px-8 lg:px-20 max-w-[1400px] mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
              Siap Bergabung Bersama <span className="font-bold">CAM Cargo?</span>
            </h2>
            <p className="text-white/80 font-light text-lg mb-10 max-w-xl mx-auto">
              Daftarkan diri Anda sekarang dan mulai hasilkan komisi dari jaringan pemasaran Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6281146602305?text=Halo%20CAM%20Kargo%2C%20Saya%20tertarik%20untuk%20bermitra%20sebagai%20Freelancer%20Ekspedisi%20Partner%2C%20mohon%20dibantu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white text-[#C81E1E] py-4 px-8 rounded-full font-semibold hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Daftar via WhatsApp
                <ArrowRight size={18} />
              </a>
              <Link
                href="/kontak"
                className="flex items-center justify-center gap-3 bg-transparent text-white border-2 border-white/50 py-4 px-8 rounded-full font-medium hover:bg-white/10 transition-all duration-300"
              >
                Hubungi Tim Kami
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
