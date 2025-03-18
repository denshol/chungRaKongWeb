import React from "react";
import styles from "../styles/AdminDashboard.module.css";
import DarkModeToggle from "./DarkModeToggle"; // 다크모드 토글 컴포넌트 추가

const Header = ({ activeTab, searchTerm, setSearchTerm }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>{activeTab}</h1>
      <div className={styles.headerActions}>
        <div className={styles.searchBox}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="회원 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DarkModeToggle /> {/* 다크모드 토글 버튼 추가 */}
        <div className={styles.notificationBell}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className={styles.notificationBadge}>3</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
