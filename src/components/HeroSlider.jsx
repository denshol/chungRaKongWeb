import React, { useState, useEffect, useCallback } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const images = [img1, img2, img3, img4];

  // 화면 크기 감지 함수
  const checkScreenSize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
    setIsLargeScreen(window.innerWidth >= 1440);
  }, []);

  // 초기 로드 및 리사이즈 이벤트 대응
  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [checkScreenSize]);

  // 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  // 터치 이벤트 처리 함수
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // 왼쪽으로 스와이프 - 다음 이미지
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (isRightSwipe) {
      // 오른쪽으로 스와이프 - 이전 이미지
      setDirection(-1);
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }

    // 터치 상태 초기화
    setTouchEnd(null);
    setTouchStart(null);
  };

  // 수동 네비게이션 (이전/다음 슬라이드)
  const goToPreviousSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // 슬라이드 애니메이션 - 화면 크기별로 다르게 적용
  const slideVariants = {
    enter: (direction) => ({
      x:
        direction > 0
          ? isMobile
            ? 50
            : isLargeScreen
            ? 120
            : 100
          : isMobile
          ? -50
          : isLargeScreen
          ? -120
          : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: {
          type: "tween",
          duration: isMobile ? 0.5 : 0.8,
          ease: [0.32, 0.72, 0, 1],
        },
        opacity: { duration: 0.5 },
      },
    },
    exit: (direction) => ({
      x:
        direction > 0
          ? isMobile
            ? -50
            : isLargeScreen
            ? -120
            : -100
          : isMobile
          ? 50
          : isLargeScreen
          ? 120
          : 100,
      opacity: 0,
      transition: {
        x: {
          type: "tween",
          duration: isMobile ? 0.5 : 0.8,
          ease: [0.32, 0.72, 0, 1],
        },
        opacity: { duration: 0.5 },
      },
    }),
  };

  // 이미지 줌 효과 - 화면 크기별로 다르게 적용
  const imageVariants = {
    enter: {
      scale: isMobile ? 1.01 : isLargeScreen ? 1.08 : 1.05,
    },
    center: {
      scale: 1,
      transition: {
        duration: isMobile ? 1.5 : isLargeScreen ? 4 : 3,
        ease: "easeOut",
      },
    },
  };

  // 페이지네이션 애니메이션
  const numberVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handleImageLoad = (e) => {
    setImagesLoaded(true);
    const img = e.target;

    // 화면 크기에 따른 이미지 표시 최적화
    if (isMobile) {
      img.style.objectFit = "cover";
      img.style.objectPosition = "center center";
    } else if (isLargeScreen) {
      img.style.objectFit = "cover";
      img.style.objectPosition = "center center";
    } else {
      img.style.objectFit = "cover";
      img.style.objectPosition = "center center";
    }
  };

  // CSS 클래스 지정 - 화면 크기별로 다른 클래스 적용
  const sliderClass = `${styles.heroSlider} ${
    isMobile
      ? styles.mobileSlider
      : isLargeScreen
      ? styles.largeScreenSlider
      : ""
  }`;

  return (
    <div
      className={sliderClass}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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

      {/* 좌우 화살표 네비게이션 */}
      {!isMobile && (
        <>
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={goToPreviousSlide}
            aria-label="이전 슬라이드"
          >
            &lt;
          </button>
          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={goToNextSlide}
            aria-label="다음 슬라이드"
          >
            &gt;
          </button>
        </>
      )}

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
