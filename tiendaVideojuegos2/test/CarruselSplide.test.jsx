/**
 * Test Suite para el componente CarruselSplide
 * Este archivo prueba el comportamiento del carrusel de imágenes
 * usando la biblioteca @splidejs/react-splide
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CarruselSplide from "../src/components/CarruselSplide";
import { useCart } from "../src/components/CartContext";

/**
 * Mock de la biblioteca Splide
 * Reemplazamos los componentes visuales complejos con versiones simplificadas
 * que son más fáciles de probar y no dependen de la DOM API completa
 */
vi.mock("@splidejs/react-splide", () => {
  const MockSplide = ({ children }) => <div data-testid="splide">{children}</div>;
  const MockSplideSlide = ({ children }) => <div data-testid="splide-slide">{children}</div>;
  return { Splide: MockSplide, SplideSlide: MockSplideSlide };
});

/**
 * Suite de pruebas principal para CarruselSplide
 */
describe("CarruselSplide", () => {
  /**
   * Test 1: Comportamiento con array vacío
   * Verifica que el componente maneja correctamente el caso de no tener imágenes
   * - No debería renderizar nada en el DOM
   */
  it("no renderiza nada si no hay imágenes", () => {
    const { container } = render(<CarruselSplide images={[]} />);
    expect(container.firstChild).toBeNull();
  });

  /**
   * Test 2: Renderizado con imágenes
   * Verifica que el carrusel:
   * - Renderiza todas las imágenes proporcionadas
   * - Mantiene el orden correcto
   * - Aplica los atributos necesarios (src, alt)
   */
  it("renderiza correctamente la sección y las imágenes", () => {
    const images = ["img1.jpg", "img2.jpg", "img3.jpg"];
    render(<CarruselSplide images={images} />);

    // Verifica que el contenedor principal esté en el documento
    expect(screen.getByLabelText("Beautiful Images")).toBeInTheDocument();

    // Verifica que se rendericen todas las imágenes
    images.forEach((src, index) => {
      const img = screen.getByAltText(`slide-${index}`);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", src);
    });

    // Verifica que Splide y SplideSlide mockeados existen
    expect(screen.getByTestId("splide")).toBeInTheDocument();
    expect(screen.getAllByTestId("splide-slide")).toHaveLength(images.length);
  });
});
