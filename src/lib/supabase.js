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

export async function fetchAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false })

  if (error) {
    console.error('Supabase fetch error:', error)
    return []
  }
  return data
}

export async function uploadImage(file) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

  const { error } = await supabase.storage
    .from('products-images')
    .upload(fileName, file, { cacheControl: '3600', upsert: false })
 console.log('Upload result:', data, error) 
  if (error) {
    console.error('Upload error:', error)
    return null
  }

  const { data } = supabase.storage
    .from('products-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}

export async function addProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()

  if (error) {
    console.error('Add product error:', error)
    return null
  }
  return data[0]
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) {
    console.error('Update error:', error)
    return null
  }
  return data[0]
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Delete error:', error)
    return false
  }
  return true
}