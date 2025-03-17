import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { authAPI } from "../../services/api";
import styles from "../../styles/Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "densh0l0709@gmail.com",
    password: "1234",
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

    if (!formData.email || !formData.password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const data = await authAPI.login(formData);
      login(data.user, data.token);
      navigate("/");
    } catch (error) {
      setError(error.message || "로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>로그인</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <div className={styles.findLinks}>
            <a href="/find-id">아이디 찾기</a>
            <span className={styles.divider}>|</span>
            <a href="/find-password">비밀번호 찾기</a>
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            로그인
          </button>
        </form>

        <div className={styles.socialLogin}>
          <div className={styles.orDivider}>
            <span>또는</span>
          </div>

          <div className={styles.kakaoLogin}>
            <img
              src="https://k.kakaocdn.net/14/dn/btrU3xa6lnf/jUkAcXsM6kOGZmTlMLvKwT/o.jpg"
              alt="카카오 로그인"
              className={styles.kakaoLogo}
            />
          </div>
        </div>

        <div className={styles.registerSection}>
          계정이 없으신가요?
          <a href="/register" className={styles.registerLink}>
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
