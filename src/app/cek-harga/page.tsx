"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MapPin, Weight, ArrowRight, Calculator,
  Truck, Ship, Plane, Clock, ShieldCheck, Package, ChevronDown, Search, X,
} from "lucide-react";
import { calculateShippingRate, getStructuredCities, ShippingRateResult, ProvinceData } from "@/lib/api";
import { INDONESIA_PROVINCES, KALTIM_PROVINCE_NAME } from "@/data/indonesia-cities";

// ─── Searchable Combobox ──────────────────────────────────────────────────────
function SearchableSelect({ id, value, onChange, options, placeholder, disabled = false }: {
  id: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder: string; disabled?: boolean;
}) {
  const [query, setQuery]     = useState(value);
  const [open, setOpen]       = useState(false);
  const [focused, setFocused] = useState(-1);
  const containerRef          = useRef<HTMLDivElement>(null);
  const listRef               = useRef<HTMLUListElement>(null);

  // Sync display when value changes externally (e.g. reset from parent)
  useEffect(() => { setQuery(value); }, [value]);

  const results = useCallback(() => {
    if (!query.trim()) return options.slice(0, 100);
    const q = query.toLowerCase();
    const starts: string[] = [], contains: string[] = [];
    for (const o of options) {
      const low = o.toLowerCase();
      if (low.startsWith(q)) starts.push(o);
      else if (low.includes(q)) contains.push(o);
    }
    return [...starts, ...contains].slice(0, 100);
  }, [query, options]);

  const items = results();

  const select = (v: string) => { onChange(v); setQuery(v); setOpen(false); setFocused(-1); };
  const clear  = () => { onChange(""); setQuery(""); setOpen(true); setFocused(-1); };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery(value || "");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [value]);

  // Keyboard nav
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!open) { if (e.key === "ArrowDown" || e.key === "Enter") { setOpen(true); } return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setFocused((f) => Math.min(f + 1, items.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setFocused((f) => Math.max(f - 1, 0)); }
    else if (e.key === "Enter" && focused >= 0) { e.preventDefault(); select(items[focused]); }
    else if (e.key === "Escape") { setOpen(false); setQuery(value || ""); }
  };

  // Scroll focused item
  useEffect(() => {
    if (focused >= 0 && listRef.current) {
      (listRef.current.children[focused] as HTMLElement)?.scrollIntoView({ block: "nearest" });
    }
  }, [focused]);

  return (
    <div ref={containerRef} className={`relative ${disabled ? "opacity-40 pointer-events-none" : ""}`} id={id}>
      <div className={`flex items-center border-b-2 transition-colors ${open ? "border-[#3D4550]" : value ? "border-[#3D4550]" : "border-gray-200"}`}>
        <Search size={13} className="text-gray-400 flex-shrink-0 mr-2" />
        <input
          type="text" value={query} placeholder={placeholder}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setFocused(-1); onChange(""); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          className="flex-1 bg-transparent py-3 text-[#111827] text-base font-light focus:outline-none placeholder:text-gray-300"
        />
        {value ? (
          <button type="button" onClick={clear} className="text-gray-400 hover:text-gray-600 transition flex-shrink-0">
            <X size={13} />
          </button>
        ) : (
          <ChevronDown size={13} className={`text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </div>
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-gray-200/60 overflow-hidden">
          {items.length > 0 ? (
            <ul ref={listRef} className="max-h-52 overflow-y-auto py-1" style={{ scrollbarWidth: "thin" }}>
              {items.map((item, i) => (
                <li key={item} onMouseDown={() => select(item)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer text-sm transition-colors ${
                    i === focused ? "bg-gray-100 text-[#111827]"
                    : item === value ? "bg-red-50 text-red-700"
                    : "text-gray-700 hover:bg-gray-50"
                  }`}>
                  <MapPin size={10} className={item === value ? "text-red-400" : "text-gray-300"} />
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-4 text-sm text-gray-400 text-center">Tidak ditemukan</div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Cascading Location Picker ────────────────────────────────────────────────
function LocationPicker({ idPrefix, label, kaltimKelurahanMap, onValueChange, showKelurahan = true }: {
  idPrefix: string; label: string;
  kaltimKelurahanMap: Record<string, string[]>;
  onValueChange: (city: string) => void;
  showKelurahan?: boolean;
}) {
  const [province, setProvince]   = useState("");
  const [city, setCity]           = useState("");
  const [kelurahan, setKelurahan] = useState("");

  const citiesInProv = useMemo(
    () => INDONESIA_PROVINCES.find((p) => p.name === province)?.cities ?? [],
    [province]
  );

  // Kelurahan hanya untuk tujuan Kaltim yang ada di API, dan kalau showKelurahan aktif
  const kelurahanList = useMemo(() => {
    if (!showKelurahan || province !== KALTIM_PROVINCE_NAME || !city) return [];
    return kaltimKelurahanMap[city] ?? [];
  }, [showKelurahan, province, city, kaltimKelurahanMap]);

  const hasKelurahan = kelurahanList.length > 0;

  // Value yang dikirim ke API:
  // - Jika showKelurahan=false (asal): hanya nama kota
  // - Jika showKelurahan=true (tujuan) & ada kelurahan: "Kelurahan, Kota"
  const finalValue = useMemo(() => {
    if (!city) return "";
    if (hasKelurahan && !kelurahan) return ""; // kelurahan wajib dipilih
    return hasKelurahan ? `${kelurahan}, ${city}` : city;
  }, [city, kelurahan, hasKelurahan]);

  useEffect(() => { onValueChange(finalValue); }, [finalValue, onValueChange]);

  const handleProvChange = (v: string) => { setProvince(v); setCity(""); setKelurahan(""); };
  const handleCityChange = (v: string) => { setCity(v); setKelurahan(""); };
  const provinceNames = useMemo(() => INDONESIA_PROVINCES.map((p) => p.name), []);

  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 tracking-wider uppercase mb-3">
        <MapPin size={12} className="inline mr-1" /> {label}
      </label>
      <div className="flex flex-col gap-3">
        <SearchableSelect
          id={`${idPrefix}-province`} value={province} onChange={handleProvChange}
          placeholder="Ketik atau pilih provinsi..." options={provinceNames}
        />
        {province && (
          <SearchableSelect
            id={`${idPrefix}-city`} value={city} onChange={handleCityChange}
            placeholder="Ketik atau pilih kabupaten / kota..." options={citiesInProv}
          />
        )}
        {/* Kelurahan hanya tampil untuk tujuan (showKelurahan=true) */}
        {city && hasKelurahan && (
          <SearchableSelect
            id={`${idPrefix}-kelurahan`} value={kelurahan} onChange={setKelurahan}
            placeholder="Ketik atau pilih kelurahan..." options={kelurahanList}
          />
        )}
        {finalValue && (
          <p className="text-xs text-gray-500 font-light pt-0.5">
            <MapPin size={10} className="inline mr-1 text-red-400" />{finalValue}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CekHargaPage() {
  const [kaltimData, setKaltimData]   = useState<ProvinceData[]>([]);
  const [originVal, setOriginVal]     = useState("");
  const [destVal, setDestVal]         = useState("");
  const [weight, setWeight]           = useState("");
  const [results, setResults]         = useState<ShippingRateResult | null>(null);
  const [isLoading, setIsLoading]     = useState(false);
  const [error, setError]             = useState("");

  useEffect(() => {
    getStructuredCities().then(setKaltimData).catch(console.error);
  }, []);

  // Map: "Kota Samarinda" => ["Air Hitam", ...]
  const kaltimKelurahanMap: Record<string, string[]> = useMemo(() => {
    const kaltimProv = kaltimData.find((p) => p.province === KALTIM_PROVINCE_NAME);
    if (!kaltimProv) return {};
    return Object.fromEntries(
      kaltimProv.cities.filter((c) => c.kelurahan).map((c) => [c.name, c.kelurahan!])
    );
  }, [kaltimData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originVal || !destVal || !weight) return;
    setIsLoading(true); setError("");
    try {
      const res = await calculateShippingRate(originVal, destVal, parseFloat(weight));
      setResults(res);
    } catch (err: unknown) {
      setError((err as Error).message || "Gagal menghitung tarif.");
      setResults(null);
    } finally { setIsLoading(false); }
  };

  const getIcon = (type: string) => type === "darat" ? Truck : type === "laut" ? Ship : type === "udara" ? Plane : Package;

  const fmt = (v: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);

  const canSubmit = !!originVal && !!destVal && !!weight;

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative bg-[#111827] border-b border-gray-100/10">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-cover bg-center opacity-20 grayscale mix-blend-luminosity" style={{ backgroundImage: "url('/images/car-transport.png')" }} />
          </div>
          <div className="relative z-10 px-5 md:px-20 lg:px-32 xl:px-44 pb-20 pt-32 lg:pt-48 w-full max-w-[1500px] mx-auto">
            <h1 className="text-white leading-[1] tracking-tight">
              <span className="block font-light text-5xl lg:text-7xl mb-2">Pricing Calculator</span>
            </h1>
            <div className="mt-8 flex items-center gap-4">
              <span className="w-10 h-[2px] bg-red-600" />
              <span className="text-sm tracking-[0.2em] text-white/70 uppercase font-medium">Kalkulator Ongkos Kirim</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-white px-5 md:px-20 lg:px-32 xl:px-44 py-16 lg:py-36 max-w-[1500px] mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">

            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-light text-[#111827] mb-8 pb-4 border-b border-gray-100">
                  <Calculator size={18} className="inline mr-2 text-gray-400" />Kalkulator Ongkir
                </h2>
                <div className="flex flex-col gap-7">

                  {/* Origin — tanpa kelurahan karena DB origin hanya level kota */}
                  <LocationPicker
                    idPrefix="origin"
                    label="Kota Asal"
                    kaltimKelurahanMap={kaltimKelurahanMap}
                    onValueChange={setOriginVal}
                    showKelurahan={false}
                  />

                  {/* Destination */}
                  <LocationPicker
                    idPrefix="dest"
                    label="Kota Tujuan"
                    kaltimKelurahanMap={kaltimKelurahanMap}
                    onValueChange={setDestVal}
                  />

                  {/* Weight */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 tracking-wider uppercase mb-3">
                      <Weight size={12} className="inline mr-1" /> Berat Aktual (Kg)
                    </label>
                    <input type="number" min="0.1" step="0.1" value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Masukkan berat dalam Kg" required
                      className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#3D4550] py-3 text-[#111827] text-base font-light focus:outline-none transition-colors placeholder:text-gray-300"
                    />
                  </div>

                  {/* Dimensions coming soon */}
                  <div className="opacity-50">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-xs font-medium text-gray-400 tracking-wider uppercase">
                        <Package size={12} className="inline mr-1" /> Dimensi (cm) — P × L × T
                      </label>
                      <span className="text-[10px] font-semibold tracking-wider uppercase bg-amber-100 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full">Segera Hadir</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {["Panjang","Lebar","Tinggi"].map((ph) => (
                        <input key={ph} type="number" disabled placeholder={ph}
                          className="w-full bg-gray-50 border-b-2 border-gray-100 py-3 text-gray-300 text-base font-light cursor-not-allowed text-center rounded-t-md" />
                      ))}
                    </div>
                    <p className="mt-2 text-[11px] text-gray-400 font-light">Kalkulasi berat volume (P&times;L&times;T) akan segera tersedia.</p>
                  </div>

                  <button type="submit" disabled={isLoading || !canSubmit}
                    className="nics-pill group mt-4 self-start disabled:opacity-40 disabled:cursor-not-allowed">
                    <span className="nics-pill__text"><span className="nics-pill__label">{isLoading ? "Menghitung..." : "Cek Harga"}</span></span>
                    <span className="nics-pill__badge"><ArrowRight size={16} /></span>
                  </button>
                </div>
              </form>

              <div className="mt-8 p-5 border border-gray-100 rounded-2xl bg-gray-50/60 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Rute tidak tersedia?</p>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    Silakan <a href="https://wa.me/6281146602305?text=Halo%20CAM%20Cargo%2C%20saya%20ingin%20menanyakan%20tarif%20pengiriman." target="_blank" rel="noopener noreferrer" className="text-red-600 font-medium hover:underline">hubungi admin via WhatsApp</a>
                    {" "}— kami siap membantu.
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {error && (
                <div className="mb-6 p-5 bg-red-50 border border-red-100 rounded-2xl text-sm space-y-2">
                  <p className="text-red-600 font-medium">{error}</p>
                  <p className="text-gray-500 font-light text-[13px]">
                    Rute belum tersedia di sistem. Silakan <a href="https://wa.me/6281146602305" target="_blank" rel="noopener noreferrer" className="text-red-600 font-medium underline underline-offset-2">hubungi admin via WhatsApp</a>.
                  </p>
                </div>
              )}

              {results ? (
                <div>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 text-sm mb-6 pb-6 border-b border-gray-100">
                    <div className="flex flex-wrap items-center gap-2 md:gap-4">
                      <span className="font-medium text-[#111827]">{results.origin}</span>
                      <ArrowRight className="text-gray-300 shrink-0" size={16} />
                      <span className="font-medium text-[#111827]">{results.destination}</span>
                    </div>
                    <div className="sm:ml-auto flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
                      <span className="text-[11px] sm:text-xs font-medium text-gray-400 border border-gray-200 px-3 py-1 rounded-full">Aktual: {results.weight_kg} Kg</span>
                      {results.volumetric_weight !== null && (
                        <span className="text-[11px] sm:text-xs font-medium text-amber-600 border border-amber-200 bg-amber-50 px-3 py-1 rounded-full">Volume: {results.volumetric_weight} Kg</span>
                      )}
                      <span className="text-[11px] sm:text-xs font-semibold text-red-600 border border-red-200 bg-red-50 px-3 py-1 rounded-full">
                        Acuan: {results.chargeable_weight} Kg{results.volume_divisor && ` ÷${results.volume_divisor}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    {results.rates.length > 0 ? (
                      results.rates.map((result, i) => {
                        const IconComp = getIcon(result.service_type);
                        return (
                          <div key={result.service_type}
                            className={`border rounded-2xl p-6 lg:p-8 transition-all hover:shadow-lg ${i === 0 ? "border-[#3D4550] bg-[#3D4550]/[0.02]" : "border-gray-100"}`}>
                            {i === 0 && <span className="text-[10px] font-medium text-white bg-[#3D4550] px-2.5 py-1 rounded-full tracking-wider uppercase mb-4 inline-block">Rekomendasi</span>}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                                  <IconComp size={20} className="text-gray-500" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-light text-[#111827] mb-1">{result.label}</h3>
                                  <p className="text-xs text-gray-500 font-light mb-3">{result.description}</p>
                                  <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1 text-xs text-gray-400"><Clock size={14} /> {result.estimated_days}</span>
                                    <span className="flex items-center gap-1 text-xs text-gray-400"><ShieldCheck size={14} /> Asuransi</span>
                                  </div>
                                </div>
                              </div>
                              <div className="sm:text-right shrink-0">
                                <p className="font-extralight text-[#111827]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>{fmt(result.total_price)}</p>
                                <p className="text-xs text-gray-400 font-light">Estimasi</p>
                              </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                              <a href={`https://wa.me/6281146602305?text=Halo%20CAM%20Kargo%2C%20saya%20ingin%20kirim%20barang%20${results.weight_kg}%20Kg%20dari%20${encodeURIComponent(results.origin)}%20ke%20${encodeURIComponent(results.destination)}%20via%20${result.label}`}
                                target="_blank" rel="noopener noreferrer" className="nics-pill group">
                                <span className="nics-pill__text"><span className="nics-pill__label">Pesan via WhatsApp</span></span>
                                <span className="nics-pill__badge"><ArrowRight size={16} /></span>
                              </a>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-12 text-center border border-dashed border-gray-300 rounded-2xl bg-gray-50">
                        <Package size={32} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">Tarif Belum Tersedia</h3>
                        <p className="text-sm text-gray-500 max-w-sm mx-auto">
                          Estimasi tarif otomatis untuk rute <b>{results.origin}</b> ke <b>{results.destination}</b> belum tersedia. Hubungi kami untuk penawaran khusus.
                        </p>
                        <a href={`https://wa.me/6281146602305?text=Halo%20CAM%20Kargo%2C%20saya%20ingin%20bertanya%20tarif%20dari%20${encodeURIComponent(results.origin)}%20ke%20${encodeURIComponent(results.destination)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="inline-block mt-6 px-6 py-2 bg-[#111827] text-white text-sm rounded-full hover:bg-gray-800 transition-colors">
                          Tanyakan via WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 text-center mt-6 font-light">* Harga di atas adalah estimasi. Hubungi kami untuk penawaran resmi.</p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full py-20">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center mx-auto mb-6">
                      <Package size={24} className="text-gray-300" />
                    </div>
                    <p className="text-sm font-light text-gray-500">Isi form di samping untuk melihat estimasi harga</p>
                    <p className="text-xs text-gray-400 mt-1 font-light">Pilih provinsi, kota, dan kelurahan tujuan</p>
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
