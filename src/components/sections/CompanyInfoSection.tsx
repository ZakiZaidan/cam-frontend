"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const INFO_ITEMS = [
  {
    title: "Tracking Barang",
    subtitle: "Lacak kiriman Anda secara realtime",
    href: "/tracking",
    image: "/images/cargo-shipping.png",
  },
  {
    title: "Cek Harga Ongkir",
    subtitle: "Hitung estimasi biaya",
    href: "/cek-harga",
    image: "/images/car-transport.png",
  },
  {
    title: "Fasilitas & Legalitas",
    subtitle: "Fasilitas premium untuk keamanan barang Anda.",
    href: "/fasilitas",
    image: "/images/cargo-shipping.png",
  },
  {
    title: "Layanan",
    subtitle: "Solusi pengiriman lengkap untuk setiap kebutuhan.",
    href: "/layanan",
    image: "/images/car-transport.png",
  },
];

export default function CompanyInfoSection() {
  return (
    <section className="bg-white">
      <div className="px-12 md:px-20 lg:px-32 xl:px-44 py-28 lg:py-40 max-w-[1500px] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── LEFT COLUMN: Title & List ── */}
          <div className="flex flex-col">
            {/* Section Header */}
            <div className="mb-20 lg:mb-32">
              <h2 className="nics-title">
                Company
                <br />
                Information
              </h2>
              <div className="mt-6 flex items-center gap-2">
                <span className="nics-dash" />
                <span className="text-xs tracking-[0.2em] text-gray-500 uppercase">
                  Informasi Perusahaan
                </span>
              </div>
            </div>

            {/* Info Items List */}
            <div className="flex flex-col md:ml-10 lg:ml-16 xl:ml-24">
              {INFO_ITEMS.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="group block relative py-8 md:py-12 lg:py-16 border-t border-gray-300 hover:border-gray-400 transition-colors duration-300"
                >
                  <div className="flex items-center gap-10 md:gap-16 lg:gap-24 xl:gap-32">
                    {/* Dummy image with hover shrink effect */}
                    <div className="w-[140px] lg:w-[180px] aspect-[4/3] rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={200}
                        height={150}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-90"
                      />
                    </div>

                    {/* Text content */}
                    <div className="flex-1">
                      <p className="text-xs lg:text-sm text-gray-800 font-medium mb-1 lg:mb-2">
                        {item.title}
                      </p>
                      <h3 className="text-xl lg:text-2xl lg:text-[1.75rem] font-bold text-[#111827]">
                        {item.subtitle}
                      </h3>
                    </div>

                    {/* Arrow with circle transition */}
                    <div className="shrink-0 relative w-10 h-10 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[#BE0027] rounded-full scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out" />
                      <ArrowRight
                        size={20}
                        strokeWidth={1.5}
                        className="text-[#BE0027] group-hover:text-white relative z-10 transition-colors duration-300"
                      />
                    </div>
                  </div>
                </Link>
              ))}
              {/* Bottom border for the last item */}
              <div className="border-t border-gray-300" />
            </div>
          </div>

          {/* ── RIGHT COLUMN: Large images & Text ── */}
          <div className="flex flex-col relative pt-10 lg:pt-0">
            {/* Image Collage */}
            <div className="relative mb-12 lg:mb-16">
              {/* Large Image */}
              <div className="nics-img-zoom rounded-2xl overflow-hidden aspect-[4/3] w-[90%] ml-auto">
                <Image
                  src="/images/cargo-shipping.png"
                  alt="Company Facility"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Small overlapping image */}
              {/* <div className="nics-img-zoom rounded-xl overflow-hidden absolute top-10 left-0 w-[45%] aspect-[4/3] shadow-2xl ring-4 ring-white">
                <Image
                  src="/images/car-transport.png"
                  alt="Team"
                  width={300}
                  height={225}
                  className="w-full h-full object-cover"
                />
              </div> */}
            </div>

            {/* Profile Text Content */}
            <div className="pl-0 lg:pl-12">
              <p className="text-sm font-medium tracking-widest text-gray-500 mb-2">
                Company Profile
              </p>
              <h3 className="text-2xl lg:text-3xl font-light text-[#111827] mb-6">
                Profil Perusahaan
              </h3>

              <p className="text-[#4B5563] text-base lg:text-sm xl:text-base leading-[2] font-normal mb-10 max-w-lg">
                Sejak didirikan, PT. Cipta Astama Mandala telah berkembang menjadi penyedia layanan logistik terpadu yang andal. Dengan komitmen pada ketepatan waktu dan keamanan, kami terus berinovasi untuk menghubungkan seluruh pelosok Nusantara.
              </p>

              {/* View More Pill */}
              <Link href="/tentang" className="nics-pill group inline-flex">
                <span className="nics-pill__text">
                  <span className="nics-pill__label">View More</span>
                  <span className="nics-pill__sublabel">(Selengkapnya)</span>
                </span>
                <span className="nics-pill__badge">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
