"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { MessageSquare, Loader2, Trash2, Eye, CheckCircle, X, Mail, Phone, Clock } from "lucide-react";
import { getContacts, markContactRead, deleteContact, type Contact } from "@/lib/admin-api";

export default function KontenPage() {
  const [contacts, setContacts]   = useState<Contact[]>([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState<Contact | null>(null);
  const [toast, setToast]         = useState<string | null>(null);
  const [filterUnread, setFilter] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const fetchData = async () => {
    setLoading(true);
    try { const res = await getContacts(filterUnread); setContacts(res.data ?? []); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [filterUnread]);

  const handleMarkRead = async (c: Contact) => {
    try {
      await markContactRead(c.id);
      showToast("Pesan ditandai sudah dibaca");
      if (selected?.id === c.id) setSelected({ ...c, is_read: true });
      fetchData();
    } catch (e: unknown) { showToast(e instanceof Error ? e.message : "Gagal"); }
  };

  const handleDelete = async (c: Contact) => {
    if (!confirm("Hapus pesan ini?")) return;
    try { await deleteContact(c.id); showToast("Pesan dihapus"); setSelected(null); fetchData(); }
    catch (e: unknown) { showToast(e instanceof Error ? e.message : "Gagal"); }
  };

  const unread = contacts.filter(c => !c.is_read).length;

  return (
    <>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-medium flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-400" /> {toast}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
            Pesan Masuk
            {unread > 0 && <Badge className="bg-red-600 text-white font-bold text-xs">{unread} belum dibaca</Badge>}
          </h1>
          <p className="text-sm text-slate-500">Pesan dari form kontak website — {contacts.length} total</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={filterUnread ? "default" : "outline"} size="sm"
            onClick={() => setFilter(p => !p)}
            className={filterUnread ? "bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl" : "border-slate-200 text-slate-700 font-bold rounded-xl"}>
            {filterUnread ? "Semua" : "Belum Dibaca"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-2">
          <Card className="border-slate-200 shadow-xs rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center h-48"><Loader2 size={24} className="animate-spin text-red-500" /></div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <MessageSquare size={32} className="mx-auto mb-2 text-slate-200" />
                  <p className="text-sm text-slate-400">Tidak ada pesan {filterUnread ? "belum dibaca" : ""}</p>
                </div>
              ) : contacts.map((c) => (
                <button key={c.id} onClick={() => { setSelected(c); if (!c.is_read) handleMarkRead(c); }}
                  className={`w-full text-left p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors ${selected?.id === c.id ? "bg-red-50/60 border-l-2 border-l-red-500" : ""}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {!c.is_read && <div className="size-2 rounded-full bg-red-500 shrink-0" />}
                        <p className={`text-sm truncate ${!c.is_read ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>{c.name}</p>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{c.subject ?? c.message}</p>
                      <p className="text-xs text-slate-300 mt-1">{new Date(c.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <Card className="border-slate-200 shadow-xs rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{selected.subject ?? "Pesan"}</h2>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Mail size={11} /> {selected.email}</span>
                      {selected.phone && <span className="flex items-center gap-1"><Phone size={11} /> {selected.phone}</span>}
                      <span className="flex items-center gap-1"><Clock size={11} /> {new Date(selected.created_at).toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!selected.is_read && (
                      <Button variant="outline" size="sm" onClick={() => handleMarkRead(selected)} className="border-slate-200 text-slate-700 rounded-xl text-xs font-semibold gap-1">
                        <Eye size={12} /> Tandai Dibaca
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(selected)} className="text-red-500 hover:bg-red-50 size-8">
                      <Trash2 size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setSelected(null)} className="size-8 text-slate-400">
                      <X size={14} />
                    </Button>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400">Dari: <span className="font-semibold text-slate-700">{selected.name}</span></p>
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.subject ?? "Pesan Anda"}`}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700">
                    <Mail size={14} /> Balas via Email →
                  </a>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <div className="text-center">
                <MessageSquare size={40} className="mx-auto mb-3 text-slate-200" />
                <p className="text-sm text-slate-400">Pilih pesan untuk membacanya</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table view for all */}
      <Card className="border-slate-200 shadow-xs rounded-2xl overflow-hidden mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 border-slate-200">
                {["","Nama","Email","Subjek","Tanggal","Status"].map(h => (
                  <TableHead key={h} className="text-xs font-bold text-slate-700">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.slice(0, 20).map(c => (
                <TableRow key={c.id} className="border-slate-100 hover:bg-slate-50 cursor-pointer" onClick={() => setSelected(c)}>
                  <TableCell className="w-4">{!c.is_read && <div className="size-2 rounded-full bg-red-500" />}</TableCell>
                  <TableCell className={`text-xs whitespace-nowrap ${!c.is_read ? "font-bold text-slate-900" : "text-slate-700"}`}>{c.name}</TableCell>
                  <TableCell className="text-xs text-slate-500">{c.email}</TableCell>
                  <TableCell className="text-xs text-slate-600 max-w-[200px] truncate">{c.subject ?? c.message.slice(0, 40)}</TableCell>
                  <TableCell className="text-xs text-slate-400 whitespace-nowrap">{new Date(c.created_at).toLocaleDateString("id-ID")}</TableCell>
                  <TableCell><Badge className={c.is_read ? "bg-slate-100 text-slate-500 border border-slate-200 text-xs" : "bg-red-50 text-red-700 border border-red-200 text-xs font-bold"}>{c.is_read ? "Dibaca" : "Baru"}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
