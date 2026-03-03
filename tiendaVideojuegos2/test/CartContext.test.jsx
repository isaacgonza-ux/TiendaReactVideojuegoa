// Importamos las utilidades necesarias para testing
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { CartProvider, useCart } from "../src/components/CartContext";
import React from "react";

/**
 * Componente auxiliar (TestConsumer) que nos permite probar el hook useCart
 * Este componente simula una interfaz de carrito con botones para:
 * - Añadir productos
 * - Eliminar productos
 * - Actualizar cantidades
 * - Mostrar el total
 */
const TestConsumer = () => {
  // Extraemos todas las funciones y estado del contexto del carrito
  const { cartItems, addToCart, removeFromCart, updateQuantity, total } = useCart();

  const sample = { id: "p1", title: "Producto 1", price: 12 };

  return (
    <div>
      <button onClick={() => addToCart(sample)} data-testid="add">
        add
      </button>
      <button onClick={() => addToCart(sample)} data-testid="add-again">
        add-again
      </button>
      <button onClick={() => removeFromCart("p1")} data-testid="remove">
        remove
      </button>
      <button onClick={() => updateQuantity("p1", 3)} data-testid="update">
        update
      </button>

      <div data-testid="total">{total}</div>

      <ul>
        {cartItems.map((it) => (
          <li key={it.id} data-testid={`item-${it.id}`}>
            {it.title} - qty:{it.quantity} - price:{it.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * Suite de pruebas para el CartContext
 * Verifica todas las operaciones principales del carrito:
 * - Añadir productos
 * - Actualizar cantidades
 * - Eliminar productos
 * - Calcular totales
 * - Persistencia en localStorage
 */
describe("CartContext", () => {
  // Antes de cada prueba, limpiamos localStorage para empezar desde cero
  beforeEach(() => {
    localStorage.clear();
  });

  // Después de cada prueba, limpiamos el DOM virtual
  afterEach(() => {
    cleanup();
  });

  /**
   * Test 1: Verifica que se puede añadir un producto al carrito
   * y que el total se actualiza correctamente
   */
  it("addToCart agrega un producto y total se actualiza", () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId("add"));

    expect(screen.getByTestId("item-p1")).toBeTruthy();
    expect(screen.getByTestId("item-p1").textContent).toContain("qty:1");
    expect(screen.getByTestId("total").textContent).toBe("12");
  });

  /**
   * Test 2: Verifica que al añadir el mismo producto:
   * - Se incrementa la cantidad en lugar de crear duplicado
   * - El total se actualiza considerando la nueva cantidad
   */
  it("agregar el mismo producto incrementa la cantidad y total", () => {
    // Renderizamos el componente de prueba
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    // Agregamos el mismo producto dos veces
    fireEvent.click(screen.getByTestId("add"));
    fireEvent.click(screen.getByTestId("add-again"));

    // Verificamos que la cantidad sea 2 y el total sea 24 (12 * 2)
    expect(screen.getByTestId("item-p1").textContent).toContain("qty:2");
    expect(screen.getByTestId("total").textContent).toBe("24");
  });

  /**
   * Test 3: Verifica la funcionalidad de eliminar productos
   * Comprueba que:
   * - El producto se elimina completamente del carrito
   * - El total se actualiza a 0 después de eliminar
   */
  it("removeFromCart elimina el producto", () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    // Primero añadimos un producto y verificamos que existe
    fireEvent.click(screen.getByTestId("add"));
    expect(screen.getByTestId("item-p1")).toBeTruthy();

    // Eliminamos el producto y verificamos que:
    // 1. Ya no existe en el DOM
    // 2. El total se ha resetado a 0
    fireEvent.click(screen.getByTestId("remove"));
    expect(screen.queryByTestId("item-p1")).toBeNull();
    expect(screen.getByTestId("total").textContent).toBe("0");
  });

  /**
   * Test 4: Verifica la actualización directa de cantidad
   * Comprueba que:
   * - Se puede actualizar la cantidad de un producto existente
   * - El total se recalcula correctamente con la nueva cantidad
   */
  it("updateQuantity cambia la cantidad y total", () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    // Añadimos un producto y luego actualizamos su cantidad a 3
    fireEvent.click(screen.getByTestId("add"));
    fireEvent.click(screen.getByTestId("update")); // Actualiza a cantidad 3

    // Verificamos que:
    // 1. La cantidad se actualizó a 3
    // 2. El total es 36 (12 * 3)
    expect(screen.getByTestId("item-p1").textContent).toContain("qty:3");
    expect(screen.getByTestId("total").textContent).toBe("36");
  });

  /**
   * Test 5: Verifica la persistencia del carrito en localStorage
   * Este test es crucial porque asegura que:
   * - El carrito se guarda en localStorage cuando se modifican productos
   * - Al recargar la página (simulado con unmount/render), los datos se recuperan
   * - Los totales se mantienen correctos después de recuperar el carrito
   */
  it("persiste el carrito en localStorage entre montados", () => {
    // Primer render del componente
    const { unmount } = render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    // Añadimos un producto y verificamos que se guardó en localStorage
    fireEvent.click(screen.getByTestId("add"));
    expect(JSON.parse(localStorage.getItem("cart"))).toBeTruthy();

    // Desmontamos el componente (simula cerrar/recargar la página)
    unmount();

    // Volvemos a montar el componente (simula recargar la página)
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    // Verificamos que:
    // 1. El producto sigue en el carrito
    // 2. El total se mantiene correcto
    expect(screen.getByTestId("item-p1")).toBeTruthy();
    expect(screen.getByTestId("total").textContent).toBe("12");
  });
});