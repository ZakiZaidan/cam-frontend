import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";

export default function ServicesSection() {
  return (
    <section className="bg-[#3D4550] relative pt-24 lg:pt-36 pb-24 lg:pb-36 overflow-hidden">
      <div className="px-6 md:px-16 lg:px-28 xl:px-40 max-w-[1600px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 lg:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="nics-dash bg-[#C81E1E]" />
              <span className="text-xs tracking-[0.2em] text-white/50 uppercase">
                Layanan Utama Kami
              </span>
            </div>
            <h2
              className="text-white font-light tracking-tight leading-none"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
            >
              Our Business
            </h2>
          </div>
          
          <Link href="/layanan" className="nics-pill group border border-white/20 hover:border-white transition-colors bg-transparent">
            <span className="nics-pill__text text-white">
              <span className="nics-pill__label font-medium">View All Business</span>
              <span className="nics-pill__sublabel font-light text-white/70">(Lihat Semua Layanan)</span>
            </span>
            <span className="nics-pill__badge bg-[#C81E1E]">
              <ArrowRight size={16} className="text-white" />
            </span>
          </Link>
        </div>

        {/* Premium Cinematic Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {SERVICES.map((item, idx) => (
            <Link
              href={`/layanan/${item.slug}`}
              key={item.slug}
              className={`group relative h-[380px] lg:h-[480px] rounded-3xl overflow-hidden block ${
                idx === 8 ? "md:col-span-2 lg:col-span-4" : ""
              }`}
            >
              {/* Background Image */}
              <Image
                src={item.heroImage}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              
              {/* Overlay Gradient (Darkens on hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F26] via-[#1A1F26]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-700" />

              {/* Content Box */}
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end z-10">
                
                {/* Floating Number Badge */}
                <div className="mb-auto transform transition-transform duration-700 group-hover:-translate-y-2">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#C81E1E] border border-white/20 text-white text-xs font-semibold shadow-xl">
                    0{idx + 1}
                  </span>
                </div>

                {/* Text Content (Slides up) */}
                <div className="transform transition-transform duration-700 ease-out translate-y-6 group-hover:translate-y-0">
                  <h3 className="text-white text-2xl lg:text-3xl font-light mb-3">
                    {item.title}
                  </h3>
                  
                  {/* Hidden description that fades/slides in */}
                  <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[150px] group-hover:opacity-100 transition-all duration-700 ease-in-out">
                    <p className="text-white/70 text-sm leading-relaxed mb-6 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Interactive CTA */}
                  <div className="flex items-center gap-3 text-[#4A9B8E] text-sm font-medium mt-2">
                    <span className="relative">
                      Explore Service
                      <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#4A9B8E] transition-all duration-500 group-hover:w-full" />
                    </span>
                    <ArrowRight size={16} className="transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
