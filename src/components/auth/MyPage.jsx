import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "../../styles/MyPage.module.css";
import defaultAvatar from "../../assets/image/chungRaKong.png";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaSignOutAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaKey,
} from "react-icons/fa";

const MyPage = () => {
  const { user, logout, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [newAvatar, setNewAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 사용자 정보 초기화
  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className={styles.mypageContainer}>
        <div className={styles.noUserMessage}>
          <p>로그인이 필요합니다.</p>
          <button
            onClick={() => navigate("/login")}
            className={styles.loginButton}
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // 편집 취소
      setIsEditing(false);
      setNewAvatar(null);
      setPreviewAvatar(null);
      // 원래 데이터로 복원
      setEditData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    } else {
      // 편집 시작
      setIsEditing(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(file);
      // 미리보기 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateProfileData = () => {
    if (!editData.name.trim()) {
      setError("이름은 필수 항목입니다.");
      return false;
    }

    if (editData.phone) {
      const phoneRegex = /^[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}$/;
      if (!phoneRegex.test(editData.phone)) {
        setError("올바른 전화번호 형식이 아닙니다.");
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editData.email)) {
      setError("올바른 이메일 형식이 아닙니다.");
      return false;
    }

    return true;
  };

  const validatePasswordChange = () => {
    if (!passwordData.currentPassword) {
      setError("현재 비밀번호를 입력해주세요.");
      return false;
    }

    if (passwordData.newPassword.length < 6) {
      setError("새 비밀번호는 최소 6자 이상이어야 합니다.");
      return false;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true;
  };

  const handleProfileUpdate = async () => {
    setError("");
    setSuccess("");

    if (!validateProfileData()) {
      return;
    }

    try {
      // 실제 구현에서는 API 호출
      // const formData = new FormData();
      // formData.append('name', editData.name);
      // formData.append('phone', editData.phone);
      // formData.append('email', editData.email);
      // if (newAvatar) {
      //   formData.append('profileImage', newAvatar);
      // }
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('token')}`,
      //   },
      //   body: formData
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // 가상의 프로필 업데이트 (실제 API 응답을 시뮬레이션)
      const updatedUser = {
        ...user,
        name: editData.name,
        phone: editData.phone,
        email: editData.email,
        profileImage: previewAvatar || user.profileImage,
      };

      // Context 업데이트
      updateUser(updatedUser);

      setSuccess("프로필이 성공적으로 업데이트되었습니다.");
      setIsEditing(false);
      setNewAvatar(null);
      setPreviewAvatar(null);
    } catch (error) {
      setError(error.message || "프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  const handlePasswordUpdate = async () => {
    setError("");
    setSuccess("");

    if (!validatePasswordChange()) {
      return;
    }

    try {
      // 실제 구현에서는 API 호출
      // const response = await fetch('/api/user/change-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('token')}`,
      //   },
      //   body: JSON.stringify({
      //     currentPassword: passwordData.currentPassword,
      //     newPassword: passwordData.newPassword,
      //   })
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // 가상의 비밀번호 변경 성공 응답
      setSuccess("비밀번호가 성공적으로 변경되었습니다.");
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError(error.message || "비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.mypageContainer}>
      <div className={styles.profileCard}>
        <h2 className={styles.profileTitle}>마이페이지</h2>

        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}

        {/* 프로필 편집 모드 */}
        {isEditing ? (
          <>
            <div className={styles.profileAvatarEdit}>
              <div className={styles.avatarPreview}>
                <img
                  src={
                    previewAvatar ||
                    (user.profileImage ? user.profileImage : defaultAvatar)
                  }
                  alt="Profile Preview"
                  onError={(e) => {
                    e.target.src = defaultAvatar;
                    e.target.onerror = null;
                  }}
                />
              </div>
              <label className={styles.avatarUploadButton}>
                프로필 사진 변경
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            <div className={styles.editForm}>
              <div className={styles.formGroup}>
                <label>
                  <FaUser className={styles.infoIcon} />
                  이름
                </label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  placeholder="이름을 입력하세요"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  <FaPhone className={styles.infoIcon} />
                  전화번호
                </label>
                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleInputChange}
                  placeholder="전화번호를 입력하세요"
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  <FaEnvelope className={styles.infoIcon} />
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                  placeholder="이메일을 입력하세요"
                  required
                />
              </div>

              <div className={styles.buttonGroup}>
                <button
                  onClick={handleProfileUpdate}
                  className={styles.saveButton}
                >
                  <FaSave className={styles.buttonIcon} /> 저장
                </button>
                <button
                  onClick={handleEditToggle}
                  className={styles.cancelButton}
                >
                  <FaTimes className={styles.buttonIcon} /> 취소
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 일반 프로필 보기 모드 */}
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

            <div className={styles.actionButtons}>
              <button onClick={handleEditToggle} className={styles.editButton}>
                <FaEdit className={styles.buttonIcon} /> 프로필 편집
              </button>

              {/* 소셜 로그인이 아닐 경우에만 비밀번호 변경 버튼 표시 */}
              {user.provider !== "kakao" && (
                <button
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                  className={styles.passwordButton}
                >
                  <FaKey className={styles.buttonIcon} /> 비밀번호 변경
                </button>
              )}

              <button onClick={handleLogout} className={styles.logoutButton}>
                <FaSignOutAlt className={styles.buttonIcon} /> 로그아웃
              </button>
            </div>
          </>
        )}

        {/* 비밀번호 변경 폼 */}
        {isChangingPassword && !isEditing && user.provider !== "kakao" && (
          <div className={styles.passwordChangeForm}>
            <h3 className={styles.sectionTitle}>비밀번호 변경</h3>

            <div className={styles.formGroup}>
              <label>현재 비밀번호</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="현재 비밀번호 입력"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>새 비밀번호</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="새 비밀번호 입력 (6자 이상)"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>새 비밀번호 확인</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="새 비밀번호 재입력"
                required
              />
            </div>

            <div className={styles.buttonGroup}>
              <button
                onClick={handlePasswordUpdate}
                className={styles.saveButton}
              >
                <FaSave className={styles.buttonIcon} /> 변경 저장
              </button>
              <button
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                className={styles.cancelButton}
              >
                <FaTimes className={styles.buttonIcon} /> 취소
              </button>
            </div>
          </div>
        )}

        {/* 수강 중인 강좌 정보는 백엔드 연동 후 추가 가능 */}
      </div>
    </div>
  );
};

export default MyPage;
