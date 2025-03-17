import React, { useState, useCallback } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "../styles/NoticeModal.module.css";

const NoticeModal = ({ isOpen, notices, onClose }) => {
  const [activeNoticeIndex, setActiveNoticeIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [hideForToday, setHideForToday] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);

  // 공지사항이 없는 경우 처리
  if (!isOpen || !notices || notices.length === 0) {
    return null;
  }

  const activeNotice = notices[activeNoticeIndex];
  const isImageArray = Array.isArray(activeNotice?.imageUrl);
  const imageUrls = isImageArray
    ? activeNotice?.imageUrl
    : [activeNotice?.imageUrl];

  // 이미지 변경
  const changeImage = (direction) => {
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
    } else {
      setCurrentImageIndex(
        (prev) => (prev - 1 + imageUrls.length) % imageUrls.length
      );
    }
    setImageLoadError(false);
  };

  // 공지사항 변경
  const changeNotice = (direction) => {
    if (direction === "next") {
      setActiveNoticeIndex((prev) => (prev + 1) % notices.length);
    } else {
      setActiveNoticeIndex(
        (prev) => (prev - 1 + notices.length) % notices.length
      );
    }
    setCurrentImageIndex(0); // 공지사항 변경 시 이미지 인덱스 초기화
    setImageLoadError(false);
  };

  // 터치 이벤트 처리
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // 50px 이상 스와이프해야 동작
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // 이미지가 여러 개라면 이미지 변경, 아니면 공지사항 변경
        if (isImageArray && imageUrls.length > 1) {
          changeImage("next");
        } else if (notices.length > 1) {
          changeNotice("next");
        }
      } else {
        if (isImageArray && imageUrls.length > 1) {
          changeImage("prev");
        } else if (notices.length > 1) {
          changeNotice("prev");
        }
      }
    }
  };

  // 이미지 로드 오류 처리
  const handleImageError = () => {
    setImageLoadError(true);
  };

  // 모달 닫기
  const handleClose = () => {
    // 체크박스가 선택된 경우 로컬 스토리지에 저장
    if (hideForToday) {
      const today = new Date();
      const expires = new Date(today);
      expires.setHours(23, 59, 59, 999); // 오늘 자정까지

      localStorage.setItem(
        "noticeModalLastClosed",
        JSON.stringify({
          date: today.toDateString(),
          expires: expires.getTime(),
        })
      );
    }

    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContent}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className={styles.closeButton} onClick={handleClose}>
          <FiX />
        </button>

        {/* 이미지 영역 */}
        <div className={styles.imageContainer}>
          {imageLoadError || !imageUrls[currentImageIndex] ? (
            <div className={styles.placeholderImage}>
              <p>이미지를 불러올 수 없습니다</p>
            </div>
          ) : (
            <img
              src={imageUrls[currentImageIndex]}
              alt={activeNotice.title}
              className={styles.noticeImage}
              onError={handleImageError}
            />
          )}

          {/* 여러 이미지가 있을 경우에만 표시하는 화살표 */}
          {isImageArray && imageUrls.length > 1 && (
            <>
              <button
                className={`${styles.imageNavButton} ${styles.prevButton}`}
                onClick={() => changeImage("prev")}
                aria-label="이전 이미지"
              >
                <FiChevronLeft />
              </button>
              <button
                className={`${styles.imageNavButton} ${styles.nextButton}`}
                onClick={() => changeImage("next")}
                aria-label="다음 이미지"
              >
                <FiChevronRight />
              </button>

              {/* 이미지 인디케이터 */}
              <div className={styles.imageIndicator}>
                {imageUrls.map((_, index) => (
                  <span
                    key={index}
                    className={`${styles.indicatorDot} ${
                      index === currentImageIndex ? styles.active : ""
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setImageLoadError(false);
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* 공지사항 내용 */}
        <div className={styles.noticeDetails}>
          <h3 className={styles.noticeTitle}>
            {activeNotice.urgent && (
              <span className={styles.urgentBadge}>중요</span>
            )}
            {activeNotice.title}
          </h3>
          <p className={styles.noticeDate}>
            {new Date(activeNotice.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className={styles.noticeContent}>{activeNotice.content}</p>
          {/* 여러 공지가 있을 경우에만 표시 */}
          {notices.length > 1 && (
            <div className={styles.navigationButtons}>
              <button
                className={styles.navButton}
                onClick={() => changeNotice("prev")}
              >
                <FiChevronLeft /> 이전 공지
              </button>
              <button
                className={styles.navButton}
                onClick={() => changeNotice("next")}
              >
                다음 공지 <FiChevronRight />
              </button>
            </div>
          )}
          {/* 체크박스: 오늘 하루 동안 보지 않기 */}
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={hideForToday}
              onChange={() => setHideForToday(!hideForToday)}
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>
              오늘 하루 동안 보지 않기
            </span>
          </label>

          {/* 하단 버튼 영역 */}
          <div className={styles.buttonContainer}>
            {/* 확인 버튼 */}
            <button className={styles.closeModalButton} onClick={handleClose}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;
