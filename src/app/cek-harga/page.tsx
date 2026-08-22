"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  Search,
  X,
  ChevronDown,
} from "lucide-react";
import { calculateShippingRate, getAvailableCities, ShippingRateResult } from "@/lib/api";

// ─── Searchable City Combobox ─────────────────────────────────────────────────
function CitySearch({
  value, onChange, cities, placeholder, id,
}: {
  value: string;
  onChange: (v: string) => void;
  cities: string[];
  placeholder: string;
  id: string;
}) {
  const [query, setQuery]     = useState(value);
  const [open, setOpen]       = useState(false);
  const [focused, setFocused] = useState(-1);
  const containerRef          = useRef<HTMLDivElement>(null);
  const listRef               = useRef<HTMLUListElement>(null);

  // Sync query when value is reset from outside
  useEffect(() => { setQuery(value); }, [value]);

  const filtered = useCallback(() => {
    if (!query.trim()) return cities.slice(0, 80);
    const q = query.toLowerCase();
    const startsWith: string[] = [];
    const contains:   string[] = [];
    for (const c of cities) {
      const lower = c.toLowerCase();
      if (lower.startsWith(q))       startsWith.push(c);
      else if (lower.includes(q))    contains.push(c);
    }
    return [...startsWith, ...contains].slice(0, 80);
  }, [query, cities]);

  const results = filtered();

  const select = (city: string) => {
    onChange(city);
    setQuery(city);
    setOpen(false);
    setFocused(-1);
  };

  const clear = () => {
    onChange("");
    setQuery("");
    setOpen(true);
    setFocused(-1);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        // If nothing selected, reset query
        if (!value) setQuery("");
        else setQuery(value);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [value]);

  // Keyboard nav
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) { if (e.key === "ArrowDown" || e.key === "Enter") setOpen(true); return; }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocused((f) => Math.min(f + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocused((f) => Math.max(f - 1, 0));
    } else if (e.key === "Enter" && focused >= 0) {
      e.preventDefault();
      select(results[focused]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery(value);
    }
  };

  // Scroll focused item into view
  useEffect(() => {
    if (focused >= 0 && listRef.current) {
      const item = listRef.current.children[focused] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [focused]);

  const isSelected = value && value === query;

  return (
    <div ref={containerRef} className="relative" id={id}>
      {/* Input */}
      <div className={`flex items-center border-b-2 transition-colors ${
        open ? "border-[#3D4550]" : "border-gray-200"
      }`}>
        <Search size={14} className="text-gray-400 flex-shrink-0 mr-2" />
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setFocused(-1); onChange(""); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          className="flex-1 bg-transparent py-3 text-[#111827] text-base font-light focus:outline-none placeholder:text-gray-300"
        />
        {isSelected ? (
          <button type="button" onClick={clear} className="text-gray-400 hover:text-gray-600 transition flex-shrink-0">
            <X size={14} />
          </button>
        ) : (
          <ChevronDown size={14} className={`text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-gray-200/60 overflow-hidden">
          <ul
            ref={listRef}
            className="max-h-56 overflow-y-auto py-1"
            style={{ scrollbarWidth: "thin" }}
          >
            {results.map((city, i) => (
              <li
                key={city}
                onMouseDown={() => select(city)}
                className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer text-sm transition-colors ${
                  i === focused
                    ? "bg-gray-100 text-[#111827]"
                    : city === value
                    ? "bg-red-50 text-red-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <MapPin size={11} className={city === value ? "text-red-500" : "text-gray-300"} />
                <span className="leading-tight">{city}</span>
              </li>
            ))}
          </ul>
          {query && results.length === 0 && (
            <div className="px-4 py-4 text-sm text-gray-400 text-center">Kota tidak ditemukan</div>
          )}
        </div>
      )}
    </div>
  );
}


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
    if (!origin || !destination || !weight) return;
    setIsLoading(true);
    setError("");
    try {
      // Mode saat ini: hanya hitung per kg (dimensi belum aktif)
      const res = await calculateShippingRate(
        origin, destination, parseFloat(weight)
      );
      setResults(res);
    } catch (err: unknown) {
      const msg = (err as Error).message || "Gagal menghitung tarif.";
      setError(msg);
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
          <div className="relative z-10 px-5 md:px-20 lg:px-32 xl:px-44 pb-20 pt-32 lg:pt-48 w-full max-w-[1500px] mx-auto">
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
        <section className="bg-white px-5 md:px-20 lg:px-32 xl:px-44 py-16 lg:py-36 max-w-[1500px] mx-auto">
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
                    <CitySearch
                      id="origin-search"
                      value={origin}
                      onChange={setOrigin}
                      cities={cities}
                      placeholder="Cari kota asal..."
                    />
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 tracking-wider uppercase mb-3">
                      <MapPin size={12} className="inline mr-1" /> Kota Tujuan
                    </label>
                    <CitySearch
                      id="destination-search"
                      value={destination}
                      onChange={setDestination}
                      cities={cities}
                      placeholder="Cari kota tujuan..."
                    />
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

                  {/* Dimensions — disabled, coming soon */}
                  <div className="opacity-50">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-xs font-medium text-gray-400 tracking-wider uppercase">
                        <Package size={12} className="inline mr-1" /> Dimensi (cm) — Panjang × Lebar × Tinggi
                      </label>
                      <span className="text-[10px] font-semibold tracking-wider uppercase bg-amber-100 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full">
                        Segera Hadir
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {["Panjang", "Lebar", "Tinggi"].map((ph) => (
                        <input
                          key={ph}
                          type="number"
                          disabled
                          placeholder={ph}
                          className="w-full bg-gray-50 border-b-2 border-gray-100 py-3 text-gray-300 text-base font-light focus:outline-none cursor-not-allowed text-center rounded-t-md"
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-[11px] text-gray-400 font-light">
                      Kalkulasi berat volume (P&times;L&times;T) akan segera tersedia.
                    </p>
                  </div>

                  {/* Submit pill */}
                  <button
                    type="submit"
                    disabled={isLoading || !origin || !destination || !weight}
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

              {/* Catatan rute tidak tersedia — selalu tampil */}
              <div className="mt-8 p-5 border border-gray-100 rounded-2xl bg-gray-50/60 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Rute tidak tersedia?</p>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    Jika rute yang Anda cari belum ada di sistem, silakan{" "}
                    <a
                      href="https://wa.me/6281146602305?text=Halo%20CAM%20Cargo%2C%20saya%20ingin%20menanyakan%20tarif%20pengiriman%20untuk%20rute%20yang%20belum%20tersedia%20di%20website."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 font-medium hover:underline transition"
                    >
                      hubungi admin via WhatsApp
                    </a>
                    {" "}— kami siap membantu memberikan informasi tarif terbaik untuk Anda.
                  </p>
                </div>
              </div>
            </div>

            {/* Results — Right */}
            <div className="lg:col-span-3">
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-5 bg-red-50 border border-red-100 rounded-2xl text-sm space-y-2">
                  <p className="text-red-600 font-medium">{error}</p>
                  <p className="text-gray-500 font-light text-[13px]">
                    Rute yang Anda cari mungkin belum tersedia di sistem kami.
                    Silakan{" "}
                    <a
                      href="https://wa.me/6281146602305?text=Halo%20CAM%20Cargo%2C%20saya%20ingin%20menanyakan%20tarif%20pengiriman%20untuk%20rute%20yang%20belum%20tersedia."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 font-medium underline underline-offset-2 hover:text-red-700 transition"
                    >
                      hubungi admin via WhatsApp
                    </a>
                    {" "}untuk informasi tarif lebih lanjut.
                  </p>
                </div>
              )}

              {results ? (
                <div>
                  {/* Route Summary + Weight Breakdown */}
                  {/* Route Summary + Weight Breakdown */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 text-sm mb-6 pb-6 border-b border-gray-100">
                    <div className="flex flex-wrap items-center gap-2 md:gap-4">
                      <span className="font-medium text-[#111827]">{results.origin}</span>
                      <ArrowRight className="text-gray-300 shrink-0" size={16} />
                      <span className="font-medium text-[#111827]">{results.destination}</span>
                    </div>
                    <div className="sm:ml-auto flex flex-row sm:flex-col items-center sm:items-end flex-wrap gap-2 sm:gap-1">
                      <span className="text-[11px] sm:text-xs font-medium text-gray-400 border border-gray-200 px-3 py-1 rounded-full">
                        Aktual: {results.weight_kg} Kg
                      </span>
                      {results.volumetric_weight !== null && (
                        <span className="text-[11px] sm:text-xs font-medium text-amber-600 border border-amber-200 bg-amber-50 px-3 py-1 rounded-full">
                          Volume: {results.volumetric_weight} Kg
                        </span>
                      )}
                      <span className="text-[11px] sm:text-xs font-semibold text-red-600 border border-red-200 bg-red-50 px-3 py-1 rounded-full">
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
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
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
                              <div className="sm:text-right shrink-0">
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
