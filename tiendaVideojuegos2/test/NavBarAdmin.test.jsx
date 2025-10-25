/**
 * Test Suite para el componente NavBarAdmin
 * Verifica la navegación y los estados activos de los enlaces en el panel de administración
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import NavBarAdmin from "../src/components/NavBarAdmin";
import { useCart } from "../src/components/CartContext";

/**
 * Mock de react-router-dom
 * Simplifica los componentes de enrutamiento para testing:
 * - Link se convierte en un simple elemento <a>
 * - useLocation nos permite simular diferentes rutas
 */
vi.mock("react-router-dom", () => ({
  Link: ({ children, to, className }) => (
    <a href={to} className={className}>{children}</a>
  ),
  useLocation: vi.fn(),
}));

import { useLocation } from "react-router-dom";

describe("NavBarAdmin", () => {
  /**
   * Antes de cada test, limpiamos todos los mocks
   * Esto asegura que cada test comience con un estado limpio
   */
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Test 1: Renderizado básico
   * Verifica que:
   * - Se renderizan los enlaces principales
   * - Los textos son correctos y visibles
   */
  it("renderiza los enlaces Productos y Usuarios", () => {
    // Simulamos estar en la ruta de productos
    useLocation.mockReturnValue({ pathname: "/admin/productos" });

    render(<NavBarAdmin />);

    // Verificamos que ambos enlaces estén presentes
    expect(screen.getByText("Productos")).toBeInTheDocument();
    expect(screen.getByText("Usuarios")).toBeInTheDocument();
  });

  /**
   * Test 2: Estado activo en Productos
   * Verifica que:
   * - El enlace de Productos tiene la clase activa cuando corresponde
   * - El enlace de Usuarios NO tiene la clase activa
   */
  it("aplica la clase activa al enlace de Productos si la ruta incluye 'productos'", () => {
    // Simulamos estar en la ruta de productos
    useLocation.mockReturnValue({ pathname: "/admin/productos" });

    render(<NavBarAdmin />);

    const productosLink = screen.getByText("Productos");
    const usuariosLink = screen.getByText("Usuarios");

    // Verificamos las clases CSS
    expect(productosLink).toHaveClass("active text-warning");
    expect(usuariosLink).not.toHaveClass("active text-warning");
  });

  /**
   * Test 3: Estado activo en Usuarios
   * Verifica que:
   * - El enlace de Usuarios tiene la clase activa cuando corresponde
   * - El enlace de Productos NO tiene la clase activa
   * Esto es lo opuesto al test anterior
   */
  it("aplica la clase activa al enlace de Usuarios si la ruta incluye 'usuarios'", () => {
    // Simulamos estar en la ruta de usuarios
    useLocation.mockReturnValue({ pathname: "/admin/usuarios" });

    render(<NavBarAdmin />);

    const productosLink = screen.getByText("Productos");
    const usuariosLink = screen.getByText("Usuarios");

    // Verificamos el estado opuesto al test anterior
    expect(usuariosLink).toHaveClass("active text-warning");
    expect(productosLink).not.toHaveClass("active text-warning");
  });

  /**
   * Test 4: Ruta no coincidente
   * Verifica que:
   * - Ningún enlace tiene la clase activa cuando la ruta no coincide
   * - El componente maneja correctamente rutas desconocidas
   */
  it("no aplica clase activa si la ruta no coincide con ningún enlace", () => {
    // Simulamos estar en una ruta que no corresponde a ningún enlace
    useLocation.mockReturnValue({ pathname: "/admin/otro" });

    render(<NavBarAdmin />);

    const productosLink = screen.getByText("Productos");
    const usuariosLink = screen.getByText("Usuarios");

    // Verificamos que ningún enlace tiene la clase activa
    expect(productosLink).not.toHaveClass("active text-warning");
    expect(usuariosLink).not.toHaveClass("active text-warning");
  });
});
