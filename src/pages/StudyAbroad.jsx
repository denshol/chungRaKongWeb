import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiBook,
  FiMap,
  FiGlobe,
  FiAward,
  FiUsers,
  FiMic,
  FiCalendar,
  FiBarChart2,
  FiMessageSquare,
  FiCheck,
  FiHeart,
  FiPhoneCall,
  FiBookOpen,
  FiFlag,
  FiCompass,
} from "react-icons/fi";
import styles from "../styles/StudyAbroad.module.css";
// 모달 컴포넌트 임포트
import NewZealandModal from "../components/NewZealandModal";

const newZealandData = {
  id: 1,
  name: "뉴질랜드",
  image:
    "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  shortDescription:
    "아름다운 자연환경과 친절한 현지인들 속에서 실용적인 영어를 배울 수 있는 나라",
  accent: "#27ae60",
  features: [
    "다양한 어학원 및 교육기관 소개",
    "워킹홀리데이 및 학생비자 안내",
    "현지 생활 정보 및 숙소 옵션",
    "주요 도시별 특징 및 장단점",
    "비용 및 생활 예산 계획",
  ],
};

const programData = [
  {
    id: 1,
    icon: <FiMic />,
    title: "일반 영어 과정",
    description:
      "일상 회화부터 비즈니스 영어까지 실용적인 영어 능력을 키우는 과정",
    details: [
      "원어민 강사의 소그룹 집중 수업",
      "수준별 맞춤형 커리큘럼 제공",
      "실생활 중심의 회화 및 청취 훈련",
      "4-12주 코스, 주 15-25시간 수업",
    ],
  },
  {
    id: 2,
    icon: <FiBookOpen />,
    title: "시험 대비 과정",
    description:
      "IELTS, OET 등 뉴질랜드 진학 및 이민에 필요한 영어 시험 대비 과정",
    details: [
      "시험별 특화된 전략 및 문제 풀이",
      "모의고사 및 개인별 피드백 제공",
      "시험 출제 경향 분석 및 대비",
      "8-12주 코스, 주 20시간 수업",
    ],
  },
  {
    id: 3,
    icon: <FiFlag />,
    title: "워킹홀리데이 패키지",
    description:
      "일하면서 배우는 뉴질랜드 워킹홀리데이 준비 및 현지 적응 프로그램",
    details: [
      "비자 신청 및 준비 과정 안내",
      "현지 취업 정보 및 이력서 작성법",
      "생활 정착 서비스 및 숙소 연결",
      "4주 사전 교육 + 현지 서포트",
    ],
  },
  {
    id: 4,
    icon: <FiCompass />,
    title: "액티비티 영어 과정",
    description: "뉴질랜드의 아름다운 자연 속에서 즐기는 체험형 영어 학습 과정",
    details: [
      "주간 야외 액티비티 및 현장 학습",
      "원어민과 함께하는 문화 체험",
      "실생활 영어 사용 환경 제공",
      "2-8주 코스, 주 15시간 수업 + 액티비티",
    ],
  },
];

const testimonials = [
  {
    id: 1,
    name: "김영어",
    age: 23,
    city: "오클랜드",
    program: "일반 영어 과정",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    testimonial:
      "청라콩 영어회화 수업 덕분에 뉴질랜드 현지 생활에 빠르게 적응할 수 있었어요. 특히 발음과 청취 훈련이 실제 상황에서 큰 도움이 되었습니다!",
  },
  {
    id: 2,
    name: "이홀데이",
    age: 25,
    city: "웰링턴",
    program: "워킹홀리데이 패키지",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    testimonial:
      "워킹홀리데이 준비부터 현지 취업까지 체계적으로 도와주셔서 정말 감사합니다. 덕분에 6개월간 카페에서 일하며 영어 실력도 크게 향상되었어요!",
  },
  {
    id: 3,
    name: "박테스트",
    age: 22,
    city: "크라이스트처치",
    program: "IELTS 대비 과정",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    testimonial:
      "IELTS 점수가 5.5에서 7.0으로 올라 원하던 과정에 지원할 수 있게 되었습니다. 청라콩의 체계적인 시험 대비 프로그램이 큰 도움이 되었습니다.",
  },
];

const faqData = [
  {
    id: 1,
    question: "뉴질랜드 어학연수는 언제부터 준비하는 것이 좋나요?",
    answer:
      "일반적으로 출발 희망일로부터 최소 3-6개월 전에 준비를 시작하는 것이 좋습니다. 비자 신청, 어학원 등록, 항공권 및 숙소 예약 등의 과정이 필요합니다. 워킹홀리데이를 계획하신다면 비자 쿼터 및 신청 시기를 고려하여 더 일찍 준비하시는 것을 권장합니다.",
  },
  {
    id: 2,
    question: "영어 기초가 부족해도 어학연수가 가능한가요?",
    answer:
      "네, 가능합니다. 대부분의 뉴질랜드 어학원은 초급부터 고급까지 다양한 레벨의 수업을 제공합니다. 청라콩문화센터에서는 출발 전 기초 영어회화 과정을 통해 현지 적응에 필요한 기본 실력을 갖출 수 있도록 도와드립니다. 현지 도착 후에도 레벨 테스트를 통해 본인의 수준에 맞는 반에 배정받게 됩니다.",
  },
  {
    id: 3,
    question: "뉴질랜드 어학연수 비용은 얼마나 필요한가요?",
    answer:
      "어학연수 비용은 기간, 도시, 학원, 숙소 유형 등에 따라 달라집니다. 일반적으로 12주 기준으로 학비는 약 400-500만원, 숙소비(홈스테이)는 월 80-100만원, 생활비는 월 70-100만원 정도입니다. 청라콩문화센터에서는 상담 시 개인 예산에 맞는 맞춤형 플랜을 제안해드립니다. 또한 워킹홀리데이의 경우 현지 아르바이트로 생활비를 충당할 수 있는 방법도 안내해드립니다.",
  },
  {
    id: 4,
    question: "뉴질랜드 어학연수 비자는 어떻게 준비하나요?",
    answer:
      "어학연수 기간에 따라 무비자(최대 3개월), 방문비자(최대 9개월), 학생비자(6개월 이상)로 나뉩니다. 청라콩문화센터는 학생 상황에 맞는 최적의 비자 유형을 추천하고, 필요한 서류 준비와 신청 과정을 도와드립니다. 특히 워킹홀리데이 비자는 연령 제한(만 18-30세)과 쿼터가 있으므로 사전 상담을 통해 자격 요건을 확인하시는 것이 중요합니다.",
  },
  // {
  //   id: 5,
  //   question: "현지 숙소는 어떤 옵션이 있나요?",
  //   answer:
  //     "뉴질랜드에서는 주로 홈스테이, 플랫/쉐어하우스, 학생 기숙사 등의 숙소 옵션이 있습니다. 홈스테이는 현지 가정에서 지내며 식사도 제공받을 수 있어 어학연수 초기에 추천드립니다. 플랫/쉐어하우스는 다른 학생들과 주거 공간을 공유하는 형태로 비용이 저렴합니다. 청라콩문화센터는 학생의 성향과 예산에 맞는 숙소를 연결해드리고, 현지 도착 후 숙소 변경이 필요할 경우에도 지원해드립니다.",
  // },
];

const StudyAbroad = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <div className={`${styles.container} ${isVisible ? styles.visible : ""}`}>
      {/* 헤더 섹션 */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <span className={styles.accentText}>뉴질랜드 어학연수</span>로
            글로벌 <br />
            경쟁력을 키우세요
          </h1>
          <p className={styles.subtitle}>
            청라콩문화센터가 당신의 성공적인 어학연수를 함께합니다
          </p>
          <div className={styles.headerButtons}>
            <Link to="/contact" className={styles.primaryButton}>
              <FiPhoneCall className={styles.buttonIcon} /> 상담 신청
            </Link>
            <button
              className={styles.secondaryButton}
              onClick={() => {
                const programsSection = document.getElementById("programs");
                programsSection.scrollIntoView({ behavior: "smooth" });
              }}
            >
              프로그램 보기
            </button>
          </div>
        </div>
      </header>

      {/* 소개 섹션 */}
      <section className={styles.introSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>뉴질랜드 어학연수의 장점</h2>
            <p className={styles.sectionSubtitle}>
              아름다운 자연과 안전한 환경에서 효과적으로 영어 실력을
              향상시키세요
            </p>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FiGlobe />
              </div>
              <h3 className={styles.featureTitle}>깨끗한 발음</h3>
              <p className={styles.featureDescription}>
                뉴질랜드식 영어는 발음이 <br />
                깨끗하고 명확하여 초보자도 이해하기 쉽습니다
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FiMap />
              </div>
              <h3 className={styles.featureTitle}>아름다운 자연환경</h3>
              <p className={styles.featureDescription}>
                수려한 자연경관 속에서 <br />
                영어를 배울 수 있습니다
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FiAward />
              </div>
              <h3 className={styles.featureTitle}>높은 교육 수준</h3>
              <p className={styles.featureDescription}>
                체계적인 커리큘럼으로 질 높은 교육을 받을 수 있습니다
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FiUsers />
              </div>
              <h3 className={styles.featureTitle}>다문화 환경</h3>
              <p className={styles.featureDescription}>
                다양한 국적의 학생들과 <br />
                교류하며 글로벌 네트워크를 형성할 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 뉴질랜드 정보 섹션 */}
      <section className={styles.countriesSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>뉴질랜드 어학연수 안내</h2>
            <p className={styles.sectionSubtitle}>
              현지 환경과 교육 시스템을 이해하고 최적의 어학연수 계획을 세우세요
            </p>
          </div>

          <div
            className={styles.countryContent}
            style={{ display: "grid", opacity: 1, transform: "translateY(0)" }}
          >
            <div className={styles.countryImageContainer}>
              <img
                src={newZealandData.image}
                alt="뉴질랜드 대표 이미지"
                className={styles.countryImage}
              />
              <div
                className={styles.countryOverlay}
                style={{ backgroundColor: newZealandData.accent + "20" }}
              ></div>
            </div>
            <div className={styles.countryDetails}>
              <h3
                className={styles.countryName}
                style={{ color: newZealandData.accent }}
              >
                {newZealandData.name}
              </h3>
              <p
                className={styles.countryDescription}
                style={{ fontSize: "0.9rem" }}
              >
                {newZealandData.shortDescription}
              </p>
              <ul className={styles.countryFeatures}>
                {newZealandData.features.map((feature, index) => (
                  <li key={index} className={styles.countryFeature}>
                    <FiCheck
                      className={styles.featureCheck}
                      style={{ color: newZealandData.accent }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              {/* <button
                onClick={() => setIsModalOpen(true)}
                className={styles.learnMoreButton}
                style={{ backgroundColor: newZealandData.accent }}
              >
                자세히 알아보기
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* 프로그램 소개 섹션 */}
      <section id="programs" className={styles.programsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>뉴질랜드 어학연수 프로그램</h2>
            <p className={styles.sectionSubtitle}>
              청라콩문화센터에서 제공하는 다양한 뉴질랜드 어학연수 과정을
              소개합니다
            </p>
          </div>

          <div className={styles.programsGrid}>
            {programData.map((program) => (
              <div key={program.id} className={styles.programCard}>
                <div className={styles.programIcon}>{program.icon}</div>
                <div className={styles.programContent}>
                  <h3 className={styles.programTitle}>{program.title}</h3>
                  <p className={styles.programDescription}>
                    {program.description}
                  </p>
                  <ul className={styles.programDetails}>
                    {program.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className={styles.faqSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>
            <p className={styles.sectionSubtitle}>
              뉴질랜드 어학연수에 관한 궁금증을 해결해 드립니다
            </p>
          </div>

          <div className={styles.faqContainer}>
            {faqData.map((faq) => (
              <div
                key={faq.id}
                className={`${styles.faqItem} ${
                  activeFaq === faq.id ? styles.activeFaq : ""
                }`}
              >
                <div
                  className={styles.faqQuestion}
                  onClick={() => toggleFaq(faq.id)}
                >
                  <h3>{faq.question}</h3>
                  <span className={styles.faqToggle}>
                    {activeFaq === faq.id ? "-" : "+"}
                  </span>
                </div>
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.ctaTitle}>
            뉴질랜드 어학연수, 청라콩과 함께 시작하세요
          </h2>
          <p className={styles.ctaText}>
            무료 레벨 테스트와 1:1 맞춤 상담을 통해 나에게 맞는 어학연수 계획을
            세워보세요
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.ctaButton}>
              상담 신청하기
            </Link>
            <a href="tel:01080061715" className={styles.ctaPhone}>
              <FiPhoneCall className={styles.phoneIcon} /> 010-8006-1715
            </a>
          </div>
        </div>
      </section>

      {/* 모달 컴포넌트 */}
      <NewZealandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default StudyAbroad;
