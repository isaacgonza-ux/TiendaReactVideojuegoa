
# Tienda de Videojuegos (React + Vite)

Este repositorio contiene una aplicación de ejemplo hecha con React y Vite. Está pensada como una tienda pequeña de videojuegos con carrito, proceso de checkout (simulado) y una vista de administración básica para ver órdenes guardadas en el navegador.

Este README está en español e incluye los pasos básicos para ejecutar el proyecto localmente, probarlo y notas importantes sobre la persistencia (localStorage).

## Estructura importante

- `src/` - código fuente React.
	- `components/` - componentes reutilizables (incluye `CartContext.jsx` y `CartDrawer.jsx`).
	- `pages/` - páginas públicas (Home, Catalogo, Checkout, Pago, etc.).
	- `pagesDetailsProduct/` - páginas de detalle por producto.
	- `css/` - estilos específicos.
- `public/` - recursos estáticos.
- `test/` - pruebas unitarias / de integración con Vitest + Testing Library.

## Requisitos

- Node.js 16+ (recomendado) y npm o yarn.
- Windows PowerShell o CMD están soportados; los comandos en este README usan PowerShell como ejemplo.

## Instalación (PowerShell)

```powershell
cd tiendaVideojuegos2
npm install
```

## Ejecutar en modo desarrollo

```powershell
cd tiendaVideojuegos2
npm run dev
```

El servidor de desarrollo (Vite) arrancará y te dará la URL local (por defecto `http://localhost:5173`).

## Construir para producción

```powershell
cd tiendaVideojuegos2
npm run build
```

La versión lista para producción se genera en la carpeta `dist`.

## Ejecutar tests

```powershell
cd tiendaVideojuegos2
npm test
```

Las pruebas usan Vitest y Testing Library. Revisa `test/` para ver los casos existentes.

## Funcionalidades clave y notas de implementación

- Carrito global: `src/components/CartContext.jsx` expone funciones como `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart` y el `total`.
- Persistencia: el carrito y los datos de checkout/órdenes se guardan en `localStorage` para que la sesión del usuario persista entre recargas. Las claves usadas son:
	- `cart` — guarda los items actuales del carrito.
	- `checkoutData` — datos ingresados en el formulario de checkout (nombre, dirección, etc.).
	- `orders` — arreglo de órdenes finalizadas (simuladas) que puede leer la vista de administración.

- Flujo de pago: el flujo es simulado. La página de `Pago` muestra el total y, al confirmar, crea una orden en `localStorage` y limpia el carrito.

## Notas de desarrollo y recomendaciones

- Si vas a personalizar rutas de producto o integrar un backend, revisa `ProductCard.jsx` y `ProductCard2.jsx` para normalizar los enlaces de "Detalles".
- Para producción con un backend real, reemplaza la persistencia en `localStorage` por llamadas a tu API y agrega autenticación.

## Cómo contribuir

- Crea una rama por feature: `git checkout -b rama-mi-feature`.
- Haz PR hacia `main` (o la rama de integración que uses).

## Contacto

Si tienes dudas o quieres que adapte este README (por ejemplo, añadir instrucciones para Docker o CI), dime qué deseas y lo actualizo.

---
Documento generado y adaptado en español por el equipo de desarrollo.
