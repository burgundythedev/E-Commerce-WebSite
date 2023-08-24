import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div className="success">
      <h2>Thank you for your purchase</h2>
      <Link to="/order-history">
        <button>View Order Status</button>
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
