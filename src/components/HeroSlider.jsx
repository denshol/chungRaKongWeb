import React, { useState, useEffect, useRef } from "react";
import img2 from "../assets/image/banner/chungRaMain1.jpg";
import img3 from "../assets/image/banner/chungRaMainDrum.jpg";
import img4 from "../assets/image/banner/chungRaMainGuitar.jpg";
import img5 from "../assets/image/banner/chungRaMainEng2.jpg";
import styles from "../styles/HeroSlider.module.css";

const images = [img2, img3, img4, img5];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const startSliderTimer = () => {
    intervalRef.current = setInterval(() => {
      goToNextSlide();
    }, 5000);
  };

  useEffect(() => {
    startSliderTimer();
    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className={styles.heroSlider} style={{ paddingTop: "0px" }}> {/* 여백 추가 */}
      <div className={styles.sliderContainer}>
        <div
          className={styles.sliderTrack}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.slide}>
              <img src={image} alt={`슬라이드 ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.pagination}>
        <span className={styles.pageNumber}>
          {currentIndex + 1}/{images.length}
        </span>
      </div>
    </div>
  );
};

export default HeroSlider;
