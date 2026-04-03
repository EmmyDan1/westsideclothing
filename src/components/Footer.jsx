import { motion } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";
import Logo from "/images/Logo.png";

const WHATSAPP_NUMBER = '2349167194813' // ← same number as CartSummary

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/5 px-12 md:px-12 py-16 overflow-hidden">
      {/* Background large text */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[clamp(4rem,18vw,14rem)] font-900 text-white/[0.03] leading-none whitespace-nowrap">
          WESTSIDE
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-3">
              Est. {year}
            </p>
            <img src={Logo} alt="Westside Clothing" className="h-14 w-auto" />
          </motion.div>

          {/* Tagline + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:text-right"
          >
            <p className="text-white/30 text-sm font-light max-w-xs md:ml-auto mb-6 leading-relaxed">
              Premium thrift pieces, curated with care.
              <br />
              Quality you can feel. Prices you'll love.
            </p>

            {/* Social links */}
            <div className="flex gap-3 md:justify-end">
              <motion.a
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                href="https://instagram.com/westsidethrift_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/10 px-4 py-2.5 text-white/50 hover:text-white transition-colors text-xs tracking-widest uppercase"
              >
                <Instagram className="w-3.5 h-3.5" />
                Instagram
              </motion.a>

              <motion.a
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(37,211,102,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/10 px-4 py-2.5 text-white/50 hover:text-[#25D366] transition-colors text-xs tracking-widest uppercase"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-8" />

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/15 text-[11px] tracking-widest uppercase">
            © {year} Westside Clothing. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
