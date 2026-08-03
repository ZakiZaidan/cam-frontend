"use client";

import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import { ArrowRight, PhoneCall } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-36 pb-24 lg:pb-44 w-full">
      {/* 
        REVERTED TO ORIGINAL WORKING WRAPPER:
        Using .nics-section-dark gives the exact same margin-inline and centering
        as the original grey box. We just force the background to red.
      */}
      <div className="nics-section-dark relative overflow-hidden !bg-[#C81E1E] shadow-2xl">
        
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 2px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        
        {/* Blur Orbs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-black/10 rounded-full blur-3xl pointer-events-none" />

        {/* 
          MASSIVE PADDING APPLIED:
          px-12 on mobile up to px-48 on desktop ensures the text is always very far from the edges.
        */}
        <div className="relative z-10 px-12 sm:px-16 md:px-24 lg:px-36 xl:px-48 py-20 sm:py-24 md:py-32 lg:py-40 max-w-[1500px] mx-auto w-full">
          
          {/* Using strict CSS Grid to guarantee no overflow out of padding bounds */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Content - Takes up 7/12 on Desktop */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[2px] bg-white/60" />
                <span className="text-white/90 text-sm tracking-[0.25em] uppercase font-semibold">
                  Hubungi Kami
                </span>
              </div>
              
              <h2 className="text-white font-extralight leading-[1.15] tracking-tight mb-8 text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem]">
                Siap Memulai <br className="hidden md:block" />
                <span className="font-semibold">Pengiriman Anda?</span>
              </h2>
              
              <p className="text-white/80 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
                Hubungi tim CAM Cargo sekarang untuk konsultasi gratis dan
                dapatkan penawaran harga ekspedisi terbaik yang disesuaikan
                dengan kebutuhan logistik Anda.
              </p>
            </div>

            {/* Right Content / Button - Takes up 5/12 on Desktop */}
            <div className="lg:col-span-5 xl:col-span-4 flex justify-start lg:justify-end">
              <Link
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-5 bg-white p-3 pr-8 md:p-4 md:pr-10 rounded-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden max-w-full"
              >
                {/* Button Icon */}
                <div className="w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-full bg-[#111827] flex items-center justify-center relative z-10 transition-colors duration-300 group-hover:bg-[#C81E1E]">
                  <PhoneCall className="text-white w-6 h-6 md:w-8 md:h-8" />
                </div>
                
                {/* Button Text */}
                <div className="flex flex-col relative z-10 min-w-0">
                  <span className="text-[#111827] font-bold text-base md:text-xl leading-tight uppercase tracking-wide truncate">
                    Contact Us
                  </span>
                  <span className="text-gray-500 font-medium text-xs md:text-sm mt-1 truncate">
                    Tanya via WhatsApp
                  </span>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
