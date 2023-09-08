import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/img/logo-website.jpg";
import cartLogo from "../../assets/img/cart.png";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import auth from "../../firebase/Config";
import { CONNECTED_USER, DISCONNECT_USER } from "../../store/slice/authSlice";
import ShowLogin, { HideLogin } from "../DisplayLinks/ShowLogin";
import { AdminOnlyLink } from "../Admin/AdminRoute/AdminRoute";
import {
  SUBTOTAL_ITEM_CALCULATOR,
  selectCartTotalItems,
} from "../../store/slice/cartSlice";

const Header = () => {
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartQuantity = useSelector(selectCartTotalItems);

  useEffect(() => {
    dispatch(SUBTOTAL_ITEM_CALCULATOR());
  }, [dispatch, cartQuantity]);

  const logout = getAuth(auth);
  const onLogOut = () => {
    signOut(logout)
      .then(() => {
        toast.success("Logout successfully!");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const authState = getAuth(auth);

  useEffect(() => {
    onAuthStateChanged(authState, (user) => {
      if (user) {
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }
        dispatch(
          CONNECTED_USER({
            isLoggedIn: true,
            email: user.email,
            userId: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(DISCONNECT_USER());
      }
    });
  }, [dispatch, displayName, authState]);

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="header">
        <Link to="/" className="header__logo">
          <img src={logo} alt="weblogo" className="header__logo-img" />
        </Link>
        <nav className="header__nav-bar">
          <div className="header__ulist">
            <div className="header__home">
              <AdminOnlyLink>
                <li className="header__item">
                  <Link
                    to="e-commerceweb/admin/home"
                    exact="true"
                    activeclassname="active"
                    className="header__links"
                  >
                    <button className="header__button-admin"> Admin</button>
                  </Link>
                </li>
              </AdminOnlyLink>
              <li className="header__item">
                <NavLink
                  to="/e-commerceweb"
                  exact="true"
                  activeclassname="active"
                  className="header__links"
                >
                  Home
                </NavLink>
              </li>
              <li className="header__item">
                <NavLink
                  to="e-commerceweb/contact"
                  exact="true"
                  activeclassname="active"
                  className="header__links"
                >
                  Contact
                </NavLink>
              </li>
            </div>
            <div className="header__auth">
              <HideLogin>
                <li className="header__item">
                  <NavLink
                    to="e-commerceweb/login"
                    exact="true"
                    activeclassname="active"
                    className="header__links"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="header__item">
                  <NavLink
                    to="e-commerceweb/register"
                    exact="true"
                    activeclassname="active"
                    className="header__links"
                  >
                    Register
                  </NavLink>
                </li>
              </HideLogin>

              <ShowLogin>
                <li className="header__item">
                  <NavLink
                    to="e-commerceweb/order-history"
                    exact="true"
                    activeclassname="active"
                    className="header__links"
                  >
                    My Orders
                  </NavLink>
                </li>
                <li className="header__item">
                  <NavLink
                    to="/e-commerceweb"
                    exact="true"
                    activeclassname="--active"
                    className="header__links"
                    onClick={onLogOut}
                  >
                    Log out
                  </NavLink>
                </li>
              </ShowLogin>
            </div>

            <div className="header__cart-container">
              <span className="header__cart">
                <NavLink to="e-commerceweb/cart" className="header__link-cart">
                  <img
                    src={cartLogo}
                    alt="cartlogo"
                    className="header__cart-logo"
                  />
                  <p className="header__text">{cartQuantity}</p>
                </NavLink>
                <ShowLogin>
                  <p className="header__userName">Hi, {displayName}</p>
                </ShowLogin>
              </span>
            </div>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Header;
