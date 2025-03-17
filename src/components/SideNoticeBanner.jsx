import React from "react";
import { FiBell } from "react-icons/fi";
import styles from "../styles/SideNoticeBanner.module.css";

const SideNoticeBanner = ({ onClick, noticeCount }) => {
  return (
    <div
      className={styles.sideTab}
      onClick={onClick}
      aria-label="공지사항 보기"
    >
      <FiBell className={styles.icon} />
      <span className={styles.text}>공지사항</span>
      {noticeCount > 0 && <span className={styles.badge}>{noticeCount}</span>}
    </div>
  );
};

export default SideNoticeBanner;
