// lib/api.ts — Centralized API client for CAM Cargo backend

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  // Destructure headers out so we can merge them without `...options` overwriting Content-Type
  const { headers: optHeaders, ...restOptions } = options ?? {};
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(optHeaders ?? {}),
    },
    ...restOptions,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || "masih dalam tahap pengembangan.");
  }
  return json;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TimelineEntry {
  status: string;
  label: string;
  location: string;
  description: string | null;
  date: string;
  time: string;
  coordinates: { lat: number; lng: number } | null;
}

export interface TrackingResult {
  resi: string;
  status: string;
  service: string;
  estimated_delivery: string | null;
  sender: { name: string; city: string; phone: string };
  receiver: { name: string; city: string; phone: string };
  item: { description: string; weight: string; dimensions: string | null };
  timeline: TimelineEntry[];
}

export interface ShippingRate {
  service_type: string;
  label: string;
  price_per_kg: number;
  total_price: number;
  estimated_days: string;
  description: string;
}

export interface ShippingRateResult {
  origin: string;
  destination: string;
  weight_kg: number;
  rates: ShippingRate[];
}

// ─── Public APIs ──────────────────────────────────────────────────────────────

export async function getAvailableCities(): Promise<string[]> {
  const res = await request<{ success: boolean; data: string[] }>("/cities");
  return res.data;
}

export async function trackShipment(resi: string): Promise<TrackingResult> {
  const res = await request<{ success: boolean; data: TrackingResult }>(
    `/tracking/${encodeURIComponent(resi.toUpperCase())}`
  );
  return res.data;
}

export async function calculateShippingRate(
  origin: string,
  destination: string,
  weight_kg: number
): Promise<ShippingRateResult> {
  const res = await request<{ success: boolean; data: ShippingRateResult }>(
    "/shipping-rate",
    {
      method: "POST",
      body: JSON.stringify({ origin, destination, weight_kg }),
    }
  );
  return res.data;
}

export async function submitContact(payload: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<void> {
  await request("/contacts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

export interface LoginResult {
  token: string;
  user: { id: number; name: string; email: string; role: string; courier_id?: string };
}

export async function loginUser(email: string, password: string): Promise<LoginResult> {
  const res = await request<{ success: boolean; data: LoginResult }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return res.data;
}

// ─── Courier API ──────────────────────────────────────────────────────────────

export interface CourierPackage {
  resi: string;
  recipient: string;
  address: string;
  phone: string;
  item: string;
  weight: string;
  status: string;
}

export interface CourierStats {
  delivered: number;
  in_progress: number;
  pending: number;
}

export interface CourierData {
  courier: { id: number; name: string; courier_id: string };
  today_stats: CourierStats;
  packages: CourierPackage[];
}

export interface HistoryItem {
  resi: string;
  recipient: string;
  status: string;
  time: string;
}

function courierHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export async function getCourierPackages(token: string): Promise<CourierData> {
  const res = await request<{ success: boolean; data: CourierData }>("/courier/packages", {
    headers: courierHeaders(token),
  });
  return res.data;
}

export async function getCourierHistory(token: string): Promise<HistoryItem[]> {
  const res = await request<{ success: boolean; data: HistoryItem[] }>("/courier/history", {
    headers: courierHeaders(token),
  });
  return res.data;
}

export async function updatePackageStatus(
  token: string,
  resi: string,
  status: string,
  location: string,
  description?: string,
  latitude?: number,
  longitude?: number
): Promise<void> {
  await request(`/courier/packages/${encodeURIComponent(resi)}/status`, {
    method: "POST",
    headers: courierHeaders(token),
    body: JSON.stringify({ status, location, description, latitude, longitude }),
  });
}

