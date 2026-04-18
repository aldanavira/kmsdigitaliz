import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export const PageHeader = ({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) => (
  <section className="relative bg-hero-gradient pt-32 pb-24 overflow-hidden">
    <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
      backgroundSize: "40px 40px",
    }} />
    <div className="container relative text-center text-primary-foreground">
      {eyebrow && (
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-bold tracking-widest uppercase mb-4">
          {eyebrow}
        </div>
      )}
      <h1 className="font-display text-4xl md:text-6xl font-extrabold text-balance">{title}</h1>
      {description && <p className="mt-4 max-w-2xl mx-auto text-lg opacity-90">{description}</p>}
    </div>
    <div className="wave-divider" />
  </section>
);
