import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styles from "../styles/MyPage.module.css"; // styles 추가
import logo from "../assets/image/chungRaKong.png";

const MyPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    console.log("현재 로그인한 사용자 정보:", user);
    if (user?.isAdmin) {
      fetch("/api/inquiries")
        .then((res) => res.json())
        .then((data) => {
          console.log("문의 목록 데이터:", data);
          setInquiries(data);
        })
        .catch((error) => console.error("문의 목록 불러오기 실패:", error));
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  if (!user) {
    return (
      <div className={styles.mypageContainer}>
        <p className={styles.loginWarning}>로그인이 필요합니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.mypageContainer}>
      <div className={styles.profileCard}>
        <h2 className={styles.profileTitle}>마이페이지</h2>
        <div className={styles.profileAvatar}>
          <img src={logo} alt="User Avatar" />
        </div>
        <div className={styles.profileInfo}>
          <p>
            <strong>이름:</strong> {user.name}
          </p>
          <p>
            <strong>이메일:</strong> {user.email}
          </p>
        </div>

        {user.isAdmin && (
          <div className={styles.adminInquiries}>
            <h3>문의 목록</h3>
            {inquiries.length > 0 ? (
              <ul>
                {inquiries.map((inquiry) => (
                  <li key={inquiry.id}>
                    <strong>{inquiry.subject}</strong> - {inquiry.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p>문의 내역이 없습니다.</p>
            )}
          </div>
        )}

        <button onClick={handleLogout} className={styles.logoutButton}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
