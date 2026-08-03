"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import QRCode from "qrcode";
import { useReactToPrint } from "react-to-print";
import { Printer, ArrowLeft, Package, MapPin, Phone, User, Scale, Calendar, Truck } from "lucide-react";
import { getShipmentById, type Shipment } from "@/lib/admin-api";

const SERVICE_LABEL: Record<string, string> = {
  darat: "Darat",
  laut: "Laut",
  udara: "Udara",
};

const STATUS_LABEL: Record<string, string> = {
  picked_up: "Paket Dijemput",
  in_warehouse: "Di Gudang",
  in_transit: "Dalam Perjalanan",
  out_for_delivery: "Sedang Diantar",
  delivered: "Terkirim",
};

export default function LabelPage() {
  const params = useParams();
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);

  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params?.id as string;
    if (!id) return;

    getShipmentById(Number(id))
      .then(async (data) => {
        setShipment(data);
        const url = await QRCode.toDataURL(data.resi, {
          width: 320,
          margin: 1,
          color: { dark: "#111827", light: "#ffffff" },
        });
        setQrDataUrl(url);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params?.id]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: shipment ? `Label-${shipment.resi}` : "Label-CAMCargo",
    pageStyle: `
      @page { size: A5; margin: 0; }
      @media print {
        body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .no-print { display: none !important; }
      }
    `,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Memuat data paket...</p>
        </div>
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Package size={48} className="mx-auto mb-3 text-slate-300" />
          <p className="text-slate-500">Data paket tidak ditemukan.</p>
          <button onClick={() => router.push("/admin/pengiriman")} className="mt-4 text-red-600 text-sm font-medium hover:underline">
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const printedAt = new Date().toLocaleDateString("id-ID", {
    day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      {/* Control Bar — hidden on print */}
      <div className="no-print max-w-xl mx-auto mb-6 flex items-center justify-between">
        <button
          onClick={() => router.push("/admin/pengiriman")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          Kembali ke Daftar Paket
        </button>
        <button
          onClick={() => handlePrint()}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-colors"
        >
          <Printer size={15} />
          Print Label
        </button>
      </div>

      {/* Label Card */}
      <div
        ref={printRef}
        className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {/* Header Strip */}
        <div className="bg-[#111827] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo/camLogo.png" alt="CAM Cargo" width={44} height={44} className="rounded-lg" />
            <div>
              <p className="text-white font-bold text-base tracking-wide leading-none">CAM CARGO</p>
              <p className="text-white/50 text-[10px] tracking-widest uppercase mt-0.5">PT. Cipta Astama Mandala</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
              {SERVICE_LABEL[shipment.service_type] ?? shipment.service_type}
            </span>
            <p className="text-white/40 text-[9px] mt-1.5">{printedAt}</p>
          </div>
        </div>

        {/* QR Code + Resi Number */}
        <div className="flex flex-col items-center py-8 px-6 border-b border-dashed border-slate-200 bg-slate-50/60">
          {qrDataUrl && (
            <Image src={qrDataUrl} alt={`QR Code ${shipment.resi}`} width={200} height={200} className="rounded-xl border-4 border-white shadow-md" />
          )}
          <p className="mt-4 font-mono font-black text-2xl text-[#111827] tracking-widest">{shipment.resi}</p>
          <span className="text-xs text-slate-400 mt-1">Scan QR atau ketik nomor resi di atas</span>
        </div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-2 divide-x divide-slate-100">
          <div className="p-5">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
                <User size={9} className="text-slate-500" />
              </div>
              <p className="text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase">Pengirim</p>
            </div>
            <p className="font-bold text-sm text-slate-900 leading-tight">{shipment.sender_name}</p>
            <div className="flex items-center gap-1 mt-1.5">
              <Phone size={9} className="text-slate-400 shrink-0" />
              <p className="text-xs text-slate-500">{shipment.sender_phone}</p>
            </div>
            <div className="flex items-start gap-1 mt-1">
              <MapPin size={9} className="text-slate-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 leading-relaxed">{shipment.sender_address || shipment.sender_city}</p>
            </div>
            <div className="mt-2 inline-block bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-md">{shipment.sender_city}</div>
          </div>
          <div className="p-5 bg-red-50/50">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                <MapPin size={9} className="text-red-600" />
              </div>
              <p className="text-[9px] font-bold tracking-[0.2em] text-red-400 uppercase">Penerima</p>
            </div>
            <p className="font-black text-sm text-slate-900 leading-tight">{shipment.receiver_name}</p>
            <div className="flex items-center gap-1 mt-1.5">
              <Phone size={9} className="text-slate-400 shrink-0" />
              <p className="text-xs text-slate-500">{shipment.receiver_phone}</p>
            </div>
            <div className="flex items-start gap-1 mt-1">
              <MapPin size={9} className="text-slate-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 leading-relaxed">{shipment.receiver_address}</p>
            </div>
            <div className="mt-2 inline-block bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">{shipment.receiver_city}</div>
          </div>
        </div>

        {/* Package Details */}
        <div className="px-5 py-4 border-t border-slate-100">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Scale size={13} className="text-slate-400 shrink-0" />
              <div>
                <p className="text-[9px] text-slate-400 uppercase tracking-wide">Berat</p>
                <p className="text-sm font-bold text-slate-800">{shipment.weight_kg} kg</p>
              </div>
            </div>
            {shipment.estimated_delivery && (
              <div className="flex items-center gap-2">
                <Calendar size={13} className="text-slate-400 shrink-0" />
                <div>
                  <p className="text-[9px] text-slate-400 uppercase tracking-wide">Est. Tiba</p>
                  <p className="text-sm font-bold text-slate-800">
                    {new Date(shipment.estimated_delivery).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Truck size={13} className="text-slate-400 shrink-0" />
              <div>
                <p className="text-[9px] text-slate-400 uppercase tracking-wide">Status</p>
                <p className="text-xs font-bold text-slate-800">{STATUS_LABEL[shipment.status] ?? shipment.status}</p>
              </div>
            </div>
          </div>
          {shipment.item_description && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <p className="text-[9px] text-slate-400 uppercase tracking-wide mb-1">Isi Paket</p>
              <p className="text-xs text-slate-600">{shipment.item_description}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#111827] px-5 py-3 flex items-center justify-between">
          <p className="text-white/40 text-[9px] tracking-wider">Jaga paket ini dengan aman</p>
          <p className="text-white/40 text-[9px]">CAM CARGO — PT. Cipta Astama Mandala</p>
        </div>
      </div>
    </div>
  );
}
