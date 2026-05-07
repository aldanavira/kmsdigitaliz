import { useEffect, useState } from "react";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, FileUp, Send, Clock, ShieldCheck, XCircle, FileText } from "lucide-react";
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
  nama_instansi: z.string().trim().min(2, "Nama instansi wajib diisi").max(200),
  jenis_instansi: z.string().trim().min(2, "Jenis pihak ketiga wajib diisi").max(100),
  penanggung_jawab: z.string().trim().min(2, "PIC wajib diisi").max(150),
  kontak: z.string().trim().min(5, "Kontak wajib diisi").max(150),
  email: z.string().trim().email("Email tidak valid").max(255),
  judul: z.string().trim().min(5, "Judul minimal 5 karakter").max(200),
  latar_belakang: z.string().trim().min(10, "Latar belakang minimal 10 karakter").max(3000),
  dasar_hukum: z.string().trim().min(3).max(2000),
  tujuan: z.string().trim().min(10, "Maksud & tujuan minimal 10 karakter").max(2000),
  objek_kerjasama: z.string().trim().min(3).max(1000),
  ruang_lingkup: z.string().trim().min(3).max(2000),
  aktivitas: z.string().trim().min(3).max(2000),
  jangka_waktu: z.string().trim().min(2).max(200),
  analisis_manfaat_biaya: z.string().trim().min(10).max(3000),
  kesimpulan: z.string().trim().min(10).max(2000),
});

type Status = "pending" | "diverifikasi" | "ditolak" | "disetujui";
const statusMeta: Record<Status, { label: string; cls: string; Icon: typeof Clock }> = {
  pending: { label: "Menunggu", cls: "bg-amber-100 text-amber-800 border-amber-300", Icon: Clock },
  diverifikasi: { label: "Diverifikasi", cls: "bg-blue-100 text-blue-800 border-blue-300", Icon: ShieldCheck },
  disetujui: { label: "Disetujui", cls: "bg-green-100 text-green-800 border-green-300", Icon: CheckCircle2 },
  ditolak: { label: "Ditolak", cls: "bg-red-100 text-red-800 border-red-300", Icon: XCircle },
};

const initialForm = {
  nama_instansi: "", jenis_instansi: "", penanggung_jawab: "", kontak: "",
  email: "", judul: "", latar_belakang: "", dasar_hukum: "", tujuan: "",
  objek_kerjasama: "", ruang_lingkup: "", aktivitas: "", jangka_waktu: "",
  analisis_manfaat_biaya: "", kesimpulan: "",
};

const Pengajuan = () => {
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [history, setHistory] = useState<Array<{ id: string; judul: string; status: Status; created_at: string; catatan_admin: string | null }>>([]);
  const [form, setForm] = useState({ ...initialForm, email: user?.email ?? "" });

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

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (f && f.size > 10 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 10MB");
      return;
    }
    setFile(f);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Silakan masuk terlebih dahulu");
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.errors[0].message);
    setBusy(true);
    try {
      let proposal_url: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop();
        const path = `${user.id}/${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage.from("proposal").upload(path, file);
        if (upErr) throw upErr;
        proposal_url = path;
      }
      const payload = { ...parsed.data, user_id: user.id, proposal_url };
      const { error } = await supabase.from("pengajuan").insert(payload as any);
      if (error) throw error;
      toast.success("Pengajuan berhasil dikirim");
      setForm({ ...initialForm, email: user.email ?? "" });
      setFile(null);
      loadHistory();
    } catch (err: any) {
      toast.error(err.message ?? "Gagal mengirim pengajuan");
    } finally {
      setBusy(false);
    }
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
          <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-8 shadow-soft space-y-8">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-primary mb-1">Formulir Pengajuan Kerja Sama</h2>
              <p className="text-sm text-muted-foreground">Lengkapi seluruh data berikut dengan benar.</p>
            </div>

            <section>
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2"><span className="h-1 w-6 bg-secondary rounded-full" /> Data Pemohon</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label>Nama Instansi / Perusahaan</Label>
                  <Input value={form.nama_instansi} onChange={(e) => set("nama_instansi", e.target.value)} placeholder="PT / Universitas / Pemda ..." className="mt-1.5 h-11" required />
                </div>
                <div>
                  <Label>Jenis Pihak Ketiga</Label>
                  <Input value={form.jenis_instansi} onChange={(e) => set("jenis_instansi", e.target.value)} placeholder="Swasta / BUMN / Perguruan Tinggi / NGO" className="mt-1.5 h-11" required />
                </div>
                <div>
                  <Label>PIC (Penanggung Jawab)</Label>
                  <Input value={form.penanggung_jawab} onChange={(e) => set("penanggung_jawab", e.target.value)} placeholder="Nama lengkap PIC" className="mt-1.5 h-11" required />
                </div>
                <div>
                  <Label>Kontak (No. HP / WhatsApp)</Label>
                  <Input value={form.kontak} onChange={(e) => set("kontak", e.target.value)} placeholder="+62 ..." className="mt-1.5 h-11" required />
                </div>
                <div className="sm:col-span-2">
                  <Label>Email</Label>
                  <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="email@instansi.id" className="mt-1.5 h-11" required />
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2"><span className="h-1 w-6 bg-secondary rounded-full" /> Substansi Kerja Sama</h3>
              <div className="grid gap-5">
                <div>
                  <Label>Judul Kerja Sama</Label>
                  <Input value={form.judul} onChange={(e) => set("judul", e.target.value)} placeholder="Contoh: Kerja sama Smart City Tanah Laut" className="mt-1.5 h-11" required />
                </div>
                <div>
                  <Label>Latar Belakang</Label>
                  <Textarea value={form.latar_belakang} onChange={(e) => set("latar_belakang", e.target.value)} rows={4} placeholder="Jelaskan kondisi/permasalahan yang melatari kerja sama..." className="mt-1.5" required />
                </div>
                <div>
                  <Label>Dasar Hukum</Label>
                  <Textarea value={form.dasar_hukum} onChange={(e) => set("dasar_hukum", e.target.value)} rows={3} placeholder="UU / PP / Perda / Peraturan terkait" className="mt-1.5" required />
                </div>
                <div>
                  <Label>Maksud & Tujuan</Label>
                  <Textarea value={form.tujuan} onChange={(e) => set("tujuan", e.target.value)} rows={3} placeholder="Maksud dan tujuan kerja sama..." className="mt-1.5" required />
                </div>
                <div>
                  <Label>Objek Kerja Sama</Label>
                  <Textarea value={form.objek_kerjasama} onChange={(e) => set("objek_kerjasama", e.target.value)} rows={2} placeholder="Apa yang menjadi objek kerja sama" className="mt-1.5" required />
                </div>
                <div>
                  <Label>Ruang Lingkup</Label>
                  <Textarea value={form.ruang_lingkup} onChange={(e) => set("ruang_lingkup", e.target.value)} rows={3} placeholder="Batasan/lingkup kerja sama" className="mt-1.5" required />
                </div>
                <div>
                  <Label>Aktivitas / Kegiatan</Label>
                  <Textarea value={form.aktivitas} onChange={(e) => set("aktivitas", e.target.value)} rows={3} placeholder="Daftar kegiatan yang akan dilaksanakan" className="mt-1.5" required />
                </div>
                <div>
                  <Label>Jangka Waktu</Label>
                  <Input value={form.jangka_waktu} onChange={(e) => set("jangka_waktu", e.target.value)} placeholder="Contoh: 3 tahun (2026 – 2029)" className="mt-1.5 h-11" required />
                </div>
                <div>
                  <Label>Analisis Manfaat & Biaya</Label>
                  <Textarea value={form.analisis_manfaat_biaya} onChange={(e) => set("analisis_manfaat_biaya", e.target.value)} rows={4} placeholder="Manfaat yang diharapkan dan estimasi biaya" className="mt-1.5" required />
                </div>
                <div>
                  <Label>Kesimpulan / Rekomendasi</Label>
                  <Textarea value={form.kesimpulan} onChange={(e) => set("kesimpulan", e.target.value)} rows={3} placeholder="Kesimpulan dan rekomendasi pemohon" className="mt-1.5" required />
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2"><span className="h-1 w-6 bg-secondary rounded-full" /> Dokumen Pendukung</h3>
              <label className="block border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <input type="file" accept=".pdf,.doc,.docx" onChange={onFile} className="hidden" />
                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div className="text-left">
                      <div className="font-semibold truncate max-w-xs">{file.name}</div>
                      <div className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB · klik untuk ganti</div>
                    </div>
                  </div>
                ) : (
                  <>
                    <FileUp className="h-10 w-10 text-primary mx-auto mb-2" />
                    <div className="font-semibold">Unggah Studi Kelayakan / Proposal</div>
                    <div className="text-xs text-muted-foreground mt-1">PDF / DOC / DOCX · maks 10MB</div>
                  </>
                )}
              </label>
            </section>

            <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto" disabled={busy}>
              <Send /> {busy ? "Mengirim..." : "Kirim Pengajuan"}
            </Button>
          </div>

          <aside className="bg-hero-gradient rounded-3xl p-8 text-primary-foreground shadow-hero h-fit lg:sticky lg:top-24">
            <h3 className="font-display text-xl font-extrabold">Persyaratan</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                "Instansi berbadan hukum / pemerintah resmi",
                "Studi kelayakan / proposal (PDF/DOC, maks 10MB)",
                "Profil singkat instansi & PIC aktif",
                "Dasar hukum yang relevan",
                "Analisis manfaat dan biaya yang jelas",
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
