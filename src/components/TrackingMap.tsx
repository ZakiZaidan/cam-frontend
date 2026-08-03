"use client";

import { useEffect, useRef } from "react";
import type { TimelineEntry } from "@/lib/api";

interface TrackingMapProps {
  senderCity: string;
  receiverCity: string;
  timeline: TimelineEntry[];
}

// Koordinat kota-kota di Indonesia sebagai fallback
const CITY_COORDS: Record<string, [number, number]> = {
  balikpapan:  [-1.2654, 116.8312],
  samarinda:   [-0.5016, 117.1537],
  jakarta:     [-6.2088, 106.8456],
  surabaya:    [-7.2575, 112.7521],
  makassar:    [-5.1477, 119.4327],
  banjarmasin: [-3.3194, 114.5908],
  bandung:     [-6.9175, 107.6191],
  semarang:    [-6.9932, 110.4203],
  medan:       [3.5952, 98.6722],
  palembang:   [-2.9761, 104.7754],
  pekanbaru:   [0.5070, 101.4478],
  denpasar:    [-8.6705, 115.2126],
  manado:      [1.4748, 124.8421],
  yogyakarta:  [-7.7956, 110.3695],
  pontianak:   [-0.0263, 109.3425],
  kupang:      [-10.1771, 123.6070],
  sorong:      [-0.8643, 131.2534],
  jayapura:    [-2.5337, 140.7180],
};

function getCityCoords(city: string): [number, number] | null {
  const key = city.toLowerCase().trim();
  for (const [k, v] of Object.entries(CITY_COORDS)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return null;
}

export default function TrackingMap({ senderCity, receiverCity, timeline }: TrackingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamic import to avoid SSR issues
    import("leaflet").then((L) => {
      // Fix default icon paths in Next.js
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      // Collect all points: GPS from timeline + city fallbacks
      const points: [number, number][] = [];
      const markerData: { coords: [number, number]; label: string; status: string; isCurrent: boolean }[] = [];

      // Add sender city as first point if no GPS on first entry
      const senderCoords = getCityCoords(senderCity);

      // Process timeline entries with GPS coordinates
      let hasGpsPoints = false;
      timeline.forEach((entry, idx) => {
        if (entry.coordinates) {
          const coords: [number, number] = [entry.coordinates.lat, entry.coordinates.lng];
          points.push(coords);
          markerData.push({
            coords,
            label: entry.label,
            status: entry.status,
            isCurrent: idx === timeline.length - 1,
          });
          hasGpsPoints = true;
        }
      });

      // If no GPS data, use city coordinates as fallback
      if (!hasGpsPoints) {
        if (senderCoords) {
          points.push(senderCoords);
          markerData.push({ coords: senderCoords, label: `Asal: ${senderCity}`, status: "origin", isCurrent: false });
        }
        const receiverCoords = getCityCoords(receiverCity);
        if (receiverCoords) {
          points.push(receiverCoords);
          markerData.push({ coords: receiverCoords, label: `Tujuan: ${receiverCity}`, status: "destination", isCurrent: false });
        }
      } else {
        // Add sender as starting point if not already in GPS
        if (senderCoords) {
          points.unshift(senderCoords);
          markerData.unshift({ coords: senderCoords, label: `Asal: ${senderCity}`, status: "origin", isCurrent: false });
        }
        // Add receiver as endpoint
        const receiverCoords = getCityCoords(receiverCity);
        if (receiverCoords) {
          points.push(receiverCoords);
          markerData.push({ coords: receiverCoords, label: `Tujuan: ${receiverCity}`, status: "destination", isCurrent: false });
        }
      }

      if (points.length === 0) return;

      // Initialize map
      const map = L.map(mapRef.current!, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      // OpenStreetMap tiles (100% free)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      // Draw route polyline
      const completedPoints: [number, number][] = [];
      const pendingPoints: [number, number][] = [];
      let reachedCurrent = false;

      markerData.forEach((m) => {
        if (!reachedCurrent) {
          completedPoints.push(m.coords);
          if (m.isCurrent) reachedCurrent = true;
        } else {
          pendingPoints.push(m.coords);
        }
      });

      if (completedPoints.length > 1) {
        L.polyline(completedPoints, {
          color: "#3D4550",
          weight: 3,
          opacity: 0.8,
          dashArray: undefined,
        }).addTo(map);
      }

      // Dashed line for pending route
      if (completedPoints.length > 0 && pendingPoints.length > 0) {
        const lastCompleted = completedPoints[completedPoints.length - 1];
        L.polyline([lastCompleted, ...pendingPoints], {
          color: "#9CA3AF",
          weight: 2,
          opacity: 0.6,
          dashArray: "8, 8",
        }).addTo(map);
      }

      // Add markers
      markerData.forEach((m) => {
        let iconHtml = "";

        if (m.status === "origin") {
          iconHtml = `<div style="width:14px;height:14px;border-radius:50%;background:#10B981;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`;
        } else if (m.status === "destination") {
          iconHtml = `<div style="width:14px;height:14px;border-radius:50%;background:#EF4444;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`;
        } else if (m.isCurrent) {
          iconHtml = `<div style="width:18px;height:18px;border-radius:50%;background:#3D4550;border:3px solid white;box-shadow:0 2px 12px rgba(61,69,80,0.5);animation:pulse 2s infinite"></div>`;
        } else {
          iconHtml = `<div style="width:10px;height:10px;border-radius:50%;background:#6B7280;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.2)"></div>`;
        }

        const icon = L.divIcon({
          html: iconHtml,
          className: "",
          iconSize: m.isCurrent ? [18, 18] : [14, 14],
          iconAnchor: m.isCurrent ? [9, 9] : [7, 7],
        });

        L.marker(m.coords, { icon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family:Inter,sans-serif;padding:4px 2px;min-width:140px">
              <p style="font-size:12px;font-weight:500;color:#111827;margin:0 0 2px 0">${m.label}</p>
              ${m.isCurrent ? '<span style="font-size:10px;background:#3D4550;color:white;padding:2px 6px;border-radius:999px">Posisi Terkini</span>' : ""}
            </div>
          `);
      });

      // Fit map to all points
      if (points.length >= 2) {
        map.fitBounds(L.latLngBounds(points), { padding: [40, 40] });
      } else {
        map.setView(points[0], 10);
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [senderCity, receiverCity, timeline]);

  return (
    <div className="relative">
      {/* Legend */}
      <div className="absolute top-3 right-3 z-[999] bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 px-4 py-3 flex flex-col gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm flex-shrink-0" />
          <span className="text-gray-600">Asal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3D4550] border-2 border-white shadow-sm flex-shrink-0" />
          <span className="text-gray-600">Posisi Terkini</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow-sm flex-shrink-0" />
          <span className="text-gray-600">Tujuan</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-px bg-gray-400 border-t-2 border-dashed border-gray-400 flex-shrink-0" />
          <span className="text-gray-600">Estimasi Rute</span>
        </div>
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        style={{ height: "380px", width: "100%", borderRadius: "16px", overflow: "hidden" }}
        className="border border-gray-100 shadow-sm"
      />

      {/* Leaflet CSS */}
      <style>{`
        @import url("https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css");
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.12) !important;
          border: 1px solid #F3F4F6 !important;
        }
        .leaflet-popup-tip { background: white !important; }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(61,69,80,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(61,69,80,0); }
        }
      `}</style>
    </div>
  );
}
