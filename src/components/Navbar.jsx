import { motion } from 'framer-motion'
import Logo from '/images/Logo.png'    

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5"
    >
        <img src={Logo} alt="Westside Clothing" className="h-14 w-auto" />
    </motion.nav>
  )
}