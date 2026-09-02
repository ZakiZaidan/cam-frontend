"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard, Package, Users, Truck, DollarSign,
  BarChart3, FileText, Settings, Bell, Search, Menu,
  LogOut, Edit, Briefcase, Images,
} from "lucide-react";
import { logout, getMe, type AdminUser } from "@/lib/admin-api";

const SIDEBAR_ITEMS = [
  { icon: <LayoutDashboard size={18} />, label: "Overview",   href: "/admin" },
  { icon: <Package size={18} />,        label: "Pengiriman",  href: "/admin/pengiriman" },
  { icon: <Users size={18} />,          label: "Pelanggan",   href: "/admin/pelanggan" },
  { icon: <Truck size={18} />,          label: "Kurir",       href: "/admin/kurir" },
  { icon: <DollarSign size={18} />,     label: "Tarif",       href: "/admin/tarif" },
  { icon: <BarChart3 size={18} />,      label: "Keuangan",    href: "/admin/keuangan" },
  { icon: <FileText size={18} />,       label: "Laporan",     href: "/admin/laporan" },
  { icon: <Briefcase size={18} />,      label: "Karir",       href: "/admin/karir" },
  { icon: <Images size={18} />,         label: "Galeri",      href: "/admin/galeri" },
  { icon: <Edit size={18} />,           label: "Konten",      href: "/admin/konten" },
  { icon: <Settings size={18} />,       label: "Pengaturan",  href: "/admin/pengaturan" },
];

function SidebarNav({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <nav className="flex-1 py-4 px-3 overflow-y-auto">
      <div className="flex flex-col gap-1">
        {SIDEBAR_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive(item.href)
                ? "text-red-600 bg-red-50 border border-red-200/60"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {item.icon}
            <span className="flex-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

function SidebarContent({ pathname, user, onNavigate }: { pathname: string; user: AdminUser | null; onNavigate?: () => void }) {
  const router = useRouter();

  const handleLogout = async () => {
    try { await logout(); } catch {}
    router.push("/admin/login");
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Logo */}
      <div className="p-5 flex items-center border-b border-slate-200">
        <Link href="/admin" className="flex items-center gap-2.5" onClick={onNavigate}>
          <Image src="/logo/camLogo.png" alt="CAM Cargo" width={36} height={36} />
          <div>
            <span className="text-sm font-bold text-slate-900">CAM</span>
            <span className="text-sm font-bold text-red-600"> Admin</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <SidebarNav pathname={pathname} onNavigate={onNavigate} />

      {/* User */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <Avatar className="size-9 border border-slate-200">
            <AvatarFallback className="bg-red-50 text-red-600 text-sm font-bold">
              {user?.name?.[0]?.toUpperCase() ?? "A"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">{user?.name ?? "Admin"}</p>
            <p className="text-xs text-slate-500 font-medium capitalize">{user?.role ?? "admin"}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="text-slate-400 hover:text-red-600" title="Logout">
            <LogOut size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === "/admin/login") return;
    const token = localStorage.getItem("cam_admin_token");
    if (!token) { router.push("/admin/login"); return; }

    getMe()
      .then(setUser)
      .catch(() => { router.push("/admin/login"); });
  }, [pathname, router]);

  // Don't render layout on login page
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 z-30 shrink-0">
        <SidebarContent pathname={pathname} user={user} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
          <div className="flex items-center justify-between px-4 lg:px-6 py-3">
            <div className="flex items-center gap-3">
              {/* Mobile Sidebar */}
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger render={
                  <Button variant="ghost" size="icon" className="lg:hidden text-slate-700">
                    <Menu size={20} />
                  </Button>
                } />
                <SheetContent side="left" className="w-64 p-0 bg-white border-slate-200">
                  <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
                  <SidebarContent pathname={pathname} user={user} onNavigate={() => setSheetOpen(false)} />
                </SheetContent>
              </Sheet>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 w-72">
                <Search size={16} className="text-slate-400" />
                <Input
                  type="text"
                  placeholder="Cari resi, pelanggan..."
                  className="bg-transparent border-0 shadow-none focus-visible:ring-0 h-7 text-xs text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative text-slate-700 hover:bg-slate-100">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-600" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
