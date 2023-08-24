import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDetails from "../../customHooks/useFetchDetails";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { details } = useFetchDetails("orders", id);

  useEffect(() => {
    setOrder(details);
  }, [details]);

  const orderStatus = "Order successfully received by the customer";
  return (
    <div className="order-d">
      <h2>Order details</h2>
      <div>
        <Link to="/order-history">&larr; Back to My Orders</Link>
      </div>
      {order === null ? (
        <p>We're not able to display your order details, Try again!</p>
      ) : (
        <>
          <p>
            <b>Order Id</b> {order.id}
          </p>
          <p>
            <b>Order Amount</b> ${order.orderAmount}
          </p>
          <p>
            <b>Order Status</b> {orderStatus}
          </p>
          <table className="order-d__table">
            <thead className="order-d__thead">
              <tr className="order-d__tr">
                <th className="order-d__th">S/N</th>
                <th className="order-d__th">Product</th>
                <th className="order-d__th">Price</th>
                <th className="order-d__th">Quantity</th>
                <th className="order-d__th">Total</th>
                <th className="order-d__th">Action</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((cart, index) => {
                const { id, name, price, cartQuantity } = cart;

                return (
                  <tr className="order-d__tr" key={id}>
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
                    <td className="order-d__td">
                      <Link to="/review-product/:id">
                        <button>Review Product</button>
                      </Link>
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
