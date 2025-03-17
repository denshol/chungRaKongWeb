import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "../styles/NoticeModal.module.css";

const NoticeModal = ({ isOpen, notices, onClose }) => {
  const [activeNoticeIndex, setActiveNoticeIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isAutoSlide, setIsAutoSlide] = useState(true);

  const activeNotice = notices[activeNoticeIndex];
  const isImageArray = Array.isArray(activeNotice?.imageUrl);
  const imageUrls = isImageArray
    ? activeNotice?.imageUrl
    : [activeNotice?.imageUrl];

  // 자동 슬라이드
  useEffect(() => {
    let interval;

    // 3초마다 다음 이미지로
    if (isAutoSlide && isImageArray && imageUrls.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    activeNoticeIndex,
    currentImageIndex,
    isAutoSlide,
    imageUrls,
    isImageArray,
  ]);

  // 이미지 변경
  const changeImage = useCallback(
    (direction) => {
      setIsAutoSlide(false); // 수동 제어 시 자동 슬라이드 중지

      if (direction === "next") {
        setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
      } else {
        setCurrentImageIndex(
          (prev) => (prev - 1 + imageUrls.length) % imageUrls.length
        );
      }

      // 일정 시간 후 자동 슬라이드 재개
      setTimeout(() => setIsAutoSlide(true), 5000);
    },
    [imageUrls]
  );

  // 공지사항 변경
  const changeNotice = useCallback(
    (direction) => {
      if (direction === "next") {
        setActiveNoticeIndex((prev) => (prev + 1) % notices.length);
      } else {
        setActiveNoticeIndex(
          (prev) => (prev - 1 + notices.length) % notices.length
        );
      }
      setCurrentImageIndex(0); // 공지사항 변경 시 이미지 인덱스 초기화
    },
    [notices]
  );

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
        } else {
          changeNotice("next");
        }
      } else {
        if (isImageArray && imageUrls.length > 1) {
          changeImage("prev");
        } else {
          changeNotice("prev");
        }
      }
    }
  };

  if (!isOpen || !notices || notices.length === 0) {
    return null;
  }

  // 모달 닫기 및 로컬 스토리지에 날짜 저장
  const handleClose = () => {
    onClose();
    localStorage.setItem("noticeModalLastClosed", new Date().toDateString());
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

        {/* 공지사항 내비게이션 (여러 개일 때만 표시) */}
        {notices.length > 1 && (
          <div className={styles.noticeNav}>
            <button
              className={styles.navButton}
              onClick={() => changeNotice("prev")}
              aria-label="이전 공지사항"
            >
              <FiChevronLeft />
            </button>
            <div className={styles.noticeIndicator}>
              {notices.map((_, index) => (
                <span
                  key={index}
                  className={`${styles.noticeIndicatorDot} ${
                    index === activeNoticeIndex ? styles.active : ""
                  }`}
                  onClick={() => {
                    setActiveNoticeIndex(index);
                    setCurrentImageIndex(0);
                  }}
                ></span>
              ))}
            </div>
            <button
              className={styles.navButton}
              onClick={() => changeNotice("next")}
              aria-label="다음 공지사항"
            >
              <FiChevronRight />
            </button>
          </div>
        )}

        {/* 이미지 영역 */}
        <div className={styles.imageContainer}>
          {/* 이미지가 여러 개일 때만 내비게이션 표시 */}
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
                    className={`${styles.imageIndicatorDot} ${
                      index === currentImageIndex ? styles.active : ""
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setIsAutoSlide(false);
                      setTimeout(() => setIsAutoSlide(true), 5000);
                    }}
                  ></span>
                ))}
              </div>
            </>
          )}

          {/* 이미지 */}
          <img
            src={imageUrls[currentImageIndex]}
            alt={activeNotice.title}
            className={styles.noticeImage}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/800x400?text=이미지+없음";
              e.target.onerror = null;
            }}
          />
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

          {activeNotice.link && (
            <Link
              to={activeNotice.link}
              className={styles.noticeLink}
              onClick={handleClose}
            >
              자세히 보기
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;
