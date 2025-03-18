// dashboard/RecentMembersTable.jsx - 대시보드용 간소화된 회원 테이블
import React from "react";
import styles from "../../styles/AdminDashboard.module.css";

const RecentMembersTable = ({ members, loading }) => {
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

  return (
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
          ) : members.length === 0 ? (
            <tr>
              <td colSpan="4" className={styles.emptyCell}>
                최근 가입한 회원이 없습니다.
              </td>
            </tr>
          ) : (
            members.map((member) => (
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
  );
};

export default RecentMembersTable;
