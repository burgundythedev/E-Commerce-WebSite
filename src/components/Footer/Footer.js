import React from "react";
import "./Footer.scss";

const date = new Date();
const year = date.getFullYear();
const Footer = () => {
  return (
    <div className="footer">
      <h1 className="footer__text">&copy;{year}</h1>
      <h1 className="footer__text">Github: @burgundythedev</h1>
    </div>
  );
};

export default Footer;
