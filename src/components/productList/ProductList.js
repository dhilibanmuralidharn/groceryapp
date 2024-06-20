import { useEffect, useState } from "react";
import "./ProductList.css";

export default function ProductList({ productsList, activeCategory }) {
  const [quantities, setQuantities] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(productsList);
  useEffect(() => {
    const initialQuantities = {};
    productsList.forEach((category) => {
      category.products.forEach((product) => {
        initialQuantities[product.id] = 0;
      });
    });
    setQuantities(initialQuantities);
  }, [productsList]);

  useEffect(() => {
    if (activeCategory) {
      const filtered = productsList.filter(
        (category) => category.categoryName === activeCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(productsList);
    }
  }, [activeCategory, productsList]);

  const handleAddToCart = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: 1,
    }));
    console.log("Add to cart");
  };

  const handleIncrement = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantity = prevQuantities[productId] - 1;
      return {
        ...prevQuantities,
        [productId]: newQuantity > 0 ? newQuantity : 0,
      };
    });
  };

  return (
    <div className="bg-white mt-5">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>
        {filteredProducts.map((category) => (
          <div key={category.categoryName}>
            <h1 className="m-3 heading">{category.categoryName}</h1>
            <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
              {category.products.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
                >
                  <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[145px] w-full object-cover object-center"
                    />
                  </div>
                  <div className="pb-4 pt-10 text-center">
                    <h3 className="text-sm font-medium text-gray-900">
                      <p>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </p>
                    </h3>
                    <p className="mt-4 text-base font-medium text-gray-900">
                      {product.weight}
                    </p>
                    <p className="mt-4 text-base font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                  <div>
                    <button
                      id={`add-count-${product.id}-${index}`}
                      data-testid={`add-count-${product.id}-${index}`}
                      type="button"
                      className={
                        quantities[product.id] > 0
                          ? "not-show-add-btn"
                          : "add-btn"
                      }
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Add
                    </button>
                    {quantities[product.id] > 0 && (
                      <div className="button-container">
                        <button
                          id={`decrement-count-${product.id}-${index}`}
                          data-testid={`decrement-count-${product.id}-${index}`}
                          type="button"
                          onClick={() => handleDecrement(product.id)}
                          className="quantity-btn"
                          aria-label={`Decrease quantity of ${product.name}-${index}`}
                        >
                          -
                        </button>
                        <button
                          id={`active-count-${product.id}`}
                          data-testid={`active-count-${product.id}`}
                          className="quantity-value-button"
                          aria-live="polite"
                          aria-label={`Current quantity of ${product.name}-${index}`}
                        >
                          {quantities[product.id]}
                        </button>
                        <button
                          id={`increment-count-${product.id}-${index}`}
                          type="button"
                          onClick={() => handleIncrement(product.id)}
                          className="quantity-btn"
                          data-testid={`increment-count-${product.id}-${index}`}
                          aria-label={`Increase quantity of ${product.name}-${index}`}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
