import React from "react";
import styles from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}>
        <div className={styles.dot1}></div>
        <div className={styles.dot2}></div>
      </div>
      <p className={styles.loadingText}>로딩 중...</p>
    </div>
  );
};

export default Loading;
