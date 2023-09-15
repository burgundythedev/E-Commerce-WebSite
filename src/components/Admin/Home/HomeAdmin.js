import React, { useEffect } from "react";
import InfoBox from "../InfoBox/InfoBox";
import earnIcon from "../../../assets/img/icons8-earning-64.png";
import productIcon from "../../../assets/img/produit.png";
import orderIcon from "../../../assets/img/order.png";
import "./HomeAdmin.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_TOTAL_ORDER,
  selectOrderAmount,
  selectOrderHistory,
} from "../../../store/slice/orderSlice";
import { selectProduct } from "../../../store/slice/storeSlice";
import Chart from "../Chart/Chart";
import Orders from "../Orders/Orders";

const HomeAdmin = () => {
  const dispatch = useDispatch();

  const savedTotalOrderAmount =
    parseFloat(localStorage.getItem("totalOrderAmount")) || 0;
  const savedProductCount = parseInt(localStorage.getItem("productCount")) || 0;
  const savedOrderHistory = parseInt(localStorage.getItem("orderHistory")) || 0;

  const orderHistory =
    useSelector(selectOrderHistory).length || savedOrderHistory;
  const productCount = useSelector(selectProduct).length || savedProductCount;
  const totalOrderAmount =
    useSelector(selectOrderAmount) || savedTotalOrderAmount;

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_ORDER());

    localStorage.setItem("totalOrderAmount", totalOrderAmount);
    localStorage.setItem("productCount", productCount);
    localStorage.setItem("orderHistory", orderHistory);
  }, [dispatch, orderHistory, productCount, totalOrderAmount]);

  return (
    <div className="home-admin">
      <h2 className="home-admin__title home-admin__title--title">Business</h2>
      <div className="home-admin__container">
        <div className="home-admin__info-box">
          <InfoBox
            title={"Earnings"}
            count={`$${totalOrderAmount}`}
            icon={earnIcon}
          />
          <InfoBox title={"Products"} count={productCount} icon={productIcon} />
          <InfoBox title={"Orders"} count={orderHistory} icon={orderIcon} />
        </div>
        <div className="home-admin__chart-container">
          <h3 className="home-admin__title home-admin__title--chart">
            Order Status Graphic
          </h3>
          <Chart orderHistory={orderHistory} />
        </div>
      </div>
      <div className="home-admin__order-container">
        <Orders />
      </div>
    </div>
  );
};
export default HomeAdmin;
