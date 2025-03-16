import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/image/banner/chungRaMain1.jpg";
import img2 from "../assets/image/banner/chungRaMainDrum.jpg";
import img3 from "../assets/image/banner/chungRaMainGuitar.jpg";
import img4 from "../assets/image/banner/chungRaMainEng2.jpg";
import styles from "../styles/HeroSlider.module.css";

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const images = [img1, img2, img3, img4];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 더 부드러운 슬라이드 애니메이션
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "tween", duration: 0.8, ease: [0.32, 0.72, 0, 1] },
        opacity: { duration: 0.5 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        x: { type: "tween", duration: 0.8, ease: [0.32, 0.72, 0, 1] },
        opacity: { duration: 0.5 },
      },
    }),
  };

  // 더 자연스러운 이미지 줌 효과
  const imageVariants = {
    enter: {
      scale: 1.05,
    },
    center: {
      scale: 1,
      transition: {
        duration: 3,
        ease: "easeOut",
      },
    },
  };

  // 더 부드러운 페이지네이션 애니메이션
  const numberVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handleImageLoad = (e) => {
    setImagesLoaded(true);

    // 모바일 환경에서 이미지 위치 조정
    if (isMobile) {
      e.target.style.objectPosition = "center center";
    }
  };

  return (
    <div className={styles.heroSlider}>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          className={styles.slide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <motion.img
            src={images[currentIndex]}
            alt={`슬라이드 ${currentIndex + 1}`}
            variants={imageVariants}
            initial="enter"
            animate="center"
            onLoad={handleImageLoad}
          />
          {!imagesLoaded && (
            <div className={styles.loadingPlaceholder}>
              <div className={styles.loadingSpinner}></div>
            </div>
          )}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </AnimatePresence>

      <div className={styles.pagination}>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            className={styles.pageNumber}
            variants={numberVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {currentIndex + 1}/{images.length}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSlider;
