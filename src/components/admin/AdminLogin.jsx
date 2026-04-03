import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

const ADMIN_PASSWORD = 'westside2024' // ← change this to whatever you want

export default function AdminLogin({ onSuccess }) {
  const [passwordInput, setPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      onSuccess()
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-3 text-center">
          Admin Access
        </p>
        <h1 className="font-display text-3xl font-bold text-white text-center mb-10">
          Westside
        </h1>

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value)
              setPasswordError(false)
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className={`w-full bg-white/5 border px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none transition-colors pr-12 ${
              passwordError
                ? 'border-red-500/50'
                : 'border-white/10 focus:border-white/30'
            }`}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
          >
            {showPassword
              ? <EyeOff className="w-4 h-4" />
              : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {passwordError && (
          <p className="text-red-400/80 text-xs mb-4 tracking-wide">
            Incorrect password. Try again.
          </p>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleLogin}
          className="w-full bg-white text-black py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-colors"
        >
          Enter
        </motion.button>
      </motion.div>
    </div>
  )
}