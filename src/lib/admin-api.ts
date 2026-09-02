// lib/admin-api.ts — Centralized Admin API client (authenticated)

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// ─── Token helpers ────────────────────────────────────────────────────────────
export const getToken = (): string | null =>
  typeof window !== "undefined" ? localStorage.getItem("cam_admin_token") : null;

export const setToken = (token: string) =>
  localStorage.setItem("cam_admin_token", token);

export const clearToken = () =>
  localStorage.removeItem("cam_admin_token");

async function authRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (res.status === 401) {
    clearToken();
    window.location.href = "/admin/login";
    throw new Error("Sesi berakhir. Silakan login kembali.");
  }

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Terjadi kesalahan pada server.");
  return json;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  courier_id: string | null;
  phone: string | null;
  is_active: boolean;
}

export interface Shipment {
  id: number;
  resi: string;
  status: string;
  service_type: string;
  sender_name: string;
  sender_city: string;
  sender_phone: string;
  receiver_name: string;
  receiver_city: string;
  receiver_phone: string;
  receiver_address: string;
  sender_address: string;
  item_description: string;
  weight_kg: number;
  dimensions: string | null;
  price: number;
  estimated_delivery: string | null;
  assigned_courier_id: number | null;
  courier?: AdminUser;
  created_at: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
}

export interface Rate {
  id: number;
  origin_city: string;
  destination_city: string;
  service_type: "darat" | "laut" | "udara";
  price_per_kg: number;
  estimated_days: string;
  volume_divisor: number;
  is_active: boolean;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Courier extends AdminUser {
  active_shipments: number;
  total_delivered: number;
}

export interface DashboardKpi {
  total_shipments: number;
  shipment_change: string;
  revenue: number;
  revenue_change: string;
  on_time_rate: string;
  active_packages: number;
  unread_contacts: number;
}

export interface RevenuePoint {
  month: string;
  month_full: string;
  value: number;
}

export interface DailyTrafficPoint {
  date: string;
  label: string;
  views: number;
  visitors: number;
}

export interface TopPage {
  page: string;
  views: number;
}

export interface ReferrerPoint {
  name: string;
  value: number;
}

export interface TrafficAnalytics {
  summary: {
    total_views: number;
    total_visitors: number;
    today_views: number;
    today_visitors: number;
  };
  daily: DailyTrafficPoint[];
  top_pages: TopPage[];
  referrers: ReferrerPoint[];
}

export interface FinanceData {
  total_revenue: number;
  revenue_by_service: { service_type: string; total: number; count: number }[];
  monthly: RevenuePoint[];
}

export interface Customer {
  name: string;
  city: string;
  phone: string;
  total_shipments: number;
  total_spent: number;
  last_shipment: string;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function login(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
  const res = await authRequest<{ success: boolean; data: { token: string; user: AdminUser } }>(
    "/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }
  );
  return res.data;
}

export async function logout(): Promise<void> {
  await authRequest("/auth/logout", { method: "POST" });
  clearToken();
}

export async function getMe(): Promise<AdminUser> {
  const res = await authRequest<{ data: AdminUser }>("/auth/me");
  return res.data;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export async function getDashboardKpi(): Promise<DashboardKpi> {
  const res = await authRequest<{ data: { kpi: DashboardKpi } }>("/admin/dashboard");
  return res.data.kpi;
}

export async function getDashboardRevenue(): Promise<RevenuePoint[]> {
  const res = await authRequest<{ data: RevenuePoint[] }>("/admin/dashboard/revenue");
  return res.data;
}

export async function getDashboardAnalytics(): Promise<TrafficAnalytics> {
  const res = await authRequest<{ data: TrafficAnalytics }>("/admin/dashboard/analytics");
  return res.data;
}

// ─── Shipments ────────────────────────────────────────────────────────────────

export async function getShipments(params?: { page?: number; status?: string; search?: string; per_page?: number }): Promise<PaginatedResponse<Shipment>> {
  const q = new URLSearchParams();
  if (params?.page) q.set("page", String(params.page));
  if (params?.status) q.set("status", params.status);
  if (params?.search) q.set("search", params.search);
  if (params?.per_page) q.set("per_page", String(params.per_page));
  return authRequest(`/admin/shipments?${q.toString()}`);
}

export async function createShipment(data: Partial<Shipment>): Promise<Shipment> {
  const res = await authRequest<{ data: Shipment }>("/admin/shipments", {
    method: "POST", body: JSON.stringify(data),
  });
  return res.data;
}

export async function updateShipmentStatus(id: number, status: string, location: string, description?: string): Promise<void> {
  await authRequest(`/admin/shipments/${id}/status`, {
    method: "POST", body: JSON.stringify({ status, location, description }),
  });
}

export async function deleteShipment(id: number): Promise<void> {
  await authRequest(`/admin/shipments/${id}`, { method: "DELETE" });
}

export async function getShipmentById(id: number): Promise<Shipment> {
  const res = await authRequest<{ data: Shipment }>(`/admin/shipments/${id}`);
  return res.data;
}


// ─── Couriers ─────────────────────────────────────────────────────────────────

export async function getCouriers(): Promise<Courier[]> {
  const res = await authRequest<{ data: Courier[] }>("/admin/couriers");
  return res.data;
}

export async function createCourier(data: { name: string; email: string; password: string; phone?: string }): Promise<AdminUser> {
  const res = await authRequest<{ data: AdminUser }>("/admin/couriers", {
    method: "POST", body: JSON.stringify(data),
  });
  return res.data;
}

export async function updateCourier(id: number, data: Partial<{ name: string; phone: string; is_active: boolean; password: string }>): Promise<void> {
  await authRequest(`/admin/couriers/${id}`, { method: "PATCH", body: JSON.stringify(data) });
}

// ─── Rates ────────────────────────────────────────────────────────────────────

export async function getRates(): Promise<Rate[]> {
  const res = await authRequest<{ data: Rate[] }>("/admin/rates");
  return res.data;
}

export async function createRate(data: Omit<Rate, "id">): Promise<Rate> {
  const res = await authRequest<{ data: Rate }>("/admin/rates", {
    method: "POST", body: JSON.stringify(data),
  });
  return res.data;
}

export async function updateRate(id: number, data: Partial<Rate>): Promise<void> {
  await authRequest(`/admin/rates/${id}`, { method: "PATCH", body: JSON.stringify(data) });
}

export async function deleteRate(id: number): Promise<void> {
  await authRequest(`/admin/rates/${id}`, { method: "DELETE" });
}

// ─── Contacts ────────────────────────────────────────────────────────────────

export async function getContacts(unread?: boolean): Promise<PaginatedResponse<Contact>> {
  return authRequest(`/admin/contacts${unread ? "?unread=1" : ""}`);
}

export async function markContactRead(id: number): Promise<void> {
  await authRequest(`/admin/contacts/${id}/read`, { method: "PATCH" });
}

export async function deleteContact(id: number): Promise<void> {
  await authRequest(`/admin/contacts/${id}`, { method: "DELETE" });
}

// ─── Finance ─────────────────────────────────────────────────────────────────

export async function getFinance(): Promise<FinanceData> {
  const res = await authRequest<{ data: FinanceData }>("/admin/finance");
  return res.data;
}

// ─── Reports ─────────────────────────────────────────────────────────────────

export async function getReports(params?: { month?: string; year?: string }): Promise<unknown> {
  const q = new URLSearchParams(params as Record<string, string>);
  const res = await authRequest<{ data: unknown }>(`/admin/reports?${q.toString()}`);
  return res.data;
}

// ─── Customers ────────────────────────────────────────────────────────────────

export async function getCustomers(): Promise<Customer[]> {
  const res = await authRequest<{ data: Customer[] }>("/admin/customers");
  return res.data;
}

// ─── Settings ────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<AdminUser> {
  const res = await authRequest<{ data: AdminUser }>("/admin/settings");
  return res.data;
}

export async function updateSettings(data: { name?: string; phone?: string; email?: string; password?: string; current_password?: string }): Promise<void> {
  await authRequest("/admin/settings", { method: "PATCH", body: JSON.stringify(data) });
}

// ─── Career / Job Positions ───────────────────────────────────────────────────

export interface JobPosition {
  id: number;
  title: string;
  type: string;
  location: string;
  description: string;
  wa_text: string | null;
  is_active: boolean;
  sort_order: number;
  requirements: string[];
  benefits: string[];
}

export interface JobPositionPayload {
  title: string;
  type: string;
  location: string;
  description: string;
  wa_text?: string;
  is_active?: boolean;
  sort_order?: number;
  requirements: string[];
  benefits: string[];
}

export async function getAdminCareer(): Promise<JobPosition[]> {
  const res = await authRequest<{ data: JobPosition[] }>("/admin/career");
  return res.data;
}

export async function createJobPosition(data: JobPositionPayload): Promise<JobPosition> {
  const res = await authRequest<{ data: JobPosition }>("/admin/career", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.data;
}

export async function updateJobPosition(id: number, data: JobPositionPayload): Promise<JobPosition> {
  const res = await authRequest<{ data: JobPosition }>(`/admin/career/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.data;
}

export async function toggleJobPosition(id: number): Promise<{ is_active: boolean }> {
  const res = await authRequest<{ data: { is_active: boolean } }>(`/admin/career/${id}/toggle`, {
    method: "PATCH",
  });
  return res.data;
}

export async function deleteJobPosition(id: number): Promise<void> {
  await authRequest(`/admin/career/${id}`, { method: "DELETE" });
}

// ─── Gallery API ───────────────────────────────────────────────────────────────

export interface GalleryImage {
  id: number;
  service_slug: string;
  image_path: string;
  url: string;
  caption: string | null;
  sort_order: number;
}

export async function getAdminGallery(slug: string): Promise<GalleryImage[]> {
  const res = await authRequest<{ data: GalleryImage[] }>(`/admin/gallery?slug=${slug}`);
  return res.data;
}

export async function uploadGalleryImage(
  serviceSlug: string,
  file: File,
  caption?: string
): Promise<GalleryImage> {
  const token = getToken();
  const formData = new FormData();
  formData.append("service_slug", serviceSlug);
  formData.append("image", file);
  if (caption) formData.append("caption", caption);

  const res = await fetch(`${API_BASE}/admin/gallery`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Gagal mengupload gambar");
  }

  const json = await res.json();
  return json.data;
}

export async function deleteGalleryImage(id: number): Promise<void> {
  await authRequest(`/admin/gallery/${id}`, { method: "DELETE" });
}
