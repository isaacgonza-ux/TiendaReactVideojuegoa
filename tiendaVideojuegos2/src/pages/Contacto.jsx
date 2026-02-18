/*
  Página: Contacto
  Propósito: Formulario de contacto con validación en el cliente.
  Estado: usa useState para manejar `formData`, `errors`, `touched` y `successMsg`.
  Validaciones: nombre, email, teléfono, asunto, mensaje y consentimiento.
  Comportamiento: al enviar valida campos; si todo está bien simula envío y muestra mensaje de éxito.
*/
import "../css/Contacto.css";

import React, { useState } from "react";

export default function Contacto() {
  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  // Expresiones regulares
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;  // Letras y espacios, 2-50 caracteres
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // Formato básico de email
  const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;  // Números, espacios, guiones, 7-15 caracteres

  // Manejo de cambio en inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;  // Desestructura name, value, type y checked
    setFormData({ // Actualiza el estado del formulario
      ...formData,  // Mantiene los demás campos
      [name]: type === "checkbox" ? checked : value,  // Actualiza según tipo de input
    });  
  };

  // Manejo de "blur" para marcar campos como tocados
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ 
      ...touched, // Mantiene los demás campos
      [name]: true, // Marca el campo actual como tocado
    });
    validateField(name);  // Valida el campo actual
  };

  // Validar un solo campo
  const validateField = (field) => {
    let message = "";  // Mensaje de error inicial vacío

    switch (field) {
      case "name":
        if (!formData.name) message = "El nombre es obligatorio";  
        else if (!nameRegex.test(formData.name)) // Validación solo letras y espacios
          message = "El nombre debe tener 2-50 caracteres y solo letras y espacios";
        break;
      case "email":
        if (!formData.email) message = "El correo es obligatorio";  // Validación de campo vacío
        else if (!emailRegex.test(formData.email)) message = "Introduce un correo válido";
        break;
      case "phone":
        if (formData.phone && !phoneRegex.test(formData.phone)) message = "Número inválido";  
        break;
      case "subject":
        if (!formData.subject) message = "Selecciona un asunto";
        break;
      case "message":
        if (!formData.message) message = "El mensaje es obligatorio";
        else if (formData.message.length < 20)
          message = "Debe tener al menos 20 caracteres";
        break;
      case "consent":  //validación checkbox
        if (!formData.consent) message = "Debes aceptar antes de continuar";
        break;
      default:
        break;
    }

    setErrors((prev) => ({  // Actualiza el estado de errores
      ...prev, // Mantiene los demás campos
      [field]: message,  // Actualiza el mensaje del campo actual
    }));
  };

  // Validar todo el formulario
  const validate = () => {
    ["name", "email", "phone", "subject", "message", "consent"].forEach(validateField);  
    return Object.values(errors).every((e) => e === "");
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
      consent: true,
    });

    validate();

    if (Object.values(errors).every((e) => e === "")) {  // Si no hay errores
      setSuccessMsg("Enviando mensaje...");
      setTimeout(() => { // Simula tiempo de envío
        setSuccessMsg("¡Mensaje enviado! Te responderemos en menos de 24h.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          consent: false,
        });
        setErrors({}); // Limpia errores
        setTouched({}); // Limpia campos tocados
      }, 1000);  // Simula retardo de 1 segundo
    }
  };

  // Limpiar formulario
  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      consent: false,
    });
    setErrors({});
    setTouched({});
    setSuccessMsg("");
  };

  return (
    <div className="contacto-page">
      <main className="card" aria-live="polite">
        <h1>CONTACTO</h1>
        <p className="lead">
          ¿Tienes dudas, sugerencias o problemas con tu compra? Escríbenos
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Nombre */}
          <div className="field-wrap">
            <label htmlFor="name">Nombre completo *</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Humberto Suazo"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name && <small className="help show">{errors.name}</small>}
          </div>

          {/* Email */}
          <div className="field-wrap">
            <label htmlFor="email">Correo Electrónico *</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="humbertosu@gmail.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && <small className="help show">{errors.email}</small>}
          </div>

          {/* Teléfono */}
          <div className="field-wrap">
            <label htmlFor="phone">Teléfono (opcional)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+56912345678"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.phone && errors.phone && <small className="help show">{errors.phone}</small>}
          </div>

          {/* Asunto */}
          <div className="field-wrap">
            <label htmlFor="subject">Asunto *</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">--Selecciona--</option>
              <option value="pedido">Pedido / Entrega</option>
              <option value="devolución">Devolución</option>
              <option value="soporte">Soporte</option>
              <option value="otros">Otros</option>
            </select>
            {touched.subject && errors.subject && <small className="help show">{errors.subject}</small>}
          </div>

          {/* Mensaje */}
          <div className="field-wrap full">
            <label htmlFor="message">Mensaje *</label>
            <textarea
              id="message"
              name="message"
              placeholder="Escribe tu consulta..."
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
            {touched.message && errors.message && <small className="help show">{errors.message}</small>}
          </div>

          {/* Consentimiento */}
          <div className="field-wrap full" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={formData.consent}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="consent" className="small" style={{ margin: 0 }}>
              Acepto ser contactado y he leído la política de privacidad *
            </label>
            {touched.consent && errors.consent && <small className="help show">{errors.consent}</small>}
          </div>

          {/* Mensaje de éxito */}
          {successMsg && <div className="success-msg show">{successMsg}</div>}

          {/* Botones */}
          <div className="actions">
            <button type="button" className="btn-secondary" onClick={handleClear}>
              Limpiar
            </button>
            <button type="submit" className="Btn">
              Enviar mensaje
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}


