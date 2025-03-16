import React from "react";
import HeroSlider from "./HeroSlider";
import "../styles/SliderWrapper.module.css";

// 슬라이더를 감싸는 래퍼 컴포넌트
const SliderWrapper = () => {
  return (
    <div className="slider-wrapper">
      <HeroSlider />
    </div>
  );
};

export default SliderWrapper;
