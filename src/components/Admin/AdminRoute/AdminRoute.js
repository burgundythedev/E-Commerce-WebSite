import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectEmail } from "../../../store/slice/authSlice";
import "./AdminRoute.scss";
import { Link } from "react-router-dom";
const AdminRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
  if (userEmail === adminEmail) {
    return children;
  }
  return (
    <section className="admin-route">
      <h2 className="admin-route__title">Permission Denied</h2>
      <p className="admin-route__paragraph">
        Page can only be accessible by admin user
      </p>
      <Link to="/">
        <button className="admin-route__button">&larr; Back to Home</button>
      </Link>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === process.env.REACT_APP_ADMIN_EMAIL) {
    return children;
  }
  return null;
};

export default AdminRoute;
