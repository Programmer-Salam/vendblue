"use client"; // important

import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) return;
    setToken(t);
    loadProducts(t);
  }, []);

  const loadProducts = async (token) => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/products`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      setProducts(data.data || []);
    } catch (e) {
      console.error("Fetch products error:", e);
      setMsg("Failed to load products");
    } finally {
      setLoading(false);
    }
  };


const [adding, setAdding] = useState(false); // loading state for the add product - i thought of putting it

const addProduct = async (e) => {
  e.preventDefault();
  if (!token) return setMsg("No token, please login again");
  setMsg("");
  setAdding(true);

  try {
    const res = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMsg("Product added successfully");
      setForm({ name: "", price: "", stock: "" });
      loadProducts(token);
    } else {
      setMsg(data.message || "Something went wrong");
    }
  } catch (e) {
    console.error("Add product error:", e);
    setMsg("Failed to add product");
  } finally {
    setAdding(false);
  }
};


  const deleteProduct = async (id) => {
    if (!token) return setMsg("No token, please login again");
    if (!confirm("Delete product?")) return;

    try {
      await fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      });
      loadProducts(token);
    } catch (e) {
      console.error("Delete product error:", e);
      setMsg("Failed to delete product");
    }
  };

  return (
    <div style={{ background: "#fff", padding: 20, borderRadius: 8, maxWidth: 700, margin: "20px auto" }}>
      <h2 style={{ marginBottom: 10 }}>Products</h2>
      {msg && <div style={{ background: "#e8f5e9", padding: 10, marginBottom: 10, borderRadius: 5 }}>{msg}</div>}
    {/* Add Product */}
      <form onSubmit={addProduct} style={{ marginBottom: 20 }}>
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required style={{ padding: 8, marginRight: 5 }} />
        <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required style={{ padding: 8, marginRight: 5 }} />
        <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required style={{ padding: 8, marginRight: 5 }} />
<button
  type="submit"
  disabled={adding}
  style={{
    padding: "8px 12px",
    background: adding ? "#999" : "#2c7be5",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: adding ? "not-allowed" : "pointer",
  }}
>
  {adding ? "Adding..." : "Add"}
</button>
      </form>

      {loading && <p>Loading products...</p>}

      {!loading && (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f1f1f1" }}><th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Action</th></tr>
          </thead>
          <tbody>
            {products.length > 0 ? products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button onClick={() => deleteProduct(p.id)} style={{ padding: "6px 10px", background: "#e53935", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" style={{ textAlign: "center" }}>No products found</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
