"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  Package, DollarSign, Clock, Truck, TrendingUp, TrendingDown,
  MapPin, ArrowUpRight, Eye, ChevronDown, Bell, AlertTriangle, CheckCircle, Loader2,
} from "lucide-react";
import {
  getDashboardKpi, getDashboardRevenue,
  getShipments,
  type DashboardKpi, type RevenuePoint, type Shipment,
} from "@/lib/admin-api";

const statusLabels: Record<string, string> = {
  picked_up: "Dijemput", in_warehouse: "Di Gudang",
  in_transit: "Dalam Perjalanan", out_for_delivery: "Diantar", delivered: "Terkirim",
};
const statusBadges: Record<string, string> = {
  picked_up: "bg-blue-50 text-blue-700 border-blue-200",
  in_warehouse: "bg-purple-50 text-purple-700 border-purple-200",
  in_transit: "bg-amber-50 text-amber-700 border-amber-200",
  out_for_delivery: "bg-red-50 text-red-700 border-red-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function AdminDashboard() {
  const [kpi, setKpi]             = useState<DashboardKpi | null>(null);
  const [revenue, setRevenue]     = useState<RevenuePoint[]>([]);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    Promise.all([getDashboardKpi(), getDashboardRevenue(), getShipments({ per_page: 5 })])
      .then(([kpiData, revData, shipData]) => {
        setKpi(kpiData);
        setRevenue(revData);
        setShipments(shipData.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const maxRevenue = Math.max(...revenue.map((d) => d.value), 1);

  const KPI_CONFIG = kpi
    ? [
        { title: "Total Pengiriman", value: kpi.total_shipments.toLocaleString(), change: kpi.shipment_change, isUp: kpi.shipment_change.startsWith("+"), icon: <Package size={20} />, accent: "text-red-600 bg-red-50 border-red-200", period: "Bulan ini" },
        { title: "Pendapatan", value: `Rp ${(kpi.revenue / 1_000_000).toFixed(1)}M`, change: kpi.revenue_change, isUp: kpi.revenue_change.startsWith("+"), icon: <DollarSign size={20} />, accent: "text-emerald-600 bg-emerald-50 border-emerald-200", period: "Bulan ini" },
        { title: "On-Time Delivery", value: kpi.on_time_rate, change: "+2.1%", isUp: true, icon: <Clock size={20} />, accent: "text-blue-600 bg-blue-50 border-blue-200", period: "Rata-rata" },
        { title: "Paket Aktif", value: kpi.active_packages.toString(), change: kpi.shipment_change, isUp: false, icon: <Truck size={20} />, accent: "text-amber-600 bg-amber-50 border-amber-200", period: "Saat ini" },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={28} className="animate-spin text-red-500" />
      </div>
    );
  }

  return (
    <>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Dashboard Overview</h1>
        <p className="text-sm text-slate-600">Selamat datang kembali, Admin! Berikut ringkasan operasional hari ini.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {KPI_CONFIG.map((kpi) => (
          <Card key={kpi.title} className="border-slate-200 bg-white shadow-xs rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`size-10 rounded-xl border ${kpi.accent} flex items-center justify-center`}>{kpi.icon}</div>
                <div className={`flex items-center gap-1 text-xs font-bold ${kpi.isUp ? "text-emerald-600" : "text-red-600"}`}>
                  {kpi.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {kpi.change}
                </div>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{kpi.value}</p>
              <p className="text-xs text-slate-500 font-medium mt-1">{kpi.title} • {kpi.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <Card className="xl:col-span-2 border-slate-200 bg-white shadow-xs rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Tren Pendapatan</h3>
                <p className="text-xs text-slate-500">7 bulan terakhir (dalam jutaan Rp)</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-slate-600 hover:bg-slate-100">
                Bulan Ini <ChevronDown size={12} />
              </Button>
            </div>
            <div className="flex items-end justify-between gap-2 h-48 pt-4">
              {revenue.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">{d.value}M</span>
                  <div
                    className={`w-full rounded-t-xl transition-all duration-500 ${i === revenue.length - 1 ? "bg-gradient-to-t from-red-600 to-red-500 shadow-xs" : "bg-slate-100 hover:bg-slate-200"}`}
                    style={{ height: `${(d.value / maxRevenue) * 100}%`, minHeight: "20px" }}
                  />
                  <span className="text-xs font-bold text-slate-700">{d.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-slate-200 bg-white shadow-xs rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Notifikasi</h3>
              {kpi && kpi.unread_contacts > 0 && (
                <Badge variant="secondary" className="bg-red-50 text-red-700 border border-red-200 font-bold">
                  {kpi.unread_contacts} baru
                </Badge>
              )}
            </div>
            <div className="flex flex-col gap-3">
              {[
                { type: "warning", message: "Cek paket yang melebihi estimasi", time: "Tadi" },
                { type: kpi && kpi.unread_contacts > 0 ? "info" : "success", message: kpi && kpi.unread_contacts > 0 ? `${kpi.unread_contacts} pesan baru dari pelanggan` : "Semua pesan sudah dibaca", time: "Tadi" },
                { type: "success", message: `${kpi?.active_packages ?? 0} paket sedang aktif dalam pengiriman`, time: "Hari ini" },
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${alert.type === "warning" ? "bg-amber-50 text-amber-600 border border-amber-200" : alert.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-blue-50 text-blue-600 border border-blue-200"}`}>
                    {alert.type === "warning" ? <AlertTriangle size={14} /> : alert.type === "success" ? <CheckCircle size={14} /> : <Bell size={14} />}
                  </div>
                  <div>
                    <p className="text-xs text-slate-800 font-medium">{alert.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Shipments */}
      <Card className="border-slate-200 bg-white shadow-xs rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Pengiriman Terbaru</h3>
              <p className="text-xs text-slate-500">5 pengiriman terakhir</p>
            </div>
            <Link href="/admin/pengiriman">
              <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold">
                Lihat Semua <ArrowUpRight size={14} />
              </Button>
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 bg-slate-50/80">
                {["No. Resi","Pengirim","Penerima","Rute","Status","Tanggal",""].map((h) => (
                  <TableHead key={h} className="text-xs font-bold text-slate-700">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((s) => (
                <TableRow key={s.resi} className="border-slate-100 hover:bg-slate-50/80 transition-colors">
                  <TableCell className="font-mono text-xs font-bold text-red-600">{s.resi}</TableCell>
                  <TableCell className="text-xs font-bold text-slate-900">{s.sender_name}</TableCell>
                  <TableCell className="text-xs text-slate-600">{s.receiver_name}</TableCell>
                  <TableCell className="text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin size={10} className="text-slate-400" />
                      {s.sender_city} → {s.receiver_city}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={`border font-semibold text-xs ${statusBadges[s.status]}`}>
                      {statusLabels[s.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500 font-medium">
                    {new Date(s.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/pengiriman`}>
                      <Button variant="ghost" size="icon" className="size-7 text-slate-500 hover:text-slate-900 hover:bg-slate-100">
                        <Eye size={14} />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
