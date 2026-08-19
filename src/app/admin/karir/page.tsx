"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Loader2, X, GripVertical, MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getAdminCareer, createJobPosition, updateJobPosition,
  toggleJobPosition, deleteJobPosition,
  type JobPosition, type JobPositionPayload,
} from "@/lib/admin-api";

// ─── Empty form state ─────────────────────────────────────────────────────────
const emptyForm = (): JobPositionPayload => ({
  title: "",
  type: "Full-time",
  location: "Balikpapan, Kalimantan Timur",
  description: "",
  wa_text: "",
  is_active: true,
  sort_order: 0,
  requirements: [""],
  benefits: [""],
});

// ─── Dynamic list editor ──────────────────────────────────────────────────────
function ListEditor({
  label, items, onChange, accent,
}: {
  label: string;
  items: string[];
  onChange: (v: string[]) => void;
  accent: string;
}) {
  const update = (i: number, v: string) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  const add = () => onChange([...items, ""]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div>
      <label className={`block text-xs font-semibold tracking-wider uppercase mb-3 ${accent}`}>{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <GripVertical size={14} className="text-slate-300 flex-shrink-0" />
            <input
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={`${label} ${i + 1}`}
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400/40 focus:border-red-400 transition"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              disabled={items.length <= 1}
              className="text-slate-400 hover:text-red-500 transition disabled:opacity-30"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className={`mt-2 text-xs font-medium ${accent} hover:underline flex items-center gap-1`}
      >
        <Plus size={12} /> Tambah item
      </button>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function PositionModal({
  initial, onSave, onClose, saving,
}: {
  initial: JobPositionPayload;
  onSave: (d: JobPositionPayload) => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<JobPositionPayload>(initial);

  const set = (key: keyof JobPositionPayload, val: unknown) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      requirements: form.requirements.filter((r) => r.trim()),
      benefits: form.benefits.filter((b) => b.trim()),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm overflow-y-auto py-6 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            {(initial as JobPosition).id ? "Edit Posisi" : "Tambah Posisi Baru"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          {/* Basic info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Judul Posisi *</label>
              <input
                required
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Contoh: Sales Marketing"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400/40 focus:border-red-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Tipe Pekerjaan *</label>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400/40 focus:border-red-400 transition bg-white"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Freelance</option>
                <option>Kontrak</option>
                <option>Magang</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi *</label>
            <input
              required
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="Contoh: Balikpapan, Kalimantan Timur"
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400/40 focus:border-red-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Deskripsi Singkat *</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Tugas dan tanggung jawab utama posisi ini..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400/40 focus:border-red-400 transition resize-none"
            />
          </div>

          <div className="border-t border-slate-100 pt-5 grid sm:grid-cols-2 gap-6">
            <ListEditor
              label="Kualifikasi"
              items={form.requirements}
              onChange={(v) => set("requirements", v)}
              accent="text-slate-600"
            />
            <ListEditor
              label="Yang Anda Dapatkan"
              items={form.benefits}
              onChange={(v) => set("benefits", v)}
              accent="text-emerald-600"
            />
          </div>

          <div className="border-t border-slate-100 pt-5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Teks Pesan WhatsApp</label>
            <textarea
              rows={2}
              value={form.wa_text ?? ""}
              onChange={(e) => set("wa_text", e.target.value)}
              placeholder="Halo CAM Cargo, saya tertarik melamar posisi [POSISI]..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400/40 focus:border-red-400 transition resize-none"
            />
            <p className="text-xs text-slate-400 mt-1">Teks ini akan muncul saat tombol "Daftar Sekarang" diklik di halaman karir.</p>
          </div>

          <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
            <label className="text-sm font-medium text-slate-700">Status:</label>
            <button
              type="button"
              onClick={() => set("is_active", !form.is_active)}
              className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full transition ${form.is_active ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-500 border border-slate-200"}`}
            >
              {form.is_active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
              {form.is_active ? "Aktif (ditampilkan)" : "Nonaktif (disembunyikan)"}
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={saving}>Batal</Button>
            <Button type="submit" disabled={saving} className="bg-red-600 hover:bg-red-700 text-white">
              {saving ? <><Loader2 size={14} className="animate-spin mr-1.5" /> Menyimpan...</> : "Simpan Posisi"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminKarirPage() {
  const [positions, setPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState("");
  const [modal, setModal]         = useState<JobPositionPayload | null>(null);
  const [editId, setEditId]       = useState<number | null>(null);
  const [expanded, setExpanded]   = useState<number | null>(null);

  const load = async () => {
    try {
      setPositions(await getAdminCareer());
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditId(null);
    setModal(emptyForm());
  };

  const openEdit = (p: JobPosition) => {
    setEditId(p.id);
    setModal({
      title: p.title, type: p.type, location: p.location,
      description: p.description, wa_text: p.wa_text ?? "",
      is_active: p.is_active, sort_order: p.sort_order,
      requirements: p.requirements.length ? [...p.requirements] : [""],
      benefits: p.benefits.length ? [...p.benefits] : [""],
    });
  };

  const handleSave = async (data: JobPositionPayload) => {
    setSaving(true);
    setError("");
    try {
      if (editId) {
        const updated = await updateJobPosition(editId, data);
        setPositions((prev) => prev.map((p) => (p.id === editId ? updated : p)));
      } else {
        const created = await createJobPosition(data);
        setPositions((prev) => [...prev, created]);
      }
      setModal(null);
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      const { is_active } = await toggleJobPosition(id);
      setPositions((prev) => prev.map((p) => p.id === id ? { ...p, is_active } : p));
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Hapus posisi "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    try {
      await deleteJobPosition(id);
      setPositions((prev) => prev.filter((p) => p.id !== id));
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Manajemen Karir</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola posisi yang tampil di halaman /karir</p>
        </div>
        <Button onClick={openAdd} className="bg-red-600 hover:bg-red-700 text-white gap-2">
          <Plus size={16} /> Tambah Posisi
        </Button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 size={24} className="animate-spin text-slate-400" />
        </div>
      ) : positions.length === 0 ? (
        <Card className="border-dashed border-2 border-slate-200">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Plus size={20} className="text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium">Belum ada posisi</p>
            <p className="text-slate-400 text-sm mt-1">Klik "Tambah Posisi" untuk membuat posisi pertama.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {positions.map((p) => (
            <Card key={p.id} className={`border transition-all ${p.is_active ? "border-slate-200" : "border-slate-100 opacity-60"}`}>
              <CardContent className="p-0">
                {/* Row header */}
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900">{p.title}</span>
                      <Badge className={`text-xs ${p.is_active ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                        {p.is_active ? "Aktif" : "Nonaktif"}
                      </Badge>
                      <Badge className="bg-slate-50 text-slate-600 border-slate-200 text-xs">{p.type}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><MapPin size={10} />{p.location}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{p.requirements.length} kualifikasi · {p.benefits.length} benefit</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Toggle aktif */}
                    <button
                      title={p.is_active ? "Nonaktifkan" : "Aktifkan"}
                      onClick={() => handleToggle(p.id)}
                      className="p-2 rounded-lg hover:bg-slate-100 transition text-slate-500 hover:text-slate-800"
                    >
                      {p.is_active ? <ToggleRight size={18} className="text-emerald-600" /> : <ToggleLeft size={18} />}
                    </button>
                    <button
                      title="Edit"
                      onClick={() => openEdit(p)}
                      className="p-2 rounded-lg hover:bg-blue-50 transition text-slate-500 hover:text-blue-600"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      title="Hapus"
                      onClick={() => handleDelete(p.id, p.title)}
                      className="p-2 rounded-lg hover:bg-red-50 transition text-slate-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      title="Lihat detail"
                      onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                      className="p-2 rounded-lg hover:bg-slate-100 transition text-slate-400"
                    >
                      {expanded === p.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Expandable detail */}
                {expanded === p.id && (
                  <div className="border-t border-slate-100 px-5 py-4 bg-slate-50/50 grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Kualifikasi</p>
                      <ul className="space-y-1">
                        {p.requirements.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2">Yang Anda Dapatkan</p>
                      <ul className="space-y-1">
                        {p.benefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {p.description && (
                      <div className="sm:col-span-2">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Deskripsi</p>
                        <p className="text-xs text-slate-600">{p.description}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <PositionModal
          initial={modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
          saving={saving}
        />
      )}
    </div>
  );
}
