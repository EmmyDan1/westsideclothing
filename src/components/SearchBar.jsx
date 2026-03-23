import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
      <input
        type="text"
        placeholder="Search pieces..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 pl-11 pr-4 py-3 text-sm font-sans focus:outline-none focus:border-white/30 transition-colors"
      />
    </div>
  )
}