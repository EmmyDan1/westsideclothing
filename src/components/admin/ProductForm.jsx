import { motion } from "framer-motion";
import { X } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function ProductForm({
  form,
  setForm,
  editingId,
  submitting,
  uploadingMain,
  uploadingThumbs,
  onMainImageUpload,
  onThumbnailsUpload,
  onRemoveThumbnail,
  onSubmit,
  onCancel,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white/[0.03] border border-white/10 p-6 md:p-8 mb-10"
    >
      {/* Form header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-white">
          {editingId ? "Edit Product" : "New Product"}
        </h2>
        <button
          onClick={onCancel}
          className="text-white/30 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div className="md:col-span-2">
          <label className="text-white/40 text-[10px] tracking-widest uppercase block mb-2">
            Product Name
          </label>
          <input
            type="text"
            placeholder="e.g. Vintage Levi's 501"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-white/40 text-[10px] tracking-widest uppercase block mb-2">
            Price (₦)
          </label>
          <input
            type="number"
            placeholder="e.g. 15000"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        {/* Size */}
        <div>
          <label className="text-white/40 text-[10px] tracking-widest uppercase block mb-2">
            Size
          </label>
          <input
            type="text"
            placeholder="e.g. M, L, XL, 42"
            value={form.size}
            onChange={(e) => setForm({ ...form, size: e.target.value })}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        <div>
          <label className="text-white/40 text-[10px] tracking-widest uppercase block mb-2">
            Color
          </label>
          <input
            type="text"
            placeholder="e.g. Black, Navy Blue, Olive"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-white/40 text-[10px] tracking-widest uppercase block mb-2">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
          >
            <option value="T-shirts">T-SHIRTS</option>
            <option value="Jeans">JEANS</option>
            <option value="Shoes">SHOES</option>
            <option value="new-arrivals">NEW ARRIVALS</option>
          </select>
        </div>

        {/* Condition */}
        <div>
          <label className="text-white/40 text-[10px] tracking-widest uppercase block mb-2">
            Condition
          </label>
          <select
            value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
            className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
          >
            <option value="New">New</option>
            <option value="New Arrivals">New Arrivals</option>
            <option value="Hidden">Hidden</option>
            <option value="Sold">Sold</option>
          </select>
        </div>

        {/* Main Image */}
        <div className="md:col-span-2">
          <ImageUploader
            label="Main Image"
            multiple={false}
            uploading={uploadingMain}
            previews={form.main_image_url ? [form.main_image_url] : []}
            onUpload={onMainImageUpload}
            onRemove={() => setForm({ ...form, main_image_url: "" })}
          />
        </div>

        {/* Thumbnails */}
        <div className="md:col-span-2">
          <ImageUploader
            label="Thumbnail Images"
            multiple={true}
            uploading={uploadingThumbs}
            previews={form.thumbnails || []}
            onUpload={onThumbnailsUpload}
            onRemove={onRemoveThumbnail}
          />
        </div>

        {/* Is Sold Toggle */}
        <div className="md:col-span-2 flex items-center gap-3">
          <button
            onClick={() => setForm({ ...form, is_sold: !form.is_sold })}
            className={`w-10 h-5 rounded-full transition-colors relative ${
              form.is_sold ? "bg-white" : "bg-white/10"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-black transition-all ${
                form.is_sold ? "left-5" : "left-0.5"
              }`}
            />
          </button>
          <span className="text-white/40 text-xs tracking-widest uppercase">
            Mark as Sold
          </span>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3 mt-8">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onSubmit}
          disabled={submitting}
          className="flex-1 bg-white text-black py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {submitting
            ? "Saving..."
            : editingId
              ? "Update Product"
              : "Add Product"}
        </motion.button>
        <button
          onClick={onCancel}
          className="px-6 border border-white/10 text-white/40 hover:text-white text-xs tracking-widest uppercase transition-colors"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
}
