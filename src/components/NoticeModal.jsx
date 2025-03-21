import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "../styles/NoticeModal.module.css";

const NoticeModal = ({ isOpen, notices, onClose }) => {
  const [activeNoticeIndex, setActiveNoticeIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [hideForToday, setHideForToday] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const modalRef = useRef(null);
  const imageRef = useRef(null);

  // 이미지 변경 - 프리로딩 추가
  const changeImage = useCallback((direction, currentIdx, urls) => {
    if (!urls || !urls.length) return;

    let newIndex;
    if (direction === "next") {
      newIndex = (currentIdx + 1) % urls.length;
    } else {
      newIndex = (currentIdx - 1 + urls.length) % urls.length;
    }

    // 다음 이미지 프리로딩
    if (urls[newIndex]) {
      const img = new Image();
      img.src = urls[newIndex];
    }

    setCurrentImageIndex(newIndex);
    setImageLoadError(false);
    setIsImageLoading(true);
  }, []);

  // 공지사항 변경 - 부드러운 전환 효과
  const changeNotice = useCallback((direction, currentIdx, allNotices) => {
    if (!allNotices || !allNotices.length) return;

    let newIndex;
    if (direction === "next") {
      newIndex = (currentIdx + 1) % allNotices.length;
    } else {
      newIndex = (currentIdx - 1 + allNotices.length) % allNotices.length;
    }

    setActiveNoticeIndex(newIndex);
    setCurrentImageIndex(0); // 공지사항 변경 시 이미지 인덱스 초기화
    setImageLoadError(false);
    setIsImageLoading(true);

    // 첫 번째 이미지 프리로딩
    if (allNotices[newIndex]?.imageUrl) {
      const imageUrl = Array.isArray(allNotices[newIndex].imageUrl)
        ? allNotices[newIndex].imageUrl[0]
        : allNotices[newIndex].imageUrl;

      if (imageUrl) {
        const img = new Image();
        img.src = imageUrl;
      }
    }
  }, []);

  // 모달 닫기 함수 - 체크박스 상태를 상위 컴포넌트로 전달
  const handleClose = useCallback(() => {
    // 체크박스 상태를 onClose 함수에 전달
    onClose(hideForToday);
  }, [hideForToday, onClose]);

  // 모달이 열리면 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // 키보드 이벤트 핸들러
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || !notices || notices.length === 0) return;

      const activeNotice = notices[activeNoticeIndex];
      const isImageArray = Array.isArray(activeNotice?.imageUrl);
      const imageUrls = isImageArray
        ? activeNotice?.imageUrl
        : [activeNotice?.imageUrl];

      switch (e.key) {
        case "Escape":
          handleClose();
          break;
        case "ArrowLeft":
          changeImage("prev", currentImageIndex, imageUrls);
          break;
        case "ArrowRight":
          changeImage("next", currentImageIndex, imageUrls);
          break;
        case "ArrowUp":
          if (e.ctrlKey) changeNotice("prev", activeNoticeIndex, notices);
          break;
        case "ArrowDown":
          if (e.ctrlKey) changeNotice("next", activeNoticeIndex, notices);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isOpen,
    currentImageIndex,
    activeNoticeIndex,
    notices,
    changeImage,
    changeNotice,
    handleClose,
  ]);

  // 터치 드래그 이벤트 핸들러 (모바일)
  const handleTouchStart = (e) => {
    // 한 손가락 터치만 처리
    if (e.touches.length === 1) {
      // 일반 스와이프용 x 좌표 저장
      setTouchStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = (e) => {
    if (!notices || notices.length === 0) return;

    const activeNotice = notices[activeNoticeIndex];
    const isImageArray = Array.isArray(activeNotice?.imageUrl);
    const imageUrls = isImageArray
      ? activeNotice?.imageUrl
      : activeNotice?.imageUrl
      ? [activeNotice.imageUrl]
      : [];

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // 50px 이상 스와이프해야 동작
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // 이미지가 여러 개라면 이미지 변경, 아니면 공지사항 변경
        if (isImageArray && imageUrls.length > 1) {
          changeImage("next", currentImageIndex, imageUrls);
        } else if (notices.length > 1) {
          changeNotice("next", activeNoticeIndex, notices);
        }
      } else {
        if (isImageArray && imageUrls.length > 1) {
          changeImage("prev", currentImageIndex, imageUrls);
        } else if (notices.length > 1) {
          changeNotice("prev", activeNoticeIndex, notices);
        }
      }
    }
  };

  // 이미지 로드 오류 처리
  const handleImageError = () => {
    setImageLoadError(true);
    setIsImageLoading(false);
  };

  // 이미지 로드 완료 처리
  const handleImageLoad = () => {
    setImageLoadError(false);
    setIsImageLoading(false);
  };

  // 공지사항이 없는 경우 처리
  if (!isOpen || !notices || notices.length === 0) {
    return null;
  }

  const activeNotice = notices[activeNoticeIndex];
  const isImageArray = Array.isArray(activeNotice?.imageUrl);
  const imageUrls = isImageArray
    ? activeNotice?.imageUrl
    : activeNotice?.imageUrl
    ? [activeNotice.imageUrl]
    : [];

  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="noticeModalTitle"
    >
      <div
        ref={modalRef}
        className={styles.modalContent}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* 닫기 버튼 */}
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="공지사항 닫기"
        >
          ✖️
        </button>

        {/* 이미지 영역 */}
        <div className={styles.imageContainer}>
          {imageLoadError || !imageUrls[currentImageIndex] ? (
            <div className={styles.placeholderImage}>
              <p>이미지를 불러올 수 없습니다</p>
            </div>
          ) : (
            <div className={styles.imageWrapper}>
              <img
                ref={imageRef}
                src={imageUrls[currentImageIndex]}
                alt={activeNotice.title || "공지사항 이미지"}
                className={styles.noticeImage}
                onError={handleImageError}
                onLoad={handleImageLoad}
                draggable="false"
              />
            </div>
          )}

          {/* 여러 이미지가 있을 경우에만 표시하는 화살표 */}
          {isImageArray && imageUrls.length > 1 && (
            <>
              <button
                className={`${styles.imageNavButton} ${styles.prevButton}`}
                onClick={() =>
                  changeImage("prev", currentImageIndex, imageUrls)
                }
                aria-label="이전 이미지"
              >
                ◀️
              </button>
              <button
                className={`${styles.imageNavButton} ${styles.nextButton}`}
                onClick={() =>
                  changeImage("next", currentImageIndex, imageUrls)
                }
                aria-label="다음 이미지"
              >
                ▶️
              </button>

              {/* 이미지 인디케이터 */}
              <div className={styles.imageIndicator}>
                {imageUrls.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicatorDot} ${
                      index === currentImageIndex ? styles.active : ""
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setImageLoadError(false);
                      setIsImageLoading(true);
                    }}
                    aria-label={`${index + 1}번 이미지로 이동`}
                    aria-current={index === currentImageIndex}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* 공지사항 내용 */}
        <div className={styles.noticeDetails}>
          <h3 className={styles.noticeTitle} id="noticeModalTitle">
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
          <div className={styles.noticeContent}>{activeNotice.content}</div>

          {/* 여러 공지가 있을 경우에만 표시 */}
          {notices.length > 1 && (
            <div className={styles.navigationButtons}>
              <button
                className={styles.navButton}
                onClick={() => changeNotice("prev", activeNoticeIndex, notices)}
                aria-label="이전 공지사항"
              >
                ◀ 이전 공지
              </button>
              <span className={styles.pageIndicator}>
                {activeNoticeIndex + 1} / {notices.length}
              </span>
              <button
                className={styles.navButton}
                onClick={() => changeNotice("next", activeNoticeIndex, notices)}
                aria-label="다음 공지사항"
              >
                다음 공지 ▶
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
              id="hideForTodayCheckbox"
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
