"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { DollarSign, Plus, Loader2, X, CheckCircle, Pencil, Trash2 } from "lucide-react";
import { getRates, createRate, updateRate, deleteRate, type Rate } from "@/lib/admin-api";

const SERVICE_LABELS: Record<string, string> = { darat: "Darat 🚛", laut: "Laut 🚢", udara: "Udara ✈️" };
const SERVICE_BADGE: Record<string, string> = {
  darat: "bg-amber-50 text-amber-700 border-amber-200",
  laut:  "bg-blue-50 text-blue-700 border-blue-200",
  udara: "bg-purple-50 text-purple-700 border-purple-200",
};

const EMPTY_FORM = { origin_city: "", destination_city: "", service_type: "darat" as Rate["service_type"], price_per_kg: 0, estimated_days: "2-3 hari", is_active: true };

export default function TarifPage() {
  const [rates, setRates]         = useState<Rate[]>([]);
  const [loading, setLoading]     = useState(true);
  const [modal, setModal]         = useState<"create" | "edit" | null>(null);
  const [editing, setEditing]     = useState<Rate | null>(null);
  const [form, setForm]           = useState({ ...EMPTY_FORM });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]         = useState<string | null>(null);
  const [search, setSearch]       = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const fetchData = async () => {
    setLoading(true);
    try { setRates(await getRates()); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setForm({ ...EMPTY_FORM }); setEditing(null); setModal("create"); };
  const openEdit = (r: Rate) => { setForm({ origin_city: r.origin_city, destination_city: r.destination_city, service_type: r.service_type, price_per_kg: r.price_per_kg, estimated_days: r.estimated_days, is_active: r.is_active }); setEditing(r); setModal("edit"); };

  const handleSubmit = async () => {
    if (!form.origin_city || !form.destination_city || !form.price_per_kg) { showToast("Semua field wajib diisi"); return; }
    setSubmitting(true);
    try {
      if (modal === "edit" && editing) {
        await updateRate(editing.id, form);
        showToast("Tarif berhasil diperbarui");
      } else {
        await createRate(form);
        showToast("Tarif baru berhasil ditambahkan");
      }
      setModal(null);
      fetchData();
    } catch (e: unknown) { showToast(e instanceof Error ? e.message : "Gagal"); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (r: Rate) => {
    if (!confirm(`Hapus tarif ${r.origin_city} → ${r.destination_city} (${r.service_type})?`)) return;
    try { await deleteRate(r.id); showToast("Tarif dihapus"); fetchData(); }
    catch (e: unknown) { showToast(e instanceof Error ? e.message : "Gagal"); }
  };

  const filtered = rates.filter(r =>
    !search || r.origin_city.toLowerCase().includes(search.toLowerCase()) || r.destination_city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-medium flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-400" /> {toast}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Tarif Pengiriman</h1>
          <p className="text-sm text-slate-500">Kelola tarif ongkos kirim per rute dan moda — {rates.length} tarif terdaftar</p>
        </div>
        <Button onClick={openCreate} className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl gap-2">
          <Plus size={16} /> Tambah Tarif
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input placeholder="Cari kota asal atau tujuan..." value={search} onChange={e => setSearch(e.target.value)}
          className="max-w-xs rounded-xl border-slate-200 text-sm h-9" />
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
                  {["Asal","Tujuan","Moda","Harga/kg","Estimasi","Status","Aksi"].map(h => (
                    <TableHead key={h} className="text-xs font-bold text-slate-700">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center text-sm text-slate-400 py-12"><DollarSign size={32} className="mx-auto mb-2 text-slate-200" />Tidak ada tarif</TableCell></TableRow>
                ) : filtered.map((r) => (
                  <TableRow key={r.id} className="border-slate-100 hover:bg-slate-50/80 transition-colors">
                    <TableCell className="text-sm font-semibold text-slate-900">{r.origin_city}</TableCell>
                    <TableCell className="text-sm text-slate-700">{r.destination_city}</TableCell>
                    <TableCell><Badge className={`border text-xs font-semibold ${SERVICE_BADGE[r.service_type]}`}>{SERVICE_LABELS[r.service_type]}</Badge></TableCell>
                    <TableCell className="text-sm font-bold text-slate-900">Rp {r.price_per_kg.toLocaleString("id-ID")}</TableCell>
                    <TableCell className="text-sm text-slate-600">{r.estimated_days}</TableCell>
                    <TableCell>
                      <Badge className={r.is_active ? "bg-emerald-50 text-emerald-700 border-emerald-200 border text-xs font-semibold" : "bg-slate-100 text-slate-500 border-slate-200 border text-xs font-semibold"}>
                        {r.is_active ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="size-7 text-blue-500 hover:bg-blue-50" onClick={() => openEdit(r)}><Pencil size={13} /></Button>
                        <Button variant="ghost" size="icon" className="size-7 text-red-500 hover:bg-red-50" onClick={() => handleDelete(r)}><Trash2 size={13} /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">{modal === "edit" ? "Edit Tarif" : "Tambah Tarif Baru"}</h2>
              <Button variant="ghost" size="icon" onClick={() => setModal(null)}><X size={16} /></Button>
            </div>
            <div className="flex flex-col gap-4">
              {[["origin_city","Kota Asal"],["destination_city","Kota Tujuan"],["estimated_days","Estimasi Pengiriman"]].map(([k, l]) => (
                <div key={k}>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">{l}</label>
                  <Input value={(form as Record<string, string|number|boolean>)[k] as string} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={l} className="rounded-xl border-slate-200" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Moda</label>
                <select value={form.service_type} onChange={e => setForm(f => ({ ...f, service_type: e.target.value as Rate["service_type"] }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-100">
                  <option value="darat">Darat</option><option value="laut">Laut</option><option value="udara">Udara</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Harga per Kg (Rp)</label>
                <Input type="number" value={form.price_per_kg} onChange={e => setForm(f => ({ ...f, price_per_kg: parseInt(e.target.value) || 0 }))} placeholder="10000" className="rounded-xl border-slate-200" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_active" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} className="size-4 rounded accent-red-600" />
                <label htmlFor="is_active" className="text-sm text-slate-700 font-medium">Tarif Aktif</label>
              </div>
              <Button onClick={handleSubmit} disabled={submitting} className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl mt-1">
                {submitting ? <><Loader2 size={14} className="animate-spin" /> Menyimpan...</> : "Simpan Tarif"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
