import React, { useEffect, useState } from "react";


//Administración de usuarios (CRUD) - componente auto-contenido 




export default function AdminUsuarios() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", password: "", name: "",email: "", role: ""   });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", password: "", name: "",email: "", role: ""  });

const API_URL = "http://localhost:8080/admin"; // URL base de la API 
const token = localStorage.getItem("token"); // Obtener el token del localStorage


 
// Función asíncrona que obtiene la lista de usuarios del servidor
 const loadUsers = async () => {
    try {
        // Hace una petición GET al endpoint de usuarios
      const res = await fetch(`${API_URL}/get_users`, {
         // Configura los headers de la petición
        headers: {
          Authorization: `Bearer ${token}`,    // Envía el token JWT para autenticar la petición
        },
      });

       // Verifica si la respuesta HTTP no fue exitosa 
        if (!res.ok) {
        throw new Error("Error al cargar usuarios"); // Lanza un error para ser capturado en el catch
      }

       const data = await res.json();   // Convierte la respuesta JSON en un objeto JavaScript
      setUsers(data); // Actualiza el estado con la lista de usuarios recibida

    } catch (err) {
      console.error("❌ Error cargando usuarios:", err);
      alert("Error cargando usuarios.");
    }
  };

  // Hook que ejecuta código cuando el componente se monta
  useEffect(() => {
    loadUsers();  // Llama a la función para cargar usuarios
  }, []); // Array vacío significa que solo se ejecuta una vez al montar el componente


   // -----------------------
  //  MANEJAR FORMULARIOS
  // -----------------------
  const handleFormChange = (e) => {
    const { name, value } = e.target;// Extrae el nombre del campo y su valor del elemento que disparó el evento
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((s) => ({ ...s, [name]: value }));// Actualiza el estado del formulario manteniendo los valores anteriores y modificando solo el campo cambiado
  };


   // -----------------------
  //  AGREGAR USUARIO (POST)
  // -----------------------
  const handleAdd = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    // Valida que todos los campos estén llenos antes de enviar
     if (!form.username || !form.password || !form.name || !form.email || !form.role) {
      return alert("Todos los campos son obligatorios (incl. contraseña y username).");
    }

    try {
      // Realiza una petición POST al endpoint de creación de usuarios
      const res = await fetch(`${API_URL}/create_users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indica que el cuerpo de la petición es JSON
          Authorization: `Bearer ${token}`, // Envía el token JWT para autenticar la petición
        },
        // Cuerpo de la petición con los datos del nuevo usuario
       body: JSON.stringify({
          username: form.username,
          password: form.password,
          name: form.name,
          email: form.email,
          role: form.role
        }),
      });

      
      if (res.ok){alert("Usuario creado con éxito");}
   


      if (!res.ok) throw new Error("Error al crear usuario :${res.status} ${res.statusText}");

      await loadUsers(); // Recarga la lista de usuarios para reflejar el nuevo usuario agregado
      setForm({ username: "", password: "", name: "", email: "", role: "" });// Limpiar formulario  
    } catch (err) {
      console.error("❌ Error agregando usuario:", err);
      alert("No se pudo crear el usuario.");
    }
  };


   // -----------------------
  //  EDITAR USUARIO (PUT)
  // -----------------------
  // Inicia el proceso de edición llenando el formulario con los datos del usuario seleccionado
   const startEdit = (user) => {
    setEditingId(user.id); // Guarda el ID del usuario que se está editando
    setEditForm({ // Llena el formulario de edición con los datos actuales del usuario
      username: user.username || "",
      password: "", // no mostrar password actual; permitir setear nueva
      name: user.name || "",
      email: user.email || "",
      role: user.role || ""
    });
  };

  // Guarda los cambios realizados en el usuario editado
  const saveEdit = async (e) => {
    e.preventDefault(); 

    // Validar campos obligatorios
      if (!editForm.username || !editForm.name || !editForm.email || !editForm.role) {
      return alert("Username, name, email y role son obligatorios.");
    }

     try {
      // Construir el cuerpo de la petición
      const bodyToSend = {
        username: editForm.username,
        name: editForm.name,
        email: editForm.email,
        role: editForm.role
      };
      // si el admin puso nueva contraseña, la incluimos
      if (editForm.password && editForm.password.trim() !== "") {
        bodyToSend.password = editForm.password;
      }

      // Realiza una petición PUT al endpoint de edición de usuarios
      const res = await fetch(`${API_URL}/users/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyToSend),
      });

      if (res.ok){alert("Usuario editado con éxito");}

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error al editar usuario: ${res.status} ${text}`);
      }

      cancelEdit();// Limpiar estado de edición
      await loadUsers();// Recargar la lista de usuarios para reflejar los cambios
    } catch (err) { 
      console.error("❌ Error editando usuario:", err);
      alert("Error al guardar cambios. Revisa la consola.");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ username: "", password: "", name: "", email: "", role: "" });
  };


  
  // -----------------------
  //  ELIMINAR USUARIO (DELETE)
  // -----------------------
  const handleDelete = async (id) => { // Recibe el ID del usuario a eliminar
    if (!window.confirm("¿Eliminar usuario?")) return; // Confirma la acción con el usuario 

    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok){alert("Usuario eliminado con éxito");}

      if (!res.ok) throw new Error("Error al eliminar usuario");

      await loadUsers();

    } catch (err) {
      console.error("❌ Error eliminando usuario:", err);
      alert("No se pudo eliminar el usuario.");
    }
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
            placeholder="Username"
            name="username"
            value={form.username}  //conecta el valor del input 
            onChange={handleFormChange}  //maneja los cambios en el input
          />
        </div>
        <div className="col-md-4">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            name="password"
            value={form.password}
            onChange={handleFormChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            name="name"
            value={form.name}
            onChange={handleFormChange}
          />
        </div>

        <div className="col-md-3">
      <input
        type="email"
        className="form-control"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleFormChange}
      />
    </div>

         <div className="col-md-2">
      <select
        className="form-control"
        name="role"
        value={form.role}
        onChange={handleFormChange}
        required
      >
        <option value="USER">Usuario</option>
        <option value="ADMIN">Admin</option>
      </select>
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

          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="username"
              value={editForm.username}
              onChange={handleEditChange}
            />
          </div>

          <div className="col-md-2">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Nueva contraseña (opcional)"
              value={editForm.password}
              onChange={handleEditChange}
            />
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
            />
          </div>

          <div className="col-md-3">
            <input
              type="email"
              className="form-control"
              name="email"
              value={editForm.email}
              onChange={handleEditChange}
            />
          </div>

          <div className="col-md-2">
        <select
          className="form-control"
          name="role"
          value={form.role}
          onChange={handleFormChange}
          required
        >
          <option value="USER">Usuario</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">
              Guardar
            </button>
          </div>
        </form>
      )}

      {/* Controles */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div>
          <strong>Total:</strong> {users.length}
        </div>
        <div className="d-flex gap-2">
         
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => loadUsers()}
          >
            Recargar
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle">
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
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay usuarios
                </td>
              </tr>
            )}

            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>

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