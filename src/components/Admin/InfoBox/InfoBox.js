import React from "react";
import "./InfoBox.scss";
const InfoBox = ({ title, count, icon }) => {
  return (
    <div className="info">
      <div className="info__card">
        <h4 className="info__title">{title}</h4>
        <span className="info__span">
          <h3 className="info__count">{count}</h3>
          <img className="info__icon" src={icon} alt="icon-container" />
        </span>
      </div>
    </div>
  );
};

export default InfoBox;
