"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, TrendingUp, DollarSign, Package, Truck, Plane, Ship } from "lucide-react";
import { getFinance, type FinanceData } from "@/lib/admin-api";

const SERVICE_ICON: Record<string, React.ReactNode> = {
  darat: <Truck size={16} />,
  laut:  <Ship size={16} />,
  udara: <Plane size={16} />,
};
const SERVICE_COLOR: Record<string, string> = {
  darat: "bg-amber-50 text-amber-700 border-amber-200",
  laut:  "bg-blue-50 text-blue-700 border-blue-200",
  udara: "bg-purple-50 text-purple-700 border-purple-200",
};

export default function KeuanganPage() {
  const [data, setData]       = useState<FinanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFinance().then(setData).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 size={28} className="animate-spin text-red-500" /></div>;
  }

  const maxMonthly = Math.max(...(data?.monthly.map(m => m.value) ?? [1]), 1);
  const totalByService = data?.revenue_by_service.reduce((s, r) => s + r.total, 0) ?? 1;

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Keuangan</h1>
        <p className="text-sm text-slate-500">Ringkasan pendapatan dan analisis keuangan pengiriman</p>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="border-slate-200 shadow-xs rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-10 rounded-xl bg-white/20 flex items-center justify-center"><DollarSign size={20} /></div>
              <TrendingUp size={16} className="text-white/70" />
            </div>
            <p className="text-3xl font-extrabold">Rp {((data?.total_revenue ?? 0) / 1_000_000).toFixed(1)}M</p>
            <p className="text-sm text-white/80 mt-1">Total Pendapatan Tahun Ini</p>
          </CardContent>
        </Card>

        {data?.revenue_by_service.map(s => (
          <Card key={s.service_type} className="border-slate-200 shadow-xs rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className={`size-10 rounded-xl border flex items-center justify-center ${SERVICE_COLOR[s.service_type]}`}>
                  {SERVICE_ICON[s.service_type]}
                </div>
                <Package size={14} className="text-slate-400" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900">Rp {(s.total / 1_000_000).toFixed(1)}M</p>
              <p className="text-xs text-slate-500 mt-1 capitalize">{s.service_type} · {s.count} pengiriman</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Monthly Chart */}
        <Card className="xl:col-span-2 border-slate-200 shadow-xs rounded-2xl">
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-base font-bold text-slate-900">Tren Pendapatan Bulanan</h3>
              <p className="text-xs text-slate-500">12 bulan terakhir (dalam jutaan Rp)</p>
            </div>
            <div className="flex items-end gap-1.5 h-56">
              {data?.monthly.map((m, i) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="relative w-full">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        i === (data.monthly.length - 1)
                          ? "bg-gradient-to-t from-red-600 to-red-400"
                          : "bg-slate-100 group-hover:bg-slate-200"
                      }`}
                      style={{ height: `${Math.max((m.value / maxMonthly) * 200, 8)}px` }}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-slate-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap pointer-events-none">
                      {m.month_full}: Rp {m.value}M
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 rotate-0">{m.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Breakdown by Service */}
        <Card className="border-slate-200 shadow-xs rounded-2xl">
          <CardContent className="p-6">
            <div className="mb-5">
              <h3 className="text-base font-bold text-slate-900">Breakdown Moda</h3>
              <p className="text-xs text-slate-500">Persentase pendapatan per layanan</p>
            </div>
            <div className="flex flex-col gap-4">
              {data?.revenue_by_service.map(s => {
                const pct = Math.round((s.total / totalByService) * 100);
                return (
                  <div key={s.service_type}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`size-7 rounded-lg border flex items-center justify-center ${SERVICE_COLOR[s.service_type]}`}>
                          {SERVICE_ICON[s.service_type]}
                        </div>
                        <span className="text-sm font-semibold text-slate-700 capitalize">{s.service_type}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">{pct}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${s.service_type === "darat" ? "bg-amber-500" : s.service_type === "laut" ? "bg-blue-500" : "bg-purple-500"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Rp {(s.total / 1_000_000).toFixed(1)}M · {s.count} paket</p>
                  </div>
                );
              })}
            </div>

            {/* Summary Table */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex flex-col gap-2">
                {[
                  { label: "Total Pengiriman", value: data?.revenue_by_service.reduce((s, r) => s + r.count, 0) ?? 0, suffix: " paket" },
                  { label: "Rata-rata per Paket", value: `Rp ${Math.round((data?.total_revenue ?? 0) / Math.max(data?.revenue_by_service.reduce((s, r) => s + r.count, 0) ?? 1, 1)).toLocaleString("id-ID")}`, suffix: "" },
                ].map(item => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="font-bold text-slate-900">{item.value}{item.suffix}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
