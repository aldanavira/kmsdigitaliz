import { Layout, PageHeader } from "@/components/site/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Apa itu kerja sama daerah?", a: "Kerja sama daerah adalah kesepakatan antara Pemerintah Kota Yogyakarta dengan pihak lain (pemerintah daerah lain, swasta, perguruan tinggi, atau lembaga) untuk mencapai tujuan bersama dalam pembangunan daerah." },
  { q: "Bagaimana cara mengajukan kerja sama dengan Pemkot Yogyakarta?", a: "Ajukan melalui menu Pengajuan dengan melengkapi formulir online, melampirkan profil instansi, proposal kerja sama, dan dokumen pendukung lainnya. Tim kami akan menindaklanjuti dalam 5 hari kerja." },
  { q: "Berapa lama proses pengajuan kerja sama?", a: "Proses verifikasi awal 5 hari kerja. Total proses hingga penandatanganan MoU rata-rata 30–45 hari kerja, tergantung kompleksitas dan jenis kerja sama." },
  { q: "Apakah ada biaya pengajuan?", a: "Tidak ada biaya untuk proses pengajuan kerja sama daerah. Layanan ini gratis sebagai bagian dari pelayanan publik Pemkot Yogyakarta." },
  { q: "Siapa yang berhak mengajukan kerja sama?", a: "Pemerintah daerah lain, instansi pemerintah pusat, BUMN/BUMD, perusahaan swasta berbadan hukum, perguruan tinggi terakreditasi, dan lembaga/komunitas resmi." },
  { q: "Bagaimana memantau status pengajuan saya?", a: "Setelah login, Anda dapat memantau status pengajuan secara real-time melalui dashboard pemohon di akun Anda." },
];

const FAQ = () => (
  <Layout>
    <PageHeader
      eyebrow="Tanya Disini"
      title="Pertanyaan Umum"
      description="Jawaban atas pertanyaan yang sering diajukan seputar kerja sama daerah."
    />
    <section className="container py-16 max-w-3xl">
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`i-${i}`} className="bg-card-gradient border border-border rounded-2xl px-6 shadow-soft">
            <AccordionTrigger className="font-display font-bold text-left text-foreground hover:text-primary text-base py-5">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  </Layout>
);

export default FAQ;
