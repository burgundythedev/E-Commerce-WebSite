import React from "react";
import "./NotFound.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="error">
      <div className="error__content">
        <h2 className="error__title">404</h2>
        <p className="error__description">Opppss, Page Not Found</p>
        <button className="error__button">
          <Link className="error__link" to="/">
            &larr; Back To Home
          </Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
