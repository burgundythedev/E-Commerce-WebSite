import React, { useEffect } from "react";
import "./Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE_FROM_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  SUBTOTAL_CALCULATOR,
  SUBTOTAL_ITEM_CALCULATOR,
  selectCartProducts,
  selectCartTotalAmount,
  selectCartTotalItems,
} from "../../store/slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import trash from "../../assets/img/trash.png";
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
  const handleRemoveItem = (item) => {
    dispatch(REMOVE_FROM_CART(item));
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
  console.log(url);
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
      <h2 className="cart__title">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="cart__empty">
          <p>Your Cart is currently empty</p>
          <br />
          <Link to="/#products">&larr; Continue Shopping</Link>
        </div>
      ) : (
        <table className="cart__table">
          <thead className="cart__thead">
            <tr className="cart__tr">
              <th className="cart__th">s/n</th>
              <th className="cart__th">Product</th>
              <th className="cart__th">Price</th>
              <th className="cart__th">Quantity</th>
              <th className="cart__th">Total</th>
              <th className="cart__th">Delete</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => {
              const { id, name, cartQuantity, imageUrl, price } = item;
              return (
                <tr key={id} className="cart__tr">
                  <td className="cart__td">{index + 1}</td>
                  <td className="cart__td">
                    <p>
                      <b>{name}</b>
                    </p>
                    <img className="cart__img" src={imageUrl} alt={name} />
                  </td>
                  <td className="cart__td">${price}</td>
                  <td className="cart__td">
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
                  </td>
                  <td className="cart__td">
                    ${(price * cartQuantity).toFixed(2)}
                  </td>
                  <td className="cart__icons">
                    <img
                      src={trash}
                      alt="delete-icon"
                      onClick={() => handleRemoveItem(item)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className="cart__summary">
        <button
          className="cart__button cart__button--clear"
          onClick={() => handleClearCart()}
        >
          Clear Cart
        </button>
        <div className="cart__checkout">
          <div>
            <Link to="/products">&larr; Continue Shopping</Link>
          </div>
          <div className="cart__card">
            <p>
              <b>{`Cart Item (s): ${cartTotalQuantity}`}</b>
            </p>
            <div className="cart__text">
              <h4>Subtotal:</h4>
              <h3>{`$${cartTotalPrice.toFixed(2)}`}</h3>
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
              <p>
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
