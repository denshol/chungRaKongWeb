// Register.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styles from "../styles/Register.module.css";
// react-icons 임포트 (예: FontAwesome)
import { FaUser, FaPhone, FaEnvelope, FaLock, FaImage } from "react-icons/fa";

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 비밀번호 길이 검증
    if (formData.password.length < 6) {
      setError("비밀번호는 최소 6자리 이상이어야 합니다.");
      return;
    }

    try {
      // FormData 객체 사용 (파일 업로드 포함)
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("email", formData.email);
      dataToSend.append("password", formData.password);
      dataToSend.append("phone", formData.phone);
      if (profileImage) {
        dataToSend.append("profileImage", profileImage);
      }

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        // FormData를 사용하는 경우 Content-Type은 브라우저가 자동 설정
        body: dataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "회원가입 실패");
      }

      // JWT와 사용자 정보를 저장
      localStorage.setItem("token", data.token);
      setUser({
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        profileImage: data.user.profileImage,
        isAdmin: data.user.isAdmin,
        provider: data.user.provider,
      });

      setSuccess("회원가입이 완료되었습니다!");
      setTimeout(() => navigate("/mypage"), 1000);
    } catch (error) {
      setError(error.message);
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
              placeholder="비밀번호를 입력하세요"
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
          </div>

          <button type="submit" className={styles.registerButton}>
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
