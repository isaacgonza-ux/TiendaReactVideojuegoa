import React, { useState, useEffect } from "react";

export default function AdminUsuarios({ isAdminLogged }) {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", password: "", name: "", email: "", role: "USER" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", password: "", name: "", email: "", role: "USER" });

  const API_URL = "http://localhost:8080/admin"; 
  
  // 🔑 Función para obtener el token SIEMPRE actualizado en el momento de la petición
  const getToken = () => localStorage.getItem("token");

  // -----------------------
  //  CARGAR USUARIOS (GET)
  // -----------------------
  const loadUsers = async () => {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const allUsers = [
        { id: 0, name: "Admin", email: "admin@gmail.com", username: "admin", role: "ADMIN" },
        ...localUsers.map((u, index) => ({...u, id: u.id || index + 1}))
    ];
    setUsers(allUsers);
  };

  useEffect(() => {
    loadUsers();  
  }, []); 

  // -----------------------
  //  MANEJAR FORMULARIOS
  // -----------------------
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((s) => ({ ...s, [name]: value }));
  };

  // -----------------------
  //  AGREGAR USUARIO (POST)
  // -----------------------
  const handleAdd = async (e) => {
    e.preventDefault(); 

    if (!form.username || !form.password || !form.name || !form.email || !form.role) {
      return alert("Todos los campos son obligatorios.");
    }
    
    let localUsers = JSON.parse(localStorage.getItem("users")) || [];
    if(localUsers.find(u => u.email === form.email)){
        alert("El correo electronico ya esta en uso");
        return;
    }
    
    const newUser = { ...form, id: Date.now() };
    localUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(localUsers));
    
    alert("✅ Usuario creado con éxito");
    await loadUsers(); 
    setForm({ username: "", password: "", name: "", email: "", role: "USER" }); 
  };

  // -----------------------
  //  EDITAR USUARIO (PUT)
  // -----------------------
  const startEdit = (user) => {
    setEditingId(user.id); 
    setEditForm({ 
      username: user.username || "",
      password: "", 
      name: user.name || "",
      email: user.email || "",
      role: user.role || "USER"
    });
  };

  const saveEdit = async (e) => {
    e.preventDefault(); 

    if (!editForm.username || !editForm.name || !editForm.email || !editForm.role) {
      return alert("Faltan campos obligatorios.");
    }
    
    let localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = localUsers.findIndex(u => u.id === editingId);

    if (userIndex > -1) {
        const updatedUser = { ...localUsers[userIndex], ...editForm };
        if (editForm.password && editForm.password.trim() !== "") {
            updatedUser.password = editForm.password;
        } else {
            updatedUser.password = localUsers[userIndex].password;
        }
        localUsers[userIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(localUsers));
        
        alert("✅ Usuario editado con éxito");
        cancelEdit();
        await loadUsers();
    } else {
        alert("Error al guardar cambios. No se encontró el usuario.");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ username: "", password: "", name: "", email: "", role: "USER" });
  };

  // -----------------------
  //  ELIMINAR USUARIO (DELETE)
  // -----------------------
  const handleDelete = async (id) => { 
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return; 

    let localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = localUsers.filter(u => u.id !== id);
    
    if (updatedUsers.length < localUsers.length) {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        alert("🗑️ Usuario eliminado con éxito");
        await loadUsers();
    } else {
        alert("No se pudo eliminar el usuario.");
    }
  };

  return (
    <div className="container py-5"> 
      <h2 className="mb-4">Gestión de Usuarios</h2> 

      {/* Formulario agregar */}
      <form className="row g-3 mb-4" onSubmit={handleAdd}>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Username" name="username" value={form.username} onChange={handleFormChange} required />
        </div>
        <div className="col-md-3">
          <input type="password" className="form-control" placeholder="Contraseña" name="password" value={form.password} onChange={handleFormChange} required />
        </div>
        <div className="col-md-2">
          <input type="text" className="form-control" placeholder="Nombre" name="name" value={form.name} onChange={handleFormChange} required />
        </div>
        <div className="col-md-2">
          <input type="email" className="form-control" placeholder="Email" name="email" value={form.email} onChange={handleFormChange} required />
        </div>

        <div className="col-md-1">
          <select className="form-select" name="role" value={form.role} onChange={handleFormChange} required>
            <option value="USER">Usuario</option>
            <option value="SELLER">Vendedor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div className="col-md-1 d-flex">
          <button type="submit" className="btn btn-success w-100">Agregar</button>
        </div>
      </form>

      {/* Formulario edición */}
      {editingId && (
        <form className="row g-3 mb-4 p-3 border rounded bg-dark text-white" onSubmit={saveEdit}>
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h5 className="m-0">Editando usuario #{editingId}</h5>
            <button type="button" className="btn btn-sm btn-outline-light" onClick={cancelEdit}>Cancelar</button>
          </div>

          <div className="col-md-3">
            <input type="text" className="form-control" name="username" value={editForm.username} onChange={handleEditChange} required/>
          </div>
          <div className="col-md-3">
            <input type="password" className="form-control" name="password" placeholder="Nueva clave (opcional)" value={editForm.password} onChange={handleEditChange} />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" name="name" value={editForm.name} onChange={handleEditChange} required/>
          </div>
          <div className="col-md-2">
            <input type="email" className="form-control" name="email" value={editForm.email} onChange={handleEditChange} required/>
          </div>

          <div className="col-md-2">
            <select className="form-select" name="role" value={editForm.role} onChange={handleEditChange} required>
              <option value="USER">Usuario</option>
              <option value="SELLER">Vendedor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="col-md-12 mt-2">
            <button type="submit" className="btn btn-primary w-100">Guardar Cambios</button>
          </div>
        </form>
      )}

      {/* Controles */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div>
          <strong>Total:</strong> {users.length}
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={() => loadUsers()}>
            Recargar
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`badge ${u.role === 'ADMIN' ? 'bg-danger' : u.role === 'SELLER' ? 'bg-info text-dark' : 'bg-secondary'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-warning btn-sm" onClick={() => startEdit(u)}>
                        Editar
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>
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
  );
}