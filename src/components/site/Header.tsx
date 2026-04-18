import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, LogOut, ShieldCheck, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/logo-pemkot.png";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={onHero ? "glass" : "outline"} size="default" className="hidden sm:inline-flex">
                  <UserIcon /> {user.email?.split("@")[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-popover">
                <DropdownMenuLabel className="text-xs">
                  {user.email}
                  {role && <div className="text-[10px] uppercase tracking-wider text-secondary font-bold mt-0.5">{role}</div>}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/pengajuan")}>Pengajuan Saya</DropdownMenuItem>
                {role === "admin" && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <ShieldCheck className="h-4 w-4 mr-2" /> Dashboard Admin
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="h-4 w-4 mr-2" /> Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="hero" size="default" className="hidden sm:inline-flex" onClick={() => navigate("/auth")}>
              Masuk
            </Button>
          )}
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
