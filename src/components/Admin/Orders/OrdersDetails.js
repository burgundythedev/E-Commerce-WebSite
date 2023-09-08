import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDetails from "../../../customHooks/useFetchDetails";
import OrderStatus from "./OrderStatus";

const OrdersDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  const { details } = useFetchDetails("orders", id);
  useEffect(() => {
    setOrder(details);
  }, [details]);

  return (
    <div className="orders-details">
      <h2>Order details</h2>
      <div>
        <Link to="e-commerceweb/admin/home">
          &larr; Return to statistical summary
        </Link>
      </div>
      {order === null ? (
        <p>We're not able to display your order details, Try again!</p>
      ) : (
        <>
          <div>
            <p>
              <b>Order Id:</b> {order.id}
            </p>
            <p>
              <b>Order Amount:</b> ${order.orderAmount}
            </p>
            <p>
              <b>Current order status:</b>
              {order.orderStatus}
            </p>
            <div>
              <b>Shipping Address:</b>
              <br />
              {order.userAddress.name}
              <br />
              {order.userAddress.adress} <br />
              {order.userAddress.postal_code} {order.userAddress.city},&nbsp;
              {order.userAddress.country}.
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
                      <p>
                        <b>{name}</b>
                      </p>
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
      <OrderStatus order={order} id={id} />
    </div>
  );
};

export default OrdersDetails;
