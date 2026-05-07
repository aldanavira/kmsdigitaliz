
ALTER TABLE public.pengajuan
  ADD COLUMN IF NOT EXISTS kontak text,
  ADD COLUMN IF NOT EXISTS latar_belakang text,
  ADD COLUMN IF NOT EXISTS dasar_hukum text,
  ADD COLUMN IF NOT EXISTS objek_kerjasama text,
  ADD COLUMN IF NOT EXISTS ruang_lingkup text,
  ADD COLUMN IF NOT EXISTS aktivitas text,
  ADD COLUMN IF NOT EXISTS jangka_waktu text,
  ADD COLUMN IF NOT EXISTS analisis_manfaat_biaya text,
  ADD COLUMN IF NOT EXISTS kesimpulan text,
  ADD COLUMN IF NOT EXISTS proposal_url text;

INSERT INTO storage.buckets (id, name, public)
VALUES ('proposal', 'proposal', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users upload own proposal"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'proposal' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users view own proposal"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'proposal' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users update own proposal"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'proposal' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own proposal"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'proposal' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins view all proposal"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'proposal' AND public.has_role(auth.uid(), 'admin'));
