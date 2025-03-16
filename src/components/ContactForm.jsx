import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ContactForm.module.css";

const ContactForm = ({ onSubmitSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // 입력값 변경 핸들러
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // 실시간 유효성 검사 오류 초기화
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  // 폼 유효성 검사
  const validateForm = useCallback(() => {
    const newErrors = {};

    // 이메일 형식 검사
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "유효한 이메일 주소를 입력해주세요";
    }

    // 전화번호 형식 검사 (한국 전화번호 형식)
    if (!/^01[016789]-?\d{3,4}-?\d{4}$/.test(formData.phone)) {
      newErrors.phone = "유효한 전화번호를 입력해주세요 (예: 010-1234-5678)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 폼 유효성 검사
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // 운영 환경에서 사용할 실제 API 호출 코드
      const response = await fetch(
        "https://chungrakongback.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        onSubmitSuccess(data);
        alert("문의가 성공적으로 등록되었습니다.");
      } else {
        const error = await response.json();
        alert(error.message || "문의 등록 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("서버와의 통신 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>문의 작성하기</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="이름을 입력하세요"
            autoComplete="name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="이메일을 입력하세요"
            autoComplete="email"
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">연락처</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="연락처를 입력하세요 (예: 010-1234-5678)"
            autoComplete="tel"
          />
          {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subject">제목</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="제목을 입력하세요"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">문의내용</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="문의 내용을 입력하세요"
            rows="6"
          />
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className={styles.cancelButton}
            disabled={loading}
          >
            취소
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={
              loading ||
              !formData.name ||
              !formData.email ||
              !formData.phone ||
              !formData.subject ||
              !formData.message
            }
          >
            {loading ? "등록 중..." : "등록하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
