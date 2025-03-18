import React, { useState, useEffect } from "react";
import styles from "../../styles/AdminDashboard.module.css";

const UserEditModal = ({ user, onClose, onSave, isSubmitting, programs }) => {
  const [editedUser, setEditedUser] = useState({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    status: "active",
    currentLectures: [],
    notes: "",
  });

  // 프로그램 데이터에서 강의 목록 추출
  const lectureOptions = programs
    ? programs.map((program) => program.title)
    : [];

  // 초기 데이터 설정
  useEffect(() => {
    if (user) {
      setEditedUser({
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        status: user.status || "active",
        currentLectures: user.currentLectures || [],
        notes: user.notes || "",
      });
    }
  }, [user]);

  // 모달이 열려있지 않으면 렌더링하지 않음
  if (!user) return null;

  // 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 강의 체크박스 변경 처리
  const handleLectureChange = (e) => {
    const { value, checked } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      currentLectures: checked
        ? [...prev.currentLectures, value]
        : prev.currentLectures.filter((item) => item !== value),
    }));
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedUser);
  };

  // 카테고리별로 강의 분류
  const categorizedLectures = lectureOptions.reduce((acc, title) => {
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
          <h2 className={styles.modalTitle}>회원 정보 수정</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedUser.name}
                  onChange={handleChange}
                  className={styles.formControl}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                  className={styles.formControl}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phoneNumber" className={styles.formLabel}>
                  연락처
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={editedUser.phoneNumber}
                  onChange={handleChange}
                  className={styles.formControl}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="status" className={styles.formLabel}>
                  상태
                </label>
                <select
                  id="status"
                  name="status"
                  value={editedUser.status}
                  onChange={handleChange}
                  className={styles.formControl}
                >
                  <option value="active">활성</option>
                  <option value="inactive">정지</option>
                  <option value="dormant">휴면</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>현재 수강 강의</label>

              {/* 카테고리별로 강의 분류하여 표시 */}
              {Object.entries(categorizedLectures).map(
                ([category, lectures]) => (
                  <div key={category} className={styles.lectureCategory}>
                    <h4 className={styles.categoryTitle}>{category}</h4>
                    <div className={styles.checkboxGrid}>
                      {lectures.map((lecture) => (
                        <div key={lecture} className={styles.checkboxItem}>
                          <input
                            type="checkbox"
                            id={`lecture-${lecture}`}
                            value={lecture}
                            checked={editedUser.currentLectures.includes(
                              lecture
                            )}
                            onChange={handleLectureChange}
                          />
                          <label htmlFor={`lecture-${lecture}`}>
                            {lecture}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="notes" className={styles.formLabel}>
                메모
              </label>
              <textarea
                id="notes"
                name="notes"
                value={editedUser.notes}
                onChange={handleChange}
                className={styles.formTextarea}
                rows="4"
              />
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={onClose}
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
