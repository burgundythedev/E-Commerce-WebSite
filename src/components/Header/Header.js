import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
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
import bubbles from "../../assets/img/bubble.png";
import loginIcon from "../../assets/img/login.png";
import contact from "../../assets/img/contact.png";
import myOrders from "../../assets/img/myorders.png";
import logOut from "../../assets/img/logout.png";
import adminUser from "../../assets/img/adminuser.png";
import home from "../../assets/img/home.png";
import register from "../../assets/img/register.png";

const Header = () => {
  const [displayName, setDisplayName] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="header">
        <nav className="header__nav-bar">
          <Link to="/" className="header__title-box">
            <h4 className="header__title">villabulle</h4>
            <img className="header__bubbles" src={bubbles} alt="bubble-img" />
          </Link>
          <div className="header__list-container">
            <div className="header__home">
              <AdminOnlyLink>
                <li className="header__item">
                  <Link to="/admin/home" className="header__links">
                    {screenWidth < 1110 ? (
                      <img
                        className="header__login-logo login-logo--admin"
                        src={adminUser}
                        alt="Admin"
                      />
                    ) : (
                      <span className="header__span-admin">Admin</span>
                    )}
                  </Link>
                </li>
              </AdminOnlyLink>
              <li className="header__item">
                <NavLink
                  to="/"
                  className="header__links"
                  activeclassname="active"
                >
                  {screenWidth < 1110 ? (
                    <img className="header__login-logo" src={home} alt="Home" />
                  ) : (
                    <span className="header__text">Home</span>
                  )}
                </NavLink>
              </li>
              <HideLogin>
                <li className="header__item">
                  <NavLink
                    to="/register"
                    className="header__links"
                    activeclassname="active"
                  >
                    {screenWidth < 1110 ? (
                      <img
                        className="header__login-logo"
                        src={register}
                        alt="Register"
                      />
                    ) : (
                      <span className="header__text">Register</span>
                    )}
                  </NavLink>
                </li>
              </HideLogin>
              <li className="header__item">
                <NavLink
                  to="/contact"
                  className="header__links"
                  activeclassname="active"
                >
                  {screenWidth < 1110 ? (
                    <img
                      className="header__login-logo"
                      src={contact}
                      alt="Contact"
                    />
                  ) : (
                    <span className="header__text">Contact</span>
                  )}
                </NavLink>
              </li>
            </div>
            <div className="header__ulist">
              <div className="header__user-container">
                <div className="header__auth">
                  <HideLogin>
                    <li className="header__item">
                      <NavLink
                        to="/login"
                        activeclassname="active"
                        className="header__links"
                      >
                        <img
                          className="header__login-logo"
                          src={loginIcon}
                          alt="Login"
                        />
                      </NavLink>
                    </li>
                  </HideLogin>
                  <ShowLogin>
                    <NavLink
                      to="/order-history"
                      activeclassname="active"
                      className="header__links"
                    >
                      <p className="header__userName">Hi, {displayName}</p>
                    </NavLink>

                    <li className="header__item">
                      <NavLink
                        to="/order-history"
                        activeclassname="active"
                        className="header__links"
                      >
                        {screenWidth < 1110 ? (
                          <img
                            className="header__login-logo"
                            src={myOrders}
                            alt="My Orders"
                          />
                        ) : (
                          <span className="header__text">My Orders</span>
                        )}
                      </NavLink>
                    </li>
                    <li className="header__item">
                      <NavLink
                        to="/"
                        className="header__logout"
                        onClick={onLogOut}
                        activeclassname="active"
                      >
                        {screenWidth < 1110 ? (
                          <img
                            className="header__login-logo"
                            src={logOut}
                            alt="Logout"
                          />
                        ) : (
                          <span className="header__text">Log out</span>
                        )}
                      </NavLink>
                    </li>
                  </ShowLogin>
                </div>
                <div className="header__cart">
                  <NavLink to="/cart" className="header__link-cart">
                    <img
                      src={cartLogo}
                      alt="cartlogo"
                      className="header__cart-logo"
                    />
                  </NavLink>
                  <p className="header__text">{cartQuantity}</p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Header;
