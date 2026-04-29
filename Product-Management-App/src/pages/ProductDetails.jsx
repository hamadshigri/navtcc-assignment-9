import {useParams, useNavigate} from "react-router-dom";
import {useProducts} from "../context/ProductContext";

const ProductDetails = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {products, loading, error} = useProducts();

  const product = products.find((p) => p.id === Number(id));
  if(loading)
    return <h2 className="text-center mt-10 text-xl">Loading...</h2>;
  if(error)
    return <h2 className="text-center mt-10 text-red-500">{error}</h2>

  if(!product)
    return <h2 className="text-center mt-10">Product not found</h2>

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <button onClick={() => navigate("/")} className="mb-6 bg-slate-200 px-4 py-2 rounded-lg hover:bg-slate-300 transition"> ← Back </button>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <img src={product.thumbnail} alt={product.title} className="w-full h-80 object-cover rounded-xl shadow" />

        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-indigo-600 mb-2">Price: ${product.price}</p>
          <p className="text-gray-500">Category: {product.category}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;