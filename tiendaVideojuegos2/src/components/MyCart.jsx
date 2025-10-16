// ...existing code...
import { useMemo } from "react";
import { TbShoppingBagHeart } from "react-icons/tb";
import useOffcanvasStore from "../store/offcanvasStore";
import useCartStore from "../store/cartStore";
import useTotalStore from "../store/totalProductStore";
import useBalanceStore from "../store/balanceStore";

const MyCart = () => {
  const { balanceo } = useBalanceStore();
  const { cart = [] } = useCartStore();
  const { getTotalProducts } = useTotalStore();
  const { toggleOffcanvas } = useOffcanvasStore();

  const totalProducts = useMemo(() => {
    try {
      return typeof getTotalProducts === "function" ? getTotalProducts(cart) : 0;
    } catch {
      return 0;
    }
  }, [cart, getTotalProducts]);

  const buttonClass = `btn cart-badge position-relative ms-auto me-3 swing-on-hover ${
    balanceo ? "balanceo" : ""
  }`;

  return (
    <button
      type="button"
      onClick={toggleOffcanvas}
      className={buttonClass}
      aria-label={`Abrir carrito (${totalProducts} productos)`}
      title="Ver carrito"
    >
      <TbShoppingBagHeart className="shopping-bag-icon" />
      <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger">
        {totalProducts}
        <span className="visually-hidden">productos en el carrito</span>
      </span>
    </button>
  );
};

export default MyCart;
// ...existing code...