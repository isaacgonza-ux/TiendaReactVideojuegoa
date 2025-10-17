import React, { useEffect, useState } from "react";

/**
 * Admin (CRUD) - componente auto-contenido
 *
 * Usa localStorage para persistencia simple.
 */

const STORAGE_KEY = "admin_products_v1";

const sampleProducts = [
  { id: 1, titulo: "God of War Ragnarök", precio: 69.99, categoria: "Videojuego" },
  { id: 2, titulo: "Red Dead Redemption 2", precio: 59.99, categoria: "Videojuego" },
];

export default function Admin() {
  // lista de productos
  const [products, setProducts] = useState([]);

  // formulario nuevo producto
  const [form, setForm] = useState({ titulo: "", precio: "", categoria: "" });

  // edición
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ titulo: "", precio: "", categoria: "" });

  // carga inicial desde localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setProducts(JSON.parse(raw));
      } catch {
        setProducts(sampleProducts);
      }
    } else {
      setProducts(sampleProducts);
    }
  }, []);

  // guardar en localStorage cuando cambien products
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  // manejadores formulario agregar
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    // validaciones simples
    if (!form.titulo.trim()) return alert("Título es obligatorio");
    const precioNum = parseFloat(form.precio);
    if (isNaN(precioNum)) return alert("Precio inválido");
    const nextId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
      id: nextId,
      titulo: form.titulo.trim(),
      precio: Number(precioNum.toFixed(2)),
      categoria: form.categoria.trim() || "Sin categoría",
    };
    setProducts((p) => [newProduct, ...p]);
    setForm({ titulo: "", precio: "", categoria: "" });
  };

  // iniciar edición
  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ titulo: product.titulo, precio: String(product.precio), categoria: product.categoria });
    // hacer scroll opcional al formulario de edición
    const el = document.getElementById("edit-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ titulo: "", precio: "", categoria: "" });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((s) => ({ ...s, [name]: value }));
  };

  const saveEdit = (e) => {
    e.preventDefault();
    if (editingId == null) return;
    if (!editForm.titulo.trim()) return alert("Título es obligatorio");
    const precioNum = parseFloat(editForm.precio);
    if (isNaN(precioNum)) return alert("Precio inválido");
    setProducts((list) =>
      list.map((p) =>
        p.id === editingId
          ? { ...p, titulo: editForm.titulo.trim(), precio: Number(precioNum.toFixed(2)), categoria: editForm.categoria.trim() || "Sin categoría" }
          : p
      )
    );
    cancelEdit();
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    setProducts((list) => list.filter((p) => p.id !== id));
    if (editingId === id) cancelEdit();
  };

  const handleClearAll = () => {
    if (!window.confirm("Vaciar todos los productos?")) return;
    setProducts([]);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Gestión de Videojuegos (Administrador)</h2>

      {/* Form: agregar nuevo */}
      <form className="row g-3 mb-4" onSubmit={handleAdd}>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Título del juego"
            name="titulo"
            value={form.titulo}
            onChange={handleFormChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            step="0.01"
            className="form-control"
            placeholder="Precio"
            name="precio"
            value={form.precio}
            onChange={handleFormChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Categoría"
            name="categoria"
            value={form.categoria}
            onChange={handleFormChange}
          />
        </div>
        <div className="col-md-3 d-flex gap-2">
          <button type="submit" className="btn btn-success w-100">
            Agregar
          </button>
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={() => {
              // listar = simplemente recargar de storage (ya está sincronizado).
              const raw = localStorage.getItem(STORAGE_KEY);
              if (raw) setProducts(JSON.parse(raw));
              else setProducts(sampleProducts);
            }}
          >
            Listar
          </button>
        </div>
      </form>

      {/* Edit form (visible sólo si editingId) */}
      {editingId && (
        <form id="edit-form" className="row g-3 mb-4 p-3 border rounded" onSubmit={saveEdit}>
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h5 className="m-0">Editando producto #{editingId}</h5>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={cancelEdit}>
              Cancelar
            </button>
          </div>

          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              name="titulo"
              value={editForm.titulo}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="precio"
              value={editForm.precio}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="categoria"
              value={editForm.categoria}
              onChange={handleEditChange}
            />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">
              Guardar
            </button>
          </div>
        </form>
      )}

      {/* Controls */}
      <div className="mb-3 d-flex justify-content-between">
        <div>
          <strong>Total:</strong> {products.length}
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-danger btn-sm" onClick={handleClearAll}>
            Vaciar todo
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              // restaurar ejemplo
              setProducts(sampleProducts);
            }}
          >
            Restaurar ejemplo
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th style={{ width: 70 }}>ID</th>
              <th>Título</th>
              <th style={{ width: 120 }}>Precio</th>
              <th style={{ width: 160 }}>Categoría</th>
              <th style={{ width: 160 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay productos
                </td>
              </tr>
            )}
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.titulo}</td>
                <td>${Number(p.precio).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td>{p.categoria}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-warning btn-sm" onClick={() => startEdit(p)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
