import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Check, X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProductCard({ product, onAddToCart }) {
  const [activeImage, setActiveImage] = useState(product.main_image_url)
  const [added, setAdded] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // all images combined into one array
  const allImages = [product.main_image_url, ...(product.thumbnails || [])].filter(Boolean)

  const handleAdd = () => {
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const openLightbox = (img) => {
    const index = allImages.indexOf(img)
    setLightboxIndex(index === -1 ? 0 : index)
    setLightboxOpen(true)
  }

  const prevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setLightboxIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  const conditionColor = {
    'New': 'bg-white text-black',
    'New Arrivals': 'bg-white/10 text-white border border-white/20',
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -6 }}
        className="group relative bg-[#111] border border-white/5 hover:border-white/15 transition-all duration-300"
      >
        {/* Condition badge */}
        {product.condition && (
          <span className={`absolute top-3 left-3 z-10 text-[9px] tracking-widest uppercase font-semibold px-2 py-1 ${conditionColor[product.condition] || 'bg-white/10 text-white/60'}`}>
            {product.condition}
          </span>
        )}

        {/* Main image — clickable */}
        <div
          className="aspect-[3/4] overflow-hidden bg-[#161616] cursor-zoom-in"
          onClick={() => openLightbox(activeImage)}
        >
          <motion.img
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={activeImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="flex gap-1 px-3 pt-3">
            {allImages.slice(0, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`w-10 h-10 overflow-hidden border transition-all ${
                  activeImage === img ? 'border-white' : 'border-white/10 hover:border-white/30'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Info */}
        <div className="px-3 pt-3 pb-4">
          <h3 className="text-white font-display text-base font-semibold leading-tight mb-1 truncate">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/90 font-sans font-semibold text-sm">
              ₦{Number(product.price).toLocaleString()}
            </span>
            <div className="flex gap-2 items-center">
              <span className="text-white/30 text-xs tracking-widest uppercase">{product.size}</span>
              {product.color && (
                <span className="text-white/30 text-xs tracking-widest uppercase">· {product.color}</span>
              )}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 py-3 text-xs tracking-widest uppercase font-semibold transition-all duration-300 ${
              added
                ? 'bg-white/10 text-white/60 border border-white/10'
                : 'bg-white text-black hover:bg-white/90'
            }`}
          >
            {added
              ? <><Check className="w-3 h-3" /> Added</>
              : <><ShoppingBag className="w-3 h-3" /> Add to Cart</>
            }
          </motion.button>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center px-4"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev button */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prevImage() }}
                className="absolute left-4 md:left-8 text-white/40 hover:text-white transition-colors z-10 p-2"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={allImages[lightboxIndex]}
              alt={product.name}
              className="max-h-[85vh] max-w-[85vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next button */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); nextImage() }}
                className="absolute right-4 md:right-8 text-white/40 hover:text-white transition-colors z-10 p-2"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            {/* Dot indicators */}
            {allImages.length > 1 && (
              <div className="absolute bottom-6 flex gap-2">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i) }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === lightboxIndex ? 'bg-white' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Image counter */}
            <div className="absolute top-5 left-5 text-white/30 text-xs tracking-widest uppercase">
              {lightboxIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}