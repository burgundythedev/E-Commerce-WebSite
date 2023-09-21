import React, { useEffect, useState } from "react";
import "./ProductList.scss";
import ProductItem from "../ProductItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_ALPHABET,
  selectFilteredCategories,
} from "../../../store/slice/filterSlice";
import Pagination from "../../../components/Pagination/Pagination";
import ProductFilter from "../ProductFilter/ProductFilter";
const ProductList = ({ list }) => {
  const [sort, setSort] = useState("category");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  const filteredProducts = useSelector(selectFilteredCategories);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    dispatch(FILTER_BY_ALPHABET({ list, sort }));
  }, [dispatch, list, sort]);

  return (
    <div className="product-list" id="product">
      <div className="product-list__top">
        <ProductFilter />
        <div className="product-list__sort">
          <select
            id="sort-select"
            value={sort}
            className="product-list__select"
            onChange={(event) => {
              if (event.target.value === "Choose your option") {
                setSort("category");
              } else {
                setSort(event.target.value);
              }
            }}
          >
            <option className="product-list__option">Choose your option</option>
            <option value="a-z" className="product-list__option">
              A-Z
            </option>
            <option value="z-a" className="product-list__option">
              Z-A
            </option>
          </select>
        </div>
      </div>
      <div id="products">
        {list.length === 0 ? (
          <p>No Products found</p>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                <div className="product-list__item" key={product.id}>
                  <ProductItem {...product} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  );
};

export default ProductList;
