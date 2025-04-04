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
import ApplyModal from "../components/ApplyModal"; // ApplyModal 임포트 추가
import ReactDOM from "react-dom"; // Portal 생성을 위한 ReactDOM 임포트

const newZealandData = {
  id: 1,
  name: "뉴질랜드",
  image:
    "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  shortDescription:
    "아름다운 자연환경과 친절한 현지인들 속에서\n실용적인 영어를 배울 수 있는 나라",
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
      "일상 회화부터 비즈니스 영어까지\n실용적인 영어 능력을 키우는 과정",
    details: [
      "원어민 강사의 소그룹 집중 수업",
      "수준별 맞춤형 커리큘럼",
      "실생활 중심의 회화 훈련",
      "4-12주 코스, 주 15-25시간",
    ],
  },
  {
    id: 2,
    icon: <FiBookOpen />,
    title: "시험 대비 과정",
    description:
      "IELTS, OET 등 뉴질랜드 진학 및\n이민에 필요한 영어 시험 대비 과정",
    details: [
      "시험별 특화된 전략 및 문제 풀이",
      "모의고사 및 개인별 피드백 제공",
      "시험 출제 경향 분석 및 대비",
      "8-12주 집중 과정",
    ],
  },
  {
    id: 3,
    icon: <FiFlag />,
    title: "워킹홀리데이 패키지",
    description:
      "일하면서 배우는 뉴질랜드 워킹홀리데이\n준비 및 현지 적응 프로그램",
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
    description:
      "뉴질랜드의 아름다운 자연 속에서\n즐기는 체험형 영어 학습 과정",
    details: [
      "주간 야외 액티비티 및 현장 학습",
      "원어민과 함께하는 문화 체험",
      "실생활 영어 사용 환경 제공",
      "2-8주 과정, 액티비티 포함",
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
      "청라콩 영어회화 수업 덕분에 뉴질랜드 현지 생활에\n빠르게 적응할 수 있었어요. 특히 발음과 청취 훈련이\n실제 상황에서 큰 도움이 되었습니다!",
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
      "워킹홀리데이 준비부터 현지 취업까지 체계적으로\n도와주셔서 정말 감사합니다. 덕분에 6개월간 카페에서\n일하며 영어 실력도 크게 향상되었어요!",
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
      "IELTS 점수가 5.5에서 7.0으로 올라 원하던 과정에\n지원할 수 있게 되었습니다. 청라콩의 체계적인 시험 대비\n프로그램이 큰 도움이 되었습니다.",
  },
];

const faqData = [
  {
    id: 1,
    question: "어학연수 준비는 언제부터 해야 하나요?",
    answer:
      "일반적으로 출발 희망일로부터 최소 3-6개월 전에\n준비를 시작하는 것이 좋습니다. 비자 신청, 어학원 등록,\n항공권 및 숙소 예약 등의 과정이 필요합니다.\n\n워킹홀리데이를 계획하신다면 비자 쿼터 및 신청 시기를\n고려하여 더 일찍 준비하시는 것을 권장합니다.",
  },
  {
    id: 2,
    question: "영어 기초가 부족해도 가능한가요?",
    answer:
      "네, 가능합니다. 대부분의 뉴질랜드 어학원은 초급부터\n고급까지 다양한 레벨의 수업을 제공합니다.\n\n청라콩문화센터에서는 출발 전 기초 영어회화 과정을 통해\n현지 적응에 필요한 기본 실력을 갖출 수 있도록 도와드립니다.\n\n현지 도착 후에도 레벨 테스트를 통해 본인의 수준에\n맞는 반에 배정받게 됩니다.",
  },
  {
    id: 3,
    question: "어학연수 비용은 얼마나 필요한가요?",
    answer:
      "어학연수 비용은 기간, 도시, 학원, 숙소 유형 등에 따라\n달라집니다. 일반적으로 12주 기준으로 학비는 약 400-500만원,\n숙소비(홈스테이)는 월 80-100만원, 생활비는 월 70-100만원 정도입니다.\n\n청라콩문화센터에서는 상담 시 개인 예산에 맞는 맞춤형\n플랜을 제안해드립니다. 또한 워킹홀리데이의 경우 현지\n아르바이트로 생활비를 충당할 수 있는 방법도 안내해드립니다.",
  },
  {
    id: 4,
    question: "어학연수 비자는 어떻게 준비하나요?",
    answer:
      "어학연수 기간에 따라 무비자(최대 3개월), 방문비자(최대 9개월),\n학생비자(6개월 이상)로 나뉩니다.\n\n청라콩문화센터는 학생 상황에 맞는 최적의 비자 유형을\n추천하고, 필요한 서류 준비와 신청 과정을 도와드립니다.\n\n특히 워킹홀리데이 비자는 연령 제한(만 18-30세)과 쿼터가\n있으므로 사전 상담을 통해 자격 요건을 확인하시는 것이 중요합니다.",
  },
];

// Modal Portal 컴포넌트 - React Portal을 사용해 body에 직접 모달 렌더링
const ModalPortal = ({ children }) => {
  // body에 직접 추가할 DOM 요소 생성
  const modalRoot =
    document.getElementById("modal-root") || document.createElement("div");

  useEffect(() => {
    // 최초 마운트 시 modalRoot가 없다면 생성하고 body에 추가
    if (!document.getElementById("modal-root")) {
      modalRoot.id = "modal-root";
      document.body.appendChild(modalRoot);
    }

    // 컴포넌트 언마운트 시 정리 (선택적)
    return () => {
      if (modalRoot.childNodes.length === 0) {
        document.body.removeChild(modalRoot);
      }
    };
  }, []);

  // ReactDOM.createPortal을 사용해 자식 요소를 modalRoot에 렌더링
  return ReactDOM.createPortal(children, modalRoot);
};

const StudyAbroad = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  // 개선된 ApplyModal 열기 함수
  const openApplyModal = (e) => {
    e.preventDefault();

    // 모달 열기만 수행 (Portal로 렌더링하므로 스크롤 위치 상관없음)
    setIsApplyModalOpen(true);

    // 모달이 열릴 때 스크롤 방지
    document.body.style.overflow = "hidden";
  };

  // ApplyModal 닫기 함수
  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // 신청 완료 처리 함수
  const handleApplySubmit = (formData) => {
    console.log("신청 완료:", formData);
    setIsApplyModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // 컴포넌트가 언마운트될 때 스크롤 상태 복원 확보
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={`${styles.container} ${isVisible ? styles.visible : ""}`}>
      {/* 헤더 섹션 */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <span className={styles.accentText}>뉴질랜드 어학연수</span>로
            글로벌 경쟁력을 키우세요
          </h1>
          <p className={styles.subtitle}>
            청라콩문화센터가 당신의 성공적인 어학연수를 함께합니다
          </p>
          <div className={styles.headerButtons}>
            <a
              href="#"
              onClick={openApplyModal}
              className={styles.primaryButton}
            >
              <FiPhoneCall className={styles.buttonIcon} /> 수강 신청
            </a>
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
                뉴질랜드식 영어는 발음이 깨끗하고 명확하여 초보자도 이해하기
                쉽습니다
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FiMap />
              </div>
              <h3 className={styles.featureTitle}>아름다운 자연환경</h3>
              <p className={styles.featureDescription}>
                수려한 자연경관 속에서 영어를 배울 수 있습니다
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FiAward />
              </div>
              <h3 className={styles.featureTitle}>높은 교육 수준</h3>
              <p className={styles.featureDescription}>
                체계적인 커리큘럼으로 <br /> 질 높은 교육을 받을 수 있습니다
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FiUsers />
              </div>
              <h3 className={styles.featureTitle}>다문화 환경</h3>
              <p className={styles.featureDescription}>
                다양한 국적의 학생들과 교류하며 글로벌 네트워크를 형성할 수
                있습니다
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
              <p className={styles.countryDescription}>
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
                      <li key={index} className={styles.programDetail}>
                        {detail}
                      </li>
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
            <a href="#" onClick={openApplyModal} className={styles.ctaButton}>
              상담 신청하기
            </a>
            <a href="tel:01080061715" className={styles.ctaPhone}>
              <FiPhoneCall className={styles.phoneIcon} /> 010-8006-1715
            </a>
          </div>
        </div>
      </section>

      {/* 모달 컴포넌트들 */}
      <NewZealandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* React Portal을 사용하여 body에 직접 모달 렌더링 - 항상 최상단에 표시 */}
      {isApplyModalOpen && (
        <ModalPortal>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 99999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(3px)",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                width: "100%",
                maxWidth: "600px",
                maxHeight: "90vh",
                overflow: "auto",
                margin: "0 20px",
                position: "relative",
              }}
            >
              <ApplyModal
                isOpen={isApplyModalOpen}
                onClose={closeApplyModal}
                onSubmit={handleApplySubmit}
              />
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
};

export default StudyAbroad;
