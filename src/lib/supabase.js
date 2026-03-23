import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, category, price, size, condition, main_image_url, thumbnails, is_sold')
    .neq('is_sold', true) 
    .not('condition', 'eq', 'Hidden')
    .order('id', { ascending: false })

  if (error) {
    console.error('Supabase fetch error:', error)
    return []
  }
  return data
}