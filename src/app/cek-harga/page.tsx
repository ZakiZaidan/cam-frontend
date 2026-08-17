"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MapPin,
  Weight,
  ArrowRight,
  Calculator,
  Truck,
  Ship,
  Plane,
  Clock,
  ShieldCheck,
  Package,
} from "lucide-react";
import { calculateShippingRate, getAvailableCities, ShippingRateResult } from "@/lib/api";

export default function CekHargaPage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [results, setResults] = useState<ShippingRateResult | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Hitung berat volume secara live (preview sebelum submit)
  const volumetricPreview = (() => {
    const p = parseFloat(length), l = parseFloat(width), t = parseFloat(height);
    if (!p || !l || !t) return null;
    // Preview pakai divisor 6000 (akan diganti oleh divisor per-rute dari API)
    return Math.round((p * l * t) / 6000 * 100) / 100;
  })();
  const chargeablePreview = weight && volumetricPreview !== null
    ? Math.max(parseFloat(weight), volumetricPreview)
    : null;

  useEffect(() => {
    async function loadCities() {
      try {
        const data = await getAvailableCities();
        setCities(data);
      } catch (err) {
        console.error("Gagal memuat daftar kota", err);
      }
    }
    loadCities();
  }, []);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !weight || !length || !width || !height) return;
    setIsLoading(true);
    setError("");
    try {
      const res = await calculateShippingRate(
        origin, destination, parseFloat(weight),
        { length: parseFloat(length), width: parseFloat(width), height: parseFloat(height) }
      );
      setResults(res);
    } catch (err: unknown) {
      setError((err as Error).message || "Gagal menghitung tarif.");
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: string) => {
    if (type === "darat") return Truck;
    if (type === "laut") return Ship;
    if (type === "udara") return Plane;
    return Package;
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Banner */}
        <section className="relative bg-[#111827] border-b border-gray-100/10">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 grayscale mix-blend-luminosity"
              style={{ backgroundImage: "url('/images/car-transport.png')" }}
            />
          </div>
          <div className="relative z-10 px-12 md:px-20 lg:px-32 xl:px-44 pb-20 pt-32 lg:pt-48 w-full max-w-[1500px] mx-auto">
            <h1 className="text-white leading-[1] tracking-tight">
              <span className="block font-light text-5xl lg:text-7xl mb-2">
                Pricing Calculator
              </span>
            </h1>
            <div className="mt-8 flex items-center gap-4">
              <span className="w-10 h-[2px] bg-red-600" />
              <span className="text-sm tracking-[0.2em] text-white/70 uppercase font-medium">
                Kalkulator Ongkos Kirim
              </span>
            </div>
          </div>
        </section>

        {/* Main Content — light section */}
        <section className="bg-white px-12 md:px-20 lg:px-32 xl:px-44 py-24 lg:py-36 max-w-[1500px] mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Form — Left */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-light text-[#111827] mb-8 pb-4 border-b border-gray-100">
                  <Calculator size={18} className="inline mr-2 text-gray-400" />
                  Kalkulator Ongkir
                </h2>

                <div className="flex flex-col gap-6">
                  {/* Origin */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 tracking-wider uppercase mb-3">
                      <MapPin size={12} className="inline mr-1" /> Kota Asal
                    </label>
                    <select
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#3D4550] py-3 text-[#111827] text-base font-light focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Pilih kota asal</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 tracking-wider uppercase mb-3">
                      <MapPin size={12} className="inline mr-1" /> Kota Tujuan
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#3D4550] py-3 text-[#111827] text-base font-light focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Pilih kota tujuan</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 tracking-wider uppercase mb-3">
                      <Weight size={12} className="inline mr-1" /> Berat Aktual (Kg)
                    </label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Masukkan berat dalam Kg"
                      required
                      className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#3D4550] py-3 text-[#111827] text-base font-light focus:outline-none transition-colors placeholder:text-gray-300"
                    />
                  </div>

                  {/* Dimensions */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 tracking-wider uppercase mb-3">
                      <Package size={12} className="inline mr-1" /> Dimensi (cm) — Panjang × Lebar × Tinggi
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { val: length, set: setLength, ph: "Panjang" },
                        { val: width,  set: setWidth,  ph: "Lebar"   },
                        { val: height, set: setHeight, ph: "Tinggi"  },
                      ].map(({ val, set, ph }) => (
                        <input
                          key={ph}
                          type="number"
                          min="1"
                          step="1"
                          value={val}
                          onChange={(e) => set(e.target.value)}
                          placeholder={ph}
                          required
                          className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#3D4550] py-3 text-[#111827] text-base font-light focus:outline-none transition-colors placeholder:text-gray-300 text-center"
                        />
                      ))}
                    </div>
                    {/* Live volumetric preview */}
                    {volumetricPreview !== null && (
                      <div className="mt-3 p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-500 font-light space-y-1">
                        <div className="flex justify-between">
                          <span>Berat Volume (est.):</span>
                          <span className="font-medium text-[#111827]">{volumetricPreview} Kg</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-1">
                          <span>Acuan yg Digunakan:</span>
                          <span className="font-semibold text-red-600">{chargeablePreview} Kg</span>
                        </div>
                        <p className="text-[10px] text-gray-400 pt-1">* Estimasi pakai divisor 6000. Divisor per-rute diterapkan saat submit.</p>
                      </div>
                    )}
                  </div>

                  {/* Submit pill */}
                  <button
                    type="submit"
                    disabled={isLoading || !origin || !destination || !weight || !length || !width || !height}
                    className="nics-pill group mt-4 self-start disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span className="nics-pill__text">
                      <span className="nics-pill__label">
                        {isLoading ? "Menghitung..." : "Cek Harga"}
                      </span>
                    </span>
                    <span className="nics-pill__badge">
                      <ArrowRight size={16} />
                    </span>
                  </button>
                </div>
              </form>
            </div>

            {/* Results — Right */}
            <div className="lg:col-span-3">
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm flex items-start gap-3">
                  <span className="font-semibold text-red-700">Error:</span> {error}
                </div>
              )}

              {results ? (
                <div>
                  {/* Route Summary + Weight Breakdown */}
                  <div className="flex flex-wrap items-center gap-4 text-sm mb-6 pb-6 border-b border-gray-100">
                    <span className="font-medium text-[#111827]">{results.origin}</span>
                    <ArrowRight className="text-gray-300" size={16} />
                    <span className="font-medium text-[#111827]">{results.destination}</span>
                    <div className="ml-auto flex flex-col items-end gap-1">
                      <span className="text-xs font-medium text-gray-400 border border-gray-200 px-3 py-1 rounded-full">
                        Aktual: {results.weight_kg} Kg
                      </span>
                      {results.volumetric_weight !== null && (
                        <span className="text-xs font-medium text-amber-600 border border-amber-200 bg-amber-50 px-3 py-1 rounded-full">
                          Volume: {results.volumetric_weight} Kg
                        </span>
                      )}
                      <span className="text-xs font-semibold text-red-600 border border-red-200 bg-red-50 px-3 py-1 rounded-full">
                        Acuan: {results.chargeable_weight} Kg
                        {results.volume_divisor && ` ÷${results.volume_divisor}`}
                      </span>
                    </div>
                  </div>

                  {/* Price Cards */}
                  <div className="flex flex-col gap-6">
                    {results.rates.length > 0 ? (
                      results.rates.map((result, i) => {
                        const IconComp = getIcon(result.service_type);
                        return (
                          <div
                            key={result.service_type}
                            className={`border rounded-2xl p-6 lg:p-8 transition-all hover:shadow-lg ${
                              i === 0
                                ? "border-[#3D4550] bg-[#3D4550]/[0.02]"
                                : "border-gray-100"
                            }`}
                          >
                            {i === 0 && (
                              <span className="text-[10px] font-medium text-white bg-[#3D4550] px-2.5 py-1 rounded-full tracking-wider uppercase mb-4 inline-block">
                                Rekomendasi
                              </span>
                            )}
                            <div className="flex items-start justify-between gap-6">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                                  <IconComp size={20} className="text-gray-500" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-light text-[#111827] mb-1">
                                    {result.label}
                                  </h3>
                                  <p className="text-xs text-gray-500 font-light mb-3">
                                    {result.description}
                                  </p>
                                  <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1 text-xs text-gray-400">
                                      <Clock size={14} /> {result.estimated_days}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-gray-400">
                                      <ShieldCheck size={14} /> Asuransi
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <p
                                  className="font-extralight text-[#111827]"
                                  style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                                >
                                  {formatCurrency(result.total_price)}
                                </p>
                                <p className="text-xs text-gray-400 font-light">Estimasi</p>
                              </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                              <a
                                href={`https://wa.me/6281146602305?text=Halo%20CAM%20Kargo%2C%20saya%20ingin%20kirim%20barang%20${results.weight_kg}%20Kg%20dari%20${results.origin}%20ke%20${results.destination}%20via%20${result.label}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="nics-pill group"
                              >
                                <span className="nics-pill__text">
                                  <span className="nics-pill__label">Pesan via WhatsApp</span>
                                </span>
                                <span className="nics-pill__badge">
                                  <ArrowRight size={16} />
                                </span>
                              </a>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-12 text-center border border-dashed border-gray-300 rounded-2xl bg-gray-50">
                        <Package size={32} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">Tarif Belum Tersedia</h3>
                        <p className="text-sm text-gray-500">
                          Mohon maaf, saat ini estimasi tarif otomatis untuk rute <b>{results.origin}</b> ke <b>{results.destination}</b> belum tersedia di sistem.
                        </p>
                        <a
                          href={`https://wa.me/6281146602305?text=Halo%20CAM%20Kargo%2C%20saya%20ingin%20bertanya%20tarif%20pengiriman%20dari%20${results.origin}%20ke%20${results.destination}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-6 px-6 py-2 bg-[#111827] text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
                        >
                          Tanyakan via WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 text-center mt-6 font-light">
                    * Harga di atas adalah estimasi. Hubungi kami untuk penawaran resmi.
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full py-20">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center mx-auto mb-6">
                      <Package size={24} className="text-gray-300" />
                    </div>
                    <p className="text-sm font-light text-gray-500">
                      Isi form di samping untuk melihat estimasi harga
                    </p>
                    <p className="text-xs text-gray-400 mt-1 font-light">
                      Pilih kota asal, tujuan, dan berat barang
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
