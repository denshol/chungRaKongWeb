// src/components/auth/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { authAPI } from "../../services/api";
import styles from "../../styles/Register.module.css";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaImage } from "react-icons/fa";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("이미지 크기는 5MB 이하만 가능합니다.");
        return;
      }

      // 이미지 파일 타입 체크
      if (!file.type.startsWith("image/")) {
        setError("이미지 파일만 업로드 가능합니다.");
        return;
      }

      setProfileImage(file);

      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    // 이름 유효성 검사
    if (!formData.name.trim()) {
      setError("이름을 입력해주세요.");
      return false;
    }

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return false;
    }

    // 비밀번호 유효성 검사
    if (formData.password.length < 6) {
      setError("비밀번호는 최소 6자리 이상이어야 합니다.");
      return false;
    }

    // 전화번호 유효성 검사 (선택 사항)
    if (formData.phone) {
      const phoneRegex = /^[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}$/;
      if (!phoneRegex.test(formData.phone)) {
        setError("유효한 전화번호 형식이 아닙니다.");
        return false;
      }
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // FormData 객체 생성
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("email", formData.email);
      dataToSend.append("password", formData.password);
      if (formData.phone) {
        dataToSend.append("phone", formData.phone);
      }
      if (profileImage) {
        dataToSend.append("profileImage", profileImage);
      }

      // API 호출
      const data = await authAPI.register(dataToSend);

      // 로그인 처리
      login(data.user, data.token);

      setSuccess("회원가입이 완료되었습니다!");

      // 마이페이지로 리다이렉트
      setTimeout(() => navigate("/mypage"), 1000);
    } catch (error) {
      setError(error.message || "회원가입 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h2 className={styles.registerTitle}>회원가입</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}

        <form onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">
              <FaUser className={styles.icon} /> 이름
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="이름을 입력하세요"
              value={formData.name}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phone">
              <FaPhone className={styles.icon} /> 전화번호
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="전화번호를 입력하세요"
              value={formData.phone}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">
              <FaEnvelope className={styles.icon} /> Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">
              <FaLock className={styles.icon} /> 비밀번호
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="비밀번호를 입력하세요 (6자 이상)"
              value={formData.password}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="profileImage">
              <FaImage className={styles.icon} /> 프로필 이미지
            </label>
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              onChange={handleFileChange}
              className={styles.inputField}
              accept="image/*"
            />
            {previewImage && (
              <div className={styles.imagePreview}>
                <img
                  src={previewImage}
                  alt="프로필 미리보기"
                  className={styles.previewImage}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className={styles.registerButton}
            disabled={loading}
          >
            {loading ? "처리 중..." : "가입하기"}
          </button>
        </form>

        <div className={styles.loginLink}>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
