// components/modals/UserDetailModal.jsx
import React from "react";
import styles from "../../styles/AdminDashboard.module.css";

const UserDetailModal = ({ user, onClose, onEdit }) => {
  if (!user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>회원 상세 정보</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>
              {user.name ? user.name.charAt(0) : "?"}
            </div>
            <div className={styles.userBasicInfo}>
              <h3 className={styles.userName}>{user.name || "이름 없음"}</h3>
              <div className={styles.userStatus}>
                <span
                  className={`${styles.statusBadge} ${
                    user.status === "active"
                      ? styles.statusActive
                      : user.status === "inactive"
                      ? styles.statusInactive
                      : styles.statusDormant
                  }`}
                >
                  {user.status === "active"
                    ? "활성"
                    : user.status === "inactive"
                    ? "정지"
                    : "휴면"}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.userInfoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>이메일</div>
              <div className={styles.infoValue}>{user.email || "-"}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>연락처</div>
              <div className={styles.infoValue}>{user.phoneNumber || "-"}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>가입일</div>
              <div className={styles.infoValue}>
                {formatDate(user.createdAt)}
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>마지막 로그인</div>
              <div className={styles.infoValue}>
                {formatDate(user.lastLogin)}
              </div>
            </div>
          </div>

          <div className={styles.sectionTitle}>현재 수강 강의</div>
          <div className={styles.lecturesList}>
            {user.currentLectures && user.currentLectures.length > 0 ? (
              <ul className={styles.lecturesGrid}>
                {user.currentLectures.map((lecture, index) => (
                  <li key={index} className={styles.lectureItem}>
                    {lecture}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noData}>수강 중인 강의가 없습니다.</p>
            )}
          </div>

          <div className={styles.sectionTitle}>메모</div>
          <div className={styles.userNotes}>
            {user.notes ? (
              <p>{user.notes}</p>
            ) : (
              <p className={styles.noData}>등록된 메모가 없습니다.</p>
            )}
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={onClose}
          >
            닫기
          </button>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => onEdit && onEdit(user)}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
