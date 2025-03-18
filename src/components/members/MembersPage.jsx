// components/members/MembersPage.jsx - 회원 관리 기능 강화 버전
import React from "react";
import styles from "../../styles/AdminDashboard.module.css";
import MemberTabs from "./MemberTabs";
import MembersTable from "./MembersTable";
import Pagination from "./Pagination";
import {
  FilterIcon,
  AddIcon,
  FileUploadIcon,
  FileDownloadIcon,
} from "../icons/Icons";

const MembersPage = ({
  members,
  loading,
  searchTerm,
  setSearchTerm,
  activeMemberTab,
  setActiveMemberTab,
  selectedRows,
  handleRowSelect,
  handleSelectAll,
  handleViewUser,
  handleEditUser,
  handleDeleteUser,
  openFilterModal,
  paginationData,
  onPageChange,
  handleBatchAction,
}) => {
  // 파일 내보내기 함수
  const handleExportData = () => {
    // 선택된 회원이 있으면 선택된 회원만, 없으면, 전체 회원 내보내기
    const dataToExport =
      selectedRows.length > 0
        ? members.filter((member) => selectedRows.includes(member.id))
        : members;

    // CSV 형식으로 변환
    const headers = [
      "이름",
      "이메일",
      "연락처",
      "상태",
      "가입일",
      "최근 로그인",
    ];
    const csvContent = [
      headers.join(","),
      ...dataToExport.map((member) =>
        [
          member.name || "",
          member.email || "",
          member.phoneNumber || "",
          member.status || "active",
          member.createdAt || "",
          member.lastLogin || "",
        ].join(",")
      ),
    ].join("\n");

    // 다운로드 링크 생성
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "회원목록.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 파일 가져오기 함수
  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    alert("파일 가져오기 기능은 아직 구현되지 않았습니다.");
    // 파일 처리 로직 구현
  };

  return (
    <div className={styles.membersPage}>
      {/* 회원 필터 탭 */}
      <MemberTabs
        activeMemberTab={activeMemberTab}
        setActiveMemberTab={setActiveMemberTab}
      />

      {/* 회원 관리 섹션 */}
      <section className={styles.membersSection}>
        <div className={styles.membersHeader}>
          <h2 className={styles.membersTitle}>회원 목록</h2>
          <div className={styles.membersActions}>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={openFilterModal}
            >
              <FilterIcon />
              필터
            </button>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>
              <AddIcon />
              회원 추가
            </button>
          </div>
        </div>

        {/* 일괄 작업 툴바 - 선택된 회원이 있을 때만 표시 */}
        {selectedRows.length > 0 && (
          <div className={styles.batchActionToolbar}>
            <div className={styles.selectionCounter}>
              {selectedRows.length}명의 회원 선택됨
            </div>
            <div className={styles.batchActions}>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={() => handleBatchAction("email")}
              >
                이메일 발송
              </button>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={() => handleBatchAction("status", "active")}
              >
                활성화
              </button>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={() => handleBatchAction("status", "inactive")}
              >
                비활성화
              </button>
              <button
                className={`${styles.btn} ${styles.btnOutlineWarning}`}
                onClick={() => handleBatchAction("delete")}
              >
                삭제
              </button>
            </div>
          </div>
        )}

        {/* 데이터 가져오기/내보내기 툴바 */}
        <div className={styles.importExportContainer}>
          <button
            className={`${styles.btn} ${styles.btnOutlinePrimary}`}
            onClick={handleExportData}
          >
            <FileDownloadIcon />
            회원 데이터 내보내기
          </button>
          <label className={`${styles.btn} ${styles.btnOutlinePrimary}`}>
            <FileUploadIcon />
            회원 데이터 가져오기
            <input
              type="file"
              accept=".csv,.xlsx"
              style={{ display: "none" }}
              onChange={handleImportData}
            />
          </label>
        </div>

        {/* 회원 테이블 */}
        <MembersTable
          members={members}
          loading={loading}
          selectedRows={selectedRows}
          handleRowSelect={handleRowSelect}
          handleSelectAll={handleSelectAll}
          handleEditUser={handleEditUser}
          handleDeleteUser={handleDeleteUser}
          handleViewUser={handleViewUser}
        />

        {/* 페이지네이션 */}
        <Pagination
          currentPage={paginationData?.currentPage || 1}
          totalPages={paginationData?.totalPages || 1}
          onPageChange={onPageChange}
        />
      </section>
    </div>
  );
};

export default MembersPage;
