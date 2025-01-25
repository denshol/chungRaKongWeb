import React from "react";
import "../styles/About.css";
import img1 from "../assets/image/PilatesTeacher2.jpg";
import img2 from "../assets/image/chungRaFestival.jpg";
import img3 from "../assets/image/concert3.jpg";
import backgroundImg from "../assets/image/chungRaKong.png";

const About = () => {
  return (
    <section className="about-container">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>
            청라콩문화센터
            <br />
            <span>가능성을 열다</span>
          </h1>
          <p>
            예술, 교육, 그리고 커뮤니티가 어우러지는 공간.
            <br />
            창의적인 경험과 성장의 기회를 제공합니다.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="mission-text">
          <h2 data-text="청라콩의 비전과 미션" className="animated-heading">
            청라콩의 비전과 미션
          </h2>
          <p className="animated-text">
            청라콩문화센터는 창의성과 포용성을 바탕으로,
            <br />
            누구나 참여할 수 있는 문화와 교육의 플랫폼을 제공합니다.
          </p>
          <p className="animated-text">
            우리의 목표는 개인의 잠재력을 실현하고,
            <br />
            지역 사회와 함께 성장하는 것입니다.
          </p>
          <p className="animated-text">
            교육 프로그램은 모든 연령층과 관심사를 고려하여 설계되었으며,
            <br />
            예술적 감각과 학문적 호기심을 동시에 충족시킬 수 있습니다.
          </p>
          <p className="animated-text">
  청라콩문화센터는 예술과 교육, 커뮤니티의 조화를 통해
  <br />
  모든 이에게 열린 기회의 장을 제공합니다.
</p>
<p className="animated-text">
  우리의 비전은 각 개인이 가진 잠재력을 발굴하고,
  <br />
  다양한 문화를 통해 상호 존중과 이해를 키우는 것입니다.
</p>
<p className="animated-text">
  청라콩의 미션은 창의적이고 혁신적인 프로그램으로
  <br />
  지역 사회와 지속 가능한 성장을 이루는 데 있습니다.
</p>
<p className="animated-text">
  교육과 예술이 결합된 특별한 경험을 통해,
  <br />
  누구나 참여하고 즐길 수 있는 환경을 만듭니다.
</p>
        </div>
        <div className="mission-image">
          <div className="image-slider">
            <img src={img1} alt="Mission 1" />
            <img src={img2} alt="Mission 2" />
            <img src={img3} alt="Mission 3" />
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="highlights-section">
        <h2 className="animated-heading">우리가 제공하는 주요 프로그램</h2>
        <p className="highlights-description animated-text">
          청라콩문화센터는 다양한 문화와 예술 프로그램, 혁신적인 교육 콘텐츠를 통해
          <br />
          개인과 커뮤니티의 발전을 추구합니다.
        </p>
        <div className="highlight-cards">
          <div className="highlight-card">
            <div className="highlight-card-image">
              <img src={img1} alt="창의적인 프로그램" />
            </div>
            <div className="highlight-card-content">
              <h3>창의적인 프로그램</h3>
              <p>
                음악, 미술, 공연 등 다양한 경험을 통해 창의력을 자극하고,
                <br />
                삶의 질을 향상시키는 활동을 제공합니다.
              </p>
            </div>
          </div>
          <div className="highlight-card">
            <div className="highlight-card-image">
              <img src={img3} alt="혁신적인 교육" />
            </div>
            <div className="highlight-card-content">
              <h3>혁신적인 교육</h3>
              <p>
                아이부터 어른까지 누구나 배우고 성장할 수 있는,
                <br />
                맞춤형 학습 프로그램을 운영합니다.
              </p>
            </div>
          </div>
          <div className="highlight-card">
            <div className="highlight-card-image">
              <img src={img2} alt="커뮤니티 연결" />
            </div>
            <div className="highlight-card-content">
              <h3>커뮤니티 연결</h3>
              <p>
                지역 사회의 중심이 되어 사람들을 연결하고,
                <br />
                활기찬 네트워크를 구축합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
