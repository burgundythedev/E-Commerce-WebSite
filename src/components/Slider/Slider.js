import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import arrowleft from "../../assets/img/arrow-left.png";
import arrowright from "../../assets/img/arrow-right.png";
import { sliderData } from "./sliderData";
import "./Slider.scss";

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
  const intervalTime = 7000;

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
      <img
        className="arrow prev"
        src={arrowleft}
        alt="arrow-slider"
        onClick={slidePrev}
      />
      <img
        className="arrow next"
        src={arrowright}
        alt="arrow-slider"
        onClick={slideNext}
      />
      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img className="slider__img" src={image} alt="slide-pic" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <button className="button">
                    <Link className="link" to="e-commerceweb/products">
                      Shop
                    </Link>
                  </button>
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
