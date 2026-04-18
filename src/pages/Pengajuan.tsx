import { Layout, PageHeader } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, FileUp, Send } from "lucide-react";
import { toast } from "sonner";

const steps = [
  { n: "01", t: "Daftar / Masuk", d: "Buat akun atau masuk dengan akun Anda." },
  { n: "02", t: "Isi Formulir", d: "Lengkapi data instansi dan tujuan kerja sama." },
  { n: "03", t: "Unggah Dokumen", d: "Lampirkan proposal dan dokumen pendukung." },
  { n: "04", t: "Verifikasi", d: "Tim memverifikasi dalam 5 hari kerja." },
  { n: "05", t: "MoU", d: "Penjadwalan penandatanganan kesepakatan." },
];

const Pengajuan = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pengajuan sedang dipersiapkan", {
      description: "Aktifkan login & backend untuk menyimpan pengajuan secara permanen.",
    });
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Layanan"
        title="Pengajuan Kerja Sama Daerah"
        description="Ajukan permohonan kerja sama daerah Anda secara online."
      />

      <section className="container py-16">
        {/* Steps */}
        <div className="grid md:grid-cols-5 gap-4 mb-16">
          {steps.map((s) => (
            <div key={s.n} className="bg-card-gradient border border-border rounded-2xl p-5 shadow-soft text-center">
              <div className="font-display text-3xl font-extrabold text-secondary">{s.n}</div>
              <div className="font-bold text-primary mt-1">{s.t}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.d}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-8 shadow-soft">
            <h2 className="font-display text-2xl font-extrabold text-primary mb-6">Formulir Pengajuan</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label>Nama Instansi</Label>
                <Input placeholder="PT / Universitas / Pemda ..." className="mt-1.5 h-11" required />
              </div>
              <div>
                <Label>Jenis Instansi</Label>
                <Input placeholder="Swasta / Pemerintah / Perguruan Tinggi" className="mt-1.5 h-11" required />
              </div>
              <div>
                <Label>Penanggung Jawab</Label>
                <Input placeholder="Nama lengkap" className="mt-1.5 h-11" required />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="email@instansi.id" className="mt-1.5 h-11" required />
              </div>
              <div className="sm:col-span-2">
                <Label>Judul Kerja Sama</Label>
                <Input placeholder="Contoh: Kerja sama Smart City..." className="mt-1.5 h-11" required />
              </div>
              <div className="sm:col-span-2">
                <Label>Tujuan & Ruang Lingkup</Label>
                <Textarea rows={5} placeholder="Jelaskan tujuan dan ruang lingkup..." className="mt-1.5" required />
              </div>
            </div>

            <div className="mt-6 border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary transition-colors">
              <FileUp className="h-10 w-10 text-primary mx-auto mb-2" />
              <div className="font-semibold">Unggah Proposal (PDF)</div>
              <div className="text-xs text-muted-foreground mt-1">Maks 10MB</div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="mt-6 w-full sm:w-auto">
              <Send /> Kirim Pengajuan
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
