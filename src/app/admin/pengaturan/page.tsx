"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Settings, User, Lock, Phone, Mail, Loader2,
  CheckCircle, AlertCircle, Eye, EyeOff,
} from "lucide-react";
import { getSettings, updateSettings, type AdminUser } from "@/lib/admin-api";

export default function PengaturanPage() {
  const [user, setUser]       = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [profileForm, setProfileForm] = useState({ name: "", email: "", phone: "" });
  const [passForm, setPassForm]       = useState({ current_password: "", password: "", password_confirmation: "" });

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    getSettings().then(u => {
      setUser(u);
      setProfileForm({ name: u.name, email: u.email, phone: u.phone ?? "" });
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await updateSettings({ name: profileForm.name, email: profileForm.email, phone: profileForm.phone || undefined });
      showToast("Profil berhasil disimpan!");
      setUser(u => u ? { ...u, ...profileForm } : u);
    } catch (e: unknown) { showToast(e instanceof Error ? e.message : "Gagal menyimpan", "error"); }
    finally { setSaving(false); }
  };

  const handleChangePassword = async () => {
    if (passForm.password !== passForm.password_confirmation) {
      showToast("Konfirmasi password tidak sesuai", "error"); return;
    }
    if (passForm.password.length < 8) {
      showToast("Password minimal 8 karakter", "error"); return;
    }
    setSaving(true);
    try {
      await updateSettings(passForm);
      showToast("Password berhasil diubah!");
      setPassForm({ current_password: "", password: "", password_confirmation: "" });
    } catch (e: unknown) { showToast(e instanceof Error ? e.message : "Gagal mengubah password", "error"); }
    finally { setSaving(false); }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 size={28} className="animate-spin text-red-500" /></div>;
  }

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium flex items-center gap-2 ${toast.type === "success" ? "bg-slate-900 text-white" : "bg-red-600 text-white"}`}>
          {toast.type === "success" ? <CheckCircle size={16} className="text-emerald-400" /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Pengaturan</h1>
        <p className="text-sm text-slate-500">Kelola profil dan keamanan akun admin Anda</p>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="xl:col-span-1">
          <Card className="border-slate-200 shadow-xs rounded-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="size-20 border-4 border-white shadow-md mb-4">
                  <AvatarFallback className="bg-red-100 text-red-600 font-extrabold text-2xl">
                    {user?.name?.[0]?.toUpperCase() ?? "A"}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-extrabold text-slate-900">{user?.name}</h2>
                <p className="text-sm text-slate-500 capitalize">{user?.role}</p>
                <div className="mt-4 flex flex-col gap-2 w-full text-xs text-slate-500">
                  <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl">
                    <Mail size={13} className="text-slate-400" />
                    <span className="truncate">{user?.email}</span>
                  </div>
                  {user?.phone && (
                    <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl">
                      <Phone size={13} className="text-slate-400" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>
                <div className={`mt-4 px-3 py-1.5 rounded-full text-xs font-bold border ${user?.is_active ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                  {user?.is_active ? "● Akun Aktif" : "● Akun Nonaktif"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Info */}
          <Card className="border-slate-200 shadow-xs rounded-2xl mt-4">
            <CardContent className="p-5">
              <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2"><Settings size={14} /> Info Aplikasi</h3>
              <div className="flex flex-col gap-2 text-xs text-slate-500">
                {[
                  ["Versi Backend", "Laravel 13"],
                  ["Versi Frontend", "Next.js 15"],
                  ["Database", "MySQL (cam_db)"],
                  ["Auth", "Laravel Sanctum"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1.5 border-b border-slate-100 last:border-0">
                    <span className="text-slate-400">{k}</span>
                    <span className="font-semibold text-slate-700">{v}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Forms */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Edit Profile */}
          <Card className="border-slate-200 shadow-xs rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
                <User size={16} className="text-slate-500" /> Edit Profil
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[["name","Nama Lengkap","text",<User key="u" size={14} />], ["email","Email","email",<Mail key="m" size={14} />], ["phone","No. HP (opsional)","tel",<Phone key="p" size={14} />]].map(([k, l, t, icon]) => (
                  <div key={k as string} className={k === "email" ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">{l as string}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon as React.ReactNode}</span>
                      <Input
                        type={t as string}
                        value={(profileForm as Record<string, string>)[k as string]}
                        onChange={e => setProfileForm(f => ({ ...f, [k as string]: e.target.value }))}
                        placeholder={l as string}
                        className="pl-9 rounded-xl border-slate-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={handleSaveProfile} disabled={saving} className="mt-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl px-6">
                {saving ? <><Loader2 size={14} className="animate-spin" /> Menyimpan...</> : "Simpan Profil"}
              </Button>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="border-slate-200 shadow-xs rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
                <Lock size={16} className="text-slate-500" /> Ganti Password
              </h3>
              <div className="flex flex-col gap-4">
                {/* Current Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Password Lama</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showOld ? "text" : "password"}
                      value={passForm.current_password}
                      onChange={e => setPassForm(f => ({ ...f, current_password: e.target.value }))}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400"
                    />
                    <button type="button" onClick={() => setShowOld(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                      {showOld ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
                {/* New Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Password Baru</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showNew ? "text" : "password"}
                      value={passForm.password}
                      onChange={e => setPassForm(f => ({ ...f, password: e.target.value }))}
                      placeholder="Min. 8 karakter"
                      className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400"
                    />
                    <button type="button" onClick={() => setShowNew(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                      {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {/* Strength indicator */}
                  {passForm.password.length > 0 && (
                    <div className="mt-2 flex gap-1">
                      {[4, 7, 10, 12].map((len, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full ${passForm.password.length >= len ? ["bg-red-400","bg-amber-400","bg-blue-400","bg-emerald-500"][i] : "bg-slate-200"}`} />
                      ))}
                      <span className="text-xs text-slate-400 ml-1">{passForm.password.length < 4 ? "Lemah" : passForm.password.length < 8 ? "Cukup" : passForm.password.length < 12 ? "Kuat" : "Sangat Kuat"}</span>
                    </div>
                  )}
                </div>
                {/* Confirm */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Konfirmasi Password Baru</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      value={passForm.password_confirmation}
                      onChange={e => setPassForm(f => ({ ...f, password_confirmation: e.target.value }))}
                      placeholder="Ulangi password baru"
                      className={`w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-100 ${passForm.password_confirmation && passForm.password !== passForm.password_confirmation ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-red-400"}`}
                    />
                  </div>
                  {passForm.password_confirmation && passForm.password !== passForm.password_confirmation && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={11} /> Password tidak cocok</p>
                  )}
                </div>
              </div>
              <Button onClick={handleChangePassword} disabled={saving || !passForm.current_password || !passForm.password}
                className="mt-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl px-6">
                {saving ? <><Loader2 size={14} className="animate-spin" /> Mengubah...</> : "Ganti Password"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
