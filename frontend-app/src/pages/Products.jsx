import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addProduct = async () => {
    try {
      await axios.post("http://localhost:5000/api/products", { name: newProduct }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      setNewProduct("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <input value={newProduct} onChange={(e) => setNewProduct(e.target.value)} placeholder="New Product" />
      <button onClick={addProduct}>Add</button>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
