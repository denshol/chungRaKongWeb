// 매우 단순한 슬라이더 - 이미지만 제대로 표시
import React, { useState, useEffect } from "react";
import img1 from "../assets/image/banner/chungRaMain1.jpg";
import img2 from "../assets/image/banner/chungRaMainDrum.jpg";
import img3 from "../assets/image/banner/chungRaMainGuitar.jpg";
import img4 from "../assets/image/banner/chungRaMainEng2.jpg";

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [img1, img2, img3, img4];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  // 컨테이너 스타일
  const containerStyle = {
    width: "100%",
    paddingTop: "calc(370 / 1280 * 100%)", // 이미지 비율 유지
    position: "relative",
    overflow: "hidden",
  };

  return (
    <div style={containerStyle}>
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${image})`,
            backgroundSize: "contain", // 이미지가 온전히 표시되도록
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 1s ease",
            zIndex: index === currentIndex ? 2 : 1,
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          padding: "5px 10px",
          borderRadius: "15px",
          fontSize: "14px",
          zIndex: 5,
        }}
      >
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default HeroSlider;
