import React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import NavBarAdmin from "../src/components/NavBarAdmin";
import { useCart } from "../src/components/CartContext";


// Mock de react-router-dom
vi.mock("react-router-dom", () => ({
  Link: ({ children, to, className }) => (
    <a href={to} className={className}>{children}</a>
  ),
  useLocation: vi.fn(),
}));

import { useLocation } from "react-router-dom";

describe("NavBarAdmin", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza los enlaces Productos y Usuarios", () => {
    useLocation.mockReturnValue({ pathname: "/admin/productos" });

    render(<NavBarAdmin />);

    expect(screen.getByText("Productos")).toBeInTheDocument();
    expect(screen.getByText("Usuarios")).toBeInTheDocument();
  });

  it("aplica la clase activa al enlace de Productos si la ruta incluye 'productos'", () => {
    useLocation.mockReturnValue({ pathname: "/admin/productos" });

    render(<NavBarAdmin />);

    const productosLink = screen.getByText("Productos");
    const usuariosLink = screen.getByText("Usuarios");

    expect(productosLink).toHaveClass("active text-warning");
    expect(usuariosLink).not.toHaveClass("active text-warning");
  });

  it("aplica la clase activa al enlace de Usuarios si la ruta incluye 'usuarios'", () => {
    useLocation.mockReturnValue({ pathname: "/admin/usuarios" });

    render(<NavBarAdmin />);

    const productosLink = screen.getByText("Productos");
    const usuariosLink = screen.getByText("Usuarios");

    expect(usuariosLink).toHaveClass("active text-warning");
    expect(productosLink).not.toHaveClass("active text-warning");
  });

  it("no aplica clase activa si la ruta no coincide con ningún enlace", () => {
    useLocation.mockReturnValue({ pathname: "/admin/otro" });

    render(<NavBarAdmin />);

    const productosLink = screen.getByText("Productos");
    const usuariosLink = screen.getByText("Usuarios");

    expect(productosLink).not.toHaveClass("active text-warning");
    expect(usuariosLink).not.toHaveClass("active text-warning");
  });
});
