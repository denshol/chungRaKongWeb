import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import styles from "../styles/Auth.module.css";

const FindPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFindPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      await authAPI.findPassword({ email });
      setMessage(
        "비밀번호 재설정 링크를 이메일로 보냈습니다. 이메일을 확인해주세요."
      );
    } catch (error) {
      setError(error.message || "비밀번호 찾기에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2>비밀번호 찾기</h2>

        {error && <p className={styles.errorMessage}>{error}</p>}
        {message && <p className={styles.successMessage}>{message}</p>}

        <form onSubmit={handleFindPassword}>
          <div className={styles.formGroup}>
            <label>이메일</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="가입된 이메일 주소를 입력하세요"
              className={styles.inputField}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.authButton}
            disabled={loading}
          >
            {loading ? "처리 중..." : "비밀번호 찾기"}
          </button>
        </form>

        <div className={styles.authLinks}>
          <button
            onClick={() => navigate("/login")}
            className={styles.linkButton}
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindPassword;
