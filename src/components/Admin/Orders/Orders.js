import React, { useEffect } from "react";
import useFetchProductList from "../../../customHooks/useFetchProductList";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_ORDERS,
  selectOrderHistory,
} from "../../../store/slice/orderSlice";
import Loader from "../../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import "./Orders.scss";

const Orders = () => {
  const { displayList, isLoading } = useFetchProductList("orders");
  const dispatch = useDispatch();
  const orderHistory = useSelector(selectOrderHistory);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(STORE_ORDERS(displayList));
  }, [dispatch, displayList]);
  const handleOrderDetails = (id) => {
    navigate(`/admin/orders-details/${id}`);
  };

  return (
    <div className="orders">
      <h3> All Orders</h3>
      <p>
        Open an order to change <b>Order Status</b>
      </p>
      <>
        {isLoading && <Loader />}
        <div>
          {orderHistory.lenght === 0 ? (
            <p>No order found</p>
          ) : (
            <table className="orders__table">
              <thead className="orders__thead">
                <tr className="orders__tr">
                  <th className="orders__th">S/N</th>
                  <th className="orders__th">Date</th>
                  <th className="orders__th">OrderID</th>
                  <th className="orders__th">Order Amount</th>
                  <th className="orders__th">User Email</th>
                  <th className="orders__th">Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order, index) => {
                  const { id, orderDate, userEmail, orderStatus, orderAmount } =
                    order;
                  return (
                    <tr
                      className="orders__tr orders__tr--bis"
                      key={id}
                      onClick={() => handleOrderDetails(id)}
                    >
                      <td className="orders__td">{index + 1}</td>
                      <td className="orders__td">{orderDate}</td>
                      <td className="orders__td">{id}</td>
                      <td className="orders__td">
                        {"$"}
                        {orderAmount}
                      </td>
                      <td className="orders__td">{userEmail}</td>
                      <td className="orders__td">{orderStatus}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </>
    </div>
  );
};

export default Orders;
