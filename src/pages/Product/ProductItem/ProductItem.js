import React from "react";
import { Link } from "react-router-dom";
import "./ProductItem.scss";

const ProductItem = ({
  id,
  grid,
  name,
  price,
  imageUrl,
  description,
  brand,
  category,
}) => {
  const shortText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const itemClass = grid ? "item__grid" : "item item--list";
  return (
    <div className="item">
      <div className={itemClass}>
        <Link to={`/product-details/${id}`}>
          <div className="item__container-img">
            <img className="item__img" src={imageUrl} alt={name} />
          </div>
        </Link>
        <div className="item__content">
          <div className="item__details">
            <p className="item__price">{price}$</p>
            <h4 className="item__name">{shortText(name, 18)}</h4>
            <p className="item__name">{brand}</p>
            <p className="item__name">{category}</p>
          </div>
          {!grid && (
            <p className="item__description">{shortText(description, 150)}</p>
          )}
          <button className="item__button">Add</button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
