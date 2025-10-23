import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CarruselSplide from "../src/components/CarruselSplide";
import { useCart } from "../src/components/CartContext";


// Mock de Splide para evitar dependencias visuales complejas
vi.mock("@splidejs/react-splide", () => {
  const MockSplide = ({ children }) => <div data-testid="splide">{children}</div>;
  const MockSplideSlide = ({ children }) => <div data-testid="splide-slide">{children}</div>;
  return { Splide: MockSplide, SplideSlide: MockSplideSlide };
});

describe("CarruselSplide", () => {
  it("no renderiza nada si no hay imágenes", () => {
    const { container } = render(<CarruselSplide images={[]} />);
    expect(container.firstChild).toBeNull();
  });

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
