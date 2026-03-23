import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, X, MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '234XXXXXXXXXX' // ← replace with your brother's number

export default function CartSummary({ cart, onRemove }) {
  const [open, setOpen] = useState(false)

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0)

  const handleCheckout = () => {
    if (cart.length === 0) return
    const lines = cart.map(
      (item) => `• ${item.name} | Size: ${item.size} | Qty: ${item.qty} | ₦${(Number(item.price) * item.qty).toLocaleString()}`
    )
    const message = encodeURIComponent(
      `Hi! I'd like to order from Westside Clothing:\n\n${lines.join('\n')}\n\nTotal: ₦${total.toLocaleString()}`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <>
      {/* Floating Cart Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-white text-black w-14 h-14 flex items-center justify-center shadow-2xl"
      >
        <ShoppingBag className="w-5 h-5" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center font-bold border border-white">
            {cart.reduce((s, i) => s + i.qty, 0)}
          </span>
        )}
      </motion.button>

      {/* Cart Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#111] border-l border-white/10 z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span className="font-display text-lg font-semibold text-white">Your Cart</span>
                <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-white/20 text-sm text-center mt-16 tracking-widest uppercase">Cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-3 items-start">
                      <img src={item.main_image_url} alt={item.name} className="w-16 h-20 object-cover bg-white/5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                        <p className="text-white/40 text-xs mt-0.5">Size: {item.size}</p>
                        <p className="text-white/40 text-xs">Qty: {item.qty}</p>
                        <p className="text-white text-sm font-semibold mt-1">₦{(Number(item.price) * item.qty).toLocaleString()}</p>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-white/20 hover:text-white/60 transition-colors mt-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="px-6 py-6 border-t border-white/10">
                  <div className="flex justify-between text-sm mb-6">
                    <span className="text-white/40 uppercase tracking-widest text-xs">Total</span>
                    <span className="text-white font-semibold font-display text-lg">₦{total.toLocaleString()}</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCheckout}
                    className="w-full bg-[#25D366] text-white py-4 flex items-center justify-center gap-3 text-sm font-semibold tracking-widest uppercase hover:bg-[#1ebe5d] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Checkout via WhatsApp
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}