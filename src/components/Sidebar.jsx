// components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/AdminDashboard.module.css";
import {
  FiHome,
  FiBarChart2,
  FiUsers,
  FiBook,
  FiSettings,
  FiMenu,
  FiLogOut,
  FiArrowLeft,
} from "react-icons/fi";

const Sidebar = ({ sidebarOpen, toggleSidebar, activeTab, setActiveTab }) => {
  // 메뉴 항목 목록
  const menuItems = [
    { id: "대시보드", icon: <FiBarChart2 />, text: "대시보드" },
    { id: "회원관리", icon: <FiUsers />, text: "회원관리" },
    { id: "프로그램관리", icon: <FiBook />, text: "프로그램관리" },
    { id: "설정", icon: <FiSettings />, text: "설정" },
  ];

  return (
    <div className={`${styles.sidebar} ${sidebarOpen ? "" : styles.collapsed}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarBrand}>
          <span>관리자 콘솔</span>
        </div>
        <button
          className={styles.sidebarToggle}
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "사이드바 닫기" : "사이드바 열기"}
        >
          <FiMenu />
        </button>
      </div>

      <ul className={styles.sidebarMenu}>
        {menuItems.map((item) => (
          <li key={item.id} className={styles.menuItem}>
            <button
              className={`${styles.menuLink} ${
                activeTab === item.id ? styles.active : ""
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span className={styles.menuText}>{item.text}</span>
            </button>
          </li>
        ))}

        {/* 메인 사이트로 돌아가기 링크 */}
        <li className={`${styles.menuItem} ${styles.homeItem}`}>
          <Link to="/" className={styles.menuLink}>
            <FiArrowLeft />
            <span className={styles.menuText}>메인 사이트</span>
          </Link>
        </li>
      </ul>

      <div className={styles.userProfile}>
        <div className={styles.profileAvatar}>관리자</div>
        <div className={styles.profileInfo}>
          <div className={styles.profileName}>관리자 계정</div>
          <div className={styles.profileRole}>전체 권한</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
