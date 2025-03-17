import React, { createContext, useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 회원가입
  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // 사용자 프로필 업데이트 (이름 추가)
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    // 사용자 정보를 로컬 스토리지에 저장
    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      name: name,
      emailVerified: userCredential.user.emailVerified,
      provider: "email",
    };

    localStorage.setItem("user", JSON.stringify(userData));

    return userCredential.user;
  };

  // 로그인
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // 사용자 정보를 로컬 스토리지에 저장
    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      name: userCredential.user.displayName,
      profileImage: userCredential.user.photoURL,
      emailVerified: userCredential.user.emailVerified,
      provider: "email",
    };

    localStorage.setItem("user", JSON.stringify(userData));

    return userCredential.user;
  };

  // 로그아웃
  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    setUser(null);
  };

  // 비밀번호 재설정
  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  // 사용자 정보 업데이트
  const updateUser = async (userData) => {
    if (!auth.currentUser) return;

    const updates = {};
    if (userData.name) updates.displayName = userData.name;
    if (userData.photoURL) updates.photoURL = userData.photoURL;

    await updateProfile(auth.currentUser, updates);

    // 로컬 스토리지 정보 업데이트
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = { ...storedUser, ...userData };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setUser(updatedUser);
  };

  // 인증 상태 변경 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Firebase 사용자 객체를 앱에서 사용하기 쉬운 형태로 변환
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName,
          profileImage: currentUser.photoURL,
          emailVerified: currentUser.emailVerified,
          provider:
            currentUser.providerData[0]?.providerId === "password"
              ? "email"
              : "social",
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // 컨텍스트 값 정의
  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUser,
    isAuthenticated: () => !!user,
    isAdmin: () => user?.email === "admin@example.com", // 관리자 체크 로직
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
};
