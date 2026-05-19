/*
 * AutoBody San Diego — Supabase client config
 *
 * Public URL + anon publishable key. These are safe to expose; Row-Level
 * Security policies on the leads table and the lead-photos storage bucket
 * enforce that:
 *   - Anonymous visitors can INSERT new leads (the public quote form) and
 *     UPLOAD photos to the lead-photos bucket.
 *   - Reading leads / reading photos / updating lead status is restricted
 *     to authenticated users whose email is on the admin allowlist
 *     (see Supabase migration scope_admin_to_email_allowlist).
 *
 * Loads Supabase via UMD bundle from the CDN — no build step required.
 */
window.SUPABASE_CONFIG = {
  url: 'https://opwpvpxgjgdnfckhxzyu.supabase.co',
  anonKey: 'sb_publishable_wkGbCJOvJOr19ozB5QWo4g_2inyXzD7',
  photosBucket: 'lead-photos',
};

// Initialise the Supabase singleton once the UMD bundle has loaded.
// Pages can rely on window.sb being available after the supabase-js script.
window.initSupabase = function () {
  if (window.sb) return window.sb;
  if (!window.supabase || !window.supabase.createClient) return null;
  window.sb = window.supabase.createClient(
    window.SUPABASE_CONFIG.url,
    window.SUPABASE_CONFIG.anonKey,
    {
      auth: { persistSession: true, autoRefreshToken: true },
    }
  );
  return window.sb;
};
