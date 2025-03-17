// src/components/auth/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../styles/Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 유효성 검사
    if (!formData.name || !formData.email || !formData.password) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (formData.password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, formData.name);
      navigate("/");
    } catch (error) {
      console.error("회원가입 오류:", error.code, error.message);

      if (error.code === "auth/email-already-in-use") {
        setError("이미 사용 중인 이메일입니다.");
      } else if (error.code === "auth/invalid-email") {
        setError("유효하지 않은 이메일 형식입니다.");
      } else if (error.code === "auth/weak-password") {
        setError("비밀번호가 너무 약합니다.");
      } else {
        setError("회원가입 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h2 className={styles.registerTitle}>회원가입</h2>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

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
            <small>비밀번호는 최소 6자 이상이어야 합니다.</small>
          </div>

          <div className={styles.inputGroup}>
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <button
            type="submit"
            className={styles.registerButton}
            disabled={loading}
          >
            {loading ? "가입 중..." : "회원가입"}
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
