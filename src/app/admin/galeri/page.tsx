"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getToken, getAdminGallery, uploadGalleryImage, deleteGalleryImage, GalleryImage } from "@/lib/admin-api";
import { Upload, Trash2, Image as ImageIcon, ChevronDown, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";

const SERVICES = [
  { slug: "kirim-barang",  label: "Kirim Barang" },
  { slug: "kirim-motor",   label: "Kirim Motor" },
  { slug: "kirim-mobil",   label: "Kirim Mobil" },
  { slug: "kirim-alat-berat", label: "Kirim Alat Berat" },
  { slug: "pindahan",      label: "Pindahan" },
  { slug: "charter",       label: "Charter Kendaraan" },
  { slug: "kirim-udara",   label: "Kirim via Udara" },
];

export default function AdminGaleriPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedSlug, setSelectedSlug] = useState(SERVICES[0].slug);
  const [images, setImages]             = useState<GalleryImage[]>([]);
  const [loading, setLoading]           = useState(false);
  const [uploading, setUploading]       = useState(false);
  const [deletingId, setDeletingId]     = useState<number | null>(null);
  const [toast, setToast]               = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [preview, setPreview]           = useState<{ file: File; url: string } | null>(null);

  // Guard
  useEffect(() => {
    if (!getToken()) router.push("/admin/login");
  }, [router]);

  // Load gallery saat slug berubah
  useEffect(() => {
    loadGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSlug]);

  async function loadGallery() {
    setLoading(true);
    try {
      const data = await getAdminGallery(selectedSlug);
      setImages(data);
    } catch {
      showToast("error", "Gagal memuat galeri.");
    } finally {
      setLoading(false);
    }
  }

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview({ file, url: URL.createObjectURL(file) });
  }

  async function handleUpload() {
    if (!preview) return;
    setUploading(true);
    try {
      const newImage = await uploadGalleryImage(selectedSlug, preview.file);
      setImages((prev) => [...prev, newImage]);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      showToast("success", "Gambar berhasil diupload!");
    } catch (err: unknown) {
      showToast("error", (err as Error).message || "Gagal mengupload.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Hapus gambar ini?")) return;
    setDeletingId(id);
    try {
      await deleteGalleryImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
      showToast("success", "Gambar dihapus.");
    } catch {
      showToast("error", "Gagal menghapus gambar.");
    } finally {
      setDeletingId(null);
    }
  }

  const selectedService = SERVICES.find((s) => s.slug === selectedSlug);

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${
            toast.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Galeri Dokumentasi</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola foto galeri untuk setiap layanan.</p>
      </div>

      {/* Service Selector */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Pilih Layanan
        </label>
        <div className="relative w-full max-w-xs">
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 pr-8 focus:outline-none focus:ring-2 focus:ring-gray-900/10 bg-white cursor-pointer"
          >
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>{s.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Upload size={15} className="text-gray-400" /> Upload Foto Baru
        </h2>

        {/* Drop zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all group"
        >
          {preview ? (
            <div className="relative w-40 h-40 mx-auto rounded-xl overflow-hidden shadow">
              <Image src={preview.url} alt="Preview" fill className="object-cover" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-gray-600 transition">
              <ImageIcon size={32} />
              <p className="text-sm">Klik untuk memilih foto</p>
              <p className="text-xs">JPG, PNG, WEBP — maks. 5 MB</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {preview && (
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="flex items-center gap-2 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-xl hover:bg-gray-700 transition disabled:opacity-50"
            >
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              {uploading ? "Mengupload..." : `Upload ke ${selectedService?.label}`}
            </button>
            <button
              onClick={() => { setPreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
              className="text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Batal
            </button>
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800">
            Foto {selectedService?.label} ({images.length})
          </h2>
          {loading && <Loader2 size={16} className="text-gray-400 animate-spin" />}
        </div>

        {!loading && images.length === 0 && (
          <div className="py-12 text-center">
            <ImageIcon size={32} className="mx-auto text-gray-200 mb-2" />
            <p className="text-sm text-gray-400">Belum ada foto untuk layanan ini.</p>
            <p className="text-xs text-gray-400 mt-1">Upload foto di atas untuk memulai.</p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 shadow-sm">
              <Image
                src={img.url}
                alt={img.caption ?? `Foto ${img.service_slug}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              {/* Overlay hapus */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <button
                  onClick={() => handleDelete(img.id)}
                  disabled={deletingId === img.id}
                  className="opacity-0 group-hover:opacity-100 transition bg-white text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white shadow-lg"
                  title="Hapus foto"
                >
                  {deletingId === img.id
                    ? <Loader2 size={16} className="animate-spin" />
                    : <Trash2 size={16} />
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
