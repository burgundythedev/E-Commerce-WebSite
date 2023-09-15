import React from "react";
import { Link } from "react-router-dom";
import "./Button.scss";
const Button = () => {
  return (
    <div className="button-container">
      <Link className="button__link" to="/products">
        <button className="button">Our Store</button>
      </Link>
    </div>
  );
};

export default Button;
