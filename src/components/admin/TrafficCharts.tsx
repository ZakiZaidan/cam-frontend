"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Eye, Users, Monitor, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type {
  TrafficAnalytics,
  DailyTrafficPoint,
  TopPage,
  ReferrerPoint,
} from "@/lib/admin-api";

// ─── Color palette ───────────────────────────────────────────────────────────
const PIE_COLORS = ["#ef4444", "#3b82f6", "#a855f7", "#f59e0b"];

// ─── Custom Tooltip ──────────────────────────────────────────────────────────
function AreaTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xl px-4 py-3 text-xs">
      <p className="font-bold text-slate-700 mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-500 capitalize">
            {p.dataKey === "views" ? "Halaman Dilihat" : "Pengunjung Unik"}:
          </span>
          <span className="font-bold text-slate-800">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

function BarTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xl px-4 py-3 text-xs">
      <p className="font-bold text-slate-700 mb-1">{label}</p>
      <p className="text-slate-500">
        Views: <span className="font-bold text-slate-800">{payload[0]?.value}</span>
      </p>
    </div>
  );
}

function PieTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xl px-4 py-3 text-xs">
      <p className="font-bold text-slate-700">{payload[0].name}</p>
      <p className="text-slate-500">
        Views: <span className="font-bold text-slate-800">{payload[0].value}</span>
      </p>
    </div>
  );
}

// ─── Summary cards ───────────────────────────────────────────────────────────
function SummaryCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  sub: string;
  icon: any;
  accent: string;
}) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl border ${accent}`}>
      <div className="size-10 rounded-xl flex items-center justify-center bg-white/70">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xl font-extrabold text-slate-900">{value}</p>
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="text-xs text-slate-400">{sub}</p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
interface Props {
  data: TrafficAnalytics;
}

export function TrafficCharts({ data }: Props) {
  const { summary, daily, top_pages, referrers } = data;

  // Only show every 5th label on x-axis to avoid crowding
  const tickFormatter = (label: string, index: number) =>
    index % 5 === 0 ? label : "";

  const totalViews = referrers.reduce((s, r) => s + r.value, 0);

  return (
    <div className="space-y-6">
      {/* Summary row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard
          label="Total Kunjungan"
          value={summary.total_views.toLocaleString()}
          sub="30 hari terakhir"
          icon={Eye}
          accent="border-red-200 bg-red-50 text-red-600"
        />
        <SummaryCard
          label="Pengunjung Unik"
          value={summary.total_visitors.toLocaleString()}
          sub="30 hari terakhir"
          icon={Users}
          accent="border-blue-200 bg-blue-50 text-blue-600"
        />
        <SummaryCard
          label="Kunjungan Hari Ini"
          value={summary.today_views.toLocaleString()}
          sub="Sejak 00:00"
          icon={Monitor}
          accent="border-violet-200 bg-violet-50 text-violet-600"
        />
        <SummaryCard
          label="Pengunjung Hari Ini"
          value={summary.today_visitors.toLocaleString()}
          sub="Pengunjung unik"
          icon={TrendingUp}
          accent="border-emerald-200 bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* Line chart: daily traffic */}
      <Card className="border-slate-200 bg-white shadow-xs rounded-2xl">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900">Trafik Harian</h3>
            <p className="text-xs text-slate-500">Halaman dilihat & pengunjung unik — 30 hari terakhir</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={daily} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="label"
                tickFormatter={tickFormatter}
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<AreaTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
                formatter={(v) => (v === "views" ? "Halaman Dilihat" : "Pengunjung Unik")}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#gViews)"
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#gVisitors)"
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom row: top pages + referrers */}
      <div className="grid xl:grid-cols-2 gap-6">
        {/* Bar chart: top pages */}
        <Card className="border-slate-200 bg-white shadow-xs rounded-2xl">
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-base font-bold text-slate-900">Halaman Terpopuler</h3>
              <p className="text-xs text-slate-500">Top 5 halaman — 30 hari terakhir</p>
            </div>
            {top_pages.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-sm text-slate-400">
                Belum ada data halaman
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={top_pages}
                  layout="vertical"
                  margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis
                    type="category"
                    dataKey="page"
                    tick={{ fontSize: 10, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                    width={90}
                  />
                  <Tooltip content={<BarTooltip />} />
                  <Bar dataKey="views" fill="#ef4444" radius={[0, 6, 6, 0]} maxBarSize={28} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Pie chart: referrers */}
        <Card className="border-slate-200 bg-white shadow-xs rounded-2xl">
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-base font-bold text-slate-900">Sumber Trafik</h3>
              <p className="text-xs text-slate-500">Distribusi asal kunjungan — 30 hari terakhir</p>
            </div>
            {totalViews === 0 ? (
              <div className="h-40 flex items-center justify-center text-sm text-slate-400">
                Belum ada data trafik
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <ResponsiveContainer width="55%" height={180}>
                  <PieChart>
                    <Pie
                      data={referrers}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {referrers.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>

                {/* Legend */}
                <div className="flex-1 space-y-3">
                  {referrers.map((r, i) => {
                    const pct = totalViews > 0 ? Math.round((r.value / totalViews) * 100) : 0;
                    return (
                      <div key={r.name} className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-700 truncate">{r.name}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{
                                  width: `${pct}%`,
                                  background: PIE_COLORS[i % PIE_COLORS.length],
                                }}
                              />
                            </div>
                            <span className="text-xs text-slate-400 w-8 text-right">{pct}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
