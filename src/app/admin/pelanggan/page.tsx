"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Users, Search, Loader2, MapPin, Package, DollarSign } from "lucide-react";
import { getCustomers, type Customer } from "@/lib/admin-api";

export default function PelangganPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");

  useEffect(() => {
    getCustomers().then(setCustomers).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = customers.filter(c =>
    !search ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue  = customers.reduce((s, c) => s + c.total_spent, 0);
  const totalPackages = customers.reduce((s, c) => s + c.total_shipments, 0);
  const topCustomer   = customers[0];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Pelanggan</h1>
        <p className="text-sm text-slate-500">Data pengirim yang telah menggunakan layanan CAM Cargo — {customers.length} pelanggan unik</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Pelanggan", value: customers.length, sub: "pengirim unik", icon: <Users size={18} />, accent: "text-red-600 bg-red-50 border-red-200" },
          { label: "Total Pengiriman", value: totalPackages.toLocaleString(), sub: "paket terkirim", icon: <Package size={18} />, accent: "text-blue-600 bg-blue-50 border-blue-200" },
          { label: "Total Pendapatan", value: `Rp ${(totalRevenue / 1_000_000).toFixed(1)}M`, sub: "dari semua pelanggan", icon: <DollarSign size={18} />, accent: "text-emerald-600 bg-emerald-50 border-emerald-200" },
        ].map(s => (
          <Card key={s.label} className="border-slate-200 shadow-xs rounded-2xl">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`size-10 rounded-xl border flex items-center justify-center shrink-0 ${s.accent}`}>{s.icon}</div>
              <div>
                <p className="text-xl font-extrabold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label} · {s.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Customer Spotlight */}
      {topCustomer && (
        <Card className="border-slate-200 shadow-xs rounded-2xl bg-gradient-to-r from-slate-50 to-white mb-6">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-red-100 text-red-600 font-extrabold text-lg flex items-center justify-center shrink-0">
                {topCustomer.name[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-extrabold text-slate-900 truncate">{topCustomer.name}</p>
                  <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">⭐ Top Pelanggan</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{topCustomer.city} · {topCustomer.phone}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-extrabold text-red-600">{topCustomer.total_shipments} paket</p>
                <p className="text-xs text-slate-400">Rp {(topCustomer.total_spent / 1_000_000).toFixed(1)}M total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search + Table */}
      <div className="mb-4">
        <div className="relative max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Cari nama, kota, atau nomor HP..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-9 border-slate-200 text-sm rounded-xl" />
        </div>
      </div>

      <Card className="border-slate-200 shadow-xs rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-48"><Loader2 size={24} className="animate-spin text-red-500" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 border-slate-200">
                  {["#","Nama","Kota","No. HP","Total Paket","Total Belanja","Pengiriman Terakhir"].map(h => (
                    <TableHead key={h} className="text-xs font-bold text-slate-700">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center text-sm text-slate-400 py-12">
                    <Users size={32} className="mx-auto mb-2 text-slate-200" />Tidak ada pelanggan ditemukan
                  </TableCell></TableRow>
                ) : filtered.map((c, i) => (
                  <TableRow key={`${c.name}-${i}`} className="border-slate-100 hover:bg-slate-50/80 transition-colors">
                    <TableCell className="text-xs font-bold text-slate-400 w-8">{i + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="size-7 rounded-lg bg-red-50 text-red-600 font-bold text-xs flex items-center justify-center shrink-0">
                          {c.name[0].toUpperCase()}
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{c.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-xs text-slate-600">
                        <MapPin size={11} className="text-slate-400" /> {c.city}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-slate-600 font-mono">{c.phone}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-xs font-bold text-slate-900">
                        <Package size={11} className="text-red-500" /> {c.total_shipments}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs font-bold text-emerald-700">
                      Rp {c.total_spent.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell className="text-xs text-slate-400">
                      {new Date(c.last_shipment).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
}
