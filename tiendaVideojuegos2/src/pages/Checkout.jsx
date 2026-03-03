/*
  Página: Checkout
  Propósito: Colecciona los datos del cliente antes del pago (direccion, contacto, etc.).
  Comportamiento: valida campos básicos; guarda `checkoutData` en localStorage y navega a /pago.
  Notas: usa `useNavigate` para redirigir y maneja validación simple en el cliente.
*/
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/InicioSesion.css';

export default function Checkout() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    ciudad: '',
    region: '',
    postal: '',
    telefono: '',
  });

  const [errors, setErrors] = useState({});  // Estado para errores de validación

  const validate = () => {  // Función de validación simple
    const e = {};  // Objeto para errores
    if (!form.nombre.trim()) e.nombre = 'Nombre es requerido'; 
    if (!form.apellido.trim()) e.apellido = 'Apellido es requerido';
    if (!form.email.trim()) e.email = 'Email es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'; //Validación básica de email regex
    if (!form.direccion.trim()) e.direccion = 'Dirección requerida';
    if (!form.ciudad.trim()) e.ciudad = 'Ciudad requerida';
    if (!form.telefono.trim()) e.telefono = 'Teléfono requerido';
    else if (!/^\d{7,}$/.test(form.telefono.replace(/\s+/g, ''))) e.telefono = 'Teléfono inválido (mínimo 7 dígitos)';
    if (form.postal && !/^\d{4,10}$/.test(form.postal)) e.postal = 'Código postal inválido';
    setErrors(e);
    return Object.keys(e).length === 0; // Devuelve true si no hay errores
  };

  const handleChange = (e) => { // Maneja cambios en los inputs
    const { id, value } = e.target; // Desestructura id y value del input
    setForm((prev) => ({ ...prev, [id]: value })); // Actualiza el estado del formulario
  };

  const handleSubmit = (ev) => {  // Maneja el envío del formulario
    ev.preventDefault(); // Previene el envío por defecto
    if (!validate()) return; // Si no pasa la validación, no continúa
    // guardar datos de checkout y navegar a pago
    try {
      localStorage.setItem('checkoutData', JSON.stringify(form));  // Guarda los datos en localStorage
    } catch (err) { // Maneja error al guardar
      console.warn('No se pudo guardar checkoutData', err);
    }
    navigate('/pago');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4">
            <h3 className="mb-3">Datos de cliente</h3>
            <form onSubmit={handleSubmit} noValidate>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre</label>
                  <input id="nombre" value={form.nombre} onChange={handleChange} className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} />
                  {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Apellido</label>
                  <input id="apellido" value={form.apellido} onChange={handleChange} className={`form-control ${errors.apellido ? 'is-invalid' : ''}`} />
                  {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input id="email" type="email" value={form.email} onChange={handleChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input id="direccion" value={form.direccion} onChange={handleChange} className={`form-control ${errors.direccion ? 'is-invalid' : ''}`} />
                {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Ciudad</label>
                  <input id="ciudad" value={form.ciudad} onChange={handleChange} className={`form-control ${errors.ciudad ? 'is-invalid' : ''}`} />
                  {errors.ciudad && <div className="invalid-feedback">{errors.ciudad}</div>}
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Región</label>
                  <input id="region" value={form.region} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Código postal</label>
                  <input id="postal" value={form.postal} onChange={handleChange} className={`form-control ${errors.postal ? 'is-invalid' : ''}`} />
                  {errors.postal && <div className="invalid-feedback">{errors.postal}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input id="telefono" value={form.telefono} onChange={handleChange} className={`form-control ${errors.telefono ? 'is-invalid' : ''}`} />
                {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
              </div>

              <div className="d-flex justify-content-between">
                <Link to="/catalogo" className="btn btn-link">Volver al catálogo</Link>
                <div>
                  <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Volver</button>
                  <button type="submit" className="btn btn-warning">Continuar a pagar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
