import { useRef } from 'react'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import CartSummary from './components/CartSummary'
import { useState } from 'react'
console.log('URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY)
export default function App() {
  const [cart, setCart] = useState([])
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
      <Hero onShopClick={scrollToProducts} />
      <div ref={productsRef}>
        <ProductGrid onAddToCart={addToCart} />
      </div>
      <CartSummary cart={cart} onRemove={removeFromCart} />
    </main>
  )
}