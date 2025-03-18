// components/modals/DeleteConfirmModal.jsx
import React from "react";
import styles from "../../styles/AdminDashboard.module.css";

const DeleteConfirmModal = ({
  title = "삭제 확인",
  message = "정말 삭제하시겠습니까?",
  onCancel,
  onConfirm,
  isSubmitting,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} ${styles.confirmModal}`}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.closeButton} onClick={onCancel}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <p className={styles.confirmMessage}>{message}</p>
        </div>
        <div className={styles.modalFooter}>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={onCancel}
            disabled={isSubmitting}
          >
            취소
          </button>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
