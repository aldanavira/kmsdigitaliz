import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { LogIn, UserPlus, Mail } from "lucide-react";

const emailSchema = z.string().trim().email("Email tidak valid").max(255);
const passwordSchema = z.string().min(6, "Password minimal 6 karakter").max(72);
const nameSchema = z.string().trim().min(2, "Nama terlalu pendek").max(100);

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const from = (location.state as { from?: string })?.from || "/pengajuan";

  const [busy, setBusy] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regName, setRegName] = useState("");
  const [regInstansi, setRegInstansi] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");

  useEffect(() => {
    if (!loading && user) navigate(from, { replace: true });
  }, [user, loading, from, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      emailSchema.parse(loginEmail);
      passwordSchema.parse(loginPass);
    } catch (err) {
      if (err instanceof z.ZodError) return toast.error(err.errors[0].message);
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPass,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Berhasil masuk");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      nameSchema.parse(regName);
      emailSchema.parse(regEmail);
      passwordSchema.parse(regPass);
    } catch (err) {
      if (err instanceof z.ZodError) return toast.error(err.errors[0].message);
    }
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: regEmail,
      password: regPass,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { full_name: regName, instansi: regInstansi },
      },
    });
    setBusy(false);
    if (error) {
      if (error.message.includes("already")) return toast.error("Email sudah terdaftar");
      return toast.error(error.message);
    }
    toast.success("Pendaftaran berhasil! Silakan masuk.");
  };

  const handleGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/`,
    });
    setBusy(false);
    if (result.error) toast.error(result.error.message || "Gagal masuk dengan Google");
  };

  return (
    <Layout>
      <section className="min-h-[calc(100vh-5rem)] grid place-items-center bg-hero-gradient pt-32 pb-16 px-4">
        <div className="w-full max-w-md bg-card rounded-3xl shadow-hero p-8 border border-border">
          <Link to="/" className="block text-center mb-2 text-xs font-bold tracking-widest text-secondary">
            BAGIAN PEREKONOMIAN & KERJA SAMA
          </Link>
          <h1 className="font-display text-3xl font-extrabold text-primary text-center mb-1">
            Selamat Datang
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Masuk untuk mengajukan kerja sama
          </p>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-5">
              <TabsTrigger value="login">Masuk</TabsTrigger>
              <TabsTrigger value="register">Daftar</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="mt-1.5 h-11" required />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} className="mt-1.5 h-11" required />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
                  <LogIn /> {busy ? "Memproses..." : "Masuk"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label>Nama Lengkap</Label>
                  <Input value={regName} onChange={(e) => setRegName(e.target.value)} className="mt-1.5 h-11" required />
                </div>
                <div>
                  <Label>Instansi</Label>
                  <Input value={regInstansi} onChange={(e) => setRegInstansi(e.target.value)} className="mt-1.5 h-11" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="mt-1.5 h-11" required />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" value={regPass} onChange={(e) => setRegPass(e.target.value)} className="mt-1.5 h-11" required minLength={6} />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
                  <UserPlus /> {busy ? "Memproses..." : "Daftar"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">atau</span>
            </div>
          </div>

          <Button variant="outline" size="lg" className="w-full" onClick={handleGoogle} disabled={busy}>
            <Mail /> Masuk dengan Google
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-6">
            Admin? Daftar dengan email <span className="font-semibold">admin@tanahlautkab.go.id</span>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
