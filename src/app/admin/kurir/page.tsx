"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Truck, Plus, Loader2, X, CheckCircle, ToggleLeft, ToggleRight, Package } from "lucide-react";
import { getCouriers, createCourier, updateCourier, type Courier } from "@/lib/admin-api";

export default function KurirPage() {
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]       = useState<string | null>(null);
  const [form, setForm]         = useState({ name: "", email: "", password: "", phone: "" });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const fetchData = async () => {
    setLoading(true);
    try { setCouriers(await getCouriers()); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.password) { showToast("Nama, email, dan password wajib diisi"); return; }
    setSubmitting(true);
    try {
      await createCourier(form);
      showToast("Akun kurir berhasil dibuat!");
      setModal(false);
      setForm({ name: "", email: "", password: "", phone: "" });
      fetchData();
    } catch (e: unknown) { showToast(e instanceof Error ? e.message : "Gagal"); }
    finally { setSubmitting(false); }
  };

  const handleToggleActive = async (c: Courier) => {
    try {
      await updateCourier(c.id, { is_active: !c.is_active });
      showToast(c.is_active ? "Kurir dinonaktifkan" : "Kurir diaktifkan");
      fetchData();
    } catch (e: unknown) { showToast(e instanceof Error ? e.message : "Gagal"); }
  };

  const active = couriers.filter(c => c.is_active).length;
  const totalDelivered = couriers.reduce((s, c) => s + (c.total_delivered ?? 0), 0);

  return (
    <>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-medium flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-400" /> {toast}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Kurir</h1>
          <p className="text-sm text-slate-500">Kelola akun kurir — {couriers.length} terdaftar, {active} aktif</p>
        </div>
        <Button onClick={() => setModal(true)} className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl gap-2">
          <Plus size={16} /> Tambah Kurir
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Kurir", value: couriers.length, accent: "text-blue-600 bg-blue-50 border-blue-200" },
          { label: "Aktif", value: active, accent: "text-emerald-600 bg-emerald-50 border-emerald-200" },
          { label: "Total Paket Terkirim", value: totalDelivered, accent: "text-red-600 bg-red-50 border-red-200" },
        ].map(s => (
          <Card key={s.label} className="border-slate-200 shadow-xs rounded-2xl">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`size-10 rounded-xl border flex items-center justify-center ${s.accent}`}>
                <Truck size={18} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="border-slate-200 shadow-xs rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-48"><Loader2 size={24} className="animate-spin text-red-500" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 border-slate-200">
                  {["Kurir","ID Kurir","Kontak","Paket Aktif","Total Terkirim","Status","Aksi"].map(h => (
                    <TableHead key={h} className="text-xs font-bold text-slate-700">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {couriers.map((c) => (
                  <TableRow key={c.id} className="border-slate-100 hover:bg-slate-50/80 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9 border border-slate-200">
                          <AvatarFallback className="bg-red-50 text-red-600 font-bold text-sm">{c.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{c.name}</p>
                          <p className="text-xs text-slate-400">{c.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg">{c.courier_id ?? "—"}</span></TableCell>
                    <TableCell className="text-xs text-slate-600">{c.phone ?? "—"}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                        <Package size={12} className="text-amber-500" /> {c.active_shipments ?? 0} paket
                      </span>
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-emerald-600">{c.total_delivered ?? 0}</TableCell>
                    <TableCell>
                      <Badge className={c.is_active ? "bg-emerald-50 text-emerald-700 border-emerald-200 border font-semibold" : "bg-slate-100 text-slate-500 border-slate-200 border font-semibold"}>
                        {c.is_active ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => handleToggleActive(c)}
                        className={`size-8 ${c.is_active ? "text-red-500 hover:bg-red-50" : "text-emerald-500 hover:bg-emerald-50"}`}
                        title={c.is_active ? "Nonaktifkan" : "Aktifkan"}>
                        {c.is_active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Modal: Add Courier */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">Tambah Kurir Baru</h2>
              <Button variant="ghost" size="icon" onClick={() => setModal(false)}><X size={16} /></Button>
            </div>
            <div className="flex flex-col gap-4">
              {[["name","Nama Lengkap","text"],["email","Email","email"],["phone","No. HP (opsional)","tel"],["password","Password","password"]].map(([k, l, t]) => (
                <div key={k}>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">{l}</label>
                  <Input type={t} value={(form as Record<string,string>)[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={l} className="rounded-xl border-slate-200" />
                </div>
              ))}
              <Button onClick={handleCreate} disabled={submitting} className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl mt-1">
                {submitting ? <><Loader2 size={14} className="animate-spin" /> Membuat...</> : "Buat Akun Kurir"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
