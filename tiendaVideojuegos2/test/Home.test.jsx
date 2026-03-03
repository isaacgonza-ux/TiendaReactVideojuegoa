/**
 * Test Suite para la página Home
 * Verifica los componentes principales y secciones de la página de inicio
 */

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../src/components/CartContext";
import Home from "../src/pages/Home";

describe("Página Home", () => {
  /**
   * Test 1: Sección de Estrenos
   * Verifica que:
   * - El título de la sección está presente
   * - Es visible para el usuario
   */
  test("debería renderizar el título 'Estrenos'", () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </CartProvider>
    );
    expect(screen.getByText(/Estrenos/i)).toBeInTheDocument();
  });

  /**
   * Test 2: Componente Carrusel
   * Verifica que:
   * - El carrusel está presente en la página
   * - Tiene el data-testid correcto para identificación
   */
  test("debería renderizar el carrusel", () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </CartProvider>
    );
    const carrusel = screen.getByTestId("carrusel");
    expect(carrusel).toBeInTheDocument();
  });

  /**
   * Test 3: Sección de Noticias
   * Verifica que:
   * - La sección de noticias está presente
   * - Se puede identificar por su data-testid
   */
  test("debería renderizar la sección de noticias", () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </CartProvider>
    );
    const noticias = screen.getByTestId("news-section");
    expect(noticias).toBeInTheDocument();
  });
});
