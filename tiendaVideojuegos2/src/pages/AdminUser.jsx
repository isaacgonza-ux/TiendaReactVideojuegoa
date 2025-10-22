import React, { useEffect, useState } from "react";

const STORAGE_KEY = "admin_users_v1";

const sampleUsers = [
  { id: 1, nombre: "Juan Pérez", email: "juan@example.com", rol: "Cliente" },
  { id: 2, nombre: "Admin Tienda", email: "admin@tiendagamer.com", rol: "Administrador" },
];

export default function AdminUsuarios() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ nombre: "", email: "", rol: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ nombre: "", email: "", rol: "" });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUsers(JSON.parse(raw));
      } catch {
        setUsers(sampleUsers);
      }
    } else {
      setUsers(sampleUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  // 🔹 Manejadores formulario agregar
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim()) return alert("Nombre y email son obligatorios.");
    const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = { id: nextId, ...form };
    setUsers((u) => [newUser, ...u]);
    setForm({ nombre: "", email: "", rol: "" });
  };

  // 🔹 Editar usuario
  const startEdit = (user) => {
    setEditingId(user.id);
    setEditForm({ nombre: user.nombre, email: user.email, rol: user.rol });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ nombre: "", email: "", rol: "" });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((s) => ({ ...s, [name]: value }));
  };

  const saveEdit = (e) => {
    e.preventDefault();
    setUsers((list) =>
      list.map((u) =>
        u.id === editingId
          ? { ...u, ...editForm }
          : u
      )
    );
    cancelEdit();
  };

  // 🔹 Eliminar
  const handleDelete = (id) => {
    if (!window.confirm("¿Eliminar usuario?")) return;
    setUsers((list) => list.filter((u) => u.id !== id));
  };

  // 🔹 Vaciar todo
  const handleClearAll = () => {
    if (!window.confirm("¿Vaciar todos los usuarios?")) return;
    setUsers([]);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Gestión de Usuarios</h2>

      {/* Formulario agregar */}
      <form className="row g-3 mb-4" onSubmit={handleAdd}>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre completo"
            name="nombre"
            value={form.nombre}
            onChange={handleFormChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="email"
            className="form-control"
            placeholder="Correo electrónico"
            name="email"
            value={form.email}
            onChange={handleFormChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Rol (ej: Cliente, Admin)"
            name="rol"
            value={form.rol}
            onChange={handleFormChange}
          />
        </div>
        <div className="col-md-1 d-flex">
          <button type="submit" className="btn btn-success w-100">
            Agregar
          </button>
        </div>
      </form>

      {/* Formulario edición */}
      {editingId && (
        <form className="row g-3 mb-4 p-3 border rounded" onSubmit={saveEdit}>
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h5>Editando usuario #{editingId}</h5>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={cancelEdit}>
              Cancelar
            </button>
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={editForm.nombre}
              onChange={handleEditChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              name="email"
              value={editForm.email}
              onChange={handleEditChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="rol"
              value={editForm.rol}
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

      {/* Controles */}
      <div className="mb-3 d-flex justify-content-between">
        <div>
          <strong>Total:</strong> {users.length}
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-danger btn-sm" onClick={handleClearAll}>
            Vaciar todo
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setUsers(sampleUsers)}
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
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay usuarios
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-warning btn-sm" onClick={() => startEdit(u)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>
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
