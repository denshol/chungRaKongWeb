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
            <li><a href="https://www.youtube.com/channel/UCnvzY1j-Sts1a98pGenRRTQ" target="_blank" rel="noopener noreferrer">유튜브</a></li>
            
          </ul>
        </div>

        <div className="footer-section">
          <h4>서비스 정책</h4>
          <ul>
            <li><a href="/terms">이용약관</a></li>
            <li><a href="/privacy" className="bold">개인정보 처리방침</a></li>
          
            
          </ul>
        </div>

        <div className="footer-section">
          <h4>고객지원</h4>
          <ul>
            <li><a href="/contact" className="bold">청라콩에게 문의하기</a></li>
          
          </ul>
        </div>

        <div className="footer-section">
          <h4></h4>
          <ul>
            <li><a href="/corporate"></a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-info">
        <p>주소: 인천광역시 서구 청라동 167-10 미라클프라자 601호</p>
        <p>고객센터: 010-2817-5766 | <a href="mailto:cnk_cc@naver.com">cnk_cc@naver.com</a></p>
        <p>청라콩은 다양한 교육과 문화를 연결하는 플랫폼입니다.  </p>
        
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 청라콩. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
