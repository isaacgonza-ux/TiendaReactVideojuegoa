import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminOrders({ isAdminLogged }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) setOrders(JSON.parse(stored));
  }, []);

  const markShipped = (id) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: 'shipped' } : o);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  if (!isAdminLogged) {
    return <Navigate to="/inicioSesion" replace />;
  }

  return (
    <div className="container py-4">
      <h2>Órdenes recibidas</h2>
      {orders.length === 0 ? (
        <p>No hay órdenes todavía.</p>
      ) : (
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
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{new Date(o.date).toLocaleString()}</td>
                  <td>{o.checkout?.nombre} {o.checkout?.apellido} <br /> {o.checkout?.email}</td>
                  <td>
                    {o.items?.map(it => (
                      <div key={it.id}>{it.quantity}x {it.title}</div>
                    ))}
                  </td>
                  <td>{Number(o.total).toLocaleString()} CLP</td>
                  <td>{o.status}</td>
                  <td>
                    {o.status !== 'shipped' && (
                      <button className="btn btn-sm btn-primary" onClick={() => markShipped(o.id)}>Marcar como enviado</button>
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
