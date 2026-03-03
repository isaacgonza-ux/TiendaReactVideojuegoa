/*
  Página: PagoExitoso
  Propósito: Mostrar mensaje de éxito después de una transacción exitosa.
  Comportamiento: ofrece enlaces para volver al catálogo o al inicio.
  Entrada: ninguna; se asume que la orden ya se procesó y el carrito fue vaciado.
*/
import React from "react";
import { Link } from "react-router-dom";
import "../css/PagoResultado.css"; 

export default function PagoExitoso() {
  return (
    <div className="resultado-container text-center">
      <div className="resultado-card success">
        <img
          src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
          alt="Éxito"
          className="resultado-icon"
        />
        <h2 className="resultado-titulo">¡Pago realizado con éxito!</h2>
        <p className="resultado-texto">
          Tu compra se ha completado correctamente. 🎉  
          Recibirás un correo electrónico con los detalles de tu pedido.
        </p>

        <div className="mt-4">
          <Link to="/catalogo" className="btn btn-volver">
            Volver al catálogo
          </Link>
          <Link to="/" className="btn btn-inicio">
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
