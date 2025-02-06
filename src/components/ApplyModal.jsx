import React, { useState } from "react";
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiX } from "react-icons/fi";
import axios from "axios";
import styles from "../styles/ApplyModal.module.css";

const ApplyModal = ({ isOpen, onClose, onSubmit, programTitle }) => {
  // programTitle prop이 없으면 기본값을 사용
  const initialProgramTitle = programTitle
    ? programTitle
    : "프로그램 제목 없음";

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

  // 전화번호 입력 시 포맷팅 (숫자만 남기고 하이픈 추가)
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

  // 입력값 검증 함수
  const validateForm = () => {
    const errors = {};

    if (formData.name.trim().length < 2) {
      errors.name = "이름을 2자 이상 입력해주세요.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      errors.email = "유효한 이메일 주소를 입력해주세요.";
    }

    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const plainPhone = formData.phone.replace(/-/g, "");
    if (!phoneRegex.test(plainPhone)) {
      errors.phone = "유효한 전화번호를 입력해주세요.";
    }

    // programTitle은 서버에서 필수로 검사하므로 빈 값이면 오류 처리
    if (!formData.programTitle || formData.programTitle.trim() === "") {
      errors.programTitle = "프로그램 제목이 누락되었습니다.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const formatted = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // 해당 필드의 에러가 있다면 삭제
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("입력 정보를 다시 확인해주세요.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/applications",
        formData
      );
      console.log("신청 성공:", response.data);
      onSubmit(formData);
      onClose();
    } catch (err) {
      console.error("신청 실패:", err);
      setError(
        err.response?.data?.message || "신청 처리 중 오류가 발생했습니다."
      );
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

        <form onSubmit={handleSubmit}>
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
              required
              className={`${styles.input} ${
                fieldErrors.name ? styles.inputError : ""
              }`}
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
              required
              className={`${styles.input} ${
                fieldErrors.email ? styles.inputError : ""
              }`}
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
              required
              className={`${styles.input} ${
                fieldErrors.phone ? styles.inputError : ""
              }`}
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
