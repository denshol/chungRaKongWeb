import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import styles from "../styles/SuccessModal.module.css";

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <FaCheckCircle className={styles.modalIcon} />
        <h2 className={styles.modalTitle}>신청이 완료되었습니다!</h2>
        <p className={styles.modalMessage}>
          프로그램 신청이 성공적으로 접수되었습니다. 감사합니다!
        </p>
        <button className={styles.modalButton} onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
