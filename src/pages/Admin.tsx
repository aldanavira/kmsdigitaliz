import { useEffect, useState } from "react";
import { Layout, PageHeader } from "@/components/site/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Eye, FileText, Clock, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";

type Status = "pending" | "diverifikasi" | "ditolak" | "disetujui";

interface Pengajuan {
  id: string;
  nama_instansi: string;
  jenis_instansi: string;
  penanggung_jawab: string;
  email: string;
  judul: string;
  tujuan: string;
  status: Status;
  catatan_admin: string | null;
  created_at: string;
}

const statusMeta: Record<Status, { label: string; cls: string; icon: typeof Clock }> = {
  pending: { label: "Menunggu", cls: "bg-amber-100 text-amber-800 border-amber-300", icon: Clock },
  diverifikasi: { label: "Diverifikasi", cls: "bg-blue-100 text-blue-800 border-blue-300", icon: ShieldCheck },
  disetujui: { label: "Disetujui", cls: "bg-green-100 text-green-800 border-green-300", icon: CheckCircle2 },
  ditolak: { label: "Ditolak", cls: "bg-red-100 text-red-800 border-red-300", icon: XCircle },
};

const Admin = () => {
  const [items, setItems] = useState<Pengajuan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [selected, setSelected] = useState<Pengajuan | null>(null);
  const [editStatus, setEditStatus] = useState<Status>("pending");
  const [editNote, setEditNote] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pengajuan")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setItems((data ?? []) as Pengajuan[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openDetail = (p: Pengajuan) => {
    setSelected(p);
    setEditStatus(p.status);
    setEditNote(p.catatan_admin ?? "");
  };

  const saveChanges = async () => {
    if (!selected) return;
    setSaving(true);
    const { error } = await supabase
      .from("pengajuan")
      .update({ status: editStatus, catatan_admin: editNote })
      .eq("id", selected.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Pengajuan diperbarui");
    setSelected(null);
    load();
  };

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  const counts = {
    all: items.length,
    pending: items.filter((i) => i.status === "pending").length,
    diverifikasi: items.filter((i) => i.status === "diverifikasi").length,
    disetujui: items.filter((i) => i.status === "disetujui").length,
    ditolak: items.filter((i) => i.status === "ditolak").length,
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Admin"
        title="Kelola Pengajuan Kerja Sama"
        description="Tinjau, verifikasi, dan kelola seluruh pengajuan."
      />

      <section className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {(["all", "pending", "diverifikasi", "disetujui", "ditolak"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                filter === k
                  ? "border-primary bg-primary/5 shadow-soft"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="text-2xl font-extrabold text-primary">{counts[k]}</div>
              <div className="text-xs font-semibold text-muted-foreground capitalize">
                {k === "all" ? "Semua" : statusMeta[k].label}
              </div>
            </button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-3xl shadow-soft overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-muted-foreground">Memuat...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <div className="text-muted-foreground">Belum ada pengajuan</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="p-4 font-bold">Tanggal</th>
                    <th className="p-4 font-bold">Instansi</th>
                    <th className="p-4 font-bold">Judul</th>
                    <th className="p-4 font-bold">Penanggung Jawab</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => {
                    const Sm = statusMeta[p.status];
                    return (
                      <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                        <td className="p-4 text-xs text-muted-foreground">
                          {new Date(p.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                        <td className="p-4">
                          <div className="font-semibold">{p.nama_instansi}</div>
                          <div className="text-xs text-muted-foreground">{p.jenis_instansi}</div>
                        </td>
                        <td className="p-4 max-w-xs truncate">{p.judul}</td>
                        <td className="p-4">
                          <div>{p.penanggung_jawab}</div>
                          <div className="text-xs text-muted-foreground">{p.email}</div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className={Sm.cls}>
                            <Sm.icon className="h-3 w-3 mr-1" /> {Sm.label}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button size="sm" variant="outline" onClick={() => openDetail(p)}>
                            <Eye /> Detail
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-primary">{selected.judul}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase">Instansi</div>
                    <div>{selected.nama_instansi}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase">Jenis</div>
                    <div>{selected.jenis_instansi}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase">Penanggung Jawab</div>
                    <div>{selected.penanggung_jawab}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase">Email</div>
                    <div>{selected.email}</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase mb-1">Tujuan & Ruang Lingkup</div>
                  <div className="bg-muted/40 rounded-xl p-4 text-sm whitespace-pre-wrap">{selected.tujuan}</div>
                </div>
                <div className="border-t pt-4 space-y-3">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Status</label>
                    <Select value={editStatus} onValueChange={(v) => setEditStatus(v as Status)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Menunggu</SelectItem>
                        <SelectItem value="diverifikasi">Diverifikasi</SelectItem>
                        <SelectItem value="disetujui">Disetujui</SelectItem>
                        <SelectItem value="ditolak">Ditolak</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Catatan Admin</label>
                    <Textarea value={editNote} onChange={(e) => setEditNote(e.target.value)} rows={3} placeholder="Tulis catatan untuk pemohon..." />
                  </div>
                  <Button variant="hero" size="lg" className="w-full" onClick={saveChanges} disabled={saving}>
                    {saving ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;
