import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../src/components/CartContext";
import Home from "../src/pages/Home";

describe("Página Home", () => {
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
