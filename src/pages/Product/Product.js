import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: displayList }));
  }, [dispatch, displayList, products]);

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="shop">
        <div className="shop__background">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="shop__content">
          <ProductList list={products} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Product;
