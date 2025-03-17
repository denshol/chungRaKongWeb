// src/components/auth/Login.js
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      // 간단한 유효성 검사
      if (!email || !password) {
        setError("이메일과 비밀번호를 모두 입력해주세요.");
        return;
      }

      // 실제로는 서버 인증이 필요하지만,
      // 지금은 간단히 로그인 성공으로 처리
      const userData = {
        id: "1",
        email,
        name: "사용자",
        role: "user",
      };

      login(userData);
      navigate("/"); // 홈으로 리다이렉트
    } catch (error) {
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2>로그인</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
            />
          </div>

          <button type="submit" className={styles.authButton}>
            로그인
          </button>
        </form>

        <div className={styles.authLinks}>
          <p>
            계정이 없으신가요? <a href="/register">회원가입</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
