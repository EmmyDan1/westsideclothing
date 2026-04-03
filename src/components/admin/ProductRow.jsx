import { motion } from 'framer-motion'
import { Pencil, Trash2 } from 'lucide-react'

export default function ProductRow({ product, onEdit, onDelete, deleteConfirm, onConfirmDelete, onCancelDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-4 bg-white/[0.03] border border-white/5 px-4 py-3 hover:border-white/10 transition-colors"
    >
      {/* Image */}
      <img
        src={product.main_image_url}
        alt={product.name}
        className="w-12 h-12 object-cover bg-white/5 flex-shrink-0"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">{product.name}</p>
        <p className="text-white/30 text-xs mt-0.5">
          {product.category} · Size {product.size} · ₦{Number(product.price).toLocaleString()}
        </p>
      </div>

      {/* Condition badge */}
      <span className={`hidden md:block text-[9px] tracking-widest uppercase px-2 py-1 flex-shrink-0 ${
        product.is_sold
          ? 'bg-red-500/10 text-red-400'
          : 'bg-white/5 text-white/40'
      }`}>
        {product.is_sold ? 'Sold' : product.condition}
      </span>

      {/* Actions */}
      <div className="flex gap-2 flex-shrink-0">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit(product)}
          className="p-2 border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
        </motion.button>

        {deleteConfirm === product.id ? (
          <div className="flex gap-1">
            <button
              onClick={() => onConfirmDelete(product.id)}
              className="px-3 py-2 bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] tracking-widest uppercase hover:bg-red-500/30 transition-colors"
            >
              Confirm
            </button>
            <button
              onClick={onCancelDelete}
              className="px-3 py-2 border border-white/10 text-white/30 text-[10px] tracking-widest uppercase hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(product.id)}
            className="p-2 border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/30 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}