import React from "react";
import "./Loader.scss";
import { createPortal } from "react-dom";

const Loader = () => {
  return createPortal(
    <div className="loader">
      <div className="loader__spring">
        <span className="loader__bubble loader__bubble--1"></span>
        <span className="loader__bubble loader__bubble--2"></span>
        <span className="loader__bubble loader__bubble--3"></span>
        <span className="loader__bubble loader__bubble--4"></span>
        <span className="loader__bubble loader__bubble--5"></span>
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
