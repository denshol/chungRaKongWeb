import React from "react";
import styles from "../../styles/AdminDashboard.module.css";
import { ViewIcon, EditIcon, DeleteIcon } from "../icons/Icons";

const MembersTable = ({
  members = [], // 기본값으로 빈 배열 설정
  selectedRows = [], // 기본값으로 빈 배열 설정
  handleRowSelect = () => {}, // 기본 함수 설정
  handleSelectAll = () => {}, // 기본 함수 설정
  handleEditUser = () => {}, // 기본 함수 설정
  handleDeleteUser = () => {}, // 기본 함수 설정
  handleViewUser = () => {}, // 기본 함수 설정
}) => {
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

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getUserStatus = (user) => {
    if (!user || !user.status || user.status === "active") return "활성";
    if (user.status === "inactive") return "정지";
    if (user.status === "dormant") return "휴면";
    return user.status;
  };

  return (
    <div className={styles.membersTableContainer}>
      <table className={styles.membersTable}>
        <thead>
          <tr>
            <th width="40">
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="select-all"
                  checked={
                    members.length > 0 && selectedRows.length === members.length
                  }
                  onChange={handleSelectAll}
                />
              </div>
            </th>
            <th>이름</th>
            <th>이메일</th>
            <th>연락처</th>
            <th>가입일</th>
            <th>상태</th>
            <th>최근 로그인</th>
            <th width="120">관리</th>
          </tr>
        </thead>
        <tbody>
          {members.length === 0 ? (
            <tr>
              <td colSpan={8} style={{ textAlign: "center", padding: "30px" }}>
                회원 정보가 없습니다.
              </td>
            </tr>
          ) : (
            members.map((member) => (
              <tr key={member.id || Math.random()}>
                <td>
                  <div className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(member.id)}
                      onChange={() => handleRowSelect(member.id)}
                    />
                  </div>
                </td>
                <td className={styles.memberName}>
                  {member.name || "이름 없음"}
                </td>
                <td>{member.email || "-"}</td>
                <td>{member.phoneNumber || "-"}</td>
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
                <td>{formatDate(member.lastLogin)}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      className={`${styles.btnAction} ${styles.btnView}`}
                      onClick={() => handleViewUser(member)}
                    >
                      <ViewIcon />
                    </button>
                    <button
                      className={`${styles.btnAction} ${styles.btnEdit}`}
                      onClick={() => handleEditUser(member)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className={`${styles.btnAction} ${styles.btnDelete}`}
                      onClick={() => handleDeleteUser(member.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTable;
