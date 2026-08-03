"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, Package, CheckCircle, Clock, TrendingUp, Download } from "lucide-react";
import { getReports } from "@/lib/admin-api";

interface ReportSummary {
  period: string;
  summary: {
    total: number;
    delivered: number;
    in_progress: number;
    revenue: number;
    on_time_rate: number;
  };
  by_service: { service_type: string; count: number; revenue: number }[];
  by_status:  { status: string; count: number }[];
  daily_trend: { date: string; count: number; revenue: number }[];
}

const STATUS_LABELS: Record<string, string> = {
  picked_up: "Dijemput", in_warehouse: "Di Gudang",
  in_transit: "Dalam Perjalanan", out_for_delivery: "Sedang Diantar", delivered: "Terkirim",
};
const STATUS_BADGE: Record<string, string> = {
  picked_up: "bg-blue-50 text-blue-700 border-blue-200",
  in_warehouse: "bg-purple-50 text-purple-700 border-purple-200",
  in_transit: "bg-amber-50 text-amber-700 border-amber-200",
  out_for_delivery: "bg-red-50 text-red-700 border-red-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const MONTHS = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

export default function LaporanPage() {
  const [report, setReport]   = useState<ReportSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [month, setMonth]     = useState(new Date().getMonth() + 1);
  const [year, setYear]       = useState(new Date().getFullYear());

  const fetchReport = async () => {
    setLoading(true);
    try {
      const data = await getReports({ month: String(month), year: String(year) });
      setReport(data as ReportSummary);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchReport(); }, [month, year]);

  const maxDaily = Math.max(...(report?.daily_trend.map(d => d.count) ?? [1]), 1);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Laporan</h1>
          <p className="text-sm text-slate-500">Ringkasan operasional per bulan — {report?.period}</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={month} onChange={e => setMonth(Number(e.target.value))}
            className="h-9 px-3 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white focus:outline-none">
            {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
          </select>
          <select value={year} onChange={e => setYear(Number(e.target.value))}
            className="h-9 px-3 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white focus:outline-none">
            {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 rounded-xl gap-2 font-semibold" onClick={() => {
            const csvRows = [
              ["Tanggal","Jumlah Paket","Pendapatan"],
              ...(report?.daily_trend.map(d => [d.date, d.count, d.revenue]) ?? []),
            ];
            const csv = csvRows.map(r => r.join(",")).join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url; a.download = `laporan-${year}-${month}.csv`; a.click();
          }}>
            <Download size={14} /> Ekspor CSV
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64"><Loader2 size={28} className="animate-spin text-red-500" /></div>
      ) : !report ? (
        <div className="text-center py-20"><FileText size={40} className="mx-auto mb-3 text-slate-200" /><p className="text-sm text-slate-400">Tidak ada data untuk periode ini</p></div>
      ) : (
        <>
          {/* Summary KPIs */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Pengiriman", value: report.summary.total, icon: <Package size={18} />, accent: "text-red-600 bg-red-50 border-red-200" },
              { label: "Terkirim", value: report.summary.delivered, icon: <CheckCircle size={18} />, accent: "text-emerald-600 bg-emerald-50 border-emerald-200" },
              { label: "Dalam Proses", value: report.summary.in_progress, icon: <Clock size={18} />, accent: "text-amber-600 bg-amber-50 border-amber-200" },
              { label: "On-Time Rate", value: `${report.summary.on_time_rate}%`, icon: <TrendingUp size={18} />, accent: "text-blue-600 bg-blue-50 border-blue-200" },
            ].map(k => (
              <Card key={k.label} className="border-slate-200 shadow-xs rounded-2xl">
                <CardContent className="p-5">
                  <div className={`size-9 rounded-xl border mb-3 flex items-center justify-center ${k.accent}`}>{k.icon}</div>
                  <p className="text-2xl font-extrabold text-slate-900">{k.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{k.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid xl:grid-cols-3 gap-6 mb-6">
            {/* Daily Trend Chart */}
            <Card className="xl:col-span-2 border-slate-200 shadow-xs rounded-2xl">
              <CardContent className="p-6">
                <div className="mb-5">
                  <h3 className="text-base font-bold text-slate-900">Tren Harian</h3>
                  <p className="text-xs text-slate-500">Jumlah pengiriman per hari di {report.period}</p>
                </div>
                {report.daily_trend.length === 0 ? (
                  <div className="flex items-center justify-center h-32 text-sm text-slate-400">Tidak ada data harian</div>
                ) : (
                  <div className="flex items-end gap-1 h-40 overflow-x-auto pb-1">
                    {report.daily_trend.map(d => (
                      <div key={d.date} className="flex-shrink-0 flex flex-col items-center gap-1 group" style={{ minWidth: "20px" }}>
                        <div
                          className="w-4 rounded-t bg-red-500/80 hover:bg-red-600 transition-colors cursor-default"
                          style={{ height: `${Math.max((d.count / maxDaily) * 128, 4)}px` }}
                          title={`${d.date}: ${d.count} paket`}
                        />
                        <span className="text-[8px] text-slate-400 rotate-45 origin-left">{d.date.slice(8)}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-sm">
                  <span className="text-slate-500">Total Pendapatan Bulan Ini</span>
                  <span className="font-bold text-slate-900">Rp {report.summary.revenue.toLocaleString("id-ID")}</span>
                </div>
              </CardContent>
            </Card>

            {/* Breakdown by Status */}
            <Card className="border-slate-200 shadow-xs rounded-2xl">
              <CardContent className="p-6">
                <div className="mb-5">
                  <h3 className="text-base font-bold text-slate-900">Breakdown Status</h3>
                  <p className="text-xs text-slate-500">Distribusi paket per status</p>
                </div>
                <div className="flex flex-col gap-3">
                  {report.by_status.map(s => (
                    <div key={s.status} className="flex items-center justify-between">
                      <Badge className={`border text-xs font-semibold ${STATUS_BADGE[s.status] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
                        {STATUS_LABELS[s.status] ?? s.status}
                      </Badge>
                      <span className="text-sm font-bold text-slate-900">{s.count}</span>
                    </div>
                  ))}
                  {report.by_status.length === 0 && <p className="text-sm text-slate-400 text-center py-4">Tidak ada data</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* By Service */}
          <Card className="border-slate-200 shadow-xs rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-base font-bold text-slate-900 mb-5">Breakdown per Moda Layanan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {report.by_service.map(s => (
                  <div key={s.service_type} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-sm font-bold text-slate-700 capitalize mb-2">{s.service_type}</p>
                    <p className="text-2xl font-extrabold text-slate-900">{s.count}</p>
                    <p className="text-xs text-slate-400 mt-1">paket · Rp {(s.revenue / 1_000_000).toFixed(1)}M</p>
                  </div>
                ))}
                {report.by_service.length === 0 && <p className="col-span-3 text-sm text-slate-400 text-center py-4">Tidak ada data</p>}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}
