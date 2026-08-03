"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ──────────────────────────────────────────────────────
   Data
────────────────────────────────────────────────────── */
const BUSINESS_ITEMS = [
  {
    number: "01.",
    titleEn: "Package Delivery",
    titleId: "Kirim Barang",
    description:
      "Layanan pengiriman barang reguler dan paket ke seluruh Indonesia melalui darat, laut, dan udara dengan jaminan keamanan.",
    slug: "kirim-barang",
    image: "/images/cargo-shipping.png",
  },
  {
    number: "02.",
    titleEn: "Motorcycle Shipping",
    titleId: "Kirim Motor",
    description:
      "Pengiriman motor segala jenis dan merek dengan pengemasan aman, asuransi, dan pengantaran door-to-door.",
    slug: "kirim-motor",
    image: "/images/car-transport.png",
  },
  {
    number: "03.",
    titleEn: "Vehicle Transport",
    titleId: "Kirim Mobil & Alat Berat",
    description:
      "Layanan kirim mobil segala tipe dan alat berat menggunakan car carrier, towing profesional, dan low-bed trailer.",
    slug: "kirim-mobil",
    image: "/images/car-transport.png",
  },
  {
    number: "04.",
    titleEn: "Project Cargo",
    titleId: "Kirim Barang Project & Pindahan",
    description:
      "Solusi logistik skala besar untuk proyek konstruksi, pertambangan, industri, serta pindahan rumah dan kantor.",
    slug: "kirim-barang-project",
    image: "/images/cargo-shipping.png",
  },
];

/* ──────────────────────────────────────────────────────
   Scroll constants
   TOTAL_VH  : total scroll height of the section
   ENTRY_END : fraction of scroll used for box-expand animation
   After ENTRY_END each of the 4 items occupies equal share,
   with ~65vh of "hold" before content fades.
────────────────────────────────────────────────────── */
const TOTAL_VH = 650;
const ENTRY_END = 0.14; // 0 → 0.14: box expands to full-screen

/* ──────────────────────────────────────────────────────
   Per-item content panel
────────────────────────────────────────────────────── */
interface PanelProps {
  item: (typeof BUSINESS_ITEMS)[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function BusinessPanel({ item, index, total, progress }: PanelProps) {
  const remaining = 1 - ENTRY_END;
  const seg = remaining / total;

  const itemStart = ENTRY_END + index * seg;
  const itemEnd = ENTRY_END + (index + 1) * seg;

  // Each segment: 14% fade-in, 60% hold, 14% fade-out, 12% gap
  const fadeIn = seg * 0.14;
  const fadeOut = seg * 0.14;

  // First item: already visible at ENTRY_END, fades in during entry animation
  const opIn = index === 0 ? Math.max(0, ENTRY_END - 0.06) : itemStart - fadeIn * 0.4;
  const opFull = index === 0 ? ENTRY_END + 0.02 : itemStart + fadeIn;
  const opFadeStart = itemEnd - fadeOut;
  const opGone = index === total - 1 ? 1 : itemEnd;

  const opacity = useTransform(
    progress,
    [opIn, opFull, opFadeStart, opGone],
    [index === 0 ? 0 : 0, 1, 1, index === total - 1 ? 1 : 0]
  );

  // Image scales from 0.90 → 1.0 as item enters
  const scale = useTransform(
    progress,
    [opIn, opFull],
    [0.9, 1.0]
  );

  // Content slides up as item enters
  const contentY = useTransform(
    progress,
    [opIn, opFull],
    [28, 0]
  );

  return (
    <motion.div
      style={{ opacity, pointerEvents: opacity.get() > 0 ? "auto" : "none" }}
      className="absolute inset-0 flex items-center pt-36 lg:pt-20"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center px-6 md:px-16 lg:px-28 xl:px-40">

        {/* ── Left: Image with scale-in animation ── */}
        <motion.div
          style={{ scale }}
          className="nics-img-zoom rounded-2xl overflow-hidden aspect-[21/9] sm:aspect-video lg:aspect-[4/3] will-change-transform origin-center hidden sm:block"
        >
          <Image
            src={item.image}
            alt={item.titleId}
            width={800}
            height={600}
            className="w-full h-full object-cover"
            priority={index === 0}
          />
        </motion.div>

        {/* ── Right: Content slide-up animation ── */}
        <motion.div style={{ y: contentY }} className="will-change-transform">
          {/* Number badge */}
          <span className="inline-flex items-center justify-center w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-[#4A9B8E] text-white text-xs lg:text-sm font-semibold mb-4 lg:mb-6">
            {item.number}
          </span>
          <br />
          {/* English subtitle */}
          <p className="text-white text-xs lg:text-sm font-medium tracking-widest uppercase mb-1 lg:mb-2">
            {item.titleEn}
          </p>

          {/* Indonesian title */}
          <h3
            className="text-white font-light leading-tight mb-4 lg:mb-6"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)" }}
          >
            {item.titleId}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm lg:text-base leading-[1.6] lg:leading-[1.9] font-light mb-6 lg:mb-10 max-w-md">
            {item.description}
          </p>

          {/* Pill button */}
          <Link href={`/layanan/${item.slug}`} className="nics-pill nics-pill--dark group">
            <span className="nics-pill__text">
              <span className="nics-pill__label">View More</span>
              <span className="nics-pill__sublabel">(Selengkapnya)</span>
            </span>
            <span className="nics-pill__badge">
              <ArrowRight size={16} />
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────
   Progress dot (each is its own component to avoid
   calling hooks inside a loop)
────────────────────────────────────────────────────── */
interface DotProps {
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function Dot({ index, total, progress }: DotProps) {
  const remaining = 1 - ENTRY_END;
  const seg = remaining / total;
  const center = ENTRY_END + (index + 0.5) * seg;

  const opacity = useTransform(
    progress,
    [Math.max(0, center - seg * 0.5), center, Math.min(1, center + seg * 0.5)],
    [0.3, 1, 0.3]
  );
  const scaleX = useTransform(
    progress,
    [Math.max(0, center - seg * 0.4), center, Math.min(1, center + seg * 0.4)],
    [1, 2.8, 1]
  );

  return (
    <motion.div
      style={{ opacity, scaleX }}
      className="h-[3px] w-4 rounded-full bg-white origin-left"
    />
  );
}

/* ──────────────────────────────────────────────────────
   Main section
────────────────────────────────────────────────────── */
export default function BusinessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Apply a spring physics smoothing to the scroll progress for a buttery feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 18,
    restDelta: 0.001
  });

  /* Box-expand animation: rounded card → full-screen
     marginInline: 3rem → 0
     borderRadius: 3rem → 0                              */
  const boxMarginInline = useTransform(
    smoothProgress,
    [0, ENTRY_END],
    ["2.5rem", "0rem"]
  );
  const boxBorderRadius = useTransform(
    scrollYProgress,
    [0, ENTRY_END],
    ["2.5rem", "0rem"]
  );
  const boxMarginTop = useTransform(
    scrollYProgress,
    [0, ENTRY_END],
    ["1.5rem", "0rem"]
  );

  const total = BUSINESS_ITEMS.length;

  return (
    /* Outer: defines total scroll travel distance */
    <div
      ref={sectionRef}
      style={{ height: `${TOTAL_VH}vh` }}
      className="relative"
    >
      {/* Inner: sticks to top for the duration of scroll travel */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Animated dark card ──────────────────────
            Starts as a floating rounded card with margins,
            then expands to fill the full viewport.
        ─────────────────────────────────────────────── */}
        <motion.div
          style={{
            /* animated CSS properties */
            marginInline: boxMarginInline,
            borderRadius: boxBorderRadius,
            marginTop: boxMarginTop,
            /* static properties */
            background: "var(--bg-dark)",
            overflow: "hidden",
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ── Static header: title + View All button ── */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-start justify-between px-6 md:px-16 lg:px-28 xl:px-40 pt-16 lg:pt-28">
            <div>
              <h2 className="nics-title nics-title--light leading-[1.1] pb-2">
                Our Business
              </h2>
              <div className="mt-2 flex items-center gap-2">
                <span className="nics-dash" />
                <span className="text-xs tracking-[0.2em] text-gray-400 uppercase">
                  Layanan Utama Kami
                </span>
              </div>
            </div>

            <div className="hidden lg:block mt-2">
              <Link
                href="/layanan"
                className="nics-pill nics-pill--dark group"
              >
                <span className="nics-pill__text">
                  <span className="nics-pill__label">View All Business</span>
                  <span className="nics-pill__sublabel">(Lihat Semua Layanan)</span>
                </span>
                <span className="nics-pill__badge">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>

          {/* ── Animated content panels (stacked, absolute) ── */}
          <div className="relative flex-1">
            {BUSINESS_ITEMS.map((item, i) => (
              <BusinessPanel
                key={item.slug}
                item={item}
                index={i}
                total={total}
                progress={smoothProgress}
              />
            ))}
          </div>

          {/* ── Progress dots ── */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
            {BUSINESS_ITEMS.map((_, i) => (
              <Dot key={i} index={i} total={total} progress={smoothProgress} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
