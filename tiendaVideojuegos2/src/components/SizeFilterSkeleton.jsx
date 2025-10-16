// filepath: c:\Users\Equipo\Documents\fullstack_react_2\src\components\SizeFilterSkeleton.jsx
// ...existing code...
const SizeFilterSkeleton = () => {
  const renderSizeCircles = (count) =>
    Array.from({ length: count }).map((_, index) => (
      <div key={`size-circle-${index}`} className="skeleton size-circle" aria-hidden="true" />
    ));

  const renderCards = (count) =>
    Array.from({ length: count }).map((_, index) => (
      <div key={`card-${index}`} className="col-12 col-sm-6 col-lg-3" aria-hidden="true">
        <div className="card card-skeleton">
          <div className="skeleton image-skeleton">
            <div className="skeleton shipping-badge" />
          </div>
          <div className="card-body">
            <div className="skeleton title-skeleton-card" />
            <div className="price-row">
              <div className="skeleton price-skeleton" />
              <div className="skeleton installment-skeleton" />
            </div>
            <div className="sizes-skeleton">{renderSizeCircles(4)}</div>
            <div className="skeleton button-skeleton" />
          </div>
        </div>
      </div>
    ));

  return (
    <div className="page-container" role="status" aria-label="Cargando productos">
      <div className="size-selector">
        <div className="size-title">
          <div className="skeleton title-skeleton" />
          <div className="skeleton count-skeleton" />
        </div>
        <div className="size-grid">{renderSizeCircles(8)}</div>
      </div>

      <div className="product-grid">
        <div className="row g-4">{renderCards(4)}</div>
      </div>
    </div>
  );
};

export default SizeFilterSkeleton;
// ...existing code...