import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { useProducts } from "../context/ProductContext";


const EditProduct = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const { allProducts, updateProduct } = useProducts();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    thumbnail: "",
  });

  useEffect(() => {
    const product = allProducts.find((p) => p.id === Number(id));

    if(product) {
      setFormData({
        title: product.title || "",
        price: product.price || "",
        description: product.description || "",
        thumbnail: product.thumbnail || "",
      })
    }
  }, [id, allProducts])

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    await updateProduct(id, {
      ...formData,
      price: Number(formData.price),
    })
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Product</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 space-y-4">
        <input type="text" name="title" placeholder="Product Title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
        <input type="text" name="thumbnail" placeholder="Image URL" value={formData.thumbnail} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows="4" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>

        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Update Product
          </button>
          <button type="button" onClick={() => navigate("/")} className="flex-1 bg-slate-200 py-2 rounded-lg hover:bg-slate-300 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>

  )

}

export default EditProduct;