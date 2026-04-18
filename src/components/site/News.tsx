import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const news = [
  {
    tag: "Kerja Sama",
    title: "Pemkot Yogyakarta Jalin Kerja Sama Smart City dengan Telkom",
    excerpt: "Penandatanganan MoU untuk pengembangan infrastruktur digital kota cerdas.",
    date: "12 Apr 2026",
    img: "linear-gradient(135deg,hsl(152,65%,32%),hsl(150,70%,42%))",
  },
  {
    tag: "Pengetahuan",
    title: "Panduan Baru Pengajuan Kerja Sama Antar Daerah",
    excerpt: "Update prosedur sesuai Permendagri terbaru untuk efisiensi proses.",
    date: "08 Apr 2026",
    img: "linear-gradient(135deg,hsl(44,96%,56%),hsl(38,100%,50%))",
  },
  {
    tag: "Sosialisasi",
    title: "Workshop Penguatan Kerja Sama Luar Negeri",
    excerpt: "Diikuti 15 OPD Pemkot Yogyakarta untuk mendorong sister-city.",
    date: "01 Apr 2026",
    img: "linear-gradient(135deg,hsl(156,70%,22%),hsl(152,65%,32%))",
  },
];

export const News = () => (
  <section className="py-24 bg-soft-gradient">
    <div className="container">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
        <div>
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            Berita & Informasi
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-primary text-balance max-w-2xl">
            Kabar Terbaru Kerja Sama Daerah
          </h2>
        </div>
        <a href="#" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
          Lihat semua <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {news.map((n, i) => (
          <motion.article
            key={n.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-card-elegant transition-all duration-500 hover:-translate-y-1 border border-border"
          >
            <div className="h-48 relative" style={{ background: n.img }}>
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-primary text-xs font-bold">
                {n.tag}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Calendar className="h-3.5 w-3.5" /> {n.date}
              </div>
              <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                {n.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{n.excerpt}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
