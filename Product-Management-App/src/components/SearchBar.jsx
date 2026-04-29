import {useProducts} from "../context/ProductContext";

const SearchBar = () => {
  const {searchTerm, setSearchTerm} = useProducts();
  return (
    <div className="mb-6 relative">
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full px-10 py-2 bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
  />

  <span className="absolute left-3 top-2.5 text-slate-400">
    🔍
  </span>
</div>
  )
}

export default SearchBar