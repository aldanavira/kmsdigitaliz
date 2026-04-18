import { motion } from "framer-motion";
import { TrendingUp, Users, Building2, Globe2 } from "lucide-react";

const stats = [
  { icon: Building2, label: "Total Kerja Sama", value: "857", note: "+12% tahun ini" },
  { icon: Users, label: "Mitra Aktif", value: "1.024", note: "se-Indonesia" },
  { icon: Globe2, label: "Kerja Sama Luar Negeri", value: "23", note: "9 negara" },
  { icon: TrendingUp, label: "Realisasi 2024", value: "98%", note: "tepat waktu" },
];

export const StatsBand = () => (
  <section className="py-20 bg-primary-deep relative overflow-hidden">
    <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: "radial-gradient(circle at 30% 20%, hsl(var(--secondary)) 0, transparent 50%), radial-gradient(circle at 70% 80%, hsl(var(--primary-glow)) 0, transparent 50%)",
    }} />
    <div className="container relative">
      <div className="text-center mb-12 text-primary-foreground">
        <h2 className="font-display text-3xl md:text-5xl font-extrabold">
          Capaian Kerja Sama Daerah
        </h2>
        <p className="mt-3 opacity-80">Data terkini per kuartal terakhir</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-primary-foreground hover:bg-white/10 transition-colors"
          >
            <div className="h-12 w-12 rounded-xl bg-secondary text-secondary-foreground grid place-items-center mb-4">
              <s.icon className="h-6 w-6" />
            </div>
            <div className="font-display text-4xl font-extrabold text-secondary">{s.value}</div>
            <div className="font-semibold mt-1">{s.label}</div>
            <div className="text-xs opacity-70 mt-1">{s.note}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
