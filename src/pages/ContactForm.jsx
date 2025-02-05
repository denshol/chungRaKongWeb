import React, { useState } from "react";
import styles from "../styles/ContactForm.module.css"; // ✅ CSS 모듈 적용

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // ✅ 요청 중 상태 관리

  // ✅ 입력값 변경 핸들러 최적화
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ 문의 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://chungrakongback.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("Response:", response);

      if (response.ok) {
        alert("문의가 접수되었습니다");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        const error = await response.json();
        console.error("Error:", error);
        alert(error.message || "오류가 발생했습니다");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("서버와의 통신 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h1>문의하기</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>연락처</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>제목</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>문의내용</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          disabled={
            loading ||
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.subject ||
            !formData.message
          }
        >
          {loading ? "문의 접수 중..." : "문의하기"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
