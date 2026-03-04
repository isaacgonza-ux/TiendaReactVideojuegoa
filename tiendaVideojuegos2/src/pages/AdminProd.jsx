import React, { useEffect, useState } from "react";

const productos = [
  {
    id: 1,
    name: "Red Dead Redemption2",
    price: 15990,
    img: "/img/red.png",
    description: "",
    stockQuantity: 100,
    category: "PlayStation 4"
  },
  {
    id: 2,
    name: "The Last of Us Part 1",
    price: 22990,
    img: "/img/thelast.png",
    description: "",
    stockQuantity: 100,
    category: "PlayStation 5"
  },
  {
    id: 3,
    name: "The Last of Us Part II",
    price: 18990,
    img: "/img/thelast2.png",
    description: "",
    stockQuantity: 100,
    category: "PlayStation 4"
  },
  {
    id: 4,
    name: "Juego 4",
    price: 19990,
    img: "/img/1.png",
    stockQuantity: 100,
    category: "PC"
  },
  {
    id: 5,
    name: "Juego 5",
    price: 25990,
    img: "/img/11.png",
    stockQuantity: 100,
    category: "Xbox Series X"
  },
  {
    id: 6,
    name: "The Walking Dead",
    price: 25990,
    img: "/img/walking.png",
    stockQuantity: 100,
    category: "PlayStation 4"
  },
  {
    id: 7,
    name: "Beyond Two Souls",
    price: 25990,
    img: "/img/beyond.png",
    stockQuantity: 100,
    category: "PlayStation 4"
  },
  {
    id: 8,
    name: "Detroit Become Human",
    price: 25990,
    img: "/img/detroit.png",
    stockQuantity: 100,
    category: "PlayStation 4"
  },
  {
    id: 9,
    name: "Heavy Rain",
    price: 25990,
    img: "/img/heavy.png",
    stockQuantity: 100,
    category: "PlayStation 4"
  },
  {
    id: 10,
    name: "Crash Bandicoot 4",
    price: 25990,
    img: "/img/crash.png",
    stockQuantity: 100,
    category: "PlayStation 5"
  },
  {
    id: 11,
    name: "FIFA 23",
    price: 25990,
    img: "/img/fifa 23.png",
    stockQuantity: 100,
    category: "Xbox Series S"
  },
  {
    id: 12,
    name: "Ghost of Tsushima",
    price: 25990,
    img: "/img/ghost.png",
    stockQuantity: 100,
    category: "PlayStation 5"
  },
  {
    id: 13,
    name: "Yotei Chronicles",
    price: 25990,
    img: "/img/yotei.png",
    stockQuantity: 100,
    category: "PC"
  },
  {
    id: 14,
    name: "PES 2022",
    price: 25990,
    img: "/img/pes.png",
    stockQuantity: 100,
    category: "PlayStation 4"
  },
  {
    id: 15,
    name: "Street Fighter VI",
    price: 25990,
    img: "/img/street.png",
    description: "DetalleProductoGow.html",
    stockQuantity: 100,
    category: "PlayStation 5"
  },
  {
    id: 16,
    name: "God of War (PS4)",
    price: 25990,
    img: "/img/gow1.png",
    stockQuantity: 100,
    category: "PlayStation 4"
  },
  {
    id: 17,
    name: "God of War II",
    price: 25990,
    img: "/img/gow2.png",
    stockQuantity: 100,
    category: "PlayStation 4"
  },
  {
    id: 18,
    name: "God of War III",
    price: 25990,
    img: "/img/gow3.png",
    stockQuantity: 100,
    category: "PlayStation 4"
  },
  {
    id: 19,
    name: "Juego 19",
    price: 25990,
    img: "/img/5.png",
    stockQuantity: 100,
    category: "Nintendo Switch"
  },
  {
    id: 20,
    name: "God of War Ragnarok",
    price: 20990,
    img: "/img/6.png",
    description: "DetalleProductoGow.html",
    stockQuantity: 100,
    category: "PlayStation 5"
  },
  {
    id: 21,
    name: "The Last of Us: Left Behind",
    price: 25990,
    img: "/img/left behind.png",
    stockQuantity: 100,
    category: "PlayStation 4"
  },
  {
    id: 22,
    name: "The Last of Us PS3",
    price: 25990,
    img: "/img/thelastps3.png",
    stockQuantity: 100,
    category: "PlayStation 3"
  },
  {
    id: 23,
    name: "Stray",
    price: 25990,
    img: "/img/stray.png",
    stockQuantity: 100,
    category: "PlayStation 5"
  },
  {
    id: 24,
    name: "Red Dead Redemption",
    price: 25990,
    img: "/img/reddead1.png",
    stockQuantity: 100,
    category: "PlayStation 4"
  },
  {
    id: 25,
    name: "Grand Theft Auto VI",
    price: 25990,
    img: "/img/7.png",
    description: "D_Gtavl.html",
    stockQuantity: 100,
    category: "PlayStation 5"
  }
];

const api = {
  _getProducts() {
    const products = localStorage.getItem("products");
    if (!products) {
      localStorage.setItem("products", JSON.stringify(productos));
      return productos;
    }
    return JSON.parse(products);
  },
  _saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  },
  getAll() {
    return Promise.resolve(this._getProducts());
  },
  create(product) {
    const products = this._getProducts();
    const newProduct = {
      ...product,
      id: Date.now(),
    };
    products.unshift(newProduct);
    this._saveProducts(products);
    return Promise.resolve(newProduct);
  },
  update(id, product) {
    const products = this._getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      return Promise.reject(new Error("ProductNotFound"));
    }
    const updatedProduct = { ...products[index], ...product };
    products[index] = updatedProduct;
    this._saveProducts(products);
    return Promise.resolve(updatedProduct);
  },
  delete(id) {
    let products = this._getProducts();
    products = products.filter((p) => p.id !== id);
    this._saveProducts(products);
    return Promise.resolve();
  },
  getToken() {
    return localStorage.getItem("token");
  }
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