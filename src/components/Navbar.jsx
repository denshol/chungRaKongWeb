// Navbar.js
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/image/chungRaKong.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // 초기 상태 설정 (페이지 로드 시)
    setIsScrolled(window.scrollY > 80);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // 클래스명을 간결하게 정리
  const navbarClasses = [
    styles.navbar,
    isScrolled ? styles.scrolled : "",
    isMenuOpen ? styles.active : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={navbarClasses}>
      <div className={styles.navbarContainer}>
        <div className={styles.navLeftGroup}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo} title="홈으로 가기">
              <img src={logo} alt="청라콩 로고" loading="lazy" />
              <span className={styles.brandName}>청라콩문화센터</span>
            </Link>
          </div>

          <nav
            className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}
          >
            <Link to="/about" className={styles.navLink}>
              소개
            </Link>

            <div className={`${styles.navLink} ${styles.dropdown}`}>
              <span className={styles.dropdownTrigger}>프로그램</span>
              <div className={styles.dropdownMenu}>
                <Link to="/services" className={styles.dropdownItem}>
                  전체 프로그램
                </Link>
                <Link to="/video-lectures" className={styles.dropdownItem}>
                  영상 강의
                </Link>
              </div>
            </div>

            <Link to="/contact" className={styles.navLink}>
              문의
            </Link>
          </nav>
        </div>

        <div className={styles.contactInfo}>
          <FiPhone className={styles.phoneIcon} />
          <span className={styles.phoneNumber}> 010-8006-1715</span>
        </div>

        <button
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label="메뉴 열기"
        >
          <span
            className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}
          ></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
