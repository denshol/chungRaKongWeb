import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h4>청라콩</h4>
          <ul>
            <li><a href="/about">소개</a></li>
            <li><a href="/blog">블로그</a></li>
            <li><a href="/careers">채용</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>서비스 정책</h4>
          <ul>
            <li><a href="/terms">이용약관</a></li>
            <li><a href="/privacy" className="bold">개인정보 처리방침</a></li>
            <li><a href="/refund">환불규정</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>고객지원</h4>
          <ul>
            <li><a href="/contact" className="bold">청라콩에게 문의하기</a></li>
            <li><a href="/notices">공지사항</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>B2B</h4>
          <ul>
            <li><a href="/corporate">기업교육</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-info">
        <p>통신판매업 신고번호: 2022-인천청라-01234</p>
        <p>상호: (주)청라콩 | 대표자명: 김윤한 | 사업자등록번호: 123-45-67890</p>
        <p>주소: 인천광역시 서구 청라동 167-10 미라클프라자</p>
        <p>고객센터: 010-8006-1715 | <a href="mailto:contact@chungrakong.com">contact@chungrakong.com</a></p>
        <p>(주)청라콩은 통신판매중개자로서 거래 당사자가 아니므로, 등록된 상품정보 및 거래 등에 관한 의무와 책임을 지지 않습니다.</p>
        
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 청라콩. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
