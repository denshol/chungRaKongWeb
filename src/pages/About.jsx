import React, { useEffect, useRef } from "react";
import styles from "../styles/About.module.css";
import {
  FaShieldAlt,
  FaLightbulb,
  FaPeopleArrows,
  FaBuilding,
  FaCouch,
  FaMusic,
  FaPalette,
  FaBook,
  FaDoorOpen,
} from "react-icons/fa";

const About = () => {
  const heroRef = useRef(null);
  const visionRef = useRef(null);
  const programRef = useRef(null);
  const facilityRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
          }
        });
      },
      { threshold: 0.2 }
    );

    [heroRef, visionRef, programRef, facilityRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.aboutContainer}>
      <div
        className={styles.heroSection}
        ref={heroRef}
        style={{ backgroundImage: "url('/image/poster/chungRaMain.jpg')" }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>청라콩문화센터</h1>
          <h2 className={styles.heroGradient}>가능성을 열다</h2>
          <p className={styles.heroText}>예술, 교육, 그리고 커뮤니티가 어우러지는 공간.</p>
          <p className={styles.heroText}>창의적인 경험과 성장의 기회를 제공합니다.</p>
        </div>
      </div>

      <div className={styles.visionSection} ref={visionRef}>
        <h2>청라콩 비전</h2>
        <p className={styles.sectionText}>누구나 참여할 수 있는 문화와 교육의 플랫폼을 제공합니다.</p>
      </div>

      <div className={styles.programSection} ref={programRef}>
        <h2>주요 프로그램</h2>
        <p className={styles.sectionText}>다양한 문화와 예술 프로그램을 통해 개인과 커뮤니티의 발전을 추구합니다.</p>
      </div>

      <div className={styles.facilitySection} ref={facilityRef}>
        <h2>시설 소개</h2>
        <p className={styles.sectionText}>편안하고 창의적인 공간에서 다양한 활동을 경험하세요.</p>
      </div>
    </section>
  );
};

export default About;
