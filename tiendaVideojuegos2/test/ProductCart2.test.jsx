import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import ProductCard2 from "../src/components/ProductCard2"; 
import { useCart } from "../src/components/CartContext";    

// Mock del contexto
vi.mock("../src/components/CartContext", () => ({
  useCart: vi.fn(),
}));

describe("ProductCard2", () => {
  const addToCartMock = vi.fn();

  beforeEach(() => {
    useCart.mockReturnValue({
      addToCart: addToCartMock,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza correctamente la información del producto", () => {
    render(
      <ProductCard2
        img="producto.jpg"
        titulo="Camiseta Tech"
        precio="$15.000"
        detalles="Camiseta deportiva de alta calidad"
        id={1}
      />
    );

    expect(screen.getByText("Camiseta Tech")).toBeInTheDocument();
    expect(screen.getByText("Camiseta deportiva de alta calidad")).toBeInTheDocument();
    expect(screen.getByText("$15.000")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /comprar/i })).toBeInTheDocument();
  });

  it("llama a addToCart con los datos correctos al hacer clic", () => {
    render(
      <ProductCard2
        img="producto.jpg"
        titulo="Camiseta Tech"
        precio="$15.000"
        detalles="Camiseta deportiva de alta calidad"
        id={1}
      />
    );

    const boton = screen.getByRole("button", { name: /comprar/i });
    fireEvent.click(boton);

    expect(addToCartMock).toHaveBeenCalledWith({
      id: 1,
      title: "Camiseta Tech",
      image: "producto.jpg",
      price: 15000,
      detalles: "Camiseta deportiva de alta calidad",
    });
  });
});


