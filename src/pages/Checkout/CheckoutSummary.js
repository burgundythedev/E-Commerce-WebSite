import React, { useEffect } from "react";
import {
  selectCartTotalItems,
  selectCartProducts,
  selectCartTotalAmount,
  CLEAR_CART,
  SUBTOTAL_CALCULATOR,
} from "../../store/slice/cartSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectShippingAddress } from "../../store/slice/checkoutSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/Config";
import "./CheckoutSummary.scss";
import { selectEmail } from "../../store/slice/authSlice";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartProducts);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalItems);
  const userEmail = useSelector(selectEmail);
  const userAddress = useSelector(selectShippingAddress);
  const dispatch = useDispatch();

  const saveOrder = async () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderItemsInfo = cartItems.map((item) => {
      return {
        name: item.name,
        price: item.price,
        cartQuantity: item.cartQuantity,
      };
    });
    const orderConfig = {
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed",
      cartItems: orderItemsInfo,
      userAddress,
    };

    try {
      await addDoc(collection(db, "orders"), orderConfig);
      toast.success("Order placed");
      dispatch(CLEAR_CART());
    } catch (error) {
      toast.error(error.message);
    }
  };

  localStorage.setItem("cartTotalAmount", cartTotalAmount.toFixed(2));
  useEffect(() => {
    const savedCartTotalAmount = localStorage.getItem("cartTotalAmount");

    if (savedCartTotalAmount) {
      dispatch(SUBTOTAL_CALCULATOR(parseFloat(savedCartTotalAmount)));
    }
  }, [dispatch]);
  return (
    <div className="summary">
      <h3 className="summary__title">Checkout Summary</h3>
      <div className="summary__container">
        {cartItems.length === 0 ? (
          <div className="summary__noitems">
            <p className="summary__title">No items in your cart</p>
            <button className="summary__button-link">
              <Link className="summary__link" to="/#product">
                &larr; Back to Shop
              </Link>
            </button>
          </div>
        ) : (
          <div className="summary__sum">
            <div className="summary__container-order">
              {cartItems.map((item) => {
                const { id, name, price, cartQuantity } = item;
                return (
                  <div className="summary__order" key={id}>
                    <h4 className="summary__title summary__title--name">
                      Product: {name}
                    </h4>
                    <p className="summary__title summary__title--quantity">
                      Quantity: {cartQuantity}
                    </p>
                    <p className="summary__title summary__title--price">
                      Unit Price: €{price}
                    </p>
                    <p className="summary__title summary__title--total-price">
                      Total Price: €{price * cartQuantity}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="summary__box-sub">
              <p className="summary__title summary__title--total">
                Number of Item(s): <b>{cartTotalQuantity}</b>
              </p>
              <h4 className="summary__title summary__title--subtotal">
                Subtotal:
              </h4>
              <h3 className="summary__title summary__title--amount">
                €{cartTotalAmount.toFixed(2)}
              </h3>
            </div>
          </div>
        )}
      </div>
      <Link className="summary__link" to="/checkout-success">
        <button className="summary__button" onClick={saveOrder}>
          Finalize your order
        </button>
      </Link>
    </div>
  );
};

export default CheckoutSummary;
