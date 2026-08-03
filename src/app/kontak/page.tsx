"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COMPANY } from "@/lib/constants";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Banner */}
        <section className="relative bg-[#111827] overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{
                backgroundImage: "url('/images/cargo-shipping.png')",
                filter: "brightness(0.3) grayscale(0.5)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/80 via-transparent to-[#111827]" />
          </div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-20 pointer-events-none" />

          <div className="relative z-10 px-6 lg:px-24 pb-32 pt-32 lg:pt-40 lg:pb-48 w-full max-w-[1400px] mx-auto">
            <h1 className="text-white leading-[0.95] tracking-[-0.03em]">
              <span
                className="block font-extralight"
                style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
              >
                Contact
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
                Hubungi Kami
              </span>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="px-6 lg:px-24 max-w-[1400px] mx-auto relative z-20 -mt-16 lg:-mt-24 mb-16 lg:mb-24">
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Phone,
                title: "WhatsApp",
                value: COMPANY.whatsappDisplay,
                desc: "Chat langsung",
                href: `https://wa.me/${COMPANY.whatsapp}`,
              },
              {
                icon: Mail,
                title: "Email",
                value: COMPANY.email,
                desc: "Kirim email",
                href: `mailto:${COMPANY.email}`,
              },
              {
                icon: MapPin,
                title: "Lokasi",
                value: "Balikpapan, Kaltim",
                desc: "Lihat di Maps",
                href: COMPANY.mapUrl,
              },
            ].map((item, i) => {
              const IconComp = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-100 rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-100 transition-colors duration-500" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:border-red-600 transition-colors duration-300">
                      <IconComp size={22} className="text-gray-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-medium text-[#111827] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-500 font-light mb-8">{item.value}</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-red-600 group-hover:text-red-700 transition-colors">
                      {item.desc}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Form + Map — two column */}
        <section className="px-6 lg:px-24 pb-24 lg:pb-36 max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Contact Form — 3 cols */}
            <div className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />

              <h2 className="text-3xl lg:text-4xl font-light text-[#111827] mb-4">
                Kirim Pesan
              </h2>
              <div className="flex items-center gap-2 mb-10">
                <span className="w-12 h-[2px] bg-red-600" />
                <span className="text-xs tracking-[0.2em] text-gray-500 uppercase">
                  Formulir Kontak
                </span>
              </div>

              {isSubmitted && (
                <div className="mb-8 flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
                  <CheckCircle size={18} className="text-emerald-600 shrink-0" />
                  <p className="text-sm text-gray-700 font-light">
                    Pesan berhasil dikirim! Kami akan menghubungi Anda segera.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 tracking-wider uppercase mb-3">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama"
                      className="w-full bg-transparent border-b-2 border-gray-200 focus:border-red-600 py-3 text-[#111827] text-base font-light focus:outline-none transition-colors placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 tracking-wider uppercase mb-3">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@contoh.com"
                      className="w-full bg-transparent border-b-2 border-gray-200 focus:border-red-600 py-3 text-[#111827] text-base font-light focus:outline-none transition-colors placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 tracking-wider uppercase mb-3">
                      No. Telepon
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="08xxxxxxxxxx"
                      className="w-full bg-transparent border-b-2 border-gray-200 focus:border-red-600 py-3 text-[#111827] text-base font-light focus:outline-none transition-colors placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 tracking-wider uppercase mb-3">
                      Subjek
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-gray-200 focus:border-red-600 py-3 text-[#111827] text-base font-light focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Pilih subjek</option>
                      <option value="pengiriman">Pengiriman Barang</option>
                      <option value="harga">Tanya Harga</option>
                      <option value="kemitraan">Kemitraan Bisnis</option>
                      <option value="komplain">Komplain</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 tracking-wider uppercase mb-3">
                    Pesan *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tulis pesan Anda..."
                    className="w-full bg-transparent border-2 border-gray-200 focus:border-[#3D4550] rounded-xl py-4 px-4 text-[#111827] text-base font-light focus:outline-none transition-colors resize-none placeholder:text-gray-300"
                  />
                </div>

                <button type="submit" className="nics-pill group self-start">
                  <span className="nics-pill__text">
                    <span className="nics-pill__label">Kirim Pesan</span>
                  </span>
                  <span className="nics-pill__badge">
                    <Send size={14} />
                  </span>
                </button>
              </form>
            </div>

            {/* Map + Info — 2 cols */}
            <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-8">
              {/* Map */}
              <div className="bg-white rounded-3xl overflow-hidden h-[300px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=116.82%2C-1.30%2C116.92%2C-1.20&layer=mapnik&marker=-1.25%2C116.87"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Lokasi CAM Cargo Balikpapan"
                />
              </div>

              {/* Working Hours */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-red-600" />
                  </div>
                  <h3 className="text-lg font-medium text-[#111827]">
                    Jam Operasional
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { day: "Senin - Jumat", time: "08:00 - 17:00 WITA" },
                    { day: "Sabtu", time: "08:00 - 14:00 WITA" },
                    { day: "Minggu & Hari Libur", time: "Tutup" },
                  ].map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-500 font-light">
                        {schedule.day}
                      </span>
                      <span
                        className={`font-light ${schedule.time === "Tutup"
                            ? "text-red-500"
                            : "text-[#111827]"
                          }`}
                      >
                        {schedule.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Address */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-red-50 rounded-tl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
                <p className="text-xs text-gray-400 tracking-wider uppercase mb-3">
                  Alamat Lengkap
                </p>
                <p className="text-sm font-light text-[#111827] leading-relaxed">
                  {COMPANY.address}
                </p>
                <a
                  href={COMPANY.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#111827] transition-colors mt-3"
                >
                  Buka di Google Maps <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
