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
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

// 사용자 프로필 생성 함수
const createUserProfile = async (user, additionalData = {}) => {
  const userRef = doc(db, "users", user.uid);

  // 관리자 이메일 배열
  const adminEmails = ["denshol0709@gmail.com"];
  // 사용자 역할 결정
  const role =
    user.email && adminEmails.includes(user.email)
      ? "admin"
      : additionalData.role || "user";

  const userData = {
    email: user.email,
    name: user.displayName || additionalData.name,
    profileImage: user.photoURL,
    phoneNumber: additionalData.phoneNumber || "",
    address: additionalData.address || "",
    birthDate: additionalData.birthDate || "",
    interests: additionalData.interests || [],
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
    role: role,
  };

  await setDoc(userRef, userData);
  return userRef;
};

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 회원가입
  const signup = async (email, password, name, additionalData = {}) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // 사용자 프로필 업데이트 (이름 추가)
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    // 관리자 이메일 확인
    const adminEmails = ["denshol0709@gmail.com"];
    const role = adminEmails.includes(email) ? "admin" : "user";

    // Firestore에 사용자 프로필 문서 생성
    try {
      const userDocRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userDocRef, {
        name: name,
        email: email,
        phoneNumber: additionalData.phoneNumber || "",
        interests: additionalData.interests || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        role: role,
      });
    } catch (error) {
      console.error("Firestore 사용자 문서 생성 실패:", error);
      // 실패해도 회원가입은 진행
    }

    // 사용자 정보를 로컬 스토리지에 저장
    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      name: name,
      phoneNumber: additionalData.phoneNumber || "",
      interests: additionalData.interests || [],
      emailVerified: userCredential.user.emailVerified,
      provider: "email",
      createdAt: new Date().toISOString(),
      role: role,
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

    // 관리자 이메일 확인
    const adminEmails = ["denshol0709@gmail.com"];
    const role = adminEmails.includes(email) ? "admin" : "user";

    // 사용자 정보를 로컬 스토리지에 저장
    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      name: userCredential.user.displayName,
      profileImage: userCredential.user.photoURL,
      emailVerified: userCredential.user.emailVerified,
      provider: "email",
      role: role,
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

  // updateUser 함수 수정
  const updateUser = async (userData) => {
    if (!auth.currentUser) return;

    const updates = {};
    if (userData.name) updates.displayName = userData.name;
    // 프로필 이미지 업데이트 부분 수정
    if (userData.profileImage) updates.photoURL = userData.profileImage;

    await updateProfile(auth.currentUser, updates);

    // 로컬 스토리지 정보 업데이트
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = { ...storedUser, ...userData };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setUser(updatedUser);
  };

  // 인증 상태 변경 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // 관리자 이메일 배열
        const adminEmails = ["denshol0709@gmail.com"];

        // Firebase Auth 기본 정보
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
          // role 속성 추가
          role: adminEmails.includes(currentUser.email) ? "admin" : "user",
        };

        // Firestore에서 추가 정보 가져오기
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            // Firestore 데이터와 병합
            const firestoreData = userDoc.data();
            const extendedUserData = {
              ...userData,
              phoneNumber: firestoreData.phoneNumber,
              address: firestoreData.address,
              birthDate: firestoreData.birthDate,
              interests: firestoreData.interests,
              enrolledPrograms: firestoreData.enrolledPrograms,
              createdAt: firestoreData.createdAt?.toDate?.() || new Date(),
              lastLogin: firestoreData.lastLogin?.toDate?.() || new Date(),
              // role 속성 유지 (Firestore에 저장된 값이 있으면 그 값 사용)
              role: firestoreData.role || userData.role,
            };

            // 로그인 시 lastLogin 업데이트
            await setDoc(
              userDocRef,
              {
                lastLogin: serverTimestamp(),
                role: userData.role, // role도 저장 (업데이트 여부 확인)
              },
              { merge: true }
            );

            setUser(extendedUserData);
            localStorage.setItem("user", JSON.stringify(extendedUserData));
          } else {
            // 사용자 문서가 없으면 새로 생성
            await createUserProfile(currentUser, { role: userData.role });
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
          }
        } catch (error) {
          console.error("Firestore 사용자 데이터 가져오기 실패:", error);
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // 관리자 여부 확인 함수
  const isAdmin = () => {
    // 디버깅을 위한 로그 추가
    console.log("isAdmin 호출됨, 현재 사용자:", user);

    // 관리자 이메일 배열
    const adminEmails = ["denshol0709@gmail.com"];

    // user.role로 확인하거나 이메일로 직접 확인
    const result =
      user?.role === "admin" ||
      (user?.email && adminEmails.includes(user.email));

    console.log("관리자 확인 결과:", result);
    return result;
  };

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
    isAdmin,
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
