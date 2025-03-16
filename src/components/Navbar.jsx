import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiPhone, FiEdit3 } from "react-icons/fi";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/image/chungRaKong.png";
import ApplyModal from "./ApplyModal"; // ApplyModal 컴포넌트 import

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false); // ApplyModal 상태 추가

  useEffect(() => {
    // 컴포넌트가 마운트된 후에만 isScrolled 상태 업데이트
    setIsMounted(true);

    const handleScroll = () => {
      if (isMounted) {
        setIsScrolled(window.scrollY > 80);
      }
    };

    // 초기 스크롤 위치 확인
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMounted]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // ApplyModal 열기 함수
  const openApplyModal = useCallback(
    (e) => {
      e.preventDefault(); // 기본 링크 동작 방지
      setIsApplyModalOpen(true);
      if (isMenuOpen) {
        setIsMenuOpen(false); // 모달 열 때 모바일 메뉴 닫기
      }
    },
    [isMenuOpen]
  );

  // ApplyModal 닫기 함수
  const closeApplyModal = useCallback(() => {
    setIsApplyModalOpen(false);
  }, []);

  // 신청 성공 처리 함수
  const handleApplySubmit = useCallback((formData) => {
    console.log("신청 완료:", formData);
    setIsApplyModalOpen(false);
    // 추가 처리가 필요하면 여기에 구현 (예: 성공 메시지 표시)
  }, []);

  // 모바일 메뉴가 열려있을 때만 active 클래스 적용
  const navbarClasses = [
    styles.navbar,
    isScrolled ? styles.scrolled : "",
    isMenuOpen ? styles.active : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
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
              className={`${styles.navLinks} ${
                isMenuOpen ? styles.active : ""
              }`}
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

              {/* 수강신청 버튼 - 모달 열기 */}
              <a
                href="#"
                onClick={openApplyModal}
                className={`${styles.navLink} ${styles.cta}`}
              >
                <FiEdit3 className={styles.ctaIcon} />
                수강신청
              </a>
            </nav>
          </div>

          <div className={styles.rightGroup}>
            <div className={styles.contactInfo}>
              <FiPhone className={styles.phoneIcon} />
              <span className={styles.phoneNumber}> 010-8006-1715</span>
            </div>

            {/* 모바일에서만 보이는 수강신청 버튼 - 모달 열기 */}
            <a
              href="#"
              onClick={openApplyModal}
              className={`${styles.mobileCtaButton}`}
            >
              <span>신청</span>
            </a>
          </div>

          <button
            className={styles.menuToggle}
            onClick={toggleMenu}
            aria-label="메뉴 열기"
          >
            <span
              className={`${styles.hamburger} ${
                isMenuOpen ? styles.active : ""
              }`}
            ></span>
          </button>
        </div>
      </header>

      {/* ApplyModal 컴포넌트 */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={closeApplyModal}
        onSubmit={handleApplySubmit}
      />
    </>
  );
};

export default Navbar;
