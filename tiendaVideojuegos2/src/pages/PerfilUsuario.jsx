import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";

// IMPORTANTE: Importamos todas tus listas para buscar la info real de los productos de la wishlist
import { estrenos, ofertas, masVendidos, deathStrandingData, gowRagnarokData, fc26Data, gtaVlData } from "../data/ProductData";

export default function Perfil() {
  // Estados para datos
  const [user, setUser] = useState({
    name: "",
    username: "", // Nuevo campo solicitado
    email: "",
    address: ""
  });
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  // Estados para la edición
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState({}); // Datos temporales mientras editas

  const { addToCart } = useCart();

  // 1. CREAR CATÁLOGO MAESTRO
  // Unimos todo para poder buscar productos por ID cuando cargamos la wishlist
  const todosLosProductos = [
    ...estrenos,
    ...ofertas,
    ...masVendidos,
    // Agregamos también los datos individuales por si acaso
    { id: "ds2", ...deathStrandingData }, // Asignamos IDs ficticios si no los tienen
    { id: "gow", ...gowRagnarokData },
    { id: "fc26", ...fc26Data },
    { id: "gta", ...gtaVlData }
  ];

  // --- EFECTOS DE CARGA (READ) ---

  // Cargar Usuario
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // AQUÍ ESTÁ EL CAMBIO:
        // Fusionamos los datos guardados con valores por defecto para evitar campos vacíos
        setUser({
            name: parsedUser.name || "",
            email: parsedUser.email || "",
            address: parsedUser.address || "",
            // Si no hay username guardado, usamos el 'name' o "Usuario" por defecto
            username: parsedUser.username || parsedUser.name || "Usuario", 
        });
      } catch {
        console.error("Error al leer usuario");
        // En caso de error, reseteamos
        setUser({ name: "", username: "", email: "", address: "" });
      }
    } else {
        // Lógica de respaldo si no hay usuario (mira checkoutData)
        const checkoutData = localStorage.getItem("checkoutData");
        if(checkoutData) {
            try {
                const ck = JSON.parse(checkoutData);
                const nombreBase = ck.firstName || ck.name || "";
                setUser({
                    name: nombreBase,
                    username: nombreBase, // Usamos el nombre como username inicial
                    email: ck.email || "",
                    address: ""
                });
            } catch {}
        }
    }
  }, []);

  // Cargar Wishlist
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      try {
        const parsed = JSON.parse(storedWishlist);
        setWishlist(Array.isArray(parsed) ? parsed : []);
      } catch {
        setWishlist([]);
      }
    }
  }, []);

  // Cargar Órdenes
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      try {
        const allOrders = JSON.parse(storedOrders);
        // Filtramos por email si el usuario tiene uno, si no, mostramos todo (para pruebas)
        if (user.email) {
            setOrders(allOrders.filter(o => o.email === user.email || o?.checkout?.email === user.email));
        } else {
            setOrders(allOrders);
        }
      } catch {
        setOrders([]);
      }
    }
  }, [user.email]);

  // --- FUNCIONES DE EDICIÓN DE PERFIL (WRITE) ---

  const handleEditClick = () => {
    setTempUser({ ...user }); // Copiamos datos actuales al temporal
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Simplemente cerramos sin guardar
    setTempUser({});
  };

  const handleSaveClick = () => {
    setUser(tempUser); // Actualizamos estado visual
    localStorage.setItem("user", JSON.stringify(tempUser)); // Guardamos en persistencia
    setIsEditing(false);
    alert("¡Perfil actualizado correctamente!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // --- FUNCIONES WISHLIST ---

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => String(item) !== String(id));
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist");
  };

  // Buscar los objetos completos de productos basados en los IDs de la wishlist
  const wishlistProducts = wishlist.map(id => {
    // Buscamos en el array maestro. Convertimos a String para asegurar coincidencia
    return todosLosProductos.find(p => String(p.id) === String(id));
  }).filter(item => item !== undefined); // Quitamos los que no se encuentren (undefined)

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-warning">Mi Perfil</h2>

      <div className="row">
        {/* COLUMNA IZQUIERDA: DATOS DE USUARIO */}
        <div className="col-lg-4 mb-4">
          <div className="card bg-dark border-secondary text-white shadow">
            <div className="card-header border-secondary bg-transparent">
                <h5 className="mb-0 text-warning">👤 Datos Personales</h5>
            </div>
            <div className="card-body">
              {isEditing ? (
                // --- MODO EDICIÓN ---
                <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }}>
                  <div className="mb-3">
                    <label className="form-label text-muted small">Nombre de Usuario</label>
                    <input 
                        type="text" 
                        className="form-control bg-secondary text-white border-0" 
                        name="username"
                        value={tempUser.username || ""} 
                        onChange={handleChange}
                        placeholder="Ej: Gamer123"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted small">Nombre Completo</label>
                    <input 
                        type="text" 
                        className="form-control bg-secondary text-white border-0" 
                        name="name"
                        value={tempUser.name || ""} 
                        onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted small">Email</label>
                    <input 
                        type="email" 
                        className="form-control bg-secondary text-white border-0" 
                        name="email"
                        value={tempUser.email || ""} 
                        onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted small">Dirección de Envío</label>
                    <textarea 
                        className="form-control bg-secondary text-white border-0" 
                        name="address"
                        rows="2"
                        value={tempUser.address || ""} 
                        onChange={handleChange}
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success">💾 Guardar Cambios</button>
                    <button type="button" onClick={handleCancelClick} className="btn btn-outline-danger">Cancelar</button>
                  </div>
                </form>
              ) : (
                // --- MODO VISUALIZACIÓN ---
                <div>
                  <div className="mb-3 text-center">
                    <div className="display-1">👾</div> {/* Avatar Placeholder */}
                    <h4 className="mt-2">{user.username || "Sin nombre de usuario"}</h4>
                    <p className="text-muted small">{user.email || "Sin email registrado"}</p>
                  </div>
                  <hr className="border-secondary"/>
                  <p><strong>Nombre:</strong> {user.name || "No especificado"}</p>
                  <p><strong>Dirección:</strong> {user.address || "No especificada"}</p>
                  
                  <div className="d-grid mt-4">
                    <button onClick={handleEditClick} className="btn btn-outline-warning">
                        ✏️ Editar Perfil
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: WISHLIST Y COMPRAS */}
        <div className="col-lg-8">
            
            {/* SECCIÓN WISHLIST */}
            <section className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-black m-0">❤️Lista de Deseos</h4>
                    {wishlist.length > 0 && (
                        <button onClick={clearWishlist} className="btn btn-sm btn-outline-danger">Vaciar Todo</button>
                    )}
                </div>

                {wishlistProducts.length === 0 ? (
                    <div className="alert alert-dark border-secondary text-center">
                        No tienes juegos en tu lista de deseos. <Link to="/" className="text-warning">¡Ve a buscar algunos!</Link>
                    </div>
                ) : (
                    <div className="row g-3">
                        {wishlistProducts.map(product => (
                            <div key={product.id} className="col-md-6">
                                <div className="card bg-dark border-secondary text-white h-100 flex-row overflow-hidden">
                                    <div style={{width: '120px', minWidth: '120px'}}>
                                        <img 
                                            src={product.img || product.mainImage} 
                                            alt={product.title}
                                            className="h-100 w-100"
                                            style={{objectFit: 'cover'}} 
                                        />
                                    </div>
                                    <div className="card-body d-flex flex-column p-2">
                                        <h6 className="card-title text-truncate">{product.title}</h6>
                                        <div className="text-success fw-bold mb-2">
                                            {product.newPrice || product.price}
                                        </div>
                                        <div className="mt-auto d-flex gap-2">
                                            <button 
                                                className="btn btn-sm btn-warning flex-grow-1"
                                                onClick={() => addToCart(product)}
                                            >
                                                🛒
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-danger"
                                                onClick={() => removeFromWishlist(product.id)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* SECCIÓN COMPRAS */}
            <section>
                <h4 className="text-black mb-3">📦 Historial de Compras</h4>
                {orders.length === 0 ? (
                    <div className="alert alert-dark border-secondary">
                        Aún no has realizado compras.
                    </div>
                ) : (
                    <div className="list-group">
                        {orders.map((order, idx) => (
                            <div key={idx} className="list-group-item bg-dark border-secondary text-white mb-2 rounded">
                                <div className="d-flex justify-content-between">
                                    <h5 className="mb-1 text-warning">Orden #{String(order.id || idx).slice(0,8)}</h5>
                                    <small className="text-muted">{order.date || "Fecha desconocida"}</small>
                                </div>
                                <p className="mb-1 text-light">
                                    {order.cart?.map(item => `${item.title} (x${item.quantity})`).join(", ")}
                                </p>
                                <small className="fw-bold text-success">Total Pagado: ${Number(order.total).toLocaleString()}</small>
                            </div>
                        ))}
                    </div>
                )}
            </section>

        </div>
      </div>
    </div>
  );
}