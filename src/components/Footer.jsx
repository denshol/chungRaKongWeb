import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-section">
          <h4>청라콩</h4>
          <p>우리는 건강하고 활기찬 커뮤니티를 만들어갑니다.</p>
          <div className="social-icons">
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>빠른 링크</h4>
          <a href="/">홈</a>
          <a href="/about">소개</a>
          <a href="/services">서비스</a>
          <a href="/contact">문의</a>
        </div>

        <div className="footer-section">
          <h4>연락처</h4>
          <p>📞 010-1234-5678</p>
          <p>✉️ contact@chungrakong.com</p>
          <p>📍 서울시 어딘가</p>
        </div>

        <div className="footer-section">
          <h4>뉴스레터</h4>
          <p>최신 소식을 받아보세요</p>
          <input
            type="email"
            placeholder="이메일 주소"
            style={{
              padding: "10px",
              width: "100%",
              marginBottom: "10px",
              border: "none",
              borderRadius: "5px",
            }}
          />
          <button
            style={{
              padding: "10px",
              backgroundColor: "var(--primary-color)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            구독
          </button>
        </div>
      </div>

      <div className="footer-bottom">© 2024 청라콩. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
