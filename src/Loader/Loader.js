import React from "react";
import "./Loader.scss";
import loader from "../assets/img/loader.gif";
import { createPortal } from "react-dom";

const Loader = () => {
  return createPortal(
    <div className="loader__wrapper">
      <div className="loader__loader">
        <img src={loader} alt="loader" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
