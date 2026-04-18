import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/logo-pemkot.png";

export const Footer = () => {
  return (
    <footer className="bg-primary-deep text-primary-foreground mt-24">
      <div className="container py-16 grid gap-10 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Logo" className="h-14 w-14" width={56} height={56} loading="lazy" />
            <div>
              <div className="font-display font-extrabold">Bagian Perekonomian dan Kerja Sama</div>
              <div className="text-sm opacity-80">Pemerintah Kota Yogyakarta</div>
            </div>
          </div>
          <p className="text-sm opacity-80 max-w-md leading-relaxed">
            Media digital tunggal untuk mengelola fasilitasi dan pengelolaan pengetahuan kerja sama daerah di
            Pemerintah Kota Yogyakarta.
          </p>
          <div className="flex gap-3 mt-6">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-secondary hover:text-secondary-foreground transition-colors"
                aria-label="Sosial media"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold mb-4 text-secondary">Tautan</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link to="/pengetahuan" className="hover:text-secondary">Pengetahuan</Link></li>
            <li><Link to="/statistik" className="hover:text-secondary">Statistik</Link></li>
            <li><Link to="/pengajuan" className="hover:text-secondary">Pengajuan</Link></li>
            <li><Link to="/faq" className="hover:text-secondary">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-4 text-secondary">Kontak</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-secondary" /> Komplek Balaikota, Jl. Kenari No.56, Yogyakarta</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-secondary" /> (0274) 515865</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0 text-secondary" /> kerjasama@jogjakota.go.id</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 text-center text-xs opacity-70">
          © {new Date().getFullYear()} Pemerintah Kota Yogyakarta. Semua hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
};
