// hooks/useMemberManagement.js - 회원 관리 훅 (일괄 처리 기능 추가)
import { useState, useEffect, useCallback } from "react";
import { adminAPI } from "../services/api";

// 상태 매핑 객체
const STATUS_MAP = {
  "전체 회원": null,
  "활성 회원": "active",
  "휴면 회원": "dormant",
  "정지 회원": "inactive",
};

export const useMemberManagement = (isAdmin, searchTerm = "") => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [activeMemberTab, setActiveMemberTab] = useState("전체 회원");
  const [selectedRows, setSelectedRows] = useState([]);
  const [advancedFilters, setAdvancedFilters] = useState({
    status: [],
    joinDateStart: "",
    joinDateEnd: "",
    lastLoginStart: "",
    lastLoginEnd: "",
    currentLectures: [],
  });

  // 페이지네이션 상태
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
  });

  // 데이터 불러오기 - Firebase API 사용
  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      if (!isAdmin()) {
        console.error("관리자 권한이 없습니다");
        setLoading(false);
        return;
      }

      // Firebase Firestore에서 데이터 가져오기
      const users = await adminAPI.getAllUsers();
      const stats = await adminAPI.getDashboardStats();

      // 회원 데이터 포맷팅
      const formattedUsers = users.map((user) => ({
        ...user,
        status: user.status || "active",
        currentLectures: user.enrolledPrograms || [],
      }));

      setMembers(formattedUsers);
      setDashboardStats(stats);

      // 페이지네이션 데이터 설정
      setPaginationData((prev) => ({
        ...prev,
        totalPages: Math.ceil(formattedUsers.length / prev.itemsPerPage),
      }));
    } catch (error) {
      console.error("회원 목록 가져오기 오류:", error);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // 필터링 로직
  useEffect(() => {
    // 검색어 필터링
    const applySearch = (data) => {
      if (!searchTerm) return data;

      return data.filter(
        (member) =>
          (member.name &&
            member.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (member.email &&
            member.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (member.phoneNumber && member.phoneNumber.includes(searchTerm))
      );
    };

    // 탭 필터링
    const applyTabFilter = (data) => {
      const targetStatus = STATUS_MAP[activeMemberTab];
      if (!targetStatus) return data;

      return data.filter((member) => {
        if (!member.status && targetStatus === "active") return true;
        return member.status === targetStatus;
      });
    };

    // 고급 필터링
    const applyAdvancedFilters = (data) => {
      // 모든 필터 조건이 비어있으면 전체 표시
      const isEmptyFilters = Object.values(advancedFilters).every(
        (value) => !value || (Array.isArray(value) && value.length === 0)
      );

      if (isEmptyFilters) return data;

      return data.filter((member) => {
        // 상태 필터
        const statusMatch =
          advancedFilters.status.length === 0 ||
          advancedFilters.status.includes(member.status || "active");

        // 현재 듣는 강의 필터
        const lectureMatch =
          advancedFilters.currentLectures.length === 0 ||
          (member.currentLectures &&
            advancedFilters.currentLectures.some((lecture) =>
              member.currentLectures.includes(lecture)
            ));

        // 가입일 필터
        const joinDateMatch =
          (!advancedFilters.joinDateStart ||
            new Date(member.createdAt) >=
              new Date(advancedFilters.joinDateStart)) &&
          (!advancedFilters.joinDateEnd ||
            new Date(member.createdAt) <=
              new Date(advancedFilters.joinDateEnd));

        // 최근 로그인 필터
        const lastLoginMatch =
          (!advancedFilters.lastLoginStart ||
            new Date(member.lastLogin) >=
              new Date(advancedFilters.lastLoginStart)) &&
          (!advancedFilters.lastLoginEnd ||
            new Date(member.lastLogin) <=
              new Date(advancedFilters.lastLoginEnd));

        // 모든 필터 조건이 AND 연산으로 검색
        return statusMatch && lectureMatch && joinDateMatch && lastLoginMatch;
      });
    };

    // 필터링 파이프라인
    let filtered = [...members];
    filtered = applySearch(filtered);
    filtered = applyTabFilter(filtered);
    filtered = applyAdvancedFilters(filtered);

    setFilteredMembers(filtered);

    // 페이지네이션 재계산
    setPaginationData((prev) => ({
      ...prev,
      currentPage: 1, // 필터링 시 첫 페이지로 이동
      totalPages: Math.max(1, Math.ceil(filtered.length / prev.itemsPerPage)),
    }));
  }, [members, searchTerm, activeMemberTab, advancedFilters]);

  // 고급 필터 적용
  const applyAdvancedFilters = useCallback((filters) => {
    setAdvancedFilters(filters);
  }, []);

  // 행 선택 처리
  const handleRowSelect = useCallback((userId) => {
    setSelectedRows((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  }, []);

  // 전체 선택 처리
  const handleSelectAll = useCallback(() => {
    if (selectedRows.length === filteredMembers.length) {
      setSelectedRows([]);
    } else {
      const allIds = filteredMembers
        .filter((member) => member.id)
        .map((member) => member.id);
      setSelectedRows(allIds);
    }
  }, [filteredMembers, selectedRows]);

  // 페이지 변경 처리
  const handlePageChange = useCallback((page) => {
    setPaginationData((prev) => ({
      ...prev,
      currentPage: page,
    }));
  }, []);

  // 일괄 작업 처리 함수 (신규 추가)
  const handleBatchAction = useCallback(
    async (action, value) => {
      if (selectedRows.length === 0) {
        alert("먼저 회원을 선택해주세요.");
        return;
      }

      setLoading(true);
      try {
        switch (action) {
          case "delete":
            if (
              window.confirm(
                `선택한 ${selectedRows.length}명의 회원을 삭제하시겠습니까?`
              )
            ) {
              // Promise.all을 사용하여 모든 삭제 요청을 병렬 실행
              await Promise.all(
                selectedRows.map((id) => adminAPI.deleteUser(id))
              );
              alert(`${selectedRows.length}명의 회원이 삭제되었습니다.`);
              setSelectedRows([]);
              fetchMembers(); // 데이터 새로고침
            }
            break;

          case "status":
            if (
              window.confirm(
                `선택한 ${selectedRows.length}명의 회원 상태를 '${value}'로 변경하시겠습니까?`
              )
            ) {
              // Promise.all을 사용하여 모든 상태 변경 요청을 병렬 실행
              await Promise.all(
                selectedRows.map((id) => {
                  const member = members.find((m) => m.id === id);
                  if (member) {
                    return adminAPI.updateUser(id, {
                      ...member,
                      status: value,
                    });
                  }
                })
              );
              alert(`${selectedRows.length}명의 회원 상태가 변경되었습니다.`);
              fetchMembers(); // 데이터 새로고침
            }
            break;

          case "email":
            alert("이메일 발송 기능은 아직 구현되지 않았습니다.");
            break;

          default:
            console.warn("지원하지 않는 일괄 작업입니다:", action);
        }
      } catch (error) {
        console.error("일괄 작업 처리 중 오류 발생:", error);
        alert("작업 처리 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    },
    [selectedRows, members, fetchMembers]
  );

  // 현재 페이지의 데이터 반환
  const getPaginatedData = useCallback(() => {
    const { currentPage, itemsPerPage } = paginationData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredMembers.slice(startIndex, endIndex);
  }, [filteredMembers, paginationData]);

  return {
    members,
    filteredMembers: getPaginatedData(),
    loading,
    dashboardStats,
    activeMemberTab,
    setActiveMemberTab,
    selectedRows,
    handleRowSelect,
    handleSelectAll,
    applyAdvancedFilters,
    refreshMembers: fetchMembers,
    paginationData,
    handlePageChange,
    handleBatchAction,
  };
};
