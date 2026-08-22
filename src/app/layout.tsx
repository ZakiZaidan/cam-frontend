import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageTracker } from "@/components/PageTracker";

// Noto Sans JP — for body text, labels, UI elements
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://camlogexpress.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "CAM Cargo — Jasa Pengiriman Barang, Motor, Mobil & Alat Berat Balikpapan",
    template: "%s | CAM Cargo Balikpapan",
  },
  description:
    "CAM Cargo (PT. Cipta Astama Mandala) — Jasa ekspedisi terpercaya di Balikpapan, Kalimantan Timur. Layanan pengiriman barang, motor, mobil, dan alat berat via darat, laut, dan udara ke seluruh Indonesia. Asuransi, door-to-door, tracking real-time.",
  keywords: [
    "CAM Cargo",
    "jasa pengiriman Balikpapan",
    "ekspedisi Balikpapan",
    "kirim barang Kalimantan",
    "kirim motor Balikpapan",
    "kirim mobil Balikpapan",
    "kirim alat berat Kalimantan",
    "jasa pindahan Balikpapan",
    "kirim barang ke Kalimantan",
    "ekspedisi Kalimantan Timur",
    "jasa logistik Balikpapan",
    "pengiriman darat laut udara",
    "charter kendaraan barang",
    "PT Cipta Astama Mandala",
    "cargo Balikpapan",
    "ekspedisi murah Balikpapan",
  ],
  authors: [{ name: "CAM Cargo", url: BASE_URL }],
  creator: "PT. Cipta Astama Mandala",
  publisher: "PT. Cipta Astama Mandala",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "CAM Cargo",
    title: "CAM Cargo — Jasa Pengiriman Barang, Motor, Mobil & Alat Berat Balikpapan",
    description:
      "Jasa ekspedisi terpercaya di Balikpapan. Layanan kirim barang, motor, mobil, alat berat, pindahan, via udara, dan charter kendaraan ke seluruh Indonesia.",
    images: [
      {
        url: "/images/cargo-shipping.png",
        width: 1200,
        height: 630,
        alt: "CAM Cargo — Jasa Pengiriman Balikpapan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CAM Cargo — Jasa Pengiriman Barang Balikpapan",
    description:
      "Jasa ekspedisi terpercaya di Balikpapan. Kirim barang, motor, mobil, alat berat ke seluruh Indonesia.",
    images: ["/images/cargo-shipping.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    // Isi setelah verifikasi Google Search Console
    // google: "KODE_VERIFIKASI_GOOGLE_SEARCH_CONSOLE",
  },
  category: "logistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": BASE_URL,
        name: "CAM Cargo",
        alternateName: "PT. Cipta Astama Mandala",
        url: BASE_URL,
        logo: `${BASE_URL}/logo/camLogo.png`,
        image: `${BASE_URL}/images/cargo-shipping.png`,
        description:
          "Jasa ekspedisi dan logistik terpercaya di Balikpapan, Kalimantan Timur. Layanan pengiriman barang, motor, mobil, dan alat berat via darat, laut, dan udara ke seluruh Indonesia.",
        telephone: "+6281146602305",
        email: "info@camlogexpress.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Balikpapan",
          addressRegion: "Kalimantan Timur",
          addressCountry: "ID",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "-1.2654",
          longitude: "116.8312",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        priceRange: "$$",
        currenciesAccepted: "IDR",
        paymentAccepted: "Cash, Bank Transfer, E-Wallet",
        areaServed: {
          "@type": "Country",
          name: "Indonesia",
        },
        serviceType: [
          "Pengiriman Barang",
          "Kirim Motor",
          "Kirim Mobil",
          "Kirim Alat Berat",
          "Pindahan Rumah",
          "Pengiriman via Udara",
          "Kirim Barang Project",
          "Charter Kendaraan",
        ],
        sameAs: [
          "https://www.facebook.com/cam.cargobalikpapan",
          "https://www.instagram.com/cam.cargobalikpapan/",
          "https://www.tiktok.com/@cam.cargobalikpapan",
        ],
        foundingDate: "2023",
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "CAM Cargo",
        description: "Jasa ekspedisi dan logistik terpercaya di Balikpapan",
        publisher: { "@id": BASE_URL },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/tracking?resi={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        inLanguage: "id-ID",
      },
    ],
  };

  return (
    <html lang="id" className={cn("h-full", notoSansJP.variable, "font-body")}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#111827]">
        {/* Vertical Side Texts — Nissan NICS Signature */}
        <div className="nics-vertical-text nics-vertical-text--left hidden 2xl:block pointer-events-none">
          Empowering Cargo — Connecting Indonesia
        </div>
        <div className="nics-vertical-text nics-vertical-text--right hidden 2xl:block pointer-events-none">
          PT. Cipta Astama Mandala — Since 2023
        </div>
        <TooltipProvider>
          <PageTracker />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
