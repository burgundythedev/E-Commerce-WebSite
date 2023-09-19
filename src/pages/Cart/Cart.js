import React, { useEffect } from "react";
import "./Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE_FROM_CART,
  SAVE_URL,
  SUBTOTAL_CALCULATOR,
  SUBTOTAL_ITEM_CALCULATOR,
  selectCartProducts,
  selectCartTotalAmount,
  selectCartTotalItems,
} from "../../store/slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../store/slice/authSlice";

const Cart = () => {
  const cartItems = useSelector(selectCartProducts);
  const cartTotalPrice = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalItems);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (item) => {
    dispatch(ADD_TO_CART(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(DECREASE_FROM_CART(item));
  };

  const handleClearCart = () => {
    if (cartItems.length > 0) {
      dispatch(CLEAR_CART());
    }
  };

  useEffect(() => {
    dispatch(SUBTOTAL_CALCULATOR());
    dispatch(SUBTOTAL_ITEM_CALCULATOR());
    dispatch(SAVE_URL(""));
  }, [dispatch, cartItems]);

  const url = window.location.href;

  const handleCheckOut = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <div className="cart">
      {cartItems.length === 0 ? (
        <div className="cart__empty">
          <p className="cart__text">Your Cart is currently empty</p>
          <br />
          <Link className="cart__continue" to="/#products">
            &larr; Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart__container">
          {cartItems.map((item, index) => {
            const { id, name, cartQuantity, imageUrl, price } = item;
            return (
              <>
                <div key={id} className="cart__item">
                  <img className="cart__img" src={imageUrl} alt={name} />
                  <div className="cart__description-box">
                    <p className="cart__text">{name}</p>

                    <div className="cart__count">
                      <button
                        className="cart__button"
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        -
                      </button>
                      {cartQuantity}
                      <button
                        className="cart__button cart__button--right"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        +
                      </button>
                    </div>
                    <p className="cart__text cart__text--price">
                      €{(price * cartQuantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="cart__bar-container">
                  <div className="cart__bar"></div>
                </div>
              </>
            );
          })}
        </div>
      )}
      <div className="cart__summary">
        <div className="cart__continue-box">
          <p className="cart__item-quantity">
            In your cart:
            <b className="cart__total-quantity">{cartTotalQuantity} items</b>
          </p>
          {cartItems.length === 0 ? null : (
            <Link className="cart__continue" to="/products">
              &larr; Continue Shopping
            </Link>
          )}
          <button
            className="cart__button cart__button--clear"
            onClick={() => handleClearCart()}
          >
            Clear Cart
          </button>
        </div>
        <div className="cart__checkout">
          <div className="cart__card">
            <div className="cart__subtotal">
              <h4 className="cart__text">Subtotal:</h4>
              <h3 className="cart__price">{`$${cartTotalPrice.toFixed(2)}`}</h3>
            </div>
          </div>
          {cartTotalQuantity > 0 ? (
            <button
              className="cart__button cart__button--checkout"
              onClick={handleCheckOut}
            >
              Checkout
            </button>
          ) : (
            <div className="cart__error">
              <p className="cart__text">
                Your cart is empty. Please add items to your cart before
                proceeding to checkout.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
