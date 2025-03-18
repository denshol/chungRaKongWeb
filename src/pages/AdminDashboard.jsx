import React, { useState, useEffect } from "react";
import styles from "../styles/AdminDashboard.module.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardTab from "../components/dashboard/Dashboard";
import MembersPage from "../components/members/MembersPage";
import SettingsPage from "../components/settings/SettingPage";
import ProgramsPage from "../components/programs/ProgramsPage"; // 경로 수정
import { useMemberManagement } from "../hooks/useMemberManagement";
import { useModalManagement } from "../hooks/useModalManagement";
import { useAuth } from "../contexts/AuthContext";
import UserDetailModal from "../components/modals/UserDetailModal";
import UserEditModal from "../components/modals/UserEditModal";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";
import FilterModal from "../components/modals/FilterModal";
import { useDarkMode } from "../hooks/useDarkMode";
import { CATEGORIES, programs } from "../data/programs"; // 프로그램 데이터 가져오기

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("대시보드");
  const [searchTerm, setSearchTerm] = useState("");
  const { isAdmin } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // 회원 관리 훅 사용
  const {
    members,
    filteredMembers,
    loading,
    dashboardStats,
    activeMemberTab,
    setActiveMemberTab,
    selectedRows,
    handleRowSelect,
    handleSelectAll,
    applyAdvancedFilters,
    refreshMembers,
    paginationData,
    handlePageChange,
    handleBatchAction,
  } = useMemberManagement(isAdmin, searchTerm);

  // 모달 관리 훅 사용
  const {
    viewUserModal,
    editUserModal,
    deleteUserModal,
    filterModalOpen,
    isSubmitting,
    handleViewUser,
    handleEditUser,
    handleDeleteUser,
    handleSaveUser,
    openFilterModal,
    closeFilterModal,
    setViewUserModal,
    setEditUserModal,
    setDeleteUserModal,
  } = useModalManagement(() => {
    refreshMembers();
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // 프로그램 카테고리별 통계 계산
  const programStats = React.useMemo(() => {
    const categoryStats = Object.values(CATEGORIES).map((category) => ({
      name: category,
      value: programs.filter((program) => program.category === category).length,
    }));

    return {
      total: programs.length,
      featured: programs.filter((p) => p.isFeatured).length,
      categories: categoryStats,
    };
  }, []);

  // 현재 활성화된 탭에 따라 컴포넌트 렌더링
  const renderActiveTab = () => {
    switch (activeTab) {
      case "대시보드":
        return (
          <DashboardTab
            dashboardStats={dashboardStats}
            programStats={programStats}
            recentMembers={members.slice(0, 5)}
            loading={loading}
          />
        );
      case "회원관리":
        return (
          <MembersPage
            members={filteredMembers}
            loading={loading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeMemberTab={activeMemberTab}
            setActiveMemberTab={setActiveMemberTab}
            selectedRows={selectedRows}
            handleRowSelect={handleRowSelect}
            handleSelectAll={handleSelectAll}
            handleViewUser={handleViewUser}
            handleEditUser={handleEditUser}
            handleDeleteUser={(userId) => setDeleteUserModal(userId)}
            openFilterModal={openFilterModal}
            paginationData={paginationData}
            onPageChange={handlePageChange}
            handleBatchAction={handleBatchAction}
            programs={programs}
          />
        );
      case "프로그램관리":
        return <ProgramsPage programs={programs} categories={CATEGORIES} />;
      case "설정":
        return <SettingsPage />;
      default:
        return <div>내용을 찾을 수 없습니다.</div>;
    }
  };

  return (
    <div
      className={`${styles.adminDashboard} ${
        isDarkMode ? styles.darkMode : ""
      }`}
    >
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main
        className={styles.mainContent}
        style={{
          marginLeft: sidebarOpen ? "250px" : "70px",
        }}
      >
        <Header
          activeTab={activeTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <div className={styles.contentBody}>{renderActiveTab()}</div>
      </main>

      {/* 모달 컴포넌트들 */}
      {viewUserModal && (
        <UserDetailModal
          user={viewUserModal}
          onClose={() => setViewUserModal(null)}
          onEdit={() => handleEditUser(viewUserModal)}
          programs={programs}
        />
      )}

      {editUserModal && (
        <UserEditModal
          user={editUserModal}
          onClose={() => setEditUserModal(null)}
          onSave={handleSaveUser}
          isSubmitting={isSubmitting}
          programs={programs}
        />
      )}

      {deleteUserModal && (
        <DeleteConfirmModal
          title="회원 삭제"
          message="정말 이 회원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
          onCancel={() => setDeleteUserModal(null)}
          onConfirm={() => handleDeleteUser(deleteUserModal)}
          isSubmitting={isSubmitting}
        />
      )}

      {filterModalOpen && (
        <FilterModal
          isOpen={filterModalOpen}
          onClose={closeFilterModal}
          onApply={applyAdvancedFilters}
          programs={programs}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
