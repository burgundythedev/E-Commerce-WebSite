import React from "react";
import "./Chart.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

import { selectOrderHistory } from "../../../store/slice/orderSlice";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const Chart = () => {
  const orderHistory = useSelector(selectOrderHistory);
  const array = [];
  orderHistory.map((item) => {
    const { orderStatus } = item;
    array.push(orderStatus);
    return array;
  });
  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };

  const [q1, q2, q3, q4] = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Delivered",
  ];
  const placed = getOrderCount(array, q1);
  const processing = getOrderCount(array, q2);
  const shipped = getOrderCount(array, q3);
  const delivered = getOrderCount(array, q4);
  const data = {
    labels: ["Placed Orders", "Processing", "Shipped", "Delivered"],

    datasets: [
      {
        label: "Order Count",
        data: [placed, processing, shipped, delivered],
        backgroundColor: "rgb(226, 135, 67, 0.8)",
      },
    ],
  };
  return (
    <div className="chart">
      <Bar options={options} data={data} />
    </div>
  );
};

export default Chart;
