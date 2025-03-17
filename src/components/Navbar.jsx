import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { FiPhone, FiEdit3, FiChevronDown, FiGlobe } from "react-icons/fi";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/image/chungRaKong.png";
import ApplyModal from "./ApplyModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // 초기 설정
    setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // 모바일 메뉴가 열렸을 때 스크롤 방지
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // 메뉴 토글
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
    setActiveDropdown(null); // 메뉴 토글 시 드롭다운 초기화
  }, []);

  // 드롭다운 토글
  const toggleDropdown = useCallback((dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  }, []);

  // ApplyModal 열기
  const openApplyModal = useCallback((e) => {
    e.preventDefault();
    setIsApplyModalOpen(true);
    setIsMenuOpen(false); // 모달 열 때 메뉴 닫기
  }, []);

  // ApplyModal 닫기
  const closeApplyModal = useCallback(() => {
    setIsApplyModalOpen(false);
  }, []);

  // 신청 완료 처리
  const handleApplySubmit = useCallback((formData) => {
    console.log("신청 완료:", formData);
    setIsApplyModalOpen(false);
  }, []);

  // CSS 클래스 계산
  const navbarClasses = [
    styles.navbar,
    isScrolled ? styles.scrolled : "",
    isMenuOpen ? styles.active : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={navbarClasses} ref={navRef}>
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
              aria-hidden={!isMenuOpen}
            >
              <Link
                to="/about"
                className={styles.navLink}
                onClick={() => setIsMenuOpen(false)}
              >
                소개
              </Link>

              <div className={`${styles.dropdown}`}>
                <div
                  className={styles.dropdownTrigger}
                  onClick={() => toggleDropdown("programs")}
                  role="button"
                  tabIndex={0}
                  aria-expanded={activeDropdown === "programs"}
                >
                  프로그램{" "}
                  <FiChevronDown
                    style={{ marginLeft: "4px", fontSize: "0.9rem" }}
                  />
                </div>
                <div
                  className={`${styles.dropdownMenu} ${
                    activeDropdown === "programs" ? styles.active : ""
                  }`}
                >
                  <Link
                    to="/services"
                    className={styles.dropdownItem}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    전체 프로그램
                  </Link>
                  <Link
                    to="/video-lectures"
                    className={styles.dropdownItem}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    영상 강의
                  </Link>
                </div>
              </div>

              {/* 어학연수 메뉴 - 개선된 디자인 적용 */}
              <Link
                to="/study-abroad"
                className={`${styles.navLink} ${styles.highlightedLink}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FiGlobe style={{ marginRight: "4px" }} />
                뉴질랜드 어학연수
              </Link>

              <Link
                to="/contact"
                className={styles.navLink}
                onClick={() => setIsMenuOpen(false)}
              >
                문의
              </Link>

              {/* 수강신청 버튼 - 개선된 디자인 */}
              <a
                href="#"
                onClick={openApplyModal}
                className={`${styles.navLink} ${styles.cta}`}
              >
                <FiEdit3 className={styles.ctaIcon} />
                수강신청
              </a>

              {/* 모바일 메뉴에서만 보이는 연락처 정보 */}
              <div className={styles.mobileContactInfo}>
                <FiPhone className={styles.phoneIcon} />
                <span className={styles.phoneNumber}>010-8006-1715</span>
              </div>
            </nav>
          </div>

          <div className={styles.rightGroup}>
            <div className={styles.contactInfo}>
              <FiPhone className={styles.phoneIcon} />
              <span className={styles.phoneNumber}>010-8006-1715</span>
            </div>

            {/* 모바일에서만 보이는 수강신청 버튼 - 개선된 디자인 */}
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
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMenuOpen}
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
