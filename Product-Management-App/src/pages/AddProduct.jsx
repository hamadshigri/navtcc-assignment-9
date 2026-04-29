import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useProducts} from "../context/ProductContext";

const AddProduct = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name] : e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addProduct({
      ...formData, price: Number(formData.price)
    })

    navigate("/");
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Product</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 space-y-4">
        <input type="text" name="title" placeholder="Product Title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>

        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>

        <input type="text" name="thumbnail" placeholder="Image URL" value={formData.thumbnail} onChange={handleChange} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>

        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>

        <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition">
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct