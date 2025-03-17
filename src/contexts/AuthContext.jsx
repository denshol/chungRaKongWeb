// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

// 인증 컨텍스트 생성
export const AuthContext = createContext(null);

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 로컬 스토리지에서 사용자 정보 불러오기
  useEffect(() => {
    const loadUser = () => {
      try {
        setLoading(true);
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        } else {
          // 토큰이 없으면 사용자 정보도 초기화
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("사용자 정보 로딩 오류:", error);
        setError("사용자 정보를 불러오는 중 오류가 발생했습니다.");
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // 다른 탭에서 로그아웃 감지
    const handleStorageChange = (e) => {
      if (e.key === "token" && !e.newValue) {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // 로그인 함수
  const login = (userData, token) => {
    try {
      // 토큰과 사용자 정보 저장
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setError(null);
      return true;
    } catch (error) {
      console.error("로그인 처리 오류:", error);
      setError("로그인 처리 중 오류가 발생했습니다.");
      return false;
    }
  };

  // 로그아웃 함수
  const logout = () => {
    try {
      // 카카오 로그인 상태라면 카카오 로그아웃 실행
      if (window.Kakao?.Auth?.getAccessToken()) {
        window.Kakao.Auth.logout(() => {
          console.log("카카오 로그아웃 성공");
        });
      }

      // 로컬 스토리지에서 인증 정보 제거
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setError(null);
    } catch (error) {
      console.error("로그아웃 처리 오류:", error);
      setError("로그아웃 처리 중 오류가 발생했습니다.");
    }
  };

  // 사용자 정보 업데이트 함수
  const updateUser = (userData) => {
    try {
      const updatedUser = { ...user, ...userData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setError(null);
      return true;
    } catch (error) {
      console.error("사용자 정보 업데이트 오류:", error);
      setError("사용자 정보 업데이트 중 오류가 발생했습니다.");
      return false;
    }
  };

  // 인증 상태 확인 함수
  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem("token");
  };

  // 관리자 권한 확인 함수
  const isAdmin = () => {
    return (
      isAuthenticated() && (user?.isAdmin === true || user?.role === "admin")
    );
  };

  // 컨텍스트 값 정의
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateUser,
    isAuthenticated,
    isAdmin,
    setUser, // 필요한 경우 직접 사용자 상태 설정
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 인증 컨텍스트 사용을 위한 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
};
