import React, { useState, useEffect } from "react";
import img1 from "../assets/image/programHead.png";
import img2 from "../assets/image/chungRaSul.jpg";

const HeroSlider = () => {
  const images = [img1, img2];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((image, idx) => (
          <img key={idx} src={image} alt={`슬라이드 ${idx}`} />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
