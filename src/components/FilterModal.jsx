import React, { useState } from "react";
import styles from "../../styles/AdminDashboard.module.css";

const FilterModal = ({
  isOpen,
  onClose,
  onApply,
  programs,
  initialFilters = {
    status: [],
    joinDateStart: "",
    joinDateEnd: "",
    lastLoginStart: "",
    lastLoginEnd: "",
    currentLectures: [],
  },
}) => {
  const [filters, setFilters] = useState(initialFilters);

  // 프로그램 데이터에서 강의 목록 추출
  const currentLectureOptions = programs
    ? programs.map((program) => program.title)
    : [];

  // 입력 값 변경 처리
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFilters((prev) => {
        const currentArray = prev[name] || [];
        return {
          ...prev,
          [name]: checked
            ? [...currentArray, value]
            : currentArray.filter((item) => item !== value),
        };
      });
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 필터 초기화
  const handleReset = () => {
    setFilters({
      status: [],
      joinDateStart: "",
      joinDateEnd: "",
      lastLoginStart: "",
      lastLoginEnd: "",
      currentLectures: [],
    });
  };

  // 필터 적용
  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  // 모달이 열려있지 않으면 렌더링하지 않음
  if (!isOpen) return null;

  // 카테고리별로 강의 분류
  const categorizedLectures = currentLectureOptions.reduce((acc, title) => {
    const program = programs.find((p) => p.title === title);
    if (program) {
      const category = program.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(title);
    }
    return acc;
  }, {});

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>고급 필터</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          {/* 상태 필터 */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>회원 상태</label>
            <div className={styles.checkboxGrid}>
              {[
                { value: "active", label: "활성" },
                { value: "inactive", label: "정지" },
                { value: "dormant", label: "휴면" },
              ].map((status) => (
                <div key={status.value} className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    id={`status-${status.value}`}
                    name="status"
                    value={status.value}
                    checked={filters.status.includes(status.value)}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor={`status-${status.value}`}>
                    {status.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* 현재 듣는 강의 필터 - 카테고리별로 구분 */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>현재 듣는 강의</label>

            {Object.entries(categorizedLectures).map(([category, lectures]) => (
              <div key={category} className={styles.lectureCategory}>
                <h4 className={styles.categoryTitle}>{category}</h4>
                <div className={styles.checkboxGrid}>
                  {lectures.map((lecture) => (
                    <div key={lecture} className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        id={`lecture-${lecture}`}
                        name="currentLectures"
                        value={lecture}
                        checked={filters.currentLectures.includes(lecture)}
                        onChange={handleFilterChange}
                      />
                      <label htmlFor={`lecture-${lecture}`}>{lecture}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 가입일 필터 */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>가입일</label>
            <div className={styles.dateRangeInputs}>
              <input
                type="date"
                name="joinDateStart"
                value={filters.joinDateStart}
                onChange={handleFilterChange}
                className={styles.formControl}
              />
              <span>~</span>
              <input
                type="date"
                name="joinDateEnd"
                value={filters.joinDateEnd}
                onChange={handleFilterChange}
                className={styles.formControl}
              />
            </div>
          </div>

          {/* 최근 로그인 필터 */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>최근 로그인</label>
            <div className={styles.dateRangeInputs}>
              <input
                type="date"
                name="lastLoginStart"
                value={filters.lastLoginStart}
                onChange={handleFilterChange}
                className={styles.formControl}
              />
              <span>~</span>
              <input
                type="date"
                name="lastLoginEnd"
                value={filters.lastLoginEnd}
                onChange={handleFilterChange}
                className={styles.formControl}
              />
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={handleReset}
          >
            초기화
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={onClose}
          >
            취소
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleApply}
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
