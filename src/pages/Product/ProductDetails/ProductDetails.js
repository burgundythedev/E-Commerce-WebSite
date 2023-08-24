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
      <div className="details__container">
        <h2>Details</h2>
        <div>
          <Link to="/products">Back to Products</Link>
        </div>
        {product === null ? (
          <Loader />
        ) : (
          <div>
            <div className="details__container-img">
              <img
                className="details__img"
                src={product.imageUrl}
                alt={product.name}
              />
            </div>
            <div className="details__content">
              <div className="details__details">
                <p className="details__price">{product.price}$</p>
                <h4 className="details__name">{product.name}</h4>
                <p className="details__name">{product.brand}</p>
                <p className="details__name">{product.category}</p>
              </div>
              <p className="details__description">{product.description}</p>
              <div className="details__add">
                <button
                  className="details__add"
                  onClick={() => handleAddToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
