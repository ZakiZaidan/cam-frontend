"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import FeatureCard from "@/components/ui/FeatureCard";

const VALUES = [
  {
    number: "01.",
    titleEn: "Safety & Insurance",
    titleId: "Keamanan & Asuransi Pengiriman",
    description:
      "Mengutamakan keamanan tinggi untuk setiap jenis pengiriman. Semua barang dilindungi asuransi resmi untuk menjamin ketenangan pikiran pelanggan selama proses distribusi ke seluruh wilayah Indonesia.",
    image: "/images/cargo-shipping.png",
  },
  {
    number: "02.",
    titleEn: "Customer Service",
    titleId: "Keterlibatan & Pelayanan Pelanggan",
    description:
      "Respons cepat dan tepat 24/7 untuk kepuasan pelanggan. Layanan konsultasi pengiriman gratis, mulai dari perencanaan logistik hingga pelacakan realtime yang mendukung kebutuhan operasional bisnis Anda.",
    image: "/images/car-transport.png",
  },
  {
    number: "03.",
    titleEn: "Professional Operations",
    titleId: "Profesionalitas Operasional Unggul",
    description:
      "Pengemasan profesional menjaga barang tetap utuh. Mengandalkan armada yang terawat dengan jadwal rutin serta sopir berpengalaman tinggi yang berdedikasi untuk mencapai nol kecelakaan dalam setiap rute.",
    image: "/images/cargo-shipping.png",
  },
  {
    number: "04.",
    titleEn: "Nationwide Coverage",
    titleId: "Jangkauan Luas Seluruh Indonesia",
    description:
      "Jaringan luas menjangkau seluruh pelosok Indonesia termasuk daerah terpencil. Kami terus berkomitmen mengembangkan rute layanan dan infrastruktur logistik yang solid demi menghubungkan Nusantara.",
    image: "/images/car-transport.png",
  },
];

export default function ValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Buttery smooth progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 18,
    restDelta: 0.001,
  });

  // Box expansion happens in the first 10% of the total scroll height
  const boxMarginInline = useTransform(smoothProgress, [0, 0.1], ["2.5rem", "0rem"]);
  const boxBorderRadius = useTransform(smoothProgress, [0, 0.1], ["2.5rem", "0rem"]);
  const boxMarginTop = useTransform(smoothProgress, [0, 0.1], ["1.5rem", "0rem"]);

  return (
    <section className="bg-white">
      {/* Outer wrapper tall enough to scroll through the cards */}
      <div ref={sectionRef} className="relative w-full h-[400vh]">

        {/* Sticky Background & Title */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <motion.div
            style={{
              marginInline: boxMarginInline,
              marginTop: boxMarginTop,
              borderRadius: boxBorderRadius,
            }}
            className="absolute inset-0 bg-[#2D333B] overflow-hidden will-change-transform shadow-2xl"
          >
            {/* Background Image (Darkened) */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/car-transport.png')",
                filter: "brightness(0.3) blur(2px)",
              }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Centered Huge Title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
              <h2 className="text-white text-5xl md:text-7xl lg:text-[6rem] font-light tracking-tight text-center leading-tight">
                <span className="text-[#C3002F]">Our</span>
                <br />
                <span className="font-semibold">Values</span>
              </h2>
              <div className="mt-6 flex items-center justify-center gap-2">
                <span className="w-8 h-[2px] bg-[#C3002F]" />
                <span className="text-xs tracking-[0.2em] text-white/80 uppercase font-semibold">
                  Our Values
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scrolling Cards Overlay (Natural Scroll) */}
        {/* Absolute container that scrolls up normally because the parent is 400vh tall */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Empty spacer to wait until the box expansion finishes before cards appear */}
          <div className="h-[120vh]" />

          {/* Cards container */}
          <div className="flex flex-col gap-[28vh] lg:gap-[35vh] w-full pointer-events-auto pb-[50vh]">
            {VALUES.map((item, index) => {
              const isRight = index % 2 === 0;

              return (
                /* Each row is full-width; card uses inline margin to position left or right */
                <div
                  key={item.number}
                  className={`w-full flex justify-center ${isRight ? "md:justify-end md:pr-[10%] lg:pr-[15%]" : "md:justify-start md:pl-[10%] lg:pl-[15%]"}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] flex-shrink-0"
                  >
                    <FeatureCard
                      number={item.number}
                      eyebrow={item.titleEn}
                      title={item.titleId}
                      description={item.description}
                      imageSrc={item.image}
                      imageAlt={item.titleId}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
