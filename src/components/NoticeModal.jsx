import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiX, FiBell, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "../styles/NoticeModal.module.css";

const NoticeModal = ({ isOpen, notices, onClose }) => {
  const [activeNotice, setActiveNotice] = useState(0);
  const [doNotShowToday, setDoNotShowToday] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // 모달 열릴 때 애니메이션 효과
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 모달 열릴 때 스크롤 방지
    }
    return () => {
      document.body.style.overflow = "auto"; // 모달 닫힐 때 스크롤 복원
    };
  }, [isOpen]);

  // 모달 닫기 함수
  const closeModal = () => {
    // 오늘 하루 보지 않기 설정 시 로컬 스토리지에 저장
    if (doNotShowToday) {
      localStorage.setItem("noticeModalLastClosed", new Date().toDateString());
    }
    onClose();
  };

  // 다음/이전 공지 버튼 핸들러
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveNotice((prev) => (prev > 0 ? prev - 1 : notices.length - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveNotice((prev) => (prev < notices.length - 1 ? prev + 1 : 0));
    setTimeout(() => setIsAnimating(false), 300);
  };

  // 모달이 열려있지 않거나 공지사항이 없으면 렌더링하지 않음
  if (!isOpen || !notices || notices.length === 0) {
    return null;
  }

  const currentNotice = notices[activeNotice];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div className={styles.noticeInfo}>
            <FiBell className={styles.bellIcon} />
            <h3>공지사항</h3>
            {notices.length > 1 && (
              <span className={styles.counter}>
                {activeNotice + 1}/{notices.length}
              </span>
            )}
          </div>
          <button
            className={styles.closeButton}
            onClick={closeModal}
            aria-label="닫기"
          >
            <FiX />
          </button>
        </div>

        <div
          className={`${styles.modalContent} ${
            isAnimating ? styles.fadeTransition : ""
          }`}
        >
          <h4 className={styles.noticeTitle}>
            {currentNotice.urgent && (
              <span className={styles.urgentBadge}>중요</span>
            )}
            {currentNotice.title}
          </h4>
          <p className={styles.noticeDate}>
            {new Date(currentNotice.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* 포스터/이미지 표시 영역 */}
          {currentNotice.imageUrl && (
            <div className={styles.posterContainer}>
              <img
                src={currentNotice.imageUrl}
                alt={`${currentNotice.title} 포스터`}
                className={styles.posterImage}
              />
            </div>
          )}

          <div className={styles.noticeContent}>{currentNotice.content}</div>
          <div className={styles.modalActions}>
            <Link
              to={currentNotice.link}
              className={styles.detailsButton}
              onClick={closeModal}
            >
              자세히 보기
            </Link>
          </div>
        </div>

        {notices.length > 1 && (
          <div className={styles.modalNav}>
            <button className={styles.navButton} onClick={handlePrev}>
              <FiChevronLeft className={styles.navIcon} /> 이전
            </button>
            <button className={styles.navButton} onClick={handleNext}>
              다음 <FiChevronRight className={styles.navIcon} />
            </button>
          </div>
        )}

        <div className={styles.modalFooter}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={doNotShowToday}
              onChange={() => setDoNotShowToday(!doNotShowToday)}
            />
            <span className={styles.checkboxText}>
              오늘 하루 이 창 보지 않기
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;
