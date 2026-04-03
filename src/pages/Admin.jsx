import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Plus, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  fetchAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from '../lib/supabase'
import AdminLogin from '../components/admin/AdminLogin'
import ProductForm from '../components/admin/ProductForm'
import ProductRow from '../components/admin/ProductRow'
import SuccessMessage from '../components/admin/SuccessMessage'

const EMPTY_FORM = {
  name: '',
  category: 'T-shirts',
  price: '',
  size: '',
  color: '',
  condition: 'New',
  main_image_url: '',
  thumbnails: [],
  is_sold: false,
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingMain, setUploadingMain] = useState(false)
  const [uploadingThumbs, setUploadingThumbs] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)


const loadProducts = async () => {
  setLoading(true)
  const data = await fetchAllProducts()
  setProducts(data)
  setLoading(false)
}

useEffect(() => {
  if (!authed) return
  
  const load = async () => {
    await loadProducts()
  }
  
  load()
}, [authed])


  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploadingMain(true)
    const url = await uploadImage(file)
    if (url) setForm((prev) => ({ ...prev, main_image_url: url }))
    setUploadingMain(false)
  }

  const handleThumbnailsUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploadingThumbs(true)
    const urls = await Promise.all(files.map((f) => uploadImage(f)))
    const valid = urls.filter(Boolean)
    setForm((prev) => ({ ...prev, thumbnails: [...(prev.thumbnails || []), ...valid] }))
    setUploadingThumbs(false)
  }

  const handleRemoveThumbnail = (index) => {
    setForm((prev) => ({
      ...prev,
      thumbnails: prev.thumbnails.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.main_image_url) {
      alert('Please fill in name, price and upload a main image.')
      return
    }
    setSubmitting(true)
    const payload = {
      ...form,
      price: Number(form.price),
      thumbnails: form.thumbnails || [],
    }
    let result
    if (editingId) {
      result = await updateProduct(editingId, payload)
    } else {
      result = await addProduct(payload)
    }
    if (result) {
      setSuccessMsg(editingId ? 'Product updated!' : 'Product added!')
      setTimeout(() => setSuccessMsg(''), 3000)
      setForm(EMPTY_FORM)
      setEditingId(null)
      setShowForm(false)
      await loadProducts()
    }
    setSubmitting(false)
  }

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      size: product.size,
      condition: product.condition,
      main_image_url: product.main_image_url,
      thumbnails: product.thumbnails || [],
      is_sold: product.is_sold,
    })
    setEditingId(product.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    const success = await deleteProduct(id)
    if (success) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
      setDeleteConfirm(null)
    }
  }

  const handleCancel = () => {
    setForm(EMPTY_FORM)
    setEditingId(null)
    setShowForm(false)
  }

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 md:px-10 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-1">Dashboard</p>
          <h1 className="font-display text-3xl font-bold text-white">Westside Admin</h1>
        </div>
        <div className="flex gap-3">
          {!showForm && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { setShowForm(true); setEditingId(null); setForm(EMPTY_FORM) }}
              className="flex items-center gap-2 bg-white text-black px-5 py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Product
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setAuthed(false)}
            className="flex items-center gap-2 border border-white/10 text-white/40 hover:text-white px-4 py-2.5 text-xs tracking-widest uppercase transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </motion.button>
        </div>
      </div>

      {/* Success message */}
      <AnimatePresence>
        <SuccessMessage message={successMsg} />
      </AnimatePresence>

      {/* Product Form */}
      <AnimatePresence>
        {showForm && (
          <ProductForm
            form={form}
            setForm={setForm}
            editingId={editingId}
            submitting={submitting}
            uploadingMain={uploadingMain}
            uploadingThumbs={uploadingThumbs}
            onMainImageUpload={handleMainImageUpload}
            onThumbnailsUpload={handleThumbnailsUpload}
            onRemoveThumbnail={handleRemoveThumbnail}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </AnimatePresence>

      {/* Products List */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-semibold text-white">
            All Products
            <span className="text-white/20 text-sm font-sans font-normal ml-3">
              {products.length} items
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-white/20 text-sm text-center py-20 tracking-widest uppercase">
            No products yet
          </p>
        ) : (
          <div className="space-y-2">
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteConfirm(id)}
                deleteConfirm={deleteConfirm}
                onConfirmDelete={handleDelete}
                onCancelDelete={() => setDeleteConfirm(null)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}