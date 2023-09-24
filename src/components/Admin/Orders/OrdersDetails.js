import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDetails from "../../../customHooks/useFetchDetails";
import OrderStatus from "./OrderStatus";
import "./OrdersDetails.scss";
const OrdersDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  const { details } = useFetchDetails("orders", id);
  useEffect(() => {
    setOrder(details);
  }, [details]);

  return (
    <div className="orders-details">
      <h2 className="orders-details__title">Order details</h2>
      <div className="orders-details__back-link">
        <Link className="orders-details__link" to="/admin/home">
          &larr; Return to statistical summary
        </Link>
      </div>
      {order === null ? (
        <p className="orders-details__title">
          We're not able to display your order details, Try again!
        </p>
      ) : (
        <>
          <div className="orders-details__container">
            <div className="orders-details__container-details">
              <b className="orders-details__bold">Order Id:</b>
              <p className="orders-details__text">{order.id}</p>
            </div>
            <div className="orders-details__container-details">
              <b className="orders-details__bold">Order Amount:</b>
              <p className="orders-details__text">${order.orderAmount}</p>
            </div>
            <div className="orders-details__container-details orders-details__container-details--status">
              <div className="orders-details__container-status">
                <b className="orders-details__bold">Current order status:</b>
                <p className="orders-details__text orders-details__text--status">
                  {order.orderStatus}
                </p>
              </div>
              <OrderStatus order={order} id={id} />
            </div>
            <div className="orders-details__container-details">
              <b className="orders-details__bold">Name:</b>
              <p className="orders-details__text">{order.userAddress.name}</p>
            </div>
            <div className="orders-details__container-details">
              <b className="orders-details__bold">Shipping Address:</b>
              <p className="orders-details__text">{order.userAddress.adress}</p>
              <p className="orders-details__text">
                {order.userAddress.postal_code}
              </p>
              <br />
              <p className="orders-details__text">
                {order.userAddress.city},&nbsp;
                {order.userAddress.country}.
              </p>
            </div>
          </div>
          <table className="orders-details__table">
            <thead className="orders-details__thead">
              <tr className="orders-details__tr">
                <th className="orders-details__th">S/N</th>
                <th className="orders-details__th">Product</th>
                <th className="orders-details__th">Price</th>
                <th className="orders-details__th">Quantity</th>
                <th className="orders-details__th">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((cart, index) => {
                const { name, price, cartQuantity } = cart;

                return (
                  <tr className="orders-details__tr" key={index}>
                    <td className="orders-details__td">
                      <b>{index + 1}</b>
                    </td>
                    <td className="orders-details__td">
                      <b>{name}</b>
                    </td>
                    <td className="orders-details__td">{price}</td>
                    <td className="orders-details__td">{cartQuantity}</td>
                    <td className="orders-details__td">
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

export default OrdersDetails;
