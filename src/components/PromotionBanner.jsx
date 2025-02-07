import React from "react";
import styles from "../styles/PromotionBanner.module.css";

const PromotionBanner = () => {
  return (
    <a
      href="https://play.google.com/store/apps/details?id=com.chungrakong"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      <div className={styles.bannerContainer}>
        <div className={styles.textContainer}>
          <h2 className={styles.promoText}>
           청라콩 어플에서 만나요!
          </h2>
        </div>

        <div className={styles.pagination}>1/1</div>

        <div className={styles.decorations}>
          <div className={styles.circle}></div>
          <div className={styles.rectangle}></div>
        </div>
      </div>
    </a>
  );
};

export default PromotionBanner;
