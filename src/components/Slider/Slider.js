import React, { useEffect, useState } from "react";
import { sliderData } from "./sliderData";
import "./Slider.scss";
import Button from "../UI/Button";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideMotion = sliderData.length;

  const slidePrev = () => {
    setCurrentSlide(currentSlide === 0 ? slideMotion - 1 : currentSlide - 1);
  };
  const slideNext = () => {
    setCurrentSlide(currentSlide === slideMotion - 1 ? 0 : currentSlide + 1);
  };

  const scroll = true;
  let intervalSlide;
  const intervalTime = 9000;

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (scroll) {
      const auto = () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        intervalSlide = setInterval(slideNext, intervalTime);
      };
      auto();
    }
    return () => clearInterval(intervalSlide);
  }, [currentSlide, intervalSlide, scroll]);
  return (
    <div className="slider">
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="arrow prev" alt="arrow-slider" onClick={slidePrev}></div>
      <div className="arrow next" alt="arrow-slider" onClick={slideNext}></div>
      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img className="img" src={image} alt="slide-pic" />
                <div className="content">
                  <div className="text-box">
                    <h2 className="title">{heading}</h2>
                    <p className="text">{desc}</p>
                  </div>
                  <div className="button-box">
                    <Button />
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
      ;
    </div>
  );
};

export default Slider;
