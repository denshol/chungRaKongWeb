import React from "react";
import styles from "../../styles/AdminDashboard.module.css";
import {
  GrowthIcon,
  ActivityIcon,
  UsersIcon,
  CalendarIcon,
} from "../icons/Icons";

const Dashboard = ({
  dashboardStats,
  programStats,
  recentMembers,
  loading,
}) => {
  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getStatusClass = (status) => {
    if (!status) return styles.statusActive;
    switch (status.toLowerCase()) {
      case "inactive":
        return styles.statusInactive;
      case "dormant":
        return styles.statusDormant;
      default:
        return styles.statusActive;
    }
  };

  const getUserStatus = (user) => {
    if (!user || !user.status || user.status === "active") return "활성";
    if (user.status === "inactive") return "정지";
    if (user.status === "dormant") return "휴면";
    return user.status;
  };

  // 사용자 통계 데이터를 준비하거나 기본값 설정
  const stats = dashboardStats || {
    totalUsers: 0,
    newUsersThisMonth: 0,
    userStatus: [
      { status: "활성", count: 0 },
      { status: "비활성", count: 0 },
    ],
    adminCount: 0,
    registrationsByMonth: [],
    membersByCategory: [],
  };

  // 회원 성장률 계산
  const calculateGrowthRate = () => {
    if (!stats.registrationsByMonth || stats.registrationsByMonth.length < 2)
      return 0;
    const currentMonth =
      stats.registrationsByMonth[stats.registrationsByMonth.length - 1].count;
    const prevMonth =
      stats.registrationsByMonth[stats.registrationsByMonth.length - 2].count;
    return prevMonth === 0
      ? 100
      : (((currentMonth - prevMonth) / prevMonth) * 100).toFixed(1);
  };

  const growthRate = calculateGrowthRate();

  return (
    <div className={styles.dashboard}>
      {/* 통계 카드 섹션 */}
      <section className={styles.statsSection}>
        <div className={`${styles.statCard} ${styles.statCardPrimary}`}>
          <div className={styles.statIconWrapper}>
            <UsersIcon />
          </div>
          <div className={styles.statTitle}>총 회원 수</div>
          <div className={styles.statValue}>{stats.totalUsers}</div>
          <div className={`${styles.statChange} ${styles.changePositive}`}>
            +12% 증가
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardSuccess}`}>
          <div className={styles.statIconWrapper}>
            <GrowthIcon />
          </div>
          <div className={styles.statTitle}>신규 회원</div>
          <div className={styles.statValue}>{stats.newUsersThisMonth}</div>
          <div className={`${styles.statChange} ${styles.changePositive}`}>
            +8% 증가
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardInfo}`}>
          <div className={styles.statIconWrapper}>
            <ActivityIcon />
          </div>
          <div className={styles.statTitle}>활성 회원</div>
          <div className={styles.statValue}>
            {stats.userStatus?.[0]?.count || 0}
          </div>
          <div className={`${styles.statChange} ${styles.changePositive}`}>
            +5% 증가
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardWarning}`}>
          <div className={styles.statIconWrapper}>
            <CalendarIcon />
          </div>
          <div className={styles.statTitle}>공개 프로그램</div>
          <div className={styles.statValue}>{programStats?.total || 0}</div>
          <div className={`${styles.statChange} ${styles.changePositive}`}>
            {programStats?.featured || 0}개 인기 프로그램
          </div>
        </div>
      </section>

      {/* 차트 섹션 */}
      <div className={styles.statsCardsContainer}>
        {/* 회원 성장률 */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>회원 성장률</h3>
          <div className={styles.growthIndicator}>
            <div className={styles.growthValue}>{growthRate}%</div>
            <div
              className={`${styles.growthLabel} ${
                Number(growthRate) >= 0 ? styles.positive : styles.negative
              }`}
            >
              전월 대비 {Number(growthRate) >= 0 ? "증가" : "감소"}
            </div>
          </div>
          <div className={styles.chartContent}>
            <div className={styles.simpleStats}>
              {(stats.registrationsByMonth || []).map((month, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={styles.statHeader}>
                    <span className={styles.statLabel}>{month.month}</span>
                    <span className={styles.statValue}>{month.count}명</span>
                  </div>
                  <div className={styles.statProgressBar}>
                    <div
                      className={styles.statProgressFill}
                      style={{
                        width: `${
                          (month.count /
                            Math.max(
                              ...stats.registrationsByMonth.map((m) => m.count)
                            )) *
                            100 || 0
                        }%`,
                        backgroundColor: getColorByIndex(index),
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 회원 상태 분포 */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>회원 상태 분포</h3>
          <div className={styles.chartContent}>
            <div className={styles.simpleStats}>
              {(stats.userStatus || []).map((status, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={styles.statHeader}>
                    <span className={styles.statLabel}>{status.status}</span>
                    <span className={styles.statValue}>{status.count}명</span>
                  </div>
                  <div className={styles.statProgressBar}>
                    <div
                      className={styles.statProgressFill}
                      style={{
                        width: `${
                          (status.count / stats.totalUsers) * 100 || 0
                        }%`,
                        backgroundColor: index === 0 ? "#00d084" : "#ff9800",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 프로그램 카테고리별 분포 */}
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>프로그램 카테고리별 분포</h3>
        <div className={styles.chartContent}>
          <div className={styles.simpleStats}>
            {(programStats?.categories || []).map((category, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statHeader}>
                  <span className={styles.statLabel}>{category.name}</span>
                  <span className={styles.statValue}>{category.value}개</span>
                </div>
                <div className={styles.statProgressBar}>
                  <div
                    className={styles.statProgressFill}
                    style={{
                      width: `${
                        (category.value /
                          Math.max(
                            ...programStats.categories.map((c) => c.value)
                          )) *
                          100 || 0
                      }%`,
                      backgroundColor: getCategoryColor(category.name),
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 최근 가입 회원 */}
      <div className={styles.recentMembersSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>최근 가입 회원</h3>
          <button
            onClick={() => window.scrollTo(0, 0)}
            className={`${styles.btn} ${styles.btnText}`}
          >
            모든 회원 보기
          </button>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>이름</th>
                <th>이메일</th>
                <th>가입일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className={styles.loadingCell}>
                    로딩 중...
                  </td>
                </tr>
              ) : recentMembers.length === 0 ? (
                <tr>
                  <td colSpan="4" className={styles.emptyCell}>
                    최근 가입한 회원이 없습니다.
                  </td>
                </tr>
              ) : (
                recentMembers.map((member) => (
                  <tr key={member.id || Math.random()}>
                    <td className={styles.memberName}>
                      {member.name || "이름 없음"}
                    </td>
                    <td>{member.email || "-"}</td>
                    <td>{formatDate(member.createdAt)}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(
                          member.status
                        )}`}
                      >
                        {getUserStatus(member)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 활동 로그 */}
      <div className={styles.activitySection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>최근 활동</h3>
          <button className={`${styles.btn} ${styles.btnText}`}>갱신</button>
        </div>
        <div className={styles.activityLog}>
          <div className={styles.activityItem}>
            <div
              className={styles.activityIcon}
              style={{
                backgroundColor: "rgba(76, 141, 255, 0.1)",
                color: "#4c8dff",
              }}
            >
              <UserIcon />
            </div>
            <div className={styles.activityContent}>
              <div className={styles.activityText}>
                {stats.newUsersThisMonth || 0}명의 회원이 이번 달에
                가입했습니다.
              </div>
              <div className={styles.activityTime}>최근 30일</div>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div
              className={styles.activityIcon}
              style={{
                backgroundColor: "rgba(0, 208, 132, 0.1)",
                color: "#00d084",
              }}
            >
              <LoginIcon />
            </div>
            <div className={styles.activityContent}>
              <div className={styles.activityText}>
                지난 주 로그인 사용자: {stats.weeklyActiveUsers || 42}명
              </div>
              <div className={styles.activityTime}>최근 7일</div>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div
              className={styles.activityIcon}
              style={{
                backgroundColor: "rgba(252, 185, 44, 0.1)",
                color: "#fcb92c",
              }}
            >
              <EnrollmentIcon />
            </div>
            <div className={styles.activityContent}>
              <div className={styles.activityText}>
                이번 달 신규 수강 신청: {stats.monthlyEnrollments || 15}건
              </div>
              <div className={styles.activityTime}>최근 30일</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 색상 기능 함수
const getColorByIndex = (index) => {
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
  return colors[index % colors.length];
};

// 카테고리별 컬러 설정
const getCategoryColor = (category) => {
  const categoryColors = {
    음악: "#3a7bd5",
    교육: "#00C49F",
    건강: "#FFBB28",
    기술: "#FF8042",
  };
  return categoryColors[category] || "#8884d8";
};

// 아이콘 컴포넌트들
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const LoginIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
    <polyline points="10 17 15 12 10 7"></polyline>
    <line x1="15" y1="12" x2="3" y2="12"></line>
  </svg>
);

const EnrollmentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

export default Dashboard;
