import React, { createContext, useState, useEffect, useContext } from "react";

// 인증 컨텍스트 생성 및 export 추가
export const AuthContext = createContext(null);

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 로컬 스토리지에서 사용자 정보 불러오기
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 로그인 함수
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
    return true;
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 인증 컨텍스트 사용을 위한 커스텀 훅
export const useAuth = () => {
  return useContext(AuthContext);
};
