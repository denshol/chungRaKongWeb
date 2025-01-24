import React from "react";
import "../styles/About.css";
import img1 from "../assets/image/PilatesTeacher2.jpg";
import img2 from "../assets/image/chungRaFestival.jpg";
import img3 from "../assets/image/concert3.jpg";

const About = () => {
  return (
    <div className="about-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>청라콩문화센터</h1>
          <p>모두를 위한 문화와 교육의 공간</p>
          <button className="cta-button">프로그램 살펴보기</button>
        </div>
      </div>

      <section className="vision-section">
        <h2>우리의 미션</h2>
        <p>
          청라콩문화센터는 창의성, 포용성, 그리고 지역 사회의 성장을 최우선으로
          합니다. 경제적 장벽 없이 양질의 문화 경험과 교육을 제공하여 개인의
          잠재력을 일깨웁니다.
        </p>
      </section>

      <section className="features-section">
        {[
          {
            img: img1,
            title: "다양한 문화 프로그램",
            description: "예술, 음악, 공연 등 풍부하고 창의적인 문화 경험 제공",
            color: "green",
          },
          {
            img: img2,
            title: "맞춤형 교육 서비스",
            description:
              "연령과 관심사에 맞는 혁신적이고 포용적인 교육 프로그램",
            color: "blue",
          },
          {
            img: img3,
            title: "지역 커뮤니티 강화",
            description:
              "소통과 협력을 통한 활기차고 포용적인 지역 사회 만들기",
            color: "orange",
          },
        ].map((feature, index) => (
          <div key={index} className={`feature feature-${feature.color}`}>
            <div className="feature-image-container">
              <img src={feature.img} alt={feature.title} />
              <div className="feature-overlay">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default About;
