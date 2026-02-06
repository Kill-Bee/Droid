import { supabase } from "../lib/supabase";

export async function uploadCoverAnime(file) {
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
export async function uploadCoverManga(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `cover/${fileName}`;

  const { error } = await supabase.storage
    .from("manga-covers")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from("manga-covers").getPublicUrl(filePath);

  return data.publicUrl;
}

export async function uploadAvatar(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { error } = await supabase.storage
    .from("photo-profiles")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("photo-profiles")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function uploadBanner(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `banners/${fileName}`;

  const { error } = await supabase.storage
    .from("photo-profiles")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from("photo-profiles").getPublicUrl(filePath);
  return data.publicUrl;
}

export async function uploadLogoAnime(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `logo/${fileName}`;

  const { error } = await supabase.storage
    .from("anime-covers")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from("anime-covers").getPublicUrl(filePath);

  return data.publicUrl;
}

export async function uploadLogoManga(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `logo/${fileName}`;

  const { error } = await supabase.storage
    .from("manga-covers")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from("manga-covers").getPublicUrl(filePath);

  return data.publicUrl;
}