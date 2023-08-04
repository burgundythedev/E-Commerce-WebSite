import React, { useEffect, useState } from "react";
import ProductFilter from "./ProductFilter/ProductFilter";
import ProductList from "./ProductList/ProductList";
import useFetchProductList from "../../customHooks/useFetchProductList";
import Loader from "../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProduct } from "../../store/slice/storeSlice";
import "./Product.scss";

const Product = () => {
  const { displayList, isLoading } = useFetchProductList("products");
  const products = useSelector(selectProduct);
  const dispatch = useDispatch();
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: displayList }));
  }, [dispatch, displayList, products]);

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="shop">
        {isFilterVisible && !isLoading && (
          <aside className="shop__filter">
            <ProductFilter />
          </aside>
        )}

        <div className="shop__content">
          <ProductList
            list={products}
            toggleFilterVisibility={toggleFilterVisibility}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Product;
