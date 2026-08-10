import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SERVICES, COMPANY } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import GallerySlider from "@/components/GallerySlider";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  CalendarCheck,
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

  const otherServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 4);

  // Cast to access new fields gracefully
  const svc = service as typeof service & {
    heroImage?: string;
    gallery?: string[];
    features?: { title: string; desc: string }[];
    extraContent?: string;
    waText?: string;
  };

  const gallery = svc.gallery ?? [];
  const features = svc.features ?? [];
  const heroImage = svc.heroImage ?? "/images/cargo-shipping.png";
  const waText = svc.waText ?? encodeURIComponent(service.title);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F3F4F6]">

        {/* ── 1. Hero Section ─────────────────────────────── */}
        <section className="relative min-h-[100dvh] lg:min-h-[750px] overflow-hidden bg-[#111827] flex flex-col justify-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${heroImage}')`,
                filter: "brightness(0.25)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/80 via-transparent to-[#111827]" />
          </div>

          {/* Red glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-20 pointer-events-none" />

          <div className="relative z-10 px-6 lg:px-24 pt-32 pb-24 lg:pt-40 lg:pb-32 max-w-[1400px] mx-auto w-full">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
              <div className="lg:col-span-7 xl:col-span-8 block">
                {/* Breadcrumb */}
                <div className="inline-flex items-center gap-2 lg:gap-3 text-xs text-gray-400 font-medium tracking-[0.1em] uppercase mb-8">
                  <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <Link href="/layanan" className="hover:text-white transition-colors">Layanan</Link>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span className="text-white">{service.title}</span>
                </div>

                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-semibold tracking-widest text-gray-200 uppercase">
                    {service.subtitle}
                  </span>
                </div>

                <h1
                  className="text-white font-extralight tracking-tight mb-4"
                  style={{ fontSize: "clamp(2.75rem, 6vw, 5.5rem)", lineHeight: 1.05 }}
                >
                  {service.title}
                </h1>

                <p className="text-gray-300 text-base lg:text-xl font-light leading-relaxed max-w-2xl">
                  {service.description}
                </p>
              </div>

              {/* Quick Contact Card */}
              <div className="lg:col-span-5 xl:col-span-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500 blur-xl" />
                  <h3 className="text-xl font-medium text-white mb-2">Tertarik dengan layanan ini?</h3>
                  <p className="text-sm text-gray-300 mb-8 font-light leading-relaxed">
                    Dapatkan penawaran harga spesial hari ini. Tim kami siap merespons Anda 24/7.
                  </p>
                  <div className="flex flex-col gap-4">
                    <a
                      href={`https://wa.me/${COMPANY.whatsapp}?text=Halo%20CAM%20Kargo%2C%20Saya%20tertarik%20menggunakan%20jasa%20${waText}%2C%20mohon%20dibantu`}
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

        {/* ── 2. Features from real scraped data ────────── */}
        {features.length > 0 && (
          <section className="px-6 lg:px-24 py-16 lg:py-24 max-w-[1400px] mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-12 h-[2px] bg-red-600" />
              <h2 className="text-2xl lg:text-3xl font-light text-[#111827]">
                Mengapa <span className="font-semibold">Pilih Kami?</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 p-6 lg:p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-5 group-hover:bg-red-600 transition-colors duration-300">
                    <CheckCircle2 size={18} className="text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#111827] mb-2">{f.title}</h4>
                  <p className="text-sm font-light text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            {svc.extraContent && (
              <div className="mt-10 bg-[#111827] rounded-2xl p-6 lg:p-8">
                <p className="text-gray-300 font-light leading-relaxed">{svc.extraContent}</p>
              </div>
            )}
          </section>
        )}

        {/* ── 3. Dokumentasi Gallery ───────────────────── */}
        <GallerySlider images={gallery} title={service.title} />

        {/* ── 4. FAQ + Sidebar ──────────────────────────── */}
        <section className="px-6 lg:px-24 pb-16 lg:pb-32 max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

            {/* FAQ */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-10">
                <span className="w-12 h-[2px] bg-red-600" />
                <h2 className="text-2xl lg:text-3xl font-light text-[#111827]">
                  Pertanyaan <span className="font-semibold">Sering Diajukan</span>
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm">
                    <h4 className="text-lg font-medium text-[#111827] mb-3">{faq.q}</h4>
                    <p className="text-base text-gray-500 leading-relaxed font-light">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-32 flex flex-col gap-8">

                {/* CTA Card */}
                <div className="bg-[#111827] rounded-3xl p-8 relative overflow-hidden">
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

                {/* Other services */}
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
                  <div className="mt-6 pt-4 border-t border-gray-100">
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
