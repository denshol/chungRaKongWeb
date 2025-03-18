// components/dashboard/StatsSection.jsx - Firebase 데이터 연동 버전
import React from "react";
import styles from "../../styles/AdminDashboard.module.css";

const StatCard = ({ title, value, change, changeType }) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.statTitle}>{title}</div>
      <div className={styles.statValue}>{value}</div>
      {change && (
        <div
          className={`${styles.statChange} ${
            changeType === "positive"
              ? styles.changePositive
              : styles.changeNegative
          }`}
        >
          {change}
        </div>
      )}
    </div>
  );
};

const StatsSection = ({ dashboardStats }) => {
  // 대시보드 통계가 없을 경우 기본값 설정
  const stats = dashboardStats || {
    totalUsers: 0,
    newUsersThisMonth: 0,
    userStatus: [
      { status: "활성", count: 0 },
      { status: "비활성", count: 0 },
    ],
    adminCount: 0,
  };

  return (
    <section className={styles.statsSection}>
      <StatCard
        title="총 회원 수"
        value={stats.totalUsers || 0}
        change={"+12% 증가"}
        changeType="positive"
      />
      <StatCard
        title="신규 회원"
        value={stats.newUsersThisMonth || 0}
        change={"+8% 증가"}
        changeType="positive"
      />
      <StatCard
        title="활성 회원"
        value={stats.userStatus?.[0]?.count || 0}
        change={"+5% 증가"}
        changeType="positive"
      />
      <StatCard
        title="관리자 수"
        value={stats.adminCount || 0}
        change={"안정적"}
        changeType="positive"
      />
    </section>
  );
};

export default StatsSection;
