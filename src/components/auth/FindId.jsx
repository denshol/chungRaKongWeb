import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import styles from "../../styles/Auth.module.css";

const FindId = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [foundEmail, setFoundEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    // 전화번호 형식 자동 하이픈 추가
    const value = e.target.value.replace(/[^\d]/g, "");
    const formattedValue = value.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
    setPhoneNumber(formattedValue);
  };

  const handleFindId = async (e) => {
    e.preventDefault();
    setError("");
    setFoundEmail("");

    // 전화번호 유효성 검사
    const phoneRegex = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("유효한 전화번호를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.findId({ phone: phoneNumber });
      setFoundEmail(response.email);
    } catch (error) {
      setError(error.message || "아이디를 찾을 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2>아이디 찾기</h2>

        {error && <p className={styles.errorMessage}>{error}</p>}
        {foundEmail && (
          <div className={styles.successMessage}>
            <p>찾으신 아이디는 다음과 같습니다:</p>
            <p>
              <strong>{foundEmail}</strong>
            </p>
          </div>
        )}

        <form onSubmit={handleFindId}>
          <div className={styles.formGroup}>
            <label>전화번호</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="전화번호를 입력하세요 (- 자동 입력)"
              className={styles.inputField}
              maxLength="13"
              required
            />
          </div>

          <button
            type="submit"
            className={styles.authButton}
            disabled={loading}
          >
            {loading ? "찾는 중..." : "아이디 찾기"}
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

export default FindId;
