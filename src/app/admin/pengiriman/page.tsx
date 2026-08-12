"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import {
  Package, Search, Plus, ChevronLeft, ChevronRight,
  MapPin, Eye, Trash2, RefreshCw, Loader2, X, CheckCircle, QrCode,
} from "lucide-react";
import Link from "next/link";
import {
  getShipments, updateShipmentStatus, deleteShipment, getCouriers, createShipment,
  type Shipment, type Courier,
} from "@/lib/admin-api";

const STATUS_LABELS: Record<string, string> = {
  picked_up: "Dijemput", in_warehouse: "Di Gudang",
  in_transit: "Dalam Perjalanan", out_for_delivery: "Sedang Diantar", delivered: "Terkirim",
};
const STATUS_BADGES: Record<string, string> = {
  picked_up: "bg-blue-50 text-blue-700 border-blue-200",
  in_warehouse: "bg-purple-50 text-purple-700 border-purple-200",
  in_transit: "bg-amber-50 text-amber-700 border-amber-200",
  out_for_delivery: "bg-red-50 text-red-700 border-red-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
};
const STATUS_FLOW = ["picked_up","in_warehouse","in_transit","out_for_delivery","delivered"];

type ModalType = "view" | "status" | "create" | null;

export default function PengirimanPage() {
  const [shipments, setShipments]     = useState<Shipment[]>([]);
  const [couriers, setCouriers]       = useState<Courier[]>([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilter]     = useState("");
  const [page, setPage]               = useState(1);
  const [meta, setMeta]               = useState({ total: 0, last_page: 1, current_page: 1 });
  const [modal, setModal]             = useState<ModalType>(null);
  const [selected, setSelected]       = useState<Shipment | null>(null);
  const [statusForm, setStatusForm]   = useState({ status: "", location: "", description: "" });
  const [submitting, setSubmitting]   = useState(false);
  const [toast, setToast]             = useState<string | null>(null);

  // New shipment form
  const [newShipment, setNewShipment] = useState({
    sender_name: "", sender_city: "", sender_phone: "", sender_address: "",
    receiver_name: "", receiver_city: "", receiver_phone: "", receiver_address: "",
    item_description: "", weight_kg: "", service_type: "darat", price: "",
    assigned_courier_id: "",
  });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [res, courierRes] = await Promise.all([
        getShipments({ page, search: search || undefined, status: filterStatus || undefined, per_page: 12 }),
        getCouriers(),
      ]);
      setShipments(res.data);
      setMeta(res.meta);
      setCouriers(courierRes);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, search, filterStatus]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const handleFilter = (v: string) => { setFilter(v); setPage(1); };

  const handleUpdateStatus = async () => {
    if (!selected || !statusForm.status || !statusForm.location) return;
    setSubmitting(true);
    try {
      await updateShipmentStatus(selected.id, statusForm.status, statusForm.location, statusForm.description);
      showToast("Status berhasil diperbarui");
      setModal(null);
      fetchData();
    } catch (e: unknown) { showToast(e instanceof Error ? e.message : "Gagal"); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (s: Shipment) => {
    if (!confirm(`Hapus resi ${s.resi}?`)) return;
    try { await deleteShipment(s.id); showToast("Pengiriman dihapus"); fetchData(); }
    catch (e: unknown) { showToast(e instanceof Error ? e.message : "Gagal"); }
  };

  const handleCreate = async () => {
    setSubmitting(true);
    try {
      await createShipment({
        ...newShipment,
        weight_kg: parseFloat(newShipment.weight_kg),
        price: parseInt(newShipment.price),
        assigned_courier_id: newShipment.assigned_courier_id ? parseInt(newShipment.assigned_courier_id) : undefined,
      } as unknown as Partial<Shipment>);
      showToast("Pengiriman baru berhasil dibuat!");
      setModal(null);
      fetchData();
    } catch (e: unknown) { showToast(e instanceof Error ? e.message : "Gagal membuat pengiriman"); }
    finally { setSubmitting(false); }
  };

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-medium flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-400" /> {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Pengiriman</h1>
          <p className="text-sm text-slate-500">Kelola semua data pengiriman — total {meta.total} paket</p>
        </div>
        <Button onClick={() => setModal("create")} className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl gap-2 shadow-sm">
          <Plus size={16} /> Buat Pengiriman
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Cari resi, nama pengirim/penerima..." value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 h-9 border-slate-200 text-sm rounded-xl" />
        </div>
        <select value={filterStatus} onChange={(e) => handleFilter(e.target.value)}
          className="h-9 px-3 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400">
          <option value="">Semua Status</option>
          {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <Button variant="ghost" size="icon" onClick={fetchData} className="h-9 w-9 border border-slate-200 rounded-xl">
          <RefreshCw size={14} />
        </Button>
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
                  {["No. Resi","Pengirim","Penerima","Rute","Layanan","Berat","Harga","Status","Kurir","Aksi"].map(h => (
                    <TableHead key={h} className="text-xs font-bold text-slate-700 whitespace-nowrap">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.length === 0 ? (
                  <TableRow><TableCell colSpan={10} className="text-center text-sm text-slate-400 py-12"><Package size={32} className="mx-auto mb-2 text-slate-200" />Tidak ada data pengiriman</TableCell></TableRow>
                ) : shipments.map((s) => (
                  <TableRow key={s.id} className="border-slate-100 hover:bg-slate-50/80 transition-colors">
                    <TableCell className="font-mono text-xs font-bold text-red-600 whitespace-nowrap">{s.resi}</TableCell>
                    <TableCell className="text-xs font-semibold text-slate-900 whitespace-nowrap">{s.sender_name}<br /><span className="text-slate-400 font-normal">{s.sender_city}</span></TableCell>
                    <TableCell className="text-xs text-slate-700 whitespace-nowrap">{s.receiver_name}<br /><span className="text-slate-400">{s.receiver_city}</span></TableCell>
                    <TableCell className="text-xs text-slate-600 whitespace-nowrap"><span className="flex items-center gap-1"><MapPin size={10} className="text-slate-400" />{s.sender_city} → {s.receiver_city}</span></TableCell>
                    <TableCell className="text-xs text-slate-600 capitalize whitespace-nowrap">{s.service_type}</TableCell>
                    <TableCell className="text-xs text-slate-600 whitespace-nowrap">{s.weight_kg} kg</TableCell>
                    <TableCell className="text-xs text-slate-600 whitespace-nowrap">Rp {s.price.toLocaleString("id-ID")}</TableCell>
                    <TableCell><Badge className={`border text-xs font-semibold whitespace-nowrap ${STATUS_BADGES[s.status]}`}>{STATUS_LABELS[s.status]}</Badge></TableCell>
                    <TableCell className="text-xs text-slate-500 whitespace-nowrap">{s.courier?.name ?? <span className="text-slate-300">—</span>}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="size-7 text-blue-500 hover:bg-blue-50" title="Detail" onClick={() => { setSelected(s); setModal("view"); }}>
                          <Eye size={13} />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-7 text-amber-500 hover:bg-amber-50" title="Update Status" onClick={() => { setSelected(s); setStatusForm({ status: STATUS_FLOW[Math.min(STATUS_FLOW.indexOf(s.status)+1, STATUS_FLOW.length-1)], location: s.receiver_city, description: "" }); setModal("status"); }}>
                          <RefreshCw size={13} />
                        </Button>
                        <Link href={`/admin/pengiriman/${s.id}/label`} target="_blank">
                          <Button variant="ghost" size="icon" className="size-7 text-emerald-600 hover:bg-emerald-50" title="Print Label">
                            <QrCode size={13} />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="size-7 text-red-500 hover:bg-red-50" title="Hapus" onClick={() => handleDelete(s)}>
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {meta.last_page > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-slate-500">Halaman {meta.current_page} dari {meta.last_page} ({meta.total} total)</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="rounded-xl border-slate-200">
              <ChevronLeft size={14} />
            </Button>
            <Button variant="outline" size="sm" disabled={page >= meta.last_page} onClick={() => setPage(p => p + 1)} className="rounded-xl border-slate-200">
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}

      {/* Modal: View Detail */}
      {modal === "view" && selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">{selected.resi}</h2>
              <Button variant="ghost" size="icon" onClick={() => setModal(null)}><X size={16} /></Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ["Pengirim", selected.sender_name], ["Kota Asal", selected.sender_city],
                ["Penerima", selected.receiver_name], ["Kota Tujuan", selected.receiver_city],
                ["Barang", selected.item_description], ["Berat", `${selected.weight_kg} kg`],
                ["Layanan", selected.service_type], ["Harga", `Rp ${selected.price.toLocaleString("id-ID")}`],
                ["Status", STATUS_LABELS[selected.status]], ["Kurir", selected.courier?.name ?? "—"],
                ["Alamat Tujuan", selected.receiver_address], ["Est. Tiba", selected.estimated_delivery ?? "—"],
              ].map(([label, val]) => (
                <div key={label}><p className="text-xs text-slate-400 mb-0.5">{label}</p><p className="font-semibold text-slate-900">{val}</p></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Update Status */}
      {modal === "status" && selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">Update Status — {selected.resi}</h2>
              <Button variant="ghost" size="icon" onClick={() => setModal(null)}><X size={16} /></Button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Status Baru</label>
                <select value={statusForm.status} onChange={e => setStatusForm(f => ({ ...f, status: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-100">
                  {STATUS_FLOW.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Lokasi</label>
                <Input value={statusForm.location} onChange={e => setStatusForm(f => ({ ...f, location: e.target.value }))} placeholder="Kota / lokasi saat ini" className="rounded-xl border-slate-200" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Deskripsi (opsional)</label>
                <textarea value={statusForm.description} onChange={e => setStatusForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Keterangan tambahan..." rows={3}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-100 resize-none" />
              </div>
              <Button onClick={handleUpdateStatus} disabled={submitting} className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl">
                {submitting ? <><Loader2 size={14} className="animate-spin" /> Menyimpan...</> : "Simpan Perubahan"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Shipment */}
      {modal === "create" && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 my-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">Buat Pengiriman Baru</h2>
              <Button variant="ghost" size="icon" onClick={() => setModal(null)}><X size={16} /></Button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {/* Sender */}
              <div className="col-span-4"><p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Data Pengirim</p></div>
              {[["sender_name","Nama Pengirim"],["sender_city","Kota Asal"],["sender_phone","No. HP Pengirim"],["sender_address","Alamat Pengirim"]].map(([k,l]) => (
                <div key={k} className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{l}</label>
                  <Input value={(newShipment as Record<string,string>)[k]} onChange={e => setNewShipment(f => ({ ...f, [k]: e.target.value }))} placeholder={l} className="rounded-xl border-slate-200 text-sm" />
                </div>
              ))}
              {/* Receiver */}
              <div className="col-span-4 mt-2"><p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Data Penerima</p></div>
              {[["receiver_name","Nama Penerima"],["receiver_city","Kota Tujuan"],["receiver_phone","No. HP Penerima"],["receiver_address","Alamat Penerima"]].map(([k,l]) => (
                <div key={k} className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{l}</label>
                  <Input value={(newShipment as Record<string,string>)[k]} onChange={e => setNewShipment(f => ({ ...f, [k]: e.target.value }))} placeholder={l} className="rounded-xl border-slate-200 text-sm" />
                </div>
              ))}
              {/* Item */}
              <div className="col-span-4 mt-2"><p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Detail Barang</p></div>
              <div className="col-span-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Deskripsi Barang</label>
                <Input value={newShipment.item_description} onChange={e => setNewShipment(f => ({ ...f, item_description: e.target.value }))} placeholder="Elektronik, Pakaian, dll" className="rounded-xl border-slate-200 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Berat (kg)</label>
                <Input type="number" value={newShipment.weight_kg} onChange={e => setNewShipment(f => ({ ...f, weight_kg: e.target.value }))} placeholder="0.5" className="rounded-xl border-slate-200 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Harga (Rp)</label>
                <Input type="number" value={newShipment.price} onChange={e => setNewShipment(f => ({ ...f, price: e.target.value }))} placeholder="50000" className="rounded-xl border-slate-200 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Layanan</label>
                <select value={newShipment.service_type} onChange={e => setNewShipment(f => ({ ...f, service_type: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-100">
                  <option value="darat">Darat</option><option value="laut">Laut</option><option value="udara">Udara</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Kurir</label>
                <select value={newShipment.assigned_courier_id} onChange={e => setNewShipment(f => ({ ...f, assigned_courier_id: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-100">
                  <option value="">— Pilih Kurir —</option>
                  {couriers.filter(c => c.is_active).map(c => <option key={c.id} value={c.id}>{c.name} ({c.courier_id})</option>)}
                </select>
              </div>
            </div>
            <Button onClick={handleCreate} disabled={submitting} className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl">
              {submitting ? <><Loader2 size={14} className="animate-spin" /> Membuat...</> : "Buat Pengiriman"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
