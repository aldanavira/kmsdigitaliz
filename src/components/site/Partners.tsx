const partners = [
  "LinkAja", "UPY", "UGM Archiplan", "Perkumpulan IDEA", "Banyuwangi", "BPN",
  "Bank BPD DIY", "ITB", "UII", "Telkom", "PLN", "Kemenkumham",
];

export const Partners = () => (
  <section className="py-20 bg-background overflow-hidden">
    <div className="container text-center mb-10">
      <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 text-secondary-foreground text-xs font-bold tracking-widest uppercase mb-4">
        Mitra
      </div>
      <h2 className="font-display text-3xl md:text-5xl font-extrabold text-primary">
        Mitra Kerja Sama Daerah
      </h2>
      <p className="mt-3 text-muted-foreground">Dipercaya lebih dari 1.000 rekanan di Seluruh Indonesia</p>
    </div>

    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex gap-6 animate-marquee w-max">
        {[...partners, ...partners].map((p, i) => (
          <div
            key={i}
            className="shrink-0 h-24 w-48 rounded-2xl bg-card-gradient border border-border shadow-soft grid place-items-center font-display font-bold text-primary text-lg"
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  </section>
);
