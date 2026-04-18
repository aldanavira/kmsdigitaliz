import { Layout, PageHeader } from "@/components/site/Layout";
import { Search, BookOpen, FileText, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const docs = [
  { cat: "Regulasi", title: "Permendagri No. 22 Tahun 2020 tentang Tata Cara Kerja Sama Daerah", year: 2020 },
  { cat: "Regulasi", title: "Perwal Yogyakarta No. 14 Tahun 2021 tentang Pedoman Kerja Sama Daerah", year: 2021 },
  { cat: "Panduan", title: "Buku Panduan Pengajuan Kerja Sama Daerah Pemkot Yogyakarta", year: 2024 },
  { cat: "Panduan", title: "SOP Fasilitasi Kerja Sama Antar Daerah", year: 2023 },
  { cat: "Studi Kasus", title: "Best Practice Sister City Yogyakarta - Kyoto", year: 2023 },
  { cat: "Studi Kasus", title: "Implementasi Kerja Sama Smart City", year: 2024 },
];

const Pengetahuan = () => (
  <Layout>
    <PageHeader
      eyebrow="Pengetahuan"
      title="Pengetahuan Kerja Sama Daerah"
      description="Akses regulasi, panduan, dan studi kasus kerja sama daerah Pemerintah Kota Yogyakarta."
    />

    <section className="container py-16">
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Cari regulasi, panduan, atau studi kasus..." className="h-14 pl-14 rounded-full text-base" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {docs.map((d) => (
          <article key={d.title} className="group bg-card-gradient border border-border rounded-2xl p-6 shadow-soft hover:shadow-card-elegant hover:-translate-y-1 transition-all">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 grid place-items-center text-primary shrink-0">
                {d.cat === "Regulasi" ? <FileText /> : <BookOpen />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary-foreground bg-secondary px-2 py-0.5 rounded-full">{d.cat}</span>
                  <span className="text-xs text-muted-foreground">{d.year}</span>
                </div>
                <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {d.title}
                </h3>
                <Button variant="link" className="px-0 h-auto mt-3 text-primary"><Download className="h-4 w-4" /> Unduh PDF</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  </Layout>
);

export default Pengetahuan;
