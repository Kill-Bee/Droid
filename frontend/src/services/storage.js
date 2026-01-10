import { supabase } from "../lib/supabase";

export async function uploadCover(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `cover/${fileName}`;

  const { error } = await supabase.storage
    .from("anime-covers")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from("anime-covers").getPublicUrl(filePath);

  return data.publicUrl;
}
