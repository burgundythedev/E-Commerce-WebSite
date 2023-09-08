import React from "react";
import "./NavBarAdmin.scss";
import { useSelector } from "react-redux";
import { selectEmail } from "../../../store/slice/authSlice";
import userLogo from "../../../assets/img/user-icon.png";
import { NavLink } from "react-router-dom";
const NavBarAdmin = () => {
  const userEmail = useSelector(selectEmail);
  return (
    <div className="navbar">
      <div className="navbar__user">
        <img className="navbar__icon" src={userLogo} alt="user-logo" />
        <h1 className="navbar__name">Admin: {userEmail}</h1>
      </div>
      <nav className="navbar__container">
        <ul className="navbar__list">
          <li className="navbar__item">
            <NavLink
              to="/admin/home"
              className="navbar__link"
              activeclassname="active"
            >
              Home
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              to="/admin/product/ADD"
              className="navbar__link"
              activeclassname="active"
            >
              Add Product
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              to="/admin/viewproducts"
              className="navbar__link"
              activeclassname="active"
            >
              View Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBarAdmin;
