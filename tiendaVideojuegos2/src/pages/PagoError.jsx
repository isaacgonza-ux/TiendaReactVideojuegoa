/*
  Página: PagoError
  Propósito: Mostrar mensaje de error si la transacción falla.
  Comportamiento: ofrece opciones para reintentar o volver al inicio.
*/
import React from "react";
import { Link } from "react-router-dom";
import "../css/PagoResultado.css"; 

export default function PagoError() {
  return (
    <div className="resultado-container text-center">
      <div className="resultado-card error">
        <img
          src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
          alt="Error"
          className="resultado-icon"
        />
        <h2 className="resultado-titulo">Error en el pago</h2>
        <p className="resultado-texto">
          Algo salió mal durante la transacción. 😞  
          Por favor, intenta nuevamente o utiliza otro método de pago.
        </p>

        <div className="mt-4">
          <Link to="/pago" className="btn btn-volver">
            Reintentar pago
          </Link>
          <Link to="/" className="btn btn-inicio">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
