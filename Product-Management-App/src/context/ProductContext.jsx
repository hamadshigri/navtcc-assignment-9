import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();


export const ProductProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://dummyjson.com/products");
      setProducts(res.data.products);
    } catch(err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

const addProduct = async (newProduct) => {
  try {
    const res = await axios.post("https://dummyjson.com/products/add", newProduct);
    setProducts([res.data, ...products]);
  } catch (err) {
    setError("Failed to add product");
  }
}

const updateProduct = async (id, updateData) => {
  try {
    const res = await axios.put(`https://dummyjson.com/products/${id}`, updateData);
    setProducts(products.map((p) => (p.id === Number(id) ? res.data : p)));
  } catch (err) {
    setError("Update failed");
  }
}


const deleteProduct = async (id) => {
  try {
    await axios.delete(`https://dummyjson.com/products/${id}`);

    setProducts(products.filter((p) => p.id !== id));
  } catch (err) {
    setError("Delete failed");
  }
}

const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

useEffect(() => {
  fetchProducts();
}, []);

return (
  <ProductContext.Provider
  value={{
    products: filteredProducts,
    allProducts: products,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  }}
  >
    {children}
  </ProductContext.Provider>
);
};

export const useProducts = () => {
  return useContext(ProductContext);
}