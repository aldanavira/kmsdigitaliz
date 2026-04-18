import { useEffect, useState } from "react";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, FileUp, Send, Clock, ShieldCheck, XCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const steps = [
  { n: "01", t: "Daftar / Masuk", d: "Buat akun atau masuk dengan akun Anda." },
  { n: "02", t: "Isi Formulir", d: "Lengkapi data instansi dan tujuan kerja sama." },
  { n: "03", t: "Unggah Dokumen", d: "Lampirkan proposal dan dokumen pendukung." },
  { n: "04", t: "Verifikasi", d: "Tim memverifikasi dalam 5 hari kerja." },
  { n: "05", t: "MoU", d: "Penjadwalan penandatanganan kesepakatan." },
];

const schema = z.object({
  nama_instansi: z.string().trim().min(2).max(200),
  jenis_instansi: z.string().trim().min(2).max(100),
  penanggung_jawab: z.string().trim().min(2).max(150),
  email: z.string().trim().email().max(255),
  judul: z.string().trim().min(5).max(200),
  tujuan: z.string().trim().min(20).max(2000),
});

type Status = "pending" | "diverifikasi" | "ditolak" | "disetujui";
const statusMeta: Record<Status, { label: string; cls: string; Icon: typeof Clock }> = {
  pending: { label: "Menunggu", cls: "bg-amber-100 text-amber-800 border-amber-300", Icon: Clock },
  diverifikasi: { label: "Diverifikasi", cls: "bg-blue-100 text-blue-800 border-blue-300", Icon: ShieldCheck },
  disetujui: { label: "Disetujui", cls: "bg-green-100 text-green-800 border-green-300", Icon: CheckCircle2 },
  ditolak: { label: "Ditolak", cls: "bg-red-100 text-red-800 border-red-300", Icon: XCircle },
};

const Pengajuan = () => {
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<Array<{ id: string; judul: string; status: Status; created_at: string; catatan_admin: string | null }>>([]);

  const [form, setForm] = useState({
    nama_instansi: "", jenis_instansi: "", penanggung_jawab: "",
    email: user?.email ?? "", judul: "", tujuan: "",
  });

  useEffect(() => {
    if (user?.email) setForm((f) => ({ ...f, email: f.email || user.email! }));
  }, [user]);

  const loadHistory = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("pengajuan")
      .select("id, judul, status, created_at, catatan_admin")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setHistory((data ?? []) as typeof history);
  };

  useEffect(() => { loadHistory(); }, [user]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Silakan masuk terlebih dahulu");
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.errors[0].message);
    setBusy(true);
    const { error } = await supabase.from("pengajuan").insert({ ...parsed.data, user_id: user.id });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Pengajuan berhasil dikirim");
    setForm({ nama_instansi: "", jenis_instansi: "", penanggung_jawab: "", email: user.email ?? "", judul: "", tujuan: "" });
    loadHistory();
  };

  const set = <K extends keyof typeof form>(k: K, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <Layout>
      <PageHeader
        eyebrow="Layanan"
        title="Pengajuan Kerja Sama Daerah"
        description="Ajukan permohonan kerja sama daerah Anda secara online."
      />

      <section className="container py-16">
        <div className="grid md:grid-cols-5 gap-4 mb-12">
          {steps.map((s) => (
            <div key={s.n} className="bg-card-gradient border border-border rounded-2xl p-5 shadow-soft text-center">
              <div className="font-display text-3xl font-extrabold text-secondary">{s.n}</div>
              <div className="font-bold text-primary mt-1">{s.t}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.d}</div>
            </div>
          ))}
        </div>

        {history.length > 0 && (
          <div className="mb-10 bg-card border border-border rounded-3xl p-6 shadow-soft">
            <h2 className="font-display text-xl font-extrabold text-primary mb-4">Pengajuan Anda</h2>
            <div className="space-y-3">
              {history.map((h) => {
                const m = statusMeta[h.status];
                return (
                  <div key={h.id} className="flex items-start justify-between gap-4 p-4 bg-muted/30 rounded-xl">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{h.judul}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(h.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                      </div>
                      {h.catatan_admin && (
                        <div className="text-xs mt-1 text-muted-foreground italic">"{h.catatan_admin}"</div>
                      )}
                    </div>
                    <Badge variant="outline" className={m.cls}>
                      <m.Icon className="h-3 w-3 mr-1" /> {m.label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-8 shadow-soft">
            <h2 className="font-display text-2xl font-extrabold text-primary mb-6">Formulir Pengajuan</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label>Nama Instansi</Label>
                <Input value={form.nama_instansi} onChange={(e) => set("nama_instansi", e.target.value)} placeholder="PT / Universitas / Pemda ..." className="mt-1.5 h-11" required />
              </div>
              <div>
                <Label>Jenis Instansi</Label>
                <Input value={form.jenis_instansi} onChange={(e) => set("jenis_instansi", e.target.value)} placeholder="Swasta / Pemerintah / Perguruan Tinggi" className="mt-1.5 h-11" required />
              </div>
              <div>
                <Label>Penanggung Jawab</Label>
                <Input value={form.penanggung_jawab} onChange={(e) => set("penanggung_jawab", e.target.value)} placeholder="Nama lengkap" className="mt-1.5 h-11" required />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="email@instansi.id" className="mt-1.5 h-11" required />
              </div>
              <div className="sm:col-span-2">
                <Label>Judul Kerja Sama</Label>
                <Input value={form.judul} onChange={(e) => set("judul", e.target.value)} placeholder="Contoh: Kerja sama Smart City..." className="mt-1.5 h-11" required />
              </div>
              <div className="sm:col-span-2">
                <Label>Tujuan & Ruang Lingkup</Label>
                <Textarea value={form.tujuan} onChange={(e) => set("tujuan", e.target.value)} rows={5} placeholder="Jelaskan tujuan dan ruang lingkup..." className="mt-1.5" required />
              </div>
            </div>

            <div className="mt-6 border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary transition-colors">
              <FileUp className="h-10 w-10 text-primary mx-auto mb-2" />
              <div className="font-semibold">Unggah Proposal (PDF)</div>
              <div className="text-xs text-muted-foreground mt-1">Fitur unggah dokumen segera hadir</div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="mt-6 w-full sm:w-auto" disabled={busy}>
              <Send /> {busy ? "Mengirim..." : "Kirim Pengajuan"}
            </Button>
          </div>

          <aside className="bg-hero-gradient rounded-3xl p-8 text-primary-foreground shadow-hero h-fit">
            <h3 className="font-display text-xl font-extrabold">Persyaratan</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                "Instansi berbadan hukum / pemerintah resmi",
                "Proposal kerja sama (PDF, maks 10MB)",
                "Profil singkat instansi",
                "Surat permohonan resmi",
                "Kontak penanggung jawab aktif",
              ].map((r) => (
                <li key={r} className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                  <span className="opacity-95">{r}</span>
                </li>
              ))}
            </ul>
          </aside>
        </form>
      </section>
    </Layout>
  );
};

export default Pengajuan;
