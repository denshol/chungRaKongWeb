import { Link } from "react-router-dom";
import logo from "../assets/image/chungRaKong.png";

const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="청라콩 로고" loading="lazy" />
        <span className="brand-name">청라콩</span>
      </Link>
      <nav className="nav-links">
        <Link to="/">홈</Link>
        <Link to="/about">소개</Link>
        <Link to="/services">프로그램</Link>
        <Link to="/contact">문의</Link>
      </nav>
    </header>
  );
};

export default Navbar;