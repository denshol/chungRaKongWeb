import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../styles/Login.module.css";

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

    if (!formData.email || !formData.password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      console.error("로그인 오류:", error.code, error.message);

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else if (error.code === "auth/invalid-email") {
        setError("유효하지 않은 이메일 형식입니다.");
      } else if (error.code === "auth/too-many-requests") {
        setError("너무 많은 요청이 있었습니다. 나중에 다시 시도해주세요.");
      } else {
        setError("로그인 중 오류가 발생했습니다: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>로그인</h2>

        {error && <p className={styles.errorMessage}>{error}</p>}

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
            <Link to="/find-password">비밀번호 찾기</Link>
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className={styles.registerSection}>
          계정이 없으신가요?
          <Link to="/register" className={styles.registerLink}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
