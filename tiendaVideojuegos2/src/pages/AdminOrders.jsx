import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


// Componente de administración de órdenes, que permite al administrador ver y gestionar las órdenes recibidas.

export default function AdminOrders({ isAdminLogged }) {  // Componente de administración de órdenes
  const [orders, setOrders] = useState([]); // Estado local para almacenar las órdenes

  useEffect(() => {
    const stored = localStorage.getItem('orders');  // Recupera las órdenes desde localStorage
    if (stored) setOrders(JSON.parse(stored));  // Parsea y establece las órdenes en el estado
  }, []);

  const markShipped = (id) => {  // Marca una orden como enviada
    const updated = orders.map(o => o.id === id ? { ...o, status: 'shipped' } : o);  // Actualiza el estado de la orden
    setOrders(updated); // Actualiza el estado local
    localStorage.setItem('orders', JSON.stringify(updated));  // Guarda los cambios en localStorage
  };

  if (!isAdminLogged) {  // Verifica si el admin está autenticado
    return <Navigate to="/inicioSesion" replace />;
  }

  return (
    <div className="container py-4">
      <h2>Órdenes recibidas</h2>
      {orders.length === 0 ? (
        <p>No hay órdenes todavía.</p>
      ) : (

        // Tabla de órdenes
        <div className="table-responsive mt-3">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Artículos</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (  // Itera sobre las órdenes y muestra cada una en una fila
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{new Date(o.date).toLocaleString()}</td>   {/*Formatea la fecha de la orden*/}
                  <td>{o.checkout?.nombre} {o.checkout?.apellido} <br /> {o.checkout?.email}</td> {/*Información del cliente*/}
                  <td>
                    {o.items?.map(it => (  // Lista de artículos en la orden
                      <div key={it.id}>{it.quantity}x {it.title}</div>    // Muestra cantidad y título del artículo
                    ))}
                  </td>
                  <td>{Number(o.total).toLocaleString()} CLP</td>  {/*Formatea el total en CLP*/}
                  <td>{o.status}</td>
                  <td>
                    {o.status !== 'shipped' && (   // Muestra el botón solo si no está enviado
                      <button className="btn btn-sm btn-primary" onClick={() => markShipped(o.id)}>Marcar como enviado</button> // Botón para marcar como enviado
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
