import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function SuccessMessage({ message }) {
  if (!message) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mb-6 bg-white/5 border border-white/10 px-5 py-3 text-white/70 text-sm flex items-center gap-2"
    >
      <Check className="w-4 h-4 text-green-400" />
      {message}
    </motion.div>
  )
}