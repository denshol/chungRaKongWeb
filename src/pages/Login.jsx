import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import KakaoLoginButton from "../components/KaKaoLoginButton";
import styles from "../styles/Login.module.css";
import defaultImage from "../assets/image/chungRaKong.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // 카카오 로그인 성공 후 처리 함수
  // Login.js
  const handleKakaoLoginSuccess = (userInfo) => {
    console.log("✅ 카카오 로그인 성공:", userInfo);

    // 카카오에서 받은 사용자 정보를 정확한 구조로 저장
    setUser({
      name: userInfo.properties.nickname,
      email: userInfo.kakao_account.email,
      profileImage: userInfo.properties.profile_image_url || null, // 프로필 이미지 URL
      provider: "kakao",
    });

    localStorage.setItem("token", "kakao_dummy_token");
    navigate("/mypage");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const dummyToken = "dummy_jwt_token";
    localStorage.setItem("token", dummyToken);
    setUser({
      name: "홍길동",
      email,
      profileImage: defaultImage, // 기본 프로필 이미지
      provider: "email",
    });
    navigate("/mypage");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>로그인</h2>

        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.inputField}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.inputField}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            로그인
          </button>
        </form>

        <div className={styles.socialLogin}>
          <KakaoLoginButton onLoginSuccess={handleKakaoLoginSuccess} />
        </div>

        <div className={styles.signupLink}>
          <p>아직 계정이 없으신가요?</p>
          <Link to="/register" className={styles.signupButton}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
