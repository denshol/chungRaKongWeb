import React, { useState, useEffect, useRef } from "react";
import img2 from "../assets/image/banner/chungRaBanner.png";
import img3 from "../assets/image/banner/chungRaBanner2.png";
import img4 from "../assets/image/banner/chungRaBanner3.png";
import img5 from "../assets/image/banner/chungRaBanner4.png";
import "../styles/HeroSlider.css";

const images = [img2, img3, img4, img5];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 2500);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="hero-slider">
      <div className="slider-container" ref={slideRef}>
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="slide">
              <img src={image} alt={`슬라이드 ${index}`} />
            </div>
          ))}
        </div>
      </div>
      <button className="prev-button" onClick={goToPrevSlide}>
        ❮
      </button>
      <button className="next-button" onClick={goToNextSlide}>
        ❯
      </button>
      <div className="pagination">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
