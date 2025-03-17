import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import styles from "../styles/StudyAbroad.module.css"; // CSS 모듈 임포트

const NewZealandModal = ({ isOpen, onClose }) => {
  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // ESC 키로 모달 닫기
    const handleEscKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: "49.5%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "90vh",
        }}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <FiX />
        </button>

        <div className={styles.modalHeader}>
          <h2>뉴질랜드 어학연수 상세 정보</h2>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.modalImageContainer}>
            <img
              src="https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="뉴질랜드 풍경"
              className={styles.modalImage}
            />
          </div>

          <div className={styles.modalTextContent}>
            <h3>뉴질랜드 어학연수의 특징</h3>
            <p>
              뉴질랜드는 세계적으로 인정받는 교육 시스템과 깨끗한 발음의 영어,
              안전한 환경으로 인해 한국 학생들에게 인기 있는 어학연수
              목적지입니다. 특히 다른 영어권 국가에 비해 상대적으로 경제적인
              비용과 워킹홀리데이 비자를 통한 일과 학습의 병행이 가능하다는
              장점이 있습니다.
            </p>
          </div>
        </div>

        <h3 style={{ padding: "0 30px", marginBottom: "15px" }}>주요 정보</h3>
        <div className={styles.infoGrid} style={{ padding: "0 30px" }}>
          <div className={styles.infoItem}>
            <h4>주요 어학연수 도시</h4>
            <p>오클랜드, 웰링턴, 크라이스트처치, 퀸스타운</p>
          </div>
          <div className={styles.infoItem}>
            <h4>추천 연수 기간</h4>
            <p>단기: 4-12주 / 장기: 6개월-1년</p>
          </div>
          <div className={styles.infoItem}>
            <h4>예상 비용 (12주 기준)</h4>
            <p>학비: 400-500만원 / 숙소: 240-300만원 / 생활비: 210-300만원</p>
          </div>
          <div className={styles.infoItem}>
            <h4>숙박 옵션</h4>
            <p>홈스테이, 플랫/쉐어하우스, 학생 기숙사</p>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.primaryButton}
            onClick={() => {
              onClose();
              setTimeout(() => {
                const programsSection = document.getElementById("programs");
                if (programsSection)
                  programsSection.scrollIntoView({ behavior: "smooth" });
              }, 300);
            }}
          >
            프로그램 보기
          </button>
          <button className={styles.secondaryButton} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewZealandModal;
