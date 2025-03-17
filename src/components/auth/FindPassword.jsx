// src/components/auth/FindPassword.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../styles/Auth.module.css";

const FindPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email);
      setMessage(
        "비밀번호 재설정 이메일이 발송되었습니다. 이메일을 확인해주세요."
      );
    } catch (error) {
      console.error("비밀번호 재설정 오류:", error.code, error.message);

      if (error.code === "auth/user-not-found") {
        setError("해당 이메일로 등록된 계정이 없습니다.");
      } else if (error.code === "auth/invalid-email") {
        setError("유효하지 않은 이메일 형식입니다.");
      } else {
        setError("비밀번호 재설정 이메일 발송 중 오류가 발생했습니다.");
      }
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

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>이메일</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="가입한 이메일 주소를 입력하세요"
              className={styles.inputField}
              required
            />
          </div>

          <p className={styles.infoText}>
            가입 시 등록한 이메일로 비밀번호 재설정 링크가 발송됩니다.
          </p>

          <button
            type="submit"
            className={styles.authButton}
            disabled={loading}
          >
            {loading ? "발송 중..." : "비밀번호 재설정 이메일 발송"}
          </button>
        </form>

        <div className={styles.authLinks}>
          <Link to="/login" className={styles.linkButton}>
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FindPassword;
