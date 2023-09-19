import React from "react";
import { Link } from "react-router-dom";
import "./ProductItem.scss";
import { useDispatch } from "react-redux";
import {
  ADD_TO_CART,
  SUBTOTAL_ITEM_CALCULATOR,
} from "../../../store/slice/cartSlice";

const ProductItem = ({
  id,
  grid,
  name,
  price,
  imageUrl,
  description,
  brand,
  category,
  product,
}) => {
  const dispatch = useDispatch();
  const shortText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const addProducts = () => {
    dispatch(
      ADD_TO_CART({
        id,
        name,
        price,
        imageUrl,
        description,
        brand,
        category,
      })
    );
    dispatch(SUBTOTAL_ITEM_CALCULATOR(product));
  };

  return (
    <div className="item">
      <Link to={`/product-details/${id}`}>
        <div className="item__container-img">
          <img className="item__img" src={imageUrl} alt={name} />
        </div>
      </Link>
      <div className="item__content">
        <div className="item__details">
          <div className="item__titlePrice">
            <h4 className="item__name item__name--title">{name}</h4>
            <p className="item__name item__name--price">€{price}</p>
          </div>
          <p className="item__name item__name--brand">#{brand}</p>
          <p className="item__name item__name--category">#{category}</p>
        </div>
        {!grid && (
          <p className="item__description">{shortText(description, 200)}</p>
        )}

        <button className="item__button" onClick={() => addProducts()}>
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
