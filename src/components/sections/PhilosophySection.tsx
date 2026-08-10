"use client";

import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function PhilosophySection() {
  return (
    <section className="bg-white relative pt-28 lg:pt-40 pb-32 lg:pb-52">
      <div className="px-12 md:px-20 lg:px-32 xl:px-44 max-w-[1500px] mx-auto">

        {/* ── ROW 1: Title (left) only ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div>
            <h2 className="nics-title">
              Corporate
              <br />
              Philosophy
            </h2>
            {/* Red dash label — directly below title */}
            <div className="mt-5 flex items-center gap-2">
              <span className="nics-dash" />
              <span className="text-xs tracking-[0.2em] text-black-400 uppercase">
                Filosofi Perusahaan
              </span>
            </div>
          </div>
          {/* Right column intentionally empty — mirrors Nissan NICS */}
          <div />
        </div>

        {/* ── ROW 2: Scattered images (left) + Text & button (right) ── */}
        {/* 
          Left : two images stacked / offset for a scattered aesthetic
          Right: paragraph text aligned to same top as large image,
                 button below — both left-edges match exactly 
        */}
        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Scattered image collage ── */}
          <div className="relative">
            {/* Large portrait image — anchors the collage */}
            <div className="nics-img-zoom rounded-3xl overflow-hidden w-full lg:w-[95%] aspect-[3/4]">
              <Image
                src="/images/cargo-shipping.png"
                alt="CAM Cargo Operations"
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ── RIGHT: Description text + pill button + accent image ── */}
          <div className="flex flex-col pt-0 lg:pt-4">
            {/* Body text — left-edge aligned with button below */}
            <p className="text-[#4B5563] text-base lg:text-lg leading-[2] font-normal">
              <b>
                {COMPANY.visi}</b>
            </p>
            <p className="text-[#4B5563] text-base lg:text-lg leading-[2] font-normal mt-5">
              <b>Cam Cargo terkenal sangat fleksibel untuk melakukan distribusi
                barang antar pulau di seluruh Indonesia, termasuk daerah terpencil
                dengan landasan kepercayaan &amp; tanggung jawab penuh. </b>
            </p>

            {/* Pill Button — same left edge as text above */}
            <div className="mt-10">
              <Link href="/tentang" className="nics-pill group">
                <span className="nics-pill__text">
                  <span className="nics-pill__label">View Philosophy</span>
                  <span className="nics-pill__sublabel">
                    (Profil Selengkapnya)
                  </span>
                </span>
                <span className="nics-pill__badge">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>

            {/* Third accent image row — bottom of this column */}
            <div className="mt-14 lg:mt-20 w-full flex flex-row items-center justify-end gap-4 lg:gap-6">
              <div className="nics-img-zoom rounded-2xl overflow-hidden w-1/2 aspect-[4/3] shadow-sm">
                <Image
                  src="/images/car-transport.png"
                  alt="CAM Cargo Vehicle Transport"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="nics-img-zoom rounded-2xl overflow-hidden w-1/2 aspect-[4/3] shadow-sm">
                <Image
                  src="/images/cargo-shipping.png"
                  alt="CAM Cargo Delivery"
                  width={500}
                  height={375}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
