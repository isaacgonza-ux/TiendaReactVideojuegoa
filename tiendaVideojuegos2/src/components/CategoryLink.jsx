/*
  Componente: CategoryLink
  Propósito: Enlace que cierra un offcanvas de Bootstrap antes de navegar internamente.
  Props:
    - to: ruta de destino
    - children: contenido del enlace
    - offcanvasId: id del offcanvas a cerrar (por defecto 'offcanvasCategorias')
    - className: clases CSS adicionales
  Comportamiento: intenta usar la instancia de Bootstrap para ocultar el offcanvas
  y espera el evento 'hidden.bs.offcanvas' antes de llamar a navigate(to). Tiene
  un fallback si la instancia de Bootstrap no está disponible.
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryLink({ to, children, offcanvasId = 'offcanvasCategorias', className = '' }) {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();

    const el = document.getElementById(offcanvasId); // Obtener el elemento del offcanvas
    if (!el) { // Si no existe, navegar directamente
      navigate(to);
      return;
    }

    // Intentar obtener la instancia de Bootstrap Offcanvas o crear una nueva
    const bs = window.bootstrap?.Offcanvas.getInstance(el) || (window.bootstrap ? new window.bootstrap.Offcanvas(el) : null);

    const onHidden = () => {
      el.removeEventListener('hidden.bs.offcanvas', onHidden);  // Limpiar el listener
      navigate(to);
    };

    // si tenemos una instancia, ocultar y esperar el evento
    if (bs) {
      el.addEventListener('hidden.bs.offcanvas', onHidden); // Añadir listener para cuando se oculte
      bs.hide();
    } else {
      //Intentar limpiar el DOM manualmente como fallback
      el.classList.remove('show');
     //eliminar cualquier backdrop que quede
      const backdrops = document.querySelectorAll('.offcanvas-backdrop, .modal-backdrop');
      backdrops.forEach(b => b.parentNode && b.parentNode.removeChild(b));
      // eliminar clases modal-open del body
      document.body.classList.remove('modal-open');
      // pequeño retraso para que el DOM se estabilice
      setTimeout(() => navigate(to), 80);
    }
  }

  return (
    <a href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
