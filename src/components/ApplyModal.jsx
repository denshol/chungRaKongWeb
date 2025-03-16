import React, { useState } from "react";
import {
  FiUser,
  FiPhone,
  FiMessageSquare,
  FiX,
  FiClock,
  FiUsers,
} from "react-icons/fi";
import axios from "axios";
import styles from "../styles/ApplyModal.module.css";

const ApplyModal = ({ isOpen, onClose, onSubmit, programTitle }) => {
  const initialProgramTitle = programTitle || "프로그램 제목 없음";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    preferredTime: "", // 선택사항: 선호 시간대
    companions: "0", // 기본값: 없음 (혼자 참석)
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
      errors.name = "이름을 입력해주세요.";
    }

    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const plainPhone = formData.phone.replace(/-/g, "");
    if (!plainPhone || !phoneRegex.test(plainPhone)) {
      errors.phone = "유효한 전화번호를 입력해주세요.";
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

    // 임시 성공 처리로 변경 (실제 API 호출 주석 처리)
    setTimeout(() => {
      console.log("제출된 데이터:", formData);
      onSubmit(formData);
      onClose();
      setLoading(false);
    }, 1000);

    // API 서버 문제가 해결된 후에 아래 코드 주석 해제

    try {
      const apiUrl =
        process.env.REACT_APP_API_URL || "https://chungrakongback.onrender.com";
      console.log("API URL:", apiUrl);
      console.log("보내는 데이터:", formData);

      const response = await axios.post(
        `${apiUrl}/api/applications`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("응답 데이터:", response.data);

      if (response.data) {
        onSubmit(formData);
        onClose();
      }
    } catch (err) {
      console.error("신청 실패 상세 정보:", err);
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

        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>프로그램 신청</h2>
          <p className={styles.modalSubtitle}>{formData.programTitle}</p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} noValidate className={styles.simpleForm}>
          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>
              <FiUser />
            </div>
            <input
              type="text"
              name="name"
              placeholder="이름"
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
              <FiPhone />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="전화번호"
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
            <div className={styles.inputIcon}>
              <FiClock />
            </div>
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="">선호하는 시간대 (선택사항)</option>
              <option value="평일 오전">평일 오전</option>
              <option value="평일 오후">평일 오후</option>
              <option value="평일 저녁">평일 저녁</option>
              <option value="주말">주말</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>
              <FiUsers />
            </div>
            <select
              name="companions"
              value={formData.companions}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="0">혼자 참석</option>
              <option value="1">1명과 함께</option>
              <option value="2+">2명 이상과 함께</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputIcon} style={{ top: "24px" }}>
              <FiMessageSquare />
            </div>
            <textarea
              name="message"
              placeholder="남기실 말씀 (선택사항)"
              value={formData.message}
              onChange={handleChange}
              className={`${styles.input} ${styles.textarea}`}
              rows="2"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
