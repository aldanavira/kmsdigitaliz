import { Layout, PageHeader } from "@/components/site/Layout";
import { TrendingUp, Building2, Users, Globe2 } from "lucide-react";

const cards = [
  { icon: Building2, label: "Total Kerja Sama", value: "857", color: "from-primary to-primary-glow" },
  { icon: Users, label: "Mitra Aktif", value: "1.024", color: "from-secondary to-secondary-glow" },
  { icon: Globe2, label: "Kerja Sama Internasional", value: "23", color: "from-primary-deep to-primary" },
  { icon: TrendingUp, label: "Realisasi 2024", value: "98%", color: "from-secondary-glow to-secondary" },
];

const byType = [
  { name: "Antar Pemerintah Daerah", count: 312, pct: 36 },
  { name: "Pemerintah - Swasta", count: 256, pct: 30 },
  { name: "Pemerintah - Perguruan Tinggi", count: 178, pct: 21 },
  { name: "Kerja Sama Luar Negeri", count: 64, pct: 7 },
  { name: "Lembaga / Komunitas", count: 47, pct: 6 },
];

const Statistik = () => (
  <Layout>
    <PageHeader
      eyebrow="Data Terkini"
      title="Statistik Kerja Sama Daerah"
      description="Visualisasi capaian kerja sama daerah Pemerintah Kota Yogyakarta."
    />

    <section className="container py-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {cards.map((c) => (
          <div key={c.label} className={`relative overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-card-elegant bg-gradient-to-br ${c.color}`}>
            <c.icon className="h-10 w-10 opacity-30 absolute -bottom-2 -right-2 scale-150" />
            <div className="relative">
              <div className="font-display text-5xl font-extrabold">{c.value}</div>
              <div className="mt-2 font-semibold text-sm opacity-90">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-3xl p-8 shadow-soft">
        <h2 className="font-display text-2xl font-extrabold text-primary mb-6">Distribusi Kerja Sama per Jenis</h2>
        <div className="space-y-5">
          {byType.map((t) => (
            <div key={t.name}>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-foreground">{t.name}</span>
                <span className="text-muted-foreground">{t.count} <span className="text-primary">({t.pct}%)</span></span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-hero-gradient rounded-full transition-all duration-700" style={{ width: `${t.pct * 2.5}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Statistik;
