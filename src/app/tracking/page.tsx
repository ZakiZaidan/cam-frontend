"use client";

import { useState, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trackShipment, type TrackingResult } from "@/lib/api";
import {
  Search,
  Package,
  Warehouse,
  Truck,
  MapPin,
  CheckCircle,
  Clock,
  User,
  Weight,
  ArrowRight,
  Copy,
  Check,
  AlertCircle,
  Map,
} from "lucide-react";

// Lazy-load peta agar tidak error SSR
const TrackingMap = lazy(() => import("@/components/TrackingMap"));

const statusIcons: Record<string, React.ReactNode> = {
  picked_up:        <Package size={18} />,
  in_warehouse:     <Warehouse size={18} />,
  in_transit:       <Truck size={18} />,
  out_for_delivery: <MapPin size={18} />,
  delivered:        <CheckCircle size={18} />,
};

export default function TrackingPage() {
  const [resiInput, setResiInput]       = useState("");
  const [trackingData, setTrackingData] = useState<TrackingResult | null>(null);
  const [isLoading, setIsLoading]       = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [copied, setCopied]             = useState(false);
  const [showMap, setShowMap]           = useState(true);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resiInput.trim()) return;
    setIsLoading(true);
    setError(null);
    setTrackingData(null);
    try {
      const data = await trackShipment(resiInput.trim());
      setTrackingData(data);
      setShowMap(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Nomor resi tidak ditemukan.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyResi = () => {
    if (trackingData) {
      navigator.clipboard.writeText(trackingData.resi);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Determine current step index (last completed timeline entry)
  const currentIdx = trackingData
    ? trackingData.timeline.length - 1
    : -1;

  // Check if any timeline entry has GPS coordinates
  const hasGps = trackingData?.timeline.some((t) => t.coordinates) ?? false;

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Banner */}
        <section className="relative bg-[#111827] border-b border-gray-100/10">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 grayscale mix-blend-luminosity"
              style={{ backgroundImage: "url('/images/cargo-shipping.png')" }}
            />
          </div>
          <div className="relative z-10 px-6 lg:px-24 pb-20 pt-32 lg:pt-48 w-full max-w-[1400px] mx-auto">
            <h1 className="text-white leading-[1] tracking-tight">
              <span className="block font-light text-5xl lg:text-7xl mb-2">
                Cargo Tracking
              </span>
            </h1>
            <div className="mt-8 flex items-center gap-4">
              <span className="w-10 h-[2px] bg-red-600" />
              <span className="text-sm tracking-[0.2em] text-white/70 uppercase font-medium">
                Lacak Pengiriman Anda
              </span>
            </div>
          </div>
        </section>

        {/* Search + Results */}
        <section className="bg-white px-6 lg:px-24 py-16 lg:py-36 max-w-[1400px] mx-auto w-full overflow-x-hidden">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0 border-0 md:border-b-2 border-gray-200 focus-within:border-[#3D4550] transition-colors md:pb-4">
              <div className="flex items-center flex-1 w-full border-b-2 md:border-b-0 border-gray-200 pb-4 md:pb-0">
                <Search size={20} className="text-gray-400 mr-3 lg:mr-4 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Masukkan nomor resi..."
                  value={resiInput}
                  onChange={(e) => setResiInput(e.target.value)}
                  className="w-full min-w-0 bg-transparent text-lg lg:text-2xl font-light text-[#111827] placeholder:text-gray-300 focus:outline-none"
                />
              </div>
              <div className="w-full md:w-auto mt-2 md:mt-0">
                <button type="submit" disabled={isLoading} className="nics-pill group justify-between md:justify-start w-full">
                  <span className="nics-pill__text">
                    <span className="nics-pill__label">{isLoading ? "Mencari..." : "Lacak Pengiriman"}</span>
                  </span>
                  <span className="nics-pill__badge">
                    <ArrowRight size={16} />
                  </span>
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4 md:mt-3 font-light">
              Format resi: CAM-2025-XXXXX
            </p>
          </form>

          {/* Error State */}
          {error && (
            <div className="max-w-3xl mx-auto mt-12 flex items-center gap-3 p-5 border border-red-100 bg-red-50 rounded-2xl">
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <p className="text-sm text-red-700 font-light">{error}</p>
            </div>
          )}

          {/* Tracking Results */}
          {trackingData && (
            <div className="max-w-3xl mx-auto mt-20">
              {/* Resi Header */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 pb-8 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 tracking-wider uppercase mb-2">Nomor Resi</p>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl lg:text-4xl font-extralight text-[#111827]">
                      {trackingData.resi}
                    </h2>
                    <button onClick={copyResi} className="text-gray-300 hover:text-gray-600 transition-colors">
                      {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium text-gray-500 border border-gray-200 px-3 py-1.5 rounded-full">
                    {trackingData.service}
                  </span>
                  {trackingData.estimated_delivery && (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                      <Clock size={14} className="text-gray-400" />
                      Est. {trackingData.estimated_delivery}
                    </span>
                  )}
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="border border-gray-100 rounded-xl p-5">
                  <p className="text-xs text-gray-400 tracking-wider uppercase mb-2 flex items-center gap-1.5">
                    <User size={12} /> Pengirim
                  </p>
                  <p className="text-sm font-medium text-[#111827]">{trackingData.sender.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{trackingData.sender.city}</p>
                </div>
                <div className="border border-gray-100 rounded-xl p-5">
                  <p className="text-xs text-gray-400 tracking-wider uppercase mb-2 flex items-center gap-1.5">
                    <MapPin size={12} /> Penerima
                  </p>
                  <p className="text-sm font-medium text-[#111827]">{trackingData.receiver.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{trackingData.receiver.city}</p>
                </div>
                <div className="border border-gray-100 rounded-xl p-5">
                  <p className="text-xs text-gray-400 tracking-wider uppercase mb-2 flex items-center gap-1.5">
                    <Weight size={12} /> Barang
                  </p>
                  <p className="text-sm font-medium text-[#111827]">{trackingData.item.description}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {trackingData.item.weight}
                    {trackingData.item.dimensions && ` · ${trackingData.item.dimensions}`}
                  </p>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="mb-16">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-light text-[#111827] flex items-center gap-2">
                    <Map size={18} className="text-gray-400" />
                    Peta Perjalanan
                    {hasGps && (
                      <span className="text-[10px] font-medium text-white bg-emerald-500 px-2 py-0.5 rounded-full tracking-wider uppercase ml-1">
                        GPS Live
                      </span>
                    )}
                  </h3>
                  <button
                    onClick={() => setShowMap((p) => !p)}
                    className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    {showMap ? "Sembunyikan Peta" : "Tampilkan Peta"}
                  </button>
                </div>

                {showMap && (
                  <Suspense
                    fallback={
                      <div
                        className="border border-gray-100 rounded-2xl bg-gray-50 flex items-center justify-center"
                        style={{ height: 380 }}
                      >
                        <p className="text-sm text-gray-400 font-light animate-pulse">Memuat peta...</p>
                      </div>
                    }
                  >
                    <TrackingMap
                      senderCity={trackingData.sender.city}
                      receiverCity={trackingData.receiver.city}
                      timeline={trackingData.timeline}
                    />
                  </Suspense>
                )}

                {!hasGps && (
                  <p className="mt-3 text-xs text-gray-400 font-light flex items-center gap-1.5">
                    <MapPin size={11} />
                    Posisi kurir belum tersedia. Peta menampilkan estimasi rute berdasarkan kota asal dan tujuan.
                  </p>
                )}
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-light text-[#111827] mb-8 pb-4 border-b border-gray-100">
                  Riwayat Perjalanan
                </h3>
                <div className="flex flex-col gap-0">
                  {trackingData.timeline.map((step, i) => {
                    const isCurrent = i === currentIdx;
                    const isCompleted = true; // all timeline entries returned from API are completed

                    return (
                      <div key={`${step.status}-${i}`} className="flex gap-5">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                              isCurrent
                                ? "bg-[#3D4550] text-white"
                                : "border-2 border-[#3D4550] text-[#3D4550]"
                            }`}
                          >
                            {statusIcons[step.status] ?? <Package size={18} />}
                          </div>
                          {i < trackingData.timeline.length - 1 && (
                            <div className="w-px h-16 my-1 bg-[#3D4550]" />
                          )}
                        </div>
                        <div className="pb-8 pt-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-sm font-medium text-[#111827]">{step.label}</h4>
                            {isCurrent && (
                              <span className="text-[10px] font-medium text-white bg-[#3D4550] px-2 py-0.5 rounded-full tracking-wider uppercase">
                                Posisi Terkini
                              </span>
                            )}
                          </div>
                          {step.description && (
                            <p className="text-xs text-gray-500 mb-1.5 font-light">{step.description}</p>
                          )}
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <MapPin size={12} /> {step.location}
                            </span>
                            {isCompleted && step.date !== "-" && (
                              <span className="flex items-center gap-1">
                                <Clock size={12} /> {step.date}, {step.time}
                              </span>
                            )}
                            {step.coordinates && (
                              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                                <MapPin size={11} />
                                GPS: {step.coordinates.lat.toFixed(4)}, {step.coordinates.lng.toFixed(4)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!trackingData && !isLoading && !error && (
            <div className="text-center py-20 max-w-md mx-auto px-4">
              <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center mx-auto mb-6">
                <Package size={24} className="text-gray-300" />
              </div>
              <p className="text-sm font-light text-gray-500">
                Masukkan nomor resi di atas untuk melacak pengiriman Anda
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
