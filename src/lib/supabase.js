import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchProducts(from = 0, limit = 12) {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, category, price, size, color, condition, main_image_url, thumbnails, is_sold')
    .neq('is_sold', true)
    .not('condition', 'eq', 'Hidden')
    .order('id', { ascending: false })
    .range(from, from + limit - 1)

  if (error) {
    console.error('Supabase fetch error:', error)
    return []
  }
  return data
}

export async function fetchAllProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error);
    return [];
  }
  return data;
}

export async function uploadImage(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("products-image")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });
  console.log("Upload error:", uploadError);
  if (uploadError) {
    console.error("Upload failed:", uploadError);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from("products-image")
    .getPublicUrl(fileName);

  console.log("Public URL:", urlData.publicUrl);

  return urlData.publicUrl;
}

export async function addProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select();

  if (error) {
    console.error("Add product error:", error);
    return null;
  }
  return data[0];
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Update error:", error);
    return null;
  }
  return data[0];
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    return false;
  }
  return true;
}

export function getOptimizedUrl(url, width = 600) {
  if (!url) return url
  return url 
}
