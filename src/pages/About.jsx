import React from "react";
import styles from "../styles/About.module.css"; // ✅ CSS 모듈 가져오기
import img1 from "../assets/image/programDetails/PilatesTeacher2.jpg";
import img2 from "../assets/image/chungRaFestival.jpg";
import img3 from "../assets/image/concert3.jpg";
import backgroundImg from "../assets/image/chungRaKong.png";

const About = () => {
  return (
    <section className={styles.aboutContainer}>
      {/* Hero Section */}
      <div
        className={styles.heroSection}
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
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
      <div className={styles.missionSection}>
        <div className={styles.missionText}>
          <h2>청라콩의 비전과 미션</h2>
          <p>
            청라콩문화센터는 창의성과 포용성을 바탕으로, 누구나 참여할 수 있는
            문화와 교육의 플랫폼을 제공합니다.
          </p>
        </div>
        <div className={styles.missionImage}>
          <div className={styles.imageSlider}>
            <img src={img1} alt="Mission 1" />
            <img src={img2} alt="Mission 2" />
            <img src={img3} alt="Mission 3" />
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className={styles.highlightsSection}>
        <h2>우리가 제공하는 주요 프로그램</h2>
        <p className={styles.highlightsDescription}>
          청라콩문화센터는 다양한 문화와 예술 프로그램을 통해 개인과 커뮤니티의
          발전을 추구합니다.
        </p>
        <div className={styles.highlightCards}>
          <div className={styles.highlightCard}>
            <img src={img1} alt="창의적인 프로그램" />
            <h3>창의적인 프로그램</h3>
            <p>음악, 미술, 공연 등 창의력을 자극하는 활동 제공.</p>
          </div>
          <div className={styles.highlightCard}>
            <img src={img3} alt="혁신적인 교육" />
            <h3>혁신적인 교육</h3>
            <p>누구나 배우고 성장할 수 있는 학습 프로그램.</p>
          </div>
          <div className={styles.highlightCard}>
            <img src={img2} alt="커뮤니티 연결" />
            <h3>커뮤니티 연결</h3>
            <p>사람들을 연결하고 네트워크를 구축하는 커뮤니티 공간.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
