import { motion } from 'framer-motion'

const categories = ['All', 'Shoes', 'Jeans', 'T-shirts', 'New Arrivals']

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(cat)}
          className={`px-5 py-2 text-xs tracking-widest uppercase font-semibold border transition-all duration-200 ${
            active === cat
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-white/50 border-white/15 hover:border-white/40 hover:text-white/80'
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  )
}