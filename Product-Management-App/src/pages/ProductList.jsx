import {useProducts} from "../context/ProductContext";
import {useNavigate} from "react-router-dom";
import SearchBar from "../components/SearchBar";

const ProductList = () => {
  const {products, loading, error, deleteProduct} = useProducts();
  const navigate = useNavigate();

  if(loading) return <h2 className="text-center mt-10 text-xl">Loading...</h2>;
  if(error) return <h2 className="text-center mt-10 text-red-500">{error}</h2>; 

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold text-slate-800">
    Products
  </h1>

  <button
    onClick={() => navigate("/add")}
    className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition shadow-sm"
  >
    + Add Product
  </button>
  </div>
      <SearchBar />

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
          products.map((product) => {
            return (
              <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden border border-slate-100"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
            
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-1 truncate">
                  {product.title}
                </h3>
            
                <p className="text-indigo-600 font-medium mb-3">
                  ${product.price}
                </p>
            
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit/${product.id}`);
                    }}
                    className="flex-1 bg-amber-400 text-slate-900 py-1.5 rounded-md hover:bg-amber-500 transition"
                  >
                    Edit
                  </button>
            
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm("Are you sure?")) {
                        deleteProduct(product.id);
                      }
                    }}
                    className="flex-1 bg-rose-400 text-white py-1.5 rounded-md hover:bg-rose-500 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default ProductList;