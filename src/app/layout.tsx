import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

// Noto Sans JP — for body text, labels, UI elements
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CAM Cargo — Jasa Pengiriman Cepat & Aman Seluruh Indonesia",
    template: "%s | CAM Cargo",
  },
  description:
    "PT. Cipta Astama Mandala (CAM Cargo) — Layanan pengiriman barang, motor, mobil, dan alat berat via darat, laut, dan udara. Spesialis Kalimantan & seluruh Indonesia.",
  keywords: [
    "cargo",
    "pengiriman barang",
    "ekspedisi",
    "kirim barang",
    "logistik",
    "Balikpapan",
    "Kalimantan",
    "CAM Cargo",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("h-full", notoSansJP.variable, "font-body")}>
      <body className="min-h-full flex flex-col bg-white text-[#111827]">
        {/* Vertical Side Texts — Nissan NICS Signature */}
        <div className="nics-vertical-text nics-vertical-text--left hidden 2xl:block pointer-events-none">
          Empowering Cargo — Connecting Indonesia
        </div>
        <div className="nics-vertical-text nics-vertical-text--right hidden 2xl:block pointer-events-none">
          PT. Cipta Astama Mandala — Since 2023
        </div>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
