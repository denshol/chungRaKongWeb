import React, { useState } from "react";
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiX } from "react-icons/fi";
import axios from "axios";
import styles from "../styles/ApplyModal.module.css";

const ApplyModal = ({ isOpen, onClose, onSubmit, programTitle }) => {
  const initialProgramTitle = programTitle || "프로그램 제목 없음";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    programTitle: initialProgramTitle,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/[^\d]/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
      7,
      11
    )}`;
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = "이름을 2자 이상 입력해주세요.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      errors.email = "유효한 이메일 주소를 입력해주세요.";
    }

    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const plainPhone = formData.phone.replace(/-/g, "");
    if (!plainPhone || !phoneRegex.test(plainPhone)) {
      errors.phone = "유효한 전화번호를 입력해주세요.";
    }

    if (!formData.programTitle || formData.programTitle.trim() === "") {
      errors.programTitle = "프로그램 제목이 누락되었습니다.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "phone") {
      newValue = formatPhoneNumber(value);
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("입력 정보를 다시 확인해주세요.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // ApplyModal.js 파일에서
      const apiUrl =
        process.env.REACT_APP_API_URL || "https://chungrakongback.onrender.com";
      // "https://api.chungrakong.kr" 대신 Render 주소를 직접 사용
      const response = await axios.post(
        `${apiUrl}/api/applications`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        onSubmit(formData);
        onClose();
      }
    } catch (err) {
      console.error("신청 실패:", err);
      const errorMessage =
        err.response?.data?.message ||
        (err.code === "ERR_NETWORK"
          ? "네트워크 연결을 확인해주세요."
          : "신청 처리 중 오류가 발생했습니다.");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX size={24} />
        </button>

        <h2 className={styles.modalTitle}>프로그램 신청</h2>
        <p className={styles.modalSubtitle}>
          {formData.programTitle} 프로그램 신청 정보를 입력해주세요.
        </p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>
              <FiUser />
            </div>
            <input
              type="text"
              name="name"
              placeholder="이름을 입력해주세요"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${
                fieldErrors.name ? styles.inputError : ""
              }`}
              required
            />
            {fieldErrors.name && (
              <div className={styles.fieldError}>{fieldErrors.name}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>
              <FiMail />
            </div>
            <input
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${
                fieldErrors.email ? styles.inputError : ""
              }`}
              required
            />
            {fieldErrors.email && (
              <div className={styles.fieldError}>{fieldErrors.email}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>
              <FiPhone />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="전화번호를 입력해주세요"
              value={formData.phone}
              onChange={handleChange}
              className={`${styles.input} ${
                fieldErrors.phone ? styles.inputError : ""
              }`}
              required
            />
            {fieldErrors.phone && (
              <div className={styles.fieldError}>{fieldErrors.phone}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputIcon} style={{ top: "24px" }}>
              <FiMessageSquare />
            </div>
            <textarea
              name="message"
              placeholder="남기실 말씀을 입력해주세요"
              value={formData.message}
              onChange={handleChange}
              className={`${styles.input} ${styles.textarea}`}
              rows="4"
            />
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "처리중..." : "신청하기"}
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={loading}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
