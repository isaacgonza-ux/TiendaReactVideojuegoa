import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { CartProvider, useCart } from "../src/components/CartContext";
import React from "react";

// Componente auxiliar para probar el hook desde el Provider
const TestConsumer = () => {
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

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

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

  it("agregar el mismo producto incrementa la cantidad y total", () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId("add"));
    fireEvent.click(screen.getByTestId("add-again"));

    expect(screen.getByTestId("item-p1").textContent).toContain("qty:2");
    expect(screen.getByTestId("total").textContent).toBe("24");
  });

  it("removeFromCart elimina el producto", () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId("add"));
    expect(screen.getByTestId("item-p1")).toBeTruthy();

    fireEvent.click(screen.getByTestId("remove"));
    expect(screen.queryByTestId("item-p1")).toBeNull();
    expect(screen.getByTestId("total").textContent).toBe("0");
  });

  it("updateQuantity cambia la cantidad y total", () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId("add"));
    fireEvent.click(screen.getByTestId("update"));

    expect(screen.getByTestId("item-p1").textContent).toContain("qty:3");
    expect(screen.getByTestId("total").textContent).toBe("36");
  });

  it("persiste el carrito en localStorage entre montados", () => {
    const { unmount } = render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId("add"));
    expect(JSON.parse(localStorage.getItem("cart"))).toBeTruthy();

    unmount();

    // Remontar y comprobar que se restauró
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    expect(screen.getByTestId("item-p1")).toBeTruthy();
    expect(screen.getByTestId("total").textContent).toBe("12");
  });
});