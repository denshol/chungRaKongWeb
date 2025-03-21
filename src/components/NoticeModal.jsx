import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiMaximize,
  FiShare,
  FiBookmark,
  FiMoon,
  FiSun,
  FiZoomIn,
  FiZoomOut,
} from "react-icons/fi";
import styles from "../styles/NoticeModal.module.css";

const NoticeModal = ({ isOpen, notices, onClose }) => {
  const [activeNoticeIndex, setActiveNoticeIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [hideForToday, setHideForToday] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);
  const [bookmarkedNotices, setBookmarkedNotices] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);

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
    // 이미지 변경 시 줌 및 위치 초기화
    setImageZoom(1);
    setImagePosition({ x: 0, y: 0 });
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
    // 공지사항 변경 시 줌 및 위치 초기화
    setImageZoom(1);
    setImagePosition({ x: 0, y: 0 });

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

  // 모달이 열리면 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // 다크 모드 상태 불러오기
      const storedDarkMode = localStorage.getItem("noticeModalDarkMode");
      if (storedDarkMode) {
        setIsDarkMode(JSON.parse(storedDarkMode));
      }
      // 즐겨찾기 불러오기
      const storedBookmarks = localStorage.getItem("noticeModalBookmarks");
      if (storedBookmarks) {
        setBookmarkedNotices(JSON.parse(storedBookmarks));
      }
    } else {
      document.body.style.overflow = "auto";
      // 모달 닫을 때 상태 초기화
      setImageZoom(1);
      setImagePosition({ x: 0, y: 0 });
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
          // ESC 키를 누르면 확대 상태면 먼저 원래 크기로, 아니면 모달 닫기
          if (imageZoom > 1) {
            setImageZoom(1);
            setImagePosition({ x: 0, y: 0 });
          } else {
            handleClose();
          }
          break;
        case "ArrowLeft":
          // 확대 상태가 아닐 때만 이전 이미지로 이동
          if (imageZoom <= 1) {
            changeImage("prev", currentImageIndex, imageUrls);
          }
          break;
        case "ArrowRight":
          // 확대 상태가 아닐 때만 다음 이미지로 이동
          if (imageZoom <= 1) {
            changeImage("next", currentImageIndex, imageUrls);
          }
          break;
        case "ArrowUp":
          if (e.ctrlKey) changeNotice("prev", activeNoticeIndex, notices);
          break;
        case "ArrowDown":
          if (e.ctrlKey) changeNotice("next", activeNoticeIndex, notices);
          break;
        case "f":
          if (e.ctrlKey) {
            e.preventDefault();
            setIsFullscreen((prev) => !prev);
          }
          break;
        case "0":
          if (e.ctrlKey) {
            e.preventDefault();
            setImageZoom(1);
            setImagePosition({ x: 0, y: 0 });
          }
          break;
        case "+":
        case "=":
          if (e.ctrlKey) {
            e.preventDefault();
            handleZoom(true);
          }
          break;
        case "-":
          if (e.ctrlKey) {
            e.preventDefault();
            handleZoom(false);
          }
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
    imageZoom,
  ]);

  // 마우스 드래그 이벤트 핸들러
  const handleMouseDown = (e) => {
    // 이미지가 확대된 상태에서만 드래그 가능
    if (imageZoom <= 1) return;

    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });

    // 드래그 시작 시 커서 스타일 변경
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setImagePosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // 드래그 종료 시 커서 스타일 원래대로
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = "grab";
    }
  };

  // 터치 드래그 이벤트 핸들러 (모바일)
  const handleTouchStart = (e) => {
    // 한 손가락 터치만 처리
    if (e.touches.length === 1) {
      // 일반 스와이프용 x 좌표 저장
      setTouchStartX(e.touches[0].clientX);

      // 이미지가 확대된 상태에서는 드래그 모드로 전환
      if (imageZoom > 1) {
        setIsDragging(true);
        setDragStart({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        });
        e.preventDefault(); // 다른 이벤트 방지
      }
    }
  };

  const handleTouchMove = (e) => {
    // 확대 상태에서 드래그 중인 경우
    if (isDragging && imageZoom > 1 && e.touches.length === 1) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStart.x;
      const deltaY = touch.clientY - dragStart.y;

      setImagePosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      setDragStart({
        x: touch.clientX,
        y: touch.clientY,
      });

      e.preventDefault(); // 스크롤 방지
    }
  };

  const handleTouchEnd = (e) => {
    // 드래그 모드 종료
    if (isDragging) {
      setIsDragging(false);
      return;
    }

    // 확대 상태에서는 스와이프 처리 안함
    if (imageZoom > 1) return;

    if (!notices || notices.length === 0) return;

    const activeNotice = notices[activeNoticeIndex];
    const isImageArray = Array.isArray(activeNotice?.imageUrl);
    const imageUrls = isImageArray
      ? activeNotice?.imageUrl
      : [activeNotice?.imageUrl];

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

  // 이미지 확대/축소 시 커서 스타일 변경
  useEffect(() => {
    if (wrapperRef.current) {
      if (imageZoom > 1) {
        wrapperRef.current.style.cursor = "grab";
        wrapperRef.current.classList.add(styles.draggable);
      } else {
        wrapperRef.current.style.cursor = "default";
        wrapperRef.current.classList.remove(styles.draggable);
      }
    }
  }, [imageZoom]);

  // 이미지 로드 오류 처리
  const handleImageError = () => {
    setImageLoadError(true);
  };

  // 다크 모드 토글
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("noticeModalDarkMode", JSON.stringify(newMode));
  };

  // 전체화면 토글
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // 이미지 확대/축소
  const handleZoom = (zoomIn) => {
    if (zoomIn) {
      setImageZoom((prev) => Math.min(prev + 0.25, 3));
    } else {
      setImageZoom((prev) => {
        const newZoom = Math.max(prev - 0.25, 0.5);
        // 축소 시 1 이하로 내려가면 위치 초기화
        if (newZoom <= 1) {
          setImagePosition({ x: 0, y: 0 });
        }
        return newZoom;
      });
    }
  };

  // 모달 닫기
  const handleClose = useCallback(() => {
    // 체크박스가 선택된 경우 로컬 스토리지에 저장
    if (hideForToday && notices) {
      const today = new Date();
      const expires = new Date(today);
      expires.setHours(23, 59, 59, 999); // 오늘 자정까지

      localStorage.setItem(
        "noticeModalLastClosed",
        JSON.stringify({
          date: today.toDateString(),
          expires: expires.getTime(),
          noticeIds: notices.map((notice) => notice.id),
          hidden: true,
        })
      );
    } else {
      // 체크박스 선택이 안됐더라도 닫힘 상태는 저장 (새로고침 대응)
      localStorage.setItem(
        "noticeModalLastClosed",
        JSON.stringify({
          date: new Date().toDateString(),
          expires: new Date().getTime() + 600000, // 10분만 유효
          noticeIds: notices ? notices.map((notice) => notice.id) : [],
          hidden: true,
        })
      );
    }

    onClose();
  }, [hideForToday, notices, onClose]);

  // 즐겨찾기 토글
  const toggleBookmark = () => {
    if (!notices || notices.length === 0) return;

    const currentNoticeId = notices[activeNoticeIndex].id;
    let newBookmarks;

    if (bookmarkedNotices.includes(currentNoticeId)) {
      newBookmarks = bookmarkedNotices.filter((id) => id !== currentNoticeId);
    } else {
      newBookmarks = [...bookmarkedNotices, currentNoticeId];
    }

    setBookmarkedNotices(newBookmarks);
    localStorage.setItem("noticeModalBookmarks", JSON.stringify(newBookmarks));
  };

  // 공지사항 공유
  const shareNotice = async () => {
    if (!notices || notices.length === 0) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: notices[activeNoticeIndex].title,
          text: notices[activeNoticeIndex].content,
          url: window.location.href,
        });
      } catch (error) {
        console.log("공유하기 실패:", error);
      }
    } else {
      // 공유 API를 지원하지 않는 브라우저에서는 URL 복사
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("URL이 복사되었습니다."))
        .catch(() => alert("URL 복사에 실패했습니다."));
    }
  };

  // 이미지 위치 초기화
  const resetImagePosition = () => {
    setImagePosition({ x: 0, y: 0 });
  };

  // 공지사항이 없는 경우 처리
  if (!isOpen || !notices || notices.length === 0) {
    return null;
  }

  const activeNotice = notices[activeNoticeIndex];
  const isImageArray = Array.isArray(activeNotice?.imageUrl);
  const imageUrls = isImageArray
    ? activeNotice?.imageUrl
    : [activeNotice?.imageUrl];

  // 현재 공지가 북마크되었는지 확인
  const isCurrentNoticeBookmarked =
    activeNotice && bookmarkedNotices.includes(activeNotice.id);

  return (
    <div
      className={`${styles.modalOverlay} ${isDarkMode ? styles.darkMode : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="noticeModalTitle"
    >
      <div
        ref={modalRef}
        className={`
          ${styles.modalContent} 
          ${isFullscreen ? styles.fullscreen : ""} 
          ${isDarkMode ? styles.darkContent : ""}
        `}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 컨트롤 버튼 영역 */}
        <div className={styles.controlsContainer}>
          <button
            className={styles.controlButton}
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button
            className={styles.controlButton}
            onClick={toggleBookmark}
            aria-label={
              isCurrentNoticeBookmarked ? "즐겨찾기 해제" : "즐겨찾기에 추가"
            }
          >
            <FiBookmark
              className={isCurrentNoticeBookmarked ? styles.bookmarked : ""}
            />
          </button>
          <button
            className={styles.controlButton}
            onClick={shareNotice}
            aria-label="공지사항 공유하기"
          >
            <FiShare />
          </button>
          <button
            className={styles.controlButton}
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "전체화면 해제" : "전체화면으로 보기"}
          >
            <FiMaximize />
          </button>
          <button
            className={styles.controlButton}
            onClick={handleClose}
            aria-label="공지사항 닫기"
          >
            <FiX />
          </button>
        </div>

        {/* 이미지 영역 */}
        <div className={styles.imageContainer}>
          {imageLoadError || !imageUrls[currentImageIndex] ? (
            <div className={styles.placeholderImage}>
              <p>이미지를 불러올 수 없습니다</p>
            </div>
          ) : (
            <div
              ref={wrapperRef}
              className={styles.imageWrapper}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                className={styles.imageContent}
                style={{
                  transform: `scale(${imageZoom}) translate(${
                    imagePosition.x / imageZoom
                  }px, ${imagePosition.y / imageZoom}px)`,
                }}
              >
                <img
                  ref={imageRef}
                  src={imageUrls[currentImageIndex]}
                  alt={activeNotice.title}
                  className={styles.noticeImage}
                  onError={handleImageError}
                  draggable="false"
                />
              </div>

              {/* 확대 상태 안내 메시지 */}
              {imageZoom > 1 && (
                <div className={styles.dragMessage}>
                  드래그하여 이미지를 이동할 수 있습니다
                </div>
              )}

              {/* 이미지 확대/축소 컨트롤 */}
              <div className={styles.zoomControls}>
                <button
                  className={styles.zoomButton}
                  onClick={() => handleZoom(false)}
                  disabled={imageZoom <= 0.5}
                  aria-label="이미지 축소"
                >
                  <FiZoomOut />
                </button>
                <span className={styles.zoomLevel}>
                  {Math.round(imageZoom * 100)}%
                </span>
                <button
                  className={styles.zoomButton}
                  onClick={() => handleZoom(true)}
                  disabled={imageZoom >= 3}
                  aria-label="이미지 확대"
                >
                  <FiZoomIn />
                </button>
                {imageZoom > 1 && (
                  <button
                    className={styles.zoomButton}
                    onClick={resetImagePosition}
                    aria-label="이미지 위치 초기화"
                  >
                    <span className={styles.resetIcon}>↻</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 여러 이미지가 있을 경우에만 표시하는 화살표 */}
          {isImageArray && imageUrls.length > 1 && imageZoom <= 1 && (
            <>
              <button
                className={`${styles.imageNavButton} ${styles.prevButton}`}
                onClick={() =>
                  changeImage("prev", currentImageIndex, imageUrls)
                }
                aria-label="이전 이미지"
              >
                <FiChevronLeft />
              </button>
              <button
                className={`${styles.imageNavButton} ${styles.nextButton}`}
                onClick={() =>
                  changeImage("next", currentImageIndex, imageUrls)
                }
                aria-label="다음 이미지"
              >
                <FiChevronRight />
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
                      setImageZoom(1);
                      setImagePosition({ x: 0, y: 0 });
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
                <FiChevronLeft /> 이전 공지
              </button>
              <span className={styles.pageIndicator}>
                {activeNoticeIndex + 1} / {notices.length}
              </span>
              <button
                className={styles.navButton}
                onClick={() => changeNotice("next", activeNoticeIndex, notices)}
                aria-label="다음 공지사항"
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

        {/* 키보드 단축키 가이드 */}
        <div className={styles.keyboardShortcuts}>
          <button
            className={styles.shortcutsToggle}
            onClick={() => {
              const element = document.getElementById("keyboardShortcutsList");
              if (element) {
                element.classList.toggle(styles.showShortcuts);
              }
            }}
          >
            키보드 단축키
          </button>
          <ul id="keyboardShortcutsList" className={styles.shortcutsList}>
            <li>
              <kbd>←</kbd> <kbd>→</kbd> 이전/다음 이미지
            </li>
            <li>
              <kbd>Ctrl</kbd> + <kbd>↑</kbd> <kbd>↓</kbd> 이전/다음 공지사항
            </li>
            <li>
              <kbd>Ctrl</kbd> + <kbd>F</kbd> 전체화면 전환
            </li>
            <li>
              <kbd>Ctrl</kbd> + <kbd>0</kbd> 원본 크기로 보기
            </li>
            <li>
              <kbd>Esc</kbd> 닫기
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;
