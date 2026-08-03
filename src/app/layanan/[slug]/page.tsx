import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SERVICES, COMPANY } from "@/lib/constants";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  CalendarCheck,
  PackageCheck,
  ShieldCheck,
  MapPin,
} from "lucide-react";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Layanan Tidak Ditemukan" };
  return {
    title: `${service.title} — CAM Cargo`,
    description: service.description,
  };
}

const PROCEDURES = [
  { title: "Konsultasi Kebutuhan", desc: "Hubungi kami via WhatsApp atau form kontak untuk diskusi" },
  { title: "Estimasi & Penawaran", desc: "Dapatkan rincian estimasi harga dan waktu yang transparan" },
  { title: "Penjemputan / Pickup", desc: "Tim kami akan menjemput barang di lokasi Anda tepat waktu" },
  { title: "Pengemasan Profesional", desc: "Barang dikemas secara aman sesuai standar perlindungan tinggi" },
  { title: "Pengiriman & Tracking", desc: "Proses pengiriman dengan fitur tracking perjalanan real-time" },
  { title: "Sampai di Tujuan", desc: "Barang sampai di lokasi tujuan dengan utuh dan tepat waktu" },
];

const ADVANTAGES = [
  { icon: PackageCheck, text: "Pengemasan profesional dan aman" },
  { icon: MapPin, text: "Tracking real-time 24/7" },
  { icon: ShieldCheck, text: "Asuransi pengiriman tersedia" },
  { icon: ArrowRight, text: "Penjemputan di lokasi (door pickup)" },
  { icon: ArrowLeft, text: "Pengantaran sampai tujuan (door delivery)" },
  { icon: CheckCircle2, text: "Harga transparan tanpa biaya tersembunyi" },
];

const FAQS = [
  {
    q: "Bagaimana cara mengetahui estimasi biaya?",
    a: "Anda bisa menggunakan fitur Cek Harga di website kami atau menghubungi kami langsung via WhatsApp untuk mendapatkan penawaran resmi yang disesuaikan dengan volume dan rute pengiriman.",
  },
  {
    q: "Apakah ada asuransi pengiriman?",
    a: "Ya, kami selalu menyediakan perlindungan asuransi pengiriman komprehensif untuk menjamin keamanan penuh barang berharga Anda selama proses pengiriman berlangsung.",
  },
  {
    q: "Berapa lama estimasi waktu pengiriman?",
    a: "Waktu pengiriman bervariasi bergantung pada rute dan moda transportasi yang dipilih. Secara umum: Pengiriman darat (5-7 hari), laut (7-14 hari), dan udara (1-3 hari).",
  },
];

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const otherServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F3F4F6]">

        {/* ── 1. Modern Dark Hero Section ─────────────────────────────── */}
        <section className="relative min-h-[100dvh] lg:min-h-[750px] overflow-hidden bg-[#111827] flex flex-col justify-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/cargo-shipping.png')",
                filter: "brightness(0.25)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/80 via-transparent to-[#111827]" />
          </div>

          {/* Aesthetic Blurs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-20 pointer-events-none" />

          <div className="relative z-10 px-6 lg:px-24 pt-32 pb-24 lg:pt-40 lg:pb-32 max-w-[1400px] mx-auto w-full">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
              <div className="lg:col-span-7 xl:col-span-8 block">
                {/* Breadcrumb */}
                <div className="inline-flex items-center gap-2 lg:gap-3 text-xs text-gray-400 font-medium tracking-[0.1em] uppercase mb-8">
                  <Link href="/" className="hover:text-white transition-colors">
                    Beranda
                  </Link>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <Link href="/layanan" className="hover:text-white transition-colors">
                    Layanan
                  </Link>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span className="text-white">{service.title}</span>
                </div>
                <br className="hidden lg:block" />

                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-semibold tracking-widest text-gray-200 uppercase">
                    {service.subtitle}
                  </span>
                </div>

                <h1 className="text-white font-extralight tracking-tight mb-4" style={{ fontSize: "clamp(2.75rem, 6vw, 5.5rem)", lineHeight: 1.05 }}>
                  {service.title}
                </h1>

                <p className="text-gray-300 text-base lg:text-xl font-light leading-relaxed max-w-2xl">
                  {service.description}
                </p>
              </div>

              {/* Quick Contact Card inside Hero */}
              <div className="lg:col-span-5 xl:col-span-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500 blur-xl" />

                  <h3 className="text-xl font-medium text-white mb-2">Tertarik dengan layanan ini?</h3>
                  <p className="text-sm text-gray-300 mb-8 font-light leading-relaxed">
                    Dapatkan penawaran harga spesial hari ini. Tim kami siap merespons Anda 24/7.
                  </p>

                  <div className="flex flex-col gap-4">
                    <a
                      href={`https://wa.me/${COMPANY.whatsapp}?text=Halo%20CAM%20Kargo%2C%20Saya%20tertarik%20dengan%20layanan%20${service.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-[#C81E1E] text-white py-4 px-6 rounded-full font-medium hover:bg-[#A01818] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <PhoneCall size={18} />
                      Konsultasi via WhatsApp
                    </a>
                    <Link
                      href="/cek-harga"
                      className="flex items-center justify-center gap-3 bg-transparent text-white border border-white/30 py-4 px-6 rounded-full font-medium hover:bg-white/10 transition-all duration-300"
                    >
                      Cek Estimasi Harga
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Main Content & Sidebar ────────────────────────── */}
        <section className="px-6 lg:px-24 py-16 lg:py-32 max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Main Content Area */}
            <div className="lg:col-span-8 flex flex-col gap-24">

              {/* Prosedur Pengiriman (Timeline Style) */}
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <span className="w-12 h-[2px] bg-red-600" />
                  <h2 className="text-2xl lg:text-3xl font-light text-[#111827]">
                    Prosedur <span className="font-semibold">Pengiriman</span>
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  {PROCEDURES.map((step, i) => (
                    <div key={i} className="bg-white border border-gray-100 p-6 lg:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                      <div className="text-red-100 font-bold text-5xl mb-4 group-hover:text-red-600 transition-colors duration-500">
                        0{i + 1}
                      </div>
                      <h4 className="text-lg font-medium text-[#111827] mb-2">{step.title}</h4>
                      <p className="text-sm font-light text-gray-500 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keunggulan (Icon Grid) */}
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <span className="w-12 h-[2px] bg-red-600" />
                  <h2 className="text-2xl lg:text-3xl font-light text-[#111827]">
                    Keunggulan <span className="font-semibold">Layanan</span>
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-y-8 gap-x-10">
                  {ADVANTAGES.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-600 transition-colors duration-300">
                          <Icon size={18} className="text-red-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <p className="text-base text-gray-700 font-light pt-2 leading-snug">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* FAQ (Modern Accordion Style Cards) */}
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <span className="w-12 h-[2px] bg-red-600" />
                  <h2 className="text-2xl lg:text-3xl font-light text-[#111827]">
                    Pertanyaan <span className="font-semibold">Sering Diajukan</span>
                  </h2>
                </div>

                <div className="flex flex-col gap-4">
                  {FAQS.map((faq, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm">
                      <h4 className="text-lg font-medium text-[#111827] mb-3">
                        {faq.q}
                      </h4>
                      <p className="text-base text-gray-500 leading-relaxed font-light">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar Sticky Area */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-32 flex flex-col gap-8">

                {/* Book Now Mini Card */}
                <div className="bg-[#111827] rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-600/20 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />

                  <CalendarCheck className="text-red-500 w-10 h-10 mb-6" />
                  <h3 className="text-xl font-light text-white mb-3">Siap melakukan pengiriman?</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                    Jadwalkan penjemputan barang Anda sekarang. Tim operasional kami siap memproses kiriman Anda dengan cepat.
                  </p>

                  <Link
                    href="/kontak"
                    className="flex items-center justify-between bg-white text-[#111827] py-4 px-6 rounded-full font-medium hover:bg-gray-100 transition-colors group"
                  >
                    <span>Formulir Booking</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Other Services Nav */}
                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                  <h3 className="text-lg font-medium text-[#111827] mb-6 pb-4 border-b border-gray-100">
                    Jelajahi Layanan Lain
                  </h3>
                  <div className="flex flex-col">
                    {otherServices.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/layanan/${s.slug}`}
                        className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 group"
                      >
                        <div>
                          <p className="text-base font-medium text-[#111827] group-hover:text-red-600 transition-colors mb-1">
                            {s.title}
                          </p>
                          <p className="text-xs text-gray-400 font-light tracking-wide">{s.subtitle}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-50 transition-all">
                          <ArrowRight size={14} className="text-gray-400 group-hover:text-red-600 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <Link
                      href="/layanan"
                      className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#111827] transition-colors"
                    >
                      <ArrowLeft size={16} />
                      Kembali ke Semua Layanan
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
