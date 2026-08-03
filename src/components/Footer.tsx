import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-white px-8 lg:px-24 py-16 lg:py-24 max-w-[1500px] mx-auto rounded-b-3xl">
      {/* Top Right - Utility Links */}
      <div className="flex justify-end mb-16 lg:mb-24">
        <div className="flex flex-col gap-3 text-right">
          <Link href="#" className="text-xs text-gray-700 hover:text-gray-400 transition-colors font-medium tracking-widest">
            Kebijakan Privasi
          </Link>
          <Link href="#" className="text-xs text-gray-700 hover:text-gray-400 transition-colors font-medium tracking-widest">
            Syarat & Ketentuan
          </Link>
          <Link href="#" className="text-xs text-gray-700 hover:text-gray-400 transition-colors font-medium tracking-widest">
            Peta Situs
          </Link>
        </div>
      </div>

      {/* Middle - Massive Typography */}
      <div className="mb-24 lg:mb-32">
        <h2 className="font-medium text-[#222222] leading-[1] lg:leading-[0.85] tracking-[-0.04em]" style={{ fontSize: "clamp(3rem, 10vw, 11rem)" }}>
          <span className="block">Empowering</span>
          <span className="block mt-2 lg:mt-0">
            Cargo,
            <span className="inline-block mx-4 lg:mx-8 align-middle w-24 h-12 lg:w-48 lg:h-24 rounded-full lg:rounded-2xl overflow-hidden relative">
              <Image
                src="/images/cargo-shipping.png"
                alt="Cargo Operations"
                fill
                className="object-cover"
              />
            </span>
            Ensuring
          </span>
          <span className="block mt-2 lg:mt-0 text-right lg:text-left lg:ml-[35%]">
            Quality.
          </span>
        </h2>
      </div>

      {/* Bottom Area */}
      <div className="flex flex-col-reverse lg:flex-row lg:items-end justify-between gap-16 lg:gap-12 mt-12">
        {/* Bottom Left */}
        <div className="flex flex-col gap-12 lg:gap-24">
          <div className="max-w-xs">
            <div className="flex items-start gap-4">
              <span className="w-8 h-[2px] bg-[#C3002F] mt-2 shrink-0" />
              <p className="text-xs lg:text-sm text-[#222222] font-semibold leading-relaxed tracking-wider">
                Kami mendukung proses distribusi dan berbagai bisnis dengan layanan logistik terpercaya ke seluruh Indonesia.
              </p>
            </div>
          </div>
          <p className="text-[10px] lg:text-xs text-[#222222] font-semibold tracking-widest uppercase">
            © {COMPANY.legalName.toUpperCase()}
          </p>
        </div>

        {/* Bottom Right - Logo */}
        <div className="flex flex-col lg:items-end">
          <div className="flex items-center gap-4">
            <Image
              src="/logo/camLogo.png"
              alt="CAM Cargo"
              width={48}
              height={48}
              className="rounded-sm"
            />
            <div className="flex flex-col leading-[1.1]">
              <span className="text-xl lg:text-2xl font-bold tracking-[0.2em] text-[#222222] uppercase">
                CAM CARGO
              </span>
              <span className="text-[9px] lg:text-[10px] font-semibold tracking-[0.2em] text-[#222222] uppercase mt-1">
                Logistics & Transportation
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
