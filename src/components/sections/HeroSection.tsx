"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Pause, Play } from "lucide-react";

export default function HeroSection() {
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          // Ignore auto-play errors
        });
      }
    }
  }, [isPaused]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.3)" }}
        >
          <source src="/videoplayback.mp4" type="video/mp4" />
        </video>
        {/* Dark cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#3D4550]/80 to-[#3D4550]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 lg:px-16 pt-32 pb-16 flex-1 flex flex-col justify-center">
        {/* HUGE Hero Title — Nissan NICS signature */}
        <h1 className="text-white leading-[0.95] tracking-[-0.03em]">
          <span
            className="block font-extralight"
            style={{ fontSize: "clamp(3rem, 9vw, 10rem)" }}
          >
            Empowering
          </span>
          <span
            className="block font-extralight"
            style={{ fontSize: "clamp(3rem, 9vw, 10rem)" }}
          >
            Cargo,
          </span>
          <span
            className="block font-extralight mt-2 lg:mt-0 lg:text-right"
            style={{ fontSize: "clamp(3rem, 9vw, 10rem)" }}
          >
            Connecting
          </span>
          <span
            className="block font-extralight lg:text-right"
            style={{ fontSize: "clamp(3rem, 9vw, 10rem)" }}
          >
            Indonesia.
          </span>
        </h1>

        {/* Sub-tagline with red dash */}
        <div className="mt-8 lg:mt-12 flex items-start gap-3">
          <span className="nics-dash mt-2.5 flex-shrink-0" />
          <p className="text-white/70 text-sm lg:text-base font-normal leading-relaxed max-w-md">
            Spesialis pengiriman dari wilayah
            <br />
            Kalimantan dan seluruh Indonesia.
          </p>
        </div>
      </div>

      {/* Bottom Bar — Explore + Pause/Play */}
      <div className="relative z-10 flex items-center justify-between px-6 lg:px-16 pb-8">
        {/* Explore scroll indicator */}
        <button
          onClick={scrollToContent}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm tracking-wider group"
        >
          <ChevronDown size={14} className="animate-bounce-down" />
          <span className="font-light">Explore</span>
        </button>

        {/* Video Pause/Play button (decorative — matches Nissan NICS) */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:border-white/60 hover:text-white transition-all"
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      </div>
    </section>
  );
}
