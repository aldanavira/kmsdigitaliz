import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => (
  <section className="py-20">
    <div className="container">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-hero-gradient p-10 md:p-16 shadow-hero">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl" />
        <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center text-primary-foreground">
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-balance">
              Siap memulai kerja sama dengan Pemkot Yogyakarta?
            </h2>
            <p className="mt-4 opacity-90 max-w-xl">
              Ajukan permohonan kerja sama daerah Anda secara online — proses transparan, terdokumentasi, dan terpantau setiap tahapnya.
            </p>
          </div>
          <Button variant="hero" size="xl">
            Ajukan Sekarang <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  </section>
);
