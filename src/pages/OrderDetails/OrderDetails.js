import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDetails from "../../customHooks/useFetchDetails";
import "./OrderDetails.scss";
const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { details } = useFetchDetails("orders", id);

  useEffect(() => {
    setOrder(details);
  }, [details]);

  return (
    <div className="order-d">
      <div className="order-d__background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h2 className="order-d__title">Order details</h2>
      <div className="order-d__back-link">
        <Link className="order-d__link" to="/order-history">
          &larr; My Orders
        </Link>
      </div>
      {order === null ? (
        <p className="order-d__title">
          We're not able to display your order d, Try again!
        </p>
      ) : (
        <>
          <div className="order-d__container-details">
            <b className="order-d__bold">Order Id:</b>
            <p className="order-d__text">{order.id}</p>
          </div>
          <div className="order-d__container-details">
            <b className="order-d__bold">Order Amount:</b>
            <p className="order-d__text">${order.orderAmount}</p>
          </div>
          <div className="order-d__container-status">
            <b className="order-d__bold">Current order status:</b>
            <p className="order-d__text order-details__text--status">
              {order.orderStatus}
            </p>
          </div>
          <table className="order-d__table">
            <thead className="order-d__thead">
              <tr className="order-d__tr">
                <th className="order-d__th">S/N</th>
                <th className="order-d__th">Product</th>
                <th className="order-d__th">Price</th>
                <th className="order-d__th">Quantity</th>
                <th className="order-d__th">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((cart, index) => {
                const { name, price, cartQuantity } = cart;

                return (
                  <tr className="order-d__tr" key={index}>
                    <td className="order-d__td">
                      <b>{index + 1}</b>
                    </td>
                    <td className="order-d__td">
                      <p>
                        <b>{name}</b>
                      </p>
                    </td>
                    <td className="order-d__td">{price}</td>
                    <td className="order-d__td">{cartQuantity}</td>
                    <td className="order-d__td">
                      {(price * cartQuantity).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
