import React, { createContext, useState, useEffect } from "react";

// 1. AuthContext 생성
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("서버에서 받아온 유저 정보:", data);
          setUser(data);
        })
        .catch((err) => console.error("사용자 정보 불러오기 실패:", err));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 2. `AuthProvider`를 `export`해줘야 함!
export { AuthProvider };
export default AuthProvider;
