import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/MyPage.css";
import logo from "../assets/image/chungRaKong.png";


const MyPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]); // 문의 목록 상태 추가

  useEffect(() => {
    console.log("현재 로그인한 사용자 정보:", user); // user 객체 확인용
    if (user?.isAdmin) {
      fetch("/api/inquiries") // 문의 목록을 가져오는 API 호출
        .then((res) => res.json())
        .then((data) => {
          console.log("문의 목록 데이터:", data); // 콘솔에서 데이터 확인
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
      <div className="mypage-container">
        <p className="login-warning">로그인이 필요합니다.</p>
      </div>
    );
  }

  return (
    <div className="mypage-container">
      <div className="profile-card">
        <h2 className="profile-title">마이페이지</h2>
        <div className="profile-avatar">
          <img src={logo} alt="User Avatar" />
        </div>
        <div className="profile-info">
          <p>
            <strong>이름:</strong> {user.name}
          </p>
          <p>
            <strong>이메일:</strong> {user.email}
          </p>
        </div>

        {/* 🔥 관리자일 경우 문의 목록 표시 🔥 */}
        {user.isAdmin && (
          <div className="admin-inquiries">
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

        <button onClick={handleLogout} className="logout-button">
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
