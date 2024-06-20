import React, { useEffect, useState } from "react";
import ProductList from "../productList/ProductList";
import CategoryFilter from "../categoryFilters/CategoryFilter";
import Cookies from "js-cookie";
import CarouselView from "../carouselView/CarouselView";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const Product = () => {
  const [productsList, setProductList] = useState([]);
  const [apiStatus, setApisStatus] = useState(apiStatusConstants.initial);
  const [activeCategory, setActiveCategory] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setApisStatus(apiStatusConstants.inProgress);
        const token = Cookies.get("jwt_token");
        if (!token) {
          throw new Error("jwtToken was missing");
        }

        const apiUrl =
          "https://run.mocky.io/v3/8177da5e-b2fd-4474-9bb7-457f4099ae4e";
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        };
        const response = await fetch(apiUrl, options);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          const fetchedData = data.categories.map((category) => ({
            categoryName: category.name,
            products: category.products.map((product) => ({
              id: product.id,
              name: product.name,
              weight: product.weight,
              price: product.price,
              image: product.image,
            })),
          }));
          setProductList(fetchedData);
          setApisStatus(apiStatusConstants.success);
        }
      } catch (error) {
        console.log(error);
        setApisStatus(apiStatusConstants.failure);
      }
    };
    getProducts();
  }, []);

  const renderSuccessView = () => (
    <>
      <ProductList
        productsList={productsList}
        activeCategory={activeCategory}
      />
    </>
  );

  const handleToChangeCategory = (id) => {
    setActiveCategory(id);
    setIsActive(true);
  };

  const renderLoadingView = () => (
    <div class="flex flex-row gap-2">
      <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
      <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
    </div>
  );

  const renderFailureView = () => (
    <div>
      <img src="./assets/failure-view.png" alt="failure view" />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button type="button" onClick={this.handleGetProduct}>
        Retry
      </button>
    </div>
  );

  const renderProductList = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div>
      <CarouselView />
      <CategoryFilter
        productsList={productsList}
        handleToChangeCategory={handleToChangeCategory}
        isActive={isActive}
      />
      {renderProductList()}
    </div>
  );
};

export default Product;
