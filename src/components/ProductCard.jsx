import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";

export default function ProductCard({ product, onAddToCart }) {
  const [activeImage, setActiveImage] = useState(product.main_image_url);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const conditionColor = {
    New: "bg-white text-black",
    "New Arrivals": "bg-white/10 text-white border border-white/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="group relative bg-[#111] border border-white/5 hover:border-white/15 transition-all duration-300 "
    >
      {/* Condition badge */}
      {product.condition && (
        <span
          className={`absolute top-3 left-3 z-10 text-[9px] tracking-widest uppercase font-semibold px-2 py-1 ${conditionColor[product.condition] || "bg-white/10 text-white/60"}`}
        >
          {product.condition}
        </span>
      )}

      {/* Main image */}
      <div className="aspect-[3/4] overflow-hidden bg-[#161616]">
        <motion.img
          key={activeImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={activeImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-xl "
        />
      </div>

      {/* Thumbnails */}
      {product.thumbnails?.length > 0 && (
        <div className="flex gap-1 px-3 pt-3">
          {[product.main_image_url, ...product.thumbnails]
            .slice(0, 4)
            .map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`w-10 h-10 overflow-hidden border transition-all ${
                  activeImage === img
                    ? "border-black"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover rounded-xl"
                />
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
          <span className="text-white/30 text-xs tracking-widest uppercase">
            {product.size}
          </span>
          {product.color && (
            <span className="text-white/30 text-xs tracking-widest uppercase">
              · {product.color}
            </span>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-2 py-3 text-xs tracking-widest uppercase font-semibold transition-all duration-300 ${
            added
              ? "bg-white/10 text-white/60 border border-white/10"
              : "bg-white text-black hover:bg-white/90"
          }`}
        >
          {added ? (
            <>
              <Check className="w-3 h-3" /> Added
            </>
          ) : (
            <>
              <ShoppingBag className="w-3 h-3" /> Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
