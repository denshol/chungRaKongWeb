// MyPage.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styles from "../styles/MyPage.module.css";
import defaultAvatar from "../assets/image/chungRaKong.png";
import { FaUser, FaPhone, FaEnvelope, FaSignOutAlt } from "react-icons/fa";

const MyPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className={styles.mypageContainer}>
        <p>로그인이 필요합니다.</p>
      </div>
    );
  }

  const handleLogout = () => {
    if (window.Kakao?.Auth?.getAccessToken()) {
      window.Kakao.Auth.logout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      });
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
    navigate("/login");
  };

  return (
    <div className={styles.mypageContainer}>
      <div className={styles.profileCard}>
        <h2 className={styles.profileTitle}>마이페이지</h2>

        <div className={styles.profileAvatar}>
          <img
            src={user.profileImage ? user.profileImage : defaultAvatar}
            alt="Profile"
            onError={(e) => {
              e.target.src = defaultAvatar;
              e.target.onerror = null;
            }}
          />
        </div>

        <div className={styles.profileInfo}>
          <p>
            <FaUser className={styles.infoIcon} />
            <strong>이름:</strong> {user.name || "사용자"}
          </p>
          <p>
            <FaPhone className={styles.infoIcon} />
            <strong>전화번호:</strong> {user.phone || "전화번호 정보 없음"}
          </p>
          <p>
            <FaEnvelope className={styles.infoIcon} />
            <strong>이메일:</strong> {user.email || "이메일 정보 없음"}
          </p>
          <p>
            <strong>로그인 방식:</strong>{" "}
            {user.provider === "kakao" ? "카카오" : "이메일"}
          </p>
        </div>

        <button onClick={handleLogout} className={styles.logoutButton}>
          <FaSignOutAlt className={styles.logoutIcon} /> 로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
