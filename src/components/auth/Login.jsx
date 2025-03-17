// src/components/auth/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { authAPI } from "../../services/api";
import KakaoLoginButton from "./KaKaoLoginButton";
import styles from "../../styles/Auth.module.css";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 간단한 유효성 검사
    if (!formData.email || !formData.password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      // API 호출
      const data = await authAPI.login(formData);

      // 로그인 성공 처리
      login(data.user, data.token);

      // 홈 또는 이전 페이지로 리다이렉트
      navigate("/");
    } catch (error) {
      setError(error.message || "로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2>로그인</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">
              <FaEnvelope className={styles.icon} /> 이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일 주소"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">
              <FaLock className={styles.icon} /> 비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
              required
            />
          </div>

          <button
            type="submit"
            className={styles.authButton}
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className={styles.socialLogin}>
          <p className={styles.orDivider}>또는</p>
          <KakaoLoginButton />
        </div>

        <div className={styles.authLinks}>
          <p>
            계정이 없으신가요? <Link to="/register">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
