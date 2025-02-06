import React from "react";
import styles from "../styles/About.module.css";
import { FaShieldAlt, FaLightbulb, FaPeopleArrows, FaBuilding, FaCouch, FaMusic, FaPalette, FaBook, FaDoorOpen } from "react-icons/fa";

const About = () => {
  const visionItems = [
    { icon: <FaShieldAlt style={{ color: 'green', fontSize: '4rem' }} />, title: "신뢰받는 청라콩", description: "투명성과 전문성, 나눔을 확산합니다." },
    { icon: <FaLightbulb style={{ color: 'green', fontSize: '4rem' }} />, title: "선도하는 청라콩", description: "지속적 연구와 혁신을 바탕의 문화" },
    { icon: <FaPeopleArrows style={{ color: 'green', fontSize: '4rem' }} />, title: "협력하는 청라콩", description: "사람들을 연결하고 함께 도와줍니다." },
  ];

  const facilityItems = [
    { icon: <FaBuilding style={{ color: 'green' }} />, title: "최첨단 시설", description: "최신 장비와 편의시설을 갖춘 문화공간" },
    { icon: <FaCouch style={{ color: 'green' }} />, title: "편안한 공간", description: "누구나 편히 쉴 수 있는 따뜻한 환경 제공" },
    { icon: <FaMusic style={{ color: 'green' }} />, title: "음향 & 무대", description: "공연과 교육에 최적화된 사운드 시스템" },
  ];

  const programItems = [
    { icon: <FaPalette style={{ color: 'green' }} />, title: "창의적인 프로그램", description: "미술, 음악 등 창의력을 키우는 활동" },
    { icon: <FaBook style={{ color: 'green' }} />, title: "혁신적인 교육", description: "배움을 통한 성장과 발전 기회 제공" },
    { icon: <FaDoorOpen style={{ color: 'green' }} />, title: "공연 및 문화행사", description: "연극, 콘서트 등 다양한 문화 체험 제공" },
  ];

  return (
    <section className={styles.aboutContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>청라콩문화센터</h1>
          <h2 className={styles.heroGradient}>가능성을 열다</h2>
          <p className={styles.heroText}>예술, 교육, 그리고 커뮤니티가 어우러지는 공간.</p>
          <p className={styles.heroText}>창의적인 경험과 성장의 기회를 제공합니다.</p>
        </div>
      </div>

      {/* Vision Section */}
      <div className={styles.visionSection}>
        <h2>청라콩 비전</h2>
        <p className={styles.sectionText}>청라콩문화센터는 창의성과 포용성을 바탕으로 <br />누구나 참여할 수 있는 문화와 교육의 플랫폼을 제공합니다.</p>
        <div className={styles.visionGrid}>
          {visionItems.map((item, index) => (
            <div key={index} className={styles.visionCard} style={{ height: 'auto', minHeight: '350px' }}>
              <div className={styles.icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Programs Section */}
      <div className={styles.programSection}>
        <h2>주요 프로그램</h2>
        <p className={styles.sectionText}>다양한 문화와 예술 프로그램을 통해 개인과 커뮤니티의 발전을 추구합니다.</p>
        <div className={styles.programGrid}>
          {programItems.map((item, index) => (
            <div key={index} className={styles.programCard}>
              <div className={styles.icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Facility Section */}
      <div className={styles.facilitySection}>
        <h2>시설 소개</h2>
        <p className={styles.sectionText}>편안하고 창의적인 공간에서 다양한 활동을 경험하세요.</p>
        <div className={styles.facilityGrid}>
          {facilityItems.map((item, index) => (
            <div key={index} className={styles.facilityCard}>
              <div className={styles.icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
