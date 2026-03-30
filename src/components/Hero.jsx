import { motion } from 'framer-motion'

export default function Hero({ onShopClick }) {
  return (
    <section className="relative min-h-screen pt-20 flex flex-col justify-center items-center overflow-hidden bg-[#0a0a0a]">
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Accent orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white opacity-[0.025] blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.4em] uppercase text-white/40 mb-6 font-sans"
        >
         Quality thrift. Zero compromise.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[clamp(3rem,10vw,8rem)] font-900 leading-[0.92] tracking-tight text-white mb-8"
        >
          Wear It
          <br />
          <span className="text-white/20">Different.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/50 text-lg font-light max-w-md mx-auto mb-12 font-sans"
        >
         Hand picked thrift pieces. Shoes, Jeans, T-shirts.
          <br />All quality checked. All priced right.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onShopClick}
          className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-white/90 transition-colors"
        >
          Shop Now
          <span className="text-base">→</span>
        </motion.button>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        <span className="text-white/20 text-[10px] tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}