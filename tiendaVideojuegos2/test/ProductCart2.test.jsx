/**
 * Test Suite para el componente ProductCard2
 * Verifica la funcionalidad de las tarjetas de producto incluyendo:
 * - Renderizado correcto de la información
 * - Interacción con el carrito de compras
 * - Manejo de eventos de click
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import ProductCard2 from "../src/components/ProductCard2"; 
import { useCart } from "../src/components/CartContext";    

/**
 * Mock del CartContext
 * Simulamos el hook useCart para probar las interacciones
 * con el carrito de forma aislada
 */
vi.mock("../src/components/CartContext", () => ({
  useCart: vi.fn(),
}));

describe("ProductCard2", () => {
  // Mock de la función addToCart
  const addToCartMock = vi.fn();

  /**
   * Configuración antes de cada test
   * - Preparamos el mock de useCart
   * - Simulamos la función addToCart
   */
  beforeEach(() => {
    useCart.mockReturnValue({
      addToCart: addToCartMock,
    });
  });

  /**
   * Limpieza después de cada test
   * - Reseteamos todos los mocks
   * - Aseguramos que cada test comience limpio
   */
  afterEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Test 1: Renderizado básico
   * Verifica que:
   * - Se muestra toda la información del producto
   * - Los elementos están correctamente colocados
   */
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

  /**
   * Test 2: Interacción con el carrito
   * Verifica que:
   * - El botón Comprar funciona correctamente
   * - Se llama a addToCart con los datos correctos
   * - El precio se formatea adecuadamente al añadir al carrito
   */
  it("llama a addToCart con los datos correctos al hacer clic", () => {
    // Renderizamos el componente con datos de prueba
    render(
      <ProductCard2
        img="producto.jpg"
        titulo="Camiseta Tech"
        precio="$15.000"
        detalles="Camiseta deportiva de alta calidad"
        id={1}
      />
    );

    // Simulamos el clic en el botón de comprar
    const boton = screen.getByRole("button", { name: /comprar/i });
    fireEvent.click(boton);

    // Verificamos que addToCart se llamó con los datos correctos
    // Nota: el precio "$15.000" se convierte a número 15000
    expect(addToCartMock).toHaveBeenCalledWith({
      id: 1,
      title: "Camiseta Tech",
      image: "producto.jpg",
      price: 15000,
      detalles: "Camiseta deportiva de alta calidad",
    });
  });
});


