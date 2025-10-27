import React, { useEffect, useState } from "react";


//Administración de usuarios (CRUD) - componente auto-contenido
/*
 * - Usa localStorage para persistencia .
 */


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
    const raw = localStorage.getItem(STORAGE_KEY); //busca los usuarios guardados en localStorage

    //pregunta si hay datos guardados
    if (raw) {
      try {
        setUsers(JSON.parse(raw)); //intenta parsear(convertir datos de un formato a otro) y cargar los datos guardados
      } catch {
        setUsers(sampleUsers); //si hay un error al parsear, carga los datos de ejemplo
      }
    } else {
      setUsers(sampleUsers); //si no hay datos, carga los de ejemplo
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users)); //guarda los usuarios en localStorage cada vez que se actualizan
  }, [users]);

  // 🔹 Manejadores formulario agregar usuarios
  const handleFormChange = (e) => { 
    const { name, value } = e.target; //obtiene el nombre y valor del campo que se está modificando
    setForm((s) => ({ ...s, [name]: value })); //actualiza el estado del formulario con el nuevo valor
  };


  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim()) return alert("Nombre y email son obligatorios."); //valida que no esten vaciós
    const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;  //genera un ID único para el nuevo usuario
    const newUser = { id: nextId, ...form };      //crea el nuevo usuario con el ID y los datos del formulario
    setUsers((u) => [newUser, ...u]);             //agrega el nuevo usuario al estado de usuarios
    setForm({ nombre: "", email: "", rol: "" }); //resetea el formulario
  };

  // 🔹 Editar usuario
  const startEdit = (user) => {
    setEditingId(user.id); //establece el ID del usuario que se va a editar
    setEditForm({ nombre: user.nombre, email: user.email, rol: user.rol }); //carga los datos del usuario en el formulario de edición
  };

  // Cancela la edición
  const cancelEdit = () => { 
    setEditingId(null); 
    setEditForm({ nombre: "", email: "", rol: "" });
  };

  // Maneja los cambios en el formulario de edición
  const handleEditChange = (e) => {
    const { name, value } = e.target;               //obtiene el nombre y valor del campo que se está modificando
    setEditForm((s) => ({ ...s, [name]: value })); //actualiza el estado del formulario de edición con el nuevo valor
  };


  // Guarda los cambios realizados en la edición
  const saveEdit = (e) => {
    e.preventDefault(); //previene el envío del formulario
    setUsers((list) =>  //actualiza la lista de usuarios
      list.map((u) =>   //itera sobre cada usuario
        u.id === editingId   //si el ID del usuario coincide con el ID que se está editando
          ? { ...u, ...editForm }  //actualiza los datos del usuario con los del formulario de edición
          : u                     //si no coincide, deja el usuario sin cambios
      )
    );
    cancelEdit();
  };

  // 🔹 Eliminar
  const handleDelete = (id) => {
    if (!window.confirm("¿Eliminar usuario?")) return;   //pregunta por confirmación antes de eliminar
    setUsers((list) => list.filter((u) => u.id !== id));  //elimina el usuario con el ID especificado
  };

  // 🔹 Vaciar todo
  const handleClearAll = () => {
    if (!window.confirm("¿Vaciar todos los usuarios?")) return;  //pregunta por confirmación antes de vaciar
    setUsers([]);  //vacía la lista de usuarios
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
            value={form.nombre}  //conecta el valor del input 
            onChange={handleFormChange}  //maneja los cambios en el input
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
          <strong>Total:</strong> {users.length} {/*muestra el total de usuarios*/}
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
            {users.length === 0 && (  //si no hay usuarios, muestra un mensaje
              <tr>
                <td colSpan="5" className="text-center">
                  No hay usuarios
                </td>
              </tr>
            )}
            {users.map((u) => (  //itera sobre la lista de usuarios y muestra cada uno en una fila
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-warning btn-sm" onClick={() => startEdit(u)}>  {/*inicia la edición del usuario*/}
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>  {/*elimina el usuario*/}
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
