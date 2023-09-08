import React, { useEffect } from "react";
import useFetchProductList from "../../customHooks/useFetchProductList";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ORDERS, selectOrderHistory } from "../../store/slice/orderSlice";
import Loader from "../../Loader/Loader";
import "./OrderHistory.scss";
import { useNavigate } from "react-router-dom";
import { selectEmail } from "../../store/slice/authSlice";
const OrderHistory = () => {
  const { displayList, isLoading } = useFetchProductList("orders");
  const dispatch = useDispatch();
  const orderHistory = useSelector(selectOrderHistory);
  const userEmailAddress = useSelector(selectEmail);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(STORE_ORDERS(displayList));
  }, [dispatch, displayList]);
  const handleOrderDetails = (id) => {
    navigate(`e-commerceweb/order-details/${id}`);
  };

  const filteredOrders = orderHistory.filter(
    (order) => order.userEmail === userEmailAddress
  );
  return (
    <div className="history">
      <h3>Order History</h3>
      <>
        {isLoading && <Loader />}
        <div>
          {filteredOrders.lenght === 0 ? (
            <p>No order found</p>
          ) : (
            <table className="history__table">
              <thead className="history__thead">
                <tr className="history__tr">
                  <th className="history__th">S/N</th>
                  <th className="history__th">Date</th>
                  <th className="history__th">OrderID</th>
                  <th className="history__th">Order Amount</th>
                  <th className="history__th">User Email</th>
                  <th className="history__th">Order Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => {
                  const { id, orderDate, userEmail, orderStatus, orderAmount } =
                    order;
                  return (
                    <tr
                      className="history__tr history__tr--bis"
                      key={id}
                      onClick={() => handleOrderDetails(id, orderStatus)}
                    >
                      <td className="history__td">{index + 1}</td>
                      <td className="history__td">{orderDate}</td>
                      <td className="history__td">{id}</td>
                      <td className="history__td">
                        {"$"}
                        {orderAmount}
                      </td>
                      <td className="history__td">{userEmail}</td>
                      <td className="history__td">{orderStatus}</td>
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

export default OrderHistory;
