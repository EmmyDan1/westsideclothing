import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useRef, useState, lazy, Suspense } from 'react'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import CartSummary from './components/CartSummary'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// ← lazy load Admin, customers never download this code
const Admin = lazy(() => import('./pages/Admin'))

function HomePage() {
  const [cart, setCart] = useState([])
  const [heroVisible, setHeroVisible] = useState(false)
  const productsRef = useRef(null)

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id)
      if (exists) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero onShopClick={scrollToProducts} onVisible={() => setHeroVisible(true)} />
      <div ref={productsRef}>
        {heroVisible && <ProductGrid onAddToCart={addToCart} />}
      </div>
      <CartSummary cart={cart} onRemove={removeFromCart} />
      <Footer />
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="w-6 h-6 border border-white/20 border-t-white/60 rounded-full animate-spin" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}