// hooks/useModalManagement.js - Firebase 연동 버전
import { useState, useCallback } from "react";
import { adminAPI } from "../services/api";

export const useModalManagement = (onUserChanged) => {
  const [viewUserModal, setViewUserModal] = useState(null);
  const [editUserModal, setEditUserModal] = useState(null);
  const [deleteUserModal, setDeleteUserModal] = useState(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 사용자 조회 모달 열기
  const handleViewUser = useCallback((user) => {
    setViewUserModal(user);
  }, []);

  // 사용자 수정 모달 열기
  const handleEditUser = useCallback((user) => {
    setEditUserModal(user);
    if (viewUserModal) setViewUserModal(null);
  }, [viewUserModal]);

  // 사용자 삭제 처리 - Firebase API 사용
  const handleDeleteUser = useCallback(async (userId) => {
    if (isSubmitting || !userId) return;
    
    setIsSubmitting(true);
    try {
      await adminAPI.deleteUser(userId);
      if (onUserChanged) onUserChanged();
      setDeleteUserModal(null);
    } catch (error) {
      console.error("회원 삭제 오류:", error);
      alert("회원 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }, [onUserChanged, isSubmitting]);

  // 사용자 정보 저장 처리 - Firebase API 사용
  const handleSaveUser = useCallback(async (editedUser) => {
    if (isSubmitting || !editedUser || !editedUser.id) return;
    
    setIsSubmitting(true);
    try {
      await adminAPI.updateUser(editedUser.id, editedUser);
      if (onUserChanged) onUserChanged();
      setEditUserModal(null);
    } catch (error) {
      console.error("회원 정보 업데이트 오류:", error);
      alert("회원 정보 업데이트 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }, [onUserChanged, isSubmitting]);

  // 필터 모달 열기/닫기
  const openFilterModal = useCallback(() => setFilterModalOpen(true), []);
  const closeFilterModal = useCallback(() => setFilterModalOpen(false), []);

  return {
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
  };
};