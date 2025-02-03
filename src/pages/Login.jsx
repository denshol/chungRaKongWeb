import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/Login.css"; // CSS 파일

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const dummyToken = "dummy_jwt_token";
    localStorage.setItem("token", dummyToken);
    setUser({ name: "홍길동", email });
    navigate("/mypage");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">로그인</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        {/* ✅ 회원가입 버튼 추가 */}
        <div className="signup-link">
          <p>아직 계정이 없으신가요?</p>
          <Link to="/register" className="signup-button">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
