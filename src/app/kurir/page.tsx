"use client";

import { useState } from "react";
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
} from "lucide-react";

// Dummy courier data
const COURIER_DATA = {
  name: "Rizki Kurniawan",
  id: "KUR-042",
  photo: null,
  todayStats: {
    delivered: 8,
    inProgress: 3,
    pending: 2,
  },
  packages: [
    {
      resi: "CAM-2025-00851",
      recipient: "Budi Santoso",
      address: "Jl. Sudirman No. 45, Surabaya",
      phone: "081234567890",
      status: "out_for_delivery",
      item: "Elektronik - Laptop",
      weight: "3 Kg",
    },
    {
      resi: "CAM-2025-00853",
      recipient: "Siti Rahayu",
      address: "Jl. Diponegoro No. 12, Surabaya",
      phone: "081345678901",
      status: "out_for_delivery",
      item: "Pakaian - 2 Koli",
      weight: "5 Kg",
    },
    {
      resi: "CAM-2025-00855",
      recipient: "Ahmad Fauzi",
      address: "Jl. Basuki Rahmat No. 78, Surabaya",
      phone: "081456789012",
      status: "picked_up",
      item: "Dokumen Penting",
      weight: "1 Kg",
    },
  ],
  history: [
    { resi: "CAM-2025-00840", recipient: "Dewi L.", status: "delivered", time: "09:30" },
    { resi: "CAM-2025-00838", recipient: "Hendra P.", status: "delivered", time: "10:15" },
    { resi: "CAM-2025-00836", recipient: "Rini A.", status: "delivered", time: "11:00" },
  ],
};

const statusLabels: Record<string, string> = {
  picked_up: "Dijemput",
  in_warehouse: "Di Gudang",
  in_transit: "Dalam Perjalanan",
  out_for_delivery: "Sedang Diantar",
  delivered: "Terkirim",
};

const statusBadges: Record<string, { className: string }> = {
  picked_up: { className: "bg-blue-50 text-blue-700 border border-blue-200" },
  in_transit: { className: "bg-amber-50 text-amber-700 border border-amber-200" },
  out_for_delivery: { className: "bg-red-50 text-red-700 border border-red-200" },
  delivered: { className: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
};

export default function KurirDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [manualResi, setManualResi] = useState("");

  const handleScanSuccess = (resi: string) => {
    setShowScanner(false);
    setScanResult(resi);
    // Auto-fill the manual input with scanned result
    setManualResi(resi);
  };

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <Image
              src="/logo/camLogo.png"
              alt="CAM Cargo"
              width={64}
              height={64}
              className="mx-auto mb-4"
            />
            <h1 className="text-xl font-extrabold text-slate-900">Dashboard Kurir</h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">CAM Cargo — Masuk untuk melanjutkan</p>
          </div>

          {/* Login Form */}
          <Card className="border-slate-200 bg-white shadow-md rounded-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Email / ID Kurir
                  </label>
                  <Input type="text" placeholder="Masukkan email atau ID" className="border-slate-300 bg-white text-slate-900" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Password
                  </label>
                  <Input type="password" placeholder="Masukkan password" className="border-slate-300 bg-white text-slate-900" />
                </div>
                <Button onClick={() => setIsLoggedIn(true)} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl">
                  Masuk
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const pkg = selectedPackage
    ? COURIER_DATA.packages.find((p) => p.resi === selectedPackage)
    : null;

  // Package detail view
  if (pkg) {
    return (
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
          {/* Status */}
          <Card className="border-slate-200 bg-white shadow-xs rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">Status Saat Ini</span>
                <Badge className={statusBadges[pkg.status]?.className}>
                  {statusLabels[pkg.status]}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-xs">
                  <CheckCircle data-icon="inline-start" size={14} />
                  Tandai Terkirim
                </Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs">
                  <Navigation data-icon="inline-start" size={14} />
                  Update Lokasi
                </Button>
              </div>
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

          {/* Status Update Options */}
          <Card className="border-slate-200 bg-white shadow-xs rounded-2xl">
            <CardContent className="p-4">
              <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Update Status</h3>
              <div className="flex flex-col gap-2">
                {[
                  { key: "picked_up", label: "Dijemput", icon: <PackageCheck size={16} /> },
                  { key: "in_transit", label: "Dalam Perjalanan", icon: <Truck size={16} /> },
                  { key: "out_for_delivery", label: "Sedang Diantar", icon: <MapPin size={16} /> },
                  { key: "delivered", label: "Terkirim", icon: <CheckCircle size={16} /> },
                ].map((s) => (
                  <Button
                    key={s.key}
                    variant={pkg.status === s.key ? "default" : "outline"}
                    className={`justify-start text-xs h-10 rounded-xl ${
                      pkg.status === s.key
                        ? "bg-red-600 text-white font-semibold"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {s.icon}
                    {s.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-24">
      {/* Top Header */}
      <div className="sticky top-0 z-40 px-4 py-3 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-10 border border-slate-200">
              <AvatarFallback className="bg-red-50 text-red-600 font-bold text-sm">
                {COURIER_DATA.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-bold text-slate-900">{COURIER_DATA.name}</p>
              <p className="text-xs text-slate-500 font-medium">ID: {COURIER_DATA.id}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsLoggedIn(false)}
            className="text-slate-500 hover:text-slate-900"
          >
            <LogOut size={18} />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              icon: <CheckCircle size={18} />,
              value: COURIER_DATA.todayStats.delivered,
              label: "Terkirim",
              accent: "text-emerald-600 bg-emerald-50",
            },
            {
              icon: <Truck size={18} />,
              value: COURIER_DATA.todayStats.inProgress,
              label: "Proses",
              accent: "text-red-600 bg-red-50",
            },
            {
              icon: <Clock size={18} />,
              value: COURIER_DATA.todayStats.pending,
              label: "Pending",
              accent: "text-amber-600 bg-amber-50",
            },
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

      {/* Main Tabs Container */}
      <Tabs defaultValue="packages" className="px-4">
        <TabsContent value="packages" className="mt-0 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Package size={16} className="text-red-600" />
            Paket Hari Ini ({COURIER_DATA.packages.length})
          </h3>
          <div className="flex flex-col gap-3">
            {COURIER_DATA.packages.map((p) => (
              <Card
                key={p.resi}
                onClick={() => setSelectedPackage(p.resi)}
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
        </TabsContent>

        <TabsContent value="scan" className="mt-0">
          <div className="text-center py-12">
            <div className="size-24 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center mx-auto mb-4 text-slate-400">
              <QrCode size={40} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Scan QR / Barcode</h3>
            <p className="text-sm text-slate-500 mb-6">
              Arahkan kamera ke kode QR atau barcode pada paket
            </p>
            <Button
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl"
              onClick={() => { setScanResult(null); setShowScanner(true); }}
            >
              <QrCode data-icon="inline-start" />
              Buka Kamera
            </Button>

            {/* Scan result feedback */}
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
                      if (manualResi.trim()) {
                        setScanResult(manualResi.trim());
                      }
                    }}
                  >Cari</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-0 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <History size={16} className="text-red-600" />
            Riwayat Pengiriman Hari Ini
          </h3>
          <div className="flex flex-col gap-2">
            {COURIER_DATA.history.map((h) => (
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
        </TabsContent>

        {/* Bottom Fixed Navigation Bar */}
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

    {/* QR Scanner Modal — full-screen overlay */}
    {showScanner && (
      <QrScannerModal
        onScan={handleScanSuccess}
        onClose={() => setShowScanner(false)}
      />
    )}
  </>
  );
}
