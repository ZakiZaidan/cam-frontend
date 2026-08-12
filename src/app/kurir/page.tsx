"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const QrScannerModal = dynamic(() => import("@/components/QrScannerModal"), { ssr: false });
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Package,
  MapPin,
  CheckCircle,
  Truck,
  Clock,
  Navigation,
  QrCode,
  History,
  LogOut,
  ChevronRight,
  Phone,
  PackageCheck,
  User,
  ArrowLeft,
  RefreshCw,
  Loader2,
  AlertCircle,
} from "lucide-react";

import {
  loginUser,
  getCourierPackages,
  getCourierHistory,
  updatePackageStatus,
  type CourierPackage,
  type CourierData,
  type HistoryItem,
  type LoginResult,
} from "@/lib/api";

const statusLabels: Record<string, string> = {
  picked_up: "Dijemput",
  in_warehouse: "Di Gudang",
  in_transit: "Dalam Perjalanan",
  out_for_delivery: "Sedang Diantar",
  delivered: "Terkirim",
};

const statusBadges: Record<string, { className: string }> = {
  picked_up: { className: "bg-blue-50 text-blue-700 border border-blue-200" },
  in_warehouse: { className: "bg-slate-50 text-slate-700 border border-slate-200" },
  in_transit: { className: "bg-amber-50 text-amber-700 border border-amber-200" },
  out_for_delivery: { className: "bg-red-50 text-red-700 border border-red-200" },
  delivered: { className: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
};

const STATUS_STEPS = [
  { key: "picked_up", label: "Dijemput", icon: <PackageCheck size={16} /> },
  { key: "in_warehouse", label: "Di Gudang", icon: <Package size={16} /> },
  { key: "in_transit", label: "Dalam Perjalanan", icon: <Truck size={16} /> },
  { key: "out_for_delivery", label: "Sedang Diantar", icon: <MapPin size={16} /> },
  { key: "delivered", label: "Terkirim", icon: <CheckCircle size={16} /> },
];

// ─── Status Update Modal ──────────────────────────────────────────────────────

function StatusUpdateModal({
  resi,
  currentStatus,
  token,
  onClose,
  onSuccess,
}: {
  resi: string;
  currentStatus: string;
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gettingLocation, setGettingLocation] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const getGPS = () => {
    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocation(`GPS: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
        setGettingLocation(false);
      },
      () => {
        setGettingLocation(false);
        setError("Tidak bisa mendapatkan GPS. Isi lokasi manual.");
      }
    );
  };

  const handleSubmit = async () => {
    if (!location.trim()) { setError("Lokasi wajib diisi."); return; }
    setLoading(true);
    setError("");
    try {
      await updatePackageStatus(
        token, resi, selectedStatus, location, description || undefined,
        coords?.lat, coords?.lng
      );
      onSuccess();
      onClose();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal update status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center">
      <div className="w-full max-w-md bg-white rounded-t-3xl p-6 pb-10 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900">Update Status Paket</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
        </div>
        <p className="text-xs font-mono text-red-600 font-bold mb-4">{resi}</p>

        {/* Status selector */}
        <div className="flex flex-col gap-2 mb-4">
          {STATUS_STEPS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSelectedStatus(s.key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                selectedStatus === s.key
                  ? "bg-red-600 text-white border-red-600"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>

        {/* Location input */}
        <div className="mb-3">
          <label className="text-xs font-semibold text-slate-600 mb-1 block">Lokasi Saat Ini *</label>
          <div className="flex gap-2">
            <Input
              placeholder="Contoh: Jl. Sudirman, Surabaya"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 border-slate-300 text-slate-900 bg-white text-sm"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={getGPS}
              disabled={gettingLocation}
              className="shrink-0 border-slate-300"
              title="Gunakan GPS"
            >
              {gettingLocation ? <Loader2 size={16} className="animate-spin" /> : <Navigation size={16} />}
            </Button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-600 mb-1 block">Keterangan (Opsional)</label>
          <Input
            placeholder="Contoh: Paket sudah diserahkan ke penerima"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-slate-300 text-slate-900 bg-white text-sm"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-xs font-medium mb-3">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl py-3"
        >
          {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
          Simpan Status
        </Button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function KurirDashboard() {
  const [authData, setAuthData] = useState<LoginResult | null>(null);
  const [courierData, setCourierData] = useState<CourierData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<CourierPackage | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [manualResi, setManualResi] = useState("");
  const [updatingResi, setUpdatingResi] = useState<string | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true); // true while restoring session

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Loading states
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState("");

  const token = authData?.token ?? "";

  // ── Restore session from localStorage on mount ────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem("kurir_auth");
    if (!stored) { setSessionLoading(false); return; }

    const parsed: LoginResult = JSON.parse(stored);
    // Validate the stored token is still valid by calling /auth/me
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/auth/me`, {
      headers: { Authorization: `Bearer ${parsed.token}`, Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((json) => {
        // If token is valid and user is still active and still a kurir
        if (json?.data?.role === "kurir" && json?.data?.is_active) {
          setAuthData(parsed);
        } else {
          localStorage.removeItem("kurir_auth");
        }
      })
      .catch(() => localStorage.removeItem("kurir_auth"))
      .finally(() => setSessionLoading(false));
  }, []);

  const fetchData = useCallback(async (t: string) => {
    setDataLoading(true);
    setDataError("");
    try {
      const [pkgData, hist] = await Promise.all([
        getCourierPackages(t),
        getCourierHistory(t),
      ]);
      setCourierData(pkgData);
      setHistory(hist);
    } catch (e: unknown) {
      setDataError(e instanceof Error ? e.message : "Gagal memuat data.");
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) fetchData(token);
  }, [token, fetchData]);

  const handleScanSuccess = (resi: string) => {
    setShowScanner(false);
    setScanResult(resi);
    setManualResi(resi);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const result = await loginUser(loginEmail, loginPassword);
      if (result.user.role !== "kurir") {
        setLoginError("Akun ini bukan akun Kurir.");
        return;
      }
      // Persist session to localStorage
      localStorage.setItem("kurir_auth", JSON.stringify(result));
      setAuthData(result);
    } catch (e: unknown) {
      setLoginError(e instanceof Error ? e.message : "Login gagal.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("kurir_auth");
    setAuthData(null);
    setCourierData(null);
    setHistory([]);
    setSelectedPackage(null);
  };

  // ── Session restoring splash screen ──────────────────────────────────────
  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={36} className="animate-spin text-red-600 mx-auto mb-3" />
          <p className="text-xs text-slate-500 font-medium">Memeriksa sesi...</p>
        </div>
      </div>
    );
  }

  // ── Login screen ─────────────────────────────────────────────────────────
  if (!authData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Image src="/logo/camLogo.png" alt="CAM Cargo" width={64} height={64} className="mx-auto mb-4" />
            <h1 className="text-xl font-extrabold text-slate-900">Dashboard Kurir</h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">CAM Cargo — Masuk untuk melanjutkan</p>
          </div>

          <Card className="border-slate-200 bg-white shadow-md rounded-2xl">
            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Email / ID Kurir</label>
                  <Input
                    type="text"
                    placeholder="Masukkan email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="border-slate-300 bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Password</label>
                  <Input
                    type="password"
                    placeholder="Masukkan password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="border-slate-300 bg-white text-slate-900"
                  />
                </div>
                {loginError && (
                  <div className="flex items-center gap-2 text-red-600 text-xs font-semibold">
                    <AlertCircle size={14} />
                    {loginError}
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl"
                >
                  {loginLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
                  Masuk
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ── Loading / Error state after login ────────────────────────────────────
  if (dataLoading && !courierData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-sm text-slate-500 font-medium">Memuat data paket...</p>
        </div>
      </div>
    );
  }

  if (dataError && !courierData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 gap-4">
        <AlertCircle size={40} className="text-red-500" />
        <p className="text-sm text-slate-700 font-semibold text-center">{dataError}</p>
        <Button onClick={() => fetchData(token)} className="bg-red-600 hover:bg-red-700 text-white rounded-xl">
          Coba Lagi
        </Button>
      </div>
    );
  }

  const stats = courierData?.today_stats ?? { delivered: 0, in_progress: 0, pending: 0 };
  const packages = courierData?.packages ?? [];
  const courierInfo = courierData?.courier ?? authData.user;

  // ── Package detail view ───────────────────────────────────────────────────
  if (selectedPackage) {
    const pkg = selectedPackage;
    return (
      <>
        <div className="min-h-screen bg-slate-50 pb-24">
          {/* Header */}
          <div className="sticky top-0 z-40 px-4 py-3 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center gap-3 shadow-xs">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedPackage(null)}
              className="text-slate-700 hover:bg-slate-100"
            >
              <ArrowLeft data-icon="inline-start" size={18} />
            </Button>
            <div>
              <p className="text-sm font-bold text-slate-900">{pkg.resi}</p>
              <p className="text-xs text-slate-500 font-medium">Detail Paket</p>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-4">
            {/* Status Card */}
            <Card className="border-slate-200 bg-white shadow-xs rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-500">Status Saat Ini</span>
                  <Badge className={statusBadges[pkg.status]?.className}>
                    {statusLabels[pkg.status]}
                  </Badge>
                </div>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm"
                  onClick={() => setUpdatingResi(pkg.resi)}
                >
                  <RefreshCw data-icon="inline-start" size={14} />
                  Update Status Paket
                </Button>
              </CardContent>
            </Card>

            {/* Recipient Info */}
            <Card className="border-slate-200 bg-white shadow-xs rounded-2xl">
              <CardContent className="p-4">
                <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Penerima</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-slate-400" />
                    <span className="text-sm font-bold text-slate-900">{pkg.recipient}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-slate-400 mt-0.5" />
                    <span className="text-sm text-slate-600">{pkg.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-slate-400" />
                    <a href={`tel:${pkg.phone}`} className="text-sm text-emerald-600 font-bold">
                      {pkg.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Item Info */}
            <Card className="border-slate-200 bg-white shadow-xs rounded-2xl">
              <CardContent className="p-4">
                <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Detail Barang</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{pkg.item}</p>
                    <p className="text-xs text-slate-500 font-medium">Berat: {pkg.weight}</p>
                  </div>
                  <Package size={22} className="text-slate-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Status Update Modal */}
        {updatingResi && (
          <StatusUpdateModal
            resi={updatingResi}
            currentStatus={pkg.status}
            token={token}
            onClose={() => setUpdatingResi(null)}
            onSuccess={() => {
              fetchData(token);
              setSelectedPackage(null);
            }}
          />
        )}
      </>
    );
  }

  // ── Main dashboard ────────────────────────────────────────────────────────
  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-24">
        {/* Header */}
        <div className="sticky top-0 z-40 px-4 py-3 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-10 border border-slate-200">
                <AvatarFallback className="bg-red-50 text-red-600 font-bold text-sm">
                  {authData.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-bold text-slate-900">{authData.user.name}</p>
                <p className="text-xs text-slate-500 font-medium">
                  ID: {(courierInfo as { courier_id?: string }).courier_id ?? "—"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fetchData(token)}
                disabled={dataLoading}
                className="text-slate-500 hover:text-slate-900"
              >
                <RefreshCw size={18} className={dataLoading ? "animate-spin" : ""} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-slate-500 hover:text-slate-900"
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <CheckCircle size={18} />, value: stats.delivered, label: "Terkirim", accent: "text-emerald-600 bg-emerald-50" },
              { icon: <Truck size={18} />, value: stats.in_progress, label: "Proses", accent: "text-red-600 bg-red-50" },
              { icon: <Clock size={18} />, value: stats.pending, label: "Pending", accent: "text-amber-600 bg-amber-50" },
            ].map((stat) => (
              <Card key={stat.label} className="border-slate-200 bg-white shadow-xs text-center rounded-2xl">
                <CardContent className="p-3">
                  <div className={`size-8 rounded-lg ${stat.accent} mx-auto mb-1 flex items-center justify-center`}>
                    {stat.icon}
                  </div>
                  <p className="text-xl font-extrabold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500 font-semibold">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="packages" className="px-4">
          {/* Packages Tab */}
          <TabsContent value="packages" className="mt-0 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Package size={16} className="text-red-600" />
              Paket Hari Ini ({packages.length})
            </h3>

            {packages.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Package size={40} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm font-semibold">Tidak ada paket aktif</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {packages.map((p) => (
                  <Card
                    key={p.resi}
                    onClick={() => setSelectedPackage(p)}
                    className="border-slate-200 bg-white shadow-xs cursor-pointer hover:border-red-300 hover:shadow-md transition-all rounded-2xl"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-red-600 font-bold">{p.resi}</span>
                        <Badge className={statusBadges[p.status]?.className}>
                          {statusLabels[p.status]}
                        </Badge>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mb-1">{p.recipient}</p>
                      <div className="flex items-start gap-1.5">
                        <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-slate-600">{p.address}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                        <span className="text-xs text-slate-500 font-medium">{p.item} • {p.weight}</span>
                        <ChevronRight size={16} className="text-slate-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Scan Tab */}
          <TabsContent value="scan" className="mt-0">
            <div className="text-center py-12">
              <div className="size-24 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center mx-auto mb-4 text-slate-400">
                <QrCode size={40} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Scan QR / Barcode</h3>
              <p className="text-sm text-slate-500 mb-6">Arahkan kamera ke kode QR atau barcode pada paket</p>
              <Button
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl"
                onClick={() => { setScanResult(null); setShowScanner(true); }}
              >
                <QrCode data-icon="inline-start" />
                Buka Kamera
              </Button>

              {scanResult && (
                <div className="mt-4 mx-auto max-w-xs bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <CheckCircle size={18} className="text-emerald-600 shrink-0" />
                  <div className="text-left">
                    <p className="text-xs text-emerald-700 font-semibold">QR berhasil discan!</p>
                    <p className="text-xs font-mono text-emerald-900 font-bold">{scanResult}</p>
                  </div>
                </div>
              )}

              <Card className="mt-8 border-slate-200 bg-white shadow-xs rounded-2xl">
                <CardContent className="p-4">
                  <p className="text-xs font-semibold text-slate-500 mb-2">Atau masukkan nomor resi manual:</p>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="CAM-2025-XXXXX"
                      value={manualResi}
                      onChange={(e) => setManualResi(e.target.value)}
                      className="flex-1 border-slate-300 bg-white text-slate-900"
                    />
                    <Button
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                      onClick={() => {
                        const resi = manualResi.trim().toUpperCase();
                        if (resi) {
                          setScanResult(resi);
                          const found = packages.find((p) => p.resi === resi);
                          if (found) setSelectedPackage(found);
                        }
                      }}
                    >Cari</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-0 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <History size={16} className="text-red-600" />
              Riwayat Pengiriman Hari Ini
            </h3>

            {history.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <History size={40} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm font-semibold">Belum ada riwayat hari ini</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {history.map((h) => (
                  <Card key={h.resi} className="border-slate-200 bg-white shadow-xs rounded-2xl">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-mono text-slate-400 font-medium">{h.resi}</p>
                        <p className="text-sm font-bold text-slate-900">{h.recipient}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                          Terkirim
                        </Badge>
                        <p className="text-xs text-slate-500 font-medium mt-1">{h.time}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 shadow-lg">
            <TabsList className="w-full h-16 bg-transparent justify-around rounded-none p-0">
              <TabsTrigger
                value="packages"
                className="flex-1 flex flex-col items-center gap-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:text-red-600 text-slate-500 font-medium"
              >
                <Package size={20} />
                <span className="text-xs">Paket</span>
              </TabsTrigger>
              <TabsTrigger
                value="scan"
                className="flex-1 flex flex-col items-center gap-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:text-red-600 text-slate-500 font-medium"
              >
                <QrCode size={20} />
                <span className="text-xs">Scan</span>
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="flex-1 flex flex-col items-center gap-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:text-red-600 text-slate-500 font-medium"
              >
                <History size={20} />
                <span className="text-xs">Riwayat</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>

      {/* QR Scanner Modal */}
      {showScanner && (
        <QrScannerModal
          onScan={handleScanSuccess}
          onClose={() => setShowScanner(false)}
        />
      )}
    </>
  );
}
