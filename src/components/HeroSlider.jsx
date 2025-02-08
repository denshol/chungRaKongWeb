import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/image/banner/chungRaMain1.jpg";
import img2 from "../assets/image/banner/chungRaMainDrum.jpg";
import img3 from "../assets/image/banner/chungRaMainGuitar.jpg";
import img4 from "../assets/image/banner/chungRaMainEng2.jpg";
import styles from "../styles/HeroSlider.module.css";

const images = [img1, img2, img3, img4];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 슬라이드 전환 효과 (페이드 및 살짝 줌 효과)
  const variants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <div className={styles.heroSlider}>
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          className={styles.slide}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <img
            src={images[currentIndex]}
            alt={`슬라이드 ${currentIndex + 1}`}
          />
          {/* 그라데이션 오버레이 */}
          <div className={styles.overlay}></div>
        </motion.div>
      </AnimatePresence>

      <div className={styles.pagination}>
        <span className={styles.pageNumber}>
          {currentIndex + 1}/{images.length}
        </span>
      </div>
    </div>
  );
};

export default HeroSlider;
