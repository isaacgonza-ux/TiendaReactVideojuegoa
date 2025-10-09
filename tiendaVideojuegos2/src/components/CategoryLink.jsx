import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryLink({ to, children, offcanvasId = 'offcanvasCategorias', className = '' }) {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();

    const el = document.getElementById(offcanvasId);
    if (!el) {
      navigate(to);
      return;
    }

    // Get existing Bootstrap instance or create one
    const bs = window.bootstrap?.Offcanvas.getInstance(el) || (window.bootstrap ? new window.bootstrap.Offcanvas(el) : null);

    const onHidden = () => {
      el.removeEventListener('hidden.bs.offcanvas', onHidden);
      navigate(to);
    };

    // If we have an instance, hide and wait for event
    if (bs) {
      el.addEventListener('hidden.bs.offcanvas', onHidden);
      bs.hide();
    } else {
      // fallback: try to clean up backdrop and classes, then navigate
      el.classList.remove('show');
      // remove any backdrop elements left behind
      const backdrops = document.querySelectorAll('.offcanvas-backdrop, .modal-backdrop');
      backdrops.forEach(b => b.parentNode && b.parentNode.removeChild(b));
      // remove modal/open classes from body if present
      document.body.classList.remove('modal-open');
      // small delay to let DOM settle
      setTimeout(() => navigate(to), 80);
    }
  }

  return (
    <a href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
