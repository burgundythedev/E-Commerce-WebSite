import React, { useEffect, useState } from "react";
import "./ProductList.scss";
import alignGrid from "../../../assets/img/align-grid.png";
import iconGrid from "../../../assets/img/icon-grid.png";
import ProductItem from "../ProductItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_ALPHABET,
  selectFilteredCategories,
} from "../../../store/slice/filterSlice";
const ProductList = ({ list, toggleFilterVisibility, isFilterVisible }) => {
  const [grid, setGrid] = useState(true);
  const [sort, setSort] = useState("category");
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredCategories);

  useEffect(() => {
    dispatch(FILTER_BY_ALPHABET({ list, sort }));
  }, [dispatch, list, sort]);

  return (
    <div className="product-list" id="product">
      <div className="product-list__top">
        <div className="product-list__icons-container">
          <img
            src={iconGrid}
            alt="icon"
            onClick={() => {
              setGrid(true);
            }}
            className="product-list__icon"
          />
          <img
            src={alignGrid}
            alt="icon"
            onClick={() => {
              setGrid(false);
            }}
            className="product-list__icon"
          />
        </div>
        <div>
          <button onClick={toggleFilterVisibility}>
            {isFilterVisible ? "Hide Filter" : "Show Filter"}
          </button>
        </div>
        <div className="product-list__sort">
          <label htmlFor="sort-select" className="product-list__label">
            Sort by
          </label>
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
            <option>Choose your option</option>
            <option value="a-z" className="product-list__option">
              A-Z
            </option>
            <option value="z-a" className="product-list__option">
              Z-A
            </option>
          </select>
        </div>
      </div>
      <div className={`product-list ${grid ? "grid" : ""}`} id="products">
        {list.length === 0 ? (
          <p>No Products found</p>
        ) : (
          <>
            {filteredProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
