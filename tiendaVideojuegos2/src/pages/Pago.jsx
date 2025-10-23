import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Pago.css";
import { useCart } from "../components/CartContext";

export default function Pago() {
  const [metodoSeleccionado, setMetodoSeleccionado] = useState("");
  const navigate = useNavigate();
  const { cartItems, total } = useCart();
  const [producto] = useState({
    nombre: "God of War (PC) Steam Key LATAM",
    tipo: "Producto digital",
    precio: 20726,
    cashback: 2276,
    imagen: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg",
  });

  const metodosPago = [
    {
      id: "match",
      nombre: "MATCH",
      descripcion: "Paga con el dinero de tu cartera INFINITYPLAY",
      imagen:
        "https://cdn6.aptoide.com/imgs/1/5/9/159d3eedda7d5d811c27651d6c9ffcf0_fgraphic.jpg",
    },
    {
      id: "webpay",
      nombre: "WebPay",
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONmnpmoibv87UbzOpKQBeta2hrkLKsg5NGA&s",
    },
    {
      id: "paypal",
      nombre: "PayPal",
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR01IiJEzLYwzuQethJraGGG-3-vbKQ8AbQTQ&s",
    },
    {
      id: "googlepay",
      nombre: "Google Pay",
      imagen:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png",
    },
    {
      id: "tarjeta",
      nombre: "Tarjetas de crédito o débito",
      descripcion: "Pay via Visa, Mastercard debit or credit card",
      imagen: "https://1000marcas.net/wp-content/uploads/2019/12/VISA-Logo.png",
    },
    {
      id: "applepay",
      nombre: "Apple Pay",
      imagen: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
  ];

  const handleContinuar = () => {
    if (!metodoSeleccionado) {
      alert("Por favor selecciona un método de pago");
      return;
    }

    alert(`Método seleccionado: ${metodoSeleccionado}`);

    // Simulación de procesamiento de pago
    alert("💳 Procesando tu pago...");
    setTimeout(() => {
      const pagoExitoso = Math.random() > 0.3; // 70% éxito simulado

      if (pagoExitoso) {
        navigate("/pagoExito");
      } else {
        navigate("/pagoError");
      }
    }, 2000);
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Métodos de pago */}
        <div className="col-md-6">
          <h4 className="mb-4 text-primary">Selecciona tu método de pago</h4>

          {metodosPago.map((metodo) => (
            <div
              key={metodo.id}
              className={`payment-option ${
                metodoSeleccionado === metodo.id ? "selected" : ""
              }`}
              onClick={() => setMetodoSeleccionado(metodo.id)}
            >
              <img src={metodo.imagen} alt={metodo.nombre} width="80" />
              <div className="flex-grow-1 ms-3">
                <strong>{metodo.nombre}</strong>
                {metodo.descripcion && (
                  <div>
                    <small>{metodo.descripcion}</small>
                  </div>
                )}
              </div>
              <input
                type="radio"
                name="payment"
                checked={metodoSeleccionado === metodo.id}
                readOnly
              />
            </div>
          ))}
        </div>

        {/* Resumen de compra */}
        <div className="col-md-6">
          <div className="summary-card">
            <h5 className="mb-3">Resumen de compra</h5>
              {cartItems.length === 0 ? (
                <>
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      width="80"
                      className="me-3 rounded"
                    />
                    <div>
                      <strong>{producto.nombre}</strong>
                      <br />
                      <small>{producto.tipo}</small>
                      <br />
                      <span>{producto.precio.toLocaleString()} CLP</span>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>{producto.precio.toLocaleString()} CLP</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Tarifa de servicio</span>
                    <span>--</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong>{producto.precio.toLocaleString()} CLP</strong>
                  </div>
                  <p className="cashback mt-2">
                    de Cashback: {producto.cashback.toLocaleString()} CLP
                  </p>
                </>
              ) : (
                <>
                  <div>
                    {cartItems.map((it) => (
                      <div key={it.id} className="d-flex align-items-center mb-2">
                        <img src={it.image} alt={it.title} width="60" className="me-3 rounded" />
                        <div className="flex-grow-1">
                          <strong>{it.title}</strong>
                          <div>{it.quantity} x {Number(it.price).toLocaleString()} CLP</div>
                        </div>
                        <div className="text-end">
                          <strong>{(Number(it.price) * (it.quantity || 0)).toLocaleString()} CLP</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>{Number(total).toLocaleString()} CLP</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Tarifa de servicio</span>
                    <span>--</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong>{Number(total).toLocaleString()} CLP</strong>
                  </div>
                </>
              )}
            <button className="btn btn-continue mt-3" onClick={handleContinuar}>
              Continuar
            </button>
            <p className="small mt-3">
              Al hacer clic en "Continuar", aceptas los Términos y Condiciones, la
              Política de Privacidad y los Cookies.<br />
              También aceptas la Política de reembolso y T/C de INFINITYPLAY.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-5">
        <div className="payment-icons mb-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf0H2GDv1mx-8kIJ51OEwAfyri7_i7hUaUXw&s"
            alt="PayPal"
          />
          <img
            src="https://lamanzanamordida.net/app/uploads-lamanzanamordida.net/2021/05/Apple-Pay.jpg"
            alt="Apple Pay"
          />
          <img
            src="https://logos-world.net/wp-content/uploads/2020/12/Google-Play-Logo.png"
            alt="Google Pay"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/800px-MasterCard_Logo.svg.png"
            alt="Mastercard"
          />
        </div>
        <div className="footer-links">
          <p>¡Comprar en INFINITYPLAY es fácil y seguro!</p>
          <p>
            Si surgiera algún inconveniente, nuestro equipo de soporte te ayudará con gusto.{" "}
            <a href="#">Crea un ticket</a> y nos pondremos en contacto contigo lo antes posible.
          </p>
          <p>Copyright © 2025 INFINITYPLAY. Todos los derechos reservados.</p>
          <a href="#">Términos y Condiciones</a> |{" "}
          <a href="#">Aviso de Privacidad</a> |{" "}
          <a href="#">Preferencias de cookies</a>
        </div>
      </footer>
    </div>
  );
};

