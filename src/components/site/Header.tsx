import { Link, NavLink, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/logo-pemkot.png";

const nav = [
  { to: "/", label: "Beranda" },
  { to: "/pengetahuan", label: "Pengetahuan" },
  { to: "/statistik", label: "Statistik" },
  { to: "/pengajuan", label: "Pengajuan" },
  { to: "/faq", label: "FAQ" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onHero = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        onHero ? "bg-transparent" : "bg-background/90 backdrop-blur-lg shadow-soft"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Logo Pemkab Tanah Laut" className="h-12 w-12 object-contain transition-transform group-hover:scale-110" width={48} height={48} />
          <div className={`leading-tight ${onHero ? "text-primary-foreground" : "text-primary"}`}>
            <div className="font-display font-extrabold text-sm">BAGIAN PEREKONOMIAN</div>
            <div className="font-display font-extrabold text-sm">DAN KERJA SAMA</div>
            <div className="text-[10px] opacity-80 tracking-widest">KABUPATEN TANAH LAUT</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? onHero
                      ? "bg-white/15 text-primary-foreground"
                      : "bg-primary/10 text-primary"
                    : onHero
                    ? "text-primary-foreground/90 hover:bg-white/10"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Cari"
            className={`hidden md:grid place-items-center h-10 w-10 rounded-full transition-colors ${
              onHero ? "text-primary-foreground hover:bg-white/15" : "text-primary hover:bg-primary/10"
            }`}
          >
            <Search className="h-5 w-5" />
          </button>
          <Button variant="hero" size="default" className="hidden sm:inline-flex">
            Masuk
          </Button>
          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className={`lg:hidden grid place-items-center h-10 w-10 rounded-full ${
              onHero ? "text-primary-foreground" : "text-primary"
            }`}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-background border-t border-border shadow-card-elegant">
          <nav className="container py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-semibold ${
                    isActive ? "bg-primary/10 text-primary" : "text-foreground/80"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
