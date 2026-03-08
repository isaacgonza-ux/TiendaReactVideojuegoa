import React, { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8080/api/v1/productos";

const api = {
  getToken() {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken") ||
      null
    );
  },

  getAuthHeader() {
    const token = this.getToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  },

  getHeaders() {
    return {
      Accept: "application/hal+json, application/json, */*",
      ...this.getAuthHeader(),
    };
  },

  async handleResponse(res) {
    const text = await res.text().catch(() => "");
    let json = null;
    try {
      if (text) json = JSON.parse(text);
    } catch (e) {
      json = null;
    }
    return { ok: res.ok, status: res.status, json, text };
  },

  async getAll() {
    const res = await fetch(API_BASE_URL, {
      method: "GET",
      headers: this.getHeaders(),
    });
    const { ok, status, json, text } = await this.handleResponse(res);
    if (!ok) {
      console.error("GET /productos error", status, text);
      if (status === 401) throw new Error("Unauthorized");
      throw new Error(`Error HTTP ${status}`);
    }
    const data = json;
    console.log("Respuesta HATEOAS completa:", data);

    let productos = [];
    if (data?._embedded) {
      const embedded = data._embedded;
      productos =
        embedded.productosHateoas ||
        embedded.productModels ||
        embedded.productModelList ||
        embedded.productModel ||
        embedded.productos ||
        [];
      if (Array.isArray(productos) && productos.length > 0 && productos[0].content) {
        productos = productos.map((it) => it.content);
      }
    } else if (Array.isArray(data)) {
      productos = data;
    } else if (data?.content) {
      productos = data.content;
    }

    console.log("Productos parseados:", productos);
    return productos.map((item) => ({
      id: item.id,
      name: item.name ?? item.titulo ?? "",
      price: item.price ?? item.precio ?? 0,
      description: item.description ?? item.descripcion ?? "",
      stockQuantity: item.stockQuantity ?? item.stock ?? 0,
      category: item.category ?? "General"
    }));
  },

  async create(product) {
    const body = {
      name: product.name,
      description: product.description || "Videojuego",
      price: product.price,
      stockQuantity: product.stockQuantity || 100,
      category: product.category || "General"
    };
    console.log("POST /productos - request body:", body);
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    const { ok, status, json, text } = await this.handleResponse(res);
    console.log("POST /productos - response", { status, text, json });
    if (!ok) {
      console.error("POST /productos error", status, text);
      if (status === 401) throw new Error("Unauthorized");
      if (status === 404) throw new Error("NotFound");
      throw new Error("Error al crear producto");
    }
    const data = json;
    const product_data = data?.content || data;
    return {
      id: product_data.id,
      name: product_data.name,
      price: product_data.price,
      description: product_data.description,
      stockQuantity: product_data.stockQuantity ?? product_data.stock_quantity,
      category: product_data.category || "General"
    };
  },

 async update(id, product) {
    // Asegurarse de usar siempre la URL del gateway, no las URLs HATEOAS del microservicio
    const url = `${API_BASE_URL}/${Number(id)}`;
    
    const body = {
      name: product.name,
      description: product.description || "Videojuego",
      price: product.price,
      stockQuantity: product.stockQuantity || 100,
      category: product.category || "General"
    };
    console.log(`PUT ${url} - request body:`, body);
    const res = await fetch(url, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    const { ok, status, json, text } = await this.handleResponse(res);
    console.log(`PUT ${url} - response`, { status, text, json });
    if (!ok) {
      console.error(`PUT ${url} error`, status, text);
      if (status === 401) throw new Error("Unauthorized");
      if (status === 404) throw new Error("ProductNotFound");
      throw new Error("Error al actualizar producto");
    }
    const data = json;
    const product_data = data?.content || data;
    return {
      id: product_data.id,
      name: product_data.name,
      price: product_data.price,
      description: product_data.description,
      stockQuantity: product_data.stockQuantity ?? product_data.stock_quantity,
      category: product_data.category || "General"
    };
  },

  async delete(id) {
    // Asegurarse de usar siempre la URL del gateway
    const url = `${API_BASE_URL}/${Number(id)}`;
    console.log(`DELETE ${url}`);
    const res = await fetch(url, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    const { ok, status, text } = await this.handleResponse(res);
    console.log(`DELETE ${url} - response`, { status, text });
    if (!ok && status !== 204) {
      console.error(`DELETE ${url} error`, status, text);
      if (status === 401) throw new Error("Unauthorized");
      if (status === 404) throw new Error("ProductNotFound");
      throw new Error("Error al eliminar producto");
    }
  },
};
export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ 
    name: "", 
    price: "", 
    description: "", 
    stockQuantity: "",
    category: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ 
    name: "", 
    price: "", 
    description: "", 
    stockQuantity: "",
    category: ""
  });

  const categories = [
    "PlayStation 5",
    "Xbox Series X",
    "Xbox Series S",
    "Nintendo Switch",
    "PC",
    "PlayStation 4",
    "Xbox One",
    "General"
  ];

  useEffect(() => {
    const token = api.getToken();
    if (!token) {
      setError("No autorizado. Inicia sesión.");
      return;
    }
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getAll();
        setProducts(data);
      } catch (err) {
        console.error("Error al cargar:", err);
        setError(err.message === "Unauthorized" ? "No autorizado. Inicia sesión." : "Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const reloadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAll();
      setProducts(data);
    } catch (err) {
      console.error("Error al recargar:", err);
      setError("Error al recargar productos");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Nombre es obligatorio");
    if (!form.category) return alert("Categoría es obligatoria");
    const precioNum = parseFloat(form.price);
    if (isNaN(precioNum)) return alert("Precio inválido");
    if (!api.getToken()) return setError("No autorizado. Inicia sesión.");

    try {
      setLoading(true);
      setError(null);
      const newProduct = await api.create({
        name: form.name.trim(),
        price: Number(precioNum.toFixed(2)),
        description: form.description.trim() || "Videojuego",
        stockQuantity: parseInt(form.stockQuantity) || 100,
        category: form.category
      });
      setProducts((p) => [newProduct, ...p]);
      setForm({ name: "", price: "", description: "", stockQuantity: "", category: "" });
    } catch (err) {
      console.error("Error al agregar:", err);
      if (err.message === "NotFound") setError("Endpoint no encontrado (404). Revisa rutas en el gateway/backend.");
      else setError(err.message === "Unauthorized" ? "No autorizado. Inicia sesión." : "Error al agregar producto");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      price: String(product.price),
      description: product.description || "",
      stockQuantity: String(product.stockQuantity || 100),
      category: product.category || "General"
    });
    const el = document.getElementById("edit-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", price: "", description: "", stockQuantity: "", category: "" });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((s) => ({ ...s, [name]: value }));
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (editingId == null) return;
    if (!editForm.name.trim()) return alert("Nombre es obligatorio");
    if (!editForm.category) return alert("Categoría es obligatoria");
    const precioNum = parseFloat(editForm.price);
    if (isNaN(precioNum)) return alert("Precio inválido");
    if (!api.getToken()) return setError("No autorizado. Inicia sesión.");

    try {
      setLoading(true);
      setError(null);
      const updatedProduct = await api.update(editingId, {
        name: editForm.name.trim(),
        price: Number(precioNum.toFixed(2)),
        description: editForm.description.trim() || "Videojuego",
        stockQuantity: parseInt(editForm.stockQuantity) || 100,
        category: editForm.category
      });
      setProducts((list) => list.map((p) => (p.id === editingId ? updatedProduct : p)));
      cancelEdit();
    } catch (err) {
      console.error("Error al actualizar:", err);
      if (err.message === "ProductNotFound") {
        setError("El producto ya no existe. Recargando lista...");
        // Recargar la lista completa
        try {
          const data = await api.getAll();
          setProducts(data);
          cancelEdit();
        } catch (reloadErr) {
          setError("Error al recargar productos");
        }
      } else if (err.message === "Unauthorized") {
        setError("No autorizado. Inicia sesión.");
      } else {
        setError("Error al actualizar producto");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    if (!api.getToken()) return setError("No autorizado. Inicia sesión.");

    try {
      setLoading(true);
      setError(null);
      await api.delete(id);
      setProducts((list) => list.filter((p) => p.id !== id));
      if (editingId === id) cancelEdit();
    } catch (err) {
      console.error("Error al eliminar:", err);
      if (err.message === "ProductNotFound") {
        setError("El producto ya no existe. Recargando lista...");
        // Recargar la lista y remover de la UI
        try {
          const data = await api.getAll();
          setProducts(data);
          if (editingId === id) cancelEdit();
        } catch (reloadErr) {
          setError("Error al recargar productos");
        }
      } else if (err.message === "Unauthorized") {
        setError("No autorizado. Inicia sesión.");
      } else {
        setError("Error al eliminar producto");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("¿Vaciar todos los productos?")) return;
    if (!api.getToken()) return setError("No autorizado. Inicia sesión.");

    try {
      setLoading(true);
      setError(null);
      for (const product of products) {
        await api.delete(product.id);
      }
      setProducts([]);
    } catch (err) {
      console.error("Error al vaciar:", err);
      setError(err.message === "NotFound" ? "Endpoint no encontrado (404). Revisa rutas en el gateway/backend." : "Error al eliminar productos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Gestión de Productos (Administrador)</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Procesando...</div>}

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Nombre del producto" 
            name="name" 
            value={form.name} 
            onChange={handleFormChange} 
            disabled={loading} 
          />
        </div>
        <div className="col-md-2">
          <input 
            type="number" 
            step="0.01" 
            className="form-control" 
            placeholder="Precio" 
            name="price" 
            value={form.price} 
            onChange={handleFormChange} 
            disabled={loading}
          />
        </div>
        <div className="col-md-1">
          <input 
            type="number" 
            className="form-control" 
            placeholder="Stock" 
            name="stockQuantity" 
            value={form.stockQuantity} 
            onChange={handleFormChange} 
            disabled={loading} 
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            name="category"
            value={form.category}
            onChange={handleFormChange}
            disabled={loading}
          >
            <option value="">Categoría</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Descripción" 
            name="description" 
            value={form.description} 
            onChange={handleFormChange} 
            disabled={loading} 
          />
        </div>
        <div className="col-md-2">
          <button 
            className="btn btn-success w-100" 
            onClick={handleAdd}
            disabled={loading}
          >
            Agregar
          </button>
        </div>
      </div>

      {editingId && (
        <div id="edit-form" className="row g-3 mb-4 p-3 border rounded bg-dark">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h5 className="m-0">Editando producto #{editingId}</h5>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={cancelEdit} disabled={loading}>
              Cancelar
            </button>
          </div>

          <div className="col-md-3">
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              value={editForm.name} 
              onChange={handleEditChange} 
              disabled={loading} 
            />
          </div>
          <div className="col-md-2">
            <input 
              type="number" 
              step="0.01" 
              className="form-control" 
              name="price" 
              value={editForm.price} 
              onChange={handleEditChange} 
              disabled={loading} 
            />
          </div>
          <div className="col-md-1">
            <input 
              type="number" 
              className="form-control" 
              name="stockQuantity" 
              value={editForm.stockQuantity} 
              onChange={handleEditChange} 
              disabled={loading} 
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              name="category"
              value={editForm.category}
              onChange={handleEditChange}
              disabled={loading}
            >
              <option value="">Categoría</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <input 
              type="text" 
              className="form-control" 
              name="description" 
              value={editForm.description} 
              onChange={handleEditChange} 
              disabled={loading} 
            />
          </div>
          <div className="col-md-2">
            <button 
              className="btn btn-primary w-100" 
              onClick={saveEdit}
              disabled={loading}
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div><strong>Total:</strong> {products.length} productos</div>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-primary btn-sm" 
            onClick={reloadProducts}
            disabled={loading}
          >
            🔄 Recargar
          </button>
          <button 
            className="btn btn-outline-danger btn-sm" 
            onClick={handleClearAll} 
            disabled={loading || products.length === 0}
          >
            Vaciar todos
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th style={{ width: 70 }}>ID</th>
              <th>Nombre</th>
              <th style={{ width: 100 }}>Precio</th>
              <th style={{ width: 70 }}>Stock</th>
              <th style={{ width: 120 }}>Categoría</th>
              <th>Descripción</th>
              <th style={{ width: 160 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  {loading ? "Cargando..." : "No hay productos"}
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>${Number(p.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td>{p.stockQuantity}</td>
                  <td><span className="badge bg-info">{p.category}</span></td>
                  <td>{p.description}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-warning btn-sm" 
                        onClick={() => startEdit(p)} 
                        disabled={loading}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => handleDelete(p.id)} 
                        disabled={loading}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )}