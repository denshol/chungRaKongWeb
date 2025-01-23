import React from "react";
import "../styles/styles.css";
import logo from "../assets/image/chungRaKong.png";

const Navbar = () => {
  return (
    <header className="navbar">
      <a href="/" className="logo">
        <img src={logo} alt="청라콩 로고" />
        <span className="brand-name">청라콩</span>
      </a>
      <nav className="nav-links">
        <a href="/">홈</a>
        <a href="/about">소개</a>
        <a href="/services">서비스</a>
        <a href="/contact">문의</a>
      </nav>
    </header>
  );
};

export default Navbar;
