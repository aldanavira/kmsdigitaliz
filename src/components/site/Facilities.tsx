import { motion } from "framer-motion";
import { FileText, BookOpen, BarChart3, MessageCircleQuestion, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  {
    icon: FileText,
    title: "Pengajuan",
    sub: "Kerja Sama Daerah",
    desc: "Ajukan permohonan kerja sama daerah secara online, mudah dan terdokumentasi.",
    to: "/pengajuan",
  },
  {
    icon: BookOpen,
    title: "Pengetahuan",
    sub: "Kerja Sama Daerah",
    desc: "Akses regulasi, panduan, dan referensi kerja sama daerah Pemkab Tanah Laut.",
    to: "/pengetahuan",
  },
  {
    icon: BarChart3,
    title: "Statistik Data",
    sub: "Kerja Sama Daerah",
    desc: "Pantau perkembangan kerja sama melalui data dan visualisasi terkini.",
    to: "/statistik",
  },
  {
    icon: MessageCircleQuestion,
    title: "Tanya Disini",
    sub: "Kerja Sama Daerah",
    desc: "Pertanyaan seputar kerja sama daerah? Kami siap membantu Anda.",
    to: "/faq",
  },
];

export const Facilities = () => (
  <section className="py-24 bg-soft-gradient">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
          Layanan
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-primary text-balance">
          Fasilitas Kerja Sama Daerah
        </h2>
        <p className="mt-4 text-muted-foreground">Silakan pilih fasilitas di bawah untuk membantu Anda</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              to={item.to}
              className="group relative block h-full bg-card-gradient rounded-3xl p-7 shadow-soft hover:shadow-card-elegant transition-all duration-500 hover:-translate-y-2 border border-border overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/5 group-hover:bg-secondary/20 transition-colors" />
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-hero-gradient grid place-items-center shadow-soft mb-5 group-hover:scale-110 transition-transform">
                  <item.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-extrabold text-primary leading-tight">
                  {item.title}
                </h3>
                <div className="text-sm font-semibold text-secondary mb-3">{item.sub}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-1 mt-5 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                  Selengkapnya <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
