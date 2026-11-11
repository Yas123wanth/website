import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Upload to a **public** Supabase Storage bucket. Create bucket `uploads` in Supabase dashboard. */
export async function uploadToSupabaseStorage(
  bucket: string,
  objectPath: string,
  body: Buffer,
  contentType: string,
): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { error } = await supabase.storage.from(bucket).upload(objectPath, body, {
    contentType,
    upsert: false,
  });
  if (error) {
    console.error("Supabase upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);
  return data.publicUrl;
}
