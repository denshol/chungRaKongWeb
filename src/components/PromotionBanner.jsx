import React from "react";
import styles from "../styles/PromotionBanner.module.css";

const PromotionBanner = () => {
  return (
    <a
      href="https://play.google.com/store/apps/details?id=com.chungrakong"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.bannerContainer}
    >
      <img
        src="/image/banner/AppBanner2.jpg" // ✅ 경로 확인 필수
        alt="청라콩 어플 프로모션 배너"
        className={styles.bannerImage}
      />
    </a>
  );
};

export default PromotionBanner;
