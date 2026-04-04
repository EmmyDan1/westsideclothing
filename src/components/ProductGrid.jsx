import { useState, useEffect } from "react";
import { fetchProducts } from "../lib/supabase";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import { motion } from "framer-motion";

const LIMIT = 12;

export default function ProductGrid({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const loadInitial = async () => {
    setLoading(true);
    const data = await fetchProducts(0, LIMIT);
    setProducts(data);
    setHasMore(data.length === LIMIT);
    setLoading(false);
  };

  useEffect(() => {
    const load = async () => {
      await loadInitial();
    };
    load();
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);
    const data = await fetchProducts(products.length, LIMIT);
    setProducts((prev) => [...prev, ...data]);
    setHasMore(data.length === LIMIT);
    setLoadingMore(false);
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      category === "All"
        ? true
        : category === "New Arrivals"
          ? p.condition === "New Arrivals"
          : p.category?.toLowerCase() === category.toLowerCase();
    return matchSearch && matchCat;
  });

  return (
    <section id="products" className="px-4 md:px-12 py-24 bg-[#0a0a0a]">
      {/* Section header */}
      <div className="mb-14">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/30 text-xs tracking-[0.4em] uppercase mb-3"
        >
          The Collection
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-bold text-white mb-10"
        >
          All Pieces
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <CategoryFilter active={category} onChange={setCategory} />
          <div className="w-full md:w-72">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] bg-white/5 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 text-white/20 text-sm tracking-widest uppercase">
          No pieces found
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={loadMore}
                disabled={loadingMore}
                className="border border-white/10 text-white/40 hover:text-white hover:border-white/30 px-10 py-3.5 text-xs tracking-widest uppercase transition-colors disabled:opacity-30"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </motion.button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
