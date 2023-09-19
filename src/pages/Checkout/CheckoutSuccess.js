import { Link } from "react-router-dom";
import "./CheckoutSuccess.scss";
const CheckoutSuccess = () => {
  return (
    <div className="success">
      <h2 className="success__title">Thank you for your purchase!</h2>
      <Link className="success__button-box" to="/order-history">
        <button className="success__button">View Order Status</button>
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
