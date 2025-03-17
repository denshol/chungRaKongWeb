// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { adminAPI } from "../services/api";
import styles from "../styles/AdminDashboard.module.css";
import {
  FaUser,
  FaUserPlus,
  FaCalendarAlt,
  FaChartBar,
  FaSearch,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const AdminDashboard = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
  });
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isAdmin_, setIsAdmin_] = useState(false);

  // 초기 관리자 권한 확인
  useEffect(() => {
    setIsAdmin_(isAdmin ? isAdmin() : false);
  }, [isAdmin]);

  // 사용자 목록과 통계 데이터 가져오기
  useEffect(() => {
    // 관리자 아니면 데이터 로드하지 않음
    if (!isAdmin_) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");

        if (activeTab === "users") {
          try {
            const userData = await adminAPI.getAllUsers();
            setUsers(userData);
          } catch (error) {
            setError(
              "사용자 목록을 불러오는데 실패했습니다: " + (error.message || "")
            );
          }
        } else if (activeTab === "stats") {
          try {
            const statsData = await adminAPI.getDashboardStats();
            setStats(statsData);
          } catch (error) {
            setError(
              "통계 데이터를 불러오는데 실패했습니다: " + (error.message || "")
            );
          }
        }
      } catch (error) {
        setError("데이터를 불러오는데 실패했습니다: " + (error.message || ""));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab, isAdmin_]);

  // 사용자 필터링
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm)
  );

  // 폼 입력 처리
  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 사용자 편집 시작
  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      isAdmin: user.isAdmin || false,
    });
  };

  // 사용자 정보 업데이트
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await adminAPI.updateUser(editingUser.id, editFormData);

      // 사용자 목록 업데이트
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...editFormData } : user
        )
      );

      setEditingUser(null);
    } catch (error) {
      setError(error.message || "사용자 정보 업데이트에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 사용자 삭제 확인 다이얼로그
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsConfirmDialogOpen(true);
  };

  // 사용자 삭제 실행
  const handleDeleteConfirm = async () => {
    try {
      setIsLoading(true);
      await adminAPI.deleteUser(userToDelete.id);

      // 사용자 목록에서 삭제된 사용자 제거
      setUsers(users.filter((user) => user.id !== userToDelete.id));

      setIsConfirmDialogOpen(false);
      setUserToDelete(null);
    } catch (error) {
      setError(error.message || "사용자 삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 임시 통계 데이터 (실제로는 백엔드에서 가져옴)
  const dummyStats = {
    totalUsers: users.length,
    newUsersThisMonth: Math.floor(users.length * 0.2),
    adminCount: users.filter((user) => user.isAdmin).length,
    kakaoUsers: users.filter((user) => user.provider === "kakao").length,
    emailUsers: users.filter((user) => user.provider !== "kakao").length,
    registrationsByMonth: [
      { month: "1월", count: 20 },
      { month: "2월", count: 35 },
      { month: "3월", count: 42 },
      // ...더 많은 월별 데이터
    ],
  };

  // 관리자가 아니면 홈으로 리다이렉트
  if (!isAdmin_) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.sideNav}>
        <div className={styles.adminInfo}>
          <div className={styles.adminAvatar}>
            <img
              src={user?.profileImage || "/default-avatar.png"}
              alt="Admin"
            />
          </div>
          <div className={styles.adminName}>{user?.name || "관리자"}</div>
          <div className={styles.adminRole}>관리자</div>
        </div>

        <nav className={styles.navMenu}>
          <button
            className={`${styles.navItem} ${
              activeTab === "users" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            <FaUser className={styles.navIcon} />
            사용자 관리
          </button>
          <button
            className={`${styles.navItem} ${
              activeTab === "stats" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("stats")}
          >
            <FaChartBar className={styles.navIcon} />
            대시보드
          </button>
        </nav>
      </div>

      <div className={styles.contentArea}>
        {error && <div className={styles.errorMessage}>{error}</div>}

        {activeTab === "users" && (
          <div className={styles.usersTab}>
            <div className={styles.tabHeader}>
              <h2>사용자 관리</h2>
              <div className={styles.searchBox}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="이름, 이메일, 전화번호 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {isLoading ? (
              <div className={styles.loadingSpinner}>로딩 중...</div>
            ) : (
              <div className={styles.userTable}>
                <table>
                  <thead>
                    <tr>
                      <th>프로필</th>
                      <th>이름</th>
                      <th>이메일</th>
                      <th>전화번호</th>
                      <th>가입일</th>
                      <th>로그인 방식</th>
                      <th>권한</th>
                      <th>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <div className={styles.userAvatar}>
                              <img
                                src={user.profileImage || "/default-avatar.png"}
                                alt={user.name}
                              />
                            </div>
                          </td>
                          <td>{user.name || "이름 없음"}</td>
                          <td>{user.email || "이메일 없음"}</td>
                          <td>{user.phone || "전화번호 없음"}</td>
                          <td>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            {user.provider === "kakao" ? "카카오" : "이메일"}
                          </td>
                          <td>{user.isAdmin ? "관리자" : "일반 회원"}</td>
                          <td>
                            <div className={styles.actionButtons}>
                              <button
                                className={styles.editButton}
                                onClick={() => handleEditClick(user)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className={styles.deleteButton}
                                onClick={() => handleDeleteClick(user)}
                                disabled={user.id === user.id} // 현재 로그인한 관리자는 삭제 불가
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className={styles.noUsers}>
                          사용자를 찾을 수 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "stats" && (
          <div className={styles.statsTab}>
            <h2>관리자 대시보드</h2>

            {isLoading ? (
              <div className={styles.loadingSpinner}>로딩 중...</div>
            ) : (
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <FaUser />
                  </div>
                  <div className={styles.statInfo}>
                    <div className={styles.statTitle}>전체 사용자</div>
                    <div className={styles.statValue}>
                      {dummyStats.totalUsers}
                    </div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <FaUserPlus />
                  </div>
                  <div className={styles.statInfo}>
                    <div className={styles.statTitle}>이번 달 신규 가입</div>
                    <div className={styles.statValue}>
                      {dummyStats.newUsersThisMonth}
                    </div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <FaCalendarAlt />
                  </div>
                  <div className={styles.statInfo}>
                    <div className={styles.statTitle}>카카오 로그인 사용자</div>
                    <div className={styles.statValue}>
                      {dummyStats.kakaoUsers}
                    </div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <FaChartBar />
                  </div>
                  <div className={styles.statInfo}>
                    <div className={styles.statTitle}>이메일 로그인 사용자</div>
                    <div className={styles.statValue}>
                      {dummyStats.emailUsers}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 여기에 더 많은 차트/그래프 추가 가능 */}
            <div className={styles.chartSection}>
              <h3>월별 회원가입 추이</h3>
              {/* 실제로는 Chart.js 등의 라이브러리 사용 */}
              <div className={styles.barChart}>
                {dummyStats.registrationsByMonth.map((item) => (
                  <div key={item.month} className={styles.barChartItem}>
                    <div
                      className={styles.bar}
                      style={{ height: `${item.count * 2}px` }}
                    ></div>
                    <div className={styles.barLabel}>{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 사용자 편집 모달 */}
      {editingUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>사용자 정보 편집</h3>
            <form onSubmit={handleEditSubmit}>
              <div className={styles.formGroup}>
                <label>이름</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditFormChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>이메일</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditFormChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>전화번호</label>
                <input
                  type="text"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditFormChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>관리자 권한</label>
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={editFormData.isAdmin}
                  onChange={handleEditFormChange}
                />
              </div>

              <div className={styles.modalButtons}>
                <button type="submit" className={styles.saveButton}>
                  저장
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setEditingUser(null)}
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 삭제 확인 다이얼로그 */}
      {isConfirmDialogOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmDialog}>
            <h3>사용자 삭제</h3>
            <p>
              정말로 <strong>{userToDelete?.name}</strong> 사용자를
              삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </p>

            <div className={styles.confirmButtons}>
              <button
                onClick={handleDeleteConfirm}
                className={styles.confirmButton}
              >
                <FaCheck /> 삭제
              </button>
              <button
                onClick={() => {
                  setIsConfirmDialogOpen(false);
                  setUserToDelete(null);
                }}
                className={styles.cancelButton}
              >
                <FaTimes /> 취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
