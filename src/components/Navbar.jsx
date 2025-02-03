import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/Navbar.css";
import logo from "../assets/image/chungRaKong.png";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* 로고 & 브랜드 네임 (왼쪽) */}
        <div className="brand">
          <Link to="/" className="logo" title="홈으로 가기">
            <img src={logo} alt="청라콩 로고" loading="lazy" />
            <span className="brand-name">청라콩</span>
          </Link>
        </div>

        {/* 네비게이션 메뉴 (가운데) */}
        <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/about" className="nav-link">
            소개
          </Link>

          {/* 프로그램 드롭다운 */}
          <div className="nav-link dropdown">
            <span className="dropdown-trigger">프로그램</span>
            <div className="dropdown-menu">
              <Link to="/services" className="dropdown-item">
                전체 프로그램
              </Link>
              <Link to="/video-lectures" className="dropdown-item">
                영상 강의
              </Link>
            </div>
          </div>

          <Link to="/contact" className="nav-link">
            문의
          </Link>
        </nav>

        {/* 로그인 or 마이페이지 (오른쪽) */}
        <div className="auth-section">
          {user ? (
            <Link to="/mypage" className="nav-link cta">
              마이페이지
            </Link>
          ) : (
            <Link to="/login" className="nav-link cta">
              로그인
            </Link>
          )}
        </div>

        {/* 모바일 메뉴 버튼 */}
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="메뉴 열기"
        >
          <span className={`hamburger ${isMenuOpen ? "active" : ""}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
