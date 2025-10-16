// filepath: c:\Users\Equipo\Documents\fullstack_react_2\src\components\SizeFilter.jsx
// ...existing code...
import { useMemo, useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import useSizeFilterStore from "../store/sizeFilterStore";

const SizeFilter = ({ products = [], totalFiltered = 0 }) => {
  const ref = useRef(null);
  const timeoutRef = useRef(null);
  const { selectedSizes = [], handleFilter } = useSizeFilterStore();

  const sizes = useMemo(() => {
    if (!products || products.length === 0) return [];
    const allSizes = products.flatMap((product) => product.availableSizes || []);
    return [...new Set(allSizes)].sort();
  }, [products]);

  const handleSizeClick = (size) => {
    ref.current?.continuousStart();

    const isSelected = selectedSizes.includes(size);
    const newSizes = isSelected ? selectedSizes.filter((s) => s !== size) : [...selectedSizes, size];

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = setTimeout(() => {
      try {
        handleFilter(newSizes);
      } finally {
        ref.current?.complete();
        timeoutRef.current = null;
      }
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      ref.current?.complete();
    };
  }, []);

  return (
    <div className="mt-5 p-3 mb-3 circle">
      <LoadingBar color="#ff9c08" ref={ref} shadow={true} />
      <h6>
        Tallas disponibles
        <span className="fw-bold float-end">({totalFiltered})</span>
      </h6>
      <div className="d-flex flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            className={`border border-dark rounded-circle text-center d-flex justify-content-center align-items-center m-1 size-button ${
              selectedSizes.includes(size) ? "select-talla" : ""
            }`}
            onClick={() => handleSizeClick(size)}
            aria-pressed={selectedSizes.includes(size)}
            aria-label={`Filtrar por talla ${size}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeFilter;
// ...existing code...