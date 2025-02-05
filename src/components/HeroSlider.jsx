import React, { useState, useEffect, useRef } from "react";
import img2 from "../assets/image/banner/chungRaMain1.jpg";
import img3 from "../assets/image/banner/chungRaBanner2.png";
import img4 from "../assets/image/banner/chungRaBanner3.png";
import img5 from "../assets/image/banner/chungRaBanner4.png";
import styles from "../styles/HeroSlider.module.css"; // CSS 모듈 import

const images = [img2, img3, img4, img5];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const startSliderTimer = () => {
    intervalRef.current = setInterval(() => {
      goToNextSlide();
    }, 5000); // 5초 간격으로 자동 전환
  };

  useEffect(() => {
    startSliderTimer();
    return () => clearInterval(intervalRef.current); // 컴포넌트 언마운트 시 타이머 정리
  }, [currentIndex]); // startSliderTimer는 useEffect 외부에서 정의되므로 종속성 배열에 추가하지 않아도 됨

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.heroSlider}>
      <div className={styles.sliderContainer}>
        <div
          className={styles.sliderTrack}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, // 슬라이드 이동
          }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.slide}>
              <img src={image} alt={`슬라이드 ${index}`} />
            </div>
          ))}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className={styles.pagination}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              currentIndex === index ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
