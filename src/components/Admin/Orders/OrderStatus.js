import React, { useState } from "react";
import Loader from "../../../Loader/Loader";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/Config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UPDATE_ORDER_STATUS } from "../../../store/slice/orderSlice";
import "./OrderStatus.scss";

const OrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateStatus = async (e, id) => {
    e.preventDefault();
    setLoading(true);

    const updatedOrderConfig = {
      orderStatus: status,
    };

    try {
      const orderDocRef = doc(db, "orders", id);

      await setDoc(orderDocRef, updatedOrderConfig, { merge: true });

      setLoading(false);
      toast.success("Order status changed");

      dispatch(UPDATE_ORDER_STATUS({ id, status }));

      navigate("/admin/home");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="status">
      {loading && <Loader />}
      <form className="status__form" onSubmit={(e) => updateStatus(e, id)}>
        <select
          className="status__select"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value="" disabled>
            Update Order
          </option>
          <option value="Order Placed">Order Placed</option>
          <option value="Delivered">Delivered</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
        </select>
        <button className="status__button" type="submit">
          Update Status
        </button>
      </form>
    </div>
  );
};

export default OrderStatus;
