"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { X, Camera, AlertCircle } from "lucide-react";

interface QrScannerModalProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export default function QrScannerModal({ onScan, onClose }: QrScannerModalProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const SCANNER_ID = "qr-scanner-view";

  useEffect(() => {
    const scanner = new Html5Qrcode(SCANNER_ID);
    scannerRef.current = scanner;

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (!devices || devices.length === 0) {
          setError("Tidak ada kamera yang terdeteksi pada perangkat ini.");
          return;
        }

        // Prefer back camera on mobile
        const backCamera = devices.find(
          (d) =>
            d.label.toLowerCase().includes("back") ||
            d.label.toLowerCase().includes("belakang") ||
            d.label.toLowerCase().includes("environment")
        );
        const cameraId = backCamera?.id ?? devices[0].id;

        return scanner.start(
          cameraId,
          {
            fps: 15,
            qrbox: { width: 240, height: 240 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            // Success — stop scanner and call parent
            scanner.stop().catch(() => {}).finally(() => {
              onScan(decodedText.trim());
            });
          },
          () => {
            // Scan attempt failed — normal, keep scanning
          }
        );
      })
      .then(() => {
        setScanning(true);
      })
      .catch((err) => {
        console.error("QR Scanner error:", err);
        if (String(err).includes("Permission") || String(err).includes("NotAllowed")) {
          setError(
            "Izin kamera ditolak. Silakan izinkan akses kamera di pengaturan browser Anda, lalu coba lagi."
          );
        } else if (String(err).includes("NotFound") || String(err).includes("SourceUnavailable")) {
          setError("Kamera tidak ditemukan. Pastikan perangkat Anda memiliki kamera.");
        } else if (String(err).includes("https") || String(err).includes("secure")) {
          setError(
            "Akses kamera membutuhkan koneksi HTTPS. Pastikan aplikasi diakses via https://"
          );
        } else {
          setError("Gagal membuka kamera. Pastikan tidak ada aplikasi lain yang menggunakan kamera.");
        }
      });

    return () => {
      if (
        scannerRef.current &&
        scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING
      ) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <div className="flex items-center gap-2">
          <Camera size={18} className="text-white" />
          <p className="text-white font-bold text-base">Scan QR / Barcode</p>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X size={18} className="text-white" />
        </button>
      </div>

      {/* Scanner area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {error ? (
          <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={28} className="text-red-500" />
            </div>
            <p className="font-bold text-slate-900 mb-2">Kamera Tidak Dapat Dibuka</p>
            <p className="text-sm text-slate-500 leading-relaxed">{error}</p>
            <button
              onClick={onClose}
              className="mt-5 w-full bg-red-600 text-white font-semibold py-2.5 rounded-xl text-sm"
            >
              Tutup
            </button>
          </div>
        ) : (
          <div className="relative w-full max-w-[320px]">
            {/* The actual scanner viewport */}
            <div
              id={SCANNER_ID}
              className="rounded-2xl overflow-hidden w-full"
              style={{ minHeight: 300 }}
            />

            {/* Corner frame overlay */}
            {scanning && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Top-left */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-red-500 rounded-tl-lg" />
                {/* Top-right */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-red-500 rounded-tr-lg" />
                {/* Bottom-left */}
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-red-500 rounded-bl-lg" />
                {/* Bottom-right */}
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-red-500 rounded-br-lg" />
                {/* Scan line animation */}
                <div className="absolute left-6 right-6 h-0.5 bg-red-500/70 rounded animate-scan-line" />
              </div>
            )}

            {!scanning && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  <p className="text-white text-sm font-medium">Membuka kamera...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom hint */}
      {!error && (
        <div className="px-6 pb-12 text-center">
          <p className="text-white/60 text-sm">
            Arahkan kamera ke QR Code pada label paket
          </p>
        </div>
      )}

      <style jsx global>{`
        @keyframes scan-line {
          0%   { top: 16px; }
          50%  { top: calc(100% - 20px); }
          100% { top: 16px; }
        }
        .animate-scan-line {
          animation: scan-line 2s ease-in-out infinite;
        }
        /* Hide the default html5-qrcode UI chrome */
        #qr-scanner-view > img,
        #qr-scanner-view > div[style*="border"],
        #qr-scanner-view select,
        #qr-scanner-view button {
          display: none !important;
        }
        #qr-scanner-view video {
          border-radius: 1rem !important;
          width: 100% !important;
          object-fit: cover !important;
        }
      `}</style>
    </div>
  );
}
