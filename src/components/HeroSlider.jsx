import React, { useState, useEffect } from "react";
import styles from "../styles/HeroSlider.module.css";
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

  return (
    <div className={styles.heroSlider}>
      <div className={styles.sliderContainer}>
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.slide}
            style={{
              backgroundImage: `url(${image})`,
              opacity: index === currentIndex ? 1 : 0,
            }}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        <div className={styles.pageNumber}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
