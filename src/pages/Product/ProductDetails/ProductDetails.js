import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import "./ProductDetails.scss";
import {
  ADD_TO_CART,
  SUBTOTAL_ITEM_CALCULATOR,
} from "../../../store/slice/cartSlice";
import { useDispatch } from "react-redux";
import useFetchDetails from "../../../customHooks/useFetchDetails";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { details } = useFetchDetails("products", id);

  useEffect(() => {
    setProduct(details);
  }, [details]);

  const handleAddToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(SUBTOTAL_ITEM_CALCULATOR());
  };

  return (
    <div className="details">
      {product === null ? (
        <Loader />
      ) : (
        <div className="details__container">
          <div className="details__link-box">
            <Link className="details__link" to="/products">
              &larr; Back to Products
            </Link>
          </div>
          <div className="details__container-img">
            <img
              className="details__img"
              src={product.imageUrl}
              alt={product.name}
            />
            <h4 className="details__name details__name--title">
              {product.name}
            </h4>
          </div>
          <div className="details__content">
            <div className="details__details">
              <div className="details__sub-category">
                <p className="details__name details__name--brand">
                  #{product.brand}
                </p>
                <p className="details__name details__name--category">
                  #{product.category}
                </p>
                <p className="details__name details__name--price">
                  €{product.price}
                </p>
              </div>
              <p className="details__description">{product.description}</p>
            </div>

            <div className="details__add">
              <button
                className="details__button"
                onClick={() => handleAddToCart(product)}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
