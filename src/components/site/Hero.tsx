import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import handshake from "@/assets/handshake-hero.png";

export const Hero = () => {
  return (
    <section className="relative min-h-[100vh] bg-hero-gradient overflow-hidden flex items-center pt-20">
      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />
      {/* Glowing orbs */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
      <div className="absolute bottom-20 -left-32 h-96 w-96 rounded-full bg-primary-glow/40 blur-3xl" />

      <div className="container relative grid lg:grid-cols-2 gap-12 items-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-primary-foreground"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold tracking-widest uppercase mb-6 border border-white/20">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            Pemerintah Kota Yogyakarta
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-balance">
            Fasilitasi & Pengelolaan{" "}
            <span className="text-secondary">Kerja Sama Daerah</span>{" "}
            yang Modern
          </h1>
          <div className="h-1.5 w-24 bg-gold-gradient rounded-full my-6" />
          <p className="text-lg opacity-90 max-w-xl leading-relaxed">
            Media digital tunggal untuk mengelola fasilitasi dan pengelolaan pengetahuan kerja sama daerah di
            Pemerintah Kota Yogyakarta — cepat, transparan, dan terintegrasi.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Button variant="hero" size="lg">
              Ajukan Kerja Sama
              <ArrowRight />
            </Button>
            <Button variant="glass" size="lg">
              Pelajari Selengkapnya
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12 max-w-md">
            {[
              { v: "1.000+", l: "Mitra" },
              { v: "850+", l: "Kerja Sama" },
              { v: "24/7", l: "Layanan" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl md:text-3xl font-extrabold text-secondary">{s.v}</div>
                <div className="text-xs uppercase tracking-wider opacity-80">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-secondary/20 blur-3xl rounded-full" />
          <img
            src={handshake}
            alt="Ilustrasi kerja sama"
            width={600}
            height={600}
            className="relative w-full max-w-lg animate-float drop-shadow-2xl"
          />
        </motion.div>
      </div>

      <div className="wave-divider" />
    </section>
  );
};
