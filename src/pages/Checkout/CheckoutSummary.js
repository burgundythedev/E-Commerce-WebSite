import React from "react";
import {
  selectCartTotalItems,
  selectCartProducts,
  selectCartTotalAmount,
  CLEAR_CART,
} from "../../store/slice/cartSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectShippingAddress } from "../../store/slice/checkoutSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/Config";

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
      toast.success("Order saved");
      dispatch(CLEAR_CART());
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="summary">
      <h3>Checkout Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <div>
            <p>No items in your cart</p>
            <button>
              <Link to="e-commerceweb/#product">&larr; Back to Shop</Link>
            </button>
          </div>
        ) : (
          <div>
            <p>{`Number of Item(s):${cartTotalQuantity}`}</p>
            <div>
              <h4>Subtotal:</h4>
              <h3>{cartTotalAmount.toFixed(2)}</h3>
            </div>
            {cartItems.map((item) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <div key={id}>
                  <h4>Product: {name}</h4>
                  <p>Quantity: {cartQuantity}</p>
                  <p>Unit Price: {price}</p>
                  <p>Total Price: {price * cartQuantity}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="summary__button">
        <Link to="e-commerceweb/checkout-success">
          <button onClick={saveOrder}>Finalize your order</button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSummary;
