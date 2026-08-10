"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GallerySliderProps {
  images: string[];
  title: string;
}

export default function GallerySlider({ images, title }: GallerySliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Scroll by 80% of the visible container width
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <section className="px-6 lg:px-24 pb-16 lg:pb-24 max-w-[1400px] mx-auto group/section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <span className="w-12 h-[2px] bg-red-600" />
          <h2 className="text-2xl lg:text-3xl font-light text-[#111827]">
            Galeri <span className="font-semibold">Dokumentasi</span>
          </h2>
        </div>
        
        {/* Navigation Buttons (Visible on desktop) */}
        <div className="hidden lg:flex items-center gap-3 opacity-0 group-hover/section:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all hover:scale-105 shadow-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all hover:scale-105 shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 lg:gap-6 pb-8 -mx-6 px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="relative flex-none w-[75%] sm:w-[45%] md:w-[35%] lg:w-[28%] aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 snap-center lg:snap-start group"
          >
            <Image
              src={img}
              alt={`${title} dokumentasi ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 75vw, (max-width: 1200px) 35vw, 28vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
