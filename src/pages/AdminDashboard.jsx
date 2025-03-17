import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { adminAPI } from "../services/api";
import styles from "../styles/AdminDashboard.module.css";
import Loading from "../components/Loading";
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
  FaDownload,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaUserShield,
  FaEnvelope,
  FaPhone,
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
  
  // 새로 추가된 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [successMessage, setSuccessMessage] = useState("");
  const [viewType, setViewType] = useState("table"); // "table" 또는 "grid"
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

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

  // 사용자 필터링 - useMemo로 최적화
  const filteredUsers = useMemo(() => {
    let result = users;

    // 검색어로 필터링
    if (searchTerm.trim() !== "") {
      result = result.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone?.includes(searchTerm)
      );
    }

    // 상태로 필터링
    if (selectedFilter !== "all") {
      if (selectedFilter === "admin") {
        result = result.filter(user => user.isAdmin);
      } else if (selectedFilter === "active") {
        result = result.filter(user => !user.isAdmin && user.status !== 'inactive');
      } else if (selectedFilter === "inactive") {
        result = result.filter(user => user.status === 'inactive');
      } else if (selectedFilter === "kakao") {
        result = result.filter(user => user.provider === 'kakao');
      } else if (selectedFilter === "email") {
        result = result.filter(user => user.provider !== 'kakao');
      }
    }

    // 날짜 범위로 필터링
    if (dateRange.startDate) {
      const startDate = new Date(dateRange.startDate);
      result = result.filter(user => new Date(user.createdAt) >= startDate);
    }

    if (dateRange.endDate) {
      const endDate = new Date(dateRange.endDate);
      endDate.setHours(23, 59, 59, 999); // 해당 일자의 마지막 시간으로 설정
      result = result.filter(user => new Date(user.createdAt) <= endDate);
    }

    // 정렬
    return result.sort((a, b) => {
      if (!a[sortField] || !b[sortField]) return 0;

      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });
  }, [
    users, 
    searchTerm, 
    selectedFilter, 
    sortField, 
    sortDirection, 
    dateRange.startDate, 
    dateRange.endDate
  ]);

  // 현재 페이지의 사용자 데이터
  const currentUsers = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // 총 페이지 수 계산
  const totalPages = useMemo(() => {
    return Math.ceil(filteredUsers.length / itemsPerPage);
  }, [filteredUsers.length, itemsPerPage]);

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
      setSuccessMessage("사용자 정보가 성공적으로 업데이트되었습니다.");
      
      // 3초 후 성공 메시지 제거
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
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
      
      setSuccessMessage("사용자가 성공적으로 삭제되었습니다.");
      
      // 3초 후 성공 메시지 제거
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setIsConfirmDialogOpen(false);
      setUserToDelete(null);
    } catch (error) {
      setError(error.message || "사용자 삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // 페이지 변경 처리
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // 정렬 필드 변경
  const handleSort = (field) => {
    if (sortField === field) {
      // 같은 필드를 다시 클릭하면 방향 전환
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // 새 필드 선택 시 내림차순으로 시작
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // 필터 변경 처리
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setCurrentPage(1); // 첫 페이지로 이동
  };
  
  // 날짜 범위 필터 변경
  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 날짜 필터 변경 시 첫 페이지로 이동
    setCurrentPage(1);
  };
  
  // CSV 내보내기 기능
  const exportToCsv = useCallback(() => {
    // 내보낼 데이터 준비
    const csvData = filteredUsers.map(user => ({
      ID: user.id,
      이름: user.name || '',
      이메일: user.email || '',
      전화번호: user.phone || '',
      가입일: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '',
      로그인방식: user.provider === 'kakao' ? '카카오' : '이메일',
      관리자여부: user.isAdmin ? 'O' : 'X'
    }));
    
    // 헤더 생성
    const headers = Object.keys(csvData[0]).join(',');
    
    // 데이터 행 생성
    const rows = csvData.map(row => 
      Object.values(row)
        .map(value => `"${value}"`) // 따옴표로 감싸기
        .join(',')
    ).join('\n');
    
    // CSV 문자열 완성
    const csv = `${headers}\n${rows}`;
    
    // Blob 생성 및 다운로드
    const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `회원목록_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredUsers]);

  // 임시 통계 데이터 (실제로는 백엔드에서 가져옴)
  const dummyStats = useMemo(() => ({
    totalUsers: users.length,
    newUsersThisMonth: Math.floor(users.length * 0.2),
    adminCount: users.filter((user) => user.isAdmin).length,
    kakaoUsers: users.filter((user) => user.provider === "kakao").length,
    emailUsers: users.filter((user) => user.provider !== "kakao").length,
    registrationsByMonth: [
      { month: "1월", count: 20 },
      { month: "2월", count: 35 },
      { month: "3월", count: 42 },
      { month: "4월", count: 28 },
      { month: "5월", count: 50 },
      { month: "6월", count: 65 },
      { month: "7월", count: 75 },
      { month: "8월", count: 63 },
      { month: "9월", count: 47 },
      { month: "10월", count: 55 },
      { month: "11월", count: 70 },
      { month: "12월", count: 88 },
    ],
    userStatus: [
      { status: "활성", count: users.filter(u => u.status !== 'inactive').length },
      { status: "비활성", count: users.filter(u => u.status === 'inactive').length },
    ]
  }), [users]);

  // 관리자가 아니면 홈으로 리다이렉트
  if (!isAdmin_) {
    return <Navigate to="/" />;
  }

  // 페이지네이션 렌더링
  const renderPagination = () => {
    const pages = [];
    
    // 처음 페이지로 이동
    if (currentPage > 1) {
      pages.push(
        <button 
          key="first" 
          onClick={() => handlePageChange(1)}
          className={styles.paginationButton}
        >
          처음
        </button>
      );
    }
    
    // 이전 페이지로 이동
    if (currentPage > 1) {
      pages.push(
        <button 
          key="prev" 
          onClick={() => handlePageChange(currentPage - 1)}
          className={styles.paginationButton}
        >
          이전
        </button>
      );
    }
    
    // 페이지 번호 버튼
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${styles.paginationButton} ${
            currentPage === i ? styles.activePage : ""
          }`}
        >
          {i}
        </button>
      );
    }
    
    // 다음 페이지로 이동
    if (currentPage < totalPages) {
      pages.push(
        <button 
          key="next" 
          onClick={() => handlePageChange(currentPage + 1)}
          className={styles.paginationButton}
        >
          다음
        </button>
      );
    }
    
    // 마지막 페이지로 이동
    if (currentPage < totalPages) {
      pages.push(
        <button 
          key="last" 
          onClick={() => handlePageChange(totalPages)}
          className={styles.paginationButton}
        >
          마지막
        </button>
      );
    }
    
    return <div className={styles.pagination}>{pages}</div>;
  };

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.sideNav}>
        <div className={styles.adminInfo}>
          <div className={styles.adminAvatar}>
            <img
              src={user?.profileImage || "/default-avatar.png"}
              alt="Admin"
              onError={(e) => {
                e.target.src = "/default-avatar.png";
                e.target.onerror = null;
              }}
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
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

        {activeTab === "users" && (
          <div className={styles.usersTab}>
            <div className={styles.tabHeader}>
              <h2>사용자 관리</h2>
              <div className={styles.actionBar}>
                <div className={styles.searchBox}>
                  <FaSearch className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="이름, 이메일, 전화번호 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className={styles.filters}>
                  <div className={styles.filterGroup}>
                    <label htmlFor="userFilter">필터:</label>
                    <select 
                      id="userFilter"
                      value={selectedFilter}
                      onChange={handleFilterChange}
                      className={styles.filterSelect}
                    >
                      <option value="all">전체 사용자</option>
                      <option value="admin">관리자</option>
                      <option value="active">활성 사용자</option>
                      <option value="inactive">비활성 사용자</option>
                      <option value="kakao">카카오 로그인</option>
                      <option value="email">이메일 로그인</option>
                    </select>
                  </div>
                  
                  <div className={styles.filterGroup}>
                    <label>가입일:</label>
                    <input 
                      type="date" 
                      name="startDate"
                      value={dateRange.startDate}
                      onChange={handleDateRangeChange}
                      className={styles.dateInput}
                    />
                    <span>~</span>
                    <input 
                      type="date" 
                      name="endDate"
                      value={dateRange.endDate}
                      onChange={handleDateRangeChange}
                      className={styles.dateInput}
                    />
                  </div>
                </div>
                
                <div className={styles.actionButtons}>
                  <button 
                    className={styles.exportButton}
                    onClick={exportToCsv}
                  >
                    <FaDownload /> 
                    CSV 내보내기
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.userInfoHeader}>
              <p className={styles.userCount}>
                총 <strong>{filteredUsers.length}</strong>명의 사용자 중 
                <strong> {Math.min(
                  (currentPage - 1) * itemsPerPage + 1, 
                  filteredUsers.length
                )} - {Math.min(
                  currentPage * itemsPerPage, 
                  filteredUsers.length
                )}</strong>번째 사용자를 표시합니다.
              </p>
            </div>

            {isLoading ? (
              <div className={styles.loadingContainer}>
                <Loading />
              </div>
            ) : (
              <div className={styles.userTable}>
                <table>
                  <thead>
                    <tr>
                      <th>프로필</th>
                      <th>
                        <div 
                          className={styles.sortableHeader}
                          onClick={() => handleSort('name')}
                        >
                          이름
                          {sortField === 'name' && (
                            sortDirection === 'asc' 
                              ? <FaSortAmountUp className={styles.sortIcon} /> 
                              : <FaSortAmountDown className={styles.sortIcon} />
                          )}
                        </div>
                      </th>
                      <th>
                        <div 
                          className={styles.sortableHeader}
                          onClick={() => handleSort('email')}
                        >
                          이메일
                          {sortField === 'email' && (
                            sortDirection === 'asc' 
                              ? <FaSortAmountUp className={styles.sortIcon} /> 
                              : <FaSortAmountDown className={styles.sortIcon} />
                          )}
                        </div>
                      </th>
                      <th>전화번호</th>
                      <th>
                        <div 
                          className={styles.sortableHeader}
                          onClick={() => handleSort('createdAt')}
                        >
                          가입일
                          {sortField === 'createdAt' && (
                            sortDirection === 'asc' 
                              ? <FaSortAmountUp className={styles.sortIcon} /> 
                              : <FaSortAmountDown className={styles.sortIcon} />
                          )}
                        </div>
                      </th>
                      <th>로그인 방식</th>
                      <th>권한</th>
                      <th>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.length > 0 ? (
                      currentUsers.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <div className={styles.userAvatar}>
                              <img
                                src={user.profileImage || "/default-avatar.png"}
                                alt={user.name}
                                onError={(e) => {
                                  e.target.src = "/default-avatar.png";
                                  e.target.onerror = null;
                                }}
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
                          <td>
                            {user.isAdmin ? (
                              <span className={styles.adminBadge}>
                                <FaUserShield /> 관리자
                              </span>
                            ) : (
                              "일반 회원"
                            )}
                          </td>
                          <td>
                            <div className={styles.actionButtons}>
                              <button
                                className={styles.editButton}
                                onClick={() => handleEditClick(user)}
                                title="사용자 정보 수정"
                              >
                                <FaEdit />
                              </button>
                              <button
                                className={styles.deleteButton}
                                onClick={() => handleDeleteClick(user)}
                                disabled={user.id === user.id} // 현재 로그인한 관리자는 삭제 불가
                                title="사용자 삭제"
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
                
                {filteredUsers.length > itemsPerPage && renderPagination()}
                
                <div className={styles.itemsPerPageSelector}>
                  <span>페이지당 표시:</span>
                  <select 
                    value={itemsPerPage} 
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1); // 페이지당 표시 수 변경 시 첫 페이지로 이동
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "stats" && (
          <div className={styles.statsTab}>
            <h2>관리자 대시보드</h2>

            {isLoading ? (
              <div className={styles.loadingContainer}>
                <Loading />
              </div>
            ) : (
              <>
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

                <div className={styles.chartSection}>
                  <h3>월별 회원가입 추이</h3>
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
                
                <div className={styles.chartSection}>
                  <h3>사용자 통계</h3>
                  <div className={styles.statsRow}>
                    <div className={styles.statBox}>
                      <h4>로그인 방식</h4>
                      <div className={styles.pieChart}>
                        <div 
                          className={styles.pieSlice} 
                          style={{ 
                            '--percentage': `${(dummyStats.kakaoUsers / dummyStats.totalUsers) * 100}%`,
                            '--color': '#FEE500'
                          }}
                          data-label="카카오"
                        ></div>
                        <div 
                          className={styles.pieSlice} 
                          style={{ 
                            '--percentage': `${(dummyStats.emailUsers / dummyStats.totalUsers) * 100}%`,
                            '--color': '#3b82f6'
                          }}
                          data-label="이메일"
                        ></div>
                      </div>
                      <div className={styles.pieLegend}>
                        <div className={styles.legendItem}>
                          <span className={styles.colorBox} style={{ backgroundColor: '#FEE500' }}></span>
                          <span>카카오 ({dummyStats.kakaoUsers}명)</span>
                        </div>
                        <div className={styles.legendItem}>
                          <span className={styles.colorBox} style={{ backgroundColor: '#3b82f6' }}></span>
                          <span>이메일 ({dummyStats.emailUsers}명)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.statBox}>
                      <h4>계정 상태</h4>
                      <div className={styles.pieChart}>
                        <div 
                          className={styles.pieSlice} 
                          style={{ 
                            '--percentage': `${(dummyStats.userStatus[0].count / dummyStats.totalUsers) * 100}%`,
                            '--color': '#22c55e'
                          }}
                          data-label="활성"
                        ></div>
                        <div 
                          className={styles.pieSlice} 
                          style={{ 
                            '--percentage': `${(dummyStats.userStatus[1].count / dummyStats.totalUsers) * 100}%`,
                            '--color': '#ef4444'
                          }}
                          data-label="비활성"
                        ></div>
                      </div>
                      <div className={styles.pieLegend}>
                        <div className={styles.legendItem}>
                          <span className={styles.colorBox} style={{ backgroundColor: '#22c55e' }}></span>
                          <span>활성 ({dummyStats.userStatus[0].count}명)</span>
                        </div>
                        <div className={styles.legendItem}>
                          <span className={styles.colorBox} style={{ backgroundColor: '#ef4444' }}></span>
                          <span>비활성 ({dummyStats.userStatus[1].count}명)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
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
                <label htmlFor="name">
                  <FaUser className={styles.formIcon} /> 이름
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditFormChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">
                  <FaEnvelope className={styles.formIcon} /> 이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditFormChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">
                  <FaPhone className={styles.formIcon} /> 전화번호
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditFormChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="isAdmin"
                    checked={editFormData.isAdmin}
                    onChange={handleEditFormChange}
                  />
                  <FaUserShield className={styles.formIcon} /> 관리자 권한
                </label>
              </div>

              <div className={styles.modalButtons}>
                <button type="submit" className={styles.saveButton}>
                  <FaCheck className={styles.buttonIcon} /> 저장
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setEditingUser(null)}
                >
                  <FaTimes className={styles.buttonIcon} /> 취소
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
              정말로 <strong>{userToDelete?.name || '이 사용자'}</strong>를 삭제하시겠습니까? 
              <br />
              이 작업은 되돌릴 수 없습니다.
            </p>

            <div className={styles.confirmButtons}>
              <button
                onClick={handleDeleteConfirm}
                className={styles.confirmButton}
                disabled={isLoading}
              >
                <FaCheck className={styles.buttonIcon} /> 삭제
              </button>
              <button
                onClick={() => {
                  setIsConfirmDialogOpen(false);
                  setUserToDelete(null);
                }}
                className={styles.cancelButton}
              >
                <FaTimes className={styles.buttonIcon} /> 취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;