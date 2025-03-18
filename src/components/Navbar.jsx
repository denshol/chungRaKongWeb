import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
  memo,
  useMemo,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPhone,
  FiEdit3,
  FiChevronDown,
  FiGlobe,
  FiUser,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/image/chungRaKong.png";
import ApplyModal from "./ApplyModal";
import { AuthContext } from "../contexts/AuthContext";
import defaultAvatar from "../assets/image/chungRaKong.png"; // 기본 아바타 이미지 경로

// 최적화를 위한 메모이제이션된 컴포넌트들
const NavLogo = memo(({ brandName }) => (
  <Link to="/" className={styles.logo} title="홈으로 가기">
    <img src={logo} alt="청라콩 로고" loading="lazy" width="40" height="40" />
    <span className={styles.brandName}>{brandName}</span>
  </Link>
));

const MobileContactInfo = memo(() => (
  <div className={styles.mobileContactInfo}>
    <FiPhone className={styles.phoneIcon} />
    <span className={styles.phoneNumber}>010-8006-1715</span>
  </div>
));

const ContactInfo = memo(() => (
  <div className={styles.contactInfo}>
    <FiPhone className={styles.phoneIcon} />
    <span className={styles.phoneNumber}>010-8006-1715</span>
  </div>
));

const Navbar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  // isAdmin 함수를 호출하여 관리자 여부 확인
  const userIsAdmin = useMemo(() => isAdmin(), [user, isAdmin]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const profileMenuRef = useRef(null);

  // 스크롤 이벤트 처리 - 디바운싱 추가
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !isScrolled) {
        setIsScrolled(true);
      } else if (window.scrollY <= 10 && isScrolled) {
        setIsScrolled(false);
      }
    };

    // 초기 설정
    setIsScrolled(window.scrollY > 10);

    // 스크롤 이벤트에 디바운싱 적용
    let timeoutId;
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener("scroll", debouncedHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [isScrolled]);

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

      if (
        isProfileMenuOpen &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isMenuOpen || isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // 모바일 메뉴가 열렸을 때 스크롤 방지
      if (isMenuOpen) {
        document.body.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen, isProfileMenuOpen]);

  // 메뉴 토글
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
    setActiveDropdown(null); // 메뉴 토글 시 드롭다운 초기화
  }, []);

  // 프로필 메뉴 토글
  const toggleProfileMenu = useCallback(() => {
    setIsProfileMenuOpen((prev) => !prev);
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

  // 로그아웃 처리
  const handleLogout = useCallback(() => {
    logout();
    setIsProfileMenuOpen(false);
    navigate("/");
  }, [logout, navigate]);

  // CSS 클래스 계산 - useMemo로 최적화
  const navbarClasses = useMemo(() => {
    return [
      styles.navbar,
      isScrolled ? styles.scrolled : "",
      isMenuOpen ? styles.active : "",
    ]
      .filter(Boolean)
      .join(" ");
  }, [isScrolled, isMenuOpen]);

  // 메모이제이션된 모바일 인증 링크
  const mobileAuthLinks = useMemo(() => {
    return user ? (
      <>
        <Link
          to="/mypage"
          className={styles.navLink}
          onClick={() => setIsMenuOpen(false)}
        >
          <FiUser style={{ marginRight: "4px" }} />
          마이페이지
        </Link>
        {userIsAdmin && (
          <Link
            to="/admin"
            className={`${styles.navLink} ${styles.adminLink}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <FiSettings style={{ marginRight: "4px" }} />
            관리자 페이지
          </Link>
        )}
        <button
          onClick={() => {
            handleLogout();
            setIsMenuOpen(false);
          }}
          className={styles.logoutButton}
        >
          <FiLogOut style={{ marginRight: "4px" }} />
          로그아웃
        </button>
      </>
    ) : (
      <>
        <Link
          to="/login"
          className={styles.navLink}
          onClick={() => setIsMenuOpen(false)}
        >
          로그인
        </Link>
        <Link
          to="/register"
          className={styles.navLink}
          onClick={() => setIsMenuOpen(false)}
        >
          회원가입
        </Link>
      </>
    );
  }, [user, handleLogout, userIsAdmin, setIsMenuOpen]);

  // 메모이제이션된 데스크톱 인증 영역
  const desktopAuthArea = useMemo(() => {
    return (
      <div className={styles.authContainer}>
        {user ? (
          <div className={styles.profileContainer} ref={profileMenuRef}>
            <div
              className={styles.profileButton}
              onClick={toggleProfileMenu}
              role="button"
              aria-expanded={isProfileMenuOpen}
            >
              <img
                src={user.profileImage || defaultAvatar}
                alt="프로필"
                className={styles.profileImg}
                onError={(e) => {
                  e.target.src = defaultAvatar;
                  e.target.onerror = null;
                }}
                width="32"
                height="32"
              />
              <span className={styles.userName}>
                {user.name || "사용자"}
                {userIsAdmin && <span className={styles.adminBadge}>관리자</span>}
              </span>
              <FiChevronDown className={styles.profileArrow} />
            </div>

            {/* 프로필 드롭다운 메뉴 */}
            {isProfileMenuOpen && (
              <div className={styles.profileDropdown}>
                <Link
                  to="/mypage"
                  className={styles.profileMenuItem}
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <FiUser className={styles.menuIcon} />
                  마이페이지
                </Link>
                
                {/* 구분선 추가 */}
                {userIsAdmin && <div className={styles.divider}></div>}
                
                {userIsAdmin && (
                  <Link
                    to="/admin"
                    className={`${styles.profileMenuItem} ${styles.adminLink}`}
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <FiSettings className={styles.menuIcon} />
                    관리자 페이지
                  </Link>
                )}
                
                <div className={styles.divider}></div>
                
                <button
                  className={styles.profileMenuItem}
                  onClick={handleLogout}
                >
                  <FiLogOut className={styles.menuIcon} />
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.authLinks}>
            <Link to="/login" className={styles.authLink}>
              로그인
            </Link>
            <Link to="/register" className={styles.authButton}>
              회원가입
            </Link>
          </div>
        )}
      </div>
    );
  }, [user, isProfileMenuOpen, toggleProfileMenu, handleLogout, userIsAdmin]);

  return (
    <>
      <header className={navbarClasses} ref={navRef}>
        <div className={styles.navbarContainer}>
          <div className={styles.navLeftGroup}>
            <div className={styles.brand}>
              <NavLogo brandName="청라콩문화센터" />
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

              <Link
                to="/study-abroad"
                className={styles.navLink}
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

              <a href="#" onClick={openApplyModal} className={styles.navLink}>
                <FiEdit3 style={{ marginRight: "4px" }} />
                수강신청
              </a>

              {/* 모바일 메뉴에서 로그인/회원가입 또는 프로필 메뉴 */}
              <div className={styles.mobileAuthLinks}>{mobileAuthLinks}</div>

              {/* 모바일 메뉴에서만 보이는 연락처 정보 */}
              <MobileContactInfo />
            </nav>
          </div>

          <div className={styles.rightGroup}>
            {/* 데스크탑에서 로그인/회원가입 버튼 또는 프로필 메뉴 */}
            {desktopAuthArea}

            <ContactInfo />

            {/* 모바일에서만 보이는 수강신청 버튼 */}
            <a
              href="#"
              onClick={openApplyModal}
              className={`${styles.mobileCtaButton}`}
            >
              <span>신청</span>
            </a>
          </div>

          <button
            className={`${styles.menuToggle} ${
              isMenuOpen ? styles.active : ""
            }`}
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

      {/* ApplyModal은 필요할 때만 렌더링 */}
      {isApplyModalOpen && (
        <ApplyModal
          isOpen={isApplyModalOpen}
          onClose={closeApplyModal}
          onSubmit={handleApplySubmit}
        />
      )}
    </>
  );
};

export default memo(Navbar);